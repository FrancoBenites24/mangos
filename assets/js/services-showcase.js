/**
 * Services Showcase – Menú interactivo de servicios con slideshow de imágenes
 * ────────────────────────────────────────────────────────────────────────────
 * Responsabilidad:
 *   Renderiza un menú lateral de servicios del hotel. Al hacer hover o click
 *   en cada ítem, muestra su detalle (título, descripción) y un slideshow
 *   de imágenes con transición GSAP "push left → enter right".
 *   Soporta swipe en mobile para navegar entre servicios.
 *
 * Datos:
 *   SERVICES_DATA contiene la información estática de cada servicio
 *   (cocheras, sauna, check-in, discreción, spa/carta).
 *
 * Dependencias: GSAP (opcional, con fallback CSS).
 * Usado en: index.html (sección Services)
 */
(function () {
  // ── Datos estáticos de servicios ──
  var SERVICES_DATA = {
    cocheras: {
      title: "Cocheras Privadas con Portón Automático",
      desc: "Ingreso directo y discreto a su suite. Portón automático que se abre al instante para garantizar la máxima privacidad desde su llegada. Olvídese de registros públicos y disfrute de una discreción absoluta.",
      images: [
        "assets/images/services/Cochera/1.jpg",
        "assets/images/services/Cochera/2.jpg"
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

  function init() {
    const menuItems = document.querySelectorAll('.service-menu-item');
    const detailBox = document.getElementById('services-detail-box');
    const imgContainer = document.getElementById('showcase-img-container');

    if (menuItems.length === 0 || !detailBox || !imgContainer) return;

    let currentService = 'cocheras';
    let slideshowInterval = null;
    let activeImageIndex = 0;

    // ── Render images for the service ──
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

    // ── Auto rotation slideshow for active service images ──
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

    // ── Select and transition to a new service ──
    const selectService = (serviceKey) => {
      if (serviceKey === currentService) return;

      const newService = SERVICES_DATA[serviceKey];
      currentService = serviceKey;

      // Update active link menu item
      menuItems.forEach(item => {
        if (item.getAttribute('data-service') === serviceKey) {
          item.classList.add('active');

          // Auto-scroll the active pill into view (centered) on mobile horizontal list
          item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
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

    // ── Click/hover switch triggers ──
    menuItems.forEach(item => {
      const serviceKey = item.getAttribute('data-service');
      item.addEventListener('click', () => {
        selectService(serviceKey);
      });
      item.addEventListener('mouseenter', () => {
        selectService(serviceKey);
      });
    });

    // ── Swipe gesture detection for mobile ──
    let touchStartX = 0;
    let touchEndX = 0;
    const showcaseContainer = document.querySelector('.services-showcase-container');
    if (showcaseContainer) {
      showcaseContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      showcaseContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const threshold = 55;
        const serviceKeys = Object.keys(SERVICES_DATA);
        const currentIdx = serviceKeys.indexOf(currentService);

        if (touchEndX < touchStartX - threshold) {
          // Swiped Left -> Next service
          const nextIdx = (currentIdx + 1) % serviceKeys.length;
          selectService(serviceKeys[nextIdx]);
        } else if (touchEndX > touchStartX + threshold) {
          // Swiped Right -> Previous service
          const prevIdx = (currentIdx - 1 + serviceKeys.length) % serviceKeys.length;
          selectService(serviceKeys[prevIdx]);
        }
      }, { passive: true });
    }

    // ── Initial setup ──
    renderImages(currentService);
    startSlideshow(currentService);
  }

  window.MangosHomePage = window.MangosHomePage || {};
  window.MangosHomePage.initServicesShowcase = init;
})();
