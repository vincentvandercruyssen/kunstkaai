// ==============================
// DATA MODEL (STATE)
// ==============================

// Hier bewaren we alle kaarten per kolom.
// Elke kolom (todo, bezig, klaar) bevat een array met kaart-objecten.
let data = {
  todo: [],
  bezig: [],
  klaar: []
};

// Hier slaan we tijdelijk de id op van de kaart
// die momenteel gesleept wordt.
let gesleepteKaartId = null;

// Maximum aantal kaarten per kolom
const MAX_PER_KOLOM = 5;


// ==============================
// DOM SELECTIES
// ==============================

// Inputveld voor nieuwe taak
const input = document.querySelector("#kaartTekst");

// Dropdown voor prioriteit
const prioriteitSelect = document.querySelector("#prioriteit");

// Kleurkiezer voor labelkleur
const kleurInput = document.querySelector("#kleurLabel");

// Knop om kaart toe te voegen
const button = document.querySelector("#voegKaartToe");

// Zoekveld om kaarten te filteren
const zoekInput = document.querySelector("#zoekInput");

// Knop om kolom "Klaar" leeg te maken
const archiveBtn = document.querySelector("#archiveBtn");

// Alle lijsten (dropzones)
const lijsten = document.querySelectorAll(".lijst");


// ==============================
// LOCAL STORAGE FUNCTIES
// ==============================

// Deze functie bewaart het data-object in localStorage.
// JSON.stringify zet het object om naar tekst.
function saveData() {
  localStorage.setItem("kanbanData", JSON.stringify(data));
}

// Deze functie haalt opgeslagen data terug uit localStorage.
// JSON.parse zet tekst terug om naar een object.
function loadData() {
  const opgeslagen = localStorage.getItem("kanbanData");

  // Als er data bestaat, overschrijven we het lege object.
  if (opgeslagen) {
    data = JSON.parse(opgeslagen);
  }
}


// ==============================
// RENDER FUNCTIE
// ==============================

// Deze functie tekent alle kaarten opnieuw op het scherm.
// Eerst maken we alles leeg, daarna bouwen we het opnieuw op.
function render() {

  // Kolommen leegmaken
  document.querySelector("#todo").innerHTML = "";
  document.querySelector("#bezig").innerHTML = "";
  document.querySelector("#klaar").innerHTML = "";

  // We lopen door elke kolom in het data-object
  for (let kolom in data) {

    // Voor elke kaart in de huidige kolom
    data[kolom].forEach(kaart => {

      // Nieuwe div maken voor kaart
      const div = document.createElement("div");

      // CSS klasse instellen (inclusief prioriteit)
      div.className = `kaart prioriteit-${kaart.prioriteit}`;

      // Kaart sleepbaar maken
      div.draggable = true;

      // Unieke id koppelen via dataset
      div.dataset.id = kaart.id;

      // Bovenrand kleur instellen
      div.style.borderTop = `4px solid ${kaart.kleur}`;

      // Tekst tonen
      div.textContent = kaart.tekst;


      // ==========================
      // DUBBELKLIK = BEWERKEN
      // ==========================

      div.addEventListener("dblclick", () => {

        // Prompt toont huidige tekst
        const nieuweTekst = prompt("Bewerk taak:", kaart.tekst);

        // Alleen aanpassen als gebruiker iets invult
        if (nieuweTekst) {
          kaart.tekst = nieuweTekst;
          saveData();
          render();
        }
      });


      // ==========================
      // DRAG EVENTS
      // ==========================

      // Wanneer slepen start
      div.addEventListener("dragstart", () => {

        // We onthouden welke kaart wordt gesleept
        gesleepteKaartId = kaart.id;

        // Visuele feedback
        div.classList.add("zwevend");
      });

      // Wanneer slepen stopt
      div.addEventListener("dragend", () => {

        // Visuele feedback verwijderen
        div.classList.remove("zwevend");

        // Reset gesleepte kaart
        gesleepteKaartId = null;

        saveData();
      });


      // ==========================
      // VERWIJDERKNOP
      // ==========================

      const del = document.createElement("button");
      del.textContent = "✖";
      del.className = "verwijder";

      // Bij klik verwijderen we kaart uit data
      del.onclick = () => {

        // Filter verwijdert kaart met juiste id
        data[kolom] = data[kolom].filter(k => k.id !== kaart.id);

        saveData();
        render();
      };

      // Verwijderknop toevoegen aan kaart
      div.appendChild(del);

      // Kaart toevoegen aan juiste kolom in HTML
      document.querySelector("#" + kolom).appendChild(div);
    });
  }

  // Teller bijwerken
  updateCounters();
}


// ==============================
// TELLERS BIJWERKEN
// ==============================

// Deze functie past het cijfer naast elke kolom aan.
function updateCounters() {
  document.querySelector("#todoCount").textContent = data.todo.length;
  document.querySelector("#bezigCount").textContent = data.bezig.length;
  document.querySelector("#klaarCount").textContent = data.klaar.length;
}


// ==============================
// KAART TOEVOEGEN
// ==============================

function addCard() {

  // Spaties verwijderen aan begin en einde
  const tekst = input.value.trim();

  // Lege kaart voorkomen
  if (!tekst) return;

  // Controleren of kolom niet vol zit
  if (data.todo.length >= MAX_PER_KOLOM) {
    alert("Kolom zit vol!");
    return;
  }

  // Nieuw kaart-object maken
  const nieuweKaart = {
    id: Date.now().toString(), // unieke id op basis van tijd
    tekst: tekst,
    prioriteit: prioriteitSelect.value,
    kleur: kleurInput.value
  };

  // Toevoegen aan todo kolom
  data.todo.push(nieuweKaart);

  // Input leegmaken
  input.value = "";

  saveData();
  render();
}

// Klik event koppelen aan knop
button.addEventListener("click", addCard);

// Enter-toets ondersteunt toevoegen
input.addEventListener("keydown", e => {
  if (e.key === "Enter") addCard();
});


// ==============================
// DRAG & DROP LOGICA
// ==============================

lijsten.forEach(lijst => {

  // Nodig om drop mogelijk te maken
  lijst.addEventListener("dragover", e => {
    e.preventDefault();
    lijst.classList.add("over");
  });

  // Feedback verwijderen wanneer cursor weggaat
  lijst.addEventListener("dragleave", () => {
    lijst.classList.remove("over");
  });

  // Wanneer kaart wordt losgelaten
  lijst.addEventListener("drop", e => {

    e.preventDefault();
    lijst.classList.remove("over");

    // Stop als er geen kaart wordt gesleept
    if (!gesleepteKaartId) return;

    const doelKolom = lijst.id;

    // Limiet controle
    if (data[doelKolom].length >= MAX_PER_KOLOM) {
      alert("Kolom zit vol!");
      return;
    }

    // Zoek kaart in alle kolommen
    for (let kolom in data) {

      const index = data[kolom].findIndex(k => k.id === gesleepteKaartId);

      if (index !== -1) {

        // Kaart uit oude kolom halen
        const kaart = data[kolom].splice(index, 1)[0];

        // Kaart toevoegen aan nieuwe kolom
        data[doelKolom].push(kaart);

        break;
      }
    }

    saveData();
    render();
  });
});


// ==============================
// ZOEKFILTER
// ==============================

// Filtert kaarten op basis van tekst
zoekInput.addEventListener("input", () => {

  const term = zoekInput.value.toLowerCase();

  document.querySelectorAll(".kaart").forEach(kaart => {

    kaart.style.display =
      kaart.textContent.toLowerCase().includes(term)
      ? ""
      : "none";
  });
});


// ==============================
// ARCHIVEREN
// ==============================

// Maakt de "Klaar" kolom leeg
archiveBtn.addEventListener("click", () => {

  data.klaar = [];

  saveData();
  render();
});


// ==============================
// INITIALISATIE
// ==============================

// Eerst opgeslagen data laden
loadData();

// Daarna alles tekenen
render();
