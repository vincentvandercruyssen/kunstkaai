const zoekveld = document.getElementById("zoekveld");
const zoekknop = document.getElementById("zoekknop");
const resultaat = document.getElementById("resultaat");
const randomBtn = document.getElementById("randomBtn");

// ENTER-toets activeert zoeken
zoekveld.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    zoekLand();
  }
});

zoekknop.addEventListener("click", zoekLand);
randomBtn.addEventListener("click", willekeurigLand);

// ----------------------------
// Zoeken op basis van input
// ----------------------------
async function zoekLand() {
  const query = zoekveld.value.trim();

  if (!query) {
    resultaat.innerHTML = "<p>Typ eerst iets in het zoekveld.</p>";
    return;
  }

  resultaat.innerHTML = "<p>Bezig met laden...</p>";

  try {
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Land niet gevonden");
    }

    const data = await response.json();
    toonResultaten(data);

  } catch (error) {
    resultaat.innerHTML = `<p>❌ Fout: ${error.message}</p>`;
  }
}

async function willekeurigLand() {
  resultaat.innerHTML = "<p>🌍 Bezig met laden...</p>";

  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags");

    if (!response.ok) {
      throw new Error("Kon landen niet laden");
    }

    const landen = await response.json();

    // Kies een willekeurig land
    const randomIndex = Math.floor(Math.random() * landen.length);
    const randomLand = [landen[randomIndex]]; // in array steken

    toonResultaten(randomLand);

  } catch (error) {
    resultaat.innerHTML = `<p>❌ Fout: ${error.message}</p>`;
  }
}

// ----------------------------
// Resultaten tonen
// ----------------------------
function toonResultaten(landen) {
  resultaat.innerHTML = "";

  landen.forEach(land => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${land.flags.png}" alt="Vlag van ${land.name.common}">
      <div>
        <h2>${land.name.common}</h2>
        <p><strong>Hoofdstad:</strong> ${land.capital ? land.capital[0] : "Onbekend"}</p>
        <p><strong>Regio:</strong> ${land.region}</p>
        <p><strong>Inwoners:</strong> ${land.population.toLocaleString()}</p>
      </div>
    `;

    resultaat.appendChild(card);
  });
}
