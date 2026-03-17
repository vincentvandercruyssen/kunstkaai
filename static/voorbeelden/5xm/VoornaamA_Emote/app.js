// State: welke emotie is actief?
// gegevenstype = string -- let = veranderlijke waarde
let huidigeEmote = "neutraal";

// Selecties
// UI elementen -- const = constante waarde
// een element met id="emote-icoon" enz
const icoon = document.querySelector("#emote-icoon");
const titel = document.querySelector("#emote-titel");
const omschrijving = document.querySelector("#emote-omschrijving");

// Knoppen
const btnBlij = document.querySelector("#btn-blij");
const btnBoos = document.querySelector("#btn-boos");
const btnChill = document.querySelector("#btn-chill");
const btnHyper = document.querySelector("#btn-hyper");

// Functie om UI bij te werken op basis van state
function updateEmote() {
  if (huidigeEmote === "blij") {
    icoon.textContent = "😄";
    titel.textContent = "Blij";
    omschrijving.textContent = "Je bent supervrolijk.";
    // CSS background-color JS backgroundColor
    document.body.style.backgroundColor = "#083";
    // === -> dit is een vraag? (DIT GAAT SOWIESO OVEREENKOMEN MET ONZE EERSTE STATE'S GEGEVENSTYPE)
    // = -> dit is gelijkaan
  } else if (huidigeEmote === "boos") {
    icoon.textContent = "😠";
    titel.textContent = "Boos";
    omschrijving.textContent = "Pas op, je bent geïrriteerd.";
    document.body.style.backgroundColor = "#411";
  } else if (huidigeEmote === "chill") {
    icoon.textContent = "😎";
    titel.textContent = "Chill";
    omschrijving.textContent = "Alles relaxed.";
    document.body.style.backgroundColor = "#458";
  } else if (huidigeEmote === "hyper") {
    icoon.textContent = "🤪";
    titel.textContent = "Hyper";
    omschrijving.textContent = "Je stuitert door de kamer.";
    document.body.style.backgroundColor = "#819";
  } else {
    // neutraal / fallback
    icoon.textContent = "🤷";
    titel.textContent = "Neutraal";
    omschrijving.textContent = "Je emote wacht op een emotie.";
    document.body.style.backgroundColor = "#0f172a";
  }
}

// Events
document.querySelectorAll("img");
btnBlij.addEventListener("click", function () {
  huidigeEmote = "blij";
  updateEmote();
});

btnBoos.addEventListener("click", function () {
  huidigeEmote = "boos";
  updateEmote();
});

btnChill.addEventListener("click", function () {
  huidigeEmote = "chill";
  updateEmote();
});

btnHyper.addEventListener("click", function () {
  huidigeEmote = "hyper";
  updateEmote();
});

// Starttoestand
updateEmote();
