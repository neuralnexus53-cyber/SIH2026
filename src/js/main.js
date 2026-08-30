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

  const serviceCategories = [
    { name: "Security Manpower", desc: "Trained personnel for commercial & govt security." },
    { name: "Catering", desc: "Event & daily food services for organizations." },
    { name: "Human Resource", desc: "Outsourced staffing & workforce support." },
    { name: "Goods and Transport", desc: "Logistics and vehicle fleet services." }
  ];

  const stats = [
    { label: "Product Categories", value: "10,650+" },
    { label: "Order Value (Cr.)", value: "₹2,025,608" },
    { label: "Service Categories", value: "349+" }
  ];

  const testimonials = [
    {
      quote: "The procurement process has become faster & prices are very competitive due to participation of more number of bidders.",
      author: "Brig. Arvinder Singh, AVSM",
      title: "Chief Engineer, Project Himank Leh"
    },
    {
      quote: "It has been a very smooth association with GeM. I do hope they continue to offer us the same services in the future.",
      author: "Gurkirat Kirpal Singh",
      title: "IAS Secretary, Govt. of Punjab"
    }
  ];

  const createOutletStoresSection = () => {
    return `
      <section class="bg-slate-900/80 border-b border-slate-700  px-4 sm:px-8">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <h2 class="text-lg sm:text-xl font-bold text-white border-l-4 border-amber-500 pl-3">
            GeM Outlet Stores
          </h2>
        </div>
      </section>
      
    `;
  };

  const createProductsSection = () => {
    const products = [
      "Desktops & Laptops", "Office Furniture", "Medical Equipment", 
      "Automobiles", "Paper & Stationery", "Solar Energy"
    ];

    return `
      <section class="py-10 px-4 sm:px-8 max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl sm:text-2xl font-bold text-white border-l-4 border-amber-500 pl-3">
            Popular Product Categories
          </h2>
          <a href="#" class="text-xs font-semibold text-amber-400 hover:underline">Explore Market &rarr;</a>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-slate-900/80 rounded-xl border border-slate-700">
          ${products.map(item => `
            <div class="h-28 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center justify-center p-4 cursor-pointer transition-colors">
              <span class="text-sm font-semibold text-slate-200 text-center">${item}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  };

  const createServicesSection = () => `
    <section class="py-10 px-4 sm:px-8 max-w-7xl mx-auto">
      <h2 class="text-xl sm:text-2xl font-bold text-white border-l-4 border-amber-500 pl-3 mb-6">
        Popular Service Categories
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${serviceCategories.map(service => `
          <div class="bg-slate-800/90 border border-slate-700 rounded-xl p-6 hover:border-amber-500/40 transition-all">
            <h3 class="font-bold text-base text-white mb-2">${service.name}</h3>
            <p class="text-xs text-slate-400 mb-4">${service.desc}</p>
            <a href="#" class="text-xs text-amber-400 font-semibold hover:underline inline-flex items-center gap-1">
              View Services &rarr;
            </a>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  const createStatsSection = () => `
    <section class="bg-slate-900/60 border-y border-slate-800 py-12 px-4 sm:px-8 my-8">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        ${stats.map(stat => `
          <div class="p-4">
            <div class="text-3xl sm:text-4xl font-extrabold text-amber-400 mb-2">${stat.value}</div>
            <div class="text-sm font-medium text-slate-400 uppercase tracking-widest">${stat.label}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  const createTestimonialsSection = () => `
    <section class="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      <h2 class="text-xl sm:text-2xl font-bold text-white text-center mb-10">
        What Our Users Say
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${testimonials.map(item => `
          <div class="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 relative flex flex-col justify-between">
            <p class="text-sm text-slate-300 italic mb-6">"${item.quote}"</p>
            <div>
              <h4 class="font-bold text-sm text-white">${item.author}</h4>
              <p class="text-xs text-amber-400/90">${item.title}</p>
            </div>
          </div>
        `).join('')}
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
    `;
    
    // Start updating static HTML banner automatically from JavaScript data
    startNoticeRotator();
  };

  renderHomePage();
});