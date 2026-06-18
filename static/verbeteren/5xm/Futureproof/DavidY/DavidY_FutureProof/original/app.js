// ============================================================
//  FutureProof – Repair Minigame
//  app.js
// ============================================================

// --- GAME CONFIG ---
const TOTAL_ROUNDS = 10;

// Possible parts per category
const CAMERA_OPTIONS  = ['1','2','3','4'];   // 1=triple, 2=double, 3=dual, 4=single
const STORAGE_OPTIONS = ['128gb','256gb','525gb','1tb'];
const BATTERY_LABEL   = 'battery';

// Camera display names for the post-it
const CAMERA_NAMES = {
  '1': '3-lens camera',
  '2': '2-lens camera',
  '3': 'pill-2 camera',
  '4': '1-lens camera',
};

// ============================================================
//  STATE
// ============================================================
let gameState = {
  running: false,
  round: 1,
  startTime: null,
  elapsedMs: 0,
  timerInterval: null,

  // Current round's task
  task: {
    camera: null,    // null = not required this round
    battery: false,
    storage: null,   // null = not required
  },

  // What has been installed this round
  installed: {
    camera: null,
    battery: false,
    storage: null,
  },

  backIsOpen: false,
  roundTransitioning: false,
};

// ============================================================
//  DOM REFS
// ============================================================
const screenStart   = document.getElementById('screen-start');
const screenGame    = document.getElementById('screen-game');
const screenEnd     = document.getElementById('screen-end');

const timerDisplay  = document.getElementById('timer-display');
const roundNum      = document.getElementById('round-num');
const taskList      = document.getElementById('task-list');

const phoneBackOn   = document.getElementById('phone-back-on');
const phoneBackOff  = document.getElementById('phone-back-off');
const phoneClickHint = document.getElementById('phone-click-hint');
const phone         = document.getElementById('phone');

const slotBattery   = document.getElementById('slot-battery');
const slotStorage   = document.getElementById('slot-storage');
const fillBattery   = document.getElementById('fill-battery');
const fillStorage   = document.getElementById('fill-storage');

const btnCloseBack  = document.getElementById('btn-close-back');
const btnStart      = document.getElementById('btn-start');
const btnPlayAgain  = document.getElementById('btn-play-again');
const btnBackProject = document.getElementById('btn-back-project');
const finalTimeEl   = document.getElementById('final-time');

// ============================================================
//  SCREEN SWITCHING
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ============================================================
//  TIMER
// ============================================================
function startTimer() {
  gameState.startTime = Date.now() - gameState.elapsedMs;
  gameState.timerInterval = setInterval(updateTimerDisplay, 50);
}

function stopTimer() {
  clearInterval(gameState.timerInterval);
  gameState.timerInterval = null;
}

function updateTimerDisplay() {
  gameState.elapsedMs = Date.now() - gameState.startTime;
  timerDisplay.textContent = formatTime(gameState.elapsedMs);
}

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60).toString().padStart(2, '0');
  const sec = (totalSec % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

// ============================================================
//  ROUND GENERATION
// ============================================================
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTask() {
  // Always need at least 1 part, can need 1–3
  const howMany = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
  const categories = ['camera', 'battery', 'storage'];
  // Shuffle categories and pick howMany
  const shuffled = categories.sort(() => Math.random() - 0.5).slice(0, howMany);

  const task = { camera: null, battery: false, storage: null };

  if (shuffled.includes('camera'))  task.camera  = randomChoice(CAMERA_OPTIONS);
  if (shuffled.includes('battery')) task.battery = true;
  if (shuffled.includes('storage')) task.storage  = randomChoice(STORAGE_OPTIONS);

  return task;
}

// ============================================================
//  RENDER POST-IT
// ============================================================
function renderPostIt() {
  taskList.innerHTML = '';
  const { task } = gameState;

  if (task.camera) {
    const li = createTaskItem('camera', CAMERA_NAMES[task.camera]);
    taskList.appendChild(li);
  }
  if (task.battery) {
    const li = createTaskItem('battery', 'Replace battery');
    taskList.appendChild(li);
  }
  if (task.storage) {
    const li = createTaskItem('storage', `${task.storage} storage`);
    taskList.appendChild(li);
  }
}

function createTaskItem(key, text) {
  const li = document.createElement('li');
  li.textContent = text;
  li.dataset.key = key;
  li.id = `task-${key}`;
  return li;
}

function markTaskDone(key) {
  const li = document.getElementById(`task-${key}`);
  if (li) li.classList.add('done');
}

// ============================================================
//  PHONE: OPEN / CLOSE BACK
// ============================================================
function openBack() {
  if (gameState.backIsOpen) return;
  if (gameState.roundTransitioning) return;
  gameState.backIsOpen = true;
  phoneBackOn.classList.add('hidden');
  phoneBackOff.classList.remove('hidden');
  phoneClickHint.style.opacity = '0';
  btnCloseBack.classList.add('hidden');
}

function closeBack() {
  if (!gameState.backIsOpen) return;
  if (!allTasksDone()) return;

  gameState.backIsOpen = false;
  gameState.roundTransitioning = true;
  phoneBackOff.classList.add('hidden');
  phoneBackOn.classList.remove('hidden');
  phoneClickHint.style.opacity = '';
  btnCloseBack.classList.add('hidden');

  // Hide the tap hint while transitioning
  phoneClickHint.style.opacity = '0';

  // Flash phone green, then do post-it swap
  phone.classList.add('flash-ok');
  setTimeout(() => {
    phone.classList.remove('flash-ok');

    if (gameState.round >= TOTAL_ROUNDS) {
      gameState.roundTransitioning = false;
      endGame();
      return;
    }

    // Animate post-it out
    const postit = document.getElementById('postit');
    postit.classList.add('postit-exit');

    setTimeout(() => {
      postit.classList.remove('postit-exit');
      // Load next round data (updates task + resets installed/phone/parts)
      startRound(gameState.round + 1);
      // Animate post-it in
      postit.classList.add('postit-enter');
      setTimeout(() => {
        postit.classList.remove('postit-enter');
        gameState.roundTransitioning = false;
        phoneClickHint.style.opacity = '';
      }, 350);
    }, 320);

  }, 600);
}

phone.addEventListener('click', () => {
  if (!gameState.backIsOpen) {
    openBack();
  }
});

btnCloseBack.addEventListener('click', closeBack);

// ============================================================
//  PART INSTALLATION CHECK
// ============================================================
function allTasksDone() {
  const { task, installed } = gameState;
  if (task.camera  && installed.camera  !== task.camera)  return false;
  if (task.battery && !installed.battery)                 return false;
  if (task.storage && installed.storage !== task.storage) return false;
  return true;
}

function checkShowCloseButton() {
  if (gameState.backIsOpen && allTasksDone()) {
    btnCloseBack.classList.remove('hidden');
  } else {
    btnCloseBack.classList.add('hidden');
  }
}

// ============================================================
//  DRAG AND DROP
// ============================================================
function initDragDrop() {
  const parts = document.querySelectorAll('.part');
  parts.forEach(part => {
    part.addEventListener('dragstart', onDragStart);
    part.addEventListener('dragend', onDragEnd);
    part.addEventListener('click', onPartClick);
  });

  const slots = document.querySelectorAll('.slot');
  slots.forEach(slot => {
    slot.addEventListener('dragover', onDragOver);
    slot.addEventListener('dragleave', onDragLeave);
    slot.addEventListener('drop', onDrop);
  });

  // Camera area on open phone is also a drop target
  const camArea = document.getElementById('installed-camera-display-open');
  if (camArea) {
    camArea.addEventListener('dragover', e => { e.preventDefault(); camArea.style.borderColor = 'var(--accent)'; });
    camArea.addEventListener('dragleave', () => { camArea.style.borderColor = ''; });
    camArea.addEventListener('drop', e => {
      e.preventDefault();
      camArea.style.borderColor = '';
      if (!dragData || dragData.type !== 'camera') return;
      tryCameraInstall(dragData.value, dragData.id);
      dragData = null;
    });
  }
}

let dragData = null;

function onDragStart(e) {
  dragData = {
    type:  e.currentTarget.dataset.type,
    value: e.currentTarget.dataset.value,
    id:    e.currentTarget.id,
  };
  e.currentTarget.style.opacity = '0.5';
}

function onDragEnd(e) {
  e.currentTarget.style.opacity = '';
}

function onDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
}

function onDragLeave(e) {
  e.currentTarget.classList.remove('drag-over');
}

function onDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  if (!dragData) return;
  tryInstall(dragData.type, dragData.value, dragData.id, e.currentTarget);
  dragData = null;
}

// Click-to-install (fallback / mobile friendliness)
let selectedPart = null;

function onPartClick(e) {
  const part = e.currentTarget;
  if (part.classList.contains('used')) return;
  if (!gameState.backIsOpen) {
    // hint: need to open back first
    phone.classList.add('shake');
    setTimeout(() => phone.classList.remove('shake'), 400);
    return;
  }

  if (selectedPart === part) {
    // Deselect
    part.classList.remove('selected-part');
    selectedPart = null;
    return;
  }

  if (selectedPart) selectedPart.classList.remove('selected-part');
  selectedPart = part;
  part.classList.add('selected-part');

  // Auto-install if only one valid slot
  const type = part.dataset.type;
  const value = part.dataset.value;

  if (type === 'battery') {
    tryInstall(type, value, part.id, slotBattery);
    selectedPart = null;
  } else if (type === 'storage') {
    tryInstall(type, value, part.id, slotStorage);
    selectedPart = null;
  } else if (type === 'camera') {
    // Camera goes on phone camera slot — direct install
    tryCameraInstall(value, part.id);
    selectedPart = null;
  }
}

function tryInstall(type, value, partId, slotEl) {
  const { task, installed } = gameState;

  if (type === 'battery' && slotEl.dataset.slot === 'battery') {
    if (!task.battery) { showHint("Battery doesn't need replacing this round!"); wrongPart(slotEl); return; }
    if (installed.battery) return;
    installed.battery = true;
    fillBattery.textContent = 'Battery ✓';
    slotEl.classList.add('filled');
    document.getElementById(partId).classList.add('used');
    markTaskDone('battery');
    checkShowCloseButton();
    return;
  }

  if (type === 'storage' && slotEl.dataset.slot === 'storage') {
    if (!task.storage) { showHint("Storage doesn't need replacing this round!"); wrongPart(slotEl); return; }
    if (task.storage !== value) { showHint(`Wrong storage — need ${task.storage}!`); wrongPart(slotEl); return; }
    if (installed.storage) return;
    installed.storage = value;
    fillStorage.textContent = `${value} ✓`;
    slotEl.classList.add('filled');
    document.getElementById(partId).classList.add('used');
    markTaskDone('storage');
    checkShowCloseButton();
    return;
  }

  wrongPart(slotEl);
}

function tryCameraInstall(value, partId) {
  const { task, installed } = gameState;

  // Camera not needed this round
  if (!task.camera) {
    showHint("Camera doesn't need replacing this round!");
    wrongPart(document.getElementById(partId));
    return;
  }
  // Wrong camera model
  if (task.camera !== value) {
    showHint(`Wrong camera module — check the post-it!`);
    wrongPart(document.getElementById(partId));
    return;
  }
  // Already installed
  if (installed.camera === value) return;

  installed.camera = value;
  updateCameraVisual(value, 'installed-camera-display-open');
  const camMod = document.getElementById('installed-camera-display-open');
  if (camMod) camMod.style.outline = '3px solid var(--green-ok)';
  document.getElementById(partId).classList.add('used');
  markTaskDone('camera');
  checkShowCloseButton();
}

function wrongPart(el) {
  if (!el) return;
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 400);
}

// Floating hint message
let hintTimeout = null;
function showHint(msg) {
  let hint = document.getElementById('game-hint');
  if (!hint) {
    hint = document.createElement('div');
    hint.id = 'game-hint';
    hint.style.cssText = `
      position:absolute; bottom:80px; left:50%; transform:translateX(-50%);
      background:rgba(20,10,0,0.88); color:#f5e642;
      font-family:'Permanent Marker',cursive; font-size:0.95rem;
      padding:10px 22px; border-radius:30px; white-space:nowrap;
      box-shadow:0 4px 14px rgba(0,0,0,0.4); z-index:100;
      pointer-events:none;
    `;
    document.querySelector('.bench-surface').appendChild(hint);
  }
  hint.textContent = msg;
  hint.style.display = 'block';
  clearTimeout(hintTimeout);
  hintTimeout = setTimeout(() => { if(hint) hint.style.display = 'none'; }, 2200);
}

// SVG markup for each camera module — matches the parts tray exactly
// viewBox 70x70, lenses properly spaced so nothing overlaps
const CAMERA_SVG = {
  // empty placeholder — shown before a camera is installed
  'empty': `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;border-radius:8px;">
    <rect width="70" height="70" rx="12" fill="#111"/>
    <circle cx="35" cy="35" r="22" fill="#1c1c1c" stroke="#666" stroke-width="3"/>
    <circle cx="35" cy="35" r="14" fill="#111" stroke="#444" stroke-width="2"/>
  </svg>`,
  // 3-lens: two stacked left (r=8), one medium right (r=7), flash dot top-right
  '1': `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;border-radius:8px;">
    <rect width="70" height="70" rx="12" fill="#111"/>
    <circle cx="22" cy="20" r="8" fill="#1c1c1c" stroke="#555" stroke-width="2"/>
    <circle cx="22" cy="20" r="5" fill="#080808" stroke="#333" stroke-width="1"/>
    <circle cx="22" cy="20" r="3" fill="url(#pl1)"/>
    <circle cx="20" cy="18" r="1" fill="rgba(255,255,255,0.3)"/>
    <circle cx="22" cy="50" r="8" fill="#1c1c1c" stroke="#555" stroke-width="2"/>
    <circle cx="22" cy="50" r="5" fill="#080808" stroke="#333" stroke-width="1"/>
    <circle cx="22" cy="50" r="3" fill="url(#pl1)"/>
    <circle cx="20" cy="48" r="1" fill="rgba(255,255,255,0.3)"/>
    <circle cx="50" cy="35" r="7" fill="#1c1c1c" stroke="#555" stroke-width="2"/>
    <circle cx="50" cy="35" r="4.5" fill="#080808" stroke="#333" stroke-width="1"/>
    <circle cx="50" cy="35" r="2.5" fill="url(#pl1)"/>
    <circle cx="48" cy="33" r="0.9" fill="rgba(255,255,255,0.28)"/>
    <circle cx="50" cy="14" r="3" fill="#bbb" opacity="0.65"/>
    <defs><radialGradient id="pl1" cx="35%" cy="35%" r="60%"><stop offset="0%" stop-color="#4a7aaa"/><stop offset="100%" stop-color="#040810"/></radialGradient></defs>
  </svg>`,
  // 2-lens: two stacked left (r=8), flash top-right, small sensor dot bottom-right
  '2': `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;border-radius:8px;">
    <rect width="70" height="70" rx="12" fill="#111"/>
    <circle cx="24" cy="22" r="8" fill="#1c1c1c" stroke="#555" stroke-width="2"/>
    <circle cx="24" cy="22" r="5" fill="#080808" stroke="#333" stroke-width="1"/>
    <circle cx="24" cy="22" r="3" fill="url(#pl2)"/>
    <circle cx="22" cy="20" r="1" fill="rgba(255,255,255,0.3)"/>
    <circle cx="24" cy="50" r="8" fill="#1c1c1c" stroke="#555" stroke-width="2"/>
    <circle cx="24" cy="50" r="5" fill="#080808" stroke="#333" stroke-width="1"/>
    <circle cx="24" cy="50" r="3" fill="url(#pl2)"/>
    <circle cx="22" cy="48" r="1" fill="rgba(255,255,255,0.3)"/>
    <circle cx="52" cy="18" r="4" fill="#ddd" opacity="0.7"/>
    <circle cx="52" cy="50" r="2.5" fill="#2a2a2a" stroke="#555" stroke-width="1.5"/>
    <defs><radialGradient id="pl2" cx="35%" cy="35%" r="60%"><stop offset="0%" stop-color="#4a7aaa"/><stop offset="100%" stop-color="#040810"/></radialGradient></defs>
  </svg>`,
  // pill-2: two lenses side by side in a pill housing
  '3': `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;border-radius:8px;">
    <rect width="70" height="70" rx="12" fill="#111"/>
    <rect x="6" y="18" width="58" height="34" rx="12" fill="#1c1c1c" stroke="#555" stroke-width="2"/>
    <circle cx="24" cy="35" r="9" fill="#080808" stroke="#444" stroke-width="1.5"/>
    <circle cx="24" cy="35" r="5.5" fill="url(#pl3)"/>
    <circle cx="21.5" cy="32.5" r="1.3" fill="rgba(255,255,255,0.28)"/>
    <circle cx="47" cy="35" r="7" fill="#080808" stroke="#444" stroke-width="1.5"/>
    <circle cx="47" cy="35" r="4" fill="url(#pl3)"/>
    <circle cx="45" cy="33" r="0.9" fill="rgba(255,255,255,0.22)"/>
    <defs><radialGradient id="pl3" cx="35%" cy="35%" r="60%"><stop offset="0%" stop-color="#4a7aaa"/><stop offset="100%" stop-color="#040810"/></radialGradient></defs>
  </svg>`,
  // 1-lens: one big centered lens
  '4': `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;border-radius:8px;">
    <rect width="70" height="70" rx="12" fill="#111"/>
    <circle cx="35" cy="35" r="22" fill="#1c1c1c" stroke="#555" stroke-width="2.5"/>
    <circle cx="35" cy="35" r="16" fill="#080808" stroke="#333" stroke-width="1.5"/>
    <circle cx="35" cy="35" r="9" fill="url(#pl4)"/>
    <circle cx="30" cy="30" r="2.2" fill="rgba(255,255,255,0.3)"/>
    <defs><radialGradient id="pl4" cx="35%" cy="35%" r="60%"><stop offset="0%" stop-color="#4a7aaa"/><stop offset="100%" stop-color="#040810"/></radialGradient></defs>
  </svg>`,
};

function updateCameraVisual(value, elId) {
  const mod = document.getElementById(elId);
  if (!mod) return;
  const svg = CAMERA_SVG[value] || CAMERA_SVG['empty'];
  mod.style.cssText = 'background:none; border:none; padding:0; width:65px; height:65px; border-radius:10px; overflow:hidden;';
  mod.innerHTML = svg;
}

// ============================================================
//  LEADERBOARD  (localStorage)
// ============================================================
const LB_KEY = 'futureproof_leaderboard';
const LB_MAX = 10;

function loadLeaderboard() {
  try { return JSON.parse(localStorage.getItem(LB_KEY)) || []; }
  catch { return []; }
}

function saveLeaderboard(entries) {
  localStorage.setItem(LB_KEY, JSON.stringify(entries));
}

function addScore(name, ms) {
  const entries = loadLeaderboard();
  entries.push({ name: name.toUpperCase(), ms });
  entries.sort((a, b) => a.ms - b.ms);
  const trimmed = entries.slice(0, LB_MAX);
  saveLeaderboard(trimmed);
  return trimmed;
}

function renderLeaderboard(entries, highlightMs) {
  const list = document.getElementById('leaderboard-list');
  list.innerHTML = '';
  const medals = ['gold', 'silver', 'bronze'];
  entries.forEach((e, i) => {
    const li = document.createElement('li');
    if (e.ms === highlightMs) li.classList.add('lb-highlight');

    const rank = document.createElement('span');
    rank.className = 'lb-rank' + (medals[i] ? ` ${medals[i]}` : '');
    rank.textContent = `${i + 1}.`;

    const name = document.createElement('span');
    name.className = 'lb-name';
    name.textContent = e.name;

    const time = document.createElement('span');
    time.className = 'lb-time';
    time.textContent = formatTime(e.ms);

    li.append(rank, name, time);
    list.appendChild(li);
  });
}

// ============================================================
//  INITIALS INPUT BEHAVIOUR
// ============================================================
function initInitialsInputs() {
  const boxes = [
    document.getElementById('init-0'),
    document.getElementById('init-1'),
    document.getElementById('init-2'),
  ];

  boxes.forEach((box, i) => {
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        if (box.value === '' && i > 0) {
          boxes[i - 1].value = '';
          boxes[i - 1].classList.remove('filled');
          boxes[i - 1].focus();
        } else {
          box.value = '';
          box.classList.remove('filled');
        }
        e.preventDefault();
      }
    });

    box.addEventListener('input', () => {
      const ch = box.value.replace(/[^a-zA-Z]/g, '').slice(-1);
      box.value = ch.toUpperCase();
      if (ch) {
        box.classList.add('filled');
        if (i < boxes.length - 1) boxes[i + 1].focus();
      } else {
        box.classList.remove('filled');
      }
    });
  });

  document.getElementById('btn-submit-score').addEventListener('click', () => {
    const name = boxes.map(b => b.value || '_').join('');
    const entries = addScore(name, gameState.elapsedMs);
    renderLeaderboard(entries, gameState.elapsedMs);
    document.getElementById('name-entry-section').classList.add('hidden');
    document.getElementById('leaderboard-section').classList.remove('hidden');
  });
}


function startRound(round) {
  gameState.round = round;
  gameState.task = generateTask();
  gameState.installed = { camera: null, battery: false, storage: null };
  gameState.backIsOpen = false;

  roundNum.textContent = round;

  // Reset phone visual
  phoneBackOff.classList.add('hidden');
  phoneBackOn.classList.remove('hidden');
  phoneClickHint.style.opacity = '';

  // Reset slots
  slotBattery.classList.remove('filled');
  slotStorage.classList.remove('filled');
  fillBattery.textContent = '';
  fillStorage.textContent = '';

  // Reset camera module visual back to empty placeholder
  const camMod = document.getElementById('installed-camera-display-open');
  if (camMod) {
    camMod.style.cssText = 'background:none;border:none;padding:0;width:65px;height:65px;border-radius:10px;overflow:hidden;outline:none;';
    camMod.innerHTML = CAMERA_SVG['empty'];
  }
  const camModClosed = document.getElementById('installed-camera-display');
  if (camModClosed) {
    camModClosed.style.cssText = 'background:none;border:none;padding:0;width:65px;height:65px;border-radius:10px;overflow:hidden;';
    camModClosed.innerHTML = CAMERA_SVG['empty'];
  }

  // Reset parts
  document.querySelectorAll('.part').forEach(p => {
    p.classList.remove('used', 'selected-part');
    p.style.opacity = '';
  });

  btnCloseBack.classList.add('hidden');

  renderPostIt();
}

function nextRound() {
  if (gameState.round >= TOTAL_ROUNDS) {
    endGame();
  } else {
    startRound(gameState.round + 1);
  }
}

// ============================================================
//  GAME START / END
// ============================================================
function startGame() {
  gameState.elapsedMs = 0;
  timerDisplay.textContent = '00:00';
  showScreen('screen-game');
  startRound(1);
  startTimer();
}

function endGame() {
  stopTimer();
  finalTimeEl.textContent = formatTime(gameState.elapsedMs);

  // Reset name entry
  ['init-0','init-1','init-2'].forEach(id => {
    const el = document.getElementById(id);
    el.value = '';
    el.classList.remove('filled');
  });
  document.getElementById('name-entry-section').classList.remove('hidden');
  document.getElementById('leaderboard-section').classList.add('hidden');

  showScreen('screen-end');
  // Focus first box after transition
  setTimeout(() => document.getElementById('init-0').focus(), 150);
}

// ============================================================
//  BUTTON LISTENERS
// ============================================================
btnStart.addEventListener('click', startGame);

btnPlayAgain.addEventListener('click', startGame);

btnBackProject.addEventListener('click', () => {
  // Redirect to the crowdfunding page
  window.location.href = 'https://yusuf.kunstkaai.online/futureproof/';
});

// ============================================================
//  INIT
// ============================================================
initDragDrop();
initInitialsInputs();
showScreen('screen-start');

// CSS for selected-part highlight (injected once)
const style = document.createElement('style');
style.textContent = `
  .selected-part {
    border-color: #f5e642 !important;
    box-shadow: 0 0 0 3px rgba(245,230,66,0.4), 0 6px 18px rgba(0,0,0,0.5);
    transform: scale(1.1) translateY(-2px);
  }
`;
document.head.appendChild(style);

