document.addEventListener('DOMContentLoaded', () => {
  // --- Global State & Data ---
  const bannerAlerts = [
    { tag: "Notice", desc: "GeM portal maintenance scheduled for this Sunday from 2 AM to 6 AM." },
    { tag: "Update", desc: "GeM 2.0 AI-based smart matchmaking system is now live for all central ministries." },
    { tag: "Alert", desc: "MSME sellers: Submit your annual turnover declaration before March 31st." },
    { tag: "Initiative", desc: "Womaniya & Start-up Runway catalogs are now highlighted with special badges." }
  ];

  let currentAlertIndex = 0;
  let homePageBackupHTML = "";

  // --- Utility Helpers ---
  const showToast = (message, type = 'info') => {
    const existing = document.getElementById('gem-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'gem-toast';
    toast.className = `fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-white text-xs font-semibold page-fade-in ${
      type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-red-600' : 'bg-slate-900 border border-slate-700'
    }`;

    const icon = type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-info text-amber-400';
    toast.innerHTML = `
      <i class="fa-solid ${icon} text-sm"></i>
      <span>${message}</span>
      <button class="ml-3 text-slate-300 hover:text-white cursor-pointer bg-transparent border-none" onclick="this.parentElement.remove()">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4500);
  };

  const copyToClipboard = (text, label = "Item") => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied to clipboard!`, 'success');
    }).catch(() => {
      showToast(`Copied: ${text}`, 'info');
    });
  };

  // --- Rotator Notice Bar ---
  const startNoticeRotator = () => {
    const container = document.getElementById('marquee-content');
    const parent = container?.parentElement;
    const tagEl = document.getElementById('notice-tag');
    const descEl = document.getElementById('notice-desc');

    if (!container || !parent || !tagEl || !descEl) return;

    let currentX = parent.clientWidth;
    const speed = 1.3;

    function step() {
      currentX -= speed;
      if (currentX < -container.clientWidth) {
        currentX = parent.clientWidth;
        currentAlertIndex = (currentAlertIndex + 1) % bannerAlerts.length;
        tagEl.textContent = bannerAlerts[currentAlertIndex].tag;
        descEl.textContent = bannerAlerts[currentAlertIndex].desc;
      }
      container.style.transform = `translateX(${currentX}px)`;
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  // --- Hero Carousel Controller ---
  const initHeroCarousel = () => {
    const slidesContainer = document.getElementById('hero-slides');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    if (!slidesContainer || !prevBtn || !nextBtn) return;

    slidesContainer.innerHTML = `
      <div class="w-full min-w-full h-full flex-shrink-0 relative">
        <img src="./src/components/img/banner1.jpg" alt="Hero Banner 1" class="w-full h-full object-cover object-top" />
      </div>
      <div class="w-full min-w-full h-full flex-shrink-0 relative">
        <img src="./src/components/img/banner2.jpg" alt="Hero Banner 2" class="w-full h-full object-cover object-top" />
      </div>
      <div class="w-full min-w-full h-full flex-shrink-0 relative">
        <img src="./src/components/img/banner3.jpg" alt="Hero Banner 3" class="w-full h-full object-cover object-top" />
      </div>
    `;

    const originalSlides = Array.from(slidesContainer.children);
    const totalOriginalSlides = originalSlides.length;

    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[totalOriginalSlides - 1].cloneNode(true);
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, originalSlides[0]);

    let currentIndex = 1;
    let isTransitioning = false;
    let autoSlideInterval;

    slidesContainer.style.transition = 'none';
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    const updateCarousel = (targetIndex, animate = true) => {
      if (isTransitioning && animate) return;
      isTransitioning = animate;
      currentIndex = targetIndex;
      slidesContainer.style.transition = animate ? 'transform 500ms ease-in-out' : 'none';
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    slidesContainer.addEventListener('transitionend', () => {
      isTransitioning = false;
      if (currentIndex === totalOriginalSlides + 1) {
        updateCarousel(1, false);
      } else if (currentIndex === 0) {
        updateCarousel(totalOriginalSlides, false);
      }
    });

    const startAutoSlide = () => {
      stopAutoSlide();
      autoSlideInterval = setInterval(() => {
        if (!isTransitioning) updateCarousel(currentIndex + 1);
      }, 4500);
    };

    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    };

    prevBtn.onclick = (e) => {
      e.preventDefault();
      if (!isTransitioning) {
        updateCarousel(currentIndex - 1);
        startAutoSlide();
      }
    };

    nextBtn.onclick = (e) => {
      e.preventDefault();
      if (!isTransitioning) {
        updateCarousel(currentIndex + 1);
        startAutoSlide();
      }
    };

    const carouselSection = slidesContainer.parentElement;
    if (carouselSection) {
      carouselSection.onmouseenter = stopAutoSlide;
      carouselSection.onmouseleave = startAutoSlide;
    }

    startAutoSlide();
  };

  // --- Statistics Section Toggle Logic ---
  const initStatsToggle = () => {
    const toggleBtn = document.getElementById('toggle-stats-btn');
    const statsDashboard = document.getElementById('stats-dashboard');
    if (!toggleBtn || !statsDashboard) return;

    toggleBtn.onclick = (e) => {
      e.preventDefault();
      if (statsDashboard.classList.contains('hidden')) {
        statsDashboard.classList.remove('hidden');
        statsDashboard.offsetHeight;
        statsDashboard.classList.remove('opacity-0', '-translate-y-4');
        statsDashboard.classList.add('opacity-100', 'translate-y-0');
        toggleBtn.textContent = 'Hide Quick Stats';
      } else {
        statsDashboard.classList.add('opacity-0', '-translate-y-4');
        statsDashboard.classList.remove('opacity-100', 'translate-y-0');
        toggleBtn.textContent = 'Toggle Quick Stats';
        setTimeout(() => statsDashboard.classList.add('hidden'), 500);
      }
    };
  };

  // --- Waterfall Hamburger Menu (Single overlay with body scroll lock) ---
  const initHamburgerDrawer = () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-drawer-btn');
    const drawer = document.getElementById('hamburger-drawer');
    if (!hamburgerBtn || !closeBtn || !drawer) return;

    hamburgerBtn.onclick = (e) => {
      e.preventDefault();
      drawer.classList.remove('-translate-y-full');
      drawer.classList.add('translate-y-0');
      document.body.classList.add('overflow-hidden');
    };

    closeBtn.onclick = (e) => {
      e.preventDefault();
      closeHamburgerDrawer();
    };
  };

  const closeHamburgerDrawer = () => {
    const drawer = document.getElementById('hamburger-drawer');
    if (drawer) {
      drawer.classList.remove('translate-y-0');
      drawer.classList.add('-translate-y-full');
      document.body.classList.remove('overflow-hidden');
    }
  };

  // --- Breadcrumb & Page Banner Builder ---
  const renderPageBanner = (title, subtitle, icon, category = "GeM 2.0 Portal") => {
    return `
      <div class="bg-slate-900 text-white border-b border-slate-800 py-10 px-4 sm:px-6 relative overflow-hidden mb-8">
        <div class="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -left-16 -bottom-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <nav class="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3" aria-label="Breadcrumb">
              <a href="#home" data-route="home" class="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <i class="fa-solid fa-house text-[10px]"></i> Home
              </a>
              <span>/</span>
              <span class="text-amber-400 font-bold">${category}</span>
              <span>/</span>
              <span class="text-slate-200">${title}</span>
            </nav>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg border border-amber-500/30">
                <i class="fa-solid ${icon}"></i>
              </div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">${title}</h1>
            </div>
            <p class="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">${subtitle}</p>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <button data-route="home" class="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-lg text-xs transition border border-slate-700 flex items-center gap-2 cursor-pointer">
              <i class="fa-solid fa-arrow-left"></i> Back to Home
            </button>
          </div>
        </div>
      </div>
    `;
  };

  // --- View Renderers with Full Descriptions, "How It Works" & Rich Facts ---

  // 1. Home View
  const renderHomeView = () => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;
    if (homePageBackupHTML) {
      container.innerHTML = homePageBackupHTML;
      container.classList.add('page-fade-in');
    }
    initStatsToggle();
    initHeroCarousel();
  };

  // 2. About Us View
  const renderAboutView = () => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        ${renderPageBanner(
          "About Us - Government e Marketplace",
          "Learn about India's National Public Procurement Portal, its legal mandate, core operational pillars, and grassroots economic impact.",
          "fa-circle-info",
          "Web Info"
        )}

        <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <!-- Detailed Mandate & Overview -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider">
                <i class="fa-solid fa-landmark"></i> National Mandate & Background
              </div>
              <h2 class="text-2xl font-bold text-slate-900">What is Government e Marketplace (GeM)?</h2>
              <p class="text-sm text-slate-600 leading-relaxed">
                Government e Marketplace (GeM) is the dedicated, contactless online platform for public procurement in India. Established as a Section 8 Special Purpose Vehicle (SPV) under the Department of Commerce, Ministry of Commerce & Industry, GeM replaces legacy offline government tenders with a transparent, end-to-end digital buying ecosystem.
              </p>
              <p class="text-sm text-slate-600 leading-relaxed">
                Under <strong>Rule 149 of the General Financial Rules (GFR), 2017</strong>, procurement of goods and services by all Central Ministries, State Government Departments, Public Sector Undertakings (PSUs), and autonomous institutions is mandatorily routed through GeM.
              </p>

              <!-- How It Works Step-by-Step -->
              <div class="pt-4 border-t border-slate-100">
                <h3 class="text-base font-bold text-slate-900 mb-4">How Public Buying Works on GeM:</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div class="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center mb-2">1</div>
                    <h4 class="font-bold text-slate-900 text-xs mb-1">Direct Purchase</h4>
                    <p class="text-[11px] text-slate-500">Allowed up to ₹25,000 across available certified supplier catalogs.</p>
                  </div>
                  <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div class="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center mb-2">2</div>
                    <h4 class="font-bold text-slate-900 text-xs mb-1">L1 Price Comparison</h4>
                    <p class="text-[11px] text-slate-500">Up to ₹5,00,000 through automated comparison of at least 3 distinct OEMs.</p>
                  </div>
                  <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div class="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-2">3</div>
                    <h4 class="font-bold text-slate-900 text-xs mb-1">Bidding & RA</h4>
                    <p class="text-[11px] text-slate-500">Mandatory e-bidding or Reverse Auction for orders exceeding ₹5,00,000.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 4 Pillars Card -->
            <div class="bg-slate-900 text-white p-8 rounded-2xl shadow-md border border-slate-800 flex flex-col justify-between">
              <div>
                <span class="text-xs uppercase font-extrabold tracking-widest text-amber-400 block mb-2">Our Guiding Vision</span>
                <h3 class="text-xl font-bold mb-6">4 Core Pillars</h3>
                <ul class="space-y-4 text-xs text-slate-300">
                  <li class="flex items-start gap-3">
                    <i class="fa-solid fa-check-circle text-amber-400 mt-1"></i>
                    <div>
                      <strong class="text-white block text-sm">Transparency</strong>
                      Publicly accessible prices, automated vendor ranking, and open tender documentation.
                    </div>
                  </li>
                  <li class="flex items-start gap-3">
                    <i class="fa-solid fa-check-circle text-amber-400 mt-1"></i>
                    <div>
                      <strong class="text-white block text-sm">Speed & Efficiency</strong>
                      Purchase order generation in under 15 minutes, with mandated 10-day payment clearance.
                    </div>
                  </li>
                  <li class="flex items-start gap-3">
                    <i class="fa-solid fa-check-circle text-amber-400 mt-1"></i>
                    <div>
                      <strong class="text-white block text-sm">Inclusiveness</strong>
                      Zero barriers to entry for MSMEs, rural artisans, women entrepreneurs, and startups.
                    </div>
                  </li>
                  <li class="flex items-start gap-3">
                    <i class="fa-solid fa-check-circle text-amber-400 mt-1"></i>
                    <div>
                      <strong class="text-white block text-sm">Public Savings</strong>
                      Over 10% average price reduction on public funds compared to open market retail rates.
                    </div>
                  </li>
                </ul>
              </div>

              <div class="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <span class="text-[11px] text-slate-400 font-mono">GeM SPV Governance</span>
                <button data-route="initiatives" class="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1 cursor-pointer bg-transparent border-none">
                  Our Initiatives &rarr;
                </button>
              </div>
            </div>
          </div>

          <!-- Milestones Timeline -->
          <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-center max-w-xl mx-auto mb-10">
              <span class="text-xs uppercase font-extrabold tracking-widest text-amber-600 block mb-1">Evolution Journey</span>
              <h2 class="text-2xl font-bold text-slate-900">Key Milestones (2016 – 2026)</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div class="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <span class="bg-slate-900 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-md">2016</span>
                <h4 class="font-bold text-slate-900 text-sm mt-3 mb-1">GeM Pilot Launch</h4>
                <p class="text-xs text-slate-500">Inception of portal for standard office goods and direct procurement.</p>
              </div>
              <div class="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <span class="bg-slate-900 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-md">2017</span>
                <h4 class="font-bold text-slate-900 text-sm mt-3 mb-1">GFR Rule 149</h4>
                <p class="text-xs text-slate-500">Mandatory procurement via GeM incorporated into General Financial Rules.</p>
              </div>
              <div class="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <span class="bg-slate-900 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-md">2020</span>
                <h4 class="font-bold text-slate-900 text-sm mt-3 mb-1">Inclusive Push</h4>
                <p class="text-xs text-slate-500">Launch of Womaniya, Startup Runway, and Saras rural self-help artisan catalogs.</p>
              </div>
              <div class="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <span class="bg-slate-900 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-md">2023</span>
                <h4 class="font-bold text-slate-900 text-sm mt-3 mb-1">₹2 Lakh Cr GMV</h4>
                <p class="text-xs text-slate-500">Crossed 60,000 government buyer organizations and 1.5M registered vendors.</p>
              </div>
              <div class="p-5 bg-amber-500/10 rounded-xl border border-amber-500/30">
                <span class="bg-amber-500 text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded-md">2026</span>
                <h4 class="font-bold text-slate-900 text-sm mt-3 mb-1">GeM 2.0 AI Architecture</h4>
                <p class="text-xs text-slate-600">Smart AI matchmaking, predictive pricing, and blockchain audit integrity.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  };

  // 3. GeM 2.0 View (Explore Features + MORE FACTS)
  const renderGeM2View = () => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        ${renderPageBanner(
          "Introduction to GeM 2.0 & Next-Gen Features",
          "The state-of-the-art AI-powered public procurement infrastructure delivering hyper-fast, auditable, and intelligent transactions.",
          "fa-rocket",
          "GeM 2.0"
        )}

        <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <!-- Key Facts Highlights Banner -->
          <div class="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
            <div class="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div class="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-2">Verified Performance Benchmarks</div>
            <h2 class="text-2xl font-bold mb-6">Key Facts & Innovations of GeM 2.0</h2>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span class="text-2xl font-black text-amber-400 block">99.4%</span>
                <span class="text-[11px] text-slate-400 font-semibold block mt-1">AI Semantic Match Accuracy</span>
              </div>
              <div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span class="text-2xl font-black text-blue-400 block">15 Min</span>
                <span class="text-[11px] text-slate-400 font-semibold block mt-1">Direct Purchase PO Cycle</span>
              </div>
              <div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span class="text-2xl font-black text-emerald-400 block">100%</span>
                <span class="text-[11px] text-slate-400 font-semibold block mt-1">Blockchain Audit Trail</span>
              </div>
              <div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span class="text-2xl font-black text-purple-400 block">12</span>
                <span class="text-[11px] text-slate-400 font-semibold block mt-1">Indian Languages Voice Search</span>
              </div>
              <div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span class="text-2xl font-black text-rose-400 block">0</span>
                <span class="text-[11px] text-slate-400 font-semibold block mt-1">Human Bias in L1 Ranking</span>
              </div>
              <div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <span class="text-2xl font-black text-cyan-400 block">10.2%</span>
                <span class="text-[11px] text-slate-400 font-semibold block mt-1">Average National Savings</span>
              </div>
            </div>
          </div>

          <!-- Feature Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div class="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-5">
                <i class="fa-solid fa-brain"></i>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">AI Smart Matchmaking</h3>
              <p class="text-xs text-slate-600 leading-relaxed mb-4">
                Semantic embedding models automatically analyze custom tender specifications and match them with exact technical parameters from verified seller catalogs.
              </p>
              <div class="bg-slate-50 p-3 rounded-lg text-[11px] text-slate-600 font-medium">
                <strong class="text-slate-900 block mb-0.5">How It Works:</strong>
                Converts natural language tender text into vector parameters and matches with catalog metadata in milliseconds.
              </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div class="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-5">
                <i class="fa-solid fa-chart-line"></i>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">Predictive Price Intelligence</h3>
              <p class="text-xs text-slate-600 leading-relaxed mb-4">
                Analyzes millions of historical transactions to establish real-time ceiling price benchmarks, preventing overspending and ensuring fair prices.
              </p>
              <div class="bg-slate-50 p-3 rounded-lg text-[11px] text-slate-600 font-medium">
                <strong class="text-slate-900 block mb-0.5">How It Works:</strong>
                Generates dynamic L1 estimates considering commodity price fluctuations, quantity tiers, and freight distances.
              </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div class="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center text-xl mb-5">
                <i class="fa-solid fa-shield-cat"></i>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">Automated KYC & Trust Scores</h3>
              <p class="text-xs text-slate-600 leading-relaxed mb-4">
                Direct statutory API hooks verify GST filing compliance, MCA company status, Udyam MSME certification, and PAN authenticity instantaneously.
              </p>
              <div class="bg-slate-50 p-3 rounded-lg text-[11px] text-slate-600 font-medium">
                <strong class="text-slate-900 block mb-0.5">How It Works:</strong>
                Replaces days of physical document checks with sub-second API verification against official government databases.
              </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div class="w-12 h-12 bg-purple-500/10 text-purple-600 rounded-xl flex items-center justify-center text-xl mb-5">
                <i class="fa-solid fa-link"></i>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">Blockchain Audit Trail</h3>
              <p class="text-xs text-slate-600 leading-relaxed mb-4">
                Cryptographically hashed audit logs timestamp every bid submission, Reverse Auction price reduction, and invoice dispatch for complete non-repudiation.
              </p>
              <div class="bg-slate-50 p-3 rounded-lg text-[11px] text-slate-600 font-medium">
                <strong class="text-slate-900 block mb-0.5">How It Works:</strong>
                Generates immutable cryptographic proofs accessible to the Comptroller and Auditor General (CAG) and vigilance authorities.
              </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div class="w-12 h-12 bg-rose-500/10 text-rose-600 rounded-xl flex items-center justify-center text-xl mb-5">
                <i class="fa-solid fa-microphone"></i>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">Multilingual Voice Search</h3>
              <p class="text-xs text-slate-600 leading-relaxed mb-4">
                Bilingual and regional voice search across 12 scheduled Indian languages allows rural artisans and weavers to search and list goods without language barriers.
              </p>
              <div class="bg-slate-50 p-3 rounded-lg text-[11px] text-slate-600 font-medium">
                <strong class="text-slate-900 block mb-0.5">How It Works:</strong>
                Neural speech-to-text models translate vernacular spoken search into standardized product category queries.
              </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div class="w-12 h-12 bg-cyan-500/10 text-cyan-600 rounded-xl flex items-center justify-center text-xl mb-5">
                <i class="fa-solid fa-bolt"></i>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">Sub-Second Direct Purchase</h3>
              <p class="text-xs text-slate-600 leading-relaxed mb-4">
                Highly optimized serverless infrastructure handles peak tender traffic spikes with zero latency degradation or checkout drop-offs.
              </p>
              <div class="bg-slate-50 p-3 rounded-lg text-[11px] text-slate-600 font-medium">
                <strong class="text-slate-900 block mb-0.5">How It Works:</strong>
                Distributed caching and cloud-native architecture capable of processing over 100,000 concurrent bid evaluations.
              </div>
            </div>

          </div>

          <!-- Comparison Table: GeM 1.0 vs GeM 2.0 -->
          <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-xl font-bold text-slate-900 mb-6">GeM 1.0 vs GeM 2.0 Architectural Comparison</h3>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th class="py-3 px-4">Capability</th>
                    <th class="py-3 px-4 text-slate-500">Legacy GeM 1.0</th>
                    <th class="py-3 px-4 text-amber-600 font-bold">Next-Gen GeM 2.0</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td class="py-3.5 px-4 font-bold">Catalog Search</td>
                    <td class="py-3.5 px-4 text-slate-500">Keyword-based exact text match</td>
                    <td class="py-3.5 px-4 text-slate-900 font-semibold bg-amber-50/50">Semantic AI + Voice Assistant in 12 Languages</td>
                  </tr>
                  <tr>
                    <td class="py-3.5 px-4 font-bold">Seller Verification</td>
                    <td class="py-3.5 px-4 text-slate-500">Manual review taking 3-5 working days</td>
                    <td class="py-3.5 px-4 text-slate-900 font-semibold bg-amber-50/50">Automated API verification within 60 seconds</td>
                  </tr>
                  <tr>
                    <td class="py-3.5 px-4 font-bold">Price Benchmarking</td>
                    <td class="py-3.5 px-4 text-slate-500">Static ceiling price comparison</td>
                    <td class="py-3.5 px-4 text-slate-900 font-semibold bg-amber-50/50">Real-time market rate dynamic intelligence</td>
                  </tr>
                  <tr>
                    <td class="py-3.5 px-4 font-bold">Audit & Transparency</td>
                    <td class="py-3.5 px-4 text-slate-500">Database table logs</td>
                    <td class="py-3.5 px-4 text-slate-900 font-semibold bg-amber-50/50">Tamper-proof Blockchain ledger trail</td>
                  </tr>
                  <tr>
                    <td class="py-3.5 px-4 font-bold">Mobile Experience</td>
                    <td class="py-3.5 px-4 text-slate-500">Basic responsive web view</td>
                    <td class="py-3.5 px-4 text-slate-900 font-semibold bg-amber-50/50">PWA + Native Mobile gestures with offline bid drafts</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    `;
  };

  // 4. Our Initiatives View (View Initiatives + MORE FACTS)
  const renderInitiativesView = () => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        ${renderPageBanner(
          "Our Inclusive Initiatives & Societal Impact",
          "Explore government-backed programs driving grassroots empowerment for MSMEs, women entrepreneurs, rural SHGs, and green innovation.",
          "fa-lightbulb",
          "GeM 2.0"
        )}

        <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <!-- Key Facts Banner -->
          <div class="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-2xl border border-slate-700 shadow-xl">
            <div class="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-2">Statutory Procurement Mandates & Facts</div>
            <h2 class="text-2xl font-bold mb-6">Government Inclusivity Mandates</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="bg-slate-950/60 p-5 rounded-xl border border-slate-700">
                <span class="text-3xl font-black text-emerald-400 block">25%</span>
                <span class="text-xs font-bold text-slate-200 block mt-1">Mandatory Annual Quota</span>
                <p class="text-[11px] text-slate-400 mt-1">All Central Ministries & CPSEs must procure at least 25% from Micro & Small Enterprises.</p>
              </div>
              <div class="bg-slate-950/60 p-5 rounded-xl border border-slate-700">
                <span class="text-3xl font-black text-pink-400 block">3%</span>
                <span class="text-xs font-bold text-slate-200 block mt-1">Women-Owned Quota</span>
                <p class="text-[11px] text-slate-400 mt-1">Dedicated sub-target reserved strictly for certified women entrepreneurs & SHGs.</p>
              </div>
              <div class="bg-slate-950/60 p-5 rounded-xl border border-slate-700">
                <span class="text-3xl font-black text-amber-400 block">4%</span>
                <span class="text-xs font-bold text-slate-200 block mt-1">SC / ST Enterprises Quota</span>
                <p class="text-[11px] text-slate-400 mt-1">Special allocation for enterprises owned by Scheduled Caste & Scheduled Tribe founders.</p>
              </div>
              <div class="bg-slate-950/60 p-5 rounded-xl border border-slate-700">
                <span class="text-3xl font-black text-blue-400 block">100%</span>
                <span class="text-xs font-bold text-slate-200 block mt-1">Startup Experience Waiver</span>
                <p class="text-[11px] text-slate-400 mt-1">DPIIT startups exempt from past experience & prior turnover hurdles in standard bids.</p>
              </div>
            </div>
          </div>

          <!-- Initiative Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <!-- Womaniya -->
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition group">
              <div>
                <div class="w-12 h-12 bg-pink-500/10 text-pink-600 rounded-xl flex items-center justify-center text-xl mb-5 group-hover:bg-pink-600 group-hover:text-white transition">
                  <i class="fa-solid fa-person-dress"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Womaniya on GeM</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-4">
                  Enables women-owned enterprises, craftswomen, and Self-Help Groups (SHGs) to sell handicrafts, textiles, organic foods, and office supplies directly to government departments.
                </p>
                <div class="text-[11px] text-pink-600 font-bold mb-4">1,45,000+ Women Entrepreneurs Onboarded</div>
              </div>
              <button onclick="window.gemSearchFor('Womaniya')" class="w-full bg-slate-50 hover:bg-pink-50 text-slate-700 hover:text-pink-700 font-bold py-2 rounded-lg text-xs transition border border-slate-200 cursor-pointer">
                Explore Womaniya Catalog &rarr;
              </button>
            </div>

            <!-- Start-up Runway -->
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition group">
              <div>
                <div class="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-5 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                  <i class="fa-solid fa-rocket"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Start-up Runway</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-4">
                  A dedicated fast-track channel for DPIIT-recognized startups to list cutting-edge innovative products and services without prior turnover or past experience criteria.
                </p>
                <div class="text-[11px] text-amber-600 font-bold mb-4">24,000+ DPIIT Startups Participating</div>
              </div>
              <button onclick="window.gemSearchFor('Startup')" class="w-full bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-700 font-bold py-2 rounded-lg text-xs transition border border-slate-200 cursor-pointer">
                View Startup Listings &rarr;
              </button>
            </div>

            <!-- Saras Collection -->
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition group">
              <div>
                <div class="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center text-xl mb-5 group-hover:bg-emerald-600 group-hover:text-white transition">
                  <i class="fa-solid fa-leaf"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">The Saras Collection</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-4">
                  Curated in partnership with Ministry of Rural Development, bringing handcrafted regional artifacts, handlooms, and rural produce into the mainstream public procurement catalog.
                </p>
                <div class="text-[11px] text-emerald-600 font-bold mb-4">60,000+ Deendayal Antyodaya SHGs</div>
              </div>
              <button onclick="window.gemSearchFor('Saras')" class="w-full bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-bold py-2 rounded-lg text-xs transition border border-slate-200 cursor-pointer">
                View Saras Crafts &rarr;
              </button>
            </div>

            <!-- Tribal Crafts & TRIFED -->
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition group">
              <div>
                <div class="w-12 h-12 bg-purple-500/10 text-purple-600 rounded-xl flex items-center justify-center text-xl mb-5 group-hover:bg-purple-600 group-hover:text-white transition">
                  <i class="fa-solid fa-tree"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Tribal Artisan Emporium</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-4">
                  Facilitates direct purchases from tribal artisans under the Van Dhan Vikas Karyakram, ensuring fair remuneration and preserving indigenous heritage crafts.
                </p>
                <div class="text-[11px] text-purple-600 font-bold mb-4">Direct Fair Market Pricing</div>
              </div>
              <button onclick="window.gemSearchFor('Tribal')" class="w-full bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 font-bold py-2 rounded-lg text-xs transition border border-slate-200 cursor-pointer">
                Browse Tribal Artifacts &rarr;
              </button>
            </div>

            <!-- Green Procurement -->
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition group">
              <div>
                <div class="w-12 h-12 bg-teal-500/10 text-teal-600 rounded-xl flex items-center justify-center text-xl mb-5 group-hover:bg-teal-600 group-hover:text-white transition">
                  <i class="fa-solid fa-solar-panel"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Green Procurement (GPP)</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-4">
                  Incentivizes eco-friendly, energy star-certified electrical goods, recycled paper products, electric vehicles, and solar energy installations across ministries.
                </p>
                <div class="text-[11px] text-teal-600 font-bold mb-4">BEE 5-Star & ISO 14001 Standards</div>
              </div>
              <button onclick="window.gemSearchFor('Green')" class="w-full bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-teal-700 font-bold py-2 rounded-lg text-xs transition border border-slate-200 cursor-pointer">
                Explore Green Products &rarr;
              </button>
            </div>

            <!-- Stree Samarthya -->
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition group">
              <div>
                <div class="w-12 h-12 bg-indigo-500/10 text-indigo-600 rounded-xl flex items-center justify-center text-xl mb-5 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <i class="fa-solid fa-hand-holding-heart"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Divyangjan Entrepreneurs</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-4">
                  Dedicated onboarding desks, waived transaction fees, and training webinars supporting differently-abled entrepreneurs to become independent government suppliers.
                </p>
                <div class="text-[11px] text-indigo-600 font-bold mb-4">100% Fee Exemption</div>
              </div>
              <button onclick="window.gemSearchFor('Divyangjan')" class="w-full bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-bold py-2 rounded-lg text-xs transition border border-slate-200 cursor-pointer">
                Read Inclusion Charter &rarr;
              </button>
            </div>

          </div>

        </div>
      </div>
    `;
  };

  // 5. Subscription Model View
  const renderSubscriptionView = () => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        ${renderPageBanner(
          "Subscription Model & Fee Structure",
          "Fair, transparent, and volume-linked fee tiers designed to ensure zero cost for MSMEs while supporting high-capacity enterprise features.",
          "fa-credit-card",
          "Pricing"
        )}

        <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <!-- Interactive Fee Estimator Slider -->
          <div class="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
            <div class="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div class="max-w-3xl">
              <span class="text-amber-400 font-extrabold text-xs uppercase tracking-widest block mb-2">Interactive Fee Estimator</span>
              <h2 class="text-2xl font-bold mb-4">Estimate Your Annual GeM 2.0 Subscription</h2>
              <p class="text-slate-400 text-xs sm:text-sm mb-8 leading-relaxed">
                Drag the slider to your estimated annual order turnover on the portal to see the applicable fee and tier privileges. Micro enterprises with turnover under ₹1 Crore pay zero fees.
              </p>

              <div class="space-y-4 mb-8">
                <div class="flex items-center justify-between font-bold text-sm">
                  <span class="text-slate-300">Annual Business Turnover on GeM:</span>
                  <span id="turnover-val" class="text-amber-400 text-lg">₹ 50 Lakhs</span>
                </div>
                <input 
                  type="range" 
                  id="turnover-slider" 
                  min="0" 
                  max="100" 
                  value="5" 
                  class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div class="flex justify-between text-[11px] text-slate-500 font-semibold">
                  <span>₹0 (New Seller)</span>
                  <span>₹10 Crores</span>
                  <span>₹50 Crores</span>
                  <span>₹100+ Crores</span>
                </div>
              </div>

              <!-- Live Estimate Display Card -->
              <div id="estimate-result-card" class="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Recommended Tier</span>
                  <h4 id="calc-tier-name" class="text-emerald-400 font-bold text-base mt-0.5">MSME / Micro Free Tier</h4>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Annual Subscription Fee</span>
                  <h4 id="calc-fee-amount" class="text-amber-400 font-extrabold text-xl mt-0.5">₹ 0 (100% Free)</h4>
                </div>
                <button data-route="register" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition border-none cursor-pointer">
                  Claim Free Access
                </button>
              </div>
            </div>
          </div>

          <!-- Subscription Tier Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div class="bg-white p-6 rounded-2xl border-2 border-emerald-500 shadow-sm flex flex-col justify-between relative">
              <span class="absolute -top-3 left-6 bg-emerald-600 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
              <div>
                <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-600 mb-1">Micro & Small</div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">Free MSME Tier</h3>
                <div class="text-2xl font-black text-slate-900 mb-4">₹ 0 <span class="text-xs font-medium text-slate-500">/ year</span></div>
                <p class="text-xs text-slate-600 mb-6">Designed for MSMEs, startups, women entrepreneurs, and artisans with turnover &lt; ₹1 Cr.</p>
                <ul class="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4 mb-6">
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Zero registration charges</li>
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Up to 500 catalog uploads</li>
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Standard bid notifications</li>
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Direct purchase cart eligibility</li>
                </ul>
              </div>
              <button data-route="register" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition border-none cursor-pointer">
                Get Started Free
              </button>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div class="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">Medium Enterprises</div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">Silver Tier</h3>
                <div class="text-2xl font-black text-slate-900 mb-4">₹ 5,000 <span class="text-xs font-medium text-slate-500">/ year</span></div>
                <p class="text-xs text-slate-600 mb-6">For expanding sellers with annual turnover between ₹1 Cr – ₹10 Cr.</p>
                <ul class="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4 mb-6">
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Up to 5,000 catalog items</li>
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Instant SMS & WhatsApp bid alerts</li>
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Seller performance badge</li>
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Priority ticket resolution (24h)</li>
                </ul>
              </div>
              <button data-route="register" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition border-none cursor-pointer">
                Subscribe Silver
              </button>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div class="text-xs font-extrabold uppercase tracking-wider text-amber-600 mb-1">Large Corporations</div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">Gold Tier</h3>
                <div class="text-2xl font-black text-slate-900 mb-4">₹ 15,000 <span class="text-xs font-medium text-slate-500">/ year</span></div>
                <p class="text-xs text-slate-600 mb-6">For high volume suppliers with turnover between ₹10 Cr – ₹50 Cr.</p>
                <ul class="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4 mb-6">
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Unlimited catalog listings</li>
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> API bulk inventory synchronization</li>
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Advanced competitor bid analytics</li>
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Dedicated account assistance</li>
                </ul>
              </div>
              <button data-route="register" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition border-none cursor-pointer">
                Subscribe Gold
              </button>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div class="text-xs font-extrabold uppercase tracking-wider text-purple-600 mb-1">Conglomerates</div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">Platinum Enterprise</h3>
                <div class="text-2xl font-black text-slate-900 mb-4">₹ 30,000 <span class="text-xs font-medium text-slate-500">/ year</span></div>
                <p class="text-xs text-slate-600 mb-6">For OEMs and conglomerates with turnover &gt; ₹50 Crores annually.</p>
                <ul class="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4 mb-6">
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Direct ERP webhook integration</li>
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Real-time multi-warehouse dispatch</li>
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> 1-hour SLA emergency hotline</li>
                  <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Custom predictive bidding algorithms</li>
                </ul>
              </div>
              <button data-route="register" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition border-none cursor-pointer">
                Contact Enterprise
              </button>
            </div>

          </div>

        </div>
      </div>
    `;

    const slider = document.getElementById('turnover-slider');
    const turnoverVal = document.getElementById('turnover-val');
    const tierName = document.getElementById('calc-tier-name');
    const feeAmount = document.getElementById('calc-fee-amount');

    if (slider && turnoverVal && tierName && feeAmount) {
      slider.oninput = () => {
        const val = parseInt(slider.value, 10);
        if (val <= 10) {
          const lakhs = Math.max(10, val * 10);
          turnoverVal.textContent = `₹ ${lakhs} Lakhs`;
          tierName.textContent = "MSME / Micro Free Tier";
          tierName.className = "text-emerald-400 font-bold text-base mt-0.5";
          feeAmount.textContent = "₹ 0 (100% Free)";
        } else if (val <= 35) {
          const cr = (val / 3.5).toFixed(1);
          turnoverVal.textContent = `₹ ${cr} Crores`;
          tierName.textContent = "Silver Tier (Medium Enterprise)";
          tierName.className = "text-blue-400 font-bold text-base mt-0.5";
          feeAmount.textContent = "₹ 5,000 / year";
        } else if (val <= 75) {
          const cr = (val * 0.6).toFixed(0);
          turnoverVal.textContent = `₹ ${cr} Crores`;
          tierName.textContent = "Gold Tier (Large Corporation)";
          tierName.className = "text-amber-400 font-bold text-base mt-0.5";
          feeAmount.textContent = "₹ 15,000 / year";
        } else {
          turnoverVal.textContent = "₹ 80+ Crores";
          tierName.textContent = "Platinum Enterprise (OEMs & PSUs)";
          tierName.className = "text-purple-400 font-bold text-base mt-0.5";
          feeAmount.textContent = "₹ 30,000 / year";
        }
      };
    }
  };

  // 6. Statistics View
  const renderStatisticsView = () => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        ${renderPageBanner(
          "Open Data Statistics & Live Analytics",
          "Explore real-time procurement volume, category distribution, and demographic participation across Indian States.",
          "fa-chart-pie",
          "GeM 2.0"
        )}

        <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-[10px] text-slate-400 uppercase font-bold block mb-1">Gross Merchandise Value (GMV)</span>
              <span class="text-2xl font-black text-amber-500 block">₹ 8,42,105 Cr</span>
              <span class="text-xs text-emerald-600 font-bold mt-2 inline-flex items-center gap-1">
                <i class="fa-solid fa-arrow-trend-up"></i> +28.4% YoY Growth
              </span>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-[10px] text-slate-400 uppercase font-bold block mb-1">Registered Primary Sellers</span>
              <span class="text-2xl font-black text-blue-600 block">1,842,910</span>
              <span class="text-xs text-slate-500 font-medium mt-2 block">
                Over 920,000 certified MSMEs
              </span>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-[10px] text-slate-400 uppercase font-bold block mb-1">Government Buyer Entities</span>
              <span class="text-2xl font-black text-emerald-600 block">62,490</span>
              <span class="text-xs text-slate-500 font-medium mt-2 block">
                Central, State & PSU Departments
              </span>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span class="text-[10px] text-slate-400 uppercase font-bold block mb-1">Live Verified Catalogs</span>
              <span class="text-2xl font-black text-purple-600 block">3,418,200</span>
              <span class="text-xs text-slate-500 font-medium mt-2 block">
                11,500+ Standard Product Categories
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 class="text-lg font-bold text-slate-900">Procurement Category Breakdown</h3>
              
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Defense, Police & Security Equipment</span>
                    <span class="text-amber-600">32% (₹ 2,69,470 Cr)</span>
                  </div>
                  <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-amber-500 rounded-full" style="width: 32%;"></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>IT Hardware, Cloud & Telecom Services</span>
                    <span class="text-blue-600">26% (₹ 2,18,940 Cr)</span>
                  </div>
                  <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-500 rounded-full" style="width: 26%;"></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Healthcare, Pharmaceuticals & Medical Devices</span>
                    <span class="text-emerald-600">18% (₹ 1,51,570 Cr)</span>
                  </div>
                  <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-emerald-500 rounded-full" style="width: 18%;"></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Railways, Transportation & Heavy Machinery</span>
                    <span class="text-purple-600">14% (₹ 1,17,890 Cr)</span>
                  </div>
                  <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-purple-500 rounded-full" style="width: 14%;"></div>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Office Supplies, Furniture & Stationery</span>
                    <span class="text-slate-600">10% (₹ 84,210 Cr)</span>
                  </div>
                  <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-slate-400 rounded-full" style="width: 10%;"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 class="text-lg font-bold text-slate-900">Top Buying Government Entities</h3>
              
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                      <th class="py-2.5 px-3">Rank</th>
                      <th class="py-2.5 px-3">Ministry / Department</th>
                      <th class="py-2.5 px-3 text-right">Orders Handled</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
                    <tr>
                      <td class="py-3 px-3 font-bold text-amber-600">#1</td>
                      <td class="py-3 px-3 font-semibold">Ministry of Defence</td>
                      <td class="py-3 px-3 text-right">412,890</td>
                    </tr>
                    <tr>
                      <td class="py-3 px-3 font-bold text-amber-600">#2</td>
                      <td class="py-3 px-3 font-semibold">Ministry of Petroleum & Natural Gas (PSUs)</td>
                      <td class="py-3 px-3 text-right">289,140</td>
                    </tr>
                    <tr>
                      <td class="py-3 px-3 font-bold text-amber-600">#3</td>
                      <td class="py-3 px-3 font-semibold">Ministry of Railways</td>
                      <td class="py-3 px-3 text-right">241,520</td>
                    </tr>
                    <tr>
                      <td class="py-3 px-3 font-bold text-slate-400">#4</td>
                      <td class="py-3 px-3 font-semibold">Ministry of Power & Renewable Energy</td>
                      <td class="py-3 px-3 text-right">186,400</td>
                    </tr>
                    <tr>
                      <td class="py-3 px-3 font-bold text-slate-400">#5</td>
                      <td class="py-3 px-3 font-semibold">Department of Posts & Telecommunications</td>
                      <td class="py-3 px-3 text-right">142,310</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  };

  // 7. FAQs View
  const faqData = [
    { cat: 'buyers', q: 'How do government buyers register on GeM 2.0?', a: 'Primary Users (typically the Head of Office or Department) register using their official gov.in/nic.in email ID and Aadhaar/PAN verification. Once registered, they can create Secondary Users (Buyers, Consignees, and Paying Authorities).' },
    { cat: 'sellers', q: 'What documents are required for seller registration?', a: 'You need an active PAN, GSTIN (if applicable), bank account details, and Aadhaar-linked mobile for OTP verification. MSMEs should keep their Udyam Registration Number handy for fee exemption.' },
    { cat: 'bidding', q: 'What is the monetary limit for Direct Purchase without bidding?', a: 'Under current General Financial Rules (GFR), Direct Purchase is permitted up to ₹25,000 for any item, and up to ₹5,00,000 through the L1 comparison tool among at least 3 distinct manufacturers.' },
    { cat: 'bidding', q: 'What is a Reverse Auction (RA) on GeM?', a: 'A Reverse Auction is an online real-time bidding process where pre-qualified sellers submit consecutively lower price bids during a scheduled window to win the procurement contract.' },
    { cat: 'payments', q: 'What is the payment timeline for suppliers on GeM?', a: 'Once the Consignee Receipt and Acceptance Certificate (CRAC) is generated, paying authorities are mandated to release 100% payment within 10 calendar days.' },
    { cat: 'sellers', q: 'Can a startup participate in high-value bids without past experience?', a: 'Yes! Under the Startup Runway initiative, DPIIT-recognized startups are exempt from prior turnover and prior experience criteria for all non-critical procurement categories.' },
    { cat: 'technical', q: 'What browser is recommended for GeM 2.0?', a: 'GeM 2.0 is optimized for all modern browsers including Google Chrome (v115+), Mozilla Firefox (v120+), Apple Safari, and Microsoft Edge. JavaScript must be enabled.' },
    { cat: 'technical', q: 'How does digital signing work for bid submission?', a: 'Bids can be signed using Aadhaar OTP e-Sign or a Class-3 Digital Signature Certificate (DSC) USB token configured via the GeM DSC Signer utility.' }
  ];

  const renderFAQsView = () => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        ${renderPageBanner(
          "Frequently Asked Questions (FAQs)",
          "Find instant answers to common questions regarding buyer onboarding, seller catalogs, bidding rules, and payments.",
          "fa-circle-question",
          "Need Help"
        )}

        <div class="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          
          <!-- Search & Filter Bar -->
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div class="relative">
              <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input 
                type="text" 
                id="faq-search-input" 
                placeholder="Search FAQs by keywords (e.g. MSME, payment, direct purchase, startup)..." 
                class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div class="flex flex-wrap gap-2 pt-2">
              <button class="faq-filter-btn px-4 py-1.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950 cursor-pointer border-none" data-cat="all">All Questions</button>
              <button class="faq-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer border-none" data-cat="buyers">Buyers</button>
              <button class="faq-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer border-none" data-cat="sellers">Sellers</button>
              <button class="faq-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer border-none" data-cat="bidding">Bidding & RA</button>
              <button class="faq-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer border-none" data-cat="payments">Payments</button>
              <button class="faq-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer border-none" data-cat="technical">Technical</button>
            </div>
          </div>

          <!-- FAQ Accordion List -->
          <div id="faq-list-container" class="space-y-4"></div>

          <!-- Help prompt -->
          <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-xs text-slate-600">
            <span>Still haven't found what you're looking for?</span>
            <div class="mt-3 flex justify-center gap-4">
              <button data-route="ticket" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition border-none cursor-pointer">
                Raise a Support Ticket
              </button>
              <button data-route="contact" class="bg-white hover:bg-slate-100 text-slate-800 font-bold px-4 py-2 rounded-lg text-xs transition border border-slate-200 cursor-pointer">
                Contact Helpdesk
              </button>
            </div>
          </div>

        </div>
      </div>
    `;

    const faqContainer = document.getElementById('faq-list-container');
    const searchInput = document.getElementById('faq-search-input');
    const filterBtns = document.querySelectorAll('.faq-filter-btn');
    let activeCat = 'all';

    const renderFaqItems = () => {
      const query = (searchInput?.value || '').toLowerCase().trim();
      const filtered = faqData.filter(item => {
        const matchesCat = activeCat === 'all' || item.cat === activeCat;
        const matchesQuery = item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query);
        return matchesCat && matchesQuery;
      });

      if (filtered.length === 0) {
        faqContainer.innerHTML = `
          <div class="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
            <i class="fa-solid fa-magnifying-glass text-2xl text-slate-300 mb-2 block"></i>
            No FAQs matching your search query. Try different keywords.
          </div>
        `;
        return;
      }

      faqContainer.innerHTML = filtered.map((item) => `
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition">
          <button class="faq-accordion-header w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-amber-600 cursor-pointer bg-transparent border-none">
            <span>${item.q}</span>
            <i class="fa-solid fa-chevron-down text-slate-400 text-xs transition-transform"></i>
          </button>
          <div class="faq-accordion-body hidden px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
            ${item.a}
          </div>
        </div>
      `).join('');

      document.querySelectorAll('.faq-accordion-header').forEach(header => {
        header.onclick = () => {
          const body = header.nextElementSibling;
          const icon = header.querySelector('i');
          const isHidden = body.classList.contains('hidden');
          
          document.querySelectorAll('.faq-accordion-body').forEach(b => b.classList.add('hidden'));
          document.querySelectorAll('.faq-accordion-header i').forEach(i => i.classList.remove('rotate-180'));

          if (isHidden) {
            body.classList.remove('hidden');
            icon.classList.add('rotate-180');
          }
        };
      });
    };

    filterBtns.forEach(btn => {
      btn.onclick = () => {
        filterBtns.forEach(b => {
          b.className = 'faq-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer border-none';
        });
        btn.className = 'faq-filter-btn px-4 py-1.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950 cursor-pointer border-none';
        activeCat = btn.getAttribute('data-cat');
        renderFaqItems();
      };
    });

    if (searchInput) searchInput.oninput = renderFaqItems;
    renderFaqItems();
  };

  // 8. Document Help View
  const renderHelpView = () => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        ${renderPageBanner(
          "Document Help & Training Center",
          "Download official step-by-step PDF manuals, watch interactive portal walkthroughs, and review API documentation.",
          "fa-book-open",
          "Web Info"
        )}

        <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div class="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-5">
                  <i class="fa-solid fa-file-pdf"></i>
                </div>
                <h3 class="text-base font-bold text-slate-900 mb-2">Government Buyer Handbook 2026</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-4">
                  Complete guide to creating primary/secondary accounts, cart checkout, drafting tender specifications, and approving CRAC invoices.
                </p>
                <span class="text-[11px] text-slate-400 font-semibold block mb-4">PDF &bull; 4.2 MB &bull; Version 2.4</span>
              </div>
              <button onclick="window.gemDownloadMock('Buyer_Handbook_2026.pdf')" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs transition border-none cursor-pointer flex items-center justify-center gap-2">
                <i class="fa-solid fa-download"></i> Download Manual
              </button>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div class="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-5">
                  <i class="fa-solid fa-file-pdf"></i>
                </div>
                <h3 class="text-base font-bold text-slate-900 mb-2">Seller Onboarding & Catalog SOP</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-4">
                  Step-by-step instructions for brand authorization, OEM listing, caution money deposit, and participating in Reverse Auctions.
                </p>
                <span class="text-[11px] text-slate-400 font-semibold block mb-4">PDF &bull; 3.8 MB &bull; Version 3.1</span>
              </div>
              <button onclick="window.gemDownloadMock('Seller_Onboarding_SOP.pdf')" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs transition border-none cursor-pointer flex items-center justify-center gap-2">
                <i class="fa-solid fa-download"></i> Download Manual
              </button>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div class="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center text-xl mb-5">
                  <i class="fa-solid fa-code"></i>
                </div>
                <h3 class="text-base font-bold text-slate-900 mb-2">ERP API Integration Specifications</h3>
                <p class="text-xs text-slate-600 leading-relaxed mb-4">
                  RESTful webhook specifications, OAuth 2.0 tokens, and payload formats for synchronizing inventory and automatic invoice generation.
                </p>
                <span class="text-[11px] text-slate-400 font-semibold block mb-4">JSON / OpenAPI &bull; 1.4 MB</span>
              </div>
              <button onclick="window.gemDownloadMock('GeM_ERP_API_Specs.zip')" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs transition border-none cursor-pointer flex items-center justify-center gap-2">
                <i class="fa-solid fa-download"></i> Download API Kit
              </button>
            </div>

          </div>

          <!-- Video Tutorials Playlist -->
          <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-xl font-bold text-slate-900 mb-6">Interactive Video Training Masterclasses</h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:border-amber-500 transition group cursor-pointer" onclick="window.gemPlayVideo('Creating Your First Bid')">
                <div class="h-36 bg-slate-900 flex items-center justify-center relative">
                  <div class="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-base shadow-lg group-hover:scale-110 transition-transform">
                    <i class="fa-solid fa-play ml-1"></i>
                  </div>
                  <span class="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">08:45</span>
                </div>
                <div class="p-4">
                  <h4 class="font-bold text-slate-900 text-xs mb-1">Creating & Publishing Bids</h4>
                  <p class="text-[11px] text-slate-500">Walkthrough of custom parameter definition and consignee splits.</p>
                </div>
              </div>

              <div class="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:border-amber-500 transition group cursor-pointer" onclick="window.gemPlayVideo('Reverse Auction Live Demo')">
                <div class="h-36 bg-slate-900 flex items-center justify-center relative">
                  <div class="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-base shadow-lg group-hover:scale-110 transition-transform">
                    <i class="fa-solid fa-play ml-1"></i>
                  </div>
                  <span class="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">12:20</span>
                </div>
                <div class="p-4">
                  <h4 class="font-bold text-slate-900 text-xs mb-1">Reverse Auction Live Demo</h4>
                  <p class="text-[11px] text-slate-500">How to participate in real-time RA price decrement windows.</p>
                </div>
              </div>

              <div class="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:border-amber-500 transition group cursor-pointer" onclick="window.gemPlayVideo('Invoice & CRAC Approval')">
                <div class="h-36 bg-slate-900 flex items-center justify-center relative">
                  <div class="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-base shadow-lg group-hover:scale-110 transition-transform">
                    <i class="fa-solid fa-play ml-1"></i>
                  </div>
                  <span class="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">06:15</span>
                </div>
                <div class="p-4">
                  <h4 class="font-bold text-slate-900 text-xs mb-1">Invoicing & CRAC Clearance</h4>
                  <p class="text-[11px] text-slate-500">Mandatory 10-day payment protocol and digital receipt generation.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  };

  // 9. Terms of Use View
  const renderTermsView = () => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        ${renderPageBanner(
          "Terms of Use & General Contract Conditions (GCC)",
          "Legal agreements, user responsibilities, and dispute resolution guidelines for buyers and sellers on GeM 2.0.",
          "fa-gavel",
          "Web Info"
        )}

        <div class="max-w-4xl mx-auto px-4 sm:px-6">
          <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs text-slate-700 leading-relaxed">
            <div class="pb-4 border-b border-slate-100">
              <span class="text-[11px] text-slate-400 font-bold uppercase block mb-1">Effective Date: January 1, 2026</span>
              <h2 class="text-xl font-bold text-slate-900">Government e Marketplace Terms of Agreement</h2>
            </div>

            <section class="space-y-2">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">1. Acceptance of Terms</h3>
              <p>
                By registering, accessing, or transacting on the Government e Marketplace (GeM 2.0) portal, you agree to be bound by these Terms of Use, General Terms and Conditions (GTC), Service Level Agreements (SLA), and relevant Government of India procurement laws (including GFR 2017 Rule 149).
              </p>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">2. User Eligibility & Account Security</h3>
              <p>
                Only legally registered entities in India holding valid PAN, GSTIN, and authorized administrative credentials may participate as Sellers. Government Buyers must use authorized government domain email accounts (.gov.in / .nic.in). Users are solely responsible for maintaining the confidentiality of their digital signatures and credentials.
              </p>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">3. Pricing Integrity & Anti-Collusion</h3>
              <p>
                Sellers certify that the price quoted on GeM does not exceed the price at which the same good or service is offered to any private buyer or open market retailer under identical terms. Any cartelization or artificial bidding manipulation will result in immediate blacklisting and forfeiture of caution money.
              </p>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">4. Delivery, Inspection & CRAC</h3>
              <p>
                Sellers must deliver goods within the stipulated contract delivery period. Consignees must inspect goods and issue the Consignee Receipt and Acceptance Certificate (CRAC) within 10 days of delivery. Once CRAC is generated, payment must be processed within 10 calendar days.
              </p>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">5. Grievance Redressal & Arbitration</h3>
              <p>
                In the event of any contractual dispute, parties shall first seek resolution through the GeM Online Dispute Resolution (ODR) portal. If unresolved within 30 days, the matter shall be referred to arbitration in New Delhi under the Indian Arbitration and Conciliation Act, 1996.
              </p>
            </section>
          </div>
        </div>
      </div>
    `;
  };

  // 10. Website Policy View
  const renderPolicyView = () => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        ${renderPageBanner(
          "Website Policy & Data Privacy",
          "Commitment to information security, data protection under DPDP Act 2023, and accessibility guidelines.",
          "fa-shield-halved",
          "Web Info"
        )}

        <div class="max-w-4xl mx-auto px-4 sm:px-6">
          <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs text-slate-700 leading-relaxed">
            <div class="pb-4 border-b border-slate-100">
              <span class="text-[11px] text-slate-400 font-bold uppercase block mb-1">Compliance: Digital Personal Data Protection Act 2023</span>
              <h2 class="text-xl font-bold text-slate-900">GeM 2.0 Privacy & Security Charter</h2>
            </div>

            <section class="space-y-2">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">1. Privacy & Data Collection</h3>
              <p>
                GeM collects essential transactional and identifying data solely for executing public procurement contracts, fulfilling legal verifications with statutory databases (CBDT, GSTN, MCA), and preventing procurement fraud. We do not sell or monetize user data under any circumstances.
              </p>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">2. Information Security Standards</h3>
              <p>
                The GeM portal infrastructure is hosted in MeitY-empanelled Tier-4 cloud data centers in India. All data in transit is encrypted using TLS 1.3, and data at rest is secured via AES-256 encryption. The portal undergoes regular vulnerability assessments and is CERT-In certified.
              </p>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">3. Hyperlinking Policy</h3>
              <p>
                Prior permission is required before hyperlinks from any external portal are directed to GeM. We do not permit our pages to be loaded into frames on external sites.
              </p>
            </section>

            <section class="space-y-2">
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">4. Web Accessibility Compliance</h3>
              <p>
                GeM is committed to ensuring portal accessibility for all citizens, including persons with visual and motor disabilities, in compliance with the Guidelines for Indian Government Websites (GIGW) and WCAG 2.1 AA benchmarks.
              </p>
            </section>
          </div>
        </div>
      </div>
    `;
  };

  // 11. Feedback View
  const renderFeedbackView = () => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        ${renderPageBanner(
          "Portal Feedback & Experience Survey",
          "Your inputs help us refine GeM 2.0 algorithms, speed, and usability for buyers and sellers across the nation.",
          "fa-comments",
          "Need Help"
        )}

        <div class="max-w-2xl mx-auto px-4 sm:px-6">
          <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
            <form id="feedback-form" class="space-y-5">
              
              <div class="text-center pb-4 border-b border-slate-100">
                <label class="block text-xs font-bold uppercase text-slate-500 mb-2">Overall Portal Experience</label>
                <div id="star-container" class="flex justify-center gap-2 text-2xl text-slate-300 cursor-pointer">
                  <i class="fa-solid fa-star star-icon transition-colors" data-rating="1"></i>
                  <i class="fa-solid fa-star star-icon transition-colors" data-rating="2"></i>
                  <i class="fa-solid fa-star star-icon transition-colors" data-rating="3"></i>
                  <i class="fa-solid fa-star star-icon transition-colors" data-rating="4"></i>
                  <i class="fa-solid fa-star star-icon transition-colors" data-rating="5"></i>
                </div>
                <input type="hidden" id="selected-rating" value="5" />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Your Name</label>
                <input type="text" id="fb-name" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500" placeholder="e.g. Rahul Sharma" />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
                <input type="email" id="fb-email" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500" placeholder="yourname@gmail.com" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase text-slate-500 mb-1">User Category</label>
                  <select id="fb-role" class="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 bg-white">
                    <option value="seller">Seller / Vendor</option>
                    <option value="buyer">Government Buyer</option>
                    <option value="msme">MSME / Startup Owner</option>
                    <option value="citizen">Public Citizen</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Feedback Domain</label>
                  <select id="fb-topic" class="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 bg-white">
                    <option value="ui">UI & Navigation Experience</option>
                    <option value="speed">Portal Speed & Performance</option>
                    <option value="bidding">Bidding & RA Process</option>
                    <option value="payments">Payment & Invoicing</option>
                    <option value="feature">New Feature Request</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Detailed Remarks / Suggestions</label>
                <textarea id="fb-comments" rows="4" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500" placeholder="Please describe your experience or suggestion in detail..."></textarea>
              </div>

              <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg uppercase tracking-wider text-xs sm:text-sm transition border-none cursor-pointer shadow">
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    `;

    const stars = document.querySelectorAll('.star-icon');
    const ratingInput = document.getElementById('selected-rating');
    let currentRating = 5;

    const highlightStars = (rating) => {
      stars.forEach((star, idx) => {
        if (idx < rating) {
          star.classList.remove('text-slate-300');
          star.classList.add('text-amber-400');
        } else {
          star.classList.remove('text-amber-400');
          star.classList.add('text-slate-300');
        }
      });
    };

    highlightStars(5);

    stars.forEach(star => {
      star.onclick = () => {
        currentRating = parseInt(star.getAttribute('data-rating'), 10);
        ratingInput.value = currentRating;
        highlightStars(currentRating);
      };
      star.onmouseenter = () => highlightStars(parseInt(star.getAttribute('data-rating'), 10));
      star.onmouseleave = () => highlightStars(currentRating);
    });

    const form = document.getElementById('feedback-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const refId = `FB-${Date.now().toString().slice(-6)}`;
        showToast(`Thank you! Your feedback has been recorded (Ref #${refId})`, 'success');
        form.reset();
        highlightStars(5);
      };
    }
  };

  // 12. Support Ticket View
  const getUserTickets = () => {
    const raw = localStorage.getItem('gem_user_tickets');
    if (raw) return JSON.parse(raw);
    return [
      { id: 'GEM-TKT-2026-9184', subject: 'Catalog brand authorization pending review', category: 'Catalog', priority: 'Medium', status: 'In Progress', date: '2026-08-28' },
      { id: 'GEM-TKT-2026-8402', subject: 'CRAC generation clarification for Railway PO', category: 'Invoicing', priority: 'High', status: 'Resolved', date: '2026-08-20' }
    ];
  };

  const saveUserTickets = (tickets) => {
    localStorage.setItem('gem_user_tickets', JSON.stringify(tickets));
  };

  const renderTicketView = () => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        ${renderPageBanner(
          "Grievance Redressal & Support Ticket Desk",
          "Submit urgent technical queries, payment discrepancies, or track the resolution timeline of existing tickets.",
          "fa-ticket",
          "Need Help"
        )}

        <div class="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div class="flex border-b border-slate-200 text-xs font-bold">
            <button id="tab-raise-btn" class="px-6 py-3 border-b-2 border-amber-500 text-amber-600 cursor-pointer bg-transparent uppercase tracking-wider">
              <i class="fa-solid fa-plus mr-1"></i> Raise New Ticket
            </button>
            <button id="tab-track-btn" class="px-6 py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-900 cursor-pointer bg-transparent uppercase tracking-wider">
              <i class="fa-solid fa-timeline mr-1"></i> Track Existing Ticket
            </button>
          </div>

          <div id="panel-raise" class="bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
            <form id="raise-ticket-form" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name</label>
                  <input type="text" id="tkt-name" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500" placeholder="e.g. Sarthak Verma" />
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Registered Email</label>
                  <input type="email" id="tkt-email" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500" placeholder="user@gmail.com" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Grievance Category</label>
                  <select id="tkt-cat" class="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 bg-white">
                    <option value="Catalog">Catalog Approval / Brand Authorization</option>
                    <option value="Bidding">Bid Creation & Reverse Auction Technical Issue</option>
                    <option value="Payment">Payment Delay & CRAC Discrepancy</option>
                    <option value="Account">Account Verification & Aadhaar DSC Signing</option>
                    <option value="Others">General Portal Bug</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Severity / Priority</label>
                  <select id="tkt-priority" class="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 bg-white">
                    <option value="Medium">Medium (Normal Query - 48h)</option>
                    <option value="High">High (Live Bid Expiring - 12h)</option>
                    <option value="Critical">Critical (Financial Discrepancy - 4h)</option>
                    <option value="Low">Low (General Inquiry - 72h)</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Issue Subject</label>
                <input type="text" id="tkt-subject" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500" placeholder="Brief one-line summary of issue" />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Detailed Description & Order/Bid ID</label>
                <textarea id="tkt-desc" rows="4" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500" placeholder="Please include your Bid Number, PO Reference, or error message description..."></textarea>
              </div>

              <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg uppercase tracking-wider text-xs sm:text-sm transition border-none cursor-pointer shadow">
                Generate Support Ticket
              </button>
            </form>
          </div>

          <div id="panel-track" class="hidden bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
            <div class="flex gap-2">
              <input type="text" id="track-search-input" placeholder="Enter Ticket ID (e.g. GEM-TKT-2026-9184)..." class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500" />
              <button id="track-search-btn" class="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition border-none cursor-pointer shrink-0">
                Track
              </button>
            </div>

            <div id="track-results-container" class="space-y-4 pt-2"></div>
          </div>

        </div>
      </div>
    `;

    const tabRaiseBtn = document.getElementById('tab-raise-btn');
    const tabTrackBtn = document.getElementById('tab-track-btn');
    const panelRaise = document.getElementById('panel-raise');
    const panelTrack = document.getElementById('panel-track');

    const switchTab = (toTrack = false) => {
      if (toTrack) {
        tabRaiseBtn.className = 'px-6 py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-900 cursor-pointer bg-transparent uppercase tracking-wider';
        tabTrackBtn.className = 'px-6 py-3 border-b-2 border-amber-500 text-amber-600 cursor-pointer bg-transparent uppercase tracking-wider';
        panelRaise.classList.add('hidden');
        panelTrack.classList.remove('hidden');
        renderTicketList();
      } else {
        tabTrackBtn.className = 'px-6 py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-900 cursor-pointer bg-transparent uppercase tracking-wider';
        tabRaiseBtn.className = 'px-6 py-3 border-b-2 border-amber-500 text-amber-600 cursor-pointer bg-transparent uppercase tracking-wider';
        panelTrack.classList.add('hidden');
        panelRaise.classList.remove('hidden');
      }
    };

    tabRaiseBtn.onclick = () => switchTab(false);
    tabTrackBtn.onclick = () => switchTab(true);

    const form = document.getElementById('raise-ticket-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const randNum = Math.floor(1000 + Math.random() * 9000);
        const newTicketId = `GEM-TKT-2026-${randNum}`;
        const newTicket = {
          id: newTicketId,
          subject: document.getElementById('tkt-subject').value.trim(),
          category: document.getElementById('tkt-cat').value,
          priority: document.getElementById('tkt-priority').value,
          status: 'Under Review',
          date: new Date().toISOString().split('T')[0]
        };

        const tickets = getUserTickets();
        tickets.unshift(newTicket);
        saveUserTickets(tickets);

        showToast(`Ticket ${newTicketId} generated successfully!`, 'success');
        form.reset();
        switchTab(true);
      };
    }

    const renderTicketList = (filterQuery = "") => {
      const resultsEl = document.getElementById('track-results-container');
      const tickets = getUserTickets();
      const filtered = tickets.filter(t => 
        !filterQuery || t.id.toLowerCase().includes(filterQuery.toLowerCase()) || t.subject.toLowerCase().includes(filterQuery.toLowerCase())
      );

      if (filtered.length === 0) {
        resultsEl.innerHTML = `
          <div class="p-8 text-center text-slate-500 text-xs bg-slate-50 rounded-xl border border-slate-100">
            No ticket found with ID "${filterQuery}". Check your reference number.
          </div>
        `;
        return;
      }

      resultsEl.innerHTML = filtered.map(t => `
        <div class="p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-mono font-bold text-slate-900 text-sm">${t.id}</span>
                <button onclick="window.gemCopy('${t.id}', 'Ticket ID')" class="text-slate-400 hover:text-amber-600 text-xs bg-transparent border-none cursor-pointer" title="Copy Ticket ID">
                  <i class="fa-solid fa-copy"></i>
                </button>
              </div>
              <span class="text-[10px] text-slate-400 font-semibold block mt-0.5">Created on ${t.date} &bull; ${t.category}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                t.priority === 'Critical' ? 'bg-red-100 text-red-700' : t.priority === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-700'
              }">${t.priority} Priority</span>
              <span class="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }">${t.status}</span>
            </div>
          </div>

          <p class="text-xs text-slate-700 font-medium">${t.subject}</p>

          <div class="pt-2">
            <div class="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-2">
              <span class="text-emerald-600"><i class="fa-solid fa-circle-check"></i> Submitted</span>
              <span class="${t.status !== 'Submitted' ? 'text-emerald-600' : 'text-slate-400'}"><i class="fa-solid fa-circle-check"></i> Officer Assigned</span>
              <span class="${t.status === 'Resolved' ? 'text-emerald-600' : 'text-slate-400'}"><i class="fa-solid fa-circle-check"></i> Resolved</span>
            </div>
            <div class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full" style="width: ${t.status === 'Resolved' ? '100%' : '65%'};"></div>
            </div>
          </div>
        </div>
      `).join('');
    };

    document.getElementById('track-search-btn').onclick = () => {
      const q = document.getElementById('track-search-input').value.trim();
      renderTicketList(q);
    };
  };

  // 13. Contact Us View
  const renderContactView = () => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        ${renderPageBanner(
          "Contact Us & Nodal Directory",
          "Reach out to GeM SPV headquarters, regional nodal officers, and 24/7 bilingual toll-free helpdesk agents.",
          "fa-headset",
          "Need Help"
        )}

        <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div class="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-4">
                  <i class="fa-solid fa-phone-volume"></i>
                </div>
                <h3 class="text-base font-bold text-slate-900 mb-1">Toll-Free Helpline (24x7)</h3>
                <p class="text-xs text-slate-500 mb-4">Available in Hindi, English and 10 regional Indian languages.</p>
                <div class="text-lg font-black text-amber-600">1800-419-3436</div>
                <div class="text-lg font-black text-amber-600">1800-102-3436</div>
              </div>
              <button onclick="window.gemCopy('1800-419-3436', 'Helpline Number')" class="mt-6 w-full bg-slate-50 hover:bg-amber-50 text-slate-800 font-bold py-2 rounded-lg text-xs transition border border-slate-200 cursor-pointer flex items-center justify-center gap-2">
                <i class="fa-solid fa-copy"></i> Copy Numbers
              </button>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div class="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4">
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <h3 class="text-base font-bold text-slate-900 mb-1">Official Support Desks</h3>
                <p class="text-xs text-slate-500 mb-4">Direct correspondence channels for statutory and onboarding queries.</p>
                <div class="text-xs font-bold text-slate-800 mb-1">helpdesk-gem@gov.in</div>
                <div class="text-xs font-bold text-slate-800 mb-1">grievance-gem@gov.in</div>
                <div class="text-xs font-bold text-slate-800">onboarding-msme@gov.in</div>
              </div>
              <button onclick="window.gemCopy('helpdesk-gem@gov.in', 'Helpdesk Email')" class="mt-6 w-full bg-slate-50 hover:bg-blue-50 text-slate-800 font-bold py-2 rounded-lg text-xs transition border border-slate-200 cursor-pointer flex items-center justify-center gap-2">
                <i class="fa-solid fa-copy"></i> Copy Email
              </button>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div class="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center text-xl mb-4">
                  <i class="fa-solid fa-location-dot"></i>
                </div>
                <h3 class="text-base font-bold text-slate-900 mb-1">Headquarters (SPV)</h3>
                <p class="text-xs text-slate-600 leading-relaxed">
                  Government e Marketplace (GeM SPV)<br/>
                  2nd & 3rd Floor, Jeevan Tara Building,<br/>
                  5 Parliament Street, Patel Chowk,<br/>
                  New Delhi – 110001, India.
                </p>
              </div>
              <button onclick="window.gemCopy('GeM SPV, Jeevan Tara Building, 5 Parliament Street, New Delhi 110001', 'HQ Address')" class="mt-6 w-full bg-slate-50 hover:bg-emerald-50 text-slate-800 font-bold py-2 rounded-lg text-xs transition border border-slate-200 cursor-pointer flex items-center justify-center gap-2">
                <i class="fa-solid fa-copy"></i> Copy Address
              </button>
            </div>

          </div>

          <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-xl font-bold text-slate-900 mb-6">Send an Official Inquiry to GeM Nodal Desk</h3>
            
            <form id="contact-inquiry-form" class="space-y-4 max-w-3xl">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Your Full Name</label>
                  <input type="text" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500" placeholder="e.g. Priya Sharma" />
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Official Email ID</label>
                  <input type="email" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500" placeholder="priya@organization.in" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Contact Phone</label>
                  <input type="tel" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Department / State</label>
                  <input type="text" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500" placeholder="e.g. Maharashtra State PSU" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Message / Consultation Scope</label>
                <textarea rows="4" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500" placeholder="State your requirements or question..."></textarea>
              </div>

              <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3 rounded-lg uppercase tracking-wider text-xs sm:text-sm transition border-none cursor-pointer shadow">
                Dispatch Official Inquiry
              </button>
            </form>
          </div>

        </div>
      </div>
    `;

    const contactForm = document.getElementById('contact-inquiry-form');
    if (contactForm) {
      contactForm.onsubmit = (e) => {
        e.preventDefault();
        showToast("Your inquiry has been dispatched to the Nodal Desk!", "success");
        contactForm.reset();
      };
    }
  };

  // 14. Search Results Hub View
  const renderSearchView = (query = "") => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        ${renderPageBanner(
          `Search Results for: "${query || 'All Catalogs'}"`,
          "Showing matching verified product categories, active tender bids, policies, and seller catalogs.",
          "fa-magnifying-glass",
          "Search"
        )}

        <div class="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div class="flex items-center gap-3 overflow-x-auto pb-2 text-xs font-bold text-slate-600">
            <span class="bg-amber-500 text-slate-950 px-3 py-1.5 rounded-full cursor-pointer">All Results (14)</span>
            <span class="bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full cursor-pointer">Products & Catalogs (8)</span>
            <span class="bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full cursor-pointer">Active Bids / Tenders (4)</span>
            <span class="bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full cursor-pointer">Documentation (2)</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">Verified Product</span>
                <h3 class="text-base font-bold text-slate-900 mt-2 mb-1">Commercial High-Performance Laptops</h3>
                <p class="text-xs text-slate-500 mb-4">Intel Core i7 14th Gen / 16GB DDR5 / 512GB SSD / Win 11 Pro OEM certified.</p>
                <div class="text-lg font-black text-slate-900">₹ 68,450 <span class="text-xs font-normal text-slate-400">/ unit</span></div>
              </div>
              <button onclick="window.gemToast('Viewing catalog specifications...')" class="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-lg text-xs transition border-none cursor-pointer">
                View Technical Specs
              </button>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <span class="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded uppercase">Active Bid / RA</span>
                <h3 class="text-base font-bold text-slate-900 mt-2 mb-1">Supply of Rooftop Solar Panels (500 kW)</h3>
                <p class="text-xs text-slate-500 mb-4">Ministry of New and Renewable Energy &bull; Bid No: GEM/2026/B/819402.</p>
                <div class="text-xs font-bold text-amber-600">Closes in: 3 days, 14 hours</div>
              </div>
              <button onclick="window.gemToast('Opening live bid details...')" class="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 rounded-lg text-xs transition border-none cursor-pointer">
                Participate in Bid
              </button>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <span class="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded uppercase">Verified Service</span>
                <h3 class="text-base font-bold text-slate-900 mt-2 mb-1">Cloud Hosting & Managed Security Services</h3>
                <p class="text-xs text-slate-500 mb-4">MeitY Empanelled CSP &bull; Tier-4 High Availability with 99.95% uptime SLA.</p>
                <div class="text-lg font-black text-slate-900">Custom Monthly SLA</div>
              </div>
              <button onclick="window.gemToast('Viewing service parameters...')" class="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-lg text-xs transition border-none cursor-pointer">
                Configure Service SLA
              </button>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">Womaniya SHG Product</span>
                <h3 class="text-base font-bold text-slate-900 mt-2 mb-1">Handcrafted Jute Conference Folders</h3>
                <p class="text-xs text-slate-500 mb-4">Eco-friendly conference kits produced by Rural Women SHGs (MoRD registered).</p>
                <div class="text-lg font-black text-slate-900">₹ 280 <span class="text-xs font-normal text-slate-400">/ piece</span></div>
              </div>
              <button onclick="window.gemToast('Viewing SHG catalog...')" class="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-lg text-xs transition border-none cursor-pointer">
                Direct Purchase
              </button>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <span class="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded uppercase">Green Procurement</span>
                <h3 class="text-base font-bold text-slate-900 mt-2 mb-1">BEE 5-Star Smart Inverter AC (1.5 Ton)</h3>
                <p class="text-xs text-slate-500 mb-4">Copper condenser, Eco-friendly R32 refrigerant, 100% GFR 149 compliant.</p>
                <div class="text-lg font-black text-slate-900">₹ 34,990 <span class="text-xs font-normal text-slate-400">/ unit</span></div>
              </div>
              <button onclick="window.gemToast('Viewing L1 comparison...')" class="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-lg text-xs transition border-none cursor-pointer">
                View L1 Comparison
              </button>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <span class="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded uppercase">Documentation</span>
                <h3 class="text-base font-bold text-slate-900 mt-2 mb-1">Direct Purchase Policy Guidelines 2026</h3>
                <p class="text-xs text-slate-500 mb-4">Official circular clarifying GFR ceiling limits and multiple supplier comparison rules.</p>
                <span class="text-[11px] text-slate-400 font-medium">Policy Document &bull; 1.2 MB</span>
              </div>
              <button onclick="window.gemDownloadMock('Direct_Purchase_Guidelines_2026.pdf')" class="mt-4 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-lg text-xs transition border-none cursor-pointer">
                Download Circular
              </button>
            </div>

          </div>

        </div>
      </div>
    `;
  };

  // 15. Auth & Dashboard Views
  const getRegisteredUsers = () => {
    const users = localStorage.getItem('gem_registered_users');
    return users ? JSON.parse(users) : [];
  };

  const registerUser = (username, email, password) => {
    const users = getRegisteredUsers();
    users.push({ username, email, password });
    localStorage.setItem('gem_registered_users', JSON.stringify(users));
  };

  const authenticateUser = (email, password) => {
    const users = getRegisteredUsers();
    return users.find(u => u.email === email && u.password === password);
  };

  const renderRegisterView = () => {
    document.getElementById("global-header-container")?.classList.add("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        <header class="bg-slate-900 text-white w-full py-4 px-6 mb-8 flex items-center justify-between shadow-md">
          <a href="#home" data-route="home" class="flex items-center">
            <img src="/src/components/img/logoclone1.png" alt="GeM Logo" class="h-8 w-auto object-contain" />
          </a>
          <div class="flex items-center gap-4 text-xs font-bold text-slate-300">
            <a href="#login" data-route="login" class="hover:text-amber-400 transition">Back to Login</a>
            <span class="text-slate-600">|</span>
            <a href="#home" data-route="home" class="hover:text-amber-400 transition">Back to Home</a>
          </div>
        </header>

        <section class="max-w-md mx-auto my-8 px-6 py-8 bg-white border border-slate-200 rounded-2xl shadow-xl text-slate-800">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">Create your GeM Account</h2>
          <form id="register-form" class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Username</label>
              <input type="text" id="reg-username" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors" placeholder="e.g. sarthak123" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Gmail Address</label>
              <input type="email" id="reg-email" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors" placeholder="yourname@gmail.com" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Password</label>
              <input type="password" id="reg-password" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors" placeholder="Min 6 characters" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Confirm Password</label>
              <input type="password" id="reg-confirm" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors" placeholder="Repeat password" />
            </div>
            
            <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 rounded-lg uppercase tracking-wider text-xs sm:text-sm transition shadow border-none cursor-pointer mt-4">
              Register Account
            </button>

            <div class="relative flex items-center justify-center my-6">
              <span class="absolute px-3 bg-white text-xs font-bold uppercase text-slate-400">Or sign up with</span>
              <div class="w-full border-t border-slate-200"></div>
            </div>

            <button type="button" id="reg-google-btn" class="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-3 rounded-lg text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer">
              <svg class="w-5 h-5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
            
            <p class="text-xs text-center text-slate-500 mt-6">
              Already have an account? <a href="#login" data-route="login" class="text-amber-600 hover:underline font-bold">Sign In</a>
            </p>
          </form>
        </section>
      </div>
    `;

    document.getElementById("register-form").onsubmit = (e) => {
      e.preventDefault();
      const username = document.getElementById("reg-username").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const password = document.getElementById("reg-password").value;
      const confirm = document.getElementById("reg-confirm").value;

      if (!email.endsWith("@gmail.com")) {
        showToast("Please enter a valid Gmail address (@gmail.com)!", "error");
        return;
      }
      if (password.length < 6) {
        showToast("Password must be at least 6 characters long!", "error");
        return;
      }
      if (password !== confirm) {
        showToast("Passwords do not match!", "error");
        return;
      }

      const users = getRegisteredUsers();
      if (users.some(u => u.email === email)) {
        showToast("This Gmail address is already registered!", "error");
        return;
      }

      registerUser(username, email, password);
      showToast("Registration successful! Redirecting to login...", "success");
      setTimeout(renderLoginView, 1000);
    };

    document.getElementById("reg-google-btn").onclick = () => {
      const gUser = { username: "Google User", email: "user@gmail.com", loginType: "Google Login" };
      localStorage.setItem("gem_current_user", JSON.stringify(gUser));
      showToast("Google Registration & Login Successful!", "success");
      renderDashboardView();
    };
  };

  const renderLoginView = () => {
    document.getElementById("global-header-container")?.classList.add("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      <div class="page-fade-in">
        <header class="bg-slate-900 text-white w-full py-4 px-6 mb-8 flex items-center justify-between shadow-md">
          <a href="#home" data-route="home" class="flex items-center">
            <img src="/src/components/img/logoclone1.png" alt="GeM Logo" class="h-8 w-auto object-contain" />
          </a>
          <div class="flex items-center gap-4 text-xs font-bold text-slate-300">
            <a href="#home" data-route="home" class="hover:text-amber-400 transition">Back to Home</a>
          </div>
        </header>

        <section class="max-w-md mx-auto my-8 px-6 py-8 bg-white border border-slate-200 rounded-2xl shadow-xl text-slate-800">
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">Sign In to GeM</h2>
          <form id="login-form" class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Gmail Address</label>
              <input type="email" id="log-email" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors" placeholder="yourname@gmail.com" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Password</label>
              <input type="password" id="log-password" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors" placeholder="Enter password" />
            </div>
            
            <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 rounded-lg uppercase tracking-wider text-xs sm:text-sm transition shadow border-none cursor-pointer mt-4">
              Sign In
            </button>

            <div class="relative flex items-center justify-center my-6">
              <span class="absolute px-3 bg-white text-xs font-bold uppercase text-slate-400">Or connect with</span>
              <div class="w-full border-t border-slate-200"></div>
            </div>

            <button type="button" id="log-google-btn" class="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-3 rounded-lg text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer">
              <svg class="w-5 h-5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
            
            <p class="text-xs text-center text-slate-500 mt-6">
              New to GeM? <a href="#register" data-route="register" class="text-amber-600 hover:underline font-bold">Register Now</a>
            </p>
          </form>
        </section>
      </div>
    `;

    document.getElementById("login-form").onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById("log-email").value.trim();
      const password = document.getElementById("log-password").value;

      const user = authenticateUser(email, password);
      if (!user) {
        showToast("Invalid email or password!", "error");
        return;
      }

      localStorage.setItem("gem_current_user", JSON.stringify({
        username: user.username,
        email: user.email,
        loginType: "Normal Login"
      }));
      showToast(`Welcome back, ${user.username}!`, "success");
      renderDashboardView();
    };

    document.getElementById("log-google-btn").onclick = () => {
      const gUser = { username: "Google User", email: "user@gmail.com", loginType: "Google Login" };
      localStorage.setItem("gem_current_user", JSON.stringify(gUser));
      showToast("Google Login Successful!", "success");
      renderDashboardView();
    };
  };

  const renderDashboardView = () => {
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const container = document.getElementById("main-content");
    if (!container) return;

    const userRaw = localStorage.getItem("gem_current_user");
    const user = userRaw ? JSON.parse(userRaw) : { username: "Guest User", loginType: "Normal Login", email: "guest@gmail.com" };

    container.innerHTML = `
      <div class="page-fade-in max-w-5xl mx-auto my-10 px-4 sm:px-6">
        <div class="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 text-slate-800">
          <div class="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
            <div>
              <span class="text-xs uppercase font-extrabold tracking-widest text-amber-500 block mb-1">GeM 2.0 Account Panel</span>
              <h2 class="text-2xl font-bold text-slate-900">Welcome, ${user.username}!</h2>
            </div>
            <button id="logout-btn" class="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition cursor-pointer border-none shadow">
              Sign Out
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <span class="text-slate-400 text-[10px] uppercase font-bold block mb-1">Authenticated Account</span>
              <span class="text-slate-900 text-sm font-semibold block mt-1 break-all">${user.email}</span>
            </div>
            <div class="p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <span class="text-slate-400 text-[10px] uppercase font-bold block mb-1">Sign-In Method</span>
              <span class="text-amber-600 text-sm font-bold block mt-1">${user.loginType}</span>
            </div>
            <div class="p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <span class="text-slate-400 text-[10px] uppercase font-bold block mb-1">System Privilege</span>
              <span class="text-emerald-600 text-sm font-bold block mt-1">Verified Supplier Account</span>
            </div>
          </div>

          <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 class="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Quick Seller Control Center</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <button onclick="window.gemToast('Loading active tenders and bids...')" class="p-4 bg-white border border-slate-200 hover:border-amber-500 rounded-lg text-center font-bold text-xs uppercase tracking-wider text-slate-700 hover:text-amber-600 transition shadow-sm cursor-pointer">
                Manage Bids / RA
              </button>
              <button onclick="window.gemToast('Opening catalog upload tool...')" class="p-4 bg-white border border-slate-200 hover:border-amber-500 rounded-lg text-center font-bold text-xs uppercase tracking-wider text-slate-700 hover:text-amber-600 transition shadow-sm cursor-pointer">
                Upload Catalog
              </button>
              <button onclick="window.gemToast('Fetching order history and invoices...')" class="p-4 bg-white border border-slate-200 hover:border-amber-500 rounded-lg text-center font-bold text-xs uppercase tracking-wider text-slate-700 hover:text-amber-600 transition shadow-sm cursor-pointer">
                Orders & CRAC Invoices
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("logout-btn").onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem("gem_current_user");
      showToast("Signed out successfully.", "info");
      renderHomeView();
    };
  };

  // --- Router Dispatcher ---
  const routes = {
    home: renderHomeView,
    about: renderAboutView,
    gem2: renderGeM2View,
    initiatives: renderInitiativesView,
    subscription: renderSubscriptionView,
    statistics: renderStatisticsView,
    faqs: renderFAQsView,
    help: renderHelpView,
    terms: renderTermsView,
    policy: renderPolicyView,
    feedback: renderFeedbackView,
    ticket: renderTicketView,
    contact: renderContactView,
    login: renderLoginView,
    register: renderRegisterView,
    dashboard: renderDashboardView
  };

  const navigateTo = (route, param = "") => {
    closeHamburgerDrawer();
    if (route === 'search') {
      renderSearchView(param);
      return;
    }

    if (route === 'login' || route === 'register') {
      if (localStorage.getItem("gem_current_user")) {
        renderDashboardView();
        return;
      }
    }

    const handler = routes[route] || renderHomeView;
    handler();
  };

  // Global event delegation for all routes
  const initRouter = () => {
    document.addEventListener("click", (e) => {
      const routeEl = e.target.closest("[data-route]");
      if (routeEl) {
        e.preventDefault();
        const targetRoute = routeEl.getAttribute("data-route");
        window.location.hash = targetRoute;
        navigateTo(targetRoute);
        return;
      }
    });

    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.replace("#", "") || "home";
      navigateTo(hash);
    });

    const handleSearchSubmit = (inputEl) => {
      const q = inputEl?.value.trim();
      if (q) {
        navigateTo('search', q);
      }
    };

    const desktopForm = document.getElementById('gemSearchFormDesktop');
    if (desktopForm) {
      desktopForm.onsubmit = (e) => {
        e.preventDefault();
        handleSearchSubmit(document.getElementById('desktopSearchInput'));
      };
    }

    const mobileForm = document.getElementById('gemSearchFormMobile');
    if (mobileForm) {
      mobileForm.onsubmit = (e) => {
        e.preventDefault();
        handleSearchSubmit(document.getElementById('mobileSearchInput'));
      };
    }
  };

  window.gemToast = (msg) => showToast(msg, 'info');
  window.gemCopy = (text, label) => copyToClipboard(text, label);
  window.gemSearchFor = (term) => navigateTo('search', term);
  window.gemDownloadMock = (filename) => {
    showToast(`Downloading ${filename}...`, 'success');
  };
  window.gemPlayVideo = (title) => {
    showToast(`Streaming Training Video: "${title}"`, 'info');
  };

  // Initialize App
  const initApp = () => {
    const container = document.getElementById("main-content");
    if (container && !homePageBackupHTML) {
      homePageBackupHTML = container.innerHTML;
    }

    startNoticeRotator();
    initHeroCarousel();
    initStatsToggle();
    initHamburgerDrawer();
    initRouter();

    const initialHash = window.location.hash.replace("#", "");
    if (initialHash && routes[initialHash]) {
      navigateTo(initialHash);
    }
  };

  initApp();
});