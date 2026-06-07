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
