const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// GAME MODES
const MODES = { DEFENSE: 'defense', POWER: 'power' };
let currentMode = MODES.DEFENSE;

// ===== DEFENSE MODE =====
const cols = 12, rows = 8;
const path = [
  {c:0,r:4},{c:1,r:4},{c:2,r:4},{c:3,r:4},{c:4,r:4},{c:5,r:4},
  {c:5,r:2},{c:6,r:2},{c:7,r:2},{c:8,r:2},{c:9,r:2},{c:10,r:2},{c:11,r:2}
];

const towerTypes = [
  {id:'solarPanel', label:'Solar Panel', emoji:'☀️', cost:60, range:2.5, damage:12, rate:1.0, color:'#facc15', description:'A bright solar emitter for steady damage.', upgrades:[
    {name:'Solar Lens', description:'Sharper optics boost damage heavily.', damage:5, rate:0, range:0, icon:'🔭'},
    {name:'Overload Capacitor', description:'Faster discharge makes it strike quickly.', damage:0, rate:0.35, range:0, icon:'⚡'},
    {name:'Thermal Prism', description:'Concentrated beams extend range dramatically.', damage:0, rate:0, range:0.6, icon:'🌈'},
    {name:'Quantum Cells', description:'Energy core unlocks rapid, powerful bursts.', damage:5, rate:0.22, range:0.4, icon:'🧬'}
  ]},
  {id:'treeGuard', label:'Tree Guard', emoji:'🌳', cost:70, range:2.4, damage:10, rate:1.15, slow:0.25, color:'#16a34a', description:'Slows enemies with forest defense.', upgrades:[
    {name:'Rooted Reinforcements', description:'A massive trunk boosts damage.', damage:7, rate:0, range:0, icon:'🪵'},
    {name:'Sap Pulse', description:'Sap energy bursts increase firing speed.', damage:0, rate:0.25, range:0, icon:'🟢'},
    {name:'Canopy Reach', description:'Branches stretch out with powerful range.', damage:0, rate:0, range:0.4, icon:'🌿'},
    {name:'Verdant Bastion', description:'A towering shield of growth strengthens all stats.', damage:6, rate:0.18, range:0.35, icon:'🏰'}
  ]},
  {id:'recycleHub', label:'Recycle Hub', emoji:'♻️', cost:80, range:2.8, damage:16, rate:0.95, color:'#0f766e', description:'Recycles pollution into power.', upgrades:[
    {name:'Circuit Refinement', description:'Sharper circuits turn pollution into harder hits.', damage:7, rate:0, range:0, icon:'🔧'},
    {name:'Flux Accelerator', description:'Accelerated processing makes it fire rapidly.', damage:0, rate:0.25, range:0, icon:'🚀'},
    {name:'Magnetic Extension', description:'Magnetic reach extends the attack radius strongly.', damage:0, rate:0, range:0.5, icon:'🧲'},
    {name:'Eco Feedback', description:'Feedback loops amplify damage and speed significantly.', damage:5, rate:0.22, range:0.4, icon:'⚙️'}
  ]},
  {id:'evCharger', label:'EV Charger', emoji:'🔌', cost:90, range:3.2, damage:14, rate:1.1, color:'#0ea5e9', description:'Electrifies drones over distance.', upgrades:[
    {name:'Power Surge', description:'High voltage increases damage strongly.', damage:6, rate:0, range:0, icon:'🔋'},
    {name:'Charge Cycling', description:'Rapid cycling makes attack speed surge.', damage:0, rate:0.3, range:0, icon:'🔄'},
    {name:'Antenna Array', description:'Antenna signals widen the effective range.', damage:0, rate:0, range:0.6, icon:'📡'},
    {name:'Grid Overdrive', description:'Overdrive boosts every stat with massive energy.', damage:4, rate:0.26, range:0.45, icon:'🌐'}
  ]},
  {id:'windTurbine', label:'Wind Turbine', emoji:'💨', cost:110, range:3.5, damage:20, rate:0.8, color:'#38bdf8', description:'Wind energy blasts through waves.', upgrades:[
    {name:'Blade Sharpening', description:'Sharper blades deal much heavier strikes.', damage:10, rate:0, range:0, icon:'🪓'},
    {name:'Gust Stabilizer', description:'Smoother airflow makes it fire more often.', damage:0, rate:0.35, range:0, icon:'💨'},
    {name:'Storm Tower', description:'A storm engine increases the tower range widely.', damage:0, rate:0, range:0.7, icon:'🌪️'},
    {name:'Hurricane Core', description:'A raging core enhances every stat significantly.', damage:6, rate:0.28, range:0.5, icon:'⚡'}
  ]}
];

const levelNames = ['Seedling', 'Growing', 'Thriving', 'Powerhouse', 'Eco Apex'];

// ===== POWER STATION MODE =====
const powerStationObjects = [
  {id:'solar', label:'Solar Panel', emoji:'☀️', cost:50, powerPerSec:1.2, color:'#facc15', description:'Generates energy from sunlight.', upgrades:[
    {name:'Enhanced Cells', description:'Better solar cells boost energy output.', energyGain:0.6},
    {name:'Dual Array', description:'Two panels double the collection area.', energyGain:0.8},
    {name:'Tracking System', description:'Auto-tracking follows the sun perfectly.', energyGain:1.0},
    {name:'Quantum Amplifiers', description:'Quantum cells dramatically increase efficiency.', energyGain:1.4}
  ]},
  {id:'wind', label:'Wind Mill', emoji:'💨', cost:75, powerPerSec:1.8, color:'#38bdf8', description:'Harnesses wind power steadily.', upgrades:[
    {name:'Larger Blades', description:'Bigger blades capture more wind.', energyGain:0.7},
    {name:'Geared System', description:'Advanced gears improve efficiency.', energyGain:0.9},
    {name:'Triple Rotor', description:'Three rotors spin simultaneously.', energyGain:1.2},
    {name:'Storm Harvester', description:'Maximized turbine captures all wind power.', energyGain:1.6}
  ]},
  {id:'tree', label:'Energy Tree', emoji:'🌳', cost:90, powerPerSec:2.5, color:'#16a34a', description:'Natural bio-energy generator.', upgrades:[
    {name:'Healthy Growth', description:'Stronger branches produce more energy.', energyGain:0.8},
    {name:'Root Network', description:'Expanded roots tap deeper energy.', energyGain:1.0},
    {name:'Ancient Power', description:'Tree reaches its full potential.', energyGain:1.3},
    {name:'Symbiotic Boost', description:'Life energy amplifies exponentially.', energyGain:1.8}
  ]},
  {id:'water', label:'Water Wheel', emoji:'💧', cost:110, powerPerSec:3.2, color:'#0ea5e9', description:'Converts water flow to energy.', upgrades:[
    {name:'Reinforced Wheel', description:'Stronger wheel withstands more flow.', energyGain:0.9},
    {name:'Multi-Blade', description:'More blades capture every drop.', energyGain:1.1},
    {name:'Turbocharged', description:'Optimized flow path increases efficiency.', energyGain:1.4},
    {name:'Tidal Master', description:'Harnesses the power of flowing water perfectly.', energyGain:1.9}
  ]},
  {id:'crystal', label:'Crystal Geode', emoji:'💎', cost:150, powerPerSec:4.5, color:'#8b5cf6', description:'Rare mineral energy source.', upgrades:[
    {name:'Crystal Growth', description:'More crystals form and radiate power.', energyGain:1.2},
    {name:'Harmonic Resonance', description:'Crystals vibrate in perfect harmony.', energyGain:1.5},
    {name:'Pure Resonance', description:'Entire geode pulses with energy.', energyGain:1.9},
    {name:'Dimensional Channel', description:'Opens gateway to pure energy dimensions.', energyGain:2.5}
  ]},
  {id:'satellite', label:'Solar Satellite', emoji:'🛰️', cost:200, powerPerSec:6.0, color:'#ec4899', description:'Advanced orbital power generator.', upgrades:[
    {name:'Orbital Adjustment', description:'Perfect positioning maximizes collection.', energyGain:1.5},
    {name:'Multi-Panel Array', description:'Expanded panel array increases output.', energyGain:1.8},
    {name:'Quantum Link', description:'Quantum entanglement boosts transmission.', energyGain:2.2},
    {name:'Dyson Protocol', description:'Taps into stellar energy directly.', energyGain:3.0}
  ]}
];

const enemyTypes = [
  {id:'normal', label:'Smog Drone', icon:'⚡', color:'#f97316', baseHp:24, speed:0.8, reward:10, description:'Standard pollution mover.'},
  {id:'scout', label:'Scout Drone', icon:'🛩️', color:'#eab308', baseHp:18, speed:1.45, reward:9, description:'Fast and fragile.'},
  {id:'tank', label:'Tank Drone', icon:'🛡️', color:'#0f172a', baseHp:40, speed:0.55, reward:16, description:'Slow, tough and heavy.'},
  {id:'crawler', label:'Crawler Drone', icon:'🐌', color:'#7c3aed', baseHp:30, speed:0.65, reward:14, description:'Heavy pollution carrier.'},
  {id:'boss', label:'Pollution Mech', icon:'☠️', color:'#dc2626', baseHp:120, speed:0.45, reward:40, boss:true, description:'Summons reinforcements to overwhelm you.'}
];

const state = {
  energy: 150, baseHealth: 10, wave: 1, enemies: [], towers: [],
  selectedBuild: null, selectedMenuItem: null, spawning: false, spawnTimer: 0,
  spawnLeft: 0, enemyInterval: 1.0, lastFrame: performance.now(), shots: [],
  powerObjects: [], selectedPowerBuild: null, pendingPower: 0, totalEnergyRate: 0
};

function getTowerStats(tower){
  let d = tower.baseDamage, r = tower.baseRate, rng = tower.baseRange;
  const maxStep = Math.min(tower.level - 1, tower.upgrades ? tower.upgrades.length : 0);
  for(let i = 0; i < maxStep; i++){
    const step = tower.upgrades[i];
    d += step.damage || 0; r += step.rate || 0; rng += step.range || 0;
  }
  return { damage: Math.round(d), rate: +r.toFixed(2), range: +rng.toFixed(2) };
}

function getUpgradeCost(tower){ return tower.level >= 5 ? 0 : Math.ceil((tower.baseCost || tower.cost || 0) * (1 + tower.level * 0.7)); }
function canUpgradeTower(tower){ return tower.level < 5 && state.energy >= getUpgradeCost(tower); }
function getNextUpgrade(tower){ return tower.level >= 5 || !tower.upgrades ? null : tower.upgrades[tower.level - 1] || null; }
function computeTowerInvestment(tower){
  let total = tower.baseCost || 0;
  for(let level = 1; level < tower.level; level++){
    total += Math.ceil((tower.baseCost || 0) * (1 + level * 0.7));
  }
  return total;
}
function getSellValue(item){
  if(item.level && item.upgrades){ return Math.floor(computeTowerInvestment(item) * 0.65); }
  if(item.level && item.baseEnergy){ return Math.floor((item.baseCost || item.cost || 0) * (1 + item.level * 0.4) * 0.65); }
  return Math.floor((item.baseCost || item.cost || 0) * 0.65);
}
function getPowerObjectStats(obj){
  let energy = obj.basePowerPerSec || 0;
  const maxStep = Math.min(obj.level - 1, obj.upgrades ? obj.upgrades.length : 0);
  for(let i = 0; i < maxStep; i++){
    const step = obj.upgrades[i];
    energy += step.energyGain || 0;
  }
  return { powerPerSec: +energy.toFixed(2) };
}
function getPowerUpgradeCost(obj){ return obj.level >= 5 ? 0 : Math.ceil((obj.baseCost || obj.cost || 0) * (0.5 + obj.level * 0.3)); }
function canUpgradePowerObject(obj){ return obj.level < 5 && state.energy >= getPowerUpgradeCost(obj); }
function getNextPowerUpgrade(obj){ return obj.level >= 5 || !obj.upgrades ? null : obj.upgrades[obj.level - 1] || null; }
function resizeCanvas(){
  const maxW = Math.min(window.innerWidth - 520, 960), maxH = Math.min(window.innerHeight - 180, 640);
  const scale = Math.min(maxW / (cols * 80), maxH / (rows * 80), 1);
  canvas.width = Math.floor(cols * 80 * scale); canvas.height = Math.floor(rows * 80 * scale);
}

function drawGrid(){
  const csx = canvas.width/cols, csy = canvas.height/rows;
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
    ctx.fillStyle = ((c+r)%2===0) ? '#eefaf2' : '#e6f7ec';
    ctx.fillRect(c*csx, r*csy, csx, csy);
    ctx.strokeStyle = 'rgba(0,0,0,0.04)'; ctx.lineWidth = 1;
    ctx.strokeRect(c*csx+0.5, r*csy+0.5, csx-1, csy-1);
  }
}

function drawPath(){
  const cw = canvas.width/cols, ch = canvas.height/rows;
  ctx.fillStyle = 'rgba(59,130,246,0.16)';
  path.forEach(cell => ctx.fillRect(cell.c*cw+2, cell.r*ch+2, cw-4, ch-4));
  ctx.strokeStyle = 'rgba(59,130,246,0.35)'; ctx.lineWidth=2; ctx.beginPath();
  path.forEach((cell, i) => {
    const x = cell.c*cw + cw*0.5, y = cell.r*ch + ch*0.5;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.stroke();
}

function drawHouse(){
  const cw = canvas.width/cols, ch = canvas.height/rows, homeCell = path[path.length - 1];
  const x = homeCell.c * cw + cw * 0.5, y = homeCell.r * ch + ch * 0.5, size = Math.min(cw, ch) * 0.4;
  ctx.fillStyle = '#ffb86b';
  ctx.beginPath(); ctx.moveTo(x - size * 0.6, y + size * 0.4); ctx.lineTo(x - size * 0.6, y); ctx.lineTo(x, y - size * 0.5); ctx.lineTo(x + size * 0.6, y); ctx.lineTo(x + size * 0.6, y + size * 0.4); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#c2410c';
  ctx.beginPath(); ctx.moveTo(x - size * 0.65, y); ctx.lineTo(x, y - size * 0.55); ctx.lineTo(x + size * 0.65, y); ctx.lineTo(x + size * 0.65, y + size * 0.2); ctx.lineTo(x - size * 0.65, y + size * 0.2); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#7c2d12'; ctx.fillRect(x - size * 0.28, y + size * 0.05, size * 0.56, size * 0.45);
  ctx.fillStyle = '#fde68a'; ctx.fillRect(x - size * 0.15, y + size * 0.2, size * 0.3, size * 0.3);
}

function drawTowers(){
  const cw = canvas.width/cols, ch = canvas.height/rows;
  state.towers.forEach(tower => {
    const x = tower.col*cw + cw*0.5, y = tower.row*ch + ch*0.5;
    const size = Math.min(cw,ch) * 0.45;
    ctx.save();
    if(tower.level >= 4){ ctx.shadowColor = 'rgba(34,197,94,0.22)'; ctx.shadowBlur = 18; }
    switch(tower.id){
      case 'solarPanel': drawSolarTower(tower, x, y, size); break;
      case 'treeGuard': drawTreeGuardTower(tower, x, y, size); break;
      case 'recycleHub': drawRecycleHubTower(tower, x, y, size); break;
      case 'evCharger': drawEVChargerTower(tower, x, y, size); break;
      case 'windTurbine': drawWindTurbineTower(tower, x, y, size); break;
      default: drawDefaultTower(tower, x, y, size); break;
    }
    ctx.restore();
    drawTowerLabel(tower, x, y, size);
  });
}

function drawTowerLabel(tower, x, y, size){
  ctx.font = `${Math.floor(size * 0.55)}px serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = '#0f172a'; ctx.fillText(tower.emoji, x, y - size * 0.06);
  if(tower.level >= 5){
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(x, y - size*0.1, size * 0.75, 0, Math.PI*2); ctx.stroke();
  }
}

function drawDefaultTower(tower, x, y, size){
  ctx.fillStyle = tower.color; ctx.fillRect(x - size * 0.28, y - size * 0.55, size * 0.56, size * 1.1);
}

function drawSolarTower(tower, x, y, size){
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.14);
  ctx.fillStyle = '#fde68a';
  ctx.fillRect(-size*0.54, -size*0.23, size*1.08, size*0.32);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(-size*0.54, -size*0.13, size*1.08, size*0.18);
  ctx.fillStyle = '#1f2937';
  for(let i=-2;i<=2;i++){ ctx.fillRect(i*size*0.22 - size*0.1, -size*0.09, size*0.08, size*0.16); }
  if(tower.level >= 2){
    ctx.fillStyle = '#f97316';
    ctx.fillRect(-size*0.56, -size*0.32, size*0.12, size*0.4);
    ctx.fillRect(size*0.44, -size*0.32, size*0.12, size*0.4);
  }
  if(tower.level >= 3){
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(0, -size*0.35, size*0.12, 0, Math.PI*2); ctx.fill();
  }
  if(tower.level >= 4){
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(0, -size*0.05, size*0.56, 0, Math.PI); ctx.stroke();
  }
  if(tower.level >= 5){
    ctx.fillStyle = '#ffffff'; ctx.beginPath();
    ctx.moveTo(-size*0.08, -size*0.48); ctx.lineTo(0, -size*0.6); ctx.lineTo(size*0.08, -size*0.48);
    ctx.lineTo(size*0.12, -size*0.42); ctx.lineTo(0, -size*0.52); ctx.lineTo(-size*0.12, -size*0.42);
    ctx.closePath(); ctx.fill();
  }
  ctx.restore();
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath(); ctx.moveTo(x - size*0.25, y + size*0.08); ctx.lineTo(x, y + size*0.30); ctx.lineTo(x + size*0.25, y + size*0.08); ctx.closePath(); ctx.fill();
  if(tower.level >= 3){ ctx.strokeStyle = 'rgba(255,255,255,0.45)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - size*0.6, y - size*0.04); ctx.lineTo(x + size*0.6, y - size*0.04); ctx.stroke(); }
}

function drawTreeGuardTower(tower, x, y, size){
  ctx.fillStyle = '#8b5cf6';
  ctx.beginPath(); ctx.moveTo(x, y + size*0.3); ctx.lineTo(x - size*0.18, y + size*0.15); ctx.lineTo(x - size*0.18, y - size*0.05); ctx.lineTo(x + size*0.18, y - size*0.05); ctx.lineTo(x + size*0.18, y + size*0.15); ctx.closePath(); ctx.fill();
  ctx.fillStyle = tower.color; ctx.beginPath(); ctx.moveTo(x, y - size*0.35); ctx.bezierCurveTo(x + size*0.55, y - size*0.42, x + size*0.45, y + size*0.08, x, y + size*0.05); ctx.bezierCurveTo(x - size*0.45, y + size*0.08, x - size*0.55, y - size*0.42, x, y - size*0.35); ctx.fill();
  ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.arc(x - size*0.18, y - size*0.22, size*0.18, 0, Math.PI*2); ctx.arc(x + size*0.18, y - size*0.22, size*0.18, 0, Math.PI*2); ctx.arc(x, y - size*0.43, size*0.22, 0, Math.PI*2); ctx.fill();
  if(tower.level >= 2){ ctx.fillStyle = '#34d399'; ctx.beginPath(); ctx.arc(x - size*0.35, y - size*0.18, size*0.11, 0, Math.PI*2); ctx.arc(x + size*0.35, y - size*0.18, size*0.11, 0, Math.PI*2); ctx.fill(); }
  if(tower.level >= 3){ ctx.fillStyle = '#d9f99d'; ctx.fillRect(x - size*0.25, y - size*0.05, size*0.5, size*0.08); }
  if(tower.level >= 4){ ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y - size*0.28, size*0.4, Math.PI*0.1, Math.PI*0.9); ctx.stroke(); }
  if(tower.level >= 5){ ctx.strokeStyle = 'rgba(248,250,252,0.75)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - size*0.35, y + size*0.22); ctx.lineTo(x + size*0.35, y + size*0.22); ctx.stroke(); }
}

function drawRecycleHubTower(tower, x, y, size){
  ctx.fillStyle = tower.color;
  ctx.beginPath(); ctx.arc(x, y + size*0.05, size*0.3, 0, Math.PI*2); ctx.fill();
  ctx.fillRect(x - size*0.22, y - size*0.25, size*0.44, size*0.35);
  ctx.fillStyle = '#e0f2fe'; ctx.fillRect(x - size*0.16, y - size*0.19, size*0.32, size*0.26);
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(x - size*0.1, y + size*0.02); ctx.lineTo(x + size*0.08, y - size*0.12); ctx.lineTo(x + size*0.08, y + size*0.1); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.arc(x, y - size*0.08, size*0.12, Math.PI*0.8, Math.PI*1.6); ctx.stroke();
  if(tower.level >= 2){ ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y + size*0.05, size*0.45, 0, Math.PI*2); ctx.stroke(); }
  if(tower.level >= 3){ ctx.strokeStyle = 'rgba(249,115,22,0.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - size*0.15, y + size*0.35); ctx.lineTo(x + size*0.15, y + size*0.35); ctx.stroke(); }
  if(tower.level >= 4){ ctx.fillStyle = 'rgba(56,189,248,0.22)'; ctx.beginPath(); ctx.arc(x, y + size*0.05, size*0.52, 0, Math.PI*2); ctx.fill(); }
  if(tower.level >= 5){ ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y + size*0.05, size*0.62, 0, Math.PI*2); ctx.stroke(); }
}

function drawEVChargerTower(tower, x, y, size){
  ctx.fillStyle = tower.color;
  ctx.beginPath(); ctx.moveTo(x - size*0.2, y + size*0.3); ctx.lineTo(x - size*0.14, y - size*0.18); ctx.lineTo(x + size*0.14, y - size*0.18); ctx.lineTo(x + size*0.2, y + size*0.3); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#ffffff'; ctx.fillRect(x - size*0.08, y - size*0.18, size*0.16, size*0.28);
  ctx.fillStyle = tower.color; ctx.fillRect(x - size*0.06, y - size*0.35, size*0.12, size*0.12);
  ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.moveTo(x - size*0.02, y - size*0.3); ctx.lineTo(x + size*0.08, y - size*0.12); ctx.lineTo(x + size*0.02, y - size*0.12); ctx.lineTo(x + size*0.08, y + size*0.04); ctx.closePath(); ctx.fill();
  if(tower.level >= 2){ ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - size*0.18, y + size*0.06); ctx.lineTo(x - size*0.38, y + size*0.12); ctx.moveTo(x + size*0.18, y + size*0.06); ctx.lineTo(x + size*0.38, y + size*0.12); ctx.stroke(); }
  if(tower.level >= 3){ ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.moveTo(x - size*0.02, y - size*0.28); ctx.lineTo(x + size*0.08, y - size*0.12); ctx.lineTo(x + size*0.02, y - size*0.12); ctx.lineTo(x + size*0.08, y + size*0.04); ctx.closePath(); ctx.fill(); }
  if(tower.level >= 4){ ctx.strokeStyle = 'rgba(255,255,255,0.65)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y - size*0.25, size*0.18, 0, Math.PI*2); ctx.stroke(); }
  if(tower.level >= 5){ ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.moveTo(x - size*0.05, y - size*0.4); ctx.lineTo(x + size*0.05, y - size*0.4); ctx.lineTo(x, y - size*0.52); ctx.closePath(); ctx.fill(); }
}

function drawWindTurbineTower(tower, x, y, size){
  ctx.fillStyle = '#0ea5e9'; ctx.fillRect(x - size*0.08, y - size*0.3, size*0.16, size*0.7);
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(x, y - size*0.35, size*0.13, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = tower.color;
  for(let i = 0; i < 3; i++){
    const angle = i * Math.PI * 0.66;
    ctx.beginPath(); ctx.moveTo(x, y - size*0.35);
    ctx.quadraticCurveTo(x + Math.cos(angle) * size * 0.55, y - size*0.35 + Math.sin(angle) * size * 0.55, x + Math.cos(angle) * size * 0.95, y - size*0.35 + Math.sin(angle) * size * 0.95);
    ctx.lineTo(x + Math.cos(angle) * size * 0.25, y - size*0.35 + Math.sin(angle) * size * 0.25);
    ctx.closePath(); ctx.fill();
  }
  if(tower.level >= 2){
    ctx.strokeStyle = 'rgba(255,255,255,0.45)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x, y - size*0.35, size*0.3, 0, Math.PI*2); ctx.stroke();
  }
  if(tower.level >= 3){
    ctx.strokeStyle = 'rgba(249,115,22,0.6)'; ctx.lineWidth = 2;
    for(let i = 0; i < 3; i++){
      const angle = i * Math.PI * 0.66;
      ctx.beginPath(); ctx.moveTo(x + Math.cos(angle) * size*0.48, y - size*0.35 + Math.sin(angle) * size*0.48);
      ctx.lineTo(x + Math.cos(angle) * size*0.82, y - size*0.35 + Math.sin(angle) * size*0.82);
      ctx.stroke();
    }
  }
  if(tower.level >= 4){ ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y - size*0.35, size*0.55, 0, Math.PI*2); ctx.stroke(); }
  if(tower.level >= 5){
    ctx.fillStyle = '#fde047';
    ctx.beginPath(); ctx.arc(x, y - size*0.35, size*0.1, 0, Math.PI*2); ctx.fill();
  }
}

function drawEnemies(){
  const cw = canvas.width/cols, ch = canvas.height/rows;
  state.enemies.forEach(enemy => {
    const pos = getEnemyPosition(enemy), radius = Math.min(cw,ch)*0.2 * (enemy.type === 'boss' ? 1.4 : 1);
    ctx.beginPath(); ctx.fillStyle = enemy.color || '#f97316'; ctx.arc(pos.x,pos.y,radius,0,Math.PI*2); ctx.fill();
    if(enemy.type === 'boss'){ ctx.strokeStyle = 'rgba(255,255,255,0.45)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(pos.x,pos.y,radius + 8,0,Math.PI*2); ctx.stroke(); }
    ctx.fillStyle = '#ffffff'; ctx.font = `${Math.floor(Math.min(cw,ch)*0.16)}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline='middle'; ctx.fillText(enemy.icon || '⚡', pos.x, pos.y+1);
    const barW = cw*0.75, barH = 6, hr = Math.max(0, enemy.hp / enemy.maxHp);
    ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fillRect(pos.x-barW*0.5, pos.y-ch*0.32, barW, barH);
    ctx.fillStyle = '#22c55e'; ctx.fillRect(pos.x-barW*0.5, pos.y-ch*0.32, barW*hr, barH);
    ctx.strokeStyle = '#0f172a'; ctx.lineWidth=1; ctx.strokeRect(pos.x-barW*0.5, pos.y-ch*0.32, barW, barH);
  });
}

function drawShots(){
  const now = performance.now();
  state.shots = state.shots.filter(shot => now - shot.start < 150);
  state.shots.forEach(shot => {
    ctx.strokeStyle = `rgba(255,255,255,${1-(now-shot.start)/150})`;
    ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(shot.x1, shot.y1); ctx.lineTo(shot.x2, shot.y2); ctx.stroke();
  });
}

function getEnemyPosition(enemy){
  const cw = canvas.width/cols, ch = canvas.height/rows;
  const start = path[enemy.pathIndex], next = path[enemy.pathIndex + 1] || path[path.length-1];
  const x = (start.c + (next.c - start.c) * enemy.progress)*cw + cw*0.5;
  const y = (start.r + (next.r - start.r) * enemy.progress)*ch + ch*0.5;
  return {x, y};
}

function drawFieldBackground(){
  const w = canvas.width, h = canvas.height;
  const gp = ctx.createLinearGradient(0, 0, 0, h);
  gp.addColorStop(0, '#4ade80'); gp.addColorStop(1, '#22c55e');
  ctx.fillStyle = gp; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(255,255,255,0.03)';
  for(let i = 0; i < 200; i++) ctx.fillRect(Math.random() * w, Math.random() * h, Math.random() * 3 + 1, Math.random() * 3 + 1);
}

function drawPowerField(){
  const cw = canvas.width / 8, ch = canvas.height / 6;
  ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1;
  for(let i = 0; i <= 8; i++){ ctx.beginPath(); ctx.moveTo(i * cw, 0); ctx.lineTo(i * cw, canvas.height); ctx.stroke(); }
  for(let i = 0; i <= 6; i++){ ctx.beginPath(); ctx.moveTo(0, i * ch); ctx.lineTo(canvas.width, i * ch); ctx.stroke(); }
}

function drawPowerHouse(){
  const w = canvas.width, h = canvas.height, hx = w * 0.5, hy = h * 0.65, size = Math.min(w, h) * 0.08;
  ctx.fillStyle = '#ffb86b'; ctx.fillRect(hx - size * 1.5, hy - size * 1.2, size * 3, size * 2.4);
  ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(hx - size * 1.6, hy - size * 1.2); ctx.lineTo(hx, hy - size * 2.2); ctx.lineTo(hx + size * 1.6, hy - size * 1.2); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#92400e'; ctx.fillRect(hx - size * 0.4, hy + size * 0.5, size * 0.8, size * 0.9);
  ctx.fillStyle = '#fbbf24'; ctx.fillRect(hx + size * 0.3, hy - size * 0.4, size * 0.6, size * 0.6);
  if(state.pendingPower > 50){ ctx.strokeStyle = `rgba(34,197,94,${Math.min(state.pendingPower / 200, 0.8)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(hx, hy - size * 0.2, size * 2.2, 0, Math.PI * 2); ctx.stroke(); }
}

function drawPowerObjectShape(obj, x, y, size){
  ctx.save();
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2;
  const level = obj.level || 1;
  switch(obj.id){
    case 'solar':
      // Base panel
      ctx.fillStyle = '#fde047';
      ctx.beginPath(); ctx.moveTo(x, y - size * 0.35); ctx.lineTo(x - size * 0.42, y + size * 0.12); ctx.lineTo(x + size * 0.42, y + size * 0.12); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#f59e0b'; ctx.fillRect(x - size * 0.28, y - size * 0.08, size * 0.56, size * 0.2);
      ctx.strokeRect(x - size * 0.28, y - size * 0.08, size * 0.56, size * 0.2);
      // Level upgrades
      if(level >= 2){
        ctx.fillStyle = '#facc15'; ctx.fillRect(x - size * 0.28, y + size * 0.15, size * 0.56, size * 0.16);
        ctx.strokeRect(x - size * 0.28, y + size * 0.15, size * 0.56, size * 0.16);
      }
      if(level >= 3){
        ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(x - size * 0.15, y - size * 0.2, size * 0.08, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x + size * 0.15, y - size * 0.2, size * 0.08, 0, Math.PI * 2); ctx.fill();
      }
      if(level >= 4){
        ctx.fillStyle = '#fde047'; ctx.lineWidth = 1.5; ctx.strokeStyle = '#facc15';
        ctx.beginPath(); ctx.arc(x, y, size * 0.45, 0, Math.PI * 2); ctx.stroke();
      }
      if(level >= 5){
        ctx.fillStyle = '#ffeb3b'; ctx.shadowBlur = 15; ctx.shadowColor = '#facc15';
        ctx.beginPath(); ctx.arc(x, y, size * 0.35, 0, Math.PI * 2); ctx.fill();
      }
      break;
    case 'wind':
      // Base tower and hub
      ctx.fillStyle = '#38bdf8'; ctx.fillRect(x - size * 0.08, y - size * 0.32, size * 0.16, size * 0.68);
      ctx.fillStyle = '#e0f2fe'; ctx.beginPath(); ctx.arc(x, y - size * 0.35, size * 0.14, 0, Math.PI * 2); ctx.fill();
      // Blades scale with level
      const bladeCount = level >= 4 ? 4 : 3;
      for(let i = 0; i < bladeCount; i++){
        const angle = i * Math.PI * 2 / bladeCount;
        const bladeLength = level === 1 ? size * 0.78 : level === 2 ? size * 0.88 : level === 3 ? size * 0.98 : size * 1.08;
        const bladeWidth = level >= 3 ? size * 0.18 : size * 0.12;
        ctx.beginPath(); ctx.moveTo(x, y - size * 0.35);
        ctx.quadraticCurveTo(x + Math.cos(angle) * bladeWidth * 2.5, y - size * 0.35 + Math.sin(angle) * bladeWidth * 2.5,
                            x + Math.cos(angle) * bladeLength, y - size * 0.35 + Math.sin(angle) * bladeLength);
        ctx.lineTo(x + Math.cos(angle) * size * 0.24, y - size * 0.35 + Math.sin(angle) * size * 0.24);
        ctx.closePath(); ctx.fill(); ctx.stroke();
      }
      if(level >= 2){
        ctx.fillStyle = '#c7d2fe'; ctx.fillRect(x - size * 0.12, y - size * 0.08, size * 0.24, size * 0.12);
      }
      if(level >= 5){
        ctx.shadowBlur = 12; ctx.shadowColor = '#38bdf8';
        ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.arc(x, y - size * 0.35, size * 0.2, 0, Math.PI * 2); ctx.fill();
      }
      break;
    case 'tree':
      // Trunk
      ctx.fillStyle = '#facc15'; ctx.fillRect(x - size * 0.08, y + size * 0.02, size * 0.16, size * 0.4);
      // Foliage grows and expands
      ctx.fillStyle = '#16a34a';
      ctx.beginPath(); ctx.arc(x - size * (0.15 + level * 0.06), y - size * (0.08 + level * 0.05), size * (0.16 + level * 0.08), 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + size * (0.15 + level * 0.06), y - size * (0.08 + level * 0.05), size * (0.16 + level * 0.08), 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x, y - size * (0.32 + level * 0.08), size * (0.20 + level * 0.1), 0, Math.PI * 2); ctx.fill();
      if(level >= 3){
        ctx.fillStyle = '#22c55e';
        ctx.beginPath(); ctx.arc(x, y - size * 0.05, size * (0.18 + level * 0.05), 0, Math.PI * 2); ctx.fill();
      }
      ctx.strokeStyle = '#d9f99d'; ctx.lineWidth = level >= 4 ? 3.5 : 2.5;
      ctx.beginPath(); ctx.arc(x, y - size * 0.18, size * (0.35 + level * 0.12), 0, Math.PI * 2); ctx.stroke();
      if(level >= 5){
        ctx.shadowBlur = 14; ctx.shadowColor = '#16a34a';
        ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.arc(x, y - size * 0.25, size * 0.25, 0, Math.PI * 2); ctx.fill();
      }
      break;
    case 'water':
      // Wheel grows
      const wheelRadius = size * (0.28 + level * 0.08);
      ctx.fillStyle = '#0ea5e9'; ctx.beginPath(); ctx.arc(x, y, wheelRadius, 0, Math.PI * 2); ctx.fill();
      // Water flow
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.moveTo(x - size * 0.2, y - size * 0.02);
      ctx.bezierCurveTo(x - size * 0.1, y - size * (0.15 + level * 0.05), x + size * 0.1, y + size * (0.15 + level * 0.05), x + size * 0.24, y - size * 0.02);
      ctx.quadraticCurveTo(x + size * 0.05, y + size * (0.12 + level * 0.05), x - size * 0.16, y + size * (0.08 + level * 0.03));
      ctx.closePath(); ctx.fill();
      if(level >= 3){
        ctx.fillStyle = '#e0f2fe';
        ctx.beginPath(); ctx.moveTo(x - size * 0.15, y - size * 0.15);
        ctx.lineTo(x + size * 0.15, y - size * 0.15);
        ctx.lineTo(x + size * 0.1, y + size * 0.25);
        ctx.lineTo(x - size * 0.1, y + size * 0.25);
        ctx.closePath(); ctx.fill();
      }
      if(level >= 5){
        ctx.shadowBlur = 16; ctx.shadowColor = '#0ea5e9';
        ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(x, y, wheelRadius + size * 0.15, 0, Math.PI * 2); ctx.stroke();
      }
      break;
    case 'crystal':
      // Base crystal
      ctx.fillStyle = '#8b5cf6';
      ctx.beginPath(); ctx.moveTo(x, y - size * 0.4); ctx.lineTo(x + size * 0.18, y + size * 0.06);
      ctx.lineTo(x + size * 0.04, y + size * 0.4); ctx.lineTo(x - size * 0.04, y + size * 0.4);
      ctx.lineTo(x - size * 0.18, y + size * 0.06); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#c4b5fd'; ctx.beginPath(); ctx.moveTo(x, y - size * 0.4); ctx.lineTo(x + size * 0.12, y + size * 0.02);
      ctx.lineTo(x, y + size * 0.3); ctx.lineTo(x - size * 0.12, y + size * 0.02); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#f5f3ff'; ctx.stroke();
      // Level crystals around
      if(level >= 2){
        for(let i = 0; i < 2; i++){
          ctx.fillStyle = '#a78bfa';
          ctx.beginPath(); ctx.moveTo(x - size * (0.22 + i * 0.12), y + size * 0.05);
          ctx.lineTo(x - size * (0.26 + i * 0.12), y + size * 0.25);
          ctx.lineTo(x - size * (0.18 + i * 0.12), y + size * 0.25);
          ctx.closePath(); ctx.fill();
        }
      }
      if(level >= 4){
        ctx.shadowBlur = 20; ctx.shadowColor = '#8b5cf6';
        ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(x, y, size * 0.5, 0, Math.PI * 2); ctx.stroke();
      }
      if(level >= 5){
        ctx.shadowBlur = 25; ctx.shadowColor = '#c084fc';
        ctx.fillStyle = '#f3e8ff'; ctx.beginPath(); ctx.arc(x, y, size * 0.45, 0, Math.PI * 2); ctx.fill();
      }
      break;
    case 'satellite':
      // Main body
      ctx.fillStyle = '#ec4899';
      ctx.beginPath(); ctx.rect(x - size * 0.28, y - size * 0.12, size * 0.56, size * 0.24); ctx.fill();
      // Solar boom
      ctx.fillStyle = '#f9a8d4'; ctx.fillRect(x - size * (0.04 + level * 0.02), y - size * (0.28 + level * 0.08), size * (0.08 + level * 0.02), size * (0.38 + level * 0.1));
      // Antennae
      const antennaCount = level >= 3 ? 4 : level >= 2 ? 3 : 2;
      for(let i = 0; i < antennaCount; i++){
        const xPos = x - size * 0.32 + i * (size * 0.22);
        ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(xPos, y - size * 0.08);
        ctx.lineTo(xPos - size * (0.08 + level * 0.03), y - size * (0.18 + level * 0.05));
        ctx.lineTo(xPos + size * (0.02 + level * 0.01), y + size * (0.02 + level * 0.02));
        ctx.closePath(); ctx.fill();
      }
      if(level >= 4){
        ctx.shadowBlur = 18; ctx.shadowColor = '#ec4899';
        ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.rect(x - size * 0.35, y - size * 0.18, size * 0.7, size * 0.36); ctx.stroke();
      }
      if(level >= 5){
        ctx.shadowBlur = 24; ctx.shadowColor = '#fbcfe8';
        ctx.fillStyle = '#fce7f3'; ctx.beginPath(); ctx.rect(x - size * 0.3, y - size * 0.15, size * 0.6, size * 0.3); ctx.fill();
      }
      break;
    default:
      ctx.fillStyle = obj.color;
      ctx.beginPath(); ctx.arc(x, y, size * 0.3, 0, Math.PI * 2); ctx.fill();
      break;
  }
  ctx.restore();
}

function drawPowerObjects(){
  const cw = canvas.width / 8, ch = canvas.height / 6;
  state.powerObjects.forEach(obj => {
    const x = obj.col * cw + cw * 0.5, y = obj.row * ch + ch * 0.5, size = Math.min(cw, ch) * 0.35;
    ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.beginPath(); ctx.arc(x, y, size * 1.2, 0, Math.PI * 2); ctx.fill();
    drawPowerObjectShape(obj, x, y, size);
    ctx.fillStyle = '#ffffff'; ctx.font = `${Math.floor(size * 0.55)}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(`+${obj.powerPerSec.toFixed(1)}`, x, y + size * 1.3);
    if(state.selectedPowerBuild && state.selectedPowerBuild.id === obj.id){ ctx.strokeStyle = '#fde047'; ctx.lineWidth = 3; ctx.beginPath(); ctx.rect(x - size * 1.2, y - size * 1.2, size * 2.4, size * 2.4); ctx.stroke(); }
  });
}

function render(){
  if(currentMode === MODES.POWER){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFieldBackground(); drawPowerField(); drawPowerHouse(); drawPowerObjects();
  } else {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawGrid(); drawPath(); drawHouse(); drawTowers(); drawEnemies(); drawShots();
  }
}

function isPathCell(col,row){ return path.some(cell => cell.c===col && cell.r===row); }
function towerAt(col,row){ return state.towers.find(t => t.col===col && t.row===row); }
function canPlaceTower(col,row){ return col >= 0 && col < cols && row >= 0 && row < rows && !isPathCell(col,row) && !towerAt(col,row); }
function powerObjectAt(col, row){ return state.powerObjects.find(obj => obj.col === col && obj.row === row); }
function canPlacePowerObject(col, row){ return col >= 0 && col < 8 && row >= 0 && row < 6 && !powerObjectAt(col, row) && !(col >= 3 && col <= 4 && row >= 3 && row <= 4); }

function startWave(){
  if(state.spawning || state.enemies.length) return;
  state.spawnLeft = Math.round((4 + state.wave * 3) * (1 + state.wave * 0.04));
  state.spawnTimer = 0; state.spawning = true;
  state.enemyInterval = Math.max(0.85 - state.wave * 0.01, 0.45);
  updateControls();
}

function chooseEnemyType(){
  const bossWave = state.wave % 5 === 0;
  if(bossWave && state.spawnLeft === Math.round(4 + state.wave * 3 * (1 + state.wave * 0.04))) return enemyTypes.find(type => type.id === 'boss');
  const roll = Math.random();
  if(roll < 0.18) return enemyTypes.find(type => type.id === 'scout');
  if(roll < 0.47) return enemyTypes.find(type => type.id === 'tank');
  if(roll < 0.75) return enemyTypes.find(type => type.id === 'crawler');
  return enemyTypes.find(type => type.id === 'normal');
}

function waveDifficultyMultiplier(){ return 1 + state.wave * 0.16; }

function spawnEnemy(){
  const type = chooseEnemyType();
  const hpMult = type.id === 'tank' ? 1.45 : type.id === 'boss' ? 2.4 : 1.1;
  const baseHp = Math.floor(type.baseHp * waveDifficultyMultiplier() * hpMult);
  const speed = Math.min(type.speed + state.wave * 0.03, type.id === 'boss' ? 1.2 : 2.2);
  const reward = Math.max(Math.floor(type.reward * (1 + state.wave * 0.08)), type.reward + state.wave);
  const enemy = {
    type: type.id, label: type.label, icon: type.icon, color: type.color,
    pathIndex: 0, progress: 0, hp: baseHp, maxHp: baseHp, speed, reward,
    slowTimer: 0, slowFactor: 1
  };
  if(type.boss){ enemy.summonTimer = 3.5; enemy.summonsLeft = 2; }
  state.enemies.push(enemy);
}

function updateEnemies(dt){
  for(let i = state.enemies.length - 1; i >= 0; i--){
    const enemy = state.enemies[i];
    if(enemy.slowTimer > 0){ enemy.slowTimer -= dt; if(enemy.slowTimer <= 0) enemy.slowFactor = 1; }
    if(enemy.type === 'boss' && enemy.summonsLeft > 0){
      enemy.summonTimer -= dt;
      if(enemy.summonTimer <= 0){
        enemy.summonTimer = 4.0; enemy.summonsLeft -= 1;
        const reinf = [enemyTypes.find(type => type.id === 'scout'), enemyTypes.find(type => type.id === 'crawler'), enemyTypes.find(type => type.id === 'normal')][Math.floor(Math.random() * 3)];
        state.enemies.push({
          type: reinf.id, label: reinf.label, icon: reinf.icon, color: reinf.color,
          pathIndex: 0, progress: 0, hp: Math.floor(reinf.baseHp + state.wave * 5), maxHp: Math.floor(reinf.baseHp + state.wave * 5),
          speed: reinf.speed + state.wave * 0.02, reward: reinf.reward, slowTimer: 0, slowFactor: 1
        });
      }
    }
    const move = enemy.speed * enemy.slowFactor * dt * 0.8;
    enemy.progress += move;
    while(enemy.progress >= 1 && enemy.pathIndex < path.length - 1){ enemy.progress -= 1; enemy.pathIndex++; }
    if(enemy.pathIndex >= path.length - 1){
      const ratio = Math.max(0, Math.min(enemy.hp / enemy.maxHp, 1));
      const impact = Math.max(1, Math.ceil(ratio * 5));
      state.baseHealth -= impact;
      state.enemies.splice(i,1);
      flashLives();
    }
  }
}

function updateTowers(dt){
  state.towers.forEach(tower => {
    tower.cooldown -= dt;
    if(tower.cooldown > 0) return;
    const enemiesInRange = state.enemies.filter(enemy => {
      const pos = getEnemyPosition(enemy);
      const tx = (tower.col + 0.5) * (canvas.width/cols), ty = (tower.row + 0.5) * (canvas.height/rows);
      const dist = Math.hypot(pos.x - tx, pos.y - ty) / (canvas.width/cols);
      return dist <= tower.range;
    });
    if(enemiesInRange.length === 0) return;
    const target = enemiesInRange.reduce((best, enemy) => !best || enemy.pathIndex > best.pathIndex ? enemy : best, null);
    if(target){
      target.hp -= tower.damage;
      if(tower.slow){ target.slowTimer = 1.2; target.slowFactor = 1 - tower.slow; }
      tower.cooldown = 1 / tower.rate;
      const start = {x:(tower.col+0.5)*(canvas.width/cols), y:(tower.row+0.5)*(canvas.height/rows)};
      const end = getEnemyPosition(target);
      state.shots.push({x1:start.x, y1:start.y, x2:end.x, y2:end.y, start: performance.now()});
      if(target.hp <= 0){ state.energy += target.reward; state.enemies = state.enemies.filter(e => e !== target); }
    }
  });
}

function updateSpawning(dt){
  if(!state.spawning) return;
  state.spawnTimer += dt;
  if(state.spawnTimer >= state.enemyInterval && state.spawnLeft > 0){ state.spawnTimer -= state.enemyInterval; spawnEnemy(); state.spawnLeft -= 1; }
  if(state.spawnLeft === 0 && state.enemies.length === 0){ state.spawning = false; state.wave += 1; updateControls(); }
}

function updateControls(){ 
  const btn = document.getElementById('nextWaveBtn');
  if(state.spawning || state.enemies.length){ btn.textContent = 'Wave In Progress'; btn.disabled = true; }
  else { btn.textContent = 'Launch Wave'; btn.disabled = false; }
}

function buildDeploymentShop(){
  const shop = document.getElementById('deploymentShop');
  shop.innerHTML = '';
  towerTypes.forEach(type => {
    const li = document.createElement('li');
    li.style.display = 'flex'; li.style.alignItems = 'center'; li.style.gap = '10px';
    const selectBtn = document.createElement('button');
    selectBtn.className = 'btn';
    selectBtn.textContent = `Select (${type.cost})`;
    selectBtn.onclick = () => { state.selectedBuild = type; state.selectedMenuItem = null; closeItemMenu(); render(); };
    const info = document.createElement('div');
    info.innerHTML = `<div class="obj-icon">${type.emoji}</div><div><div class="obj-label">${type.label}</div><div style="font-size:12px;color:var(--muted)">${type.description}</div></div>`;
    const right = document.createElement('div');
    right.style.marginLeft='auto'; right.style.display='flex'; right.style.flexDirection='column'; right.style.alignItems='flex-end';
    const cost = document.createElement('div'); cost.textContent = `Cost: ${type.cost}`; cost.style.fontWeight=700; cost.style.fontSize='13px';
    right.appendChild(cost); right.appendChild(selectBtn);
    li.appendChild(info); li.appendChild(right); shop.appendChild(li);
  });
}

function openItemMenu(item, kind){
  state.selectedMenuItem = { kind, item };
  state.selectedBuild = null;
  state.selectedPowerBuild = null;
  updateItemMenu(item, kind);
  document.getElementById('towerMenu').classList.remove('hidden');
  render();
}

function openTowerMenu(tower){ openItemMenu(tower, 'tower'); }
function openPowerObjectMenu(obj){ openItemMenu(obj, 'power'); }
function closeItemMenu(){ state.selectedMenuItem = null; document.getElementById('towerMenu').classList.add('hidden'); render(); }

function updateItemMenu(item, kind){
  const title = document.getElementById('towerMenuTitle');
  const type = document.getElementById('towerMenuType');
  const description = document.getElementById('towerMenuDescription');
  const level = document.getElementById('towerMenuLevel');
  const damage = document.getElementById('towerMenuDamage');
  const rate = document.getElementById('towerMenuRate');
  const range = document.getElementById('towerMenuRange');
  const cost = document.getElementById('towerMenuCost');
  const notice = document.getElementById('towerMenuNotice');
  const upgradeBtn = document.getElementById('upgradeTowerBtn');
  const sellBtn = document.getElementById('sellItemBtn');
  const icon = document.getElementById('towerMenuIcon');

  icon.textContent = item.emoji || '⚙️';
  if(kind === 'tower'){
    title.textContent = `${item.label} Upgrade`;
    type.textContent = `${levelNames[item.level - 1]} Tower`;
    description.textContent = item.description;
    const stats = getTowerStats(item);
    const nextUpgrade = getNextUpgrade(item);
    level.textContent = `${item.level}/5`;
    damage.textContent = stats.damage;
    rate.textContent = `${stats.rate.toFixed(2)} / sec`;
    range.textContent = `${stats.range.toFixed(1)} tiles`;
    const upgradeCost = getUpgradeCost(item);
    cost.textContent = upgradeCost > 0 ? upgradeCost : 'MAX';
    upgradeBtn.disabled = item.level >= 5 || state.energy < upgradeCost;
    upgradeBtn.textContent = item.level >= 5 ? 'Maximum Level' : `Upgrade (${upgradeCost})`;
    upgradeBtn.style.display = 'inline-block';
    const nextName = document.getElementById('towerMenuNextName');
    const nextDesc = document.getElementById('towerMenuNextDesc');
    if(nextUpgrade){
      nextName.textContent = nextUpgrade.name;
      nextDesc.textContent = nextUpgrade.description;
      notice.textContent = `Next: ${nextUpgrade.name} will ${nextUpgrade.description.toLowerCase()}`;
    } else {
      nextName.textContent = 'None';
      nextDesc.textContent = 'This tower is fully upgraded.';
      notice.textContent = 'This tower is at peak performance.';
    }
  } else {
    title.textContent = `${item.label} Upgrade`;
    type.textContent = `Level ${item.level} Generator`;
    description.textContent = item.description;
    const stats = getPowerObjectStats(item);
    const nextUpgrade = getNextPowerUpgrade(item);
    level.textContent = `${item.level}/5`;
    damage.textContent = '-';
    rate.textContent = `${stats.powerPerSec.toFixed(2)} / sec`;
    range.textContent = 'N/A';
    const upgradeCost = getPowerUpgradeCost(item);
    cost.textContent = upgradeCost > 0 ? upgradeCost : 'MAX';
    upgradeBtn.disabled = item.level >= 5 || state.energy < upgradeCost;
    upgradeBtn.textContent = item.level >= 5 ? 'Maximum Level' : `Upgrade (${upgradeCost})`;
    upgradeBtn.style.display = 'inline-block';
    const nextName = document.getElementById('towerMenuNextName');
    const nextDesc = document.getElementById('towerMenuNextDesc');
    if(nextUpgrade){
      nextName.textContent = nextUpgrade.name;
      nextDesc.textContent = nextUpgrade.description;
      notice.textContent = `Next: ${nextUpgrade.name} will ${nextUpgrade.description.toLowerCase()}`;
    } else {
      nextName.textContent = 'None';
      nextDesc.textContent = 'This generator is fully upgraded.';
      notice.textContent = 'This generator is at peak performance.';
    }
  }
  const sellValue = getSellValue(item);
  sellBtn.textContent = `Sell (${sellValue})`;
  sellBtn.disabled = false;
}

function sellSelectedItem(){
  if(!state.selectedMenuItem) return;
  const { kind, item } = state.selectedMenuItem;
  const refund = getSellValue(item);
  state.energy += refund;
  if(kind === 'tower'){
    state.towers = state.towers.filter(t => t !== item);
  } else {
    state.powerObjects = state.powerObjects.filter(o => o !== item);
  }
  state.selectedMenuItem = null;
  closeItemMenu();
  updateUI();
  render();
}

function upgradeSelectedTower(){
  if(!state.selectedMenuItem) return;
  const { kind, item } = state.selectedMenuItem;
  if(kind === 'tower'){
    if(item.level >= 5) return;
    const cost = getUpgradeCost(item);
    if(state.energy < cost) return;
    state.energy -= cost;
    item.level += 1;
    const stats = getTowerStats(item);
    item.damage = stats.damage;
    item.rate = stats.rate;
    item.range = stats.range;
    updateItemMenu(item, 'tower');
  } else {
    if(item.level >= 5) return;
    const cost = getPowerUpgradeCost(item);
    if(state.energy < cost) return;
    state.energy -= cost;
    item.level += 1;
    const stats = getPowerObjectStats(item);
    item.powerPerSec = stats.powerPerSec;
    updateItemMenu(item, 'power');
  }
  updateUI();
  render();
}

function updateUI(){
  document.getElementById('score').textContent = state.energy;
  document.getElementById('lives').textContent = state.baseHealth;
  document.getElementById('wave').textContent = state.wave;
  document.getElementById('remaining').textContent = state.spawnLeft + state.enemies.length;
  if(currentMode === MODES.POWER){
    document.getElementById('pendingPower').textContent = Math.floor(state.pendingPower);
    document.getElementById('objectCount').textContent = state.powerObjects.length;
    document.getElementById('energyRate').textContent = state.totalEnergyRate.toFixed(1);
  }
  const selectedLabel = document.querySelector('#selectedTowerLabel strong');
  if(selectedLabel){
    selectedLabel.textContent = state.selectedBuild ? state.selectedBuild.label : 'None';
  }
  updateControls();
  const towerMenu = document.getElementById('towerMenu');
  if(!towerMenu.classList.contains('hidden') && state.selectedMenuItem) updateItemMenu(state.selectedMenuItem.item, state.selectedMenuItem.kind);
}

function flashLives(){
  const panel = document.querySelector('.panel.right');
  panel.style.borderColor = '#f87171';
  setTimeout(() => panel.style.borderColor = '', 200);
}

function gameLoop(){
  const now = performance.now();
  const dt = Math.min((now - state.lastFrame) / 1000, 0.033);
  state.lastFrame = now;
  
  if(currentMode === MODES.POWER){
    let tr = 0;
    state.powerObjects.forEach(obj => { tr += obj.powerPerSec; state.pendingPower += obj.powerPerSec * dt; });
    state.totalEnergyRate = tr;
  } else {
    if(state.spawning || state.enemies.length){
      updateSpawning(dt);
      updateEnemies(dt);
      updateTowers(dt);
    }
  }
  
  render();
  updateUI();
  
  if(currentMode === MODES.DEFENSE && state.baseHealth <= 0){
    document.getElementById('nextWaveBtn').textContent = 'Game Over';
    document.getElementById('nextWaveBtn').disabled = true;
  } else {
    requestAnimationFrame(gameLoop);
  }
}

function placeTower(col,row){
  if(!state.selectedBuild || !canPlaceTower(col,row) || state.energy < state.selectedBuild.cost) return;
  state.energy -= state.selectedBuild.cost;
  const tower = {
    col, row, ...state.selectedBuild,
    baseCost: state.selectedBuild.cost,
    baseDamage: state.selectedBuild.damage,
    baseRange: state.selectedBuild.range,
    baseRate: state.selectedBuild.rate,
    upgrades: state.selectedBuild.upgrades || [],
    level: 1,
    cooldown: 0
  };
  const stats = getTowerStats(tower);
  tower.damage = stats.damage; tower.range = stats.range; tower.rate = stats.rate;
  state.towers.push(tower);
  state.selectedBuild = null;
  updateUI();
}

function placePowerObject(col, row){
  if(!state.selectedPowerBuild || !canPlacePowerObject(col, row) || state.energy < state.selectedPowerBuild.cost) return;
  state.energy -= state.selectedPowerBuild.cost;
  const obj = {
    col, row, ...state.selectedPowerBuild,
    baseCost: state.selectedPowerBuild.cost,
    basePowerPerSec: state.selectedPowerBuild.powerPerSec,
    upgrades: state.selectedPowerBuild.upgrades || [],
    level: 1
  };
  const stats = getPowerObjectStats(obj);
  obj.powerPerSec = stats.powerPerSec;
  state.powerObjects.push(obj);
  state.selectedPowerBuild = null;
  updateUI();
}

function collectPower(){
  state.energy += Math.floor(state.pendingPower);
  state.pendingPower = 0;
  updateUI();
}

function buildPowerShop(){
  const shop = document.getElementById('powerShop');
  shop.innerHTML = '';
  powerStationObjects.forEach(type => {
    const li = document.createElement('li');
    li.style.display = 'flex'; li.style.alignItems = 'center'; li.style.gap = '10px';
    const selectBtn = document.createElement('button');
    selectBtn.className = 'btn';
    selectBtn.textContent = `Place (${type.cost})`;
    selectBtn.onclick = () => { state.selectedPowerBuild = type; state.selectedMenuItem = null; closeItemMenu(); };
    const info = document.createElement('div');
    info.innerHTML = `<div class="obj-icon">${type.emoji}</div><div><div class="obj-label">${type.label}</div><div style="font-size:12px;color:var(--muted)">${type.description}</div></div>`;
    const right = document.createElement('div');
    right.style.marginLeft = 'auto'; right.style.display = 'flex'; right.style.flexDirection = 'column'; right.style.alignItems = 'flex-end';
    const rate = document.createElement('div'); rate.textContent = `${type.powerPerSec}/s`; rate.style.fontSize = '12px'; rate.style.color = 'var(--muted)';
    const cost = document.createElement('div'); cost.textContent = `Cost: ${type.cost}`; cost.style.fontWeight = '700'; cost.style.fontSize = '13px';
    right.appendChild(rate); right.appendChild(cost); right.appendChild(selectBtn);
    li.appendChild(info); li.appendChild(right); shop.appendChild(li);
  });
}

canvas.addEventListener('click', (ev) => {
  if(currentMode === MODES.POWER){
    const rect = canvas.getBoundingClientRect();
    const x = ev.clientX - rect.left, y = ev.clientY - rect.top;
    const cw = canvas.width / 8, ch = canvas.height / 6;
    const col = Math.floor(x / cw), row = Math.floor(y / ch);
    const obj = powerObjectAt(col, row);
    if(obj){ openPowerObjectMenu(obj); return; }
    if(state.selectedPowerBuild) placePowerObject(col, row);
    closeItemMenu();
  } else {
    const rect = canvas.getBoundingClientRect();
    const x = ev.clientX - rect.left, y = ev.clientY - rect.top;
    const cw = canvas.width / cols, ch = canvas.height / rows;
    const col = Math.floor(x / cw), row = Math.floor(y / ch);
    const tower = towerAt(col,row);
    if(tower){ openTowerMenu(tower); return; }
    if(state.selectedBuild) placeTower(col, row);
    closeItemMenu();
  }
});

document.getElementById('nextWaveBtn').addEventListener('click', startWave);
document.getElementById('restartBtn').addEventListener('click', () => init());
document.getElementById('upgradeTowerBtn').addEventListener('click', () => upgradeSelectedTower());
document.getElementById('sellItemBtn').addEventListener('click', () => sellSelectedItem());
document.getElementById('closeTowerMenu').addEventListener('click', () => closeItemMenu());
document.getElementById('collectPowerBtn').addEventListener('click', () => collectPower());

document.querySelectorAll('.mode-tab').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const newMode = e.target.dataset.mode;
    if(newMode === (currentMode === MODES.POWER ? 'power' : 'defense')) return;
    
    document.querySelectorAll('.mode-tab').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    currentMode = newMode === 'power' ? MODES.POWER : MODES.DEFENSE;
    
    const els = {
      deployShop: document.getElementById('deploymentShop'),
      powerShop: document.getElementById('powerShop'),
      defenseLegend: document.getElementById('defenseLegend'),
      powerLegend: document.getElementById('powerLegend'),
      mainTitle: document.getElementById('mainTitle'),
      mainHint: document.getElementById('mainHint'),
      panelTitle: document.getElementById('panelTitle'),
      panelHint: document.getElementById('panelHint'),
      nextWaveBtn: document.getElementById('nextWaveBtn'),
      collectBtn: document.getElementById('collectPowerBtn'),
      rightTitle: document.getElementById('rightPanelTitle'),
      powerStats: document.getElementById('powerStationStats'),
      selectedLabel: document.getElementById('selectedTowerLabel'),
      defenseControls: document.getElementById('defenseControls'),
      powerControls: document.getElementById('powerControls')
    };
    
    if(currentMode === MODES.POWER){
      els.deployShop.classList.add('hidden');
      els.powerShop.classList.remove('hidden');
      els.defenseLegend.classList.add('hidden');
      els.powerLegend.classList.remove('hidden');
      els.defenseControls.classList.add('hidden');
      els.powerControls.classList.remove('hidden');
      els.mainTitle.textContent = 'FutureProof: Power Station';
      els.mainHint.textContent = 'Place generators around your house to produce energy. Click Collect Energy to harvest your power!';
      els.panelTitle.textContent = 'Generators';
      els.panelHint.textContent = 'Place objects in the field to generate passive energy. More objects = faster power generation!';
      els.nextWaveBtn.classList.add('hidden');
      els.collectBtn.classList.remove('hidden');
      els.rightTitle.textContent = 'Power Control';
      els.powerStats.classList.remove('hidden');
      els.selectedLabel.style.display = 'none';
    } else {
      els.deployShop.classList.remove('hidden');
      els.powerShop.classList.add('hidden');
      els.defenseLegend.classList.remove('hidden');
      els.powerLegend.classList.add('hidden');
      els.defenseControls.classList.remove('hidden');
      els.powerControls.classList.add('hidden');
      els.mainTitle.textContent = 'FutureProof: Eco Defense';
      els.mainHint.textContent = 'Build sustainable units and protect the path from pollution waves.';
      els.panelTitle.textContent = 'Eco Deployments';
      els.panelHint.textContent = 'Choose a deployment, then place it beside the route to defend the river corridor.';
      els.nextWaveBtn.classList.remove('hidden');
      els.collectBtn.classList.add('hidden');
      els.rightTitle.textContent = 'Eco Control';
      els.powerStats.classList.add('hidden');
      els.selectedLabel.style.display = 'block';
    }
    resizeCanvas();
    render();
  });
});

function init(){
  state.energy = 150; state.baseHealth = 10; state.wave = 1;
  state.enemies = []; state.towers = []; state.selectedBuild = null; state.selectedMenuItem = null;
  state.spawning = false; state.spawnTimer = 0; state.spawnLeft = 0;
  state.lastFrame = performance.now();
  state.powerObjects = []; state.selectedPowerBuild = null; state.pendingPower = 0; state.totalEnergyRate = 0;
  currentMode = MODES.DEFENSE;
  resizeCanvas();
  buildDeploymentShop();
  buildPowerShop();
  closeItemMenu();
  updateUI();
  render();
  requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', () => { resizeCanvas(); render(); });
resizeCanvas();
init();
