document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('gemSearchForm');
  const searchInput = document.getElementById('searchInput');
  const searchCategory = document.getElementById('searchCategory');
  const languageSelect = document.getElementById('languageSelect');

  // Handle Search Submission
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      const category = searchCategory.value;

      if (query) {
        alert(`Searching for "${query}" in category: ${category}`);
      }
    });
  }

  // Handle Language Selector Change
  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
      const selectedLang = e.target.value;
      console.log(`Language changed to: ${selectedLang}`);
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("main-content");
  if (!container) return;

  // ==========================================
  // 1. DATA CONFIGURATION (EDIT CONTENT HERE)
  // ==========================================

  // Banner Slides / Highlights
  const bannerAlerts = [
    {
      title: "GeM 10 Years of Trust",
      desc: "Bid/RA scheduled to end on 22nd Aug have been extended. GeM is linked with TReDS Exchanges for MSME financing.",
      tag: "Notice"
    }
  ];

  // Outlet Stores Grid

  // Popular Product Categories


  // Popular Service Categories
  const serviceCategories = [
    { name: "Security Manpower", desc: "Trained personnel for commercial & govt security." },
    { name: "Catering", desc: "Event & daily food services for organizations." },
    { name: "Human Resource", desc: "Outsourced staffing & workforce support." },
    { name: "Goods and Transport", desc: "Logistics and vehicle fleet services." }
  ];

  // Platform Metrics
  const stats = [
    { label: "Product Categories", value: "10,650+" },
    { label: "Order Value (Cr.)", value: "₹2,025,608" },
    { label: "Service Categories", value: "349+" }
  ];

  // Testimonials
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

  // ==========================================
  // 2. COMPONENT BUILDERS (UI GENERATORS)
  // ==========================================

  // Section Builder: Top Notice Banner
 // Sample data array
const bannerAlerts = [
  { tag: "Notice", desc: "GeM portal maintenance scheduled for this Sunday from 2 AM to 6 AM." },
  { tag: "Update", desc: "New seller registration guidelines have been updated for 2026." },
  { tag: "Alert", desc: "Please complete your profile verification before the end of the month." }
];

let currentAlertIndex = 0;

const createNoticeSection = () => `
  <section class="bg-blue-950/80 border-b border-blue-800 py-3 px-4 sm:px-8 overflow-hidden">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      
      <!-- Container -->
      <div class="relative w-full overflow-hidden flex items-center h-6">
        <div 
          id="marquee-content" 
          class="inline-flex items-center gap-3 whitespace-nowrap text-xs sm:text-sm transition-all duration-300 hover:[animation-play-state:paused]"
        >
          <span id="notice-tag" class="bg-amber-500 text-slate-900 font-bold text-xs px-2 py-0.5 rounded uppercase shrink-0">
            ${bannerAlerts[0].tag}
          </span>
          <span id="notice-desc" class="text-slate-200 shrink-0">
            ${bannerAlerts[0].desc}
          </span>
        </div>
      </div>

    </div>
  </section>
`;

// Dynamic Switcher Logic
const startNoticeRotator = (intervalMs = 8000) => {
  const tagEl = document.getElementById('notice-tag');
  const descEl = document.getElementById('notice-desc');
  const container = document.getElementById('marquee-content');

  if (!tagEl || !descEl || !container) return;

  setInterval(() => {
    // Fade out slightly during text swap
    container.classList.add('opacity-0');

    setTimeout(() => {
      currentAlertIndex = (currentAlertIndex + 1) % bannerAlerts.length;
      
      tagEl.textContent = bannerAlerts[currentAlertIndex].tag;
      descEl.textContent = bannerAlerts[currentAlertIndex].desc;
      
      container.classList.remove('opacity-0');
    }, 300);

  }, intervalMs);
};

  // Section Builder: GeM Outlet Stores
  const createOutletStoresSection = () => `
    <section class="py-10 px-4 sm:px-8 max-w-7xl mx-auto">
      <h2 class="text-xl sm:text-2xl font-bold tracking-tight mb-6 text-white border-l-4 border-amber-500 pl-3">
        GeM Outlet Stores-kishann
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-300/10 p-6 rounded-xl border border-slate-700/50 h-full">
      <div class="h-28 bg-white mb-4 border border-slate-700/60 rounded-lg p-4 text-center hover:bg-slate-800 text-black transition-colors cursor-pointer">
      <img src="" alt="GeM Logo" class="h-10 w-auto mx-auto" />
      </div>
      <div class="h-28 bg-white mb-4 text-black border border-slate-700/60 rounded-lg p-4 text-center hover:bg-slate-800 transition-colors cursor-pointer">
      here image will come 2

       </div>
        <div class="h-28 bg-white mb-4 text-black border border-slate-700/60 rounded-lg p-4 text-center hover:bg-slate-800 transition-colors cursor-pointer">
      here immage will come 3
      
       </div>
        <div class="h-28 bg-white mb-4 text-black border border-slate-700/60 rounded-lg p-4 text-center hover:bg-slate-800 transition-colors cursor-pointer">
      here immage will come 4
      
       </div>
        <div class="h-28 bg-white mb-4 text-black border border-slate-700/60 rounded-lg p-4 text-center hover:bg-slate-800 transition-colors cursor-pointer">
      here immage will come 5
      
       </div>
        <div class="h-28 bg-white mb-4 text-black border border-slate-700/60 rounded-lg p-4 text-center hover:bg-slate-800 transition-colors cursor-pointer">
      here immage will come 6
      
       </div>
        <div class="h-28 bg-white mb-4 text-black border border-slate-700/60 rounded-lg p-4 text-center hover:bg-slate-800 transition-colors cursor-pointer">
      here immage will come 7
      
       </div>
        <div class="h-28 bg-white mb-4 text-black border border-slate-700/60 rounded-lg p-4 text-center hover:bg-slate-800 transition-colors cursor-pointer">
      here immage will come 8
      
       </div>

     
      </div>
      
   
      
    </section>
  `;

  // Section Builder: Product Categories
  const createProductsSection = () => `
    <section class="py-10 px-4 sm:px-8 max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl sm:text-2xl font-bold text-white border-l-4 border-amber-500 pl-3">
          Popular Product Categories
        </h2>
        <a href="#" class="text-xs font-semibold text-amber-400 hover:underline">Explore Market &rarr;</a>
      </div>
     
    <div class="grid grid-cols-2 grid-rows-3 gap-4 p-4 bg-gray-500 rounded-xl">
  <div class="h-28 max-w-full bg-black rounded-lg"></div>
  <div class="h-28 max-w-full bg-black rounded-lg"></div>
  <div class="h-28 max-w-full bg-black rounded-lg"></div>
  <div class="h-28 max-w-full bg-black rounded-lg"></div>
  <div class="h-28 max-w-full bg-black rounded-lg"></div>
  <div class="h-28 max-w-full bg-black rounded-lg"></div>
</div>
      
      
       
    </section>
  `;

  // Section Builder: Service Categories
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

  // Section Builder: Platform Stats
  const createStatsSection = () => `
    <section class="bg-slate-950/60 border-y border-slate-800 py-12 px-4 sm:px-8 my-8">
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

  // Section Builder: Testimonials
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

  // ==========================================
  // 3. MAIN RENDER FUNCTION
  // ==========================================
  const renderHomePage = () => {
    container.innerHTML = `
      ${createNoticeSection()}
      ${createOutletStoresSection()}
      ${createProductsSection()}
      ${createServicesSection()}
      ${createStatsSection()}
      ${createTestimonialsSection()}
    `;
  };

  // Run Render
  renderHomePage();
});