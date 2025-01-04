const wrapper = document.querySelector(".notes");
const notes = []
let AUTO_ID = 0; // help add unique identifier to notes. 

window.addEventListener("DOMContentLoaded", () => {
    let storedNotes = localStorage.getItem("notes");
    const autoid = localStorage.getItem("auto_id_notes");
    
    if(Number(autoid)) AUTO_ID = Number(autoid);
    if(!storedNotes) return;

    storedNotes = JSON.parse(storedNotes);
    if(storedNotes.length < 1) return;

    storedNotes.forEach(note => {
        addNote(note);
    });
});

function addNote(data = {}) {
    const note = createNoteElement();
    note.dataset.id = data["id"] ?? AUTO_ID;
    const len = notes.push(note);

    // set body
    const body = note.querySelector(".note-body"); //div
    const writable = note.querySelector(".note-body.writable"); //textarea
    writable.value = data["body"] ?? "";
    body.textContent = writable.value;

    // set buttons
    const btnWrite = note.querySelector(".write"); 
    btnWrite.onclick = () => toggleWriteOnNote(len - 1);
    const btnDelete = note.querySelector(".delete");
    btnDelete.onclick = () => deleteNote(len - 1);

    wrapper.appendChild(note);

    saveNotes();
}

function toggleWriteOnNote(idx) {
    const note = notes[idx];
    const body = note.querySelector(".note-body"); //div
    const writable = note.querySelector(".note-body.writable"); //textarea

    if(writable.style.display == "none") {
        body.style.display = "none";
        writable.style.display = "block";
    } else {
        body.textContent = writable.value;
        writable.style.display = "none";
        body.style.display = "block";

        saveNotes();
    }

}

function deleteNote(idx) {
    const note = notes[idx];
    notes.splice(idx, 1, null); // delete from array
    note.remove() // delete from DOM

    saveNotes()
}

/**
 * Creates a new note element and increment the unique ID index (AUTO_ID).
 * @returns {HTMLElement} The created note element with appropriate classes and structure.
 */

function createNoteElement() {
    const note = document.createElement("div");
    note.className = "note";
    note.innerHTML = `
        <div class="note-head">
            <button class="write"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="note-body"></div>
        <textarea class="note-body writable" style="display: none;"></textarea>
    `;
        
    AUTO_ID++; // increment unique ID index
    return note;
}

function saveNotes() {
    let sNotes =  notes.filter(note => !!note); // delete all the null values if any
    sNotes = sNotes.map(note => serializeNote(note));
    
    // save notes in local storage
    const jsonNotes =  JSON.stringify(sNotes);
    localStorage.setItem("notes", jsonNotes);

    // save auto_id in local storage
    localStorage.setItem("auto_id_notes", AUTO_ID);
}

function serializeNote(note) {
    const data = {
        id: Number(note.dataset.id),
        body: ""
    };
    
    const writable = note.querySelector(".note-body.writable"); //textarea
    data.body = writable.value;

    return data;
}