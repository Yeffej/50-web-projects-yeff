window.addEventListener('DOMContentLoaded', () => {
    const labels = document.querySelectorAll('.form-field label');
    labels.forEach((label) => {
        label.innerHTML = label.textContent.split('').map(
            (word, idx) => {
                if(word === ' ') {
                    word = '&nbsp;'
                }

                return `<span style="transition-delay: ${50 * idx}ms;">${word}</span>`
            }
        ).join('');
    })
})


function activateField(inputEl) {
    const formField = inputEl.parentElement;
    formField.classList.add('active');
}

function deactivateField(inputEl) {
    const formField = inputEl.parentElement;
    formField.classList.remove('active');
}

