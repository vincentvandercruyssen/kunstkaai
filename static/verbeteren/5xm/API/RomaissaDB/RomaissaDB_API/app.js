const resultaatDiv = document.getElementById("resultaat");
const zoekveld = document.getElementById("zoekveld");
const zoekknop = document.getElementById("zoekknop");

zoekveld.addEventListener("keypress", (e) => {
  if (e.key === "Enter") zoekLand();
});

zoekknop.addEventListener("click", zoekLand);

// -------------------------
// Zoeken op landnaam
// -------------------------
async function zoekLand() {
  const query = zoekveld.value.trim();

  if (!query) {
    resultaatDiv.innerHTML = "<p>Typ een landnaam in.</p>";
    return;
  }

  resultaatDiv.innerHTML = "<p>Bezig met laden...</p>";

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`
    );
    const data = await response.json();

    if (!data || data.status === 404) {
      resultaatDiv.innerHTML = "<p>Geen land gevonden.</p>";
      return;
    }

    toonResultaat(data);

  } catch (error) {
    resultaatDiv.innerHTML = "<p>Er ging iets mis bij het ophalen van de gegevens.</p>";
  }
}

// -------------------------
// Resultaten tonen
// -------------------------
function toonResultaat(landen) {
  resultaatDiv.innerHTML = "";

  landen.slice(0, 5).forEach(land => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h2>${land.name.common}</h2>
      <img src="${land.flags.png}" width="120">
      <p><strong>Hoofdstad:</strong> ${land.capital}</p>
      <p><strong>Regio:</strong> ${land.region}</p>
      <p><strong>Bevolking:</strong> ${land.population.toLocaleString()}</p>
      <p><strong>Talen:</strong> ${Object.values(land.languages || {}).join(", ")}</p>
    `;

    resultaatDiv.appendChild(card);
  });
}
