const wrapper = document.getElementById('keywrapper');

window.addEventListener('keydown', (e) => {
    let keyboxes = createKeyBoxElementStr(e.key, "event.key");
    keyboxes += createKeyBoxElementStr(e.keyCode, "event.keyCode");
    keyboxes += createKeyBoxElementStr(e.code, "event.code");

    wrapper.innerHTML = keyboxes;
})


function createKeyBoxElementStr(content, property) {
    return `<div class="keybox">
        <span class="property">${property}</span>
        ${content}
    </div>`
}