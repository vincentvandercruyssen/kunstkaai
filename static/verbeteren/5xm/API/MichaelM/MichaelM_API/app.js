

const zoekveld = document.getElementById('zoekveld');
const zoekknop = document.getElementById('zoekknop');
const randomknop = document.getElementById('randomknop');
const resultaat = document.getElementById('resultaat');
const limitSelect = document.getElementById('limit');
const themaKnop = document.getElementById('themeToggle');

// Kleine fallback-lijst (gebruikbaar als de API niet toegankelijk is)
const fallbackCountries = [
  {
    name: { common: 'Nederland' },
    translations: { nld: { common: 'Nederland' } },
    capital: ['Amsterdam'],
    flags: { png: 'https://flagcdn.com/w320/nl.png' }
  },
  {
    name: { common: 'België' },
    translations: { nld: { common: 'België' } },
    capital: ['Brussel'],
    flags: { png: 'https://flagcdn.com/w320/be.png' }
  },
  {
    name: { common: 'Frankrijk' },
    translations: { nld: { common: 'Frankrijk' } },
    capital: ['Parijs'],
    flags: { png: 'https://flagcdn.com/w320/fr.png' }
  }
];

// Helper: fetch met timeout en retries
async function fetchWithTimeout(url, timeout = 8000, retries = 1){
  for(let attempt = 0; attempt <= retries; attempt++){
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try{
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      return res;
    }catch(err){
      clearTimeout(id);
      if(attempt === retries) throw err;
      // wacht kort voor retry
      await new Promise(r => setTimeout(r, 500));
    }
  }
}

function init(){
  zoekknop.addEventListener('click', () => zoek());
  randomknop.addEventListener('click', () => zoekRandom());
  zoekveld.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') zoek();
  });
  // Update label van randomknop afhankelijk van de limiet
  if(limitSelect){
    limitSelect.addEventListener('change', updateRandomLabel);
    updateRandomLabel();
  }
  if(themaKnop){
    themaKnop.addEventListener('click', wisselThema);
  }
  laadThema();
}

function updateRandomLabel(){
  if(!randomknop || !limitSelect) return;
  const val = limitSelect.value;
  if(val === 'all'){
    randomknop.textContent = 'Verras me (alle)';
    randomknop.setAttribute('aria-label', 'Verras me met alle landen');
  } else if(Number(val) > 1){
    randomknop.textContent = `Verras me (${val})`;
    randomknop.setAttribute('aria-label', `Verras me met ${val} landen`);
  } else {
    randomknop.textContent = 'Verras me';
    randomknop.setAttribute('aria-label', 'Verras me');
  }
}

function laadThema(){
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  if(themaKnop) themaKnop.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function wisselThema(){
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next === 'dark' ? 'dark' : 'light');
  localStorage.setItem('theme', next);
  if(themaKnop) themaKnop.textContent = next === 'dark' ? '☀️' : '🌙';
}

function setLoading(){
  resultaat.innerHTML = '<div class="loading">Bezig met laden...</div>';
}

function toonFout(msg){
  resultaat.innerHTML = `<div class="error">${msg}</div>`;
}

function maakKaart(land){
  const displayName = (land.translations && land.translations.nld && (land.translations.nld.common || land.translations.nld.official)) || land.name.common || land.name || 'Vlag';
  const alt = displayName;
  const capitals = land.capital ? land.capital.join(', ') : 'Geen hoofdstad';
  const population = land.population ? land.population.toLocaleString('nl-NL') : 'Onbekend';
  const regionEn = land.region || 'Onbekend';

  const regionMap = {
    'Africa': 'Afrika',
    'Americas': 'Amerika',
    'Asia': 'Azië',
    'Europe': 'Europa',
    'Oceania': 'Oceanië',
    'Antarctic': 'Antarctica'
  };
  const region = regionMap[regionEn] || regionEn;

  let currencies = '—';
  if(land.currencies){
    const codes = Object.keys(land.currencies);
    const currencyNameMap = { EUR: 'Euro', USD: 'Amerikaanse dollar', GBP: 'Britse pond', JPY: 'Japanse yen', CHF: 'Zwitserse frank' };
    currencies = codes.map(code => currencyNameMap[code] || (land.currencies[code] && land.currencies[code].name) || code).join(', ');
  }

  let languages = '—';
  if(land.languages){
    const languageMap = {
      'Dutch': 'Nederlands',
      'English': 'Engels',
      'French': 'Frans',
      'German': 'Duits',
      'Spanish': 'Spaans',
      'Portuguese': 'Portugees',
      'Arabic': 'Arabisch',
      'Chinese': 'Chinees',
      'Russian': 'Russisch',
      'Italian': 'Italiaans'
    };
    languages = Object.values(land.languages).map(l => languageMap[l] || l).join(', ');
  }

  return `
    <article class="card">
      <img class="flag" src="${land.flags && land.flags.png ? land.flags.png : ''}" alt="Vlag van ${alt}">
      <div>
        <div class="name">${displayName}</div>
        <div class="meta">${region} • ${capitals}</div>
      </div>
      <div class="meta">Bevolking: ${population}</div>
      <div class="meta">Valuta: ${currencies}</div>
      <div class="meta">Talen: ${languages}</div>
      <div class="actions">
        <a href="https://nl.wikipedia.org/wiki/${encodeURIComponent(displayName)}" target="_blank" rel="noopener">Wikipedia (NL)</a>
      </div>
    </article>
  `;
}

function toonResultaat(landen){
  if(!landen || landen.length === 0){
    toonFout('Geen resultaten gevonden. Probeer een andere zoekterm.');
    return;
  }

  const lim = limitSelect.value;
  let subset = landen;
  if(lim !== 'all'){
    const n = parseInt(lim, 10);
    subset = landen.slice(0, n);
  }

  resultaat.innerHTML = subset.map(maakKaart).join('');
}

// Compacte kaart: alleen vlag, naam en hoofdstad (voor willekeurige selectie)
function maakKaartKort(land){
  const displayName = (land.translations && land.translations.nld && (land.translations.nld.common || land.translations.nld.official)) || land.name.common || land.name || 'Vlag';
  const capitals = land.capital ? land.capital.join(', ') : 'Geen hoofdstad';
  return `
    <article class="card">
      <img class="flag" src="${land.flags && land.flags.png ? land.flags.png : ''}" alt="Vlag van ${displayName}">
      <div>
        <div class="name">${displayName}</div>
        <div class="meta">${capitals}</div>
      </div>
    </article>
  `;
}

function toonResultaatKort(landen){
  if(!landen || landen.length === 0){
    toonFout('Geen resultaten gevonden. Probeer opnieuw.');
    return;
  }
  resultaat.innerHTML = landen.map(maakKaartKort).join('');
}

async function haalLandenOp(query){
  const basis = 'https://restcountries.com/v3.1/name/';
  const url = basis + encodeURIComponent(query) + '?fullText=false';
  try{
    const res = await fetch(url);
    if(!res.ok){
      if(res.status === 404) return [];
      throw new Error(`Server gaf status ${res.status}`);
    }
    const data = await res.json();
    return data;
  }catch(err){
    throw err;
  }
}

async function zoek(){
  const term = zoekveld.value.trim();
  if(!term){
    toonFout('Vul eerst een zoekterm in.');
    return;
  }
  setLoading();
  try{
  const landen = await haalLandenOp(term);
    toonResultaat(landen);
  }catch(err){
    console.error(err);
    toonFout('Er is een fout opgetreden tijdens het ophalen van data. Controleer je verbinding.');
  }
}

async function zoekRandom(){
  setLoading();
  try{
  const res = await fetchWithTimeout('https://restcountries.com/v3.1/all', 8000, 1);
  if(!res.ok) throw new Error('Kon lijst van landen niet ophalen (status ' + res.status + ')');
  const data = await res.json();
    // Zorg dat response een array is
    if(!Array.isArray(data)) throw new Error('Onverwacht antwoord van API');

    // Bepaal aantal willekeurige landen volgens geselecteerde limiet
    let count = 1;
    const MAX_ALL = 50; // limiet om UI-overload en browserproblemen te voorkomen
    let showTruncateNote = false;
    if(limitSelect && limitSelect.value){
      if(limitSelect.value === 'all'){
        count = data.length;
        if(count > MAX_ALL){
          count = MAX_ALL;
          showTruncateNote = true;
        }
      } else {
        count = parseInt(limitSelect.value, 10) || 1;
      }
    }

    for(let i = data.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
    const gekozen = data.slice(0, count);
    // Debug info
    console.debug(`zoekRandom: totale landen=${data.length}, gekozen=${gekozen.length}`);
    if(showTruncateNote){
      const note = `<div class="loading">Opmerking: je vroeg alle landen, maar de weergave is beperkt tot ${count} items om de pagina niet te vertragen.</div>`;
      resultaat.innerHTML = note + gekozen.map(maakKaartKort).join('');
    } else {
      toonResultaatKort(gekozen);
    }
  }catch(err){
    console.error('zoekRandom fout:', err);
    // Bepaal een duidelijke, Nederlandstalige fouttekst
    let errMsg = 'Onbekende fout';
    if(err && err.name === 'AbortError'){
      errMsg = 'Tijdslimiet bereikt bij ophalen (timeout). Controleer je verbinding.';
    } else if(err && err instanceof TypeError){
      errMsg = 'Netwerkfout of CORS-beperking. Controleer of je verbinding actief is en of je de pagina via http(s) serveert.';
    } else if(err && err.message){
      errMsg = err.message;
    } else {
      errMsg = String(err);
    }

    // Toon fallback met retry-knop
    resultaat.innerHTML = `
      <div class="error">Kon geen lijst van landen ophalen: ${errMsg}</div>
      <div style="margin-top:10px">
        <button id="retryRandom">Opnieuw proberen</button>
        <button id="useFallback">Toon enkele voorbeelden</button>
      </div>
    `;
    const retryBtn = document.getElementById('retryRandom');
    const fallbackBtn = document.getElementById('useFallback');
    if(retryBtn) retryBtn.addEventListener('click', () => zoekRandom());
    if(fallbackBtn) fallbackBtn.addEventListener('click', () => toonResultaatKort(fallbackCountries));
  }
}

init();
