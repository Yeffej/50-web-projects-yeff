const wrapper = document.querySelector(".feedback");
const options = Array.from(document.querySelectorAll(".feedback-option"));
const sendReview = document.getElementById('sendBtn');
let lastSelectedOptIdx = -1;

options.map((option, idx) => {
    option.addEventListener('click', () => {
        option.classList.add('active');

        if(lastSelectedOptIdx >= 0) 
            options[lastSelectedOptIdx].classList.remove('active');

        lastSelectedOptIdx = idx;
    });
});

sendReview.addEventListener('click', ()=> {
    wrapper.innerHTML = getSentReviewHtmlContent(options[lastSelectedOptIdx].textContent);
})

function getSentReviewHtmlContent(selectedFeedback) {
    return (`
        <h3 class="feedback-after-title">💖<br/>Thank You!</h3>
        <div class="feedback-after-option">Feedback: ${selectedFeedback}</div>
        <p class="feedback-after-descrip">We'll use your feedback to improve our customer support</p>    
    `)
}
