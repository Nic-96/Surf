const openMenu = document.querySelector('.hamburger');
const menu = document.querySelector('.fullscreen-menu');
const closeMenu=document.querySelector('.fullscreen-menu__close')

openMenu.addEventListener('click', function(e) {
    menu.classList.toggle('active');
})

closeMenu.addEventListener('click', function(e) {
    menu.classList.toggle('active');
})


