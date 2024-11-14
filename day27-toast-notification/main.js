const messages = [
    'Message one',
    'Message two',
    'Message three',
    'Message four',
    'Message five',
    'Message six'
]

const colorTypeMsg = [
    '#aa0000',
    '#f400e8',
    '#abaa00',
    '#00aa12'
]

const ntfWrapper = document.getElementById('ntfWrapper');

function showNotification() {
    const chosenMsg = messages[ Math.floor(Math.random() * messages.length) ];
    const chosenColor = colorTypeMsg[ Math.floor(Math.random() * messages.length) ];

    const ntf = document.createElement('div');
    ntf.className = 'message';
    ntf.textContent = chosenMsg;
    ntf.style.color = chosenColor;

    ntfWrapper.appendChild(ntf);

    setTimeout(() => ntf.remove(),  4000);
}

