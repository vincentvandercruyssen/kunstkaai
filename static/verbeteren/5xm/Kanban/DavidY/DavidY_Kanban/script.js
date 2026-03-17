// Houdt bij welke kaart we aan het slepen zijn
let gesleepteKaart = null;

// Elementen ophalen
const input = document.querySelector("#kaartTekst");
const button = document.querySelector("#voegKaartToe");
const todoLijst = document.querySelector("#todo");
const alleLijsten = document.querySelectorAll(".lijst");

// Popup verwijderen
const popup = document.querySelector("#popupVerwijder");
const popupJa = document.querySelector("#popupJa");
const popupNee = document.querySelector("#popupNee");

// Popup bewerken
const popupEdit = document.querySelector("#popupEdit");
const editInput = document.querySelector("#editInput");
const editOpslaan = document.querySelector("#editOpslaan");
const editAnnuleren = document.querySelector("#editAnnuleren");

// Kaarten die bewerkt/verwijderd worden
let kaartDieVerwijderdWordt = null;
let kaartDieBewerktWordt = null;

// Kleuren voor labels
const kleuren = ["#ffd966", "#b6d7a8", "#a4c2f4", "#f4cccc"];

// Kaart toevoegen aan "Te doen"
function kaartToevoegen() {
  const tekst = input.value.trim();
  if (!tekst) return;

  const kaart = document.createElement("div");
  kaart.className = "kaart";
  kaart.textContent = tekst;

  // Random kleur aan de linkerkant
  kaart.style.borderLeft = `12px solid ${kleuren[Math.floor(Math.random() * kleuren.length)]}`;

  maakSleepbaar(kaart);
  kaartActies(kaart);

  todoLijst.appendChild(kaart);
  input.value = "";
}

// Klik op knop = kaart toevoegen
button.addEventListener("click", kaartToevoegen);

// Enter = kaart toevoegen
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") kaartToevoegen();
});

// Maakt een kaart sleepbaar
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

// Extra functionaliteit voor elke kaart
function kaartActies(kaart) {
  // Dubbelklik = edit popup
  kaart.addEventListener("dblclick", () => {
    kaartDieBewerktWordt = kaart;
    editInput.value = kaart.textContent;
    popupEdit.classList.remove("hidden");
    setTimeout(() => editInput.select(), 10);
  });

  // Rechtsklik = delete popup
  kaart.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    kaartDieVerwijderdWordt = kaart;
    popup.classList.remove("hidden");
  });
}

// Popup verwijderen
popupNee.addEventListener("click", () => {
  popup.classList.add("hidden");
  kaartDieVerwijderdWordt = null;
});

popupJa.addEventListener("click", () => {
  if (kaartDieVerwijderdWordt) kaartDieVerwijderdWordt.remove();
  popup.classList.add("hidden");
  kaartDieVerwijderdWordt = null;
});

// Popup bewerken
editAnnuleren.addEventListener("click", () => {
  popupEdit.classList.add("hidden");
  kaartDieBewerktWordt = null;
});

editOpslaan.addEventListener("click", () => {
  const nieuweTekst = editInput.value.trim();
  if (nieuweTekst !== "" && kaartDieBewerktWordt) {
    kaartDieBewerktWordt.textContent = nieuweTekst;
  }
  popupEdit.classList.add("hidden");
  kaartDieBewerktWordt = null;
});

// Dropzones instellen
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
    if (gesleepteKaart) lijst.appendChild(gesleepteKaart);
  });
});