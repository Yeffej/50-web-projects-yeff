const socialCounters = {
    x: 12000,
    youtube: 5000,
    facebook: 7500
}

window.addEventListener('DOMContentLoaded', () => {
    // obj to save intervals id by socials
    // const intervals = {}

    for (const social in socialCounters) {
        if (Object.prototype.hasOwnProperty.call(socialCounters, social)) {
            const totalQ = socialCounters[social];
            const domElement = document.getElementById(social);
            let quantity = 0;

            // set an interval to realize an animation until reach total quantity.
            // intervals[social] = setInterval(() => {
            //     if(quantity >= totalQ) {
            //         clearInterval(intervals[social]);
            //     }
                
            //     domElement.textContent = quantity;
            //     quantity += 4;
            // }, .5);

            // do the same of above using requestAnimationFrame
            let start;
            const endAnimationTime = 2 * 1000; // end of the animation in miliseconds

            const animate = (timestamp) => {    
                if (start === undefined) {
                    start = timestamp;
                }

                const elapsed = timestamp - start;
                const shift = Math.ceil(Math.min( (totalQ/endAnimationTime) * elapsed, totalQ));
                
                domElement.textContent = quantity;
                quantity = shift;

                if(quantity <= totalQ) {
                    requestAnimationFrame(animate);
                }

            }

            requestAnimationFrame(animate);
        }
    }
})