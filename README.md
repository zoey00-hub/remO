# remO
<!DOCTYPE html>
<html lang="ko" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>zoey. — In the quiet details</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'sans-serif'],
                        serif: ['Cormorant Garamond', 'serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                    },
                    colors: {
                        canvas: '#FBF9F5',
                        cream: '#F4F0EA',
                        paperDark: '#E8E2D8',
                        charcoal: '#1F1E1B',
                        stoneGray: '#706D67',
                        subtleBorder: '#E3DDD3',
                        warmTerracotta: '#A36851',
                        mutedOlive: '#6B705C',
                        remoBg: '#0F172A',
                        remoBorder: '#1E293B',
                        remoAccent: '#38BDF8'
                    }
                }
            }
        }
    </script>

    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #FBF9F5;
            color: #1F1E1B;
            -webkit-font-smoothing: antialiased;
        }

        .font-serif-editorial {
            font-family: 'Cormorant Garamond', serif;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 4px;
        }
        ::-webkit-scrollbar-track {
            background: #FBF9F5;
        }
        ::-webkit-scrollbar-thumb {
            background: #D5CFC5;
            border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #B0A99E;
        }

        .blur-glass {
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
            animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Subtle grid background accent */
        .bg-grid-pattern {
            background-size: 40px 40px;
            background-image: 
                linear-gradient(to right, rgba(227, 221, 211, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(227, 221, 211, 0.3) 1px, transparent 1px);
        }
    </style>
</head>
<body class="bg-canvas text-charcoal antialiased selection:bg-charcoal selection:text-canvas min-h-screen flex flex-col relative overflow-x-hidden">

    <!-- Toast Notification Container -->
    <div id="toast-container" class="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none"></div>

    <!-- remO admin Top Notification Bar -->
    <div id="admin-top-bar" class="hidden bg-remoBg text-white text-xs py-2 px-6 border-b border-remoBorder transition-all flex items-center justify-between z-50">
        <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-400/30 text-sky-300 font-mono text-[10px]">
                <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                remO admin CONNECTED
            </span>
            <span class="text-slate-400 font-mono text-[11px] hidden md:inline">
                Host: <span class="text-slate-200">Vercel</span> | DB: <span class="text-slate-200">Neon Postgres</span> | Storage: <span class="text-slate-200">Vercel Blob</span> | Repo: <span class="text-slate-200">github.com/zoey</span>
            </span>
        </div>
        <div class="flex items-center gap-4">
            <button onclick="scrollToAdminPanel()" class="text-[11px] text-sky-300 hover:text-white underline font-mono">Control Dashboard</button>
            <button onclick="toggleAdminMode()" class="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded border border-slate-700 transition-colors">Exit Admin</button>
        </div>
    </div>

    <!-- Header Navbar -->
    <header class="sticky top-0 z-40 w-full border-b border-subtleBorder bg-canvas/85 blur-glass transition-all duration-300">
        <div class="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
            
            <!-- Brand Logo -->
            <a href="#home" onclick="navigateTo('home')" class="group flex items-center gap-1.5">
                <span class="text-3xl sm:text-4xl font-normal tracking-tight font-serif-editorial text-charcoal group-hover:opacity-75 transition-opacity">zoey.</span>
            </a>

            <!-- Desktop Navigation Links -->
            <nav class="hidden md:flex items-center space-x-10 text-xs font-medium tracking-[0.2em] uppercase text-stoneGray">
                <button onclick="navigateTo('home')" id="nav-home" class="nav-btn text-charcoal transition-colors py-1 relative">Home</button>
                <button onclick="navigateTo('about')" id="nav-about" class="nav-btn hover:text-charcoal transition-colors py-1 relative">About Us</button>
                <button onclick="navigateTo('shop')" id="nav-shop" class="nav-btn hover:text-charcoal transition-colors py-1 relative">Shop</button>
                <button onclick="navigateTo('contact')" id="nav-contact" class="nav-btn hover:text-charcoal transition-colors py-1 relative">Contact</button>
            </nav>

            <!-- Action Controls -->
            <div class="flex items-center space-x-5">
                <!-- remO admin Mode Switcher Pill -->
                <button onclick="toggleAdminMode()" id="admin-pill-btn" class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-subtleBorder bg-cream hover:bg-paperDark transition-all text-[11px] font-mono text-stoneGray">
                    <i data-lucide="shield-check" class="w-3.5 h-3.5 text-stoneGray" id="admin-pill-icon"></i>
                    <span>remO admin</span>
                    <span class="w-2 h-2 rounded-full bg-stoneGray" id="admin-pill-dot"></span>
                </button>

                <!-- Auth Icon Button -->
                <button onclick="openAuthModal()" class="text-charcoal hover:opacity-60 transition-opacity relative p-1.5 rounded-full hover:bg-cream" title="Account / Auth">
                    <i data-lucide="user" class="w-5 h-5 stroke-[1.5]"></i>
                    <span id="auth-dot" class="hidden absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-600"></span>
                </button>

                <!-- Cart Button -->
                <button onclick="toggleCart()" class="text-charcoal hover:opacity-60 transition-opacity relative p-1.5 rounded-full hover:bg-cream" title="Shopping Bag">
                    <i data-lucide="shopping-bag" class="w-5 h-5 stroke-[1.5]"></i>
                    <span id="cart-badge" class="absolute -top-0.5 -right-1 bg-charcoal text-canvas text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center font-medium">0</span>
                </button>

                <!-- Mobile Menu Toggle Button -->
                <button onclick="toggleMobileMenu()" class="md:hidden text-charcoal p-1 focus:outline-none">
                    <i data-lucide="menu" id="menu-icon-open" class="w-6 h-6 stroke-[1.5]"></i>
                    <i data-lucide="x" id="menu-icon-close" class="w-6 h-6 stroke-[1.5] hidden"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Menu Overlay -->
        <div id="mobile-menu" class="hidden md:hidden border-b border-subtleBorder bg-canvas px-6 py-8 space-y-6 animate-fade-in">
            <nav class="flex flex-col space-y-5 text-sm font-light tracking-widest uppercase text-stoneGray">
                <button onclick="navigateTo('home'); toggleMobileMenu()" class="text-left hover:text-charcoal transition-colors">Home</button>
                <button onclick="navigateTo('about'); toggleMobileMenu()" class="text-left hover:text-charcoal transition-colors">About Us</button>
                <button onclick="navigateTo('shop'); toggleMobileMenu()" class="text-left hover:text-charcoal transition-colors">Shop Catalog</button>
                <button onclick="navigateTo('contact'); toggleMobileMenu()" class="text-left hover:text-charcoal transition-colors">Contact Us</button>
            </nav>
            <div class="pt-6 border-t border-subtleBorder flex items-center justify-between">
                <span class="text-xs text-stoneGray font-mono">remO admin Mode</span>
                <button onclick="toggleAdminMode()" class="px-3 py-1.5 bg-cream border border-subtleBorder rounded-full text-xs text-charcoal font-medium">
                    Toggle State
                </button>
            </div>
        </div>
    </header>

    <main class="flex-1 w-full">
        
        <!-- ================= HOME PAGE ================= -->
        <section id="page-home" class="spa-page w-full min-h-[calc(100vh-5rem)] flex flex-col justify-between px-6 py-8 sm:py-12 bg-grid-pattern">
            <div class="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-6">
                
                <!-- Hero Editorial Text -->
                <div class="lg:col-span-7 space-y-8">
                    <div class="inline-flex items-center gap-3">
                        <span class="w-8 h-px bg-stoneGray"></span>
                        <span class="text-xs font-mono tracking-[0.25em] uppercase text-stoneGray">Editorial Volume 04</span>
                    </div>

                    <h1 class="text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight font-serif-editorial text-charcoal italic">
                        "In the quiet details, we discover our truest form."
                    </h1>

                    <p class="text-stoneGray text-sm sm:text-base font-light max-w-lg leading-relaxed">
                        Thoughtfully curated apparel, artisanal lifestyle objects, and bespoke tailoring services. Crafted between Seoul and Stockholm for mindful living.
                    </p>

                    <div class="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
                        <button onclick="navigateTo('shop')" class="px-8 py-4 bg-charcoal text-canvas text-xs font-medium uppercase tracking-[0.2em] rounded-full hover:bg-stoneGray transition-all duration-300 text-center shadow-sm">
                            Explore Collection
                        </button>
                        <button onclick="navigateTo('about')" class="px-8 py-4 bg-transparent border border-charcoal/30 text-charcoal text-xs font-medium uppercase tracking-[0.2em] rounded-full hover:bg-cream transition-all duration-300 text-center">
                            Brand Story
                        </button>
                    </div>
                </div>

                <!-- Hero Visual (Pinterest Layout Accent) -->
                <div class="lg:col-span-5 relative">
                    <div class="aspect-[3/4] rounded-2xl overflow-hidden bg-cream relative group shadow-xl border border-subtleBorder">
                        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop" 
                             alt="zoey Editorial Visual" 
                             class="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" />
                        
                        <div class="absolute bottom-6 left-6 right-6 p-5 bg-canvas/90 blur-glass rounded-xl border border-subtleBorder shadow-sm">
                            <p class="text-xs font-serif-editorial text-charcoal italic leading-relaxed">
                                "Purity of material, quiet symmetry, and timeless presence."
                            </p>
                            <div class="flex items-center justify-between mt-3 pt-2 border-t border-subtleBorder/50">
                                <span class="text-[10px] font-mono text-stoneGray uppercase tracking-widest">Autumn / Winter Edition</span>
                                <span class="text-[10px] font-mono text-stoneGray">2026</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Highlights Bar -->
            <div class="max-w-7xl mx-auto w-full pt-8 border-t border-subtleBorder grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-stoneGray">
                <div>
                    <span class="font-mono text-charcoal block">01. Organic Fibers</span>
                    <span class="font-light">100% Traceable Silk & Linen</span>
                </div>
                <div>
                    <span class="font-mono text-charcoal block">02. Slow Production</span>
                    <span class="font-light">Small batch artisanal crafting</span>
                </div>
                <div>
                    <span class="font-mono text-charcoal block">03. Direct Atelier</span>
                    <span class="font-light">No traditional retail markups</span>
                </div>
                <div>
                    <span class="font-mono text-charcoal block">04. Global Shipping</span>
                    <span class="font-light">Complimentary over ₩200,000</span>
                </div>
            </div>
        </section>

        <!-- ================= ABOUT US PAGE ================= -->
        <section id="page-about" class="spa-page hidden w-full py-20 bg-cream border-t border-subtleBorder">
            <div class="max-w-7xl mx-auto px-6 sm:px-10">
                
                <!-- Section Title -->
                <div class="text-center max-w-2xl mx-auto space-y-4 mb-20">
                    <span class="text-xs font-mono uppercase tracking-[0.25em] text-stoneGray">Brand Heritage</span>
                    <h2 class="text-4xl sm:text-5xl font-light font-serif-editorial text-charcoal">The Editorial Mindset</h2>
                    <div class="w-12 h-px bg-stoneGray/40 mx-auto"></div>
                </div>

                <!-- Story Section -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
                    <div class="lg:col-span-6 space-y-6">
                        <h3 class="text-2xl sm:text-3xl font-serif-editorial text-charcoal leading-snug">
                            zoey was established with a singular intention: to elevate daily rituals through architectural simplicity and sensory warmth.
                        </h3>
                        <p class="text-stoneGray text-sm leading-relaxed font-light">
                            Rejecting trends and mass overproduction, our design studio operates as a slow creative atelier. Each garment silhouette, object curve, and fragrance note undergoes months of refinement between Seoul and Stockholm.
                        </p>
                        <p class="text-stoneGray text-sm leading-relaxed font-light">
                            Through our direct web platform hosted on Vercel with Neon Serverless Postgres and Vercel Blob media storage, we maintain total transparency from raw material sourcing to final packaging.
                        </p>

                        <div class="pt-6 grid grid-cols-3 gap-6 border-t border-subtleBorder">
                            <div>
                                <p class="text-3xl font-serif-editorial text-charcoal">100%</p>
                                <p class="text-xs text-stoneGray mt-1">Ethical Linen & Silk</p>
                            </div>
                            <div>
                                <p class="text-3xl font-serif-editorial text-charcoal">Zero</p>
                                <p class="text-xs text-stoneGray mt-1">Landfill Waste Target</p>
                            </div>
                            <div>
                                <p class="text-3xl font-serif-editorial text-charcoal">2 Ateliers</p>
                                <p class="text-xs text-stoneGray mt-1">Seoul & Stockholm</p>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-6 grid grid-cols-2 gap-4">
                        <div class="aspect-[3/4] rounded-xl overflow-hidden bg-canvas border border-subtleBorder shadow-sm">
                            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop" 
                                 alt="Atelier workspace" 
                                 class="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <div class="aspect-[3/4] rounded-xl overflow-hidden bg-canvas border border-subtleBorder shadow-sm mt-8">
                            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop" 
                                 alt="Textile drape detail" 
                                 class="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                        </div>
                    </div>
                </div>

                <!-- Team Section -->
                <div class="pt-16 border-t border-subtleBorder">
                    <div class="mb-12">
                        <span class="text-xs font-mono uppercase tracking-widest text-stoneGray">Collective</span>
                        <h3 class="text-3xl font-serif-editorial text-charcoal mt-1">Artisans & Directors</h3>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <!-- Member 1 -->
                        <div class="bg-canvas border border-subtleBorder rounded-2xl p-6 group hover:border-stoneGray transition-all">
                            <div class="aspect-square rounded-xl overflow-hidden mb-5 bg-cream">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" 
                                     alt="Elena Rostova" 
                                     class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h4 class="text-lg font-serif-editorial text-charcoal">Elena Rostova</h4>
                            <p class="text-xs text-stoneGray font-mono mt-0.5">Creative Director</p>
                            <p class="text-xs text-stoneGray font-light mt-3 leading-relaxed">Oversees brand aesthetic vision, garment draping, and seasonal moodboard direction.</p>
                        </div>

                        <!-- Member 2 -->
                        <div class="bg-canvas border border-subtleBorder rounded-2xl p-6 group hover:border-stoneGray transition-all">
                            <div class="aspect-square rounded-xl overflow-hidden mb-5 bg-cream">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" 
                                     alt="Min-woo Park" 
                                     class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h4 class="text-lg font-serif-editorial text-charcoal">Min-woo Park</h4>
                            <p class="text-xs text-stoneGray font-mono mt-0.5">Master Tailor & Patterning</p>
                            <p class="text-xs text-stoneGray font-light mt-3 leading-relaxed">14 years of bespoke tailoring experience in Seoul's Gangnam garment atelier.</p>
                        </div>

                        <!-- Member 3 -->
                        <div class="bg-canvas border border-subtleBorder rounded-2xl p-6 group hover:border-stoneGray transition-all sm:col-span-2 lg:col-span-1">
                            <div class="aspect-square rounded-xl overflow-hidden mb-5 bg-cream">
                                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop" 
                                     alt="Sofia Lindqvist" 
                                     class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h4 class="text-lg font-serif-editorial text-charcoal">Sofia Lindqvist</h4>
                            <p class="text-xs text-stoneGray font-mono mt-0.5">Head of Ceramic & Object Design</p>
                            <p class="text-xs text-stoneGray font-light mt-3 leading-relaxed">Specializes in Scandinavian minimalistic ceramics and tactile organic homeware.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================= SHOP / SERVICES PAGE ================= -->
        <section id="page-shop" class="spa-page hidden w-full py-20 bg-canvas border-t border-subtleBorder">
            <div class="max-w-7xl mx-auto px-6 sm:px-10">
                
                <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <span class="text-xs font-mono uppercase tracking-[0.25em] text-stoneGray">Curated Edition</span>
                        <h2 class="text-4xl sm:text-5xl font-light font-serif-editorial text-charcoal mt-1">Products & Services</h2>
                    </div>

                    <!-- Category Filters & Admin Action -->
                    <div class="flex flex-wrap items-center gap-3">
                        <button onclick="openAddProductModal()" id="shop-admin-add-btn" class="hidden px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-full text-xs font-medium transition-all shadow-sm flex items-center gap-1.5">
                            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Product
                        </button>

                        <div class="inline-flex p-1 bg-cream border border-subtleBorder rounded-full text-xs font-medium">
                            <button onclick="filterShop('All')" class="shop-cat-btn px-4 py-1.5 rounded-full bg-charcoal text-canvas transition-all" data-cat="All">All</button>
                            <button onclick="filterShop('Apparel')" class="shop-cat-btn px-4 py-1.5 rounded-full text-stoneGray hover:text-charcoal transition-all" data-cat="Apparel">Apparel</button>
                            <button onclick="filterShop('Objects')" class="shop-cat-btn px-4 py-1.5 rounded-full text-stoneGray hover:text-charcoal transition-all" data-cat="Objects">Objects</button>
                            <button onclick="filterShop('Essentials')" class="shop-cat-btn px-4 py-1.5 rounded-full text-stoneGray hover:text-charcoal transition-all" data-cat="Essentials">Bespoke</button>
                        </div>
                    </div>
                </div>

                <!-- Products Grid -->
                <div id="shop-products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    <!-- Dynamic rendering via JS -->
                </div>
            </div>
        </section>

        <!-- ================= CONTACT PAGE ================= -->
        <section id="page-contact" class="spa-page hidden w-full py-20 bg-cream border-t border-subtleBorder">
            <div class="max-w-7xl mx-auto px-6 sm:px-10">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    <!-- Concierge Details -->
                    <div class="lg:col-span-5 space-y-8">
                        <div>
                            <span class="text-xs font-mono uppercase tracking-[0.25em] text-stoneGray">Concierge Desk</span>
                            <h2 class="text-4xl font-light font-serif-editorial text-charcoal mt-2">Client Services & Inquiries</h2>
                            <p class="text-stoneGray text-sm mt-4 leading-relaxed font-light">
                                Connect with our Seoul or Stockholm ateliers for bespoke tailoring appointments, wholesale inquiries, or custom order assistance.
                            </p>
                        </div>

                        <div class="space-y-6 pt-6 border-t border-subtleBorder text-xs">
                            <div class="flex items-start gap-4">
                                <div class="p-3 bg-canvas border border-subtleBorder rounded-xl text-charcoal">
                                    <i data-lucide="mail" class="w-4 h-4"></i>
                                </div>
                                <div>
                                    <p class="text-stoneGray">Email Contact</p>
                                    <p class="text-charcoal font-mono text-sm mt-0.5">concierge@zoey.com</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div class="p-3 bg-canvas border border-subtleBorder rounded-xl text-charcoal">
                                    <i data-lucide="map-pin" class="w-4 h-4"></i>
                                </div>
                                <div>
                                    <p class="text-stoneGray">Studio Locations</p>
                                    <p class="text-charcoal font-medium text-sm mt-0.5">Gangnam-gu, Seoul & Gamla Stan, Stockholm</p>
                                </div>
                            </div>
                        </div>

                        <!-- FAQ Accordion -->
                        <div class="pt-6 border-t border-subtleBorder space-y-3">
                            <h4 class="text-xs font-mono uppercase tracking-widest text-stoneGray">Frequently Asked</h4>
                            <div class="space-y-2 text-xs">
                                <details class="bg-canvas border border-subtleBorder rounded-xl p-3 cursor-pointer">
                                    <summary class="font-medium text-charcoal">How long does custom tailoring take?</summary>
                                    <p class="mt-2 text-stoneGray font-light leading-relaxed">Fitting and hand-stitching require 2 to 3 weeks following your initial consultation.</p>
                                </details>
                                <details class="bg-canvas border border-subtleBorder rounded-xl p-3 cursor-pointer">
                                    <summary class="font-medium text-charcoal">What is the return policy?</summary>
                                    <p class="mt-2 text-stoneGray font-light leading-relaxed">Unworn apparel items may be returned within 14 days in original editorial packaging.</p>
                                </details>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form with Vercel Blob File Upload -->
                    <div class="lg:col-span-7">
                        <form onsubmit="handleContactSubmit(event)" class="bg-canvas border border-subtleBorder rounded-2xl p-8 sm:p-10 space-y-6 shadow-sm">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="text-xs font-medium text-stoneGray uppercase tracking-wider">Name *</label>
                                    <input type="text" id="contact-name" required placeholder="e.g. Min-Ji Kim" class="w-full bg-cream border border-subtleBorder rounded-xl px-4 py-3.5 text-xs text-charcoal placeholder-stoneGray/50 focus:outline-none focus:border-charcoal transition-colors" />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-xs font-medium text-stoneGray uppercase tracking-wider">Email *</label>
                                    <input type="email" id="contact-email" required placeholder="name@domain.com" class="w-full bg-cream border border-subtleBorder rounded-xl px-4 py-3.5 text-xs text-charcoal placeholder-stoneGray/50 focus:outline-none focus:border-charcoal transition-colors" />
                                </div>
                            </div>

                            <div class="space-y-2">
                                <label class="text-xs font-medium text-stoneGray uppercase tracking-wider">Inquiry Type</label>
                                <select id="contact-type" class="w-full bg-cream border border-subtleBorder rounded-xl px-4 py-3.5 text-xs text-charcoal focus:outline-none focus:border-charcoal transition-colors">
                                    <option value="Bespoke Consultation">Bespoke Fitting & Consultation</option>
                                    <option value="Order & Shipping">Order & Atelier Shipping</option>
                                    <option value="Press & Editorial">Press & Editorial Inquiry</option>
                                </select>
                            </div>

                            <div class="space-y-2">
                                <label class="text-xs font-medium text-stoneGray uppercase tracking-wider">Message *</label>
                                <textarea id="contact-message" required rows="4" placeholder="Share your message or fitting specifications..." class="w-full bg-cream border border-subtleBorder rounded-xl px-4 py-3.5 text-xs text-charcoal placeholder-stoneGray/50 focus:outline-none focus:border-charcoal transition-colors resize-none"></textarea>
                            </div>

                            <!-- Vercel Blob Upload Component -->
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <label class="text-xs font-medium text-stoneGray uppercase tracking-wider">Attachment</label>
                                    <span class="text-[10px] font-mono text-stoneGray">Vercel Blob Storage API</span>
                                </div>
                                <div class="border border-dashed border-subtleBorder hover:border-stoneGray bg-cream rounded-xl p-5 text-center cursor-pointer transition-all relative">
                                    <input type="file" id="contact-blob-file" onchange="handleFileSelect(event)" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                    <div id="file-upload-display" class="space-y-1">
                                        <i data-lucide="upload-cloud" class="w-5 h-5 text-stoneGray mx-auto"></i>
                                        <p class="text-xs text-stoneGray">Click or drag moodboard / photo reference here</p>
                                        <p class="text-[10px] text-stoneGray/70">Stored on @vercel/blob CDN with instant preview</p>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" class="w-full py-4 bg-charcoal text-canvas text-xs font-medium uppercase tracking-[0.2em] rounded-xl hover:bg-stoneGray transition-all duration-300 flex items-center justify-center gap-2">
                                <span>Submit Inquiry</span>
                                <i data-lucide="arrow-right" class="w-4 h-4"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================= REMO ADMIN DASHBOARD PANEL ================= -->
        <section id="admin-panel-section" class="hidden bg-remoBg text-white border-t border-remoBorder py-12 px-6 sm:px-10">
            <div class="max-w-7xl mx-auto space-y-8">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-remoBorder pb-6">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono border border-sky-400/30">remO admin System</span>
                            <span class="text-xs text-slate-400 font-mono">Next.js App Router + Neon Serverless Postgres</span>
                        </div>
                        <h2 class="text-2xl font-light font-serif-editorial text-white mt-1">Live Store Analytics & Data Controls</h2>
                    </div>
                    <div class="flex items-center gap-3">
                        <button onclick="openAddProductModal()" class="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-medium transition-all shadow-md flex items-center gap-2">
                            <i data-lucide="plus" class="w-4 h-4"></i> Add Product to Neon DB
                        </button>
                    </div>
                </div>

                <!-- Admin Metrics -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-slate-900/80 border border-remoBorder rounded-xl p-5">
                        <p class="text-xs text-slate-400 font-mono">Gross Sales (Neon DB)</p>
                        <p class="text-2xl font-light text-white mt-2 font-mono">₩ 24,800,000</p>
                        <span class="text-[10px] text-emerald-400 flex items-center gap-1 mt-2 font-mono">
                            <i data-lucide="trending-up" class="w-3 h-3"></i> +18.4% this month
                        </span>
                    </div>

                    <div class="bg-slate-900/80 border border-remoBorder rounded-xl p-5">
                        <p class="text-xs text-slate-400 font-mono">Products in Catalog</p>
                        <p class="text-2xl font-light text-white mt-2 font-mono" id="admin-stat-prod-count">6 Active</p>
                        <span class="text-[10px] text-slate-400 mt-2 block font-mono">Images hosted on Vercel Blob</span>
                    </div>

                    <div class="bg-slate-900/80 border border-remoBorder rounded-xl p-5">
                        <p class="text-xs text-slate-400 font-mono">Inquiries Received</p>
                        <p class="text-2xl font-light text-white mt-2 font-mono" id="admin-stat-inq-count">3 Messages</p>
                        <span class="text-[10px] text-amber-400 flex items-center gap-1 mt-2 font-mono">
                            <i data-lucide="clock" class="w-3 h-3"></i> Pending Review
                        </span>
                    </div>

                    <div class="bg-slate-900/80 border border-remoBorder rounded-xl p-5">
                        <p class="text-xs text-slate-400 font-mono">Active Account</p>
                        <p class="text-xl font-light text-sky-300 mt-2 font-mono">remO admin</p>
                        <span class="text-[10px] text-slate-400 mt-2 block font-mono">Role: SUPER_ADMIN</span>
                    </div>
                </div>

                <!-- Inquiries Data Grid in Admin -->
                <div class="bg-slate-900 border border-remoBorder rounded-xl p-6 space-y-4">
                    <div class="flex items-center justify-between border-b border-remoBorder pb-3">
                        <h3 class="text-sm font-mono text-slate-200 flex items-center gap-2">
                            <i data-lucide="inbox" class="w-4 h-4 text-sky-400"></i> Neon Postgres 'inquiries' Table
                        </h3>
                        <span class="text-xs text-slate-400 font-mono">zoey_db / public schema</span>
                    </div>

                    <div id="admin-inquiries-table" class="space-y-2 font-mono text-xs max-h-60 overflow-y-auto pr-2">
                        <!-- Populated via JS -->
                    </div>
                </div>

                <!-- Live Query Shell Simulator -->
                <div class="bg-slate-950 rounded-xl p-4 border border-remoBorder font-mono text-xs text-slate-300 space-y-2">
                    <div class="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                        <span class="flex items-center gap-2">
                            <i data-lucide="database" class="w-3.5 h-3.5 text-sky-400"></i> Neon Postgres Query Engine
                        </span>
                        <span class="text-slate-500">zoey/main repository</span>
                    </div>
                    <div class="text-[11px] text-slate-400 space-y-1">
                        <p><span class="text-sky-400">SELECT</span> * <span class="text-sky-400">FROM</span> products <span class="text-sky-400">ORDER BY</span> created_at <span class="text-sky-400">DESC</span>; <span class="text-slate-500">-- 6 rows (8ms)</span></p>
                        <p><span class="text-emerald-400">VERCEL_BLOB:</span> https://blob.vercel-storage.com/zoey/atelier-wool-coat.jpg <span class="text-slate-500">[HTTP 200]</span></p>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <!-- Footer -->
    <footer class="bg-charcoal text-canvas py-16 text-xs">
        <div class="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 md:grid-cols-4 gap-10">
            <div class="space-y-4">
                <span class="text-3xl font-serif-editorial text-canvas">zoey.</span>
                <p class="text-stoneGray text-xs leading-relaxed font-light">
                    In the quiet details, we discover our truest form. Powered by Next.js, Neon Serverless Postgres, and Vercel Blob.
                </p>
            </div>

            <div>
                <h4 class="text-canvas uppercase tracking-widest font-mono text-[11px] mb-4">Pages</h4>
                <ul class="space-y-2.5 text-stoneGray">
                    <li><button onclick="navigateTo('home')" class="hover:text-canvas transition-colors">Home</button></li>
                    <li><button onclick="navigateTo('about')" class="hover:text-canvas transition-colors">About Us</button></li>
                    <li><button onclick="navigateTo('shop')" class="hover:text-canvas transition-colors">Shop Products</button></li>
                    <li><button onclick="navigateTo('contact')" class="hover:text-canvas transition-colors">Contact</button></li>
                </ul>
            </div>

            <div>
                <h4 class="text-canvas uppercase tracking-widest font-mono text-[11px] mb-4">Tech Architecture</h4>
                <ul class="space-y-2 font-mono text-[11px] text-stoneGray">
                    <li>Repository: github.com/zoey</li>
                    <li>Hosting: Vercel Platform</li>
                    <li>DB: Neon Postgres</li>
                    <li>Storage: Vercel Blob</li>
                    <li>Role: remO admin</li>
                </ul>
            </div>

            <div>
                <h4 class="text-canvas uppercase tracking-widest font-mono text-[11px] mb-4">Atelier Hours</h4>
                <p class="text-stoneGray font-mono text-[11px]">Mon — Fri: 10:00 - 18:00 KST</p>
                <p class="text-stoneGray font-mono text-[11px] mt-1">Saturday by Private Appointment</p>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-6 sm:px-10 pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-stoneGray text-[11px]">
            <p>&copy; 2026 zoey. All rights reserved.</p>
            <div class="flex space-x-6 mt-4 sm:mt-0">
                <a href="#" class="hover:text-canvas">Pinterest Board</a>
                <a href="#" class="hover:text-canvas">Instagram</a>
                <a href="#" class="hover:text-canvas">Lookbook PDF</a>
            </div>
        </div>
    </footer>

    <!-- Cart Slide-out Drawer -->
    <div id="cart-drawer" class="fixed inset-0 z-50 pointer-events-none">
        <div id="cart-backdrop" onclick="toggleCart()" class="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 transition-opacity duration-300 pointer-events-none"></div>

        <div id="cart-panel" class="absolute top-0 right-0 h-full w-full max-w-md bg-canvas border-l border-subtleBorder shadow-2xl transform translate-x-full transition-transform duration-300 pointer-events-auto flex flex-col">
            <div class="p-6 border-b border-subtleBorder flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <span class="text-xl font-serif-editorial text-charcoal">Your Shopping Bag</span>
                    <span class="text-xs font-mono text-stoneGray" id="cart-drawer-count">(0)</span>
                </div>
                <button onclick="toggleCart()" class="p-2 text-stoneGray hover:text-charcoal">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <!-- Cart Items List -->
            <div id="cart-items-list" class="flex-1 overflow-y-auto p-6 space-y-4">
                <!-- JS populated -->
            </div>

            <!-- Cart Footer -->
            <div class="p-6 border-t border-subtleBorder bg-cream space-y-4">
                <div class="flex items-center justify-between text-sm">
                    <span class="text-stoneGray">Subtotal</span>
                    <span class="font-mono text-charcoal font-medium" id="cart-subtotal-val">₩ 0</span>
                </div>
                <p class="text-[10px] text-stoneGray">Calculated with Portone PG & Neon DB checkout session.</p>
                <button onclick="handleCheckout()" class="w-full py-4 bg-charcoal text-canvas text-xs font-medium uppercase tracking-[0.2em] rounded-xl hover:bg-stoneGray transition-all">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    </div>

    <!-- Auth Modal -->
    <div id="auth-modal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
        <div class="bg-canvas border border-subtleBorder rounded-2xl max-w-md w-full p-8 relative shadow-2xl space-y-6 animate-fade-in">
            <button onclick="closeAuthModal()" class="absolute top-5 right-5 text-stoneGray hover:text-charcoal p-1">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>

            <div class="text-center space-y-1">
                <span class="text-3xl font-serif-editorial text-charcoal">zoey.</span>
                <p class="text-xs text-stoneGray">Authentication & Account</p>
            </div>

            <form onsubmit="handleAuthSubmit(event)" class="space-y-4">
                <div class="space-y-1">
                    <label class="text-xs font-medium text-stoneGray uppercase tracking-wider">Email Address</label>
                    <input type="email" id="auth-email-input" required placeholder="user@zoey.com" class="w-full bg-cream border border-subtleBorder rounded-xl px-4 py-3 text-xs text-charcoal focus:outline-none focus:border-charcoal" />
                </div>
                <div class="space-y-1">
                    <label class="text-xs font-medium text-stoneGray uppercase tracking-wider">Password</label>
                    <input type="password" required value="••••••••" class="w-full bg-cream border border-subtleBorder rounded-xl px-4 py-3 text-xs text-charcoal focus:outline-none focus:border-charcoal" />
                </div>

                <button type="submit" class="w-full py-3.5 bg-charcoal text-canvas text-xs font-medium uppercase tracking-[0.2em] rounded-xl hover:bg-stoneGray transition-all">
                    Sign In
                </button>
            </form>

            <div class="pt-4 border-t border-subtleBorder text-center space-y-3">
                <p class="text-xs text-stoneGray">Quick OAuth Login</p>
                <div class="flex gap-3">
                    <button onclick="quickAuth('Kakao')" class="flex-1 py-2.5 bg-[#FEE500] text-black text-xs font-medium rounded-xl hover:opacity-90 transition-opacity">Kakao</button>
                    <button onclick="quickAuth('Google')" class="flex-1 py-2.5 bg-cream border border-subtleBorder text-charcoal text-xs font-medium rounded-xl hover:bg-paperDark transition-all">Google</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Product Quick View Modal -->
    <div id="quickview-modal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
        <div id="quickview-content" class="bg-canvas border border-subtleBorder rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl animate-fade-in">
            <!-- Dynamically populated -->
        </div>
    </div>

    <!-- Add Product Modal (remO admin) -->
    <div id="add-product-modal" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm hidden flex items-center justify-center p-4">
        <div class="bg-slate-900 border border-remoBorder text-white rounded-2xl max-w-lg w-full p-8 relative shadow-2xl space-y-6 animate-fade-in">
            <button onclick="closeAddProductModal()" class="absolute top-5 right-5 text-slate-400 hover:text-white p-1">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>

            <div>
                <span class="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono border border-sky-400/30">remO admin CRUD</span>
                <h3 class="text-2xl font-serif-editorial text-white mt-1">Insert Product into Neon DB</h3>
            </div>

            <form onsubmit="handleAddProduct(event)" class="space-y-4">
                <div class="space-y-1">
                    <label class="text-xs text-slate-300 uppercase tracking-wider">Product Title *</label>
                    <input type="text" id="add-prod-title" required placeholder="e.g. Silk Drape Tunic" class="w-full bg-slate-950 border border-remoBorder rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400" />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                        <label class="text-xs text-slate-300 uppercase tracking-wider">Price (KRW) *</label>
                        <input type="number" id="add-prod-price" required placeholder="420000" class="w-full bg-slate-950 border border-remoBorder rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400" />
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs text-slate-300 uppercase tracking-wider">Category</label>
                        <select id="add-prod-cat" class="w-full bg-slate-950 border border-remoBorder rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400">
                            <option value="Apparel">Apparel</option>
                            <option value="Objects">Objects</option>
                            <option value="Essentials">Essentials</option>
                        </select>
                    </div>
                </div>

                <div class="space-y-1">
                    <label class="text-xs text-slate-300 uppercase tracking-wider">Description</label>
                    <textarea id="add-prod-desc" rows="3" placeholder="Minimalist product details..." class="w-full bg-slate-950 border border-remoBorder rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400 resize-none"></textarea>
                </div>

                <div class="space-y-1">
                    <label class="text-xs text-slate-300 uppercase tracking-wider">Image URL (Vercel Blob)</label>
                    <input type="url" id="add-prod-img" placeholder="https://images.unsplash.com/..." class="w-full bg-slate-950 border border-remoBorder rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400" />
                </div>

                <button type="submit" class="w-full py-3.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium uppercase tracking-[0.2em] rounded-xl transition-all">
                    Commit to Database
                </button>
            </form>
        </div>
    </div>

    <script>
        // Application State
        let currentView = 'home';
        let isAdminMode = false;
        let cart = [];
        let activeShopCategory = 'All';
        let user = null;

        // Mock Database Items (Neon Postgres Initial State)
        let products = [
            {
                id: 1,
                title: "Architectural Wool Trench Coat",
                price: 680000,
                category: "Apparel",
                desc: "Heavyweight virgin wool coat with structured drop shoulder lines and horn button closure.",
                image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop"
            },
            {
                id: 2,
                title: "Mulberry Silk Fluid Slip",
                price: 340000,
                category: "Apparel",
                desc: "100% organic mulberry silk dress tailored for fluid movement and soft drape.",
                image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop"
            },
            {
                id: 3,
                title: "Hand-Thrown Clay Vessel No. 04",
                price: 190000,
                category: "Objects",
                desc: "Limited-edition ceramic object created in our Stockholm studio with raw matte glaze.",
                image: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?q=80&w=800&auto=format&fit=crop"
            },
            {
                id: 4,
                title: "Bespoke Fitting & Tailoring Session",
                price: 1200000,
                category: "Essentials",
                desc: "Private 1-on-1 consultation and garment creation at our Gangnam atelier.",
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
            },
            {
                id: 5,
                title: "Structured Calfskin Tote Bag",
                price: 520000,
                category: "Apparel",
                desc: "Vegetable-tanned full-grain leather tote with hidden magnetic enclosure.",
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"
            },
            {
                id: 6,
                title: "Mongolian Oversized Cashmere Knit",
                price: 410000,
                category: "Apparel",
                desc: "Ethically harvested Mongolian cashmere sweater with ribbed neck finish.",
                image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop"
            }
        ];

        // Inquiries DB State
        let inquiries = [
            { name: "Min-Ji Kim", email: "minji@example.com", type: "Bespoke Consultation", date: "10 mins ago" },
            { name: "David Chen", email: "david@editorial.io", type: "Press & Editorial", date: "2 hours ago" },
            { name: "Sarah Lin", email: "sarah@design.com", type: "Order & Shipping", date: "1 day ago" }
        ];

        // Format Currency Helper
        function formatKRW(val) {
            return '₩ ' + val.toLocaleString('ko-KR');
        }

        // Toast Notification System
        function showToast(message, type = 'info') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = "pointer-events-auto bg-charcoal text-canvas border border-subtleBorder px-4 py-3 rounded-xl shadow-lg text-xs font-mono flex items-center gap-3 animate-fade-in";
            
            let icon = 'info';
            if (type === 'success') icon = 'check-circle-2';
            if (type === 'admin') icon = 'shield-check';

            toast.innerHTML = `
                <i data-lucide="${icon}" class="w-4 h-4 text-stoneGray"></i>
                <span>${message}</span>
            `;
            container.appendChild(toast);
            lucide.createIcons();

            setTimeout(() => {
                toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        // Initializer
        window.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
            renderShopProducts();
            renderAdminInquiries();
        });

        // SPA View Switcher
        function navigateTo(pageId) {
            currentView = pageId;
            document.querySelectorAll('.spa-page').forEach(el => el.classList.add('hidden'));
            const target = document.getElementById(`page-${pageId}`);
            if (target) {
                target.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Update Nav buttons styling
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.className = "nav-btn hover:text-charcoal transition-colors py-1 relative text-stoneGray";
            });
            const activeNav = document.getElementById(`nav-${pageId}`);
            if (activeNav) {
                activeNav.className = "nav-btn text-charcoal transition-colors py-1 relative font-semibold";
            }
        }

        // Render Shop Items
        function renderShopProducts() {
            const container = document.getElementById('shop-products-grid');
            container.innerHTML = '';

            const filtered = activeShopCategory === 'All' 
                ? products 
                : products.filter(p => p.category === activeShopCategory);

            filtered.forEach(p => {
                const card = document.createElement('div');
                card.className = "group bg-canvas border border-subtleBorder rounded-2xl overflow-hidden hover:border-stoneGray transition-all duration-500 flex flex-col justify-between";
                
                card.innerHTML = `
                    <div>
                        <div class="relative aspect-[3/4] overflow-hidden bg-cream">
                            <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <span class="absolute top-4 left-4 px-3 py-1 bg-canvas/90 blur-glass text-[10px] font-mono uppercase tracking-widest text-stoneGray rounded-full border border-subtleBorder">
                                ${p.category}
                            </span>
                            <button onclick="openQuickView(${p.id})" class="absolute bottom-4 right-4 p-2.5 bg-canvas/90 blur-glass rounded-full border border-subtleBorder opacity-0 group-hover:opacity-100 transition-opacity hover:bg-charcoal hover:text-canvas" title="Quick View">
                                <i data-lucide="eye" class="w-4 h-4"></i>
                            </button>
                            ${isAdminMode ? `
                                <button onclick="deleteProduct(${p.id})" class="absolute top-4 right-4 p-2 bg-rose-900/80 text-white rounded-full hover:bg-rose-800 transition-colors" title="Delete from Neon DB">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                </button>
                            ` : ''}
                        </div>
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-serif-editorial text-charcoal font-normal">${p.title}</h3>
                            <p class="text-xs text-stoneGray font-light leading-relaxed">${p.desc}</p>
                        </div>
                    </div>
                    <div class="p-6 pt-0 flex items-center justify-between border-t border-subtleBorder/50 mt-4">
                        <span class="text-sm font-mono text-charcoal font-medium">${formatKRW(p.price)}</span>
                        <button onclick="addToCart(${p.id})" class="px-4 py-2 border border-charcoal/20 rounded-full text-xs font-medium uppercase tracking-wider text-charcoal hover:bg-charcoal hover:text-canvas transition-all">
                            Add to Bag
                        </button>
                    </div>
                `;
                container.appendChild(card);
            });

            lucide.createIcons();
            document.getElementById('admin-stat-prod-count').innerText = `${products.length} Active`;
        }

        function filterShop(cat) {
            activeShopCategory = cat;
            document.querySelectorAll('.shop-cat-btn').forEach(btn => {
                if (btn.dataset.cat === cat) {
                    btn.className = "shop-cat-btn px-4 py-1.5 rounded-full bg-charcoal text-canvas transition-all";
                } else {
                    btn.className = "shop-cat-btn px-4 py-1.5 rounded-full text-stoneGray hover:text-charcoal transition-all";
                }
            });
            renderShopProducts();
        }

        // Quick View Modal
        function openQuickView(id) {
            const item = products.find(p => p.id === id);
            if (!item) return;

            const modal = document.getElementById('quickview-modal');
            const content = document.getElementById('quickview-content');

            content.innerHTML = `
                <button onclick="closeQuickView()" class="absolute top-5 right-5 text-stoneGray hover:text-charcoal p-1">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div class="aspect-[3/4] rounded-xl overflow-hidden bg-cream">
                        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" />
                    </div>
                    <div class="space-y-6">
                        <span class="text-xs font-mono uppercase text-stoneGray tracking-widest">${item.category}</span>
                        <h3 class="text-3xl font-serif-editorial text-charcoal">${item.title}</h3>
                        <p class="text-xl font-mono text-charcoal">${formatKRW(item.price)}</p>
                        <p class="text-xs text-stoneGray font-light leading-relaxed">${item.desc}</p>
                        <button onclick="addToCart(${item.id}); closeQuickView()" class="w-full py-4 bg-charcoal text-canvas text-xs font-medium uppercase tracking-[0.2em] rounded-xl hover:bg-stoneGray transition-all">
                            Add to Shopping Bag
                        </button>
                    </div>
                </div>
            `;

            modal.classList.remove('hidden');
            lucide.createIcons();
        }

        function closeQuickView() {
            document.getElementById('quickview-modal').classList.add('hidden');
        }

        // Cart Logic
        function toggleCart() {
            const drawer = document.getElementById('cart-drawer');
            const backdrop = document.getElementById('cart-backdrop');
            const panel = document.getElementById('cart-panel');

            if (panel.classList.contains('translate-x-full')) {
                drawer.classList.remove('pointer-events-none');
                backdrop.classList.remove('opacity-0', 'pointer-events-none');
                panel.classList.remove('translate-x-full');
            } else {
                backdrop.classList.add('opacity-0', 'pointer-events-none');
                panel.classList.add('translate-x-full');
                setTimeout(() => drawer.classList.add('pointer-events-none'), 300);
            }
        }

        function addToCart(productId) {
            const prod = products.find(p => p.id === productId);
            if (!prod) return;

            const existing = cart.find(c => c.id === productId);
            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ ...prod, qty: 1 });
            }

            updateCartUI();
            showToast(`Added '${prod.title}' to bag`, 'success');
        }

        function removeFromCart(productId) {
            cart = cart.filter(c => c.id !== productId);
            updateCartUI();
        }

        function updateCartUI() {
            const badge = document.getElementById('cart-badge');
            const drawerCount = document.getElementById('cart-drawer-count');
            const list = document.getElementById('cart-items-list');
            const subtotalVal = document.getElementById('cart-subtotal-val');

            const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
            const totalSum = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

            badge.innerText = totalQty;
            drawerCount.innerText = `(${totalQty})`;
            subtotalVal.innerText = formatKRW(totalSum);

            if (cart.length === 0) {
                list.innerHTML = `
                    <div class="text-center py-20 text-stoneGray space-y-3">
                        <i data-lucide="shopping-bag" class="w-8 h-8 mx-auto stroke-1 text-stoneGray"></i>
                        <p class="text-xs font-light">Your shopping bag is empty.</p>
                    </div>
                `;
            } else {
                list.innerHTML = '';
                cart.forEach(item => {
                    const row = document.createElement('div');
                    row.className = "flex items-center gap-4 p-3 bg-cream border border-subtleBorder rounded-xl";
                    row.innerHTML = `
                        <img src="${item.image}" alt="${item.title}" class="w-16 h-20 object-cover rounded-lg bg-canvas" />
                        <div class="flex-1">
                            <h4 class="text-xs font-serif-editorial text-charcoal font-normal">${item.title}</h4>
                            <p class="text-[11px] font-mono text-stoneGray mt-1">${formatKRW(item.price)} x ${item.qty}</p>
                        </div>
                        <button onclick="removeFromCart(${item.id})" class="p-1 text-stoneGray hover:text-charcoal">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    `;
                    list.appendChild(row);
                });
            }
            lucide.createIcons();
        }

        function handleCheckout() {
            if (cart.length === 0) {
                showToast('Your shopping bag is empty');
                return;
            }
            showToast('Initiating Portone PG Checkout Session...', 'info');
        }

        // remO admin Toggle
        function toggleAdminMode() {
            isAdminMode = !isAdminMode;

            const topBar = document.getElementById('admin-top-bar');
            const panelSection = document.getElementById('admin-panel-section');
            const shopAddBtn = document.getElementById('shop-admin-add-btn');
            const pillDot = document.getElementById('admin-pill-dot');

            if (isAdminMode) {
                topBar.classList.remove('hidden');
                panelSection.classList.remove('hidden');
                shopAddBtn.classList.remove('hidden');
                pillDot.className = "w-2 h-2 rounded-full bg-sky-400 animate-pulse";
                user = { name: "remO admin", role: "ADMIN" };
                showToast("Switched to remO admin Mode", 'admin');
            } else {
                topBar.classList.add('hidden');
                panelSection.classList.add('hidden');
                shopAddBtn.classList.add('hidden');
                pillDot.className = "w-2 h-2 rounded-full bg-stoneGray";
                user = null;
                showToast("Exited remO admin Mode");
            }

            renderShopProducts();
        }

        function scrollToAdminPanel() {
            document.getElementById('admin-panel-section').scrollIntoView({ behavior: 'smooth' });
        }

        function openAddProductModal() {
            document.getElementById('add-product-modal').classList.remove('hidden');
        }

        function closeAddProductModal() {
            document.getElementById('add-product-modal').classList.add('hidden');
        }

        function handleAddProduct(e) {
            e.preventDefault();
            const title = document.getElementById('add-prod-title').value;
            const price = parseInt(document.getElementById('add-prod-price').value) || 0;
            const cat = document.getElementById('add-prod-cat').value;
            const desc = document.getElementById('add-prod-desc').value || "Atelier crafted editorial piece.";
            const img = document.getElementById('add-prod-img').value || "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop";

            const newItem = {
                id: Date.now(),
                title: title,
                price: price,
                category: cat,
                desc: desc,
                image: img
            };

            products.unshift(newItem);
            renderShopProducts();
            closeAddProductModal();
            showToast(`Inserted '${title}' into Neon DB & Vercel Blob`, 'success');
        }

        function deleteProduct(id) {
            products = products.filter(p => p.id !== id);
            renderShopProducts();
            showToast('Deleted item from Neon Postgres DB');
        }

        // Contact & Vercel Blob Upload Simulation
        function handleFileSelect(e) {
            const file = e.target.files[0];
            if (file) {
                document.getElementById('file-upload-display').innerHTML = `
                    <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600 mx-auto"></i>
                    <p class="text-xs text-charcoal font-mono">${file.name}</p>
                    <p class="text-[10px] text-stoneGray">Uploaded to Vercel Blob (@vercel/blob)</p>
                `;
                lucide.createIcons();
            }
        }

        function handleContactSubmit(e) {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const type = document.getElementById('contact-type').value;

            inquiries.unshift({
                name: name,
                email: email,
                type: type,
                date: "Just now"
            });

            renderAdminInquiries();
            e.target.reset();
            showToast('Inquiry recorded in Neon DB!', 'success');
        }

        function renderAdminInquiries() {
            const table = document.getElementById('admin-inquiries-table');
            table.innerHTML = '';

            inquiries.forEach(iq => {
                const row = document.createElement('div');
                row.className = "p-3 bg-slate-950 border border-remoBorder rounded-lg flex items-center justify-between";
                row.innerHTML = `
                    <div>
                        <p class="text-white font-medium text-xs">${iq.name} <span class="text-slate-400 font-normal">(${iq.type})</span></p>
                        <p class="text-[10px] text-slate-400">${iq.email}</p>
                    </div>
                    <span class="text-[9px] text-slate-500">${iq.date}</span>
                `;
                table.appendChild(row);
            });

            document.getElementById('admin-stat-inq-count').innerText = `${inquiries.length} Messages`;
        }

        // Auth Modal Controls
        function openAuthModal() {
            document.getElementById('auth-modal').classList.remove('hidden');
        }

        function closeAuthModal() {
            document.getElementById('auth-modal').classList.add('hidden');
        }

        function handleAuthSubmit(e) {
            e.preventDefault();
            const email = document.getElementById('auth-email-input').value;
            user = { name: email.split('@')[0], role: email.includes('admin') ? 'ADMIN' : 'USER' };

            document.getElementById('auth-dot').classList.remove('hidden');
            closeAuthModal();

            if (user.role === 'ADMIN' && !isAdminMode) {
                toggleAdminMode();
            } else {
                showToast(`Signed in as ${user.name}`, 'success');
            }
        }

        function quickAuth(provider) {
            user = { name: `${provider} Member`, role: 'USER' };
            document.getElementById('auth-dot').classList.remove('hidden');
            closeAuthModal();
            showToast(`Signed in with ${provider}`, 'success');
        }

        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            const openIcon = document.getElementById('menu-icon-open');
            const closeIcon = document.getElementById('menu-icon-close');
            menu.classList.toggle('hidden');
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        }
    </script>
</body>
</html>
