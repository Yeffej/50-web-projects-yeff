const cardList = document.querySelectorAll('.card');

window.addEventListener('scroll', (e) => {
    cardList.forEach((card) => {
        const { top, bottom } = card.getBoundingClientRect();
        // check if the element is into the current viewport.
        if((top > 0 && top < window.innerHeight) &&
         (bottom > 0 && bottom <= window.innerHeight)) {
            card.classList.add('show');
        } else {
            card.classList.remove('show');
        }
    });
});