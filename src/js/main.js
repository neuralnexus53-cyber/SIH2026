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

  // Amazon Hero Carousel Controller
  const initHeroCarousel = () => {
    console.log("Initializing Infinite Hero Carousel...");
    const slidesContainer = document.getElementById('hero-slides');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const dots = document.querySelectorAll('.hero-dot');
    
    if (!slidesContainer) {
      console.error("Hero Carousel Error: #hero-slides element not found!");
      return;
    }
    if (!prevBtn || !nextBtn) {
      console.error("Hero Carousel Error: Navigation buttons not found!");
      return;
    }

    const originalSlides = Array.from(slidesContainer.children);
    const totalOriginalSlides = originalSlides.length;

    // 1. Create clones for infinite circular loop
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[totalOriginalSlides - 1].cloneNode(true);

    // 2. Append first slide clone to end, prepend last slide clone to start
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, originalSlides[0]);

    // Initial state: start at index 1 (which is the original first slide)
    let currentIndex = 1;
    let isTransitioning = false;
    let autoSlideInterval;

    // Position container initially on the first slide without transition
    slidesContainer.style.transition = 'none';
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    const updateCarousel = (targetIndex, animate = true) => {
      if (isTransitioning && animate) return; // Prevent overlap during transitions
      
      isTransitioning = animate;
      currentIndex = targetIndex;

      if (animate) {
        slidesContainer.style.transition = 'transform 500ms ease-in-out';
      } else {
        slidesContainer.style.transition = 'none';
      }

      // Move slides container
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Calculate which indicator dot corresponds to current slide
      let activeDotIndex = currentIndex - 1;
      if (currentIndex === 0) {
        activeDotIndex = totalOriginalSlides - 1;
      } else if (currentIndex === totalOriginalSlides + 1) {
        activeDotIndex = 0;
      }

      // Update dot active styling if dots are present
      if (dots && dots.length > 0) {
        dots.forEach((dot, idx) => {
          if (idx === activeDotIndex) {
            dot.classList.remove('bg-slate-900/40');
            dot.classList.add('bg-amber-500');
          } else {
            dot.classList.remove('bg-amber-500');
            dot.classList.add('bg-slate-900/40');
          }
        });
      }
    };

    // Transition end listener resets positioning seamlessly on clone boundaries
    slidesContainer.addEventListener('transitionend', () => {
      isTransitioning = false;
      
      // If we slid forward past the last original slide onto Slide 1 Clone
      if (currentIndex === totalOriginalSlides + 1) {
        updateCarousel(1, false); // Instant jump back to original Slide 1
      }
      // If we slid backward past the first original slide onto Last Slide Clone
      else if (currentIndex === 0) {
        updateCarousel(totalOriginalSlides, false); // Instant jump back to original Last Slide
      }
    });

    const startAutoSlide = () => {
      stopAutoSlide();
      autoSlideInterval = setInterval(() => {
        if (!isTransitioning) {
          updateCarousel(currentIndex + 1);
        }
      }, 4000); // Slide every 4 seconds
    };

    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    };

    // Event listeners
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isTransitioning) return;
      console.log("Prev clicked, index was:", currentIndex);
      updateCarousel(currentIndex - 1);
      startAutoSlide(); // Reset timer
    });

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isTransitioning) return;
      console.log("Next clicked, index was:", currentIndex);
      updateCarousel(currentIndex + 1);
      startAutoSlide(); // Reset timer
    });

    if (dots && dots.length > 0) {
      dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          if (isTransitioning) return;
          const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
          console.log(`Dot clicked for original index: ${slideIndex}`);
          updateCarousel(slideIndex + 1); // Map to DOM index offset by 1
          startAutoSlide();
        });
      });
    }

    // Pause auto-sliding on hover
    const carouselSection = slidesContainer.parentElement;
    if (carouselSection) {
      carouselSection.addEventListener('mouseenter', () => {
        console.log("Mouse entered - pausing auto-slide");
        stopAutoSlide();
      });
      carouselSection.addEventListener('mouseleave', () => {
        console.log("Mouse left - resuming auto-slide");
        startAutoSlide();
      });
    }

    // Start auto slide
    startAutoSlide();
    console.log("Infinite Hero Carousel initialized successfully.");
  };

  // Statistics Section Toggle Logic
  const initStatsToggle = () => {
    console.log("Initializing Statistics Toggle Logic...");
    const toggleBtn = document.getElementById('toggle-stats-btn');
    const statsDashboard = document.getElementById('stats-dashboard');
    if (!toggleBtn || !statsDashboard) {
      console.warn("Statistics elements not found in the DOM.");
      return;
    }

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (statsDashboard.classList.contains('hidden')) {
        console.log("Showing statistics dashboard");
        statsDashboard.classList.remove('hidden');
        // Force reflow
        statsDashboard.offsetHeight;
        statsDashboard.classList.remove('opacity-0', '-translate-y-4');
        statsDashboard.classList.add('opacity-100', 'translate-y-0');
        toggleBtn.textContent = 'Hide Live Portal Statistics';
      } else {
        console.log("Hiding statistics dashboard");
        statsDashboard.classList.add('opacity-0', '-translate-y-4');
        statsDashboard.classList.remove('opacity-100', 'translate-y-0');
        toggleBtn.textContent = 'View Live Portal Statistics';
        
        // Hide after transition ends
        const handleTransitionEnd = () => {
          statsDashboard.classList.add('hidden');
          statsDashboard.removeEventListener('transitionend', handleTransitionEnd);
        };
        statsDashboard.addEventListener('transitionend', handleTransitionEnd);
      }
    });
  };

  // Waterfall Hamburger Menu Toggle Logic
  const initHamburgerDrawer = () => {
    console.log("Initializing Hamburger Drawer Logic...");
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-drawer-btn');
    const drawer = document.getElementById('hamburger-drawer');
    
    if (!hamburgerBtn || !closeBtn || !drawer) {
      console.warn("Hamburger drawer elements not found!");
      return;
    }

    hamburgerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      drawer.classList.remove('-translate-y-full');
      drawer.classList.add('translate-y-0');
    });

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      drawer.classList.remove('translate-y-0');
      drawer.classList.add('-translate-y-full');
    });

    // Close on clicking any link inside the drawer
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('translate-y-0');
        drawer.classList.add('-translate-y-full');
      });
    });
  };

  // Auth State & LocalStorage Helpers
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

  // HTML Backup variable to allow seamless restoration of home page sections
  let homePageBackupHTML = "";

  // View Renders
  const renderHomeView = () => {
    // Show global header and hero section
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.remove("hidden");

    const container = document.getElementById("main-content");
    if (!container) return;
    
    if (homePageBackupHTML) {
      container.innerHTML = homePageBackupHTML;
    }
    
    // Re-initialize slider and toggles as the DOM nodes were recreated
    initStatsToggle();
    initHeroCarousel();
  };

  const renderRegisterView = () => {
    // Hide global header and hero section
    document.getElementById("global-header-container")?.classList.add("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");

    const container = document.getElementById("main-content");
    if (!container) return;

    // Scroll to view top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    container.innerHTML = `
      <!-- Minimal Header Bar -->
      <header class="bg-slate-900 text-white w-full py-4 px-6 mb-8 flex items-center justify-between shadow-md">
        <a href="#" class="flex items-center nav-link-home">
          <img src="/src/components/img/logoclone1.png" alt="GeM Logo" class="h-8 w-auto object-contain" />
        </a>
        <div class="flex items-center gap-4 text-xs font-bold text-slate-300">
          <a href="#" class="hover:text-amber-400 transition nav-link-login">Back to Login</a>
          <span class="text-slate-600">|</span>
          <a href="#" class="hover:text-amber-400 transition nav-link-home">Back to Home</a>
        </div>
      </header>

      <section class="max-w-md mx-auto my-12 px-6 py-8 bg-white border border-slate-200 rounded-2xl shadow-lg text-slate-800">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">Create your GeM Account</h2>
        <form id="register-form" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Username</label>
            <input type="text" id="reg-username" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 transition-colors" placeholder="e.g. sarthak123" />
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Gmail Address</label>
            <input type="email" id="reg-email" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 transition-colors" placeholder="yourname@gmail.com" />
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Password</label>
            <input type="password" id="reg-password" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 transition-colors" placeholder="Min 6 characters" />
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Confirm Password</label>
            <input type="password" id="reg-confirm" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 transition-colors" placeholder="Repeat password" />
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
            Already have an account? <a href="#" class="text-amber-600 hover:underline font-bold nav-link-login">Sign In</a>
          </p>
        </form>
      </section>
    `;

    // Form logic
    const regForm = document.getElementById("register-form");
    regForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("reg-username").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const password = document.getElementById("reg-password").value;
      const confirm = document.getElementById("reg-confirm").value;

      if (!email.endsWith("@gmail.com")) {
        alert("Please enter a valid Gmail address (ending in @gmail.com)!");
        return;
      }
      if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
      }
      if (password !== confirm) {
        alert("Passwords do not match!");
        return;
      }

      const users = getRegisteredUsers();
      if (users.some(u => u.email === email)) {
        alert("This Gmail address is already registered!");
        return;
      }

      registerUser(username, email, password);
      alert("Registration successful! Redirecting you to login...");
      renderLoginView();
    });

    // Google Sign up simulator
    document.getElementById("reg-google-btn").addEventListener("click", () => {
      const gUser = { username: "Google User", email: "user@gmail.com", loginType: "Google Login" };
      localStorage.setItem("gem_current_user", JSON.stringify(gUser));
      alert("Google Registration & Login Successful!");
      renderDashboardView();
    });
  };

  const renderLoginView = () => {
    // Hide global header and hero section
    document.getElementById("global-header-container")?.classList.add("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");

    const container = document.getElementById("main-content");
    if (!container) return;

    // Scroll to view top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    container.innerHTML = `
      <!-- Minimal Header Bar -->
      <header class="bg-slate-900 text-white w-full py-4 px-6 mb-8 flex items-center justify-between shadow-md">
        <a href="#" class="flex items-center nav-link-home">
          <img src="/src/components/img/logoclone1.png" alt="GeM Logo" class="h-8 w-auto object-contain" />
        </a>
        <div class="flex items-center gap-4 text-xs font-bold text-slate-300">
          <a href="#" class="hover:text-amber-400 transition nav-link-home">Back to Home</a>
        </div>
      </header>

      <section class="max-w-md mx-auto my-12 px-6 py-8 bg-white border border-slate-200 rounded-2xl shadow-lg text-slate-800">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">Sign In to GeM</h2>
        <form id="login-form" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Gmail Address</label>
            <input type="email" id="log-email" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 transition-colors" placeholder="yourname@gmail.com" />
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Password</label>
            <input type="password" id="log-password" required class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 transition-colors" placeholder="Enter password" />
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
            New to GeM? <a href="#" class="text-amber-600 hover:underline font-bold nav-link-register">Register Now</a>
          </p>
        </form>
      </section>
    `;

    // Form logic
    const logForm = document.getElementById("login-form");
    logForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("log-email").value.trim();
      const password = document.getElementById("log-password").value;

      const user = authenticateUser(email, password);
      if (!user) {
        alert("Invalid email or password!");
        return;
      }

      localStorage.setItem("gem_current_user", JSON.stringify({
        username: user.username,
        email: user.email,
        loginType: "Normal Login"
      }));
      alert(`Welcome back, ${user.username}!`);
      renderDashboardView();
    });

    // Google Login simulator
    document.getElementById("log-google-btn").addEventListener("click", () => {
      const gUser = { username: "Google User", email: "user@gmail.com", loginType: "Google Login" };
      localStorage.setItem("gem_current_user", JSON.stringify(gUser));
      alert("Google Login Successful!");
      renderDashboardView();
    });
  };

  const renderDashboardView = () => {
    // Show global header but hide carousel
    document.getElementById("global-header-container")?.classList.remove("hidden");
    document.getElementById("global-hero-container")?.classList.add("hidden");

    const container = document.getElementById("main-content");
    if (!container) return;

    // Scroll to view top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const userRaw = localStorage.getItem("gem_current_user");
    const user = userRaw ? JSON.parse(userRaw) : { username: "Guest User", loginType: "Normal Login", email: "guest@gmail.com" };

    container.innerHTML = `
      <section class="max-w-5xl mx-auto my-12 px-6 py-8 bg-white border border-slate-200 rounded-2xl shadow-lg text-slate-800">
        <div class="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
          <div class="text-center sm:text-left">
            <span class="text-xs uppercase font-extrabold tracking-widest text-amber-500 block mb-1">GeM 2.0 Account Panel</span>
            <h2 class="text-2xl font-bold text-slate-900">Welcome, ${user.username}!</h2>
          </div>
          <button id="logout-btn" class="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition cursor-pointer border-none shadow">
            Sign Out
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <span class="text-slate-400 text-[10px] uppercase font-bold block mb-1">Authenticated Account</span>
            <span class="text-slate-900 text-sm font-semibold block mt-1 break-all">${user.email}</span>
          </div>
          <div class="p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <span class="text-slate-400 text-[10px] uppercase font-bold block mb-1">Sign-In Method</span>
            <span class="text-amber-600 text-sm font-bold block mt-1">${user.loginType}</span>
          </div>
          <div class="p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <span class="text-slate-400 text-[10px] uppercase font-bold block mb-1">System Privilege</span>
            <span class="text-slate-900 text-sm font-bold block mt-1">Verified Seller / Buyer</span>
          </div>
        </div>

        <!-- Dashboard Widgets Mock -->
        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h3 class="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Quick Control Center</h3>
          <p class="text-xs text-slate-500 leading-relaxed mb-6">
            Access secure transactional data, check bid progress, upload e-catalogs, and review invoices directly from this panel. All configurations are initialized for ${user.loginType}.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <a href="#" class="p-4 bg-white border border-slate-200 hover:border-amber-500 rounded-lg text-center font-bold text-xs uppercase tracking-wider text-slate-700 hover:text-amber-600 transition shadow-sm">
              Manage Bids / RA
            </a>
            <a href="#" class="p-4 bg-white border border-slate-200 hover:border-amber-500 rounded-lg text-center font-bold text-xs uppercase tracking-wider text-slate-700 hover:text-amber-600 transition shadow-sm">
              Upload Catalog
            </a>
            <a href="#" class="p-4 bg-white border border-slate-200 hover:border-amber-500 rounded-lg text-center font-bold text-xs uppercase tracking-wider text-slate-700 hover:text-amber-600 transition shadow-sm">
              Orders History
            </a>
          </div>
        </div>
      </section>
    `;

    document.getElementById("logout-btn").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("gem_current_user");
      alert("You have successfully signed out.");
      renderHomeView();
    });
  };

  // Dynamic Routing delegation
  const initRouter = () => {
    document.addEventListener("click", (e) => {
      const target = e.target;
      
      const loginLink = target.closest(".nav-link-login");
      if (loginLink) {
        e.preventDefault();
        if (localStorage.getItem("gem_current_user")) {
          renderDashboardView();
        } else {
          renderLoginView();
        }
        return;
      }

      const registerLink = target.closest(".nav-link-register");
      if (registerLink) {
        e.preventDefault();
        if (localStorage.getItem("gem_current_user")) {
          renderDashboardView();
        } else {
          renderRegisterView();
        }
        return;
      }

      const homeLink = target.closest(".nav-link-home");
      if (homeLink) {
        e.preventDefault();
        renderHomeView();
        return;
      }
    });
  };

  // Render function (Notice section call removed)
  const renderHomePage = () => {
    // Back up static HTML layout on first load to allow dynamic view swapping
    const container = document.getElementById("main-content");
    if (container && !homePageBackupHTML) {
      homePageBackupHTML = container.innerHTML;
    }

    // Start updating static HTML banner automatically from JavaScript data
    startNoticeRotator();
    
    // Initialize hero image carousel slider
    initHeroCarousel();

    // Initialize statistics drawer toggle logic
    initStatsToggle();

    // Initialize waterfall navigation hamburger drawer
    initHamburgerDrawer();

    // Initialize SPA route delegation listeners
    initRouter();
  };

  renderHomePage();
});