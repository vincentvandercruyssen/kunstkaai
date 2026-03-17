let noteId = 0;

function addNote() {
    const text = document.getElementById("noteText").value.trim();
    if (text === "") return;

    const note = document.createElement("div");
    note.className = "note";
    note.draggable = true;
    note.id = "note-" + noteId++;
    note.ondragstart = drag;

    note.innerHTML = `
        <span>${text}</span>
        <button onclick="this.parentElement.remove()">X</button>
    `;

    document.querySelector(".column").appendChild(note);
    document.getElementById("noteText").value = "";
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");
    const note = document.getElementById(id);
    ev.target.closest(".column").appendChild(note);
}



