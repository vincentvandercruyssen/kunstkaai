+++
title = "Opdracht: Typoanimatie"
date = 2026-03-23T00:00:00Z
draft = false
+++

## Opgave

In deze opdracht maak je een **geanimeerd typografisch kunstwerk** dat getoond wordt op de opendeurdag van Kunstkaai. De pagina is als een levende poster op een beeldscherm.

Je kiest kernwoorden die jij associeert met de richting **grafische technieken**. Die woorden worden de inhoud én het vertrekpunt van jouw ontwerp en animatie.

Je bouwt één HTML-pagina voor je typografisch ontwerp dat automatisch animeert op een beeldscherm. Je herhaalt de technieken van absolute positionering en typografie, en leert werken met `transform`, `@keyframes`, `animation` en optioneel JavaScript.

## Bouw de pagina

### Voorbereiding

Maak een nieuwe map aan in je map voor webontwikkeling, genaamd `VoornaamA_Typoanimatie`. Open deze map in Visual Studio Code.

```text
VoornaamA_Typoanimatie/
├── index.html
└── style.css
```

### HTML-structuur

Open `index.html` en maak de basisstructuur aan met `!` (Emmet). Koppel `style.css` in het `<head>`-element.

Je werkt in de `<body>` met een `<main>`-element als container, met daarin verschillende elementen. Je maakt eerst een typografisch ontwerp alvorens je de CSS-animaties toevoegd. 

Bedenk welke kernwoorden jij kiest en welke sfeer daarbij past. Je kiest zelf welke woorden je gebruikt, hoeveel elementen je toevoegt en hoe je alles positioneert. Ontwerp de compositie en kies ook een kleurenpalet. 

Voor je verschilende tekst-elementen gebruik je een `class` voor de gedeelde positionering (bijv. `position: absolute`). Gebruik `id`'s voor element-specifieke eigenschappen zoals `font-size`, `top`/`left`/etc., `rotate`, `transform`, enz.

### Volledig scherm

Om de pagina als poster te laten werken op een monitor, gebruik je de volgende CSS:

```css
html, body {
  height: 100%;
}

body {
  overflow: hidden;
  background-color: ...;
}

main {
  height: 100%;
}
```

Met `overflow: hidden` zorg je ervoor dat er geen scrollbalk verschijnt. Alle elementen binnen `main` positioneer je met `position: absolute`.

### Typografie

Kies één of meerdere lettertypes via [Adobe Fonts](https://fonts.adobe.com/) of [Google Fonts](https://fonts.google.com/) die passen bij jouw kunstwerk. 

Pas de lettergrootte aan met `vw`-eenheden zodat de tekst meeschaalt met het scherm, normaal is dit afgeraden maar bij dit experiment kan het:

```css
body {
  font-family: "jouw-lettertype", sans-serif;
}

h2#tekst01 {
  font-size: 18vw;
  color: #ffffff;
}
```

### CSS transforms

Met `transform` verplaats, schaal of roteer je een element. 

Veelgebruikte functies:

- `scaleX(...)` / `scale(...)`: horizontaal of volledig schalen.
- `rotate(...)`: roteren in graden, bijvoorbeeld `rotate(-90deg)`.
- `translate(-50%, -50%)`: centreert een element op zijn ankerpunt.

Je kunt functies combineren op één regel:

```css
  transform: scaleX(1.2) rotate(-90deg);
```

Let op: als je meerdere functies combineert, moet je ze altijd **samen** op één regel zetten. Een tweede `transform`-regel overschrijft de eerste volledig.

Bronnen via MDN: [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform).

### CSS keyframe-animaties

Met `@keyframes` definieer je een animatie die automatisch afgespeeld wordt. Je geeft de animatie een naam en beschrijft hoe het element eruitziet op verschillende momenten (`0%`, `50%`, `100%` of `from` en `to`).

```css
@keyframes verschijnen {
  0%   { opacity: 0; transform: scaleX(0); }
  15%  { opacity: 1; transform: scaleX(1); }
  85%  { opacity: 1; transform: scaleX(1); }
  100% { opacity: 0; transform: scaleX(0); }
}
```

Je koppelt een `@keyframes` aan een element via de eigenschap `animation`:

```css
h1 {
  animation: verschijnen 8s ease infinite;
}
```

De deeleigenschappen van `animation`:

- `animation-name`: de naam van de `@keyframes`.
- `animation-duration`: hoe lang één cyclus duurt.
- `animation-timing-function`: het verloop (`ease`, `linear`, `steps(n)`, ...).
- `animation-delay`: vertraging voor de start.
- `animation-iteration-count`: aantal herhalingen (`1`, `3`, `infinite`).
- `animation-fill-mode`: eindtoestand na afloop (`forwards`, `backwards`, `both`).

Met `animation-delay` laat je elementen na elkaar verschijnen, bijvoorbeeld:

```css
.element-1 { animation-delay: 0s; }
.element-2 { animation-delay: 1.5s; }
.element-3 { animation-delay: 3s; }
```

Bronnen via MDN: [animation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation), [@keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes).

### Inspiratie en hulpmiddelen

- [Animista](https://animista.net/) genereer kant-en-klare CSS-animaties en kopieer de code.
- [CodePen: text animation](https://codepen.io/search/pens?q=text+animation) zoek naar voorbeelden van tekstanimaties gemaakt door andere developers.
- [Easing Wizard](https://easingwizard.com/) maak je eigen `cubic-bezier`-curve voor vloeiende of springerige animaties die je ingeeft bij `animation-timing-function`.
- [Wait! Animate](https://waitanimate.wstone.uk/) bereken een wachttijd voor je animaties, `animation-delay` werkt enkel voor het begin van de animatie.
- [Animate.css](https://animate.style/) CSS-bibliotheek van kant-en-klare animatieklassen, ook bruikbaar als inspiratie voor `@keyframes`.
- [Transition.style](https://www.transition.style/) verzameling van creatieve CSS-transitions.
- [CSS Wand](https://www.csswand.dev/) copy-paste CSS-effecten voor achtergronden, tekst en knoppen.

### CSS transitions

Een `transition` zorgt voor een vloeiende overgang wanneer een CSS-eigenschap verandert, bijvoorbeeld bij `:hover`.

```css
.element {
  opacity: 0.5;
  transition: opacity 0.4s ease;
}

.element:hover {
  opacity: 1;
}
```

Gebruik `transition` voor subtiele hover-effecten op elementen, of om de overgang tussen twee toestanden zachter te maken.

Bronnen via MDN: [transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition).

### JavaScript (voor de avontuurlijken)

Met JavaScript kun je animaties triggeren op een specifiek moment, of je pagina laten reageren op de muis.

**Klasse toevoegen na een vertraging**

```js
const titel = document.querySelector('h1');

setTimeout(() => {
  titel.classList.add('actief');
}, 2000);
```

`setTimeout` voert een functie uit na een opgegeven aantal milliseconden. De klasse `actief` definieer je dan in CSS met een `transition` of andere stijl.

**Reageren op muisbewegingen**

```js
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  document.body.style.setProperty('--muis-x', x);
  document.body.style.setProperty('--muis-y', y);
});
```

De muispositie sla je op als een CSS-variabele die je vervolgens in CSS kunt gebruiken. Dit combineert HTML, CSS en JavaScript op een elegant manier.

Bronnen via MDN: [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout), [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList), [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event).

## Indienen

Zorg dat in de map `VoornaamA_Typoanimatie` de volgende bestanden zitten:

- `index.html`
- `style.css`

Plaats de map `VoornaamA_Typoanimatie` in je vakmap voor Webontwikkeling op OneDrive.

Zorg voor een koppeling naar je volledige vakmap in je OneDrive bij de opdracht in Google Classroom.

## Puntenverdeling

- **Structuur (04)** Correcte bestandsnamen en mapstructuur, `index.html`, `style.css`.
- **HTML (06)** Zinvol gebruik van elementen, duidelijke klassen, nette nesting. Kernwoorden grafische technieken als inhoud.
- **CSS basis (08)** Full-screen layout met `vw`/`vh` en `overflow: hidden`, lettertype via Adobe Fonts, kleurgebruik en compositie.
- **CSS animatie (16)** Correct gebruik van `@keyframes` (min. twee), `animation` met bijbehorende deeleigenschappen, `transform` (min. twee functies), `transition` op minstens één element.
- **Artistiek resultaat (06)** Samenhangend geheel, bewuste keuze van woorden, kleuren en lettertype, geschikt voor tentoonstelling.

## Veelvoorkomende fouten

- Pagina scrollt of heeft scrollbalk zichtbaar (vergeten `overflow: hidden`).
- Animatie speelt één keer en blijft leeg (voeg `infinite` toe of gebruik `animation-fill-mode: forwards`).
- `animation-delay` werkt niet zoals verwacht.
- `transform`-functies worden overschreven doordat ze op twee aparte regels staan.
- Lettertype laadt niet door een fout pad of ontbrekende `@import`.
