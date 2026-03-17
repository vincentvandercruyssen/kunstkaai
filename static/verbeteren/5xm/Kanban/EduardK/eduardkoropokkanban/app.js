const STORAGE_KEY = "punk-kanban-v1"; 
// voor dat we zullen kunnen in onze web data kunnen save
const composer = document.getElementById("composer"); // voor dat we zullen text in kunnen steken
const input = document.getElementById("taskInput"); // plek waar kunnenb we text schrijven
const clearAllBtn = document.getElementById("clearAll"); // voor te cleanen
// verschilende containers 
const lanes = {
  todo: document.querySelector('[data-lane="todo"]'), // container todo
  doing: document.querySelector('[data-lane="doing"]'), // container doing
  done: document.querySelector('[data-lane="done"]'), // container done
};
// counters - we kunnen zien karts in de colums
const counters = {
  todo: document.getElementById("count-todo"),
  doing: document.getElementById("count-doing"),
  done: document.getElementById("count-done"),
};

let state = loadState(); // dat is state van alle kards
let draggedId = null; // id kard welke we zijn aan het verplatsen

/* ---------- init ---------- */
renderAll(); // render
setupDnD(); // colums
updateCounts();

/* ---------- add task ---------- */
composer.addEventListener("submit", (e) => { // als je druk op enter voor kard toevoegen
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const card = { // we maken nieuwe id voor kard welke we hebben toegvoegd en voor dat we zullen het kunnen die kard zien 
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random(), // als eerste manier was niet gelukt
    text, // text van kard
    col: "todo", // welke colum
    done: false, // kijk als het gebeurt
    createdAt: Date.now(),
  };

  state.cards.push(card); // toevoegen card in data waar staan ook andere karden
  saveState(); // save state in data
  renderAll(); // render
  input.value = ""; //cleanen plek waar wij kunnen scrijven
  input.focus();
});

/* ---------- clear all ---------- */
clearAllBtn.addEventListener("click", () => { // als klik dan alles word clean
  state = { cards: [] }; // maken clean
  saveState(); // save
  renderAll(); // render
});

/* ---------- rendering ---------- */
function renderAll() { // clean alle 3 colums
  lanes.todo.innerHTML = "";
  lanes.doing.innerHTML = "";
  lanes.done.innerHTML = "";

  const byCol = {
    todo: [],
    doing: [],
    done: [],
  };
// maken tijdelijke plek voor dat kards kunnen hier zijn
  for (const c of state.cards) byCol[c.col].push(c);

  // voor dat kards van tijdelijkste plek kunnen naar normale plek voor kards gaan
  for (const col of Object.keys(byCol)) { // kards zullen stan op,het zijn eigen plrk
    byCol[col].sort((a,b) => a.createdAt - b.createdAt);
    for (const card of byCol[col]) {
      lanes[col].appendChild(renderCard(card));
    }
  }

  updateCounts();
}

function renderCard(card) {
  const el = document.createElement("div");// crate nieuwe div
  el.className = "card" + (card.done ? " done" : ""); // als word gemaakt dan + done
  el.draggable = true; // kards kunnen tussen colums gaan
  el.dataset.id = card.id; //save id van kard in data
// text
  const text = document.createElement("span");// als we doen 2 klik dan we kunnen kard veranderen text in
  text.className = "text";
  text.textContent = card.text;
  text.title = "veranderen";

  const actions = document.createElement("div"); // container bottums
  actions.className = "actions";

  const ok = document.createElement("button"); // goed
  ok.className = "ok";
  ok.type = "button";
  ok.textContent = "✔";

  const del = document.createElement("button"); // fout
  del.className = "del";
  del.type = "button";
  del.textContent = "✖";
// putten botums in action
  actions.appendChild(ok);
  actions.appendChild(del);
// dezelefde maar met text
  el.appendChild(text);
  el.appendChild(actions);

  // done toggle
  ok.addEventListener("click", () => {
    const c = findCard(card.id);
    if (!c) return;
    c.done = !c.done;
    saveState();
    renderAll();
  });
// logik in botums
  // delete
  del.addEventListener("click", () => {// veranderen card id
    state.cards = state.cards.filter(x => x.id !== card.id); 
    saveState();
    renderAll();
  });

  // edit (double click)
  text.addEventListener("dblclick", () => {
    startInlineEdit(card.id, text);
  });

  // drag markers
  el.addEventListener("dragstart", () => {
    draggedId = card.id; // id voor css
    el.classList.add("dragging"); // toevoegen id
  });

  el.addEventListener("dragend", () => {
    draggedId = null;
    el.classList.remove("dragging");
  });

  return el; // return
}

function startInlineEdit(id, textEl) {// maken input op plek van text
  const c = findCard(id); // zoek kard in state
  if (!c) return;

  const input = document.createElement("input");// style voor js
  input.type = "text";
  input.value = c.text;
  input.maxLength = 120;
  input.style.width = "100%";
  input.style.border = "1px solid rgba(0,0,0,.35)";
  input.style.borderRadius = "12px";
  input.style.padding = "8px 10px";
  input.style.font = "inherit";
  input.style.fontWeight = "800";
  input.style.background = "rgba(255,255,255,.85)";

  textEl.replaceWith(input);// span verandern op input
  input.focus(); // focus
  input.select();// selct

  const commit = () => { // save 
    const v = input.value.trim(); // nieuwe text
    c.text = v ? v : c.text; // als geen dan blijft oude text
    saveState();
    renderAll();
  };

  input.addEventListener("blur", commit); // als we kwijten focus dan save
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") commit();
    if (e.key === "Escape") renderAll();
  });
}

/* ---------- drag & drop with ordering ---------- */
function setupDnD() {
    // voor elke colum
  for (const lane of Object.values(lanes)) {
    lane.addEventListener("dragover", (e) => {
      e.preventDefault();
      // voor dat card kan verplatsen
      const after = getAfterElement(lane, e.clientY); 
      const dragging = document.querySelector(".card.dragging");
      if (!dragging) return; // zonder dat drop zou niet werken

      if (after == null) lane.appendChild(dragging);// check waar staan elementen
      else lane.insertBefore(dragging, after);
    });

    lane.addEventListener("drop", () => {
      if (!draggedId) return;
      const laneName = lane.dataset.lane;

      // обновим колонку + порядок по текущему DOM
      const c = findCard(draggedId);
      if (!c) return;
      c.col = laneName;

      // перестроить createdAt по DOM-очереди в lane (чтобы порядок сохранялся)
      const idsInLane = [...lane.querySelectorAll(".card")].map(x => x.dataset.id);
      const base = Date.now();
      for (let i = 0; i < idsInLane.length; i++) {
        const item = findCard(idsInLane[i]);
        if (item) item.createdAt = base + i;
      }

      saveState();
      renderAll();
    });
  }
}

function getAfterElement(container, y) {
  const els = [...container.querySelectorAll(".card:not(.dragging)")];
  return els.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}

/* ---------- state helpers ---------- */
function findCard(id) {
  return state.cards.find(c => c.id === id);
}

function updateCounts() {
  counters.todo.textContent = String(state.cards.filter(c => c.col === "todo").length);
  counters.doing.textContent = String(state.cards.filter(c => c.col === "doing").length);
  counters.done.textContent = String(state.cards.filter(c => c.col === "done").length);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { cards: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.cards)) return { cards: [] };
    return parsed;
  } catch {
    return { cards: [] };
  }
}
