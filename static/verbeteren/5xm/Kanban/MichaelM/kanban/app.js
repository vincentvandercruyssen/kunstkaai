let gesleepteKaart = null;

const input = document.querySelector("#kaartTekst");
const button = document.querySelector("#voegKaartToe");
const todoLijst = document.querySelector("#todo");
const alleLijsten = document.querySelectorAll(".lijst");

const todoCount = document.querySelector('#todoCount');
const bezigCount = document.querySelector('#bezigCount');
const klaarCount = document.querySelector('#klaarCount');

const progressBar = document.querySelector('#progressBar');
const progressPercent = document.querySelector('#progressPercent');

function updateTellers() {
	todoCount.textContent = todoLijst.children.length;
	bezigCount.textContent = document.querySelector('#bezig').children.length;
	klaarCount.textContent = document.querySelector('#klaar').children.length;
  updateProgress();
}

function kaartToevoegen() {
	const tekst = input.value.trim();
	if (!tekst) return;

	const kaart = document.createElement('div');
	kaart.className = 'kaart';
	kaart.textContent = tekst;

	const btn = document.createElement('button');
	btn.className = 'verwijder';
	btn.textContent = '✕';
	btn.title = 'Verwijder kaart';
	btn.addEventListener('click', (e) => {
		e.stopPropagation();
		kaart.remove();
		updateTellers();
	});

	const tekstWrapper = document.createElement('span');
	tekstWrapper.textContent = tekst;
	kaart.textContent = '';
	kaart.appendChild(tekstWrapper);
	kaart.appendChild(btn);

	maakSleepbaar(kaart);
	todoLijst.appendChild(kaart);
	input.value = '';
	updateTellers();
}

function maakSleepbaar(kaart) {
	kaart.draggable = true;

	kaart.addEventListener('dragstart', (e) => {
		gesleepteKaart = kaart;
		kaart.classList.add('zwevend');
		e.dataTransfer.setData('text/plain', '');
	});

	kaart.addEventListener('dragend', () => {
		kaart.classList.remove('zwevend');
		gesleepteKaart = null;
		alleLijsten.forEach(l => l.classList.remove('over'));
	});
}

alleLijsten.forEach((lijst) => {
	lijst.addEventListener('dragover', (e) => {
		e.preventDefault();
		lijst.classList.add('over');
	});

	lijst.addEventListener('dragleave', () => {
		lijst.classList.remove('over');
	});

	lijst.addEventListener('drop', (e) => {
		e.preventDefault();
		lijst.classList.remove('over');
		if (gesleepteKaart) {
			lijst.appendChild(gesleepteKaart);
			updateTellers();
		}
	});
});

button.addEventListener('click', kaartToevoegen);
input.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') kaartToevoegen();
});

document.querySelectorAll('.kaart').forEach(maakSleepbaar);
updateTellers();

function updateProgress() {
	const totaal = document.querySelectorAll('.lijst .kaart').length;
	const klaar = document.querySelectorAll('#klaar .kaart').length;
	const pct = totaal === 0 ? 0 : Math.round((klaar / totaal) * 100);
	if (progressBar) progressBar.style.width = pct + '%';
	if (progressPercent) progressPercent.textContent = pct + '%';
	const progressEl = document.querySelector('.progress');
	if (progressEl) progressEl.setAttribute('aria-valuenow', String(pct));
}
