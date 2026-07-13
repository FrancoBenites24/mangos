/**
 * Navbar Interactions – Underline slide, header scroll state, section tracker
 * ────────────────────────────────────────────────────────────────────────────
 * Responsabilidad:
 *   1. Mueve el subrayado animado (#nav-underline) al link hover/activo.
 *   2. Agrega clase "scrolled" al header cuando pasa el Hero.
 *   3. Detecta qué sección está visible y marca su nav-link como activo.
 *
 * Dependencias: Ninguna (vanilla JS puro).
 * Usado en: index.html
 *
 * @param {Object} config
 * @param {Function} config.closeMobileMenu – Callback para cerrar el drawer mobile.
 * @param {Object|null} config.lenisInstance – Instancia de Lenis (si existe).
 * @returns {{ closeMobileMenu: Function }}
 */
(function () {
  function init(config) {
    config = config || {};
    const closeMobileMenu = config.closeMobileMenu || (() => {});

    const mainHeader = document.getElementById("main-header");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const underline = document.getElementById("nav-underline");

    // ── Underline slide position updater ──
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

    // ── Track active section on scroll to update Navbar state ──
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

    // ── Check Header Scroll position to toggle transparency/blur ──
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

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", resetUnderline);
    setTimeout(resetUnderline, 500); // Initial positioning after font/layout stabilizes
  }

  window.MangosHomePage = window.MangosHomePage || {};
  window.MangosHomePage.initNavbar = init;
})();
