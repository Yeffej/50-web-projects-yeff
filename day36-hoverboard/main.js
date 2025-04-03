function handleHoverEnter(elem) {
    elem.dataset.red = Math.floor(Math.random() * 256);
    elem.dataset.green = Math.floor(Math.random() * 256);
    elem.dataset.blue = Math.floor(Math.random() * 256);
    elem.style.backgroundColor = `rgba(${elem.dataset.red}, ${elem.dataset.green}, ${elem.dataset.blue}, 1)`;
}
function handleHoverLeave(elem) {
    elem.style.backgroundColor = "var(--p-color1)";
}

window.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const items = []
    for(let i = 0; i < 30*20; i++) {
        const item = document.createElement("div");
        item.className = "board-item";
        item.onmouseenter = () => handleHoverEnter(item);
        item.onmouseleave = () => handleHoverLeave(item);

        items.push(item);
    }

    board.append(...items);
})