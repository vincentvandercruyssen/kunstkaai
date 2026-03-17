


const input = document.getElementById("kaartTekst");
const addBtn = document.getElementById("voegKaartToe");
const todo = document.getElementById("todo");
const lijsten = document.querySelectorAll(".lijst");

let draggedCard = null;

//card adding
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  const kaart = createCard(text);
  todo.appendChild(kaart);
  input.value = "";
});

function createCard(text) {
  const kaart = document.createElement("div");
  kaart.className = "kaart";
  kaart.draggable = true;

  const span = document.createElement("span");
  span.textContent = text;

  const del = document.createElement("button");
  del.textContent = "✕";
  del.className = "verwijder";
  del.addEventListener("click", () => kaart.remove());

  kaart.append(span, del);

  // drag events
  kaart.addEventListener("dragstart", () => {
    draggedCard = kaart;
    kaart.classList.add("zwevend");
  });

  kaart.addEventListener("dragend", () => {
    draggedCard = null;
    kaart.classList.remove("zwevend");
  });

  return kaart;
}

//drop zones
lijsten.forEach(lijst => {
  lijst.addEventListener("dragover", e => {
    e.preventDefault();
    lijst.classList.add("over");
  });

  lijst.addEventListener("dragleave", () => {
    lijst.classList.remove("over");
  });

  lijst.addEventListener("drop", () => {
    lijst.classList.remove("over");
    if (draggedCard) lijst.appendChild(draggedCard);
  });
});
