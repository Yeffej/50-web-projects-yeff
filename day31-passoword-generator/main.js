const display = document.getElementById('display');
const btn = document.getElementById('btnGen');
/** @type { Array<HTMLInputElement> } */
const fields = document.querySelectorAll('.field input');


// CODE ASICII
const codes = {
    symbols: {
        from: 33,
        to: 47
    },
    numbers: {
        from: 48,
        to: 57
    },
    uppercase: {
        from: 65,
        to: 90
    },
    lowercase: {
        from: 97,
        to: 122
    }
}

btn.addEventListener('click', generatePassword);

function readFields() {
    const read = {};
    fields.forEach((field) => {
        if(field.type == 'number') {
            read[field.name] = field.value
        } else {
            read[field.name] = field.checked;
        }
    })

    return read;
}

function generatePassword() {
    const read = readFields();
    let password = "";
    const len = Number(read['length']);

    // I not longer need it then only boolean values are left
    delete read['length'];

    const options = [];
    for(const key in read) {
        if(read[key]) {
            options.push(key);
        }
    }


    for(let i = 0; i < len; i++) {
        if(options.length < 1) break;

        const optIdx = Math.floor(Math.random() * options.length);
        const optionCode = codes[options[optIdx]];

        const code = optionCode.from + Math.floor(
            Math.random() * (optionCode.to - optionCode.from + 1)
        );

        const c = String.fromCharCode(code);
        // console.log(`code: ${code}, char: ${c}, opt: ${options[optIdx]}`);
        password += c;
    }

    display.value = password;
}
