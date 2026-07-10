/* Shared UI helpers for Mango's Suite pages. */
(function (window) {
  const DEFAULT_WHATSAPP_PHONE = "511918924237";

  const ready = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
      return;
    }

    callback();
  };

  const initThemeToggle = () => {
    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem("theme");
    document.body.classList.toggle("light-theme", savedTheme === "light");

    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("light-theme") ? "light" : "dark",
      );
    });
  };

  const initMobileDrawer = (options = {}) => {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const drawerCloseBtn = document.getElementById("drawer-close-btn");
    const drawerOverlay = document.getElementById("mobile-drawer-overlay");
    const drawerLinks = document.querySelectorAll(".drawer-link");

    if (!mobileMenuBtn || !mobileDrawer || !drawerCloseBtn || !drawerOverlay) {
      return { open: () => {}, close: () => {} };
    }

    const open = () => {
      mobileDrawer.classList.add("open");
      drawerOverlay.classList.add("open");
      mobileMenuBtn.classList.add("open");
      if (typeof options.onOpen === "function") options.onOpen();
    };

    const close = () => {
      mobileDrawer.classList.remove("open");
      drawerOverlay.classList.remove("open");
      mobileMenuBtn.classList.remove("open");
      if (typeof options.onClose === "function") options.onClose();
    };

    mobileMenuBtn.addEventListener("click", () => {
      if (mobileDrawer.classList.contains("open")) {
        close();
      } else {
        open();
      }
    });

    drawerCloseBtn.addEventListener("click", close);
    drawerOverlay.addEventListener("click", close);
    drawerLinks.forEach((link) => link.addEventListener("click", close));

    return { open, close };
  };

  const animateRoomCardIn = (card) => {
    card.style.display = "block";
    card.classList.remove("hidden");

    if (typeof window.gsap !== "undefined") {
      window.gsap.fromTo(
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
      return;
    }

    card.style.opacity = "1";
  };

  const initRoomsFilter = (options = {}) => {
    const filterButtons = document.querySelectorAll(
      options.buttonSelector || ".filter-btn",
    );
    const roomCards = document.querySelectorAll(options.cardSelector || ".room-card");
    const hiddenRoomSelector = options.hiddenRoomSelector || ".hidden-room";
    const showMoreSelector = options.showMoreSelector || "#btn-show-more-rooms";

    const filterRooms = (category = "all") => {
      const showMoreBtn = document.querySelector(showMoreSelector);
      const isExpanded = showMoreBtn
        ? showMoreBtn.classList.contains("expanded")
        : false;

      roomCards.forEach((card) => {
        const roomCategory = card.getAttribute("data-category");
        const isHiddenRoom = card.matches(hiddenRoomSelector);
        const matchesCategory = category === "all" || roomCategory === category;
        const hiddenByCollapsedAll =
          options.respectHiddenRooms !== false &&
          category === "all" &&
          isHiddenRoom &&
          !isExpanded;

        if (matchesCategory && !hiddenByCollapsedAll) {
          animateRoomCardIn(card);
        } else {
          card.style.display = "none";
          card.classList.add("hidden");
        }
      });

      const moreBtnContainer = document.querySelector(".rooms-more-container");
      if (moreBtnContainer) moreBtnContainer.style.display = "block";

      filterButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-filter") === category);
      });
    };

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        filterRooms(event.currentTarget.getAttribute("data-filter"));
      });
    });

    return filterRooms;
  };

  const initRoomCardFlip = () => {
    document.querySelectorAll(".room-card").forEach((card) => {
      card.addEventListener("click", (event) => {
        if (event.target.closest(".btn-detail-back")) return;

        event.preventDefault();
        card.classList.toggle("flipped");
      });
    });
  };

  const initRoomsCarouselDots = (options = {}) => {
    const grid = document.querySelector(options.gridSelector || "#rooms-grid-container");
    const dotsContainer = document.getElementById("rooms-carousel-dots");
    const gap = options.gap || 20;

    if (!grid || !dotsContainer) return;

    const getVisibleCards = () =>
      Array.from(grid.querySelectorAll(".room-card")).filter((card) => {
        return window.getComputedStyle(card).display !== "none";
      });

    const updateDots = () => {
      const visibleCards = getVisibleCards();

      if (dotsContainer.children.length !== visibleCards.length) {
        dotsContainer.innerHTML = "";

        visibleCards.forEach((card, index) => {
          const dot = document.createElement("button");
          dot.className = `rooms-carousel-dot ${index === 0 ? "active" : ""}`;
          dot.setAttribute("aria-label", `Ir a habitacion ${index + 1}`);
          dot.addEventListener("click", () => {
            grid.scrollTo({
              left: index * (card.offsetWidth + gap),
              behavior: "smooth",
            });
          });
          dotsContainer.appendChild(dot);
        });
      }

      if (visibleCards.length === 0) return;

      const activeIndex = Math.round(grid.scrollLeft / (visibleCards[0].offsetWidth + gap));
      dotsContainer.querySelectorAll(".rooms-carousel-dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === activeIndex);
      });
    };

    grid.addEventListener("scroll", updateDots);
    window.addEventListener("resize", updateDots);

    const observer = new MutationObserver(updateDots);
    observer.observe(grid, {
      attributes: true,
      subtree: true,
      attributeFilter: ["style", "class"],
    });

    updateDots();
  };

  const getTomorrowDateTimeValue = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(18, 0, 0, 0);

    const pad = (num) => String(num).padStart(2, "0");
    return `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(
      tomorrow.getDate(),
    )}T18:00`;
  };

  const formatDateTime = (datetimeValue) => {
    const date = new Date(datetimeValue);

    return {
      date: date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const openWhatsAppMessage = (message, phone = DEFAULT_WHATSAPP_PHONE) => {
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const initResponsiveHeroVideo = () => {
    const video = document.getElementById("hero-background-video");
    if (!video) return;

    const mobileSrc = video.getAttribute("data-mobile-src");
    const desktopSrc = video.getAttribute("data-desktop-src");
    if (!mobileSrc || !desktopSrc) return;

    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const setVideoSource = () => {
      const nextSrc = mediaQuery.matches ? mobileSrc : desktopSrc;
      const currentSrc = video.getAttribute("src") || "";

      if (currentSrc.endsWith(nextSrc)) return;

      video.setAttribute("src", nextSrc);
      video.load();

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    setVideoSource();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", setVideoSource);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(setVideoSource);
    }
  };

  window.MangosUI = {
    ready,
    initThemeToggle,
    initMobileDrawer,
    initRoomsFilter,
    initRoomCardFlip,
    initRoomsCarouselDots,
    getTomorrowDateTimeValue,
    formatDateTime,
    openWhatsAppMessage,
    initResponsiveHeroVideo,
  };
})(window);
