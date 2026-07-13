/**
 * Stories Slider – Carrusel bipiramidal 3D con autoplay y gestos
 * ──────────────────────────────────────────────────────────────
 * Responsabilidad:
 *   Renderiza un carrusel de tarjetas en perspectiva 3D (escala, rotación,
 *   profundidad Z) con wrapping circular infinito. Soporta:
 *     - Dots de navegación
 *     - Autoplay con pausa al hover
 *     - Swipe touch + mouse drag
 *
 * Dependencias: Ninguna (vanilla JS + CSS transforms 3D).
 * Usado en: index.html (sección Stories)
 */
(function () {
  function init() {
    const track = document.getElementById("stories-slider-track");
    const cards = document.querySelectorAll(".story-card");
    const dotsContainer = document.getElementById("carousel-dots");

    if (!track || cards.length === 0) return;

    let activeIndex = 2; // Center card (story_bg) is index 2
    let autoplayInterval;

    // ── Build dots indicators ──
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

    // ── Bipiramidal layout rendering calculations (Infinite circular math) ──
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

    // ── Autoplay Cycle ──
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

    // ── Swipe & Drag Gestures support for touch devices ──
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

    // ── Initialize positions & autoplay ──
    updateSliderLayout();
    startAutoplay();

    // Recalculate layout on screen resizing
    window.addEventListener("resize", updateSliderLayout);
  }

  window.MangosHomePage = window.MangosHomePage || {};
  window.MangosHomePage.initStoriesSlider = init;
})();
