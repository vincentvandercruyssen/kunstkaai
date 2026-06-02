const zoekknop = document.getElementById("zoekknop");
const randomknop = document.getElementById("randomknop");
const zoekveld = document.getElementById("zoekveld");
const resultaat = document.getElementById("resultaat");

const API_KEY = "JOUW_API_KEY"; // <-- HIER jouw key zetten

zoekknop.addEventListener("click", zoekGame);
randomknop.addEventListener("click", randomGame);

zoekveld.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        zoekGame();
    }
});

async function zoekGame(){

    const zoekterm = encodeURIComponent(zoekveld.value.trim());

    // FIX: leeg zoekveld
    if(zoekterm === ""){
        resultaat.innerHTML = "<p>⚠️ Typ eerst een game naam</p>";
        return;
    }

    resultaat.innerHTML = "<p>⏳ Bezig met laden...</p>";

    try{

        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${zoekterm}`);
        const data = await response.json();

        toonGames(data.results);

    }
    catch(error){
        resultaat.innerHTML = "<p>❌ Fout bij ophalen van data</p>";
        console.log(error);
    }
}

async function randomGame(){

    resultaat.innerHTML = "<p>⏳ Random games laden...</p>";

    try{

        const page = Math.floor(Math.random()*40)+1;

        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`);
        const data = await response.json();

        toonGames(data.results);

    }
    catch(error){
        resultaat.innerHTML = "<p>❌ Fout bij random games</p>";
        console.log(error);
    }
}

function toonGames(games){

    resultaat.innerHTML = "";

    if(!games || games.length === 0){
        resultaat.innerHTML = "<p>Geen games gevonden</p>";
        return;
    }

    games
    .sort((a,b)=> b.rating - a.rating)
    .slice(0,6)
    .forEach(game => {

        // FIX: sommige games hebben geen afbeelding
        const afbeelding = game.background_image
        ? game.background_image
        : "https://via.placeholder.com/300x170?text=No+Image";

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${afbeelding}">
            <h3>${game.name}</h3>
            <p>⭐ Rating: ${game.rating}</p>
            <p>📅 Release: ${game.released}</p>
        `;

        resultaat.appendChild(card);

    });
}