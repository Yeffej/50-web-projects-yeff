const circleWrapper = document.querySelector('.circle-wrapper');
const wrapper = document.querySelector('.wrapper');
const menu = document.querySelector('.menu');

function openMenu() {
    wrapper.style.transform = 'rotate(-30deg)';
    circleWrapper.style.transform = 'translate(-50%, -50%) rotate(-90deg)';
    menu.classList.add('active');
}

function closeMenu() {
    circleWrapper.style.transform = 'translate(-50%, -50%)  rotate(0deg)';
    wrapper.style.transform = 'rotate(0deg)';
    menu.classList.remove('active');
}
