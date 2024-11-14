let activeCard = null;

window.addEventListener('DOMContentLoaded', () =>{
    // Get all cards 
    const cards = document.querySelectorAll('.card')
    // iterate over the cards and assign a click event listener
    cards.forEach((el)=> {
        el.addEventListener('click', ()=> {
            // remove active card if there's any. 
            if(activeCard && activeCard !== el) {
                activeCard.classList.remove('active')
                activeCard = null
            }

            // activate the card and assigned as the activeCard.
            el.classList.toggle('active')
            activeCard = el
        })
    })
})