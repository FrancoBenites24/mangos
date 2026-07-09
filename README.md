# Mango's Suite | Hotel Boutique & Suites Premium en Piura

Sitio web estático premium y de alto impacto visual desarrollado para **Mango's Suite**, hotel boutique de lujo en Piura, Perú. Optimizado para la conversión móvil, discreción absoluta y navegación inmersiva.

## 🚀 Características Principales

*   **Fondo de Video Hero Fluido**: Una experiencia envolvente de pantalla completa con un bucle continuo de las instalaciones (optimizado para no mostrar controles y reproducirse autónomamente).
*   **Barra de Reservas Flotante Minimalista e Inteligente**:
    *   Fondo de vidrio esmerilado (`backdrop-filter: blur(20px)`) con bordes dorados tenues.
    *   Contracción inteligente al salir de la sección de cabecera (Hero), mostrando únicamente un elegante botón de "Reservar".
    *   Expansión interactiva y recopilación de datos (fecha, hora, tipo de habitación, número de huéspedes) para enviar directamente a WhatsApp con un mensaje preconfigurado.
*   **Showcase Interactivo de Servicios (Efecto Desplazamiento Físico)**:
    *   Menú de navegación vertical numerado del `01` al `05` con subrayado de progreso dorado.
    *   Carrusel autónomo con desvanecimiento cruzado de imágenes del servicio activo.
    *   Efecto de transición física "Bote al Anterior": al cambiar de servicio, el contenido antiguo se desplaza a la izquierda y el nuevo entra desde la derecha mediante animaciones GSAP.
*   **Sección de Habitaciones con Filtros Dinámicos**:
    *   Cuadrícula de 6 suites de lujo (Simple Standard, VIP Executive, Spa Sauna & Jacuzzi, Temáticas Fantasía/Neo-Noir, Matrimonial Premium).
    *   Filtros pastilla interactivos para cambiar al instante de categoría.
    *   Botón "Ver Más Habitaciones" integrado con WhatsApp.
*   **Carrusel de Historias 3D Bipiramidal**:
    *   Presentación tridimensional interactiva y rotativa de testimonios.
    *   Muestra **5 tarjetas simultáneas** en pantallas de escritorio con escala de profundidad y perspectiva 3D, y se reduce dinámicamente a **3 tarjetas** en móviles para una lectura óptima.
*   **Pie de Página (Footer) Moderno**:
    *   Dividido en tres columnas principales (Resumen/Enlaces, Logo/Sociales/Contacto, Ubicación con un mapa en escala de grises de Google Maps).
*   **CSS Scroll Snap Nativo**:
    *   Desplazamiento vertical fluido de tipo imán que alinea el navegador automáticamente al inicio de cada sección principal.
*   **Ocultación de Elementos en Móviles**:
    *   La tarjeta de información en la cabecera (Hero Card) se oculta en pantallas móviles para dar protagonismo total al video promocional del establecimiento.

## 🛠️ Tecnologías Utilizadas

*   **HTML5** (Semántica estructurada y SEO optimizado)
*   **CSS3 Vanilla** (Arquitectura responsiva, HSL colores, transiciones aceleradas por GPU, Scroll Snapping)
*   **JavaScript ES6** (Lógica interactiva, control de estados y eventos)
*   **GSAP (GreenSock Animation Platform)** (Efectos de entrada, spotlight mask y transiciones del showcase de servicios)
*   **Three.js** (Renderizado interactivo de esfera WebGL en segundo plano)

## 📂 Estructura del Proyecto

*   `index.html` - Maquetación y estructura principal
*   `styles.css` - Estilos del sitio y consultas responsivas (@media)
*   `script.js` - Lógica de interacciones, carruseles, filtros y WhatsApp
*   `assets/` - Recursos visuales (imágenes de suites, servicios, testimonios y video promocional)

## 🌐 Publicación en GitHub Pages

Para publicar este proyecto en **GitHub Pages**:
1.  Suba todos los archivos a este repositorio de GitHub.
2.  Vaya a la pestaña **Settings** (Configuración) de su repositorio en GitHub.
3.  En la barra lateral izquierda, seleccione **Pages**.
4.  Bajo la sección **Build and deployment**, elija la rama `main` y la carpeta `/ (root)` como origen.
5.  Haga clic en **Save** (Guardar).
6.  En unos minutos, su sitio web estará en línea en la URL proporcionada por GitHub.
