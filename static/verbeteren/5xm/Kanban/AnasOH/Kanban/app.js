let gesleepteKaart = null;

const input = document.querySelector("#kaartTekst");
const button = document.querySelector("#voegKaartToe");
const todoLijst = document.querySelector("#todo");
const alleLijsten = document.querySelectorAll(".lijst");

function kaartToevoegen() {
  const tekst = input.value.trim();
  if (!tekst) return;

  const kaart = document.createElement("div");
  kaart.className = "kaart";
  kaart.textContent = tekst;

  maakSleepbaar(kaart);
  todoLijst.appendChild(kaart);

  input.value = "";
}

button.addEventListener("click", kaartToevoegen);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    kaartToevoegen();
  }
});

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