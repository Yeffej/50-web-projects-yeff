/** @type { Array<HTMLAnchorElement> } */
const links = document.querySelectorAll('a.link');
const blocks = document.querySelectorAll('.block');

window.addEventListener('load', () => {
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const href = link.getAttribute('href');
            
            if(href && !href.startsWith('#')) {
                animateTransition().then(() => {
                    window.location.href = href;
                });
            }

        })
    });

    revealPage().then(() => {
        blocks.forEach((block) => block.style.visibility = 'hidden');
    });
})


function resolveTransition (resolve) {
    let resolveBlocks = 0;
    
    blocks.forEach((block) => {
        const transitionendHandler = (e) => {
            resolveBlocks++;

            block.removeEventListener('transitionend' , transitionendHandler)
            
            if(resolveBlocks >= blocks.length) {
                resolve();   
            }
        }

        if(block.classList.contains('reveal')) {
            block.style.visibility = 'visible';
            block.classList.remove('reveal');
        } else {
            block.classList.add('reveal');
        }

        block.addEventListener('transitionend', transitionendHandler);
    });

}

function animateTransition() {
    return new Promise(resolveTransition);
}

function revealPage() {
    return new Promise(resolveTransition);
}