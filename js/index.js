'use strict';

// ************* MENÚ RESPONSIVE *************

const headerBtn = document.querySelector('.header__button')
const headerNav = document.querySelector('.header__nav')

// Inicializamos el estado aria-expanded
headerBtn.setAttribute('aria-expanded', 'false')

headerBtn.addEventListener('click', function () {
  const isActive = headerNav.classList.toggle('isActive')
  // Cambiamos el aria-expanded según el estado
  headerBtn.setAttribute('aria-expanded', isActive)
})

// ************* FIN MENÚ RESPONSIVE *************


// CARRUSEL

'use strict';

(function () {
  document.querySelectorAll('.carousel').forEach(initCarousel);

  function initCarousel(carousel) {

    const slidesEl = carousel.querySelector('.slides');
    const slideEls = Array.from(carousel.querySelectorAll('.slide'));
    const count = slideEls.length;
    let current = 0;

    const btnPrev = carousel.querySelector('.btn.prev');
    const btnNext = carousel.querySelector('.btn.next');
    const pageIndicator = carousel.querySelector('.page-indicator');

    const leftZone = carousel.querySelector('.left-zone');
    const rightZone = carousel.querySelector('.right-zone');

    // ---------- Navegación ----------
    function updatePageIndicator() {
      pageIndicator.textContent = `${current + 1} / ${count}`;
    }

    function updateTransform(animate = true, extraPercent = 0) {
      const base = -current * 100;
      const totalPercent = base + extraPercent;
      slidesEl.style.transition = animate ? 'transform 0.35s ease' : 'none';
      slidesEl.style.transform = `translateX(${totalPercent}%)`;
    }

    function goTo(index) {
      current = Math.max(0, Math.min(count - 1, index));
      updateTransform(true, 0);
      updatePageIndicator();
    }

    btnNext.addEventListener('click', () => {
      goTo((current + 1) % count);
    });

    btnPrev.addEventListener('click', () => {
      goTo((current - 1 + count) % count);
    });

    // ---------- Click izquierda/derecha ----------
    leftZone.addEventListener('click', () => {
      goTo((current - 1 + count) % count);
    });

    rightZone.addEventListener('click', () => {
      goTo((current + 1) % count);
    });

    // ---------- Swipe ----------
let pointerDown = false;
let startX = 0;
let deltaX = 0;
let width = carousel.clientWidth;

carousel.addEventListener('pointerdown', (e) => {
  pointerDown = true;
  startX = e.clientX;
  deltaX = 0;

  // IMPORTANTE: NO usamos pointerCapture
  slidesEl.style.transition = 'none';
});

carousel.addEventListener('pointermove', (e) => {
  if (!pointerDown) return;

  deltaX = e.clientX - startX;
  const percent = (deltaX / width) * 100;
  updateTransform(false, percent);
});

function endSwipe(e) {
  if (!pointerDown) return;
  pointerDown = false;

  const threshold = width * 0.12;

  if (deltaX < -threshold) goTo((current + 1) % count);
  else if (deltaX > threshold) goTo((current - 1 + count) % count);
  else goTo(current);

  deltaX = 0;
}

carousel.addEventListener('pointerup', endSwipe);
carousel.addEventListener('pointerleave', endSwipe);
carousel.addEventListener('pointercancel', endSwipe);



    // Recalcular ancho en resize
    window.addEventListener('resize', () => {
      width = carousel.clientWidth;
      updateTransform(false, 0);
    });

    // Inicial
    updatePageIndicator();
    updateTransform(false, 0);
  }
})();
