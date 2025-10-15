+++
title = "Opdracht: Teller"
date = 2025-09-17T00:00:00Z
draft = false
+++

Je bouwt een eenvoudige **teller** met drie knoppen. Bij **verhogen** en **verlagen** verandert de waarde, bij **beginwaarde** springt de teller terug op nul. De tekstkleur verandert automatisch: **groen** bij positief, **rood** bij negatief en **neutraal** bij nul. 

Zo oefen je nog eens heel belangrijke concepten van JavaScript: **state, DOM-selecties, events, classList, textContent**.

## Wat je leert

- Een **state-variabele** gebruiken (`let teller = 0`) 
- Elementen **selecteren** met `querySelector` en `querySelectorAll` 
- Een **eventhandler** schrijven die werkt voor meerdere knoppen.
- Met `event.currentTarget` en `classList.contains(...)` bepalen welke knop aangeklikt is.
- De **tekstinhoud updaten** met `textContent`.
- De **stijl aanpassen** door CSS-klassen aan te passen of te verwijderen/toevoegen.

## Structuur van je project

De map **VoornaamA_Teller** bevat:

- `index.html`
- `style.css`
- `app.js`

## HTML opbouw

In je `index.html`:

- Een `<span>` (of iets dergelijks) met `id="waarde"` voor de tellerwaarde.
- Drie knoppen met telkens de algemene klasse `.btn` en daarnaast één specifieke klasse: `.verlaag`, `.beginwaarde` of `.verhoog`
- Vergeet niet om onderaan je `<body>` je script (met `defer`) te koppelen:

```html
<script src="app.js" defer></script>
```

`defer` zorgt ervoor dat het script pas wordt uitgevoerd wanneer de volledige HTML is ingeladen. Zo bestaan alle elementen al op het moment dat je ze in JavaScript selecteert.

## Logica bouwen

### State-variabele maken

Zet bovenaan je `app.js`:

```js
let teller = 0;
```

- De variabele `teller` is de plek waar je de waarde bijhoudt.
- Je past altijd eerst de waarde in `teller` aan, en daarna werk je de tekst en kleur bij op het scherm.

### DOM-elementen selecteren

Selecteer de tellerwaarde en alle knoppen:

```js
const waardeEl = document.querySelector('#waarde');
const buttons = document.querySelectorAll('.btn');
```

- `querySelector` geeft één element terug.
- `querySelectorAll` geeft een **NodeList** (lijkt op een array) terug. Een NodeList is géén echte array, maar je kunt er wél met forEach doorheen loopen.

### Click-handler voor knoppen

Doorloop de NodeList en voeg per knop een eventlistener (click-handler) toe:

```js
buttons.forEach(function (btn) {
  btn.addEventListener('click', handleClick);
});
```

- Voordeel: je vermijdt drie keer bijna dezelfde code → overzichtelijk en onderhoudbaar.

### Welke knop geklikt?

We schrijven één functie `handleClick(e)` die voor alle knoppen werkt. De `e` is het **event-object** dat de browser automatisch meestuurt wanneer je op iets klikt, daarin zit o.a. informatie over wélk element is aangeklikt.

In je `handleClick`-functie (`function handleClick(e) { ... }`):

```js
const klassen = e.currentTarget.classList;
```

- `e.currentTarget` = het element waar de listener op zit (de knop zelf)
- `classList` → checkt of die knop een klasse heeft

### Tellerwaarde aanpassen

De variabele `teller` moet worden aangepast. Dat doe je met een eenvoudige **als-dan-structuur (conditioneel)**.

Gebruik een **`if` gevolgd door twee `else if`-blokken** om te bepalen welke actie wordt uitgevoerd op basis van welke knop is aangeklikt:

- Als de knop de klasse **`verlaag`** heeft (**`if`**) → verlaag de waarde met één (**`teller--`**).
- Als de knop de klasse **`verhoog`** heeft (**`else if`**) → verhoog de waarde met één (**`teller++`**).
- Als de knop de klasse **`beginwaarde`** heeft (**`else if`**) → zet de waarde terug op nul (**`teller = 0`**).

Denk aan:
`if (klassen.contains("verlaag")) { ... }`

### Waarde tonen in de UI

Zet de tekstinhoud van je `#waarde` element gelijk aan je variabele:

```js
waardeEl.textContent = teller;
```

- `textContent` is de manier om tekst op de pagina te tonen

### Kleur aanpassen op basis van waarde

De kleur van de tellertekst moet zich aanpassen aan de waarde. Gebruik hiervoor opnieuw een **`if` gevolgd door twee `else if`-blokken**:

- Als `teller` **groter dan 0** is → toon de tekst bijvoorbeeld in **groen**.
- Als `teller` **kleiner dan 0** is → toon de tekst bijvoorbeeld in **rood**.
- Als `teller` **gelijk aan 0** is → toon de tekst in een **neutrale kleur**.

Je kunt dit op twee manieren doen:

- door rechtstreeks de **`style.color`** van het element aan te passen
- of door eerst alle kleurklassen (zoals `.positief`, `.negatief`, `.nul`) te verwijderen en daarna de juiste **CSS-klasse toe te voegen**

Op die manier krijgt de teller altijd automatisch de juiste kleur bij elke klik.

Denk aan:
`if (teller > 0) { waardeEl.style.color = "green"; }`

## CSS

Je voorziet zelf CSS. Stijl je volledige pagina, de `#waarde` en de `.btn`-knoppen.

## Mini-uitbreidingen (optioneel)

- Voeg een “+5” en “−5” knop toe met dezelfde aanpak
- Zet de knoppen “Verlagen” of “Verhogen” op `disabled` bij bepaalde grenzen.
- Sla `teller` op in `localStorage` en laad de waarde terug in bij het openen.

## Indienen

- Vakmap **Weboriëntatie**, via OneDrive-link toegevoegd aan de opdracht in **Google Classroom**.

## Puntenverdeling

- **Structuur & koppeling**: Mappen en bestanden correct, `script` juist gekoppeld.
- **State & logica**: `teller` correct gebruikt en bijgewerkt.
- **DOM-selecties**: `#waarde` en `.btn` correct geselecteerd.
- **Click-handler**: `forEach`, `currentTarget`, `classList.contains` correct.
- **UI-update**: `textContent` wordt correct geüpdatet, kleur via `style` of klassen.
- **Consistentie & netheid**: Duidelijke klassen- en variabelennamen. Indentatie, comments, geen dode code.