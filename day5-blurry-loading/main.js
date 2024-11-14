// LAZY LOADING WITH BLUR EFFECT 

const bg = document.getElementById('bgImg');
const indicator = document.getElementById('indicator');


window.addEventListener("load", () => {
    // create an image element and request the image inside it to be able to track it.
    const img = new Image();
    const imgSrc = 'https://images.unsplash.com/photo-1576161787924-01bb08dad4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2104&q=80';
    
    let progress = 0;
    let loaded = false
    const animation = setInterval(() => {
        if(progress > 99 && loaded) {
            // remove indicator
            indicator.textContent = "";
            // stop animation
            return clearInterval(animation);
        };

        if(progress > 99) return;

        const blur = Math.floor(mappedValue(progress, 0, 99, 40, 0));
        const opacity = mappedValue(progress, 0, 99, 1, 0.4);
        bg.style.filter = `blur(${blur}px)`
        indicator.textContent = `${progress}%`;
        indicator.style.opacity = opacity;
        progress++;
    }, 50)

    img.onload = (e) => {
        // load the img now that it is fully loaded.
        bg.style.background = `url(${imgSrc}) no-repeat center center / cover`;
        loaded = true;
    }
    
    img.src = imgSrc;

})


// using the interpolation mathematical function map values from a range to another. 
function mappedValue(value, minInRange, maxInRange, minOutRange, maxOutRange) {
    // value: The input value (number) to scale
    // minInRange: The minimum value of the input range
    // maxInRange: The maximum value of the input range
    // minOutRange: The minimum value of the output range
    // maxOutRange: The maximum value of the output range

    return (value - maxInRange) * (maxOutRange - minOutRange) / (maxInRange - minInRange) + maxOutRange;
}
