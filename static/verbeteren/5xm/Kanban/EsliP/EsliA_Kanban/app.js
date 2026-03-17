// STATE
// Hier bewaren we welk kaartje momenteel wordt gesleept.
// In het begin is er geen kaart actief.
let gesleepteKaart = null;

// SELECTIES
const input = document.querySelector("#kaartTekst");
const button = document.querySelector("#voegKaartToe");
const todoLijst = document.querySelector("#todo");
const alleLijsten = document.querySelectorAll(".lijst");

// FUNCTIE: kaart toevoegen
function kaartToevoegen() {
  // Spaties aan begin en einde verwijderen
  const tekst = input.value.trim();

  // Geen lege kaarten toelaten
  if (!tekst) return;

  // Nieuwe div maken
  const kaart = document.createElement("div");

  // Klasse toevoegen voor styling
  kaart.className = "kaart";

  // Tekst toevoegen aan kaart
  kaart.textContent = tekst;

  // Kaart sleepbaar maken
  maakSleepbaar(kaart);

  // Kaart toevoegen aan Te doen lijst
  todoLijst.appendChild(kaart);

  // Input leegmaken
  input.value = "";
}

// EVENT: knop koppelen
button.addEventListener("click", kaartToevoegen);

// EXTRA: toevoegen met Enter
input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    kaartToevoegen();
  }
});

// FUNCTIE: kaart sleepbaar maken
function maakSleepbaar(kaart) {

  // Zorgt ervoor dat de kaart gesleept kan worden
  kaart.draggable = true;

  // Wanneer slepen start
  kaart.addEventListener("dragstart", (e) => {
    // We bewaren welke kaart wordt gesleept
    gesleepteKaart = kaart;

    // Visuele feedback toevoegen
    kaart.classList.add("zwevend");

    // Nodig voor correcte drag werking in sommige browsers
    e.dataTransfer.setData("text/plain", "");
  });

  // Wanneer slepen stopt
  kaart.addEventListener("dragend", () => {
    // Visuele feedback verwijderen
    kaart.classList.remove("zwevend");

    // Geen actieve kaart meer
    gesleepteKaart = null;
  });
}

// LIJSTEN ALS DROP ZONES
alleLijsten.forEach((lijst) => {

  // Tijdens slepen boven lijst
  lijst.addEventListener("dragover", (e) => {
    // Nodig om drop toe te laten
    e.preventDefault();

    // Visuele feedback geven
    lijst.classList.add("over");
  });

  // Wanneer kaart de lijst verlaat
  lijst.addEventListener("dragleave", () => {
    lijst.classList.remove("over");
  });

  // Wanneer kaart wordt losgelaten
  lijst.addEventListener("drop", (e) => {
    // Standaard gedrag uitschakelen
    e.preventDefault();

    // Feedback verwijderen
    lijst.classList.remove("over");

    // Als er een kaart actief is → toevoegen aan deze lijst
    if (gesleepteKaart) {
      // Als droppen op prullenbak: verwijderen
      if (lijst.id === "prullenbak") {
        gesleepteKaart.remove();
      } else {
        lijst.appendChild(gesleepteKaart);
      }
    }
  });

});
