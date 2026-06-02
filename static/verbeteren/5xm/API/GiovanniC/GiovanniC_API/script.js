const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const limitBtn = document.getElementById("limitBtn");
const sortBtn = document.getElementById("sortBtn");
const randomBtn = document.getElementById("randomBtn");
const resultsDiv = document.getElementById("results");
const statusDiv = document.getElementById("status");

let huidigeResultaten = [];
let limitToFive = false;
let sorted = false;

searchBtn.addEventListener("click", zoekBoek);

searchInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        zoekBoek();
    }
});

limitBtn.addEventListener("click", function() {
    limitToFive = !limitToFive;
    toonResultaten(huidigeResultaten);
});

sortBtn.addEventListener("click", function() {
    sorted = !sorted;
    toonResultaten(huidigeResultaten);
});

randomBtn.addEventListener("click", toonRandomBoek);

async function zoekBoek() {
    const zoekterm = searchInput.value.trim();

    if (!zoekterm) {
        statusDiv.innerHTML = "<p>Geef een zoekterm in.</p>";
        return;
    }

    resultsDiv.innerHTML = "";
    statusDiv.innerHTML = "<p>Bezig met laden...</p>";

    try {
        const encoded = encodeURIComponent(zoekterm);
        const response = await fetch(`https://openlibrary.org/search.json?q=${encoded}`);

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json();

        if (data.docs.length === 0) {
            statusDiv.innerHTML = "<p>Geen resultaten gevonden.</p>";
            return;
        }

        huidigeResultaten = data.docs;
        statusDiv.innerHTML = "";
        toonResultaten(huidigeResultaten);

    } catch {
        statusDiv.innerHTML = "<p>Er is iets misgegaan. Probeer opnieuw.</p>";
    }
}

function toonResultaten(boeken) {
    resultsDiv.innerHTML = "";

    let lijst = [...boeken];

    if (sorted) {
        lijst.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
    }

    if (limitToFive) {
        lijst = lijst.slice(0, 5);
    }

    lijst.forEach(boek => {
        const card = document.createElement("div");
        card.classList.add("card");

        const titel = boek.title || "Geen titel";
        const auteur = boek.author_name ? boek.author_name[0] : "Onbekend";
        const jaar = boek.first_publish_year || "Onbekend";
        const coverId = boek.cover_i;

        let imgUrl = "https://via.placeholder.com/220x280?text=Geen+Cover";

        if (coverId) {
            imgUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
        }

        card.innerHTML = `
            <img src="${imgUrl}">
            <h3>${titel}</h3>
            <p><strong>Auteur:</strong> ${auteur}</p>
            <p><strong>Jaar:</strong> ${jaar}</p>
        `;

        resultsDiv.appendChild(card);
    });
}

function toonRandomBoek() {
    if (huidigeResultaten.length === 0) {
        statusDiv.innerHTML = "<p>Zoek eerst een boek.</p>";
        return;
    }

    const randomIndex = Math.floor(Math.random() * huidigeResultaten.length);
    toonResultaten([huidigeResultaten[randomIndex]]);
}