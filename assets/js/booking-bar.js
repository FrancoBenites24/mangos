/**
 * Booking Bar – Barra flotante de reserva rápida vía WhatsApp
 * ────────────────────────────────────────────────────────────
 * Responsabilidad:
 *   Controla la barra de reserva flotante (#floating-booking-bar):
 *     - Default datetime (mañana 18:00)
 *     - Contracción/expansión según scroll (fuera del Hero → contraída)
 *     - Click para expandir cuando contraída
 *     - Validación del formulario y envío del mensaje a WhatsApp
 *       usando el helper MangosUI.openWhatsAppMessage()
 *
 * Dependencias: MangosUI (openWhatsAppMessage, formatDateTime, getTomorrowDateTimeValue).
 * Usado en: index.html
 */
(function () {
  function init() {
    const bookingBar = document.getElementById('floating-booking-bar');
    const submitBtn = document.getElementById('btn-booking-submit');
    const datetimeInput = document.getElementById('booking-datetime');
    const roomTypeSelect = document.getElementById('booking-room-type');
    const guestsSelect = document.getElementById('booking-guests');
    const paymentSelect = document.getElementById('booking-payment');

    if (!bookingBar || !submitBtn) return;

    // ── Floating actions container (hidden on mobile when booking bar is expanded) ──
    const floatingActions = document.getElementById('floating-actions');

    const hideFloatingActions = () => {
      if (floatingActions && window.innerWidth <= 768) {
        floatingActions.classList.add('hidden-by-booking');
      }
    };

    const showFloatingActions = () => {
      if (floatingActions) {
        floatingActions.classList.remove('hidden-by-booking');
      }
    };

    // ── Set default value for datetime-local to tomorrow at 18:00 ──
    if (datetimeInput) {
      datetimeInput.value = MangosUI.getTomorrowDateTimeValue();
    }

    // ── Handle Scroll contraction/expansion ──
    // When page leaves the Hero section, contract the bar to show only the Reservar button
    const checkBarScroll = () => {
      const hero = document.getElementById('hero');
      if (window.innerWidth <= 768) {
        // Always keep contracted on scroll/load on mobile
        bookingBar.classList.add('contracted');
        return;
      }
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

    // ── Click anywhere on bookingBar when contracted will expand it back ──
    bookingBar.addEventListener('click', (e) => {
      if (bookingBar.classList.contains('contracted')) {
        e.preventDefault();
        e.stopPropagation();
        bookingBar.classList.remove('contracted');
        hideFloatingActions();
      }
    });

    // ── Close button handler (collapses the booking bar back) ──
    const closeBtn = document.getElementById('booking-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        bookingBar.classList.add('contracted');
        showFloatingActions();
      });
    }

    // ── Submit handler ──
    submitBtn.addEventListener('click', (e) => {
      // If contracted, expand instead of submitting
      if (bookingBar.classList.contains('contracted')) {
        e.preventDefault();
        e.stopPropagation();
        bookingBar.classList.remove('contracted');
        hideFloatingActions();
        return;
      }

      const datetimeVal = datetimeInput ? datetimeInput.value : '';
      const roomTypeVal = roomTypeSelect ? roomTypeSelect.value : '';
      const guestsVal = guestsSelect ? guestsSelect.value : '';
      const paymentVal = paymentSelect ? paymentSelect.value : '';

      if (!datetimeVal) {
        alert('Por favor seleccione una fecha y hora para su reserva.');
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.preventDefault();

      // Format date and time nicely
      const formatted = MangosUI.formatDateTime(datetimeVal);

      const message = `Hola, quiero reservar una habitación ${roomTypeVal} para el día ${formatted.date} a las ${formatted.time} para ${guestsVal} (Método de pago: ${paymentVal}).`;

      MangosUI.openWhatsAppMessage(message);
    });
  }

  window.MangosHomePage = window.MangosHomePage || {};
  window.MangosHomePage.initBookingBar = init;
})();
