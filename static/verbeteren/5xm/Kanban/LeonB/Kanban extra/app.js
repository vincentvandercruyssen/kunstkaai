let gesleepteKaart = null;

const input = document.querySelector("#kaartTekst");
const button = document.querySelector("#voegKaartToe");
const lijsten = document.querySelectorAll(".lijst");
const darkBtn = document.querySelector("#darkModeToggle");

button.addEventListener("click", kaartToevoegen);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") kaartToevoegen();
});

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function kaartToevoegen() {
  const tekst = input.value.trim();
  if (!tekst) return;

  const kaart = maakKaartElement(tekst);
  document.querySelector("#todo").appendChild(kaart);

  input.value = "";
  opslaan();
  updateTellers();
}

function maakKaartElement(tekst) {
  const kaart = document.createElement("div");
  kaart.className = "kaart";
  kaart.draggable = true;

  const span = document.createElement("span");
  span.textContent = tekst;

  span.addEventListener("dblclick", () => {
    const nieuweTekst = prompt("Bewerk taak:", span.textContent);
    if (nieuweTekst) {
      span.textContent = nieuweTekst;
      opslaan();
    }
  });

  const verwijderBtn = document.createElement("button");
  verwijderBtn.textContent = "✖";

  verwijderBtn.addEventListener("click", () => {
    kaart.remove();
    opslaan();
    updateTellers();
  });

  kaart.appendChild(span);
  kaart.appendChild(verwijderBtn);

  kaart.addEventListener("dragstart", () => {
    gesleepteKaart = kaart;
    kaart.classList.add("zwevend");
  });

  kaart.addEventListener("dragend", () => {
    kaart.classList.remove("zwevend");
    gesleepteKaart = null;
  });

  return kaart;
}

lijsten.forEach((lijst) => {

  lijst.addEventListener("dragover", (e) => {
    e.preventDefault();
    lijst.classList.add("over");
  });

  lijst.addEventListener("dragleave", () => {
    lijst.classList.remove("over");
  });

  lijst.addEventListener("drop", (e) => {
    e.preventDefault();
    lijst.classList.remove("over");

    if (gesleepteKaart) {
      lijst.appendChild(gesleepteKaart);
      opslaan();
      updateTellers();
    }
  });
});

function updateTellers() {
  document.querySelector("#todoCount").textContent =
    document.querySelector("#todo").children.length;

  document.querySelector("#bezigCount").textContent =
    document.querySelector("#bezig").children.length;

  document.querySelector("#klaarCount").textContent =
    document.querySelector("#klaar").children.length;
}

function opslaan() {
  const data = {
    todo: document.querySelector("#todo").innerHTML,
    bezig: document.querySelector("#bezig").innerHTML,
    klaar: document.querySelector("#klaar").innerHTML
  };

  localStorage.setItem("kanbanPro", JSON.stringify(data));
}

function laden() {
  const data = JSON.parse(localStorage.getItem("kanbanPro"));
  if (!data) return;

  document.querySelector("#todo").innerHTML = data.todo;
  document.querySelector("#bezig").innerHTML = data.bezig;
  document.querySelector("#klaar").innerHTML = data.klaar;

  document.querySelectorAll(".kaart").forEach(kaart => {
    const tekst = kaart.querySelector("span").textContent;
    const nieuweKaart = maakKaartElement(tekst);
    kaart.replaceWith(nieuweKaart);
  });

  updateTellers();
}

laden();
updateTellers();