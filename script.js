/* Javascript Controller for Mango's Suite Boutique Hotel */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. Lenis Smooth Scroll Configuration (Safe Guarded) - Disabled for Native CSS Scroll Snapping
  // ==========================================================================
  let lenisInstance = null;

  /*
  if (typeof Lenis !== "undefined") {
    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom cubic easing
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      if (lenisInstance) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger if GSAP exists
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      lenisInstance.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        if (lenisInstance) lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  } else {
    console.warn("Lenis library not loaded. Falling back to native scrolling.");
  }
  */

  // ==========================================================================


  // ==========================================================================
  // 3. Typewriter Effect
  // ==========================================================================
  const words = [
    "Mango's Suite.",
    "su refugio de privacidad.",
    "un oasis de elegancia.",
    "el descanso boutique premium.",
  ];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById("typewriter-text");
  let typingSpeed = 100;

  const type = () => {
    if (!typewriterElement) return;

    const currentWord = words[wordIdx];

    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50; // Deletes faster
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 100; // Normal typing speed
    }

    // Word completed, wait, then start deleting
    if (!isDeleting && charIdx === currentWord.length) {
      typingSpeed = 2200; // Pause at the end of word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length; // Rotate word
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  };

  setTimeout(type, 1000); // Initial delay

  // ==========================================================================
  // 4. Navbar Interactions (Underline Slide, Header Scrolled, Section Tracker)
  // ==========================================================================
  const mainHeader = document.getElementById("main-header");
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const underline = document.getElementById("nav-underline");

  // Underline slide position updater
  const positionUnderline = (element) => {
    if (!underline || !navbar) return;
    const rect = element.getBoundingClientRect();
    const navRect = navbar.getBoundingClientRect();
    underline.style.width = `${rect.width}px`;
    underline.style.left = `${rect.left - navRect.left}px`;
  };

  const resetUnderline = () => {
    if (!underline) return;
    const activeLink = document.querySelector(".nav-link.active");
    if (activeLink) {
      positionUnderline(activeLink);
      underline.style.opacity = "1";
    } else {
      underline.style.width = "0px";
      underline.style.opacity = "0";
    }
  };

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", (e) => {
      positionUnderline(e.target);
      underline.style.opacity = "1";
    });
    link.addEventListener("mouseleave", () => {
      resetUnderline();
    });
    link.addEventListener("click", (e) => {
      navLinks.forEach((l) => l.classList.remove("active"));
      e.currentTarget.classList.add("active");
      // If mobile menu open, close it
      closeMobileMenu();
    });
  });

  // Check Header Scroll position to toggle transparency/blur
  const handleScroll = () => {
    const hero = document.getElementById("hero");
    const threshold = hero ? (hero.offsetHeight - 80) : 50;
    if (window.scrollY > threshold) {
      mainHeader.classList.add("scrolled");
    } else {
      mainHeader.classList.remove("scrolled");
    }
    updateActiveSectionOnScroll();
  };

  // Track active section on scroll to update Navbar state
  const sections = document.querySelectorAll("section");
  const updateActiveSectionOnScroll = () => {
    let currentSectionId = "hero";
    const scrollPosition = window.scrollY + 250; // Offset

    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top + window.scrollY;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });

    resetUnderline();
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", resetUnderline);
  setTimeout(resetUnderline, 500); // Initial positioning after font/layout stabilizes

  // ==========================================================================
  // 5. Mobile Drawer Navigation Menu
  // ==========================================================================
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");
  const drawerOverlay = document.getElementById("mobile-drawer-overlay");
  const drawerLinks = document.querySelectorAll(".drawer-link");

  const openMobileMenu = () => {
    mobileMenuBtn.classList.add("open");
    mobileDrawer.classList.add("open");
    drawerOverlay.classList.add("open");
    if (lenisInstance) lenisInstance.stop(); // Stop scroll when drawer is open
  };

  const closeMobileMenu = () => {
    mobileMenuBtn.classList.remove("open");
    mobileDrawer.classList.remove("open");
    drawerOverlay.classList.remove("open");
    if (lenisInstance) lenisInstance.start(); // Resume scroll
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openMobileMenu);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeMobileMenu);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeMobileMenu);

  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Allow default navigation, close menu
      closeMobileMenu();
    });
  });

  // ==========================================================================
  // 6. Rooms Filter Engine (Grid + Dropdown Nav Integration)
  // ==========================================================================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const roomCards = document.querySelectorAll(".room-card");

  const filterRooms = (category) => {
    roomCards.forEach((card) => {
      const roomCat = card.getAttribute("data-category");
      if (category === "all" || roomCat === category) {
        card.classList.remove("hidden");

        // GSAP animation fallback check
        if (typeof gsap !== "undefined") {
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.95, y: 15 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
              clearProps: "transform,opacity",
            },
          );
        } else {
          card.style.opacity = "1";
        }
      } else {
        card.classList.add("hidden");
      }
    });

    // Highlight active filter pill button
    filterButtons.forEach((btn) => {
      if (btn.getAttribute("data-filter") === category) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  };

  // Filter pill button clicks
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.target.getAttribute("data-filter");
      filterRooms(category);
    });
  });

  // Dropdown Items Click Event (Scrolls to Rooms & Filters)
  const dropdownItems = document.querySelectorAll(
    ".dropdown-item, .drawer-sublink",
  );
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const category = e.currentTarget.getAttribute("data-filter");

      // Close mobile menu if open
      closeMobileMenu();

      // Scroll smoothly to rooms section using Lenis or native scrollTo
      const roomsSection = document.getElementById("rooms");
      if (roomsSection) {
        if (lenisInstance) {
          lenisInstance.scrollTo(roomsSection, {
            offset: -80,
            duration: 1.2,
            onComplete: () => {
              filterRooms(category);
            },
          });
        } else {
          const offsetPosition =
            roomsSection.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          setTimeout(() => {
            filterRooms(category);
          }, 800);
        }
      }
    });
  });

  // ==========================================================================
  // 8. Bipiramidal Stories Slider Logic
  // ==========================================================================
  const initStoriesSlider = () => {
    const track = document.getElementById("stories-slider-track");
    const cards = document.querySelectorAll(".story-card");
    const dotsContainer = document.getElementById("carousel-dots");

    if (!track || cards.length === 0) return;

    let activeIndex = 2; // Center card (story_bg) is index 2
    let autoplayInterval;

    // Build dots indicators
    cards.forEach((_, idx) => {
      const dot = document.createElement("div");
      dot.classList.add("indicator-dot");
      if (idx === activeIndex) dot.classList.add("active");
      dot.addEventListener("click", () => {
        goToSlide(idx);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });

    // Bipiramidal layout rendering calculations (Infinite circular math)
    const updateSliderLayout = () => {
      const isMobile = window.innerWidth <= 768;
      const cardWidth = isMobile ? 280 : 350;
      const cardHeight = isMobile ? 380 : 420;

      cards.forEach((card, idx) => {
        // Symmetrical wrapping calculation to ensure infinite seamless loop
        let offset = idx - activeIndex;
        const halfLength = cards.length / 2;
        while (offset < -halfLength) offset += cards.length;
        while (offset > halfLength) offset -= cards.length;

        const absOffset = Math.abs(offset);

        // Math coefficients to scale down symmetrically from the center
        // Center (0): scale = 1.15, opacity = 1.0, depth Z = 0
        // Sides (1): scale = 0.95, opacity = 0.72, depth Z = -110px
        // Sides (2): scale = 0.75, opacity = 0.44, depth Z = -220px (Desktop only)
        const scale = 1.15 - absOffset * 0.2;

        // On mobile we show only 3 cards (offset < 1.5) for spacing, on desktop we show 5 (offset < 2.5)
        const maxVisibleOffset = isMobile ? 1.5 : 2.5;
        let opacity = 0;
        if (absOffset < maxVisibleOffset) {
          opacity = 1.0 - absOffset * (isMobile ? 0.4 : 0.28);
        }
        const zIndex = 20 - Math.round(absOffset);

        // Horizontal placement: stack cards in center first, then apply translateX offset
        card.style.left = "50%";
        card.style.top = "50%";
        card.style.marginLeft = `${-cardWidth / 2}px`;
        card.style.marginTop = `${-cardHeight / 2}px`;

        // Condensed spacing factor: overlay cards slightly
        const spacingFactor = isMobile ? 0.72 : 0.82;
        const translateX = offset * cardWidth * spacingFactor;

        // 3D rotation facing inwards to the center
        const rotateY = offset * -15;
        const translateZ = absOffset * -110;

        if (opacity > 0.05) {
          card.style.opacity = opacity;
          card.style.zIndex = zIndex;
          card.style.visibility = "visible";
          card.style.pointerEvents = offset === 0 ? "auto" : "none"; // Click/hover details only for central card

          card.style.transform = `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;

          if (offset === 0) {
            card.classList.add("active-card");
          } else {
            card.classList.remove("active-card");
          }
        } else {
          card.style.opacity = 0;
          card.style.zIndex = 0;
          card.style.visibility = "hidden";
          card.style.pointerEvents = "none";
          card.style.transform = `translate3d(${translateX}px, 0px, -400px) scale(0.3)`;
          card.classList.remove("active-card");
        }
      });

      // Update Indicators
      const dots = document.querySelectorAll(".indicator-dot");
      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    };

    const goToSlide = (idx) => {
      activeIndex = (idx + cards.length) % cards.length;
      updateSliderLayout();
    };

    // Autoplay Cycle
    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        goToSlide(activeIndex + 1);
      }, 3800);
    };

    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };

    const resetAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    // Pause autoplay on hovering the carousel
    const sliderContainer = document.getElementById("stories-slider-container");
    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", stopAutoplay);
      sliderContainer.addEventListener("mouseleave", startAutoplay);
    }

    // Swipe & Drag Gestures support for touch devices
    let dragStartX = 0;
    let dragEndX = 0;

    const trackWrapper = document.getElementById("stories-track-wrapper");
    if (trackWrapper) {
      // Touch listeners
      trackWrapper.addEventListener(
        "touchstart",
        (e) => {
          dragStartX = e.changedTouches[0].screenX;
          stopAutoplay();
        },
        { passive: true },
      );

      trackWrapper.addEventListener(
        "touchend",
        (e) => {
          dragEndX = e.changedTouches[0].screenX;
          handleSwipeGesture();
          startAutoplay();
        },
        { passive: true },
      );

      // Mouse drag fallback for desktop
      let isMouseDown = false;

      trackWrapper.addEventListener("mousedown", (e) => {
        isMouseDown = true;
        dragStartX = e.screenX;
        stopAutoplay();
      });

      trackWrapper.addEventListener("mouseup", (e) => {
        if (!isMouseDown) return;
        isMouseDown = false;
        dragEndX = e.screenX;
        handleSwipeGesture();
        startAutoplay();
      });

      trackWrapper.addEventListener("mouseleave", () => {
        if (isMouseDown) {
          isMouseDown = false;
          startAutoplay();
        }
      });
    }

    const handleSwipeGesture = () => {
      const dragDiff = dragStartX - dragEndX;
      const dragThreshold = 55; // Pixels threshold

      if (dragDiff > dragThreshold) {
        // Swipe Left -> Next
        goToSlide(activeIndex + 1);
      } else if (dragDiff < -dragThreshold) {
        // Swipe Right -> Prev
        goToSlide(activeIndex - 1);
      }
    };

    // Initialize positions & autoplay
    updateSliderLayout();
    startAutoplay();

    // Recalculate layout on screen resizing
    window.addEventListener("resize", updateSliderLayout);
  };

  initStoriesSlider();

  // ==========================================================================
  // 9. GSAP Entry Reveal ScrollTrigger Animations (Safe Guarded)
  // ==========================================================================
  const initScrollTriggerAnimations = () => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn(
        "GSAP / ScrollTrigger not loaded. Skipping scroll reveal animations.",
      );

      // Instantly show everything normally if GSAP failed
      const heroCard = document.getElementById("hero-card");
      if (heroCard) heroCard.style.opacity = "1";

      const serviceCards = document.querySelectorAll(".service-card");
      serviceCards.forEach((c) => {
        c.style.opacity = "1";
        c.style.transform = "none";
      });

      const roomsGrid = document.getElementById("rooms-grid-container");
      if (roomsGrid) {
        roomsGrid.style.opacity = "1";
        roomsGrid.style.transform = "none";
      }
      return;
    }

    // Registers plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero Info Card Fade-in Slide Up
    gsap.to("#hero-card", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3,
    });

    // Services Section Showcase Entrance
    gsap.fromTo(".services-showcase-container",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#services",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    // Rooms Grid Entrance Parallax Slide
    gsap.fromTo(
      "#rooms-grid-container",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#rooms",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      },
    );


  };

  // Initialize ScrollTrigger animations after load
  window.addEventListener("load", initScrollTriggerAnimations);

  // ==========================================================================
  // 9. Floating WhatsApp Widget Toggle Logic
  // ==========================================================================
  const initFloatingWhatsAppWidget = () => {
    const trigger = document.getElementById("whatsapp-trigger");
    const widget = document.getElementById("whatsapp-chat-widget");
    const closeBtn = document.getElementById("whatsapp-widget-close-btn");

    if (!trigger || !widget || !closeBtn) return;

    trigger.addEventListener("click", () => {
      widget.classList.add("active");
      trigger.classList.add("hidden");
    });

    closeBtn.addEventListener("click", () => {
      widget.classList.remove("active");
      trigger.classList.remove("hidden");
    });
  };



  // ==========================================================================
  // 11. Hero Spotlight Reveal Mask (Misterio y Privacidad)
  // ==========================================================================
  const initHeroSpotlight = () => {
      const heroSection = document.getElementById('hero');
      const container = document.querySelector('.hero-content-container');
      
      if (!heroSection || !container) return;

      let spotlight = { radius: 0 };
      let activeReveal = false;

      // Set initial values
      container.style.setProperty('--mouse-x', '-9999px');
      container.style.setProperty('--mouse-y', '-9999px');
      container.style.setProperty('--spotlight-radius', '0px');

      const onMouseMove = (e) => {
          // Only execute if on desktop viewport
          if (window.innerWidth <= 768) return;

          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          container.style.setProperty('--mouse-x', `${x}px`);
          container.style.setProperty('--mouse-y', `${y}px`);

          if (!activeReveal) {
              activeReveal = true;
              container.classList.add('reveal-active');
              if (typeof gsap !== 'undefined') {
                  gsap.killTweensOf(spotlight);
                  gsap.to(spotlight, {
                      radius: 200, // Reveal circle radius
                      duration: 0.8,
                      ease: 'power2.out',
                      onUpdate: () => {
                          container.style.setProperty('--spotlight-radius', `${spotlight.radius}px`);
                      }
                  });
              } else {
                  container.style.setProperty('--spotlight-radius', '200px');
              }
          }
      };

      const onMouseLeave = () => {
          if (window.innerWidth <= 768) return;

          activeReveal = false;
          container.classList.remove('reveal-active');
          if (typeof gsap !== 'undefined') {
              gsap.killTweensOf(spotlight);
              gsap.to(spotlight, {
                  radius: 0,
                  duration: 0.8,
                  ease: 'power2.out',
                  onUpdate: () => {
                      container.style.setProperty('--spotlight-radius', `${spotlight.radius}px`);
                  },
                  onComplete: () => {
                      container.style.setProperty('--mouse-x', '-9999px');
                      container.style.setProperty('--mouse-y', '-9999px');
                  }
              });
          } else {
              container.style.setProperty('--spotlight-radius', '0px');
              container.style.setProperty('--mouse-x', '-9999px');
              container.style.setProperty('--mouse-y', '-9999px');
          }
      };

      heroSection.addEventListener('mousemove', onMouseMove);
      heroSection.addEventListener('mouseleave', onMouseLeave);
  };

  initHeroSpotlight();
  initFloatingWhatsAppWidget();

  // ==========================================================================
  // 12. Services Showcase Interactivo (Bote al Anterior para Lado Izquierdo)
  // ==========================================================================
  const SERVICES_DATA = {
      cocheras: {
          title: "Cocheras Privadas con Portón Automático",
          desc: "Ingreso directo y discreto a su suite. Portón automático que se abre al instante para garantizar la máxima privacidad desde su llegada. Olvídese de registros públicos y disfrute de una discreción absoluta.",
          images: [
              "assets/images/services/Cochera/1.jpg",
              "assets/images/services/Cochera/2.jpg",
              "assets/images/services/Cochera/3.jpg"
          ]
      },
      sauna: {
          title: "Sauna Seco & Relax",
          desc: "Disfrute del bienestar físico y mental en la comodidad de su suite. Habitaciones equipadas con cámaras de sauna seco de madera fina y jacuzzis. Un espacio privado diseñado para la relajación absoluta.",
          images: [
              "assets/images/services/Sauna/1.jpg",
              "assets/images/services/svc_spa.png"
          ]
      },
      checkin: {
          title: "Check-in Exclusivo & Discreto",
          desc: "Proceso de check-in automatizado e inmediato sin necesidad de contacto público. Su suite estará lista y configurada a su llegada para que su ingreso sea totalmente fluido y privado.",
          images: [
              "assets/images/services/svc_checkin.png"
          ]
      },
      discrecion: {
          title: "Discreción Total y Privacidad",
          desc: "Nuestro diseño arquitectónico y de servicios está optimizado para garantizar que su estancia permanezca confidencial. Atención al cliente a través de WhatsApp para cualquier requerimiento sin interrupciones.",
          images: [
              "assets/images/services/svc_privacy.png"
          ]
      },
      spa: {
          title: "Atención Personalizada & Carta",
          desc: "Disfrute de una amplia selección de piqueos, bebidas y cenas gourmet servidas directamente en su suite a través de nuestra ventanilla de servicio hermética, asegurando discreción absoluta en todo momento.",
          images: [
              "assets/images/services/svc_spa.png"
          ]
      }
  };

  const initServicesShowcase = () => {
      const menuItems = document.querySelectorAll('.service-menu-item');
      const detailBox = document.getElementById('services-detail-box');
      const imgContainer = document.getElementById('showcase-img-container');

      if (menuItems.length === 0 || !detailBox || !imgContainer) return;

      let currentService = 'cocheras';
      let slideshowInterval = null;
      let activeImageIndex = 0;

      // Render images for the service
      const renderImages = (serviceKey) => {
          const service = SERVICES_DATA[serviceKey];
          imgContainer.innerHTML = '';
          service.images.forEach((imgSrc, index) => {
              const img = document.createElement('img');
              img.src = imgSrc;
              img.alt = service.title;
              img.className = `showcase-img ${index === 0 ? 'active-img' : ''}`;
              imgContainer.appendChild(img);
          });
          activeImageIndex = 0;
      };

      // Auto rotation slideshow for active service images
      const startSlideshow = (serviceKey) => {
          clearInterval(slideshowInterval);
          const service = SERVICES_DATA[serviceKey];
          if (service.images.length <= 1) return;

          slideshowInterval = setInterval(() => {
              const images = imgContainer.querySelectorAll('.showcase-img');
              if (images.length === 0) return;

              const currentImg = images[activeImageIndex];
              activeImageIndex = (activeImageIndex + 1) % images.length;
              const nextImg = images[activeImageIndex];

              if (typeof gsap !== 'undefined') {
                  gsap.to(currentImg, { opacity: 0, duration: 1.0 });
                  gsap.to(nextImg, { opacity: 1, duration: 1.0 });
              } else {
                  currentImg.classList.remove('active-img');
                  nextImg.classList.add('active-img');
              }
          }, 3000);
      };

      const selectService = (serviceKey) => {
          if (serviceKey === currentService) return;

          const newService = SERVICES_DATA[serviceKey];
          currentService = serviceKey;

          // Update active link menu item
          menuItems.forEach(item => {
              if (item.getAttribute('data-service') === serviceKey) {
                  item.classList.add('active');
              } else {
                  item.classList.remove('active');
              }
          });

          // GSAP Sliding Transition: "Pushes previous content out to the left"
          if (typeof gsap !== 'undefined') {
              gsap.killTweensOf([detailBox, imgContainer]);
              
              // Slide out left
              gsap.to([detailBox, imgContainer], {
                  x: -60,
                  opacity: 0,
                  duration: 0.3,
                  ease: "power2.in",
                  onComplete: () => {
                      // Update contents
                      detailBox.querySelector('.active-service-title').textContent = newService.title;
                      detailBox.querySelector('.active-service-desc').textContent = newService.desc;
                      
                      renderImages(serviceKey);
                      startSlideshow(serviceKey);

                      // Set to right
                      gsap.set([detailBox, imgContainer], { x: 60 });

                      // Slide in from right
                      gsap.to([detailBox, imgContainer], {
                          x: 0,
                          opacity: 1,
                          duration: 0.4,
                          ease: "power2.out"
                      });
                  }
              });
          } else {
              // Fallback
              detailBox.querySelector('.active-service-title').textContent = newService.title;
              detailBox.querySelector('.active-service-desc').textContent = newService.desc;
              renderImages(serviceKey);
              startSlideshow(serviceKey);
          }
      };

      // Click/hover switch triggers
      menuItems.forEach(item => {
          const serviceKey = item.getAttribute('data-service');
          item.addEventListener('click', () => {
              selectService(serviceKey);
          });
          item.addEventListener('mouseenter', () => {
              selectService(serviceKey);
          });
      });

      // Initial setup
      renderImages(currentService);
      startSlideshow(currentService);
  };

  initServicesShowcase();

  // ==========================================================================
  // 13. Floating Booking Bar Logic (Reservar al Instante via WhatsApp)
  // ==========================================================================
  const initFloatingBookingBar = () => {
      const bookingBar = document.getElementById('floating-booking-bar');
      const submitBtn = document.getElementById('btn-booking-submit');
      const datetimeInput = document.getElementById('booking-datetime');
      const roomTypeSelect = document.getElementById('booking-room-type');
      const guestsSelect = document.getElementById('booking-guests');

      if (!bookingBar || !submitBtn) return;

      // Set default value for datetime-local to tomorrow at 18:00
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(18, 0, 0, 0);
      
      const pad = (num) => String(num).padStart(2, '0');
      const defaultDateTime = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth()+1)}-${pad(tomorrow.getDate())}T18:00`;
      if (datetimeInput) {
          datetimeInput.value = defaultDateTime;
      }

      // Handle Scroll contraction/expansion:
      // When page leaves the Hero section, contract the bar to show only the Reservar button
      const checkBarScroll = () => {
          const hero = document.getElementById('hero');
          if (hero) {
              const heroHeight = hero.offsetHeight;
              if (window.scrollY > heroHeight - 150) {
                  bookingBar.classList.add('contracted');
              } else {
                  bookingBar.classList.remove('contracted');
              }
          }
      };

      window.addEventListener('scroll', checkBarScroll);
      // Run once at start
      checkBarScroll();

      // Click anywhere on bookingBar when contracted will expand it back
      bookingBar.addEventListener('click', (e) => {
          if (bookingBar.classList.contains('contracted')) {
              e.preventDefault();
              e.stopPropagation();
              bookingBar.classList.remove('contracted');
          }
      });

      // Submit handler
      submitBtn.addEventListener('click', (e) => {
          // If contracted, expand instead of submitting
          if (bookingBar.classList.contains('contracted')) {
              e.preventDefault();
              e.stopPropagation();
              bookingBar.classList.remove('contracted');
              return;
          }

          const datetimeVal = datetimeInput ? datetimeInput.value : '';
          const roomTypeVal = roomTypeSelect ? roomTypeSelect.value : '';
          const guestsVal = guestsSelect ? guestsSelect.value : '';

          if (!datetimeVal) {
              alert('Por favor seleccione una fecha y hora para su reserva.');
              e.preventDefault();
              e.stopPropagation();
              return;
          }

          e.preventDefault();

          // Format date and time nicely
          const dateObj = new Date(datetimeVal);
          const formattedDate = dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
          const formattedTime = dateObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

          const message = `Hola, quiero reservar una habitación ${roomTypeVal} para el día ${formattedDate} a las ${formattedTime} para ${guestsVal}.`;
          
          // Redirect to the exact phone specified: 511918924237
          // wa.me triggers app redirect on mobile and browser redirection on desktop
          const whatsappUrl = `https://wa.me/511918924237?text=${encodeURIComponent(message)}`;
          
          window.open(whatsappUrl, '_blank');
      });
  };

  initFloatingBookingBar();
});
