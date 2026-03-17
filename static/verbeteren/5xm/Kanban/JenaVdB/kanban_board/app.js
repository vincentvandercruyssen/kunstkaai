let gesleepteKaart = null;

// selecties
const input = document.querySelector("#kaartTekst");
const button = document.querySelector("#voegKaartToe");
const todoLijst = document.querySelector("#todo");
const alleLijsten = document.querySelectorAll(".lijst");

// functie: kaart toevoegen
function kaartToevoegen() {
  const tekst = input.value.trim();
  if (!tekst) return;

  const kaart = document.createElement("div");
  kaart.className = "kaart";

  // tekst in kaart
  const span = document.createElement("span");
  span.textContent = tekst;

  // delete knop
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.className = "delete-btn";

  // delete functionaliteit
  deleteBtn.addEventListener("click", () => {
    kaart.remove();
  });

  // elementen toevoegen aan kaart
  kaart.appendChild(span);
  kaart.appendChild(deleteBtn);

  // sleepbaar maken
  maakSleepbaar(kaart);

  // toevoegen aan kolom
  todoLijst.appendChild(kaart);

  input.value = "";
}

// functie: kaart sleepbaar maken
function maakSleepbaar(kaart) {
  kaart.draggable = true;

  kaart.addEventListener("dragstart", (e) => {
    gesleepteKaart = kaart;
    kaart.classList.add("zwevend");
    e.dataTransfer.setData("text/plain", "");
  });

  kaart.addEventListener("dragend", () => {
    kaart.classList.remove("zwevend");
    gesleepteKaart = null;
  });
}

// knop event
button.addEventListener("click", kaartToevoegen);

// drop zones
alleLijsten.forEach((lijst) => {

  lijst.addEventListener("dragover", (e) => {
    e.preventDefault();
    lijst.classList.add("over");
  });

  lijst.addEventListener("dragleave", () => {
    lijst.classList.remove("over");
  });

  lijst.addEventListener("drop", (e) => {
    e.preventDefault();
    lijst.classList.remove("over");

    if (gesleepteKaart) {
      lijst.appendChild(gesleepteKaart);
    }
  });

});