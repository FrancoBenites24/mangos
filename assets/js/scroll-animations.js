/**
 * Scroll Animations – GSAP ScrollTrigger reveal animations
 * ─────────────────────────────────────────────────────────
 * Responsabilidad:
 *   Anima la entrada de secciones cuando el usuario hace scroll:
 *     - Hero card fade-in slide up
 *     - Services showcase entrance
 *     - Rooms grid parallax slide
 *   Incluye fallback graceful si GSAP no está cargado (muestra todo sin animar).
 *
 * Dependencias: GSAP + ScrollTrigger (CDN, opcional con fallback).
 * Usado en: index.html
 */
(function () {
  function init() {
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
  }

  window.MangosHomePage = window.MangosHomePage || {};
  window.MangosHomePage.initScrollAnimations = init;
})();
