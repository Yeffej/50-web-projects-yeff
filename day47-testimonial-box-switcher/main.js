const API = 'https://testimonialapi.vercel.app/api';
const AVATAR_BASE = 'https://randomuser.me/api/portraits/med';
const wrapper = document.getElementById('wrapper');
let currTesIdx = 0;
let round = false;

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await getTestimonials();
        setInterval(() => {
            // change the avatar src
            if (!round) {
                const gender = Number(data[currTesIdx].id) % 2 == 0? 'women' : 'men';
                data[currTesIdx].avatar = `${AVATAR_BASE}/${gender}/${data[currTesIdx].id}.jpg`;
            }
            wrapper.innerHTML = createTestimonialHtmlStr(data[currTesIdx]);

            if(currTesIdx+1 >= data.length) {
                currTesIdx = 0;
                round = true;
            } else {
                currTesIdx++;
            }
        }, 10 * 1000);
    } catch (err) {
        console.error(err);
    }

})

async function getTestimonials() {
    const res = await fetch(API);
    return res.json();
}

function createTestimonialHtmlStr({ name, designation, avatar, message, rating }) {
    return `
    <div class="testimonial-timer" id="timer"></div>
    <p class="testimonial-content">
        ${message}
    </p>
    <div class="testimonial-author">
        <figure class="testimonial-author-avatar">
            <img src="${avatar}" alt="author avatar">
        </figure>
        <div>
            <h4 class="testimonial-author-name">${name}</h4>
            <span class="testimonial-author-position">${designation}</span>
        </div>
    </div>
    `
}