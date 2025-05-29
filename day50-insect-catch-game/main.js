const INSECTS = [
    {
        name: "Fly",
        img: "https://pngimg.com/uploads/fly/fly_PNG3946.png"
    },
    {
        name: "Mosquito",
        img: "http://pngimg.com/uploads/mosquito/mosquito_PNG18175.png"
    },
    {
        name: "Spider",
        img: "http://pngimg.com/uploads/spider/spider_PNG12.png"
    },
    {
        name: "Roach",
        img: "http://pngimg.com/uploads/roach/roach_PNG12163.png"
    }
]


class Enemy {
    #onRemoveSub = []

    constructor(type = INSECTS[0].name) {
        this.insect = INSECTS.find((i) => i.name === type);
        this.size = Math.random() * 50 + 50;
        this.#createDomElement();
    }

    #createDomElement() {
        this.domEl = document.createElement('figure');
        this.domEl.className = 'enemy';

        const x = Math.max(
            this.size,
            Math.floor(Math.random() * (window.innerWidth - this.size))
        );
        const y = Math.max(
            this.size,
            Math.floor(Math.random() * (window.innerHeight - this.size))
        );


        console.log('x:', x)
        console.log('y:', y)

        this.domEl.style.width = `${this.size}px`;
        this.domEl.style.height = `${this.size}px`;
        this.domEl.style.top = `${Math.min(y, window.innerHeight - this.domEl.clientHeight)}px`;
        this.domEl.style.left = `${Math.min(x, window.innerHeight - this.domEl.clientWidth)}px`;

        const img = document.createElement('img');
        img.src = this.insect.img;
        this.domEl.appendChild(img);

        let isRemove = false;
        this.domEl.addEventListener('click', () => {
            this.domEl.style.animation = 'Disappear 500ms linear forwards';
            isRemove = true
        });

        this.domEl.addEventListener('animationend', () => {
            if(isRemove) {
                this.domEl.remove();
                this.#onRemoveSub.forEach(callback => callback());
                isRemove = false;
            }
        })
    }

    insertToDom(wrapper) {
        wrapper.appendChild(this.domEl);
    }

    onRemove(callback) {
        this.#onRemoveSub.push(callback);
    }
}


const insectsWrapper = document.querySelector('.insects');
const time = document.getElementById('gameTime');
const score = document.getElementById('gameScore');
const scene = document.getElementById('scene');

const SCREENS = 3;
let screenIdx = 0;
let selectedInsect = INSECTS[0].name;

insectsWrapper.append(...INSECTS.map(createInsectBtn));

function createInsectBtn({ name, img }) {
    const btn = document.createElement('button');
    btn.className = "play-btn insect";
    btn.onclick = () => {
        selectedInsect = name;
        nextScreen();
    }
    btn.innerHTML = `
        <h4 class="insect-name">${name}</h4>
        <img src="${img}" alt="${name} insect">
    `;

    return btn;
}

function nextScreen() {
    screenIdx++;
    if(screenIdx >= SCREENS) return console.log("You are in the final Screen.");
    window.scrollTo(0, window.innerHeight * screenIdx);
    if(screenIdx == SCREENS-1) startGame();
}

function getTimeFormat(count) {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;

    let minStr = minutes.toString();
    minStr = minStr.padStart(2, '0');
    
    let secStr = seconds.toString();
    secStr = secStr.padStart(2, '0');
    
    return minStr + ':' + secStr;
}

const game = {
    score: 0,
    time: '',
    enemies: 0,
    maxEnemies: 1, 
}

function startGame() {
    // count time by seconds from 00:00
    let count = 0;
    setInterval(() => {
        count++;
        game.time = getTimeFormat(count);
        time.textContent = game.time;
    }, 1000)

    setInterval(() => {
        if(game.enemies >= game.maxEnemies) return;
        const enemy = new Enemy(selectedInsect);
        enemy.insertToDom(scene);

        enemy.onRemove(() => {
            game.enemies--;
            game.maxEnemies++;
            game.score++;
            score.textContent = game.score;
        });

        game.enemies++;
    }, 500)
}

