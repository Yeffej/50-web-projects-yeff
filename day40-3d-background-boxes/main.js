window.addEventListener("DOMContentLoaded", () => {
    const matrix = 4;
    const wrapper = document.getElementById("boxWrapper");
    const boxItem = document.createElement("div");
    boxItem.className = "box-item";

    const boxElements = Array.from({ length: (matrix*matrix) }, (_, i) => {
        const col = (i) % 4;
        const row = Math.floor(i/4);
        let x = col * 100;
        let y = row * 100;

        boxItem.style.backgroundPosition = `${-x}px ${-y}px`;
        return boxItem.cloneNode();
    });

    wrapper.append(...boxElements);

    const magic = document.getElementById("magicBtn");
    magic.addEventListener("click", () => {
      wrapper.classList.toggle('magic');
    })
});
