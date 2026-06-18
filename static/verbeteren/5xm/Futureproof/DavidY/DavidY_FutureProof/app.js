// ============================================================
//  FutureProof – Repair Minigame  |  app.js
// ============================================================

const TOTAL_ROUNDS = 10;
const CAMERA_OPTIONS  = ['1','2','3','4'];
const STORAGE_OPTIONS = ['128gb','256gb','525gb','1tb'];
const DISPLAY_OPTIONS = ['standard','pro','lcd'];
const BATTERY_LABEL   = 'battery';

const CAMERA_NAMES = {
  '1': '3-lens camera',
  '2': '2-lens camera',
  '3': 'pill-2 camera',
  '4': '1-lens camera',
};

const DISPLAY_NAMES = {
  'standard': 'OLED display',
  'pro':      'Pro OLED display',
  'lcd':      'LCD display',
};

// ============================================================
//  SETTINGS  (localStorage)
// ============================================================
const SETTINGS_KEY = 'futureproof_settings';

function loadSettings() {
  try { return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}; }
  catch { return {}; }
}
function saveSettings(s) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

let settings = Object.assign({ tutorial: true, difficulty: 'easy' }, loadSettings());

// ============================================================
//  STATE
// ============================================================
let gameState = {
  running: false,
  round: 1,
  startTime: null,
  elapsedMs: 0,
  timerInterval: null,
  isTutorial: false,     // true while playing round 0
  hardMode: false,

  task: { camera: null, battery: false, storage: null, display: null },
  installed: { camera: null, battery: false, storage: null, display: null },
  cleared: { battery: false, storage: false, display: false },  // hard mode: old parts removed

  backIsOpen: false,
  frontIsOpen: false,
  roundTransitioning: false,
};

// ============================================================
//  DOM REFS
// ============================================================
const screenStart    = document.getElementById('screen-start');
const screenGame     = document.getElementById('screen-game');
const screenEnd      = document.getElementById('screen-end');

const timerDisplay   = document.getElementById('timer-display');
const roundNum       = document.getElementById('round-num');
const taskList       = document.getElementById('task-list');

const phoneBackOn    = document.getElementById('phone-back-on');
const phoneBackOff   = document.getElementById('phone-back-off');
const phoneFrontOpen = document.getElementById('phone-front-open');
const phoneClickHint = document.getElementById('phone-click-hint');
const phone          = document.getElementById('phone');

const slotBattery    = document.getElementById('slot-battery');
const slotStorage    = document.getElementById('slot-storage');
const slotDisplay    = document.getElementById('slot-display');
const fillBattery    = document.getElementById('fill-battery');
const fillStorage    = document.getElementById('fill-storage');
const fillDisplay    = document.getElementById('fill-display');

const btnCloseBack   = document.getElementById('btn-close-back');
const btnCloseFront  = document.getElementById('btn-close-front');
const btnStart       = document.getElementById('btn-start');
const btnPlayAgain   = document.getElementById('btn-play-again');
const btnBackProject = document.getElementById('btn-back-project');
const finalTimeEl    = document.getElementById('final-time');

const displayPartsPanel = document.getElementById('display-parts-panel');

// Tutorial
const tutorialOverlay = document.getElementById('tutorial-overlay');
const tutorialBubble  = document.getElementById('tutorial-bubble');
const tutorialText    = document.getElementById('tutorial-text');
const btnTutorialNext = document.getElementById('btn-tutorial-next');
const tutorialSpot    = document.getElementById('tutorial-spotlight');

// Options
const btnOptions      = document.getElementById('btn-options');
const optionsModal    = document.getElementById('options-modal');
const btnCloseOptions = document.getElementById('btn-close-options');
const btnSaveOptions  = document.getElementById('btn-save-options');
const optTutorial     = document.getElementById('opt-tutorial');
const diffEasy        = document.getElementById('diff-easy');
const diffHard        = document.getElementById('diff-hard');

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
  const isHard = gameState.hardMode;

  if (isHard) {
    // Hard mode: always replace display + 0-3 extras from camera/battery/storage
    const extras = ['camera','battery','storage'].sort(() => Math.random() - 0.5);
    const numExtras = Math.floor(Math.random() * (extras.length + 1)); // 0, 1, 2, or 3
    const task = { camera: null, battery: false, storage: null, display: randomChoice(DISPLAY_OPTIONS) };
    for (let i = 0; i < numExtras; i++) {
      if (extras[i] === 'camera')  task.camera  = randomChoice(CAMERA_OPTIONS);
      if (extras[i] === 'battery') task.battery = true;
      if (extras[i] === 'storage') task.storage = randomChoice(STORAGE_OPTIONS);
    }
    return task;
  }

  // Easy mode: 1–3 of camera/battery/storage
  const howMany = Math.floor(Math.random() * 3) + 1;
  const categories = ['camera','battery','storage'].sort(() => Math.random() - 0.5).slice(0, howMany);
  const task = { camera: null, battery: false, storage: null, display: null };
  if (categories.includes('camera'))  task.camera  = randomChoice(CAMERA_OPTIONS);
  if (categories.includes('battery')) task.battery = true;
  if (categories.includes('storage')) task.storage = randomChoice(STORAGE_OPTIONS);
  return task;
}

// Tutorial task: simple — just replace battery
function makeTutorialTask() {
  if (gameState.hardMode) return { camera: null, battery: true, storage: null, display: 'standard' };
  return { camera: null, battery: true, storage: null, display: null };
}

// ============================================================
//  RENDER POST-IT
// ============================================================
function renderPostIt() {
  taskList.innerHTML = '';
  const { task } = gameState;
  if (task.camera)  taskList.appendChild(createTaskItem('camera',  CAMERA_NAMES[task.camera]));
  if (task.battery) taskList.appendChild(createTaskItem('battery', 'Replace battery'));
  if (task.storage) taskList.appendChild(createTaskItem('storage', `${task.storage} storage`));
  if (task.display) taskList.appendChild(createTaskItem('display', DISPLAY_NAMES[task.display]));
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
//  PHONE: OPEN / CLOSE
// ============================================================

// Phone always starts on back. Back cover removal shows internals (C/B/S).
// In hard mode, flip button lets you go to front to remove screen (display slot).
// Display-only tasks auto-flip to front on round start.
// When display is installed, auto-flip back to back.
// Round always finishes from the back.

function openBack() {
  if (gameState.backIsOpen) return;
  if (gameState.roundTransitioning) return;
  gameState.backIsOpen = true;
  gameState.frontIsOpen = false;
  phoneBackOn.classList.add('hidden');
  phoneBackOff.classList.remove('hidden');
  phoneFrontOpen.classList.add('hidden');
  phoneClickHint.style.opacity = '0';
  updateFlipButton();
  setupOldPartRemoval();
  checkShowCloseButton();
}

function openFront() {
  if (gameState.frontIsOpen) return;
  if (gameState.roundTransitioning) return;
  gameState.frontIsOpen = true;
  gameState.backIsOpen = false;
  phoneBackOn.classList.add('hidden');
  phoneBackOff.classList.add('hidden');
  phoneFrontOpen.classList.remove('hidden');
  phoneClickHint.style.opacity = '0';
  updateFlipButton();
  setupOldDisplayRemoval();
  checkShowCloseButton();
}

// Show the closed back face (phone "shut", back side up)
function showClosedBack() {
  gameState.backIsOpen = false;
  gameState.frontIsOpen = false;
  phoneBackOff.classList.add('hidden');
  phoneFrontOpen.classList.add('hidden');
  phoneBackOn.classList.remove('hidden');
  phoneBackOn.classList.remove('phone-showing-front');
  phoneClickHint.style.opacity = '';
  const flipBtn = document.getElementById('btn-flip');
  if (flipBtn) flipBtn.style.display = 'none';
  btnCloseBack.classList.add('hidden');
  btnCloseFront.classList.add('hidden');
}

function flipToFront() {
  if (gameState.roundTransitioning) return;
  phone.classList.add('phone-flipping');
  setTimeout(() => {
    phone.classList.remove('phone-flipping');
    openFront();
  }, 200);
}

function flipToBack() {
  if (gameState.roundTransitioning) return;
  phone.classList.add('phone-flipping');
  setTimeout(() => {
    phone.classList.remove('phone-flipping');
    openBack();
  }, 200);
}

function updateFlipButton() {
  const btn = document.getElementById('btn-flip');
  if (!btn) return;
  if (!gameState.hardMode || !gameState.task.display) {
    btn.style.display = 'none';
    return;
  }
  if (gameState.backIsOpen) {
    btn.style.display = '';
    btn.textContent = '🔄 Flip over — replace screen';
    btn.onclick = flipToFront;
  } else if (gameState.frontIsOpen) {
    btn.style.display = '';
    btn.textContent = '🔄 Flip back over';
    btn.onclick = flipToBack;
  } else {
    btn.style.display = 'none';
  }
}

function closeBack() {
  if (!gameState.backIsOpen) return;
  if (!allTasksDone()) return;
  // During tutorial waitForClose step, green button advances tutorial instead of finishing
  if (gameState.isTutorial) {
    const steps = getTutorialSteps();
    if (tutStep >= 0 && steps[tutStep] && steps[tutStep].waitForClose) {
      showTutorialStep(tutStep + 1);
      return;
    }
  }
  finishRound();
}

function closeFront() {
  // Not used for closing — display install auto-flips back. Keep for safety.
  if (!gameState.frontIsOpen) return;
  if (!allTasksDone()) return;
  finishRound();
}

function finishRound() {
  showClosedBack();
  gameState.roundTransitioning = true;

  phone.classList.add('flash-ok');
  setTimeout(() => {
    phone.classList.remove('flash-ok');

    if (gameState.isTutorial) {
      gameState.isTutorial = false;
      gameState.roundTransitioning = false;
      showTutorialStep('done');
      return;
    }

    if (gameState.round >= TOTAL_ROUNDS) {
      gameState.roundTransitioning = false;
      endGame();
      return;
    }

    const postit = document.getElementById('postit');
    postit.classList.add('postit-exit');
    setTimeout(() => {
      postit.classList.remove('postit-exit');
      startRound(gameState.round + 1);
      postit.classList.add('postit-enter');
      setTimeout(() => {
        postit.classList.remove('postit-enter');
        gameState.roundTransitioning = false;
        phoneClickHint.style.opacity = '';
      }, 350);
    }, 320);
  }, 600);
}

// Tapping the closed phone always opens the back
phone.addEventListener('click', () => {
  if (gameState.roundTransitioning) return;
  if (!gameState.backIsOpen && !gameState.frontIsOpen) {
    openBack();
  }
});

btnCloseBack.addEventListener('click', closeBack);
btnCloseFront.addEventListener('click', closeFront);

// Flip button wiring
document.addEventListener('DOMContentLoaded', () => {
  const flipBtn = document.getElementById('btn-flip');
  if (flipBtn) flipBtn.addEventListener('click', flipToFront);
});

// ============================================================
//  ALL TASKS DONE CHECK
// ============================================================
function allTasksDone() {
  const { task, installed } = gameState;
  if (task.camera  && installed.camera  !== task.camera)  return false;
  if (task.battery && !installed.battery)                 return false;
  if (task.storage && installed.storage !== task.storage) return false;
  if (task.display && installed.display !== task.display) return false;
  return true;
}

function backTasksDone() {
  const { task, installed } = gameState;
  if (task.camera  && installed.camera  !== task.camera)  return false;
  if (task.battery && !installed.battery)                 return false;
  if (task.storage && installed.storage !== task.storage) return false;
  return true;
}

function checkShowCloseButton() {
  btnCloseBack.classList.add('hidden');
  btnCloseFront.classList.add('hidden');

  if (gameState.hardMode && gameState.task.display) {
    if (!allTasksDone()) {
      // If back tasks are done but display isn't yet, show flip button to go to front
      if (gameState.backIsOpen && backTasksDone() && !gameState.installed.display) {
        updateFlipButton();
      }
      return;
    }
    // All done including display — auto-flip back to back then finish
    if (gameState.frontIsOpen) {
      phone.classList.add('phone-flipping');
      setTimeout(() => {
        phone.classList.remove('phone-flipping');
        showClosedBack();
        setTimeout(() => {
          if (gameState.isTutorial) {
            // Let the tutorial advance to the final step naturally
            showTutorialStep(tutStep + 1);
          } else {
            finishRound();
          }
        }, 150);
      }, 200);
      return;
    }
    if (gameState.backIsOpen) btnCloseBack.classList.remove('hidden');
  } else {
    // Easy mode or hard mode with no display task
    if (!allTasksDone()) return;
    if (gameState.backIsOpen) btnCloseBack.classList.remove('hidden');
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

  const slots = document.querySelectorAll('.slot, .display-slot');
  slots.forEach(slot => {
    slot.addEventListener('dragover', onDragOver);
    slot.addEventListener('dragleave', onDragLeave);
    slot.addEventListener('drop', onDrop);
  });

  // Camera area on open phone
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
  dragData = { type: e.currentTarget.dataset.type, value: e.currentTarget.dataset.value, id: e.currentTarget.id };
  e.currentTarget.style.opacity = '0.5';
}
function onDragEnd(e) { e.currentTarget.style.opacity = ''; }
function onDragOver(e) { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }
function onDragLeave(e) { e.currentTarget.classList.remove('drag-over'); }
function onDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  if (!dragData) return;
  tryInstall(dragData.type, dragData.value, dragData.id, e.currentTarget);
  dragData = null;
}

let selectedPart = null;

function onPartClick(e) {
  const part = e.currentTarget;
  if (part.classList.contains('used')) return;
  const type = part.dataset.type;

  // Enforce correct phone face
  if (type === 'display') {
    if (!gameState.frontIsOpen) {
      if (gameState.hardMode && gameState.backIsOpen) {
        showHint('Flip to front to install the display! 🔄');
      }
      phone.classList.add('shake');
      setTimeout(() => phone.classList.remove('shake'), 400);
      return;
    }
  } else {
    // battery / storage / camera need back open
    if (!gameState.backIsOpen) {
      if (gameState.hardMode && gameState.frontIsOpen) {
        showHint('Flip to back to install this part! 🔄');
      }
      phone.classList.add('shake');
      setTimeout(() => phone.classList.remove('shake'), 400);
      return;
    }
  }

  if (selectedPart === part) {
    part.classList.remove('selected-part');
    selectedPart = null;
    return;
  }
  if (selectedPart) selectedPart.classList.remove('selected-part');
  selectedPart = part;
  part.classList.add('selected-part');

  const value = part.dataset.value;
  if (type === 'battery') {
    tryInstall(type, value, part.id, slotBattery); selectedPart = null;
  } else if (type === 'storage') {
    tryInstall(type, value, part.id, slotStorage); selectedPart = null;
  } else if (type === 'camera') {
    tryCameraInstall(value, part.id); selectedPart = null;
  } else if (type === 'display') {
    tryDisplayInstall(value, part.id); selectedPart = null;
  }
}

function tryInstall(type, value, partId, slotEl) {
  const { task, installed } = gameState;

  if (type === 'battery' && slotEl && slotEl.dataset.slot === 'battery') {
    if (!task.battery) { showHint("Battery doesn't need replacing!"); wrongPart(slotEl); return; }
    if (installed.battery) return;
    if (gameState.hardMode && !gameState.cleared.battery) {
      showHint('Remove the old battery first!'); wrongPart(slotEl); return;
    }
    installed.battery = true;
    fillBattery.textContent = 'Battery ✓';
    slotEl.classList.add('filled');
    document.getElementById(partId).classList.add('used');
    markTaskDone('battery');
    checkShowCloseButton();
    return;
  }

  if (type === 'storage' && slotEl && slotEl.dataset.slot === 'storage') {
    if (!task.storage) { showHint("Storage doesn't need replacing!"); wrongPart(slotEl); return; }
    if (task.storage !== value) { showHint(`Wrong storage — need ${task.storage}!`); wrongPart(slotEl); return; }
    if (installed.storage) return;
    if (gameState.hardMode && !gameState.cleared.storage) {
      showHint('Remove the old storage first!'); wrongPart(slotEl); return;
    }
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
  if (!task.camera) { showHint("Camera doesn't need replacing!"); wrongPart(document.getElementById(partId)); return; }
  if (task.camera !== value) { showHint('Wrong camera — check the post-it!'); wrongPart(document.getElementById(partId)); return; }
  if (installed.camera === value) return;
  installed.camera = value;
  updateCameraVisual(value, 'installed-camera-display-open');
  const camMod = document.getElementById('installed-camera-display-open');
  if (camMod) camMod.style.outline = '3px solid var(--green-ok)';
  document.getElementById(partId).classList.add('used');
  markTaskDone('camera');
  checkShowCloseButton();
}

function tryDisplayInstall(value, partId) {
  const { task, installed } = gameState;
  if (!task.display) { showHint("Display doesn't need replacing!"); wrongPart(document.getElementById(partId)); return; }
  if (task.display !== value) { showHint(`Wrong display — need ${DISPLAY_NAMES[task.display]}!`); wrongPart(document.getElementById(partId)); return; }
  if (installed.display === value) return;
  if (gameState.hardMode && !gameState.cleared.display) {
    showHint('Remove the old display first!'); wrongPart(document.getElementById(partId)); return;
  }
  installed.display = value;
  // Visual feedback: fill the display slot
  const slotEl = document.getElementById('slot-display');
  if (slotEl) {
    slotEl.classList.add('filled');
    const inner = slotEl.querySelector('.display-slot-inner');
    if (inner) inner.style.opacity = '0.3';
    if (fillDisplay) fillDisplay.textContent = `${DISPLAY_NAMES[value]} ✓`;
  }
  document.getElementById(partId).classList.add('used');
  markTaskDone('display');
  checkShowCloseButton();
}

function wrongPart(el) {
  if (!el) return;
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 400);
}

// ============================================================
//  HARD MODE: OLD PART REMOVAL
// ============================================================
function setupOldPartRemoval() {
  if (!gameState.hardMode) return;

  // Battery slot — show old part indicator if task requires replacing battery
  const { task } = gameState;
  if (task.battery && !gameState.cleared.battery) {
    showOldPartInSlot(slotBattery, 'battery', 'Old Battery 🗑️');
  }
  if (task.storage && !gameState.cleared.storage) {
    showOldPartInSlot(slotStorage, 'storage', `Old ${task.storage} 🗑️`);
  }
}

function setupOldDisplayRemoval() {
  if (!gameState.hardMode) return;
  const { task } = gameState;
  if (task.display && !gameState.cleared.display) {
    const slotEl = document.getElementById('slot-display');
    if (slotEl) showOldPartInSlot(slotEl, 'display', 'Old Display 🗑️');
  }
}

function showOldPartInSlot(slotEl, type, label) {
  // Mark slot as having an old part
  slotEl.classList.add('has-old-part');
  const fill = slotEl.querySelector('.slot-fill');
  if (fill) fill.textContent = label;

  const handler = () => {
    if (gameState.cleared[type]) return;
    gameState.cleared[type] = true;
    slotEl.classList.remove('has-old-part');
    slotEl.classList.remove('filled');
    const f = slotEl.querySelector('.slot-fill');
    if (f) f.textContent = '';
    slotEl.removeEventListener('click', handler);
    checkShowCloseButton();
  };
  slotEl.addEventListener('click', handler);
  slotEl._oldPartHandler = handler;
}

let hintTimeout = null;
function showHint(msg) {
  let hint = document.getElementById('game-hint');
  if (!hint) {
    hint = document.createElement('div');
    hint.id = 'game-hint';
    hint.style.cssText = `
      position:absolute; top:64px; left:50%; transform:translateX(-50%);
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
  hintTimeout = setTimeout(() => { if(hint) hint.style.display = 'none'; }, 1200);
}

// ============================================================
//  CAMERA SVG
// ============================================================
const CAMERA_SVG = {
  'empty': `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;border-radius:8px;"><rect width="70" height="70" rx="12" fill="#111"/><circle cx="35" cy="35" r="22" fill="#1c1c1c" stroke="#666" stroke-width="3"/><circle cx="35" cy="35" r="14" fill="#111" stroke="#444" stroke-width="2"/></svg>`,
  '1': `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;border-radius:8px;"><rect width="70" height="70" rx="12" fill="#111"/><circle cx="22" cy="20" r="8" fill="#1c1c1c" stroke="#555" stroke-width="2"/><circle cx="22" cy="20" r="5" fill="#080808" stroke="#333" stroke-width="1"/><circle cx="22" cy="20" r="3" fill="url(#pl1)"/><circle cx="20" cy="18" r="1" fill="rgba(255,255,255,0.3)"/><circle cx="22" cy="50" r="8" fill="#1c1c1c" stroke="#555" stroke-width="2"/><circle cx="22" cy="50" r="5" fill="#080808" stroke="#333" stroke-width="1"/><circle cx="22" cy="50" r="3" fill="url(#pl1)"/><circle cx="20" cy="48" r="1" fill="rgba(255,255,255,0.3)"/><circle cx="50" cy="35" r="7" fill="#1c1c1c" stroke="#555" stroke-width="2"/><circle cx="50" cy="35" r="4.5" fill="#080808" stroke="#333" stroke-width="1"/><circle cx="50" cy="35" r="2.5" fill="url(#pl1)"/><circle cx="48" cy="33" r="0.9" fill="rgba(255,255,255,0.28)"/><circle cx="50" cy="14" r="3" fill="#bbb" opacity="0.65"/><defs><radialGradient id="pl1" cx="35%" cy="35%" r="60%"><stop offset="0%" stop-color="#4a7aaa"/><stop offset="100%" stop-color="#040810"/></radialGradient></defs></svg>`,
  '2': `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;border-radius:8px;"><rect width="70" height="70" rx="12" fill="#111"/><circle cx="24" cy="22" r="8" fill="#1c1c1c" stroke="#555" stroke-width="2"/><circle cx="24" cy="22" r="5" fill="#080808" stroke="#333" stroke-width="1"/><circle cx="24" cy="22" r="3" fill="url(#pl2)"/><circle cx="22" cy="20" r="1" fill="rgba(255,255,255,0.3)"/><circle cx="24" cy="50" r="8" fill="#1c1c1c" stroke="#555" stroke-width="2"/><circle cx="24" cy="50" r="5" fill="#080808" stroke="#333" stroke-width="1"/><circle cx="24" cy="50" r="3" fill="url(#pl2)"/><circle cx="22" cy="48" r="1" fill="rgba(255,255,255,0.3)"/><circle cx="52" cy="18" r="4" fill="#ddd" opacity="0.7"/><circle cx="52" cy="50" r="2.5" fill="#2a2a2a" stroke="#555" stroke-width="1.5"/><defs><radialGradient id="pl2" cx="35%" cy="35%" r="60%"><stop offset="0%" stop-color="#4a7aaa"/><stop offset="100%" stop-color="#040810"/></radialGradient></defs></svg>`,
  '3': `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;border-radius:8px;"><rect width="70" height="70" rx="12" fill="#111"/><rect x="6" y="18" width="58" height="34" rx="12" fill="#1c1c1c" stroke="#555" stroke-width="2"/><circle cx="24" cy="35" r="9" fill="#080808" stroke="#444" stroke-width="1.5"/><circle cx="24" cy="35" r="5.5" fill="url(#pl3)"/><circle cx="21.5" cy="32.5" r="1.3" fill="rgba(255,255,255,0.28)"/><circle cx="47" cy="35" r="7" fill="#080808" stroke="#444" stroke-width="1.5"/><circle cx="47" cy="35" r="4" fill="url(#pl3)"/><circle cx="45" cy="33" r="0.9" fill="rgba(255,255,255,0.22)"/><defs><radialGradient id="pl3" cx="35%" cy="35%" r="60%"><stop offset="0%" stop-color="#4a7aaa"/><stop offset="100%" stop-color="#040810"/></radialGradient></defs></svg>`,
  '4': `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;border-radius:8px;"><rect width="70" height="70" rx="12" fill="#111"/><circle cx="35" cy="35" r="22" fill="#1c1c1c" stroke="#555" stroke-width="2.5"/><circle cx="35" cy="35" r="16" fill="#080808" stroke="#333" stroke-width="1.5"/><circle cx="35" cy="35" r="9" fill="url(#pl4)"/><circle cx="30" cy="30" r="2.2" fill="rgba(255,255,255,0.3)"/><defs><radialGradient id="pl4" cx="35%" cy="35%" r="60%"><stop offset="0%" stop-color="#4a7aaa"/><stop offset="100%" stop-color="#040810"/></radialGradient></defs></svg>`,
};

function updateCameraVisual(value, elId) {
  const mod = document.getElementById(elId);
  if (!mod) return;
  const svg = CAMERA_SVG[value] || CAMERA_SVG['empty'];
  mod.style.cssText = 'background:none; border:none; padding:0; width:65px; height:65px; border-radius:10px; overflow:hidden;';
  mod.innerHTML = svg;
}

// ============================================================
//  START ROUND
// ============================================================
function startRound(round) {
  gameState.round = round;
  gameState.task = generateTask();
  gameState.installed = { camera: null, battery: false, storage: null, display: null };
  gameState.cleared   = { battery: false, storage: false, display: false };
  gameState.backIsOpen = false;
  gameState.frontIsOpen = false;

  roundNum.textContent = round;

  // Phone always starts showing the back face
  phoneBackOff.classList.add('hidden');
  phoneFrontOpen.classList.add('hidden');
  phoneBackOn.classList.remove('hidden');
  phoneBackOn.classList.remove('phone-showing-front');
  phoneClickHint.style.opacity = '';

  // Slots reset
  slotBattery.classList.remove('filled', 'has-old-part');
  slotStorage.classList.remove('filled', 'has-old-part');
  fillBattery.textContent = '';
  fillStorage.textContent = '';
  // Remove stale old-part handlers
  [slotBattery, slotStorage].forEach(s => {
    if (s._oldPartHandler) { s.removeEventListener('click', s._oldPartHandler); s._oldPartHandler = null; }
  });

  // Display slot reset
  if (slotDisplay) {
    slotDisplay.classList.remove('filled', 'has-old-part');
    if (slotDisplay._oldPartHandler) { slotDisplay.removeEventListener('click', slotDisplay._oldPartHandler); slotDisplay._oldPartHandler = null; }
    const inner = slotDisplay.querySelector('.display-slot-inner');
    if (inner) inner.style.opacity = '1';
    if (fillDisplay) fillDisplay.textContent = '';
  }

  // Camera reset
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

  // Parts reset
  selectedPart = null;
  document.querySelectorAll('.part').forEach(p => {
    p.classList.remove('used', 'selected-part');
    p.style.opacity = '';
  });

  btnCloseBack.classList.add('hidden');
  btnCloseFront.classList.add('hidden');

  renderPostIt();

  // Always show regular parts panel; show display panel only in hard mode
  const partsPanel = document.getElementById('parts-panel');
  partsPanel.classList.remove('hidden');
  if (gameState.hardMode) {
    displayPartsPanel.classList.remove('hidden');
  } else {
    displayPartsPanel.classList.add('hidden');
  }

  // Flip button: hide until phone is opened
  const flipBtn = document.getElementById('btn-flip');
  if (flipBtn) flipBtn.style.display = 'none';

  // Hint text — always tap to open back
  phoneClickHint.querySelector('span').textContent = 'tap to open back';

  // Hard mode display-only: auto-flip to front after a short delay
  if (gameState.hardMode && gameState.task.display && !gameState.task.camera && !gameState.task.battery && !gameState.task.storage) {
    phoneClickHint.style.opacity = '0';
    setTimeout(() => {
      phone.classList.add('phone-flipping');
      setTimeout(() => {
        phone.classList.remove('phone-flipping');
        openFront();
      }, 200);
    }, 400);
  }
}

// ============================================================
//  TUTORIAL
// ============================================================
const TUTORIAL_STEPS_EASY = [
  {
    html: '👋 Welcome to Repair Race! This is Round 0 — a quick tutorial.\n\nSee the yellow post-it note on the left? It tells you which parts to swap.',
    spot: () => getRectOf('postit'),
    pos: 'right',
  },
  {
    html: '📱 The phone is in the middle of your workbench.\n\n<em>Tap the phone</em> to flip it over and open the back panel.',
    spot: () => getRectOf('phone-wrap'),
    pos: 'right',
    waitForAction: 'open_back',
  },
  {
    html: '🔋 Now the back is open! You can see the battery and storage slots inside.\n\nOn your right are the spare parts. <em>Tap the battery</em> to install it.',
    spot: () => getRectOf('parts-panel'),
    pos: 'left',
    waitForAction: 'install_battery',
  },
  {
    html: '✅ Great! Once you\'ve installed all the parts from the post-it, the green button appears.\n\n<em>Tap the green button</em> to close the phone and finish the round!',
    spot: null,
    pos: 'center',
    waitForClose: true,
  },
  {
    html: '⚡ You\'re ready! Now do 10 real rounds as fast as you can.\n\nYour timer starts when Round 1 begins. Good luck!',
    spot: null,
    pos: 'center',
    final: true,
  },
];

const TUTORIAL_STEPS_HARD = [
  {
    html: '👋 Welcome to Hard Mode! This is Round 0 — a quick tutorial.\n\nThe post-it now includes a <em>display</em> replacement on top of the usual back parts.',
    spot: () => getRectOf('postit'),
    pos: 'right',
  },
  {
    html: '📱 Always start by <em>tapping the phone</em> to open the back — even if a display is listed.',
    spot: () => getRectOf('phone-wrap'),
    pos: 'right',
    waitForAction: 'open_back',
  },
  {
    html: '⚠️ In Hard Mode the slots start with <em>old parts inside</em> — shown in red.\n\n<em>Click the red battery slot</em> to throw away the old part first.',
    spot: () => getRectOf('slot-battery'),
    pos: 'left',
    waitForAction: 'clear_battery',
  },
  {
    html: '🔋 Back is open. Install the back parts listed first.\n\n<em>Tap the battery</em> to drop it in.',
    spot: () => getRectOf('parts-panel'),
    pos: 'left',
    waitForAction: 'install_battery',
  },
  {
    html: '🔄 Back parts done. Now hit the <em>flip button</em> to turn the phone over and access the screen.',
    spot: () => getRectOf('btn-flip'),
    pos: 'top',
    waitForAction: 'open_front',
  },
  {
    html: '⚠️ In Hard Mode you must remove the old part before installing a new one.\n\n<em>Click the red display slot</em> to throw away the old display.',
    spot: () => getRectOf('slot-display'),
    pos: 'right',
    waitForAction: 'clear_display',
  },
  {
    html: '🖥️ Old display removed! Now check the post-it for which display to install.\n\n<em>Find the matching display</em> in the parts panel on the right and tap it.',
    spot: () => getRectOf('display-parts-panel'),
    pos: 'left',
    waitForAction: 'install_display',
  },
  {
    html: '⚡ That\'s it — the phone closes itself up automatically when you\'re done!\n\nAll 4 parts can appear at once in real rounds. Timer starts on Round 1. Good luck!',
    spot: null,
    pos: 'center',
    final: true,
  },
];

function getTutorialSteps() {
  return gameState.hardMode ? TUTORIAL_STEPS_HARD : TUTORIAL_STEPS_EASY;
}

// step index -1 = not running, 'done' = finished
let tutStep = -1;

function showTutorialStep(idx) {
  const steps = getTutorialSteps();

  if (idx === 'done') {
    tutorialOverlay.classList.add('hidden');
    tutorialBubble.classList.remove('show');
    tutorialSpot.style.display = 'none';
    tutStep = -1;
    gameState.isTutorial = false;
    startRealGame();
    return;
  }

  if (idx >= steps.length) {
    showTutorialStep('done');
    return;
  }

  tutStep = idx;
  const step = steps[idx];

  if (step.spot) {
    const rect = step.spot();
    if (rect) {
      const pad = 10;
      tutorialSpot.style.display = 'block';
      tutorialSpot.style.left   = (rect.left - pad) + 'px';
      tutorialSpot.style.top    = (rect.top  - pad) + 'px';
      tutorialSpot.style.width  = (rect.width  + pad*2) + 'px';
      tutorialSpot.style.height = (rect.height + pad*2) + 'px';
    } else {
      tutorialSpot.style.display = 'none';
    }
  } else {
    tutorialSpot.style.display = 'none';
  }

  tutorialBubble.classList.remove('show');
  tutorialText.innerHTML = step.html.replace(/\n/g, '<br>');
  btnTutorialNext.textContent = step.final ? 'Start the game! 🚀' : 'Got it →';

  if (step.waitForAction) {
    btnTutorialNext.disabled = true;
    btnTutorialNext.style.opacity = '0.35';
    btnTutorialNext.style.cursor = 'not-allowed';

    const waitInterval = setInterval(() => {
      let done = false;
      if (step.waitForAction === 'open_back'       && gameState.backIsOpen)              done = true;
      if (step.waitForAction === 'install_battery' && gameState.installed.battery)       done = true;
      if (step.waitForAction === 'clear_battery'   && gameState.cleared.battery)         done = true;
      if (step.waitForAction === 'open_front'      && gameState.frontIsOpen)             done = true;
      if (step.waitForAction === 'clear_display'   && gameState.cleared.display)         done = true;
      if (step.waitForAction === 'install_display' && gameState.installed.display)       done = true;
      if (done) {
        clearInterval(waitInterval);
        btnTutorialNext.disabled = false;
        btnTutorialNext.style.opacity = '';
        btnTutorialNext.style.cursor = '';
        if (step.spot) {
          const rect = step.spot();
          if (rect) {
            const pad = 10;
            tutorialSpot.style.left   = (rect.left - pad) + 'px';
            tutorialSpot.style.top    = (rect.top  - pad) + 'px';
            tutorialSpot.style.width  = (rect.width  + pad*2) + 'px';
            tutorialSpot.style.height = (rect.height + pad*2) + 'px';
          }
        }
      }
    }, 150);
  } else if (step.waitForDone) {
    btnTutorialNext.style.display = 'none';
    const waitInterval = setInterval(() => {
      if (allTasksDone()) {
        clearInterval(waitInterval);
        btnTutorialNext.style.display = '';
        checkShowCloseButton();
      }
    }, 200);
  } else if (step.waitForClose) {
    // Hide the bubble's own button — the green close button IS the "got it"
    btnTutorialNext.style.display = 'none';
    // Wait for all tasks done, then show the green button normally
    const waitInterval = setInterval(() => {
      if (allTasksDone()) {
        clearInterval(waitInterval);
        checkShowCloseButton();
      }
    }, 200);
  } else {
    btnTutorialNext.disabled = false;
    btnTutorialNext.style.opacity = '';
    btnTutorialNext.style.cursor = '';
    btnTutorialNext.style.display = '';
  }

  positionBubble(step.pos, step.spot ? step.spot() : null);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      tutorialBubble.classList.add('show');
    });
  });
}

function positionBubble(pos, spotRect) {
  const bw = 280;
  const vw = window.innerWidth, vh = window.innerHeight;

  if (!spotRect || pos === 'center') {
    tutorialBubble.style.left  = '50%';
    tutorialBubble.style.top   = '50%';
    tutorialBubble.style.transform = 'translate(-50%, -50%)';
    tutorialBubble.style.width = bw + 'px';
    return;
  }

  tutorialBubble.style.transform = '';
  const bh = 180;
  let left, top;
  if (pos === 'right') {
    left = Math.min(spotRect.right + 18, vw - bw - 10);
    top  = Math.max(10, spotRect.top + spotRect.height/2 - bh/2);
  } else if (pos === 'left') {
    left = Math.max(10, spotRect.left - bw - 18);
    top  = Math.max(10, spotRect.top + spotRect.height/2 - bh/2);
  } else if (pos === 'top') {
    left = Math.max(10, spotRect.left + spotRect.width/2 - bw/2);
    top  = Math.max(10, spotRect.top - bh - 18);
  } else {
    left = (vw - bw) / 2;
    top  = (vh - bh) / 2;
  }

  tutorialBubble.style.left  = left + 'px';
  tutorialBubble.style.top   = top  + 'px';
  tutorialBubble.style.width = bw   + 'px';
}

function getRectOf(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  // Adjust for fixed screens
  return { left: r.left, top: r.top, width: r.width, height: r.height, right: r.right, bottom: r.bottom };
}

btnTutorialNext.addEventListener('click', () => {
  const steps = getTutorialSteps();
  if (tutStep >= 0 && tutStep < steps.length - 1) {
    showTutorialStep(tutStep + 1);
  } else {
    showTutorialStep('done');
  }
});

// ============================================================
//  LEADERBOARD  (localStorage)
// ============================================================
const LB_KEY_EASY = 'futureproof_leaderboard_easy';
const LB_KEY_HARD = 'futureproof_leaderboard_hard';
const LB_MAX = 10;

function lbKey() { return gameState.hardMode ? LB_KEY_HARD : LB_KEY_EASY; }

function loadLeaderboard() {
  try { return JSON.parse(localStorage.getItem(lbKey())) || []; }
  catch { return []; }
}
function saveLeaderboard(entries) { localStorage.setItem(lbKey(), JSON.stringify(entries)); }

function addScore(name, ms) {
  const entries = loadLeaderboard();
  entries.push({ name: name.toUpperCase(), ms });
  entries.sort((a, b) => a.ms - b.ms);
  const trimmed = entries.slice(0, LB_MAX);
  saveLeaderboard(trimmed);
  return trimmed;
}

function renderLeaderboard(entries, highlightMs) {
  // Update tab UI
  const tabEasy = document.getElementById('lb-tab-easy');
  const tabHard = document.getElementById('lb-tab-hard');
  if (tabEasy && tabHard) {
    tabEasy.classList.toggle('lb-tab-active', !gameState.hardMode);
    tabHard.classList.toggle('lb-tab-active',  gameState.hardMode);
  }
  const list = document.getElementById('leaderboard-list');
  list.innerHTML = '';
  const medals = ['gold','silver','bronze'];
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
//  INITIALS INPUT
// ============================================================
function initInitialsInputs() {
  const boxes = ['init-0','init-1','init-2'].map(id => document.getElementById(id));
  boxes.forEach((box, i) => {
    box.addEventListener('keydown', e => {
      if (e.key === 'Backspace') {
        if (box.value === '' && i > 0) {
          boxes[i-1].value = ''; boxes[i-1].classList.remove('filled'); boxes[i-1].focus();
        } else { box.value = ''; box.classList.remove('filled'); }
        e.preventDefault();
      }
    });
    box.addEventListener('input', () => {
      const ch = box.value.replace(/[^a-zA-Z]/g,'').slice(-1);
      box.value = ch.toUpperCase();
      if (ch) { box.classList.add('filled'); if (i < boxes.length-1) boxes[i+1].focus(); }
      else box.classList.remove('filled');
    });
  });
  document.getElementById('btn-submit-score').addEventListener('click', () => {
    const name = boxes.map(b => b.value || '_').join('');
    const entries = addScore(name, gameState.elapsedMs);
    renderLeaderboard(entries, gameState.elapsedMs);
    document.getElementById('name-entry-section').classList.add('hidden');
    document.getElementById('leaderboard-section').classList.remove('hidden');
  });

  // Leaderboard tab switching
  document.getElementById('lb-tab-easy').addEventListener('click', () => {
    const wasHard = gameState.hardMode;
    gameState.hardMode = false;
    const entries = loadLeaderboard();
    renderLeaderboard(entries, wasHard ? null : gameState.elapsedMs);
    gameState.hardMode = wasHard;
    document.getElementById('lb-tab-easy').classList.add('lb-tab-active');
    document.getElementById('lb-tab-hard').classList.remove('lb-tab-active');
  });
  document.getElementById('lb-tab-hard').addEventListener('click', () => {
    const wasHard = gameState.hardMode;
    gameState.hardMode = true;
    const entries = loadLeaderboard();
    renderLeaderboard(entries, wasHard ? gameState.elapsedMs : null);
    gameState.hardMode = wasHard;
    document.getElementById('lb-tab-hard').classList.add('lb-tab-active');
    document.getElementById('lb-tab-easy').classList.remove('lb-tab-active');
  });
}

// ============================================================
//  GAME START / END
// ============================================================
function startGame() {
  gameState.hardMode = settings.difficulty === 'hard';

  // Manage hard mode badge
  let badge = document.getElementById('hard-badge');
  if (gameState.hardMode) {
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'hard-badge';
      badge.className = 'hard-badge';
      badge.textContent = '⚡ HARD';
      document.querySelector('.bench-surface').appendChild(badge);
    }
    badge.style.display = '';
  } else {
    if (badge) badge.style.display = 'none';
  }

  if (settings.tutorial) {
    runTutorial();
  } else {
    startRealGame();
  }
}

function runTutorial() {
  gameState.isTutorial = true;
  gameState.elapsedMs = 0;
  timerDisplay.textContent = '00:00';
  showScreen('screen-game');

  // Set up a tutorial task (just battery)
  gameState.round = 0;
  gameState.task = makeTutorialTask();
  gameState.installed = { camera: null, battery: false, storage: null, display: null };
  gameState.cleared   = { battery: false, storage: false, display: false };
  gameState.backIsOpen = false;
  gameState.frontIsOpen = false;

  roundNum.textContent = '0';
  phoneBackOff.classList.add('hidden');
  phoneFrontOpen.classList.add('hidden');
  phoneBackOn.classList.remove('hidden');
  phoneClickHint.style.opacity = '';
  slotBattery.classList.remove('filled');
  slotStorage.classList.remove('filled');
  fillBattery.textContent = '';
  fillStorage.textContent = '';
  document.querySelectorAll('.part').forEach(p => { p.classList.remove('used','selected-part'); p.style.opacity = ''; });
  selectedPart = null;
  btnCloseBack.classList.add('hidden');
  btnCloseFront.classList.add('hidden');

  const partsPanel = document.getElementById('parts-panel');
  partsPanel.classList.remove('hidden');
  if (gameState.hardMode) {
    displayPartsPanel.classList.remove('hidden');
  } else {
    displayPartsPanel.classList.add('hidden');
  }

  renderPostIt();

  // Show tutorial overlay
  tutorialOverlay.classList.remove('hidden');
  tutorialSpot.style.display = 'none';
  tutStep = -1;

  setTimeout(() => showTutorialStep(0), 300);
}

function startRealGame() {
  gameState.isTutorial = false;
  gameState.running = true;
  gameState.elapsedMs = 0;
  timerDisplay.textContent = '00:00';
  showScreen('screen-game');
  startRound(1);
  startTimer();
}

function endGame() {
  stopTimer();
  gameState.running = false;
  finalTimeEl.textContent = formatTime(gameState.elapsedMs);
  ['init-0','init-1','init-2'].forEach(id => {
    const el = document.getElementById(id);
    el.value = '';
    el.classList.remove('filled');
  });
  document.getElementById('name-entry-section').classList.remove('hidden');
  document.getElementById('leaderboard-section').classList.add('hidden');
  showScreen('screen-end');
  setTimeout(() => document.getElementById('init-0').focus(), 150);
}

// ============================================================
//  OPTIONS MODAL
// ============================================================
function applySettingsToUI() {
  optTutorial.checked = settings.tutorial;
  diffEasy.classList.toggle('active', settings.difficulty === 'easy');
  diffHard.classList.toggle('active', settings.difficulty === 'hard');
}

btnOptions.addEventListener('click', () => {
  applySettingsToUI();
  optionsModal.classList.remove('hidden');
});

btnCloseOptions.addEventListener('click', () => { optionsModal.classList.add('hidden'); });

btnSaveOptions.addEventListener('click', () => {
  settings.tutorial   = optTutorial.checked;
  settings.difficulty = diffHard.classList.contains('active') ? 'hard' : 'easy';
  saveSettings(settings);
  optionsModal.classList.add('hidden');
});

diffEasy.addEventListener('click', () => {
  diffEasy.classList.add('active');
  diffHard.classList.remove('active');
});
diffHard.addEventListener('click', () => {
  diffHard.classList.add('active');
  diffEasy.classList.remove('active');
});

// Close modal on overlay click
optionsModal.addEventListener('click', e => {
  if (e.target === optionsModal) optionsModal.classList.add('hidden');
});

// ============================================================
//  BUTTON LISTENERS
// ============================================================
btnStart.addEventListener('click', startGame);
btnPlayAgain.addEventListener('click', startGame);
btnBackProject.addEventListener('click', () => {
  window.location.href = 'https://yusuf.kunstkaai.online/futureproof/';
});

document.getElementById('btn-menu-from-end').addEventListener('click', goToMenu);

// ============================================================
//  PAUSE SYSTEM
// ============================================================
let paused = false;

function goToMenu() {
  // Stop timer, reset state, go back to start screen
  stopTimer();
  paused = false;
  gameState.running = false;
  gameState.roundTransitioning = false;
  gameState.isTutorial = false;
  document.getElementById('pause-modal').classList.add('hidden');
  const badge = document.getElementById('hard-badge');
  if (badge) badge.style.display = 'none';
  showScreen('screen-start');
}

function pauseGame() {
  if (!gameState.running || gameState.isTutorial) return;
  paused = true;
  stopTimer();
  document.getElementById('pause-modal').classList.remove('hidden');
}

function resumeGame() {
  if (!paused) return;
  paused = false;
  document.getElementById('pause-modal').classList.add('hidden');
  startTimer();
}

document.getElementById('btn-pause-resume').addEventListener('click', resumeGame);
document.getElementById('btn-pause-restart').addEventListener('click', () => {
  paused = false;
  document.getElementById('pause-modal').classList.add('hidden');
  // Restart without tutorial — preserve difficulty, skip straight to Round 1
  stopTimer();
  gameState.hardMode = settings.difficulty === 'hard';
  startRealGame();
});
document.getElementById('btn-pause-menu').addEventListener('click', goToMenu);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (paused) {
      resumeGame();
    } else {
      pauseGame();
    }
  }
});

// ============================================================
//  INIT
// ============================================================
initDragDrop();
initInitialsInputs();
showScreen('screen-start');

// Wire flip button — script runs after DOM so this is safe
const flipBtnEl = document.getElementById('btn-flip');
if (flipBtnEl) flipBtnEl.addEventListener('click', flipPhone);

// CSS for selected-part highlight
const style = document.createElement('style');
style.textContent = `
  .selected-part {
    border-color: #f5e642 !important;
    box-shadow: 0 0 0 3px rgba(245,230,66,0.4), 0 6px 18px rgba(0,0,0,0.5);
    transform: scale(1.1) translateY(-2px);
  }
`;
document.head.appendChild(style);
