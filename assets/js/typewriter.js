/**
 * Typewriter Effect – Texto rotativo animado en el Hero
 * ──────────────────────────────────────────────────────
 * Responsabilidad:
 *   Cicla entre frases promocionales escribiéndolas y borrándolas
 *   letra por letra en el elemento #typewriter-text del Hero.
 *
 * Dependencias: Ninguna (vanilla JS puro).
 * Usado en: index.html (sección Hero)
 */
(function () {
  function init() {
    const words = [
      "Mango's Suite.",
      "su refugio de privacidad.",
      "un oasis de elegancia.",
      "el descanso boutique premium.",
    ];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById("typewriter-text");
    let typingSpeed = 100;

    const type = () => {
      if (!typewriterElement) return;

      const currentWord = words[wordIdx];

      if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 50; // Deletes faster
      } else {
        typewriterElement.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 100; // Normal typing speed
      }

      // Word completed, wait, then start deleting
      if (!isDeleting && charIdx === currentWord.length) {
        typingSpeed = 2200; // Pause at the end of word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length; // Rotate word
        typingSpeed = 400; // Pause before typing next word
      }

      setTimeout(type, typingSpeed);
    };

    setTimeout(type, 1000); // Initial delay
  }

  window.MangosHomePage = window.MangosHomePage || {};
  window.MangosHomePage.initTypewriter = init;
})();
