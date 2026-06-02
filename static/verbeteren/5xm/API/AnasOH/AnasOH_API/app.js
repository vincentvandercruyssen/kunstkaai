const zoekKnop = document.getElementById("zoekknop");
const zoekveld = document.getElementById("zoekveld");
const resultaat = document.getElementById("resultaat");
const randomBtn = document.getElementById("randomBtn");


zoekveld.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    zoekArtikel();
  }
});


zoekKnop.addEventListener("click", zoekArtikel);


randomBtn.addEventListener("click", haalRandomArtikel);


async function zoekArtikel() {
  const zoekterm = encodeURIComponent(zoekveld.value);

  if (!zoekterm) {
    resultaat.innerHTML = "<p>Geef een zoekterm in.</p>";
    return;
  }

  resultaat.innerHTML = "<p>Bezig met laden...</p>";

  try {
    const url = `https://nl.wikipedia.org/w/api.php?action=query&list=search&srsearch=${zoekterm}&format=json&origin=*`;

    const response = await fetch(url);
    const data = await response.json();

    toonResultaten(data.query.search);

  } catch (error) {
    resultaat.innerHTML = "<p>Er ging iets mis bij het ophalen van data.</p>";
  }
}


async function haalRandomArtikel() {
  resultaat.innerHTML = "<p>Bezig met laden...</p>";

  try {
    const url = `https://nl.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&format=json&origin=*`;

    const response = await fetch(url);
    const data = await response.json();

    const titel = data.query.random[0].title;

    toonResultaten([{ title: titel, snippet: "Klik om te openen" }]);

  } catch (error) {
    resultaat.innerHTML = "<p>Kon geen random artikel ophalen.</p>";
  }
}

function toonResultaten(resultaten) {

  if (resultaten.length === 0) {
    resultaat.innerHTML = "<p>Geen resultaten gevonden.</p>";
    return;
  }

  resultaat.innerHTML = "";

  resultaten.slice(0, 5).forEach(item => {

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.snippet || ""}</p>
      <a href="https://nl.wikipedia.org/wiki/${item.title}" target="_blank">Lees meer</a>
    `;

    resultaat.appendChild(card);
  });
}