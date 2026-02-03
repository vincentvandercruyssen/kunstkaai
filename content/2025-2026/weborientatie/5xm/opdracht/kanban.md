+++
title = 'Opdracht: Kanban'
date = 2026-02-02T00:00:00Z
draft = false
+++

## Introductie

In deze opdracht bouw je een digitaal kanban met minimaal drie kolommen: Te doen, Bezig, Klaar. Je kan kaartjes toevoegen en je kan kaartjes verplaatsen door te slepen. 

Doel: je leert een interactief systeem opbouwen met herbruikbare logica.

Let op: Drag en drop werkt niet betrouwbaar in VS Code Live Preview op macOS. Test je webapp in een browser.

### Kanwat?

Kanban van het Japanse *kan* 'visueel' en *ban* 'kaart' of 'bord'.

Kanban is een visuele methode om werk en projecten te organiseren. Taken worden voorgesteld als kaartjes op een bord met kolommen die de voortgang tonen: zoals te doen, bezig en klaar. Door taken stap voor stap te verplaatsen ontstaat overzicht in wat nog moet gebeuren, wat loopt en wat afgerond is.

Kanban kan zowel fysiek als digitaal gebruikt worden.

{{< img src="/img/weborientatie/5xm/opdracht/kanban/kanban_bord.jpg" >}}

### Computationeel denken

**Decompositie** het probleem opdelen in kleinere, duidelijke stukjes. 

**Patronen** herkennen gelijkenissen zien tussen taken.  

**Abstractie** enkel focussen op wat echt belangrijk is. 

**Algoritmes** een reeks logische stappen bedenken om tot een oplossing te komen.

Decompositie voor deze opdracht:

* Stap 1: HTML structuur van bord en kolommen.
* Stap 2: CSS voor layout en feedback.
* Stap 3: Kaarten toevoegen met knop.
* Stap 4: Kaarten sleepbaar maken.
* Stap 5: Lijsten bruikbaar maken als drop zones.
* Stap 6: Kleine extra toevoegen.

## Structuur van je project

Werk in je OneDrive vakmap voor Weboriëntatie, met deze structuur:

```
VoornaamA_Kanban/
├── index.html
├── style.css
└── app.js
```

* Volg de schoolafspraak: Voornaam + initialen achternaam_Naam opdracht.
* Je levert niet in als zipbestand.
* Je deelt je vakmap via een OneDrive link met leesrechten.

## HTML

### Basisstructuur

Gebruik semantische HTML.

* `main` rond de inhoud
* Eén `h1`
* Min. drie kolommen, elk met een `h2`
* Min. drie drop zones met `class="lijst"`

Boven de kolommen komt de bediening om kaartjes toe te voegen, dat kan er zo uit zien: 

```html
<div class="bediening">
  <input id="kaartTekst" placeholder="Nieuw kaartje toevoegen" />
  <button id="voegKaartToe">Toevoegen</button>
</div>
```

### ID kenmerken

Gebruik id kenmerken voor elementen die je in CSS en JavaScript moet aanspreken.

* `id="kaartTekst"`
* `id="voegKaartToe"`
* `id="todo"`

Gebruik classes voor groepen elementen:

* `kanban-bord`, `kolom`, `lijst`, `kaart`

## CSS

Voorzie een eenvoudige basisopmaak: leesbaar, rustig, overzichtelijk.

Plak dit in `style.css` en vul de TODO stukken zelf aan.

```css
body {
  background-color: #f6f6f8;
  color: #121212;
  font-family: system-ui;
}

.bediening {
  margin-block-end: 24px;
}

input {
  padding: 6px;
  width: 220px;
}

button {
  padding: 6px 10px;
}

.kanban-bord {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

/* TODO: kolom als duidelijk blok */
.kolom {
}

/* TODO: drop zone zichtbaar maken */
.lijst {
}

/* TODO: feedback bij dragover */
.lijst.over {
}

/* TODO: kaart stijl */
.kaart {
  cursor: grab;
}

/* TODO: kaart feedback tijdens slepen */
.zwevend {
  opacity: 0.5;
}
```

Minimumvereiste:

* Het bord staat in 3 kolommen
* De drop zones zijn zichtbaar
* `.over` en `.zwevend` geven duidelijke feedback

## JavaScript

### State

Je bewaart welk kaartje je op dit moment sleept. Bij het laden van de app is er geen actief kaartje, dus initialiseer je dit met `null`.

Bovenaan in `app.js`:

```js
let gesleepteKaart = null;
```

Bron: https://code.mu/nl/javascript/manual/lang/null/

### Selecties

Maak deze selecties en bewaar ze in `const` variabelen.

```js
const variabeleNaam = document.querySelector("#id");
```

* `input` voor `#kaartTekst`
* `button` voor `#voegKaartToe`
* `todoLijst` voor `#todo`
* `alleLijsten` voor `.lijst`

Bron: https://leertaken.nl/5.-JS/5.-DOM-manipulation/DOM

### Functies

Je maakt twee functies:

* `kaartToevoegen()` maakt een nieuw kaartje en plaatst het in de lijst Te doen.
* `maakSleepbaar(kaart)` koppelt de drag events aan één kaartje.

Je krijgt een skelet. Vul de ontbrekende stukken zelf aan.

```js
const input = document.querySelector("#kaartTekst");
const button = document.querySelector("#voegKaartToe");
const todoLijst = document.querySelector("#todo");
const alleLijsten = document.querySelectorAll(".lijst");

function kaartToevoegen() {
  // optioneel: trim verwijdert spaties aan het begin en einde
  const tekst = input.value.trim();
  // dit zorgt ervoor dat er geen lege kaarten kunnen worden toegevoegd
  if (!tekst) return;

  // hier maken we de kaart aan
  const kaart = document.createElement("div");
  // voeg klasse toe voor styling
  kaart.className = "kaart";
  // voeg de tekst uit de input toe
  kaart.textContent = tekst;

  // maak de nieuwe kaart sleepbaar, met eigen functie
  maakSleepbaar(kaart);

  // voeg de kaart toe aan de "Te doen" lijst
  document.querySelector("#todo").appendChild(kaart);
  // maak het tekstveld terug leeg
  document.querySelector("#kaartTekst").value = "";
}
```

Bron: https://leertaken.nl/5.-JS/3.-Functions/functions

### Events

Koppel je knop met een click event.

```js
button.addEventListener("click", kaartToevoegen);
```

## Drag en drop

Je krijgt kleine codeblokken, maar jij moet ze correct plaatsen en begrijpen.

### Functie: maakSleepbaar

Geef commentaren die aantonen dat je de code begrijpt.

```js
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
```

### Lijsten als drop zones

Je koppelt drie events aan elke lijst. Geef commentaren die aantonen dat je de code begrijpt.

```js
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
    if (gesleepteKaart) lijst.appendChild(gesleepteKaart);
  });
});
```

Waarom preventDefault?

## Testplan

Test in deze volgorde, los fouten direct op.

* Klik toevoegen, kaart komt in Te doen
* Lege input doet niets
* Slepen naar Bezig werkt
* Slepen naar Klaar werkt
* `.over` verschijnt bij dragover
* `.zwevend` verschijnt bij dragstart

## Extra

Kies minstens één uitbreiding uit de lijst hieronder, of bedenk zelf een eigen extra, en werk die volledig af. Je wordt beoordeeld op de creatieve én technische uitwerking hiervan.

* Toevoegen met Enter
* Kaart verwijderen
* Kaart bewerken (dubbelklik)
* Prioriteit per kaart
* Teller per kolom
* Limiet per kolom
* Sorteren binnen kolom
* Zoekfilter
* Opslag in localStorage
* Klaar archiveren
* Kleurlabels
* Kleine animatie feedback

## Indienen

* Plaats de map `VoornaamA_Kanban` in je OneDrive map Weboriëntatie.
* Deel de OneDrive link met leesrechten.
* Dien de link in via Google Classroom. 

## Puntenverdeling

* Bestandsnamen en structuur (04) Correcte map, juiste bestanden, OneDrive link.
* HTML (06) Semantische structuur, correcte koppen, id kenmerken correct, classes logisch.
* CSS (06) Overzichtelijke layout, kolommen, kaarten, duidelijke feedback classes.
* JavaScript basis (04) Correcte selecties, click event, functie kaartToevoegen werkt foutloos en bevat duidelijke, inhoudelijke commentaar.
* Drag en drop (04) Sleepbaar, drop zones, verplaatsen werkt altijd en code is duidelijk becommentarieerd, geen errors.
* Extra (06) Nieuwe optie(s) volledig werkend en netjes geïntegreerd.

## Bronnen

Je noteert onderaan je pagina welke bronnen je gebruikte. Kopiëren zonder bronvermelding is niet toegestaan.