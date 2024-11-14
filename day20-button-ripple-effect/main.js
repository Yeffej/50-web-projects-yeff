const rippleBtn = document.querySelector(".ripple");

rippleBtn.addEventListener("click", (e) => {
    // get button (viewport) coordinates
    const { left, top } = rippleBtn.getBoundingClientRect();
    // get click position using event coordinates - button coordinates.
    const x = e.clientX - left;
    const y = e.clientY - top;
    // set the coordinates of the ripple
    rippleBtn.style.setProperty("--x-position", `${x}px`);
    rippleBtn.style.setProperty("--y-position", `${y}px`);

    // animate the ripple
    rippleBtn.classList.add("active");
    rippleBtn.addEventListener("animationend", () => {
        rippleBtn.classList.remove("active");
    });
});