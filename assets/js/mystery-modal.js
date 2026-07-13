/**
 * Mystery Modal – Botón "Descubrir" y modal de revelación (mobile)
 * ────────────────────────────────────────────────────────────────
 * Responsabilidad:
 *   Controla el botón #mystery-reveal-btn que abre un modal (#mystery-modal)
 *   con animación GSAP scale+fade. Cierra al hacer click en el overlay o en
 *   el botón de cerrar. Principalmente pensado para la experiencia mobile.
 *
 * Dependencias: GSAP (opcional, con fallback CSS).
 * Usado en: index.html (sección Hero, mobile)
 */
(function () {
  function init() {
    const mysteryBtn = document.getElementById('mystery-reveal-btn');
    const modal = document.getElementById('mystery-modal');
    const closeBtn = document.getElementById('mystery-modal-close');

    if (!mysteryBtn || !modal) return;

    mysteryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      modal.classList.add('active');
      if (typeof gsap !== 'undefined') {
        const card = modal.querySelector('.mystery-modal-card');
        gsap.killTweensOf([modal, card]);
        gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(card, { scale: 0.85, y: 20 }, { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" });
      }
    });

    const closeModal = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (typeof gsap !== 'undefined') {
        const card = modal.querySelector('.mystery-modal-card');
        gsap.to(card, { scale: 0.85, y: 20, duration: 0.25, ease: "power2.in" });
        gsap.to(modal, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            modal.classList.remove('active');
          }
        });
      } else {
        modal.classList.remove('active');
      }
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(e);
      }
    });
  }

  window.MangosHomePage = window.MangosHomePage || {};
  window.MangosHomePage.initMysteryModal = init;
})();
