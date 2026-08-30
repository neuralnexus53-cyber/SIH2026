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
  { img: "./src/components/img/gemout1.jpeg" },
  { img: "./src/components/img/gemout2.jpeg" },
  { img: "./src/components/img/gemout3.jpeg" },
  { img: "./src/components/img/zemout4.jpeg" },
  { img: "./src/components/img/zemout5.jpeg" },
  { img: "./src/components/img/zemout6.jpeg" },
  { img: "./src/components/img/zemout7.jpeg" },
  { img: "./src/components/img/zemout8.jpeg" }
];

const createOutletStoresSection = () => {
  return `
    <section class=" bg-slate-300 border-b  px-4 sm:px-8 py-6">
     

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-white rounded-xl border border-slate-700">
      
       <div class="max-w-7xl mx-auto flex flex-direction-row items-center justify-between gap-4 mb-4 sm:mb-6">
       <h1 class="text-lg sm:text-3xl font-bold text-violet-950">
         #VOCALforlocal
       </h1>
        <h2 class="text-lg sm:text-xl font-bold text-violet-950">
          GeM Outlet Stores
        </h2>
      </div>
        ${stores.map(store => `
          <div class="h-28 bg-slate-800 border border-slate-700 hover:border-amber-500 rounded-lg transition-all cursor-pointer overflow-hidden group relative">
            <img src="${store.img}" alt="Store Outlet" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
        `).join('')}
      </div>
    </section>
  `;
};
const createProductsSection = () => {
  const products = [
    { name: "Desktops & Laptops", img: "./src/components/img/product1.jpeg" },
    { name: "Office Furniture", img: "./src/components/img/product2.jpeg" },
    { name: "Medical Equipment", img: "./src/components/img/product3.jpeg" },
    { name: "Automobiles", img: "./src/components/img/product4.jpeg" },
    { name: "Paper & Stationery", img: "./src/components/img/product5.jpeg" },
    { name: "Solar Energy", img: "./src/components/img/product6.jpeg" }
  ];

  return `
    <section class="px-4 sm:px-8 max-w-7xl mx-auto  pb-6 bg-slate-300">
      <!-- Outer White Container containing both Header & Grid -->
      <div class="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
        
        <!-- Header inside the main container -->
        <h2 class="text-lg sm:text-xl font-bold text-slate-900 mb-4">
          Popular Product Categories
        </h2>

        <!-- 3 Rows x 2 Columns Grid -->
        <div class="grid grid-cols-2 gap-3 sm:gap-4">
          ${products.map(item => `
            <div class="h-32 sm:h-36 bg-slate-100 border border-slate-200 hover:border-amber-500 rounded-lg transition-all cursor-pointer overflow-hidden group relative">
              <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-4 sm:mt-6 text-white bg-orange-500 rounded-3xl p-2 sm:p-3 hover:bg-orange-600 transition-colors cursor-pointer">
         <a href="#" class="text-sm sm:text-base font-semibold">EXPLORE THE MARKET &rarr;</a>
        </div>

      </div>
    </section>
  `;
};

const serviceCategories = [
  { name: "Security Manpower", img: "./src/components/img/service1.jpeg" },
  { name: "Catering", img: "./src/components/img/service2.jpeg" },
  { name: "Human Resource", img: "./src/components/img/service3.jpeg" },
  { name: "Goods and Transport Service", img: "./src/components/img/service4.jpeg" }
];

const createServicesSection = () => `
 <section class="bg-gradient-to-b from-[#0b5cbe] from-70% to-transparent to-30% px-4 sm:px-8 max-w-7xl mx-auto py-4 text-center w-full">
    
    <!-- Title -->
    <h2 class="text-xl sm:text-2xl font-bold text-white mb-6">
      Popular Service Categories
    </h2>

    <!-- White Card Container -->
    <div class="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto flex flex-col items-center">
      
      <!-- Services List (Vertical Stack / Grid) -->
      <div class="w-full flex flex-col gap-6 mb-8">
        ${serviceCategories.map(service => `
          <div class="flex flex-col items-center justify-center cursor-pointer group">
            <div class="w-16 h-16 mb-2 flex items-center justify-center">
              <img src="${service.img}" alt="${service.name}" class="w-full h-full object-contain group-hover:scale-105 transition-transform" />
            </div>
            <span class="text-sm font-semibold text-slate-800 text-center leading-tight">
              ${service.name}
            </span>
          </div>
        `).join('')}
      </div>

      <!-- Orange Gradient Action Button -->
      <a href="#" class="w-full max-w-xs py-3 px-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold text-sm uppercase tracking-wider shadow-md hover:opacity-95 transition-opacity">
        View All Services
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
    `;
    
    // Start updating static HTML banner automatically from JavaScript data
    startNoticeRotator();
  };

  renderHomePage();
});