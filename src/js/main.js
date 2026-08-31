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
    if (dots.length === 0) {
      console.error("Hero Carousel Error: No dot indicators (.hero-dot) found!");
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

      // Update dot active styling
      dots.forEach((dot, idx) => {
        if (idx === activeDotIndex) {
          dot.classList.remove('bg-slate-900/40');
          dot.classList.add('bg-amber-500');
        } else {
          dot.classList.remove('bg-amber-500');
          dot.classList.add('bg-slate-900/40');
        }
      });
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

  // Render function (Notice section call removed)
  const renderHomePage = () => {
    const container = document.getElementById("main-content");
    if (!container) return;

    container.innerHTML = `
    
    `;

    // Start updating static HTML banner automatically from JavaScript data
    startNoticeRotator();
    
    // Initialize hero image carousel slider
    initHeroCarousel();
  };

  renderHomePage();
});