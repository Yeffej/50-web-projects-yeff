const slidesSrc = [
    'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
    'https://images.unsplash.com/photo-1495467033336-2effd8753d51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    'https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80',
    'https://images.unsplash.com/photo-1559087867-ce4c91325525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
];

const main = document.getElementById('main');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
let position = 0;

window.addEventListener("DOMContentLoaded", () => {
    changePosition(false, true);
});

leftBtn.addEventListener('click', () => changePosition(true));

rightBtn.addEventListener('click', () => changePosition());

// change slide position by default the position direction will be right
function changePosition(left = false, initial = false) {
    if(initial && position === 0) {
        return main.style.backgroundImage = `url(${slidesSrc[position]})`;
    }

    if(left) {
        position--;
        if(position < 0) {
            position = slidesSrc.length - 1;
        }
    } else {
        position++;
        if(position > slidesSrc.length - 1) {
            position = 0;
        }
    }

    main.style.backgroundImage = `url(${slidesSrc[position]})`;
}