const likeme = document.querySelector(".likeme");
const display = document.getElementById("display");
const heart = document.getElementById("heart");
let likes = 0;
let taptime = 0;
const mouse = { x: 0, y: 0 };

likeme.addEventListener("dblclick", ()=> {
    handleLike() 
});

likeme.addEventListener("touchstart", () => {
    console.log("YOU TAP!")
    if(Date.now() - taptime < 700) {
        return handleLike();
    }

    taptime = Date.now();
})

likeme.addEventListener("pointermove", e => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
});

heart.addEventListener("animationend", ()=> {
    heart.style.animationName = "";
});

function getDisplayMsg(value) {
    return `You liked it ${value} times`;
}

function handleLike() {
    likes++;
    heart.style.left = `${mouse.x}px`;
    heart.style.top = `${mouse.y}px`;
    heart.style.animationName = "HeartLike";
    display.textContent = getDisplayMsg(likes);
}