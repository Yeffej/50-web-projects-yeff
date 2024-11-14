
window.addEventListener('DOMContentLoaded', () => {
    // set default theme (light)
    document.documentElement.setAttribute('data-theme', 'light');

    // when the dom loads insert time and date.
    const date = new Date();
    const time = document.querySelector('.time');
    const dateElement = document.querySelector('.date');

    const dateString = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short' });
    const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const day = date.toLocaleDateString("en-us", { day: "2-digit" });

    time.textContent = timeString;
    dateElement.innerHTML = `${dateString} <span>${day}</span>`;

    // activate clock
    activateClock();
})

function activateClock() {
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const secondHand = document.getElementById('secondHand');
    
    setInterval(() => {
        const date = new Date();
        const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();

        const secondsRatio = date.getSeconds() / 60;
        const minutesRatio = (secondsRatio + date.getMinutes()) / 60;
        const hoursRatio = (minutesRatio + hour) / 12;
        setRotation(secondHand, secondsRatio);
        setRotation(minuteHand, minutesRatio);
        setRotation(hourHand, hoursRatio);
    }, 1000);
}

function setRotation(element, rotationRatio) {
    const angle = rotationRatio * 360;
    element.style.setProperty('--rotation',  `${angle}deg`);
}


/* Theme changer */
function toggleTheme(btn) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    // since the theme is dark, switch to light; otherwise switch to dark
    btn.textContent =  isDark? 'Dark Mode' : 'Light Mode';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
}
