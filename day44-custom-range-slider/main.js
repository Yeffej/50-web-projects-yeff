const slider = {
    wrapper: document.querySelector('.slider'),
    bar: document.querySelector('.slider-bar'),
    ball: document.querySelector('.slider-ball'),
    display: document.querySelector('.slider-display'),
    _callbacks: [],
    onSlide(callback) {
        this._callbacks.push(callback);
    }
};

let isSliderPress = false;
const sliderMesurements = slider.bar.getBoundingClientRect();

window.addEventListener('mousemove', (e) => {
    if(!isSliderPress) return;

    let mouseSlide = e.clientX - sliderMesurements.x;
    if(mouseSlide < 0) return;
    
    mouseSlide = Math.min(100, mouseSlide * 100 / sliderMesurements.width)

    slider.ball.style.left = `${mouseSlide}%`;
    slider.display.style.left = `${mouseSlide}%`;
    slider.display.textContent = Math.floor(mouseSlide);
    slider.bar.style.setProperty("--slide-width", `${mouseSlide}%`)
    
    slider._callbacks.forEach((callback) => callback(mouseSlide));
})

slider.ball.addEventListener('mousedown', (e) => {
    isSliderPress = true;
});
window.addEventListener('mouseup', (e) => {
    isSliderPress = false;
});

slider.onSlide((slide) => {
    console.log(slide);
    document.body.style.background = `linear-gradient(to right, #0081a7 ${slide}%, #eee 0%)`;
});
