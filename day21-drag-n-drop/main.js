// TODO: MAKE IT WORK IN MOBILE DEVICES

function dragstartHandler(e) {
    // Add the target element's id to the data transfer object
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.effectAllowed = "move";
}

function dragoverHandler(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.target.classList.add('active');
}

function dragleaveHandler(e) {
    e.target.classList.remove('active');
}

function dropHandler(e) {
    e.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = e.dataTransfer.getData("text/plain");
    const obj = document.getElementById(data);
    e.target.appendChild(obj);

    // Remove the active class
    e.target.classList.remove('active');
}