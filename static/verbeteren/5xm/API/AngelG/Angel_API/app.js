const API_KEY = "78d958ff"; // <-- zet je echte key

const knop = document.getElementById("zoekknop");
const input = document.getElementById("zoekveld");
const resultaat = document.getElementById("resultaat");
const aanbevolenBtn = document.getElementById("aanbevolenBtn");

const filmsLijst = [
  "Home Alone",
  "Shang Chi",
  "Avengers",
  "Predator",
  "Spider Man",
  "Lucy",
  "Incantation",
  "The Ring",
  "The Nun",
  "Rim of the World",
  "Superman",
  "The Wild Robot"
];

knop.addEventListener("click", zoekFilms);
input.addEventListener("keydown", e => { if(e.key === "Enter") zoekFilms(); });
aanbevolenBtn.addEventListener("click", toonAanbevolen);

async function zoekFilms() {
  const zoekterm = input.value.trim();
  if (!zoekterm) return;

  resultaat.innerHTML = "<p>Bezig met laden...</p>";

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(zoekterm)}`);
    const data = await response.json();

    if (data.Response === "False") {
      resultaat.innerHTML = "<p>Geen resultaten gevonden 😢</p>";
      return;
    }

    // Haal volledige details op voor elke film
    const volledigeFilms = await Promise.all(
      data.Search.slice(0, 6).map(async film => {
        const detailResp = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${film.imdbID}&plot=short`);
        return await detailResp.json();
      })
    );

    toonResultaten(volledigeFilms);

  } catch (error) {
    console.error(error);
    resultaat.innerHTML = "<p>Er ging iets mis 😢</p>";
  }
}

function toonResultaten(films) {
  resultaat.innerHTML = "";
  films.forEach(film => {
    const poster = film.Poster !== "N/A" ? film.Poster : "https://via.placeholder.com/300x450?text=No+Image";
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${poster}" alt="Poster">
      <div class="card-content">
        <h3>${film.Title} (${film.Year})</h3>
        <p>${film.Plot}</p>
      </div>
    `;
    resultaat.appendChild(div);
  });
}

// Aanbevolen knop
function toonAanbevolen() {
  const randomFilm = filmsLijst[Math.floor(Math.random() * filmsLijst.length)];
  input.value = randomFilm;
  zoekFilms();
}