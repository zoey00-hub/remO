'use server';

import { createPool } from '@neondatabase/serverless';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

const db = createPool({
  connectionString: process.env.DATABASE_URL,
});

// 1. 게시글 생성 (Vercel Blob 파일 업로드 + Neon DB 저장)
export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const author = (formData.get('author') as string) || '익명';
  const file = formData.get('file') as File | null;

  if (!title || !content) {
    return { error: '제목과 내용을 모두 입력해 주세요.' };
  }

  let fileUrl: string | null = null;
  let fileName: string | null = null;

  if (file && file.size > 0) {
    try {
      const blob = await put(`board/${Date.now()}_${file.name}`, file, {
        access: 'public',
      });
      fileUrl = blob.url;
      fileName = file.name;
    } catch (error) {
      console.error('Vercel Blob 업로드 실패:', error);
      return { error: '파일 업로드 중 오류가 발생했습니다.' };
    }
  }

  try {
    await db.query(
      `INSERT INTO posts (title, content, author, file_url, file_name, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [title, content, author, fileUrl, fileName]
    );

    revalidatePath('/board');
    return { success: true };
  } catch (error) {
    console.error('Neon DB 저장 실패:', error);
    return { error: '게시글 DB 저장 중 오류가 발생했습니다.' };
  }
}

// 2. 게시글 목록 불러오기
export async function getPosts() {
  try {
    const { rows } = await db.query(
      `SELECT id, title, content, author, file_url, file_name, created_at 
       FROM posts 
       ORDER BY created_at DESC`
    );
    return rows;
  } catch (error) {
    console.error('Neon DB 조회 실패:', error);
    return [];
  }
}
