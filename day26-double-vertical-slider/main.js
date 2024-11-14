const sliderImgWrapper = document.getElementById('sliderImgWrapper');
const sliderDescripWrapper = document.getElementById('sliderDescripWrapper');
const slidesDescrip = sliderDescripWrapper.querySelectorAll('.slide');
const slidesImg = sliderImgWrapper.querySelectorAll('.slide');

const sliderStepPercentage = getSliderStepInPercentage(slidesDescrip.length, slidesImg.length);
const MAX_PECENTAGE = 100 - sliderStepPercentage;
const MIN_PERCENTAGE = 0;

const slider = {
    sliderDescrip: 0,
    sliderImg: 0,
}


function applySliderPositions() {
    sliderImgWrapper.style.transform = `translateY(${slider.sliderImg * - 1}%)`;
    sliderDescripWrapper.style.transform = `translateY(${slider.sliderDescrip * -1}%)`;
}

function slideDown() {
    slider.sliderDescrip += sliderStepPercentage;
    slider.sliderImg -=  sliderStepPercentage;

    if(slider.sliderImg < MIN_PERCENTAGE) {
        slider.sliderImg = MAX_PECENTAGE;
    }
    if(slider.sliderDescrip > MAX_PECENTAGE) {
        slider.sliderDescrip = MIN_PERCENTAGE;
    }

    applySliderPositions();
}

function slideUp() {
    slider.sliderDescrip -= sliderStepPercentage;
    slider.sliderImg +=  sliderStepPercentage;

    if(slider.sliderDescrip < MIN_PERCENTAGE) {
        slider.sliderDescrip = MAX_PECENTAGE;
    }
    if(slider.sliderImg > MAX_PECENTAGE) {
        slider.sliderImg = MIN_PERCENTAGE;
    }

    applySliderPositions();
}

function getSliderStepInPercentage(slidesDescripQuantity, slidesImgQuantity) {
    if (slidesDescripQuantity !== slidesImgQuantity) {
        console.error("The sliders are not equal in quantity, It is not posible to paired them.");
        return 0;
    }

    if(slidesDescrip.length < 1) {
        console.log("There's not slides in the slider");
        return 0;
    }

    return  100 / slidesImgQuantity
}


window.addEventListener('DOMContentLoaded', ()=> {
    const middleSlide =  Math.floor(slidesImg.length / 2) - 1;
    slider.sliderDescrip = MIN_PERCENTAGE + (sliderStepPercentage * middleSlide);
    slider.sliderImg = MAX_PECENTAGE - (sliderStepPercentage * middleSlide);

    applySliderPositions()
})
