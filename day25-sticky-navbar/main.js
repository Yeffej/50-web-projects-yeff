const header  = document.querySelector('header');

window.addEventListener('scroll', (e) => {
    header.classList.toggle('sticky', window.scrollY > 100);
})