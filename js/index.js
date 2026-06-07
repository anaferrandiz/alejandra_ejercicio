'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // ************* MENÚ *************
  const headerBtn = document.querySelector('.header__button')
  const headerNav = document.querySelector('.header__nav')

  if (headerBtn && headerNav) {
    headerBtn.setAttribute('aria-expanded', 'false')
    headerBtn.addEventListener('click', function () {
      const isActive = headerNav.classList.toggle('isActive')
      headerBtn.setAttribute('aria-expanded', isActive)
    })
  }

  // ************* CARRUSEL *************
  document.querySelectorAll('.carousel').forEach(initCarousel)

  function initCarousel(carousel) {
    const slidesEl = carousel.querySelector('.slides')
    const slideEls = Array.from(carousel.querySelectorAll('.slide'))
    const count = slideEls.length
    let current = 0
    let width = carousel.clientWidth

    function updateTransform(animate = true, extraPercent = 0) {
      const totalPercent = (-current * 100) + extraPercent
      slidesEl.style.transition = animate ? 'transform 0.35s ease' : 'none'
      slidesEl.style.transform = `translateX(${totalPercent}%)`
    }

    function goTo(index) {
      current = (index + count) % count
      updateTransform(true)
    }

    let pointerDown = false
    let startX = 0
    let deltaX = 0

    carousel.addEventListener('pointerdown', (e) => {
      pointerDown = true
      startX = e.clientX
      deltaX = 0
      slidesEl.style.transition = 'none'
    })

    carousel.addEventListener('pointermove', (e) => {
      if (!pointerDown) return
      deltaX = e.clientX - startX
      updateTransform(false, (deltaX / width) * 100)
    })

    function endSwipe() {
      if (!pointerDown) return
      pointerDown = false
      const threshold = width * 0.12

      if (deltaX < -threshold) goTo(current + 1)
      else if (deltaX > threshold) goTo(current - 1)
      else goTo(current + 1)

      deltaX = 0
    }

    carousel.addEventListener('pointerup', endSwipe)
    carousel.addEventListener('pointerleave', endSwipe)
    carousel.addEventListener('pointercancel', endSwipe)

    window.addEventListener('resize', () => {
      width = carousel.clientWidth
      updateTransform(false)
    })

    updateTransform(false)
  }

})