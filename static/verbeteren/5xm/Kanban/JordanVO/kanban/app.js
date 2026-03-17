let gesleepteKaart = null;

const input = document.querySelector("#kaartTekst");
const button = document.querySelector("#voegKaartToe");
const alleLijsten = document.querySelectorAll(".lijst");

function updateAlleTellers() {
  alleLijsten.forEach((lijst) => {
    const kolom = lijst.closest(".kolom");
    const teller = kolom.querySelector(".taak-aantal");
    teller.textContent = lijst.children.length;
  });
}

function kaartToevoegen() {
  const tekst = input.value.trim();
  if (!tekst) return;

  const kaart = maakKaart(tekst);

  document.querySelector("#todo").appendChild(kaart);
  input.value = "";
  updateAlleTellers();
}

function maakKaart(tekst) {
  const kaart = document.createElement("div");
  kaart.className = "kaart";
  kaart.textContent = tekst;

  maakSleepbaar(kaart);


  kaart.addEventListener("dblclick", () => {
    kaart.contentEditable = true;
    kaart.focus();
  });


  kaart.addEventListener("blur", () => {
    kaart.contentEditable = false;

    if (kaart.textContent.trim() === "") {
      kaart.remove();
    }
    updateAlleTellers();
  });

  kaart.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
      e.preventDefault();
      kaart.blur();
    }
  
    if ((e.key === "Backspace" || e.key === "Delete") && kaart.textContent.trim() === "") {
      kaart.remove();
      updateAlleTellers();
    }
  });

  return kaart;
}

function maakSleepbaar(kaart) {
  kaart.draggable = true;

  kaart.addEventListener("dragstart", (e) => {
    gesleepteKaart = kaart;
    kaart.classList.add("zwevend");
    e.dataTransfer.setData("text/plain", "");
  });

  kaart.addEventListener("dragend", () => {
    kaart.classList.remove("zwevend");
    gesleepteKaart = null;
  });
}

button.addEventListener("click", kaartToevoegen);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    kaartToevoegen();
  }
});

alleLijsten.forEach((lijst) => {
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
      updateAlleTellers();
    }
  });
});

const wisselKnop = document.querySelector("#wisselAchtergrond");
let huidigeAchtergrond = 1;

wisselKnop.addEventListener("click", () => {
  if (huidigeAchtergrond === 1) {
    document.body.style.backgroundImage = 'url("images/barca2.jpg")';
    huidigeAchtergrond = 2;
  } else {
    document.body.style.backgroundImage = 'url("images/barcal.jpg")';
    huidigeAchtergrond = 1;
  }
});

updateAlleTellers();