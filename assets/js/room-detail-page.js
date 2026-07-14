/* Interactions and data for detalle-habitacion.html. */
const ROOMS_DETAILS = {
  simple: {
    title: "Habitacion Simple Standard",
    tag: "Simple",
    price: "S/. 60",
    time: "/ 4 horas",
    desc: "Nuestra Habitacion Simple Standard ofrece un refugio perfecto para descansar con total comodidad y privacidad en Piura. Cuenta con un diseno contemporaneo y acogedor, pensado para estancias cortas y descansos rapidos. Al igual que todas nuestras habitaciones, incluye acceso directo a su propia cochera privada con porton automatico para garantizar la maxima discrecion desde su llegada.",
    images: ["assets/images/rooms/room_simple.png", "assets/images/hero_bg.png"],
    amenities: [
      { name: "Cochera Privada", desc: "Porton automatico directo" },
      { name: "Smart TV 55\"", desc: "Netflix, YouTube & cable" },
      { name: "Ducha Espanola", desc: "Agua caliente y fria" },
      { name: "Wifi 5G", desc: "Conexion de alta velocidad" },
      { name: "Aire Acondicionado", desc: "Control de clima individual" },
      { name: "Servicio a la Carta", desc: "Bebidas y piqueos 24h" },
    ],
  },
  vip: {
    title: "Suite VIP Executive",
    tag: "VIP",
    price: "S/. 90",
    time: "/ 4 horas",
    desc: "La Suite VIP Executive es la definicion de amplitud y confort de alta gama. Disenada para ocasiones especiales o para quienes buscan una experiencia de nivel superior en Piura. Cuenta con acabados de primera, iluminacion calida indirecta, sistema de sonido de alta fidelidad y un sillon tantrico ergonomico para disfrutar de una estancia memorable con absoluta privacidad.",
    images: ["assets/images/rooms/room_vip.png", "assets/images/hero_bg.png"],
    amenities: [
      { name: "Jacuzzi Privado", desc: "Espacioso con hidromasaje" },
      { name: "Sillon del Amor", desc: "Diseno tantrico ergonomico" },
      { name: "Cochera Privada", desc: "Porton automatico directo" },
      { name: "Smart TV 65\"", desc: "Pantalla gigante 4K" },
      { name: "Sonido Envolvente", desc: "Conexion Bluetooth" },
      { name: "Mini Bar", desc: "Bebidas premium seleccionadas" },
    ],
  },
  sauna: {
    title: "Suite Spa Sauna & Jacuzzi",
    tag: "Sauna & Jacuzzi",
    price: "S/. 130",
    time: "/ 4 horas",
    desc: "Convierta su estancia en un autentico dia de spa privado. Esta suite exclusiva esta equipada con su propia camara de sauna seco revestida de madera fina y un jacuzzi doble temperado con sistema de hidromasaje. Un espacio de bienestar fisico y mental disenado para parejas que buscan relajacion y comodidad premium en la mas estricta confidencialidad.",
    images: ["assets/images/services/svc_spa.png", "assets/images/services/Sauna/1.jpg"],
    amenities: [
      { name: "Sauna Seco", desc: "Madera de primera calidad" },
      { name: "Jacuzzi Doble", desc: "Temperado con hidromasajes" },
      { name: "Cochera Privada", desc: "Porton automatico directo" },
      { name: "Smart Lights", desc: "Escenas de luces relajantes" },
      { name: "Smart TV 55\"", desc: "Netflix & YouTube premium" },
      { name: "Ventanilla Hermetica", desc: "Servicio de comida 100% discreto" },
    ],
  },
  fantasia: {
    title: "Suite Tematica Fantasia",
    tag: "Tematica",
    price: "S/. 120",
    time: "/ 4 horas",
    desc: "Dejese llevar por sus fantasias en una suite concebida para la pasion y la diversion. Cuenta con una cama suspendida de diseno exclusivo, espejos integrados en el techo, un cano o barra de pole dance profesional y un sillon tantrico. Un espacio seguro, higienico y sugerente pensado para avivar el romance y vivir una noche magica en Piura.",
    images: ["assets/images/rooms/room_thematic_fantasy.png", "assets/images/hero_bg.png"],
    amenities: [
      { name: "Cama Suspendida", desc: "Diseno flotante de alta seguridad" },
      { name: "Barra Pole Dance", desc: "Profesional y cromada" },
      { name: "Espejos en Techo", desc: "Perspectiva unica" },
      { name: "Sillon del Amor", desc: "Sillon tantrico ergonomico" },
      { name: "Cochera Privada", desc: "Porton automatico directo" },
      { name: "Smart Lights RGB", desc: "Control de colores por control remoto" },
    ],
  },
  neonoir: {
    title: "Suite Tematica Neo-Noir",
    tag: "Tematica",
    price: "S/. 120",
    time: "/ 4 horas",
    desc: "Sumerja su velada en un ambiente cinematografico futurista. Inspirada en la estetica neo-noir de luces de neon y sombras dramaticas, esta suite cuenta con un proyector de cine de alta definicion en la habitacion, jacuzzi privado, cochera con porton automatico y un control domotico inteligente para configurar la musica y las tonalidades de luz a su gusto.",
    images: ["assets/images/rooms/room_thematic_modern.png", "assets/images/hero_bg.png"],
    amenities: [
      { name: "Luces Inteligentes", desc: "Colores y neon personalizables" },
      { name: "Proyector HD", desc: "Cine gigante en cama" },
      { name: "Jacuzzi Privado", desc: "Relajacion con hidromasaje" },
      { name: "Cochera Privada", desc: "Porton automatico directo" },
      { name: "Climatizacion total", desc: "Aire acondicionado silencioso" },
      { name: "Sonido Bluetooth", desc: "Conecte sus propios dispositivos" },
    ],
  },
  matrimonial: {
    title: "Suite Matrimonial Premium",
    tag: "VIP",
    price: "S/. 100",
    time: "/ 4 horas",
    desc: "El escenario ideal para celebraciones de aniversarios, veladas romanticas memorables y noches especiales. Esta suite de primer nivel le ofrece una cama King size sumamente comoda, un gran jacuzzi redondo temperado con luces integradas, y detalles romanticos unicos. Sorprenda a su pareja y disfrute de una noche inolvidable con la total privacidad y el servicio discreto que solo Mango's Suite le ofrece.",
    images: ["assets/images/rooms/room_matrimonial.png", "assets/images/hero_bg.png"],
    amenities: [
      { name: "Jacuzzi Redondo", desc: "Temperado con luces led" },
      { name: "Cama King Size", desc: "Colchon de lujo y confort" },
      { name: "Decoracion Romantica", desc: "Bajo peticion para ocasiones" },
      { name: "Sonido Envolvente", desc: "Bluetooth y fidelidad acustica" },
      { name: "Cochera Privada", desc: "Porton automatico directo" },
      { name: "Smart TV 65\"", desc: "Netflix, YouTube y mas" },
    ],
  },
};

const AMENITY_ICONS = {
  screen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"></rect><path d="m8 2 4 4 4-4"></path></svg>',
  bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16M22 10v10M2 16h20M6 10h12a4 4 0 0 1 4 4v2H2v-2a4 4 0 0 1 4-4Z"></path><path d="M6 10V7h5a3 3 0 0 1 3 3"></path></svg>',
  wellness: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c4.4 0 7-3.2 7-7.1 0-3.1-1.8-5.7-5-8.9.2 2.4-.7 4.2-2.4 5.6.1-3.6-1.6-6.7-4.2-9.1.2 4.1-2.4 6.3-2.4 10.7C5 18.1 7.9 22 12 22Z"></path></svg>',
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3v-5l2-5h14l2 5v5h-2"></path><path d="M5 17h14M7 17v2M17 17v2M5 12h14"></path><circle cx="7" cy="14.5" r="1"></circle><circle cx="17" cy="14.5" r="1"></circle></svg>',
  connectivity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"></path><circle cx="12" cy="20" r="1"></circle><path d="M2 9a14 14 0 0 1 20 0"></path></svg>',
  ambience: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4"></path><path d="M8.2 14.7A6 6 0 1 1 15.8 14.7C14.7 15.5 14 16.4 14 18h-4c0-1.6-.7-2.5-1.8-3.3Z"></path></svg>',
  service: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8l-1 8a3 3 0 0 1-6 0L8 3Z"></path><path d="M12 14v7M9 21h6"></path></svg>',
  climate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M4.2 6.5l15.6 11M19.8 6.5l-15.6 11M8 4l4 4 4-4M8 20l4-4 4 4M3.5 10l5.5 1.5-1.5 5.5M20.5 14l-5.5-1.5 1.5-5.5"></path></svg>',
  default: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="m8 12 2.5 2.5L16 9"></path></svg>',
};

function getAmenityIcon(name) {
  const normalizedName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (/tv|proyector/.test(normalizedName)) return AMENITY_ICONS.screen;
  if (/cama|sillon/.test(normalizedName)) return AMENITY_ICONS.bed;
  if (/sauna|jacuzzi|ducha/.test(normalizedName)) return AMENITY_ICONS.wellness;
  if (/cochera/.test(normalizedName)) return AMENITY_ICONS.car;
  if (/wifi|sonido|bluetooth/.test(normalizedName)) return AMENITY_ICONS.connectivity;
  if (/luz|espejo|decoracion/.test(normalizedName)) return AMENITY_ICONS.ambience;
  if (/bar|bebida|carta|ventanilla/.test(normalizedName)) return AMENITY_ICONS.service;
  if (/aire|climatizacion/.test(normalizedName)) return AMENITY_ICONS.climate;

  return AMENITY_ICONS.default;
}

MangosUI.ready(() => {
  MangosUI.initThemeToggle();
  MangosUI.initMobileDrawer();

  const roomKey = new URLSearchParams(window.location.search).get("room") || "vip";
  const data = ROOMS_DETAILS[roomKey] || ROOMS_DETAILS.vip;

  document.getElementById("detail-room-title").textContent = data.title;
  document.getElementById("detail-room-tag").textContent = data.tag;
  document.getElementById("detail-room-desc").textContent = data.desc;
  document.getElementById("booking-widget-price-val").textContent = data.price;
  document.getElementById("booking-widget-time-val").innerHTML = `<small>${data.time}</small>`;

  const galleryTrack = document.getElementById("gallery-track-container");
  galleryTrack.innerHTML = "";
  data.images.forEach((imgSrc, index) => {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = `${data.title} - Foto ${index + 1}`;
    img.className = `gallery-img ${index === 0 ? "active" : ""}`;
    galleryTrack.appendChild(img);
  });

  let activeImgIndex = 0;
  const images = galleryTrack.querySelectorAll(".gallery-img");
  const showImage = (index) => {
    images[activeImgIndex].classList.remove("active");
    activeImgIndex = index;
    images[activeImgIndex].classList.add("active");
  };

  const prevBtn = document.getElementById("gallery-prev");
  const nextBtn = document.getElementById("gallery-next");
  if (prevBtn && nextBtn && images.length > 1) {
    prevBtn.addEventListener("click", () => {
      showImage((activeImgIndex - 1 + images.length) % images.length);
    });
    nextBtn.addEventListener("click", () => {
      showImage((activeImgIndex + 1) % images.length);
    });
  } else if (images.length <= 1) {
    const controls = document.getElementById("gallery-controls-container");
    if (controls) controls.style.display = "none";
  }

  const amenitiesContainer = document.getElementById("detail-amenities-container");
  amenitiesContainer.innerHTML = "";
  data.amenities.forEach((amenity) => {
    const card = document.createElement("article");
    card.className = "amenity-card";
    card.setAttribute("role", "listitem");

    const icon = document.createElement("span");
    icon.className = "amenity-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = getAmenityIcon(amenity.name);

    const info = document.createElement("div");
    info.className = "amenity-card-info";

    const name = document.createElement("h3");
    name.className = "amenity-card-name";
    name.textContent = amenity.name;

    const description = document.createElement("p");
    description.className = "amenity-card-desc";
    description.textContent = amenity.desc;

    info.append(name, description);
    card.append(icon, info);
    amenitiesContainer.appendChild(card);
  });

  const widgetDatetime = document.getElementById("widget-datetime");
  if (widgetDatetime) widgetDatetime.value = MangosUI.getTomorrowDateTimeValue();

  const submitBtn = document.getElementById("widget-submit-btn");
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const datetimeVal = widgetDatetime ? widgetDatetime.value : "";
      const guestsSelect = document.getElementById("widget-guests");
      const paymentSelect = document.getElementById("widget-payment");

      if (!datetimeVal) {
        alert("Por favor seleccione una fecha y hora para su reserva.");
        return;
      }

      const formatted = MangosUI.formatDateTime(datetimeVal);
      const message = `Hola, quiero reservar la habitacion "${data.title}" para el dia ${formatted.date} a las ${formatted.time} para ${guestsSelect ? guestsSelect.value : ""} (Metodo de pago: ${paymentSelect ? paymentSelect.value : ""}).`;
      MangosUI.openWhatsAppMessage(message);
    });
  }

});

