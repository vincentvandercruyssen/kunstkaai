/* ═══════════════════════════════════════════
   SORTAI – VuilbakHeld
   spel.js
═══════════════════════════════════════════ */

/* ────────────────────────────────────────
   CONFIGURATIE & CONSTANTEN
──────────────────────────────────────── */
const CANVAS_B  = 420;
const CANVAS_H  = 480;
const BALK_H    = 50;       /* hoogte vuilbak */
const BALK_B    = 80;       /* breedte vuilbak */
const GROND_Y   = CANVAS_H - BALK_H - 10;
const SPEL_DUUR = 60;       /* seconden */

const AFVAL_TYPES = [
  /* PMD (blauw) */
  { emoji: '🍾', naam: 'Glazen fles',     type: 'PMD',  punten: 10, kleur: '#3498db' },
  { emoji: '📦', naam: 'Kartonnen doos',  type: 'PMD',  punten: 10, kleur: '#3498db' },
  { emoji: '🥫', naam: 'Blikje',          type: 'PMD',  punten: 10, kleur: '#3498db' },
  /* GFT (groen) */
  { emoji: '🥦', naam: 'Groente',         type: 'GFT',  punten: 10, kleur: '#2ecc71' },
  { emoji: '🍌', naam: 'Bananenschil',    type: 'GFT',  punten: 10, kleur: '#2ecc71' },
  { emoji: '🍂', naam: 'Bladeren',        type: 'GFT',  punten: 10, kleur: '#2ecc71' },
  /* Restafval (grijs) */
  { emoji: '🚬', naam: 'Peuk',            type: 'REST', punten: 10, kleur: '#7f8c8d' },
  { emoji: '🧻', naam: 'Papierzakdoekje', type: 'REST', punten: 10, kleur: '#7f8c8d' },
  { emoji: '🪣', naam: 'Kapotte emmer',   type: 'REST', punten: 10, kleur: '#7f8c8d' },
];

const FEITEN = [
  '🌍 Belgen produceren gemiddeld <strong>460 kg</strong> huishoudelijk afval per persoon per jaar.',
  '♻️ Aluminium recycleren kost slechts <strong>5% van de energie</strong> van nieuwe productie.',
  '🌱 GFT-afval wordt omgezet in compost en <strong>groene energie</strong> via vergisting.',
  '🔵 PMD staat voor Plastic, Metaal en Drinkpakken – altijd in de <strong>blauwe zak</strong>!',
  '💧 Het produceren van één plastic fles verbruikt <strong>3x zoveel water</strong> als er in de fles zit.',
  '🗑️ Correct sorteren vermindert de hoeveelheid restafval met tot <strong>60%</strong>.',
];

/* ────────────────────────────────────────
   SPELSTATUS
──────────────────────────────────────── */
let spelStatus = {
  actief: false,
  score: 0,
  levens: 3,
  tijd: SPEL_DUUR,
  gevangen: 0,
  gemist: 0,
  correctGesorteerd: 0,
  totaalGesorteerd: 0,
  snelheidsFactor: 1,
};

let vuilbak          = { x: CANVAS_B / 2 - BALK_B / 2, snelheid: 7 };
let afvalItems       = [];
let deeltjes         = [];
let huidigAfvalItem  = null;  /* item dat wacht op sortering */

/* Input-status */
let toetsLinks  = false;
let toetsRechts = false;
let mobileLinks  = false;
let mobileRechts = false;

/* Timers */
let animFrameId       = null;
let tijdInterval      = null;
let volgendeAfvalTimer = 0;
let afvalInterval     = 90;   /* frames tussen spawns */

/* ────────────────────────────────────────
   CANVAS SETUP
──────────────────────────────────────── */
const canvas = document.getElementById('game-canvas');
const ctx    = canvas.getContext('2d');

/* ════════════════════════════════════════
   SCHERM-NAVIGATIE
════════════════════════════════════════ */
function toonScherm(id) {
  document.querySelectorAll('.scherm').forEach(s => s.classList.remove('actief'));
  document.getElementById(id).classList.add('actief');
}

function toonStartscherm() {
  if (animFrameId)   cancelAnimationFrame(animFrameId);
  if (tijdInterval)  clearInterval(tijdInterval);
  toonScherm('startscherm');
}

/* ════════════════════════════════════════
   MOEILIJKHEIDSGRAAD
════════════════════════════════════════ */
function kiesNiveau(knop) {
  document.querySelectorAll('.knop-moeilijk').forEach(k => k.classList.remove('gekozen'));
  knop.classList.add('gekozen');
  spelStatus.snelheidsFactor = parseFloat(knop.dataset.snelheid);
}

/* ════════════════════════════════════════
   SPEL STARTEN
════════════════════════════════════════ */
function startSpel() {
  /* Reset spelstatus */
  spelStatus = {
    actief: true,
    score: 0,
    levens: 3,
    tijd: SPEL_DUUR,
    gevangen: 0,
    gemist: 0,
    correctGesorteerd: 0,
    totaalGesorteerd: 0,
    snelheidsFactor: spelStatus.snelheidsFactor || 1,
  };

  vuilbak.x       = CANVAS_B / 2 - BALK_B / 2;
  afvalItems      = [];
  deeltjes        = [];
  huidigAfvalItem = null;
  volgendeAfvalTimer = 0;

  updateHUD();
  toonScherm('speelscherm');

  /* Afteltimer (1×/seconde) */
  tijdInterval = setInterval(() => {
    spelStatus.tijd--;
    if (spelStatus.tijd <= 10) {
      document.getElementById('hud-tijd').classList.add('waarschuwing');
    }
    document.getElementById('hud-tijd').textContent = spelStatus.tijd;
    if (spelStatus.tijd <= 0) eindeSpel();
  }, 1000);

  if (animFrameId) cancelAnimationFrame(animFrameId);
  gameLoop();
}

/* ════════════════════════════════════════
   GAME LOOP
════════════════════════════════════════ */
function gameLoop() {
  if (!spelStatus.actief) return;
  update();
  render();
  animFrameId = requestAnimationFrame(gameLoop);
}

/* ── UPDATE (logica) ── */
function update() {
  /* Vuilbak bewegen */
  if ((toetsLinks || mobileLinks) && vuilbak.x > 0)
    vuilbak.x -= vuilbak.snelheid;
  if ((toetsRechts || mobileRechts) && vuilbak.x < CANVAS_B - BALK_B)
    vuilbak.x += vuilbak.snelheid;

  /* Nieuw afval spawnen (pauze wanneer sorteer-mode actief) */
  volgendeAfvalTimer++;
  if (volgendeAfvalTimer >= afvalInterval && !huidigAfvalItem) {
    spawnAfval();
    volgendeAfvalTimer = 0;
    /* Interval verkleint naarmate de tijd vordert */
    afvalInterval = Math.max(45, 90 - (SPEL_DUUR - spelStatus.tijd) * 0.6);
  }

  /* Afval bewegen + botsingsdetectie */
  for (let i = afvalItems.length - 1; i >= 0; i--) {
    const item = afvalItems[i];
    item.y       += item.snelheid * spelStatus.snelheidsFactor;
    item.rotatie += item.rotSnelheid;

    /* Gevangen? */
    if (
      item.y + item.maat >= GROND_Y &&
      item.x + item.maat >= vuilbak.x &&
      item.x             <= vuilbak.x + BALK_B
    ) {
      afvalGevangen(item, i);
      continue;
    }

    /* Gemist? */
    if (item.y > CANVAS_H + 20) {
      afvalGemist(i);
    }
  }

  /* Deeltjes updaten */
  for (let i = deeltjes.length - 1; i >= 0; i--) {
    const d = deeltjes[i];
    d.x  += d.vx;
    d.y  += d.vy;
    d.vy += 0.15;         /* zwaartekracht */
    d.leven--;
    d.alpha = d.leven / d.maxLeven;
    if (d.leven <= 0) deeltjes.splice(i, 1);
  }
}

/* ── SPAWN AFVAL ── */
function spawnAfval() {
  const type = AFVAL_TYPES[Math.floor(Math.random() * AFVAL_TYPES.length)];
  const maat = 32;
  afvalItems.push({
    ...type,
    x:          Math.random() * (CANVAS_B - maat - 20) + 10,
    y:          -maat,
    snelheid:   1.8 + Math.random() * 1.2,
    maat,
    rotatie:    0,
    rotSnelheid: (Math.random() - 0.5) * 0.06,
  });
}

/* ── AFVAL GEVANGEN ── */
function afvalGevangen(item, index) {
  afvalItems.splice(index, 1);
  spelStatus.gevangen++;

  /* Sorteer-mode activeren */
  huidigAfvalItem = item;
  toonFeedback(`${item.emoji} Gevangen! Sorteer het!`, item.kleur, 1800);
  maakDeeltjes(vuilbak.x + BALK_B / 2, GROND_Y, item.kleur, 8);
  updateHUD();
}

/* ── AFVAL GEMIST ── */
function afvalGemist(index) {
  const item = afvalItems[index];
  afvalItems.splice(index, 1);
  spelStatus.gemist++;
  spelStatus.levens--;
  maakDeeltjes(item.x + item.maat / 2, CANVAS_H - 10, '#e74c3c', 5);
  updateLevens();
  toonFeedback('❌ Gemist! –1 leven', '#e74c3c', 1200);
  if (spelStatus.levens <= 0) eindeSpel();
}

/* ── SORTEER AFVAL (gebruikersactie) ── */
function sorteerAfval(keuze) {
  if (!huidigAfvalItem || !spelStatus.actief) return;

  const juist = huidigAfvalItem.type === keuze;
  spelStatus.totaalGesorteerd++;

  if (juist) {
    spelStatus.correctGesorteerd++;
    spelStatus.score += 20;
    toonFeedback(`✅ Juist! +20 punten`, '#2ecc71', 1200);
    maakDeeltjes(vuilbak.x + BALK_B / 2, GROND_Y, '#2ecc71', 12);
  } else {
    spelStatus.score = Math.max(0, spelStatus.score - 5);
    toonFeedback(`⚠️ Fout! Hoort bij ${huidigAfvalItem.type}`, '#e67e22', 1500);
  }

  spelStatus.score += 10;   /* basispunten voor vangen */
  huidigAfvalItem   = null;
  updateHUD();
}

/* ════════════════════════════════════════
   RENDER (canvas tekenen)
════════════════════════════════════════ */
function render() {
  ctx.clearRect(0, 0, CANVAS_B, CANVAS_H);

  /* Achtergrond */
  ctx.fillStyle = '#1e2f40';
  ctx.fillRect(0, 0, CANVAS_B, CANVAS_H);

  /* Subtiel sterrenpatroon */
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  for (let i = 0; i < 30; i++) {
    ctx.fillRect((i * 137.5) % CANVAS_B, (i * 97.3) % CANVAS_H, 1.5, 1.5);
  }

  /* Grondlijn */
  ctx.strokeStyle = 'rgba(46,204,113,0.3)';
  ctx.lineWidth = 1;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(0, GROND_Y + BALK_H);
  ctx.lineTo(CANVAS_B, GROND_Y + BALK_H);
  ctx.stroke();
  ctx.setLineDash([]);

  /* Deeltjes */
  for (const d of deeltjes) {
    ctx.globalAlpha = d.alpha;
    ctx.fillStyle   = d.kleur;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  /* Afval-items */
  for (const item of afvalItems) {
    ctx.save();
    ctx.translate(item.x + item.maat / 2, item.y + item.maat / 2);
    ctx.rotate(item.rotatie);
    ctx.shadowColor = item.kleur;
    ctx.shadowBlur  = 8;
    ctx.font        = `${item.maat}px serif`;
    ctx.textAlign      = 'center';
    ctx.textBaseline   = 'middle';
    ctx.fillText(item.emoji, 0, 0);
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  /* Sorteer-indicator (gloed rond vuilbak) */
  if (huidigAfvalItem) {
    ctx.fillStyle   = 'rgba(46,204,113,0.18)';
    ctx.strokeStyle = 'rgba(46,204,113,0.5)';
    ctx.lineWidth   = 1.5;
    ctx.beginPath();
    ctx.roundRect(vuilbak.x - 2, GROND_Y - 4, BALK_B + 4, BALK_H + 8, 10);
    ctx.fill();
    ctx.stroke();

    ctx.font         = '14px serif';
    ctx.textAlign    = 'center';
    ctx.fillStyle    = '#2ecc71';
    ctx.fillText(huidigAfvalItem.emoji, vuilbak.x + BALK_B / 2, GROND_Y + 14);
  }

  /* Vuilbak tekenen */
  tekenVuilbak(vuilbak.x, GROND_Y);
}

/* ── VUILBAK TEKENEN ── */
function tekenVuilbak(x, y) {
  const b = BALK_B;
  const h = BALK_H;

  /* Lichaam */
  ctx.fillStyle   = '#2c3e50';
  ctx.strokeStyle = '#3d5166';
  ctx.lineWidth   = 2;
  ctx.beginPath();
  ctx.roundRect(x, y + 6, b, h - 6, [0, 0, 6, 6]);
  ctx.fill();
  ctx.stroke();

  /* Deksel */
  ctx.fillStyle   = '#34495e';
  ctx.strokeStyle = '#4a6279';
  ctx.lineWidth   = 2;
  ctx.beginPath();
  ctx.roundRect(x - 4, y, b + 8, 12, 4);
  ctx.fill();
  ctx.stroke();

  /* Recycling-icoon */
  ctx.font         = '18px serif';
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('♻️', x + b / 2, y + h / 2 + 3);

  /* Wieltjes */
  ctx.fillStyle = '#1a2634';
  for (const wx of [x + 12, x + b - 12]) {
    ctx.beginPath();
    ctx.arc(wx, y + h + 2, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3d5166';
    ctx.lineWidth   = 1;
    ctx.stroke();
  }
}

/* ════════════════════════════════════════
   HULPFUNCTIES
════════════════════════════════════════ */

/* Deeltjeseffect */
function maakDeeltjes(x, y, kleur, aantal) {
  for (let i = 0; i < aantal; i++) {
    deeltjes.push({
      x, y,
      vx:       (Math.random() - 0.5) * 5,
      vy:       -Math.random() * 4 - 1,
      r:        Math.random() * 4 + 2,
      kleur,
      leven:    40 + Math.random() * 20,
      maxLeven: 60,
      alpha:    1,
    });
  }
}

/* Toast-melding */
function toonFeedback(tekst, kleur, duur = 1200) {
  const el = document.getElementById('feedback-toast');
  el.textContent      = tekst;
  el.style.borderColor = kleur;
  el.style.color       = kleur;
  el.classList.add('zichtbaar');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('zichtbaar'), duur);
}

/* HUD bijwerken */
function updateHUD() {
  document.getElementById('hud-score').textContent = spelStatus.score;
}

function updateLevens() {
  const icons = ['', '❤️', '❤️❤️', '❤️❤️❤️'];
  document.getElementById('hud-levens').textContent =
    icons[Math.max(0, spelStatus.levens)] || '💀';
}

/* ════════════════════════════════════════
   EINDE SPEL
════════════════════════════════════════ */
function eindeSpel() {
  spelStatus.actief = false;
  clearInterval(tijdInterval);
  cancelAnimationFrame(animFrameId);

  /* Sorteerscore berekenen */
  const sorteerPct = spelStatus.totaalGesorteerd > 0
    ? Math.round((spelStatus.correctGesorteerd / spelStatus.totaalGesorteerd) * 100)
    : 0;

  /* Emoji & titel op basis van eindscore */
  let emoji = '🌱', titel = 'Goed geprobeerd!';
  if      (spelStatus.score >= 300) { emoji = '🏆'; titel = 'Afvalheld!'; }
  else if (spelStatus.score >= 150) { emoji = '♻️'; titel = 'Goed gedaan!'; }

  /* Eindscherm vullen */
  document.getElementById('eind-emoji').textContent = emoji;
  document.getElementById('eind-titel').textContent = titel;
  document.getElementById('eind-score').innerHTML   = `${spelStatus.score}<span>punten</span>`;
  document.getElementById('stat-gevangen').textContent = spelStatus.gevangen;
  document.getElementById('stat-gemist').textContent   = spelStatus.gemist;
  document.getElementById('stat-sorteer').textContent  = sorteerPct + '%';

  /* Willekeurig milieufeit */
  const feit = FEITEN[Math.floor(Math.random() * FEITEN.length)];
  document.getElementById('feit-eind').innerHTML = '💡 ' + feit;

  /* Tijds-klasse resetten */
  document.getElementById('hud-tijd').classList.remove('waarschuwing');

  setTimeout(() => toonScherm('eindscherm'), 600);
}

/* ════════════════════════════════════════
   INPUT – TOETSEN
════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') toetsLinks  = true;
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') toetsRechts = true;
  if (e.key === '1') sorteerAfval('PMD');
  if (e.key === '2') sorteerAfval('GFT');
  if (e.key === '3') sorteerAfval('REST');
});

document.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') toetsLinks  = false;
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') toetsRechts = false;
});

/* ── MUIS (canvas volgen) ── */
canvas.addEventListener('mousemove', e => {
  if (!spelStatus.actief) return;
  const rect   = canvas.getBoundingClientRect();
  const schaalX = CANVAS_B / rect.width;
  const muisX   = (e.clientX - rect.left) * schaalX;
  vuilbak.x     = Math.max(0, Math.min(CANVAS_B - BALK_B, muisX - BALK_B / 2));
});

/* ── TOUCH (swipe / slepen) ── */
canvas.addEventListener('touchstart', e => {
  /* touchStartX bewaard maar niet gebruikt — vuilbak volgt direct de vinger */
}, { passive: true });

canvas.addEventListener('touchmove', e => {
  if (!spelStatus.actief) return;
  const rect   = canvas.getBoundingClientRect();
  const schaalX = CANVAS_B / rect.width;
  const tx      = (e.touches[0].clientX - rect.left) * schaalX;
  vuilbak.x     = Math.max(0, Math.min(CANVAS_B - BALK_B, tx - BALK_B / 2));
}, { passive: true });