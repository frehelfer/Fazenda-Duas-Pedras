const mobileMenuBtn = document.querySelector('.mobile-menu-btn')
const mobileMenuAside = document.querySelector('.mobile-menu')

mobileMenuBtn.addEventListener('click', function () {
  mobileMenuAside.classList.toggle('open');
})