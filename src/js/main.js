document.addEventListener('DOMContentLoaded', () => {
  // Data Array (Updating this updates the HTML automatically via JS rotator)
  const bannerAlerts = [
    { tag: "Notice", desc: "GeM portal maintenance scheduled for this Sunday from 2 AM to 6 AM." },
    { tag: "Update", desc: "New seller registration guidelines have been updated for 2026." },
    { tag: "Alert", desc: "Please complete your profile verification before the end of the month." }
  ];

  let currentAlertIndex = 0;



  // Rotator attached to static HTML IDs
  const startNoticeRotator = () => {
    const container = document.getElementById('marquee-content');
    const parent = container?.parentElement;
    const tagEl = document.getElementById('notice-tag');
    const descEl = document.getElementById('notice-desc');

    if (!container || !parent || !tagEl || !descEl) return;

    let currentX = parent.clientWidth;
    const speed = 1.5; // Change speed (pixels per frame)

    function step() {
      currentX -= speed;

      // Reset when text scrolls completely off the left edge
      if (currentX < -container.clientWidth) {
        currentX = parent.clientWidth;

        // Update alert text seamlessly on each loop reset
        currentAlertIndex = (currentAlertIndex + 1) % bannerAlerts.length;
        tagEl.textContent = bannerAlerts[currentAlertIndex].tag;
        descEl.textContent = bannerAlerts[currentAlertIndex].desc;
      }

      container.style.transform = `translateX(${currentX}px)`;
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  };

  const stores = [
    { img: "./src/components/img/saras.jpeg", title: "The Saras Collection" },
    { img: "./src/components/img/odop.jpeg", title: "ODOP" },
    { img: "./src/components/img/startup.jpeg", title: "Startup Runway" },
    { img: "./src/components/img/aabhar.jpeg", title: "The Aabhar Collection" },
    { img: "./src/components/img/handicraft.jpeg", title: "Handicrafts" },
    { img: "./src/components/img/handloom.jpeg", title: "Handloom" },
    { img: "./src/components/img/womaniya.jpeg", title: "Womaniya" },
    { img: "./src/components/img/millet.jpeg", title: "Millet Products" }
  ];

  const createOutletStoresSection = () => {
    return `
    <section class="w-full bg-slate-100 py-8 px-4 sm:px-8">
      <div class="max-w-7xl mx-auto flex flex-col items-center">
        
        <!-- Main Centered Section Titles -->
        <div class="text-center mb-6">
          <h1 class="text-3xl sm:text-4xl font-normal text-emerald-700 tracking-wide mb-1">
            #vocal<span class="text-orange-500">for</span>local
          </h1>
          <h2 class="text-base sm:text-lg font-semibold text-slate-700">
            GeM Outlet Stores
          </h2>
        </div>

        <!-- 4 Columns x 2 Rows Grid for Outlet Banners -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          ${stores.map(store => `
            <div class="h-24 sm:h-28 bg-white border border-slate-200 hover:border-amber-500 rounded-lg transition-all cursor-pointer overflow-hidden group shadow-xs">
              <img 
                src="${store.img}" 
                alt="${store.title || 'Store Outlet'}" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform" 
              />
            </div>
          `).join('')}
        </div>

      </div>
    </section>
  `;
  };
  const createProductsSection = () => {
    const categoryCards = [
      {
        title: "OXYGEN GAS & ACCESSORIES",
        items: [
          "Oxygen Concentrator",
          "Oxygen Flow Meter",
          "Compressed oxygen IS:309",
          "O2 Gas Cylinders - Steel",
          "HF Nasal O2 Therapy Unit"
        ],
        img: "./src/components/img/product1.jpeg"
      },
      {
        title: "MEDICAL",
        items: [
          "Hand Sanitizer",
          "Air Pollution Mask",
          "Surgical Gloves",
          "Covid-19 Kit for..."
        ],
        img: "./src/components/img/product2.jpeg"
      },
      {
        title: "SARAS COLLECTION",
        items: [
          "Handicrafts",
          "Handloom Texti..",
          "Personal Care..",
          "Accessories"
        ],
        img: "./src/components/img/product3.jpeg"
      },
      {
        title: "FURNITURE",
        items: [
          "Office Chair",
          "Computer Desk",
          "Lounge Chair",
          "Storage Rack"
        ],
        img: "./src/components/img/product4.jpeg"
      },
      {
        title: "FIRE SAFETY",
        items: [
          "Fire Extinguishers",
          "Sprinklers Smoke",
          "Detectors Fire",
          "Alarms"
        ],
        img: "./src/components/img/product5.jpeg"
      },
      {
        title: "COMPUTERS",
        items: [
          "Desktop Computer",
          "Computer Monitor",
          "PC Software",
          "Computer Printer"
        ],
        img: "./src/components/img/product6.jpeg"
      }
    ];

    return `
    <section class="w-full bg-slate-100 py-8 px-4 sm:px-8">
      <div class="max-w-7xl mx-auto flex flex-col items-center">
        
        <!-- Section Title -->
        <h2 class="text-xl sm:text-2xl font-normal text-slate-800 text-center mb-6">
          Popular Product Categories
        </h2>

        <!-- 3 Columns x 2 Rows Grid for Laptop -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
          ${categoryCards.map(card => `
            <div class="bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex justify-between items-start hover:shadow-md hover:border-blue-400 transition-all cursor-pointer min-h-[190px]">
              
              <!-- Left Side: Title + Sub-items + View All -->
              <div class="flex flex-col justify-between h-full pr-3 max-w-[65%]">
                <div>
                  <h3 class="text-xs lg:text-sm font-bold text-slate-700 tracking-wide uppercase mb-2">
                    ${card.title}
                  </h3>
                  <ul class="space-y-1 text-[11px] lg:text-xs text-slate-500">
                    ${card.items.map(item => `
                      <li class="truncate">${item}</li>
                    `).join('')}
                  </ul>
                </div>

                <a href="#" class="text-xs text-orange-500 hover:text-orange-600 font-medium mt-3 inline-block">
                  View All
                </a>
              </div>

              <!-- Right Side: Category Image -->
              <div class="w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 flex items-center justify-center self-center">
                <img 
                  src="${card.img}" 
                  alt="${card.title}" 
                  class="w-full h-full object-contain" 
                />
              </div>

            </div>
          `).join('')}
        </div>

        <!-- Bottom Action Button -->
        <a href="#" class="py-2.5 px-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:opacity-95 transition-opacity">
          EXPLORE THE MARKET &rarr;
        </a>

      </div>
    </section>
  `;
  };


  const serviceCategories = [
    { name: "Security Manpower", img: "./src/components/img/security.png" },
    { name: "Catering", img: "./src/components/img/catering.png" },
    { name: "Human Resource", img: "./src/components/img/hr.png" },
    { name: "Goods and Transport Service", img: "./src/components/img/transport.png" },
    { name: "Vehicle Hiring", img: "./src/components/img/vehicle.png" }
  ];

  const createServicesSection = () => `
  <section class="w-full bg-[#0b5cbe] pt-8 pb-16 px-4 sm:px-8 text-center">
    
    <!-- Title -->
    <h2 class="text-xl sm:text-2xl font-bold text-white mb-6">
      Popular Service Categories
    </h2>

    <!-- White Card Container (Expanded for Laptop View) -->
    <div class="bg-white rounded-xl shadow-lg p-6 lg:p-10 max-w-xl lg:max-w-6xl mx-auto flex flex-col items-center">
      
      <!-- Services List (Horizontal Row on Desktop) -->
      <div class="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-8 items-start">
        ${serviceCategories.map(service => `
          <div class="flex flex-col items-center justify-center cursor-pointer group px-2">
            <div class="w-12 h-12 lg:w-16 lg:h-16 mb-3 flex items-center justify-center">
              <img 
                src="${service.img}" 
                alt="${service.name}" 
                class="w-full h-full object-contain group-hover:scale-105 transition-transform" 
              />
            </div>
            <span class="text-xs sm:text-sm font-semibold text-slate-800 text-center leading-tight">
              ${service.name}
            </span>
          </div>
        `).join('')}
      </div>

      <!-- Orange Gradient Action Button -->
      <a href="#" class="py-2.5 px-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:opacity-95 transition-opacity inline-block">
        VIEW ALL SERVICES
      </a>

    </div>
  </section>
`;
  const stats = [
    { value: "10,676", label: "Product Categories" },
    { value: "2,028,454", label: "Order Value (Cr.)" },
    { value: "349", label: "Service Categories" }
  ];

  const gemFeatures = [
    {
      label: "Rich Listing of<br>Products / Services",
      img: "./src/components/img/feature1.png"
    },
    {
      label: "Integrated Payment<br>System",
      img: "./src/components/img/feature2.png"
    },
    {
      label: "Multiple Procurement<br>Modes - Direct<br>Purchase / Bid / RA",
      img: "./src/components/img/feature3.png"
    },
    {
      label: "Great Transparency<br>and Speed of<br>Procurement",
      img: "./src/components/img/feature4.png"
    }
  ];

  const createStatsSection = () => `
  <section class="bg-gradient-to-b from-[#ff512f] to-[#f09819] py-10 px-4 sm:px-8 text-center text-white w-full">
    
    <!-- Outer Heading -->
    <h2 class="text-2xl sm:text-3xl font-medium mb-6">
      Why you should choose GeM
    </h2>

    <!-- Inner Framed Border Container -->
    <div class="border border-white/40 rounded-lg p-6 max-w-md mx-auto flex flex-col gap-6">
      
      <!-- Stats Numbers with Dividers -->
      <div class="flex flex-col">
        ${stats.map((stat, index) => `
          <div class="py-4 ${index !== 0 ? 'border-t border-white/30' : ''}">
            <div class="text-3xl sm:text-4xl font-semibold mb-1">${stat.value}</div>
            <div class="text-sm font-normal text-white/90">${stat.label}</div>
          </div>
        `).join('')}
      </div>

      <!-- Feature List with Icons -->
      <div class="flex flex-col gap-8 pt-4 border-t border-white/30">
        ${gemFeatures.map(feature => `
          <div class="flex flex-col items-center justify-center">
            <div class="w-12 h-12 mb-2 flex items-center justify-center">
              <img src="${feature.img}" alt="Feature Icon" class="w-full h-full object-contain filter brightness-0 invert" />
            </div>
            <span class="text-xs sm:text-sm text-center text-white/90 leading-snug">
              ${feature.label}
            </span>
          </div>
        `).join('')}
      </div>

    </div>
  </section>
`;

  const testimonials = [
    {
      quote: "जेम पोर्टल पर प्रोक्योरमेंट करने से हमें अच्छी क्वालिटी के उत्पाद सही समय पर और उचित दाम पर उपलब्ध हुए है जिससे हम अपने बजट में बचाव संभव हो पाई।",
      author: "श्री विजय जोगदंड",
      title: "अधिशासी अभियन्ता (सिविल) एक सीमा सड़क संगठन के सड़क निर्माण कंपनी के कमान्डिंग अधिकारी जैसलमेर, राजस्थान",
      img: "./src/components/img/user1.png"
    },
    {
      quote: "GeM has made public procurement completely transparent and efficient for our division.",
      author: "Shri Rajesh Kumar",
      title: "Executive Engineer, CPWD",
      img: "./src/components/img/user2.png"
    }
  ];
  const initTestimonialCarousel = () => {
    const track = document.getElementById('testimonial-track');
    const card = document.getElementById('testimonial-card');
    const dotsContainer = document.getElementById('testimonial-dots');

    if (!track || !card || !dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('.dot-btn');
    let currentIndex = 0;
    let intervalId = null;
    const totalSlides = testimonials.length;

    const goToSlide = (index) => {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('bg-orange-500', 'scale-110');
          dot.classList.remove('bg-transparent');
        } else {
          dot.classList.remove('bg-orange-500', 'scale-110');
          dot.classList.add('bg-transparent');
        }
      });
    };

    const startAutoSlide = () => {
      if (!intervalId) {
        intervalId = setInterval(() => {
          const nextIndex = (currentIndex + 1) % totalSlides;
          goToSlide(nextIndex);
        }, 5000);
      }
    };

    const stopAutoSlide = () => {
      clearInterval(intervalId);
      intervalId = null;
    };

    // Click handler for dots
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.dot-btn');
      if (!dot) return;

      const targetIndex = parseInt(dot.getAttribute('data-index'));
      goToSlide(targetIndex);

      stopAutoSlide();
      startAutoSlide();
    });

    // Pause on hover/touch
    card.addEventListener('mouseenter', stopAutoSlide);
    card.addEventListener('mouseleave', startAutoSlide);
    card.addEventListener('touchstart', stopAutoSlide, { passive: true });
    card.addEventListener('touchend', startAutoSlide);

    startAutoSlide();
  };

  // 3. HTML Component Generator with Auto-Init Script
  const createTestimonialsSection = () => {
    // Auto-run carousel logic right after DOM updates
    setTimeout(initTestimonialCarousel, 50);

    return `
    <section class="relative -mt-16 z-10 px-4 sm:px-8 max-w-xl mx-auto mb-10">
      <!-- Main Card Container -->
      <div id="testimonial-card" class="bg-white rounded-xl shadow-xl p-6 sm:p-8 text-center border border-slate-100 overflow-hidden">
        
        <h2 class="text-xl sm:text-2xl font-semibold text-slate-800 mb-6">
          Customers Speak
        </h2>

        <!-- Sliding Track Container -->
        <div class="relative overflow-hidden w-full">
          <div id="testimonial-track" class="flex transition-transform duration-500 ease-in-out w-full">
            ${testimonials.map(item => `
              <div class="w-full flex-shrink-0 flex flex-col items-center justify-center px-2">
                <p class="text-sm sm:text-base text-slate-700 font-medium leading-relaxed mb-6 max-w-md">
                  “${item.quote}”
                </p>
                
                <div class="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-slate-200">
                  <img src="${item.img}" alt="${item.author}" class="w-full h-full object-cover" />
                </div>

                <h4 class="font-bold text-base text-slate-900 mb-1">${item.author}</h4>
                <p class="text-xs text-slate-500 max-w-xs leading-tight mb-4">${item.title}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Pagination Dots -->
        <div id="testimonial-dots" class="flex justify-center items-center gap-2 mt-4">
          ${testimonials.map((_, i) => `
            <button data-index="${i}" class="dot-btn w-3 h-3 rounded-full border border-orange-400 ${i === 0 ? 'bg-orange-500 scale-110' : 'bg-transparent'} transition-all cursor-pointer"></button>
          `).join('')}
        </div>

      </div>
    </section>
  `;
  };


  // 1. Initiatives Component (Internal Mobile-Style Preserved)
  // Data for Initiatives Section
  const initiatives = {
    mainBanner: "./src/components/img/init_main.jpeg",
    subBanners: [
      "./src/components/img/init_sub1.jpeg",
      "./src/components/img/init_sub2.jpeg"
    ]
  };

  // 1. Initiatives Component
  const createInitiativesSection = () => `
  <div class="flex flex-col text-left h-full">
    <!-- Section Title -->
    <h2 class="text-xl sm:text-2xl font-normal text-slate-700 mb-4 px-1">
      Initiatives
    </h2>

    <!-- Main Card Container -->
    <div class="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between flex-1">
      
      <!-- Top Main Banner Box -->
      <div class="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden cursor-pointer group mb-4">
        <img 
          src="${initiatives.mainBanner}" 
          alt="Main Initiative Banner" 
          class="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform" 
        />
      </div>

      <!-- Bottom 2 Side-by-Side Banners -->
      <div class="grid grid-cols-2 gap-4">
        ${initiatives.subBanners.map((imgSrc, idx) => `
          <div class="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden cursor-pointer group flex items-center justify-center">
            <img 
              src="${imgSrc}" 
              alt="Initiative ${idx + 1}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform" 
            />
          </div>
        `).join('')}
      </div>

    </div>

    <!-- Action Button -->
    <div class="flex justify-center mt-6">
      <a 
        href="#" 
        class="w-full max-w-xs py-3 px-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider text-center shadow-md hover:opacity-95 transition-opacity"
      >
        VIEW ALL INITIATIVES
      </a>
    </div>
  </div>
`;

  // 2. GeM Connect Component
  const createGemConnectSection = () => `
  <div class="flex flex-col text-left h-full">
    <!-- Section Title -->
    <h2 class="text-xl sm:text-2xl font-normal text-slate-700 mb-4 px-1">
      GeM Connect
    </h2>

    <!-- Main Card Container -->
    <div class="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between flex-1">
      
      <div>
        <!-- Social Media Tabs -->
        <div class="flex items-center gap-6 border-b border-slate-200 pb-2 mb-4">
          <button class="relative pb-2 flex items-center justify-center cursor-pointer">
            <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-300">
              <span class="font-bold text-slate-800 text-sm">𝕏</span>
            </div>
            <span class="absolute bottom-0 left-0 w-full h-[3px] bg-red-600 rounded-full"></span>
          </button>

          <button class="relative pb-2 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
            <div class="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center text-white font-bold text-sm">
              f
            </div>
          </button>
        </div>

        <!-- Social Feed Card -->
        <div class="border border-slate-200 rounded-xl p-4 bg-white flex flex-col gap-3">
          
          <!-- Post Header -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                <img src="./src/components/img/gem_logo.png" alt="GeM Logo" class="w-full h-full object-contain" />
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-1">
                  <span class="font-bold text-sm text-slate-900">GeM</span>
                  <svg class="w-4 h-4 text-sky-500 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <span class="text-xs text-slate-500">@GeM_India · <a href="#" class="text-sky-600 hover:underline">Follow</a></span>
              </div>
            </div>
            <span class="text-base font-bold text-slate-800">𝕏</span>
          </div>

          <!-- Post Body -->
          <div class="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
            <p>जेम के साप्ताहिक <a href="#" class="text-sky-600 hover:underline">#TrainingCalendar</a> से लाभ उठाएं!</p>
            <p>
              चाहे आप Buyer हों या Seller, GeM पर आपकी ज़रूरतों को ध्यान में रखते हुए Free Online Training Sessions उपलब्ध हैं। Experts के सेशन से जुड़ें और जानें कि GeM का smart और effective उपयोग कैसे करें। पूरा Schedule देखने और WebEx link 
              <a href="#" class="text-sky-600 hover:underline font-semibold">Show more</a>
            </p>
          </div>

          <!-- Embedded Card -->
          <div class="relative mt-2 border border-slate-200 rounded-lg overflow-hidden bg-slate-50 p-3">
            <img src="./src/components/img/embbed_card.png" alt="Training Announcement" class="w-full h-auto object-cover rounded-md" />
            <a href="#" class="absolute bottom-3 right-3 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1 hover:bg-black transition-colors shadow-md">
              Watch on 𝕏
            </a>
          </div>

        </div>
      </div>

    </div>

    <!-- Action Button -->
    <div class="flex justify-center mt-6">
      <a 
        href="#" 
        class="w-full max-w-xs py-3 px-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider text-center shadow-md hover:opacity-95 transition-opacity"
      >
        VIEW ALL NOTIFICATIONS
      </a>
    </div>
  </div>
`;

  // 3. Main Outer Layout Wrapper
  const createMainMiddleSection = () => `
  <section class="py-8 px-4 sm:px-8 max-w-7xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
      ${createInitiativesSection()}
      ${createGemConnectSection()}
    </div>
  </section>
`;
  // Render function (Notice section call removed)
  const renderHomePage = () => {
    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
      ${createOutletStoresSection()}
      ${createProductsSection()}
      ${createServicesSection()}
      ${createStatsSection()}
      ${createTestimonialsSection()}
       ${createInitiativesSection()}
      ${createGemConnectSection()}
    `;

    // Start updating static HTML banner automatically from JavaScript data
    startNoticeRotator();
  };

  renderHomePage();
});