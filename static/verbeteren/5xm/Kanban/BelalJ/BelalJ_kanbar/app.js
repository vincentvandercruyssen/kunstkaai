let gesleepteKaart = null;

const input = document.querySelector("#kaartTekst");
const button = document.querySelector("#voegKaartToe");
const todoLijst = document.querySelector("#todo");
const alleLijsten = document.querySelectorAll(".lijst");
const progressBezig = document.querySelector("#progressBezig");
const progressKlaar = document.querySelector("#progressKlaar");
const progressPercentage = document.querySelector(".progress-percentage");

function updateProgress() {
  const alleTaken = document.querySelectorAll(".kaart").length;
  const bezigTaken = document.querySelector("#bezig").querySelectorAll(".kaart").length;
  const klaarTaken = document.querySelector("#klaar").querySelectorAll(".kaart").length;

  if (alleTaken > 0) {
    const bezigPercentage = Math.round((bezigTaken / alleTaken) * 100);
    const klaarPercentage = Math.round((klaarTaken / alleTaken) * 100);
    const totalPercentage = bezigPercentage + klaarPercentage;

    progressBezig.style.width = (bezigPercentage + klaarPercentage) + "%";
    progressKlaar.style.width = klaarPercentage + "%";
    progressPercentage.textContent = totalPercentage + "%";
  } else {
    progressBezig.style.width = "0%";
    progressKlaar.style.width = "0%";
    progressPercentage.textContent = "0%";
  }
}

function opslaan() {
  const data = {
    todo: [],
    bezig: [],
    klaar: []
  };

  document.querySelector("#todo").querySelectorAll(".kaart span").forEach(span => {
    data.todo.push(span.textContent);
  });

  document.querySelector("#bezig").querySelectorAll(".kaart span").forEach(span => {
    data.bezig.push(span.textContent);
  });

  document.querySelector("#klaar").querySelectorAll(".kaart span").forEach(span => {
    data.klaar.push(span.textContent);
  });

  localStorage.setItem("kanbanData", JSON.stringify(data));
}

function laden() {
  const opgeslagen = localStorage.getItem("kanbanData");
  if (!opgeslagen) return;

  const data = JSON.parse(opgeslagen);

  data.todo.forEach(tekst => maakKaart(tekst, document.querySelector("#todo")));
  data.bezig.forEach(tekst => maakKaart(tekst, document.querySelector("#bezig")));
  data.klaar.forEach(tekst => maakKaart(tekst, document.querySelector("#klaar")));

  updateProgress();
}

function maakKaart(tekst, lijst) {
  const kaart = document.createElement("div");
  kaart.className = "kaart";

  const kaartTekst = document.createElement("span");
  kaartTekst.textContent = tekst;
  kaartTekst.addEventListener("dblclick", function () {
    const huidigeTekst = kaartTekst.textContent;
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = huidigeTekst;
    editInput.className = "edit-input";

    kaartTekst.replaceWith(editInput);
    editInput.focus();
    editInput.select();

    function opslaanEdit() {
      const nieuweTekst = editInput.value.trim();
      if (nieuweTekst) {
        kaartTekst.textContent = nieuweTekst;
      } else {
        kaartTekst.textContent = huidigeTekst;
      }
      editInput.replaceWith(kaartTekst);
      opslaan();
    }

    editInput.addEventListener("blur", opslaanEdit);
    editInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        opslaanEdit();
      }
    });
  });
  kaart.appendChild(kaartTekst);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "×";
  deleteBtn.onclick = function () {
    kaart.remove();
    updateProgress();
    opslaan();
  };
  kaart.appendChild(deleteBtn);

  maakSleepbaar(kaart);
  lijst.appendChild(kaart);
}

function kaartToevoegen() {
  const tekst = input.value.trim();

  if (!tekst) return;

  maakKaart(tekst, todoLijst);

  input.value = "";
  updateProgress();
  opslaan();
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

input.addEventListener("keypress", (e) => {
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
      updateProgress();
      opslaan();
    }
  });
});

laden();
