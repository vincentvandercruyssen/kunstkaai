// null omdat er in het begin nog geen kaart gesleept wordt
let gesleepteKaart = null;

// Maak de kaarten sleepbaar
function maakSleepbaar(kaart) {
  // draggable HTML kenmerk toevoegen
  kaart.draggable = true;

  kaart.addEventListener("dragstart", (e) => {
    gesleepteKaart = kaart;
    kaart.classList.add("zwevend");
    // optioneel: nodig voor sommige browsers
    e.dataTransfer.setData("text/plain", "");
  });

  kaart.addEventListener("dragend", () => {
    kaart.classList.remove("zwevend");
    gesleepteKaart = null;
  });
}

// Voeg sleepfunctionaliteit toe aan bestaande lijsten
document.querySelectorAll(".lijst").forEach((lijst) => {
  // dragover visueel maken (UI feedback)
  lijst.addEventListener("dragover", (e) => {
    e.preventDefault();
    lijst.classList.add("over");
  });

  // dragover visueel verwijderen (UI feedback)
  lijst.addEventListener("dragleave", () => {
    lijst.classList.remove("over");
  });

  // gesleepte kaart loslaten
  lijst.addEventListener("drop", (e) => {
    e.preventDefault();
    lijst.classList.remove("over"); // (UI feedback)
    if (gesleepteKaart) lijst.appendChild(gesleepteKaart);
  });
});

// Kaart toevoegen
function kaartToevoegen() {
  const kaartTekst = document.querySelector("#kaartTekst");
  // optioneel: trim zorgt ervoor dat spaties aan het begin en einde worden verwijderd
  const tekst = kaartTekst.value.trim();
  // dit zorgt ervoor dat er geen lege kaarten kunnen worden toegevoegd
  if (!tekst) return;

  // hier maken we de kaart aan
  const kaart = document.createElement("div");
  // voeg klasse toe voor styling
  kaart.className = "kaart";
  // voeg de tekst uit de input toe
  kaart.textContent = tekst;

  // maak de nieuwe kaart sleepbaar, met eigen functie
  maakSleepbaar(kaart);

  // voeg de kaart toe aan de "Te doen" lijst
  document.querySelector("#todo").appendChild(kaart);
  // maak het tekstveld terug leeg
  kaartTekst.value = "";
}

const voegKaartToeKnop = document.querySelector("#voegKaartToe");

voegKaartToeKnop.addEventListener("click", kaartToevoegen);
