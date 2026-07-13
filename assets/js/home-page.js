/**
 * Home Page Orchestrator – Punto de entrada para index.html
 * ─────────────────────────────────────────────────────────
 * Responsabilidad:
 *   Arranca todos los módulos de la página principal en el orden correcto.
 *   Este archivo es el equivalente del antiguo script.js monolítico,
 *   pero solo contiene la secuencia de inicialización.
 *
 * Dependencias: MangosUI (common.js) + todos los módulos MangosHomePage.
 * Usado en: index.html (debe cargarse DESPUÉS de todos los módulos)
 *
 * Orden de carga requerido en el HTML:
 *   1. common.js         → MangosUI (helpers compartidos)
 *   2. typewriter.js      → MangosHomePage.initTypewriter
 *   3. navbar.js          → MangosHomePage.initNavbar
 *   4. stories-slider.js  → MangosHomePage.initStoriesSlider
 *   5. scroll-animations.js → MangosHomePage.initScrollAnimations
 *   6. hero-spotlight.js  → MangosHomePage.initHeroSpotlight
 *   7. services-showcase.js → MangosHomePage.initServicesShowcase
 *   8. booking-bar.js     → MangosHomePage.initBookingBar
 *   9. mystery-modal.js   → MangosHomePage.initMysteryModal
 *  10. home-page.js       → Este archivo (orquestador)
 */
document.addEventListener("DOMContentLoaded", () => {
  // ── Shared UI setup ──
  MangosUI.initThemeToggle();
  MangosUI.initResponsiveHeroVideo();

  // ── Lenis Smooth Scroll ──
  // Deshabilitado actualmente en favor de CSS scroll-snap nativo.
  // Si se reactiva Lenis, asignar la instancia a lenisInstance
  // y pasarla al mobile drawer (onOpen: stop, onClose: start).
  let lenisInstance = null;

  // ── Typewriter ──
  MangosHomePage.initTypewriter();

  // ── Navbar (underline, scroll state, section tracker) ──
  // Necesita closeMobileMenu del drawer, pero el drawer necesita
  // onOpen/onClose de Lenis. Resolvemos con referencia mutable.
  let closeMobileMenu = () => {};

  MangosHomePage.initNavbar({
    closeMobileMenu: () => closeMobileMenu(),
  });

  // ── Mobile Drawer ──
  ({ close: closeMobileMenu } = MangosUI.initMobileDrawer({
    onOpen: () => {
      if (lenisInstance) lenisInstance.stop();
    },
    onClose: () => {
      if (lenisInstance) lenisInstance.start();
    },
  }));

  // ── Rooms Filter Engine ──
  const filterRooms = MangosUI.initRoomsFilter();

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

  // ── Stories Slider (carrusel bipiramidal 3D) ──
  MangosHomePage.initStoriesSlider();

  // ── GSAP Scroll Reveal Animations (arranca después de load completo) ──
  window.addEventListener("load", MangosHomePage.initScrollAnimations);

  // ── Hero Spotlight (mouse-follow reveal mask) ──
  MangosHomePage.initHeroSpotlight();

  // ── Services Showcase (menú interactivo de servicios) ──
  MangosHomePage.initServicesShowcase();

  // ── Floating Booking Bar (reserva rápida vía WhatsApp) ──
  MangosHomePage.initBookingBar();

  // ── Rooms Mobile Carousel Dots ──
  MangosUI.initRoomsCarouselDots();

  // ── Mystery Reveal Modal (mobile) ──
  MangosHomePage.initMysteryModal();

  // ── Room Cards Flip Animation ──
  MangosUI.initRoomCardFlip();

  // ── Initial filter run to set grid and dots on load ──
  filterRooms("all");
});
