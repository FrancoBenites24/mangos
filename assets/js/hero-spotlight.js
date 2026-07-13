/**
 * Hero Spotlight – Efecto de máscara circular que sigue al mouse
 * ──────────────────────────────────────────────────────────────
 * Responsabilidad:
 *   Crea un "spotlight" circular que revela contenido debajo de una capa
 *   oscura en el Hero. Usa CSS custom properties (--mouse-x, --mouse-y,
 *   --spotlight-radius) que el CSS consume con radial-gradient.
 *   Animación del radio con GSAP si está disponible; fallback instantáneo.
 *   Solo activo en desktop (>768px).
 *
 * Dependencias: GSAP (opcional, con fallback).
 * Usado en: index.html (sección Hero, solo desktop)
 */
(function () {
  function init() {
    const heroSection = document.getElementById('hero');
    const container = document.querySelector('.hero-content-container');

    if (!heroSection || !container) return;

    let spotlight = { radius: 0 };
    let activeReveal = false;

    // Set initial values
    heroSection.style.setProperty('--mouse-x', '-9999px');
    heroSection.style.setProperty('--mouse-y', '-9999px');
    container.style.setProperty('--mouse-x', '-9999px');
    container.style.setProperty('--mouse-y', '-9999px');
    heroSection.style.setProperty('--spotlight-radius', '0px');

    const onMouseMove = (e) => {
      // Only execute if on desktop viewport
      if (window.innerWidth <= 768) return;

      const rectHero = heroSection.getBoundingClientRect();
      const xHero = e.clientX - rectHero.left;
      const yHero = e.clientY - rectHero.top;

      const rectContainer = container.getBoundingClientRect();
      const xContainer = e.clientX - rectContainer.left;
      const yContainer = e.clientY - rectContainer.top;

      heroSection.style.setProperty('--mouse-x', `${xHero}px`);
      heroSection.style.setProperty('--mouse-y', `${yHero}px`);
      container.style.setProperty('--mouse-x', `${xContainer}px`);
      container.style.setProperty('--mouse-y', `${yContainer}px`);

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
              heroSection.style.setProperty('--spotlight-radius', `${spotlight.radius}px`);
            }
          });
        } else {
          heroSection.style.setProperty('--spotlight-radius', '200px');
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
            heroSection.style.setProperty('--spotlight-radius', `${spotlight.radius}px`);
          },
          onComplete: () => {
            heroSection.style.setProperty('--mouse-x', '-9999px');
            heroSection.style.setProperty('--mouse-y', '-9999px');
            container.style.setProperty('--mouse-x', '-9999px');
            container.style.setProperty('--mouse-y', '-9999px');
          }
        });
      } else {
        heroSection.style.setProperty('--spotlight-radius', '0px');
        heroSection.style.setProperty('--mouse-x', '-9999px');
        heroSection.style.setProperty('--mouse-y', '-9999px');
        container.style.setProperty('--mouse-x', '-9999px');
        container.style.setProperty('--mouse-y', '-9999px');
      }
    };

    heroSection.addEventListener('mousemove', onMouseMove);
    heroSection.addEventListener('mouseleave', onMouseLeave);
  }

  window.MangosHomePage = window.MangosHomePage || {};
  window.MangosHomePage.initHeroSpotlight = init;
})();
