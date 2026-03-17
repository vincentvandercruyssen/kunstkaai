const invoer = document.getElementById("taakInvoer");
const knop = document.getElementById("taakToevoegenKnop");

const lijsten = document.querySelectorAll(".lijst");

let gesleepteKaart = null;



function maakTaak(tekst, kolomId = "todoLijst") {
  const kaart = document.createElement("div");
  kaart.classList.add("kaart");
  kaart.setAttribute("draggable", true);

  kaart.textContent = tekst;

  const verwijderBtn = document.createElement("button");
  verwijderBtn.innerHTML = "✕";
  verwijderBtn.classList.add("verwijder-btn");

  verwijderBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    kaart.remove();
    bewaarTaken();
  });

  kaart.appendChild(verwijderBtn);

  voegDragEventsToe(kaart);

  document.getElementById(kolomId).appendChild(kaart);

  bewaarTaken();
}

knop.addEventListener("click", () => {
  const tekst = invoer.value.trim();
  if (tekst === "") return;

  maakTaak(tekst);

  invoer.value = "";
});



function voegDragEventsToe(kaart) {
  kaart.addEventListener("dragstart", () => {
    gesleepteKaart = kaart;
    kaart.classList.add("zwevend");
  });

  kaart.addEventListener("dragend", () => {
    gesleepteKaart = null;
    kaart.classList.remove("zwevend");
    bewaarTaken();
  });
}


lijsten.forEach(lijst => {
  lijst.addEventListener("dragover", (e) => {
    e.preventDefault();
    lijst.classList.add("over");
  });

  lijst.addEventListener("dragleave", () => {
    lijst.classList.remove("over");
  });

  lijst.addEventListener("drop", () => {
    lijst.classList.remove("over");

    if (gesleepteKaart) {
      lijst.appendChild(gesleepteKaart);
      bewaarTaken();
    }
  });
});


function bewaarTaken() {
  const data = {
    todo: [],
    bezig: [],
    klaar: []
  };

  document.querySelectorAll("#todoLijst .kaart").forEach(k => {
    data.todo.push(k.firstChild.textContent);
  });

  document.querySelectorAll("#bezigLijst .kaart").forEach(k => {
    data.bezig.push(k.firstChild.textContent);
  });

  document.querySelectorAll("#klaarLijst .kaart").forEach(k => {
    data.klaar.push(k.firstChild.textContent);
  });

  localStorage.setItem("kanbanData", JSON.stringify(data));
}

function laadTaken() {
  const opgeslagen = localStorage.getItem("kanbanData");
  if (!opgeslagen) return;

  const data = JSON.parse(opgeslagen);

  data.todo.forEach(t => maakTaak(t, "todoLijst"));
  data.bezig.forEach(t => maakTaak(t, "bezigLijst"));
  data.klaar.forEach(t => maakTaak(t, "klaarLijst"));
}


laadTaken();
