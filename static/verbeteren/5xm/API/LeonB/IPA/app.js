const zoekKnop = document.getElementById("zoekknop");
const zoekveld = document.getElementById("zoekveld");
const resultaatDiv = document.getElementById("resultaat");
const laadMeerKnop = document.getElementById("laadMeerKnop");
const statusDiv = document.getElementById("status");

let resultaten = [];
let zichtbaarAantal = 6;

// EVENTS
zoekKnop.addEventListener("click", zoekBoeken);

zoekveld.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    zoekBoeken();
  }
});

laadMeerKnop.addEventListener("click", () => {
  zichtbaarAantal += 6;
  toonResultaten();
});

// FETCH DATA
async function zoekBoeken() {
  const zoekterm = zoekveld.value.trim();

  if (!zoekterm) {
    toonStatus("⚠️ Geef een zoekterm in");
    return;
  }

  toonStatus("⏳ Laden...");
  resultaatDiv.innerHTML = "";
  laadMeerKnop.classList.add("hidden");

  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(zoekterm)}`);

    if (!response.ok) {
      throw new Error("API fout");
    }

    const data = await response.json();

    if (!data.docs.length) {
      toonStatus("❌ Geen resultaten gevonden");
      return;
    }

    resultaten = data.docs;
    zichtbaarAantal = 6;

    toonStatus("");
    toonResultaten();

  } catch (error) {
    toonStatus("❌ Er ging iets mis bij het ophalen van data");
  }
}

// RENDER
function toonResultaten() {
  resultaatDiv.innerHTML = "";

  const selectie = resultaten.slice(0, zichtbaarAantal);

  selectie.forEach(boek => {
    const titel = boek.title || "Geen titel";
    const auteur = boek.author_name ? boek.author_name[0] : "Onbekend";
    const jaar = boek.first_publish_year || "Onbekend";

    const afbeelding = boek.cover_i
      ? `https://covers.openlibrary.org/b/id/${boek.cover_i}-M.jpg`
      : `https://via.placeholder.com/200x300?text=Geen+cover`;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${afbeelding}" alt="${titel}">
      <div class="card-content">
        <h3>${titel}</h3>
        <p>👤 ${auteur}</p>
        <p>📅 ${jaar}</p>
      </div>
    `;

    resultaatDiv.appendChild(card);
  });

  laadMeerKnop.classList.toggle(
    "hidden",
    zichtbaarAantal >= resultaten.length
  );
}

// STATUS
function toonStatus(tekst) {
  statusDiv.textContent = tekst;
}