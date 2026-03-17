// hier bewaren we welk kaartje momenteel gesleept wordt
let gesleepteKaart = null;

// selecties
const input = document.querySelector("#kaartTekst");
const button = document.querySelector("#voegKaartToe");
const todoLijst = document.querySelector("#todo");
const alleLijsten = document.querySelectorAll(".lijst");

// functie om een nieuw kaartje toe te voegen
function kaartToevoegen() {
  // trim verwijdert spaties voor en achter de tekst
  const tekst = input.value.trim();

  // als het veld leeg is, doen we niets
  if (!tekst) return;

  // maak een nieuw kaart-element
  const kaart = document.createElement("div");
  kaart.className = "kaart";
  kaart.textContent = tekst;

  // maak het kaartje sleepbaar
  maakSleepbaar(kaart);

  // voeg kaart toe aan de "Te doen" lijst
  todoLijst.appendChild(kaart);

  // maak input weer leeg
  input.value = "";
}

// klik op de knop voegt een kaart toe
button.addEventListener("click", kaartToevoegen);

// functie die een kaart sleepbaar maakt
function maakSleepbaar(kaart) {
  kaart.draggable = true;

  // wanneer het slepen start
  kaart.addEventListener("dragstart", (e) => {
    // onthoud welke kaart gesleept wordt
    gesleepteKaart = kaart;
    // geef visuele feedback
    kaart.classList.add("zwevend");
    // verplicht voor sommige browsers
    e.dataTransfer.setData("text/plain", "");
  });

  // wanneer het slepen stopt
  kaart.addEventListener("dragend", () => {
    kaart.classList.remove("zwevend");
    gesleepteKaart = null;
  });
}

// elke lijst werkt als drop zone
alleLijsten.forEach((lijst) => {

  // nodig om droppen toe te laten
  lijst.addEventListener("dragover", (e) => {
    e.preventDefault(); // zonder dit werkt drop niet
    lijst.classList.add("over");
  });

  // wanneer je de lijst verlaat
  lijst.addEventListener("dragleave", () => {
    lijst.classList.remove("over");
  });

  // wanneer je een kaart dropt
  lijst.addEventListener("drop", (e) => {
    e.preventDefault();
    lijst.classList.remove("over");

    // plaats de gesleepte kaart in deze lijst
    if (gesleepteKaart) {
      lijst.appendChild(gesleepteKaart);
    }
  });
});
