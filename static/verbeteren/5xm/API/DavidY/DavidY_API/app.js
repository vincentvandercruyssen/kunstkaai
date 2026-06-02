const knop = document.getElementById("zoekknop");
const input = document.getElementById("zoekveld");
const resultaat = document.getElementById("resultaat");
const randomKnop = document.getElementById("randomknop");

knop.addEventListener("click", zoekWeer);
randomKnop.addEventListener("click", randomPlaats);

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        zoekWeer();
    }
});

async function zoekWeer() {
    let stad = input.value;
    if (stad === "") {
        resultaat.innerHTML = "<p>Typ eerst een stad.</p>";
        return;
    }
    stad = encodeURIComponent(stad);
    resultaat.innerHTML = "<p>Bezig met laden...</p>";
    try {
        const geo = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + stad);
        const geoData = await geo.json();
        if (!geoData.results) {
            resultaat.innerHTML = "<p>Stad niet gevonden.</p>";
            return;
        }
        const plaats = geoData.results[0].name;
        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const weer = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current_weather=true&timezone=auto");
        const weerData = await weer.json();
        const temperatuur = weerData.current_weather.temperature;
        const wind = weerData.current_weather.windspeed;
        const weatherCode = weerData.current_weather.weathercode;
        const tijd = weerData.current_weather.time;
        toonWeer(plaats, temperatuur, wind, weatherCode, tijd);
    } catch (error) {
        resultaat.innerHTML = "<p>Er ging iets mis bij het ophalen van de data.</p>";
    }
}

function getWeatherState(code) {
    if (code === 0) return { icon: '☀️', label: 'Zonnig' };
    if (code === 1 || code === 2) return { icon: '⛅', label: 'Gedeeltelijk bewolkt' };
    if (code === 3) return { icon: '☁️', label: 'Bewolkt' };
    if ([45, 48].includes(code)) return { icon: '🌫️', label: 'Mist' };
    if ([51, 53, 55, 56, 57].includes(code)) return { icon: '🌦️', label: 'Motregen' };
    if ([61, 63, 65, 66, 67].includes(code)) return { icon: '🌧️', label: 'Regen' };
    if ([71, 73, 75, 77].includes(code)) return { icon: '🌨️', label: 'Sneeuw' };
    if ([80, 81, 82].includes(code)) return { icon: '⛈️', label: 'Buien' };
    if ([95, 96, 99].includes(code)) return { icon: '🌩️', label: 'Onweer' };
    return { icon: '🌤️', label: 'Normaal weer' };
}

function toonWeer(plaats, temp, wind, weatherCode, tijd) {
    const state = getWeatherState(weatherCode);
    resultaat.innerHTML = `
    <div class="card">
        <h2>Weerbericht voor ${plaats}</h2>
        <div class="weather-desc"><span class="weather-icon">${state.icon}</span>${state.label}</div>
        <div class="weather-meta">
            <div><strong>Temperatuur</strong><br>${temp}°C</div>
            <div><strong>Wind</strong><br>${wind} km/u</div>
            <div><strong>Tijd</strong><br>${new Date(tijd).toLocaleString()}</div>
        </div>
    </div>
    `;
}

function randomPlaats(){
    const steden = [
    "Brussels",
    "Antwerp",
    "Amsterdam",
    "Paris",
    "London",
    "Berlin",
    "Madrid",
    "Bangkok",
    "New York",
    "Tokyo",
    "Istanbul",
    "Sydney",
    "Rio de Janeiro",
    "Rome",
    "Lisbon",
    "Moscow",
    "Dubai",
    "Toronto",
    "Mexico City",
    "Buenos Aires",
    "Las Vegas",
    "Mumbai",
    "Lagos",
    "Copenhagen",
    "Madagascar"
    ];
    const random = steden[Math.floor(Math.random() * steden.length)];
    input.value = random;
    zoekWeer();
}