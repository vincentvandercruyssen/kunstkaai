const zoekKnop = document.getElementById("zoekknop");
const randomKnop = document.getElementById("randomknop");
const zoekveld = document.getElementById("zoekveld");
const resultaat = document.getElementById("resultaat");
const counter = document.getElementById("counter");

// RANDOM LIST (English names)
const landenLijst = [
    "belgium", "france", "germany", "japan",
    "brazil", "canada", "italy", "spain",
    "norway", "india", "china", "united states",
    "mexico", "argentina", "egypt", "australia"
];

// GAME SYSTEM
let gevondenLanden = new Set();

// EVENTS
zoekKnop.addEventListener("click", zoekLand);
randomKnop.addEventListener("click", randomLand);

zoekveld.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        zoekLand();
    }
});

// UPDATE COUNTER
function updateCounter() {
    counter.textContent = `Countries found: ${gevondenLanden.size} / 250`;
}

// SEARCH FUNCTION
async function zoekLand() {
    const zoekterm = encodeURIComponent(zoekveld.value);

    if (!zoekterm) {
        resultaat.innerHTML = "<p>Type something first...</p>";
        return;
    }

    resultaat.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${zoekterm}`);

        if (!response.ok) {
            throw new Error("Not found");
        }

        const data = await response.json();

        toonResultaat(data.slice(0, 5));

    } catch (error) {
        resultaat.innerHTML = "<p>No results found.</p>";
    }
}

// RANDOM FUNCTION (faster)
async function randomLand() {
    const randomNaam = landenLijst[Math.floor(Math.random() * landenLijst.length)];

    resultaat.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(randomNaam)}`);

        if (!response.ok) {
            throw new Error("API error");
        }

        const data = await response.json();

        toonResultaat([data[0]]);

    } catch (error) {
        resultaat.innerHTML = "<p>Could not load country.</p>";
    }
}

// DISPLAY RESULTS
function toonResultaat(landen) {
    resultaat.innerHTML = "";

    landen.forEach(land => {
        const div = document.createElement("div");
        div.classList.add("card");

        const name = land.name.common;

        // GAME: add unique country
        if (!gevondenLanden.has(name)) {
            gevondenLanden.add(name);
            updateCounter();
        }

        // COORDINATES
        const lat = land.latlng ? land.latlng[0] : null;
        const lng = land.latlng ? land.latlng[1] : null;

        const mapsLink = (lat && lng)
            ? `https://www.google.com/maps?q=${lat},${lng}`
            : "#";

        // FUN FACT
        let funFact = "";

        if (land.population > 100000000) {
            funFact = "This country has more than 100 million people!";
        } else if (land.area > 1000000) {
            funFact = "This is a very large country!";
        } else if (land.region === "Europe") {
            funFact = "This country is in Europe 🇪🇺";
        } else if (land.region === "Asia") {
            funFact = "This country is in Asia 🌏";
        } else {
            funFact = "Interesting country to explore!";
        }

        div.innerHTML = `
            <img src="${land.flags.png}">
            <h2>${name}</h2>
            <p>Capital: ${land.capital ? land.capital[0] : "No data"}</p>
            <p>Region: ${land.region}</p>
            <p>Population: ${land.population.toLocaleString()}</p>
            <p>🌍 Coordinates: ${lat ?? "unknown"}, ${lng ?? "unknown"}</p>
            <p>🤓 Fun fact: ${funFact}</p>
            <a href="${mapsLink}" target="_blank">📍 View on Google Maps</a>
        `;

        resultaat.appendChild(div);
    });
}