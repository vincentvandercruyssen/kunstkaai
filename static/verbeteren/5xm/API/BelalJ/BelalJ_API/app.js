const zoekveld = document.getElementById("zoekveld");
const zoekknop = document.getElementById("zoekknop");
const willekeurigKnop = document.getElementById("willekeurigKnop");
const clearBtn = document.getElementById("clearBtn");
const resultaatDiv = document.getElementById("resultaat");
const resultaatInfo = document.getElementById("resultaatInfo");
const aantalSelect = document.getElementById("aantalResultaten");
const sorteerSelect = document.getElementById("sorteerOptie");
const taalFilter = document.getElementById("taalFilter");
const geschiedenisRij = document.getElementById("geschiedenisRij");
const paginaControls = document.getElementById("paginaControls");
const vorigeBtn = document.getElementById("vorigeBtn");
const volgendeBtn = document.getElementById("volgendeBtn");
const paginaIndicator = document.getElementById("paginaIndicator");
const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalSluit = document.getElementById("modalSluit");
const modalInhoud = document.getElementById("modalInhoud");
const savedPanel = document.getElementById("savedPanel");
const zoekPanel = document.getElementById("zoekPanel");
const savedResultaat = document.getElementById("savedResultaat");
const savedCount = document.getElementById("savedCount");
const clearSavedBtn = document.getElementById("clearSavedBtn");
const favTab = document.getElementById("favTab");
const savedTab = document.getElementById("savedTab");
const toast = document.getElementById("toast");

const API_URL = "https://openlibrary.org/search.json";

let huidigePagina = 1;
let huidigeTerm = "";
let totaalResultaten = 0;
let toastTimer = null;

let zoekGeschiedenis = JSON.parse(localStorage.getItem("bf_history") || "[]");
let bewaardBoeken = JSON.parse(localStorage.getItem("bf_saved") || "[]");

const onderwerpen = [
  "adventure", "mystery", "science fiction", "history",
  "romance", "philosophy", "fantasy", "biography",
  "architecture", "psychology", "economics", "art"
];


function toonToast(tekst) {
  clearTimeout(toastTimer);
  toast.textContent = tekst;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function toonLaden() {
  resultaatInfo.hidden = true;
  paginaControls.hidden = true;
  resultaatDiv.innerHTML = `
    <div class="status-bericht">
      <div class="spinner"></div>
      <p>Even geduld…</p>
    </div>
  `;
}

function toonFout(melding) {
  resultaatInfo.hidden = true;
  paginaControls.hidden = true;
  resultaatDiv.innerHTML = `
    <div class="status-bericht">
      <div class="status-icon">⚠</div>
      <p>${melding}</p>
    </div>
  `;
}

function toonGeenResultaten(zoekterm) {
  resultaatInfo.hidden = true;
  paginaControls.hidden = true;
  resultaatDiv.innerHTML = `
    <div class="status-bericht">
      <div class="status-icon">○</div>
      <p>Niets gevonden voor <strong>"${zoekterm}"</strong>. Misschien een andere zoekterm proberen?</p>
    </div>
  `;
}


function slaGeschiedenisOp(term) {
  zoekGeschiedenis = [term, ...zoekGeschiedenis.filter(t => t !== term)].slice(0, 7);
  localStorage.setItem("bf_history", JSON.stringify(zoekGeschiedenis));
  renderGeschiedenis();
}

function renderGeschiedenis() {
  if (zoekGeschiedenis.length === 0) {
    geschiedenisRij.hidden = true;
    return;
  }

  geschiedenisRij.hidden = false;
  geschiedenisRij.innerHTML = `<span class="history-label">Eerder gezocht:</span>`;

  zoekGeschiedenis.forEach(term => {
    const chip = document.createElement("button");
    chip.className = "history-chip";
    chip.textContent = term;
    chip.addEventListener("click", () => {
      zoekveld.value = term;
      zoekBoeken(term);
    });
    geschiedenisRij.appendChild(chip);
  });
}


function isBoekBewaard(key) {
  return bewaardBoeken.some(b => b.key === key);
}

function toggleBewaard(boek) {
  if (isBoekBewaard(boek.key)) {
    bewaardBoeken = bewaardBoeken.filter(b => b.key !== boek.key);
    toonToast("Verwijderd uit je lijst");
  } else {
    bewaardBoeken.push(boek);
    toonToast("Toegevoegd aan je lijst ⭐");
  }

  localStorage.setItem("bf_saved", JSON.stringify(bewaardBoeken));
  updateSavedBadge();

  document.querySelectorAll(`.boek-save-btn[data-key="${boek.key}"]`).forEach(btn => {
    const bewaard = isBoekBewaard(boek.key);
    btn.textContent = bewaard ? "★" : "☆";
    btn.classList.toggle("saved", bewaard);
    btn.title = bewaard ? "Verwijder uit lijst" : "Bewaar dit boek";
  });
}

function updateSavedBadge() {
  const n = bewaardBoeken.length;
  savedCount.textContent = n;
  savedCount.dataset.count = n;
}


function sorteerBoeken(boeken) {
  const keuze = sorteerSelect.value;

  if (keuze === "jaar") {
    return [...boeken].sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
  }
  if (keuze === "titel") {
    return [...boeken].sort((a, b) =>
      (a.title || "").toLowerCase().localeCompare((b.title || "").toLowerCase())
    );
  }

  return boeken;
}


function maakBoekKaart(boek, index) {
  const titel = boek.title || "Onbekende titel";
  const auteurs = boek.author_name ? boek.author_name.slice(0, 2).join(", ") : "Onbekende auteur";
  const jaar = boek.first_publish_year || "—";
  const coverId = boek.cover_i;
  const taal = boek.language ? boek.language[0].toUpperCase() : null;
  const bewaard = isBoekBewaard(boek.key);

  const coverHTML = coverId
    ? `<div class="boek-cover-wrap">
         <img
           class="boek-cover"
           src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg"
           alt="Omslag van ${titel}"
           loading="lazy"
           onerror="this.parentElement.innerHTML='<div class=\\'boek-cover-placeholder\\'>📖<span>${titel}</span></div>'"
         />
       </div>`
    : `<div class="boek-cover-wrap">
         <div class="boek-cover-placeholder">📖<span>${titel}</span></div>
       </div>`;

  const kaart = document.createElement("div");
  kaart.className = "boek-kaart";
  kaart.style.setProperty("--i", index);

  kaart.innerHTML = `
    ${coverHTML}
    <button class="boek-save-btn ${bewaard ? "saved" : ""}" data-key="${boek.key}" title="${bewaard ? "Verwijder uit lijst" : "Bewaar dit boek"}">
      ${bewaard ? "★" : "☆"}
    </button>
    <div class="boek-info">
      <p class="boek-titel">${titel}</p>
      <p class="boek-auteur">${auteurs}</p>
      <div class="boek-meta">
        <span class="boek-jaar">${jaar}</span>
        ${taal ? `<span class="boek-taal">${taal}</span>` : ""}
      </div>
    </div>
  `;

  kaart.addEventListener("click", (e) => {
    if (!e.target.classList.contains("boek-save-btn")) toonModal(boek);
  });

  kaart.querySelector(".boek-save-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleBewaard(boek);
  });

  return kaart;
}


function toonResultaten(boeken, zoekterm, totaal) {
  const gesorteerd = sorteerBoeken(boeken);

  resultaatInfo.hidden = false;
  resultaatInfo.innerHTML = `
    <span class="result-label">Resultaten voor <strong>"${zoekterm}"</strong></span>
    <span class="result-label"><strong>${gesorteerd.length}</strong> van <strong>${totaal.toLocaleString()}</strong></span>
  `;

  const grid = document.createElement("div");
  grid.className = "boeken-grid";
  gesorteerd.forEach((boek, i) => grid.appendChild(maakBoekKaart(boek, i)));

  resultaatDiv.innerHTML = "";
  resultaatDiv.appendChild(grid);

  const aantalPerPagina = parseInt(aantalSelect.value);
  const totaalPaginas = Math.min(Math.ceil(totaal / aantalPerPagina), 50);

  if (totaalPaginas > 1) {
    paginaControls.hidden = false;
    paginaIndicator.textContent = `Pagina ${huidigePagina} van ${totaalPaginas}`;
    vorigeBtn.disabled = huidigePagina <= 1;
    volgendeBtn.disabled = huidigePagina >= totaalPaginas;
  } else {
    paginaControls.hidden = true;
  }
}


function toonModal(boek) {
  const titel = boek.title || "Onbekende titel";
  const auteurs = boek.author_name ? boek.author_name.join(", ") : "Onbekend";
  const jaar = boek.first_publish_year || "—";
  const coverId = boek.cover_i;
  const talen = boek.language ? boek.language.slice(0, 3).map(t => t.toUpperCase()).join(", ") : "—";
  const uitgever = boek.publisher ? boek.publisher.slice(0, 2).join(", ") : "—";
  const edities = boek.edition_count || "—";
  const paginas = boek.number_of_pages_median || "—";
  const isbn = boek.isbn ? boek.isbn[0] : "—";
  const link = `https://openlibrary.org${boek.key}`;
  const bewaard = isBoekBewaard(boek.key);

  const coverHTML = coverId
    ? `<img class="modal-cover-img" src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg" alt="Omslag" onerror="this.outerHTML='<div class=\\'modal-cover-placeholder\\'>📖</div>'" />`
    : `<div class="modal-cover-placeholder">📖</div>`;

  const tagsHTML = (boek.subject || [])
    .slice(0, 5)
    .map(s => `<span class="modal-tag">${s}</span>`)
    .join("");

  modalInhoud.innerHTML = `
    <div class="modal-cover-section">
      ${coverHTML}
      <div class="modal-titel-blok">
        <h2>${titel}</h2>
        <p class="modal-auteur">${auteurs}</p>
        ${tagsHTML ? `<div class="modal-tags">${tagsHTML}</div>` : ""}
      </div>
    </div>
    <div class="modal-details">
      <div class="modal-detail-item">
        <span class="modal-detail-label">Eerste publicatie</span>
        <span class="modal-detail-value">${jaar}</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Talen</span>
        <span class="modal-detail-value">${talen}</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Edities</span>
        <span class="modal-detail-value">${edities}</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Pagina's</span>
        <span class="modal-detail-value">${paginas}</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">ISBN</span>
        <span class="modal-detail-value">${isbn}</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Uitgever</span>
        <span class="modal-detail-value">${uitgever}</span>
      </div>
    </div>
    <div class="modal-actions">
      <button class="modal-save-btn btn-ghost" id="modalSaveBtn">
        ${bewaard ? "★ In je lijst" : "☆ Bewaar dit boek"}
      </button>
      <a href="${link}" target="_blank" rel="noopener" style="flex:1">
        <button class="modal-open-btn" style="width:100%">Bekijk op Open Library →</button>
      </a>
    </div>
  `;

  document.getElementById("modalSaveBtn").addEventListener("click", () => {
    toggleBewaard(boek);
    document.getElementById("modalSaveBtn").textContent =
      isBoekBewaard(boek.key) ? "★ In je lijst" : "☆ Bewaar dit boek";
  });

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function sluitModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}


async function zoekBoeken(zoekterm, pagina = 1) {
  if (!zoekterm.trim()) {
    toonFout("Typ eerst iets in het zoekveld.");
    return;
  }

  huidigeTerm = zoekterm.trim();
  huidigePagina = pagina;

  toonLaden();

  const aantal = parseInt(aantalSelect.value);
  const offset = (pagina - 1) * aantal;
  const term = encodeURIComponent(huidigeTerm);
  const taal = taalFilter.value ? `&language=${encodeURIComponent(taalFilter.value)}` : "";
  const url = `${API_URL}?q=${term}&limit=${aantal}&offset=${offset}${taal}&fields=title,author_name,first_publish_year,cover_i,key,language,isbn,subject,publisher,edition_count,number_of_pages_median`;

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    totaalResultaten = data.numFound || 0;
    const boeken = data.docs || [];

    if (boeken.length === 0) {
      toonGeenResultaten(huidigeTerm);
      return;
    }

    toonResultaten(boeken, huidigeTerm, totaalResultaten);
    slaGeschiedenisOp(huidigeTerm);

  } catch (fout) {
    console.error(fout);
    toonFout("Er ging iets mis. Heb je verbinding met het internet?");
  }
}


function renderSavedPanel() {
  if (bewaardBoeken.length === 0) {
    clearSavedBtn.hidden = true;
    savedResultaat.innerHTML = `
      <div class="status-bericht">
        <div class="status-icon">☆</div>
        <p>Nog niets bewaard. Klik op ☆ op een boekkaart om het hier te zetten.</p>
      </div>
    `;
    return;
  }

  clearSavedBtn.hidden = false;
  savedResultaat.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "boeken-grid";
  bewaardBoeken.forEach((boek, i) => grid.appendChild(maakBoekKaart(boek, i)));
  savedResultaat.appendChild(grid);
}


function wisselTab(toon) {
  const isZoeken = toon === "zoeken";
  zoekPanel.hidden = !isZoeken;
  savedPanel.hidden = isZoeken;
  favTab.classList.toggle("active", isZoeken);
  savedTab.classList.toggle("active", !isZoeken);
  if (!isZoeken) renderSavedPanel();
}


zoekknop.addEventListener("click", () => zoekBoeken(zoekveld.value));

zoekveld.addEventListener("keypress", (e) => {
  if (e.key === "Enter") zoekBoeken(zoekveld.value);
});

zoekveld.addEventListener("input", () => {
  clearBtn.hidden = zoekveld.value.length === 0;
});

clearBtn.addEventListener("click", () => {
  zoekveld.value = "";
  clearBtn.hidden = true;
  zoekveld.focus();
});

willekeurigKnop.addEventListener("click", () => {
  const term = onderwerpen[Math.floor(Math.random() * onderwerpen.length)];
  zoekveld.value = term;
  zoekBoeken(term);
});

vorigeBtn.addEventListener("click", () => zoekBoeken(huidigeTerm, huidigePagina - 1));
volgendeBtn.addEventListener("click", () => zoekBoeken(huidigeTerm, huidigePagina + 1));

modalSluit.addEventListener("click", sluitModal);
modalBackdrop.addEventListener("click", sluitModal);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") sluitModal(); });

favTab.addEventListener("click", () => wisselTab("zoeken"));
savedTab.addEventListener("click", () => wisselTab("bewaard"));

clearSavedBtn.addEventListener("click", () => {
  bewaardBoeken = [];
  localStorage.removeItem("bf_saved");
  updateSavedBadge();
  renderSavedPanel();
  toonToast("Lijst is leeggemaakt");
});


updateSavedBadge();
renderGeschiedenis();
zoekBoeken("roman");
