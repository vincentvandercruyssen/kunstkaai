// 1. State
let lampAan = false;

// 2. Selecties
const lamp = document.querySelector("#lamp");
const statusTekst = document.querySelector("#status");

const knopAan = document.querySelector("#btn-aan");
const knopUit = document.querySelector("#btn-uit");

// 3. Events
knopAan.addEventListener("click", zetAan);
knopUit.addEventListener("click", zetUit);

// 4. Functies
function zetAan() {
  lampAan = true;
  updateLamp();
}

function zetUit() {
  lampAan = false;
  updateLamp();
}

// 5. UI-update
function updateLamp() {
  if (lampAan === true) {
    // background-color = backgroundColor
    lamp.style.backgroundColor = "yellow";
    statusTekst.textContent = "Lamp is aan";
    statusTekst.style.color = "green";
  } else {
    lamp.style.backgroundColor = "gray";
    statusTekst.textContent = "Lamp is uit";
    statusTekst.style.color = "black";
  }
}
