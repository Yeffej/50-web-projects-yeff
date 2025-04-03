const codesForm = document.getElementById('codesForm');
const codes = Array.from(codesForm.elements);
const ALLOW_CHARS = "0123456789";

codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
        // console.log(e.key);
        if(e.key == "Backspace") {
            if (code.value.length > 0) {
                // remove active class
                code.classList.remove('active');
                return true;
            }
            // go back
            const prevIdx = idx-1
            if(prevIdx < 0) return true;
            codes[prevIdx].focus();
        }

        if(!ALLOW_CHARS.includes(e.key) || code.value.length > 0) {
            return e.preventDefault();
        }

        // add active class
        code.classList.add('active');

        // go next
        const nextIdx = idx + 1
        if(nextIdx >= codes.length) return true;
        setTimeout(() => {
            codes[nextIdx].focus();
        }, 100);
    })
});
