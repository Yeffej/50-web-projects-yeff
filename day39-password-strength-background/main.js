const background = document.querySelector(".background");
const loginForm = document.getElementById("login");
const passwordInput = document.getElementById("password");
const STRENGTH = 8;

// prevent submit behaviour
loginForm.addEventListener("submit", (e) => e.preventDefault());

passwordInput.addEventListener("input", (e) => {
    const len = passwordInput.value.length;
    const diff = STRENGTH-len;

    if(diff >= 0) {
        background.style.filter = `blur(${diff}px)`;
        loginForm.style.backgroundColor = `rgba(255, 255, 255, 0.${diff+1})`;
    }
});
