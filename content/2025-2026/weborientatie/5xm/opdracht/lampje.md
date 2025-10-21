+++
title = 'Opdracht: Lampje'
date = 2025-09-29T00:00:00Z
draft = false
+++

In deze opdracht bouw je een **lampje** dat je kunt **aan- en uitzetten** met twee knoppen. Wanneer je de lamp **aanzet**, krijgt de lamp kleur en verschijnt er tekst, bijvoorbeeld **“Lamp is aan”**. Wanneer de lamp wordt **uitgezet**, kleurt de lamp **neutraal** en verschijnt er tekst zoals **“Lamp is uit”**.

Zo leer je stap voor stap hoe je in **JavaScript** een **state** beheert, **DOM-elementen** selecteert, **events** koppelt, **functies** schrijft en **stijl en tekst** dynamisch aanpast.

## Computationeel denken

Even tussendoor.

**Computational Thinking** betekent *denken als een computer*: je leert problemen stap voor stap oplossen zoals bijvoorbeeld een programmeur dat doet. 

Computationeel denken bestaat uit vier belangrijke bouwstenen:

1. **Decompositie** het probleem opdelen in kleinere, duidelijke stukjes.
2. **Patronen herkennen** gelijkenissen zien tussen taken.
3. **Abstractie** enkel focussen op wat echt belangrijk is.
4. **Algoritmes** een reeks logische stappen bedenken om tot een oplossing te komen.

### Decompositie

In deze opdracht wordt vooral **Decompositie** toegepast: het probleem *“maak een werkend lampje met javascript”* kan opgedeeld worden in vijf kleine stappen:

1. De **state** (toestand) bijhouden.
2. De juiste **elementen selecteren**, elementen uit de HTML halen.
3. De knoppen laten reageren met **events**.
4. Taken bundelen in **functies**, herbruikbare blokken code.
5. De **UI** (kleur en tekst) aanpassen, stijl en tekst aanpassen met logica.

Door elk stukje apart te bouwen, kun je stap voor stap het volledige programma opbouwen.

## Structuur van je project

Zorg dat je werkt in je vakmap voor het vak **Weboriëntatie**.

```
VoornaamA_Lampje/
├── index.html
├── style.css
└── app.js
```

In je HTML maak je een **lampje** met een `div`-element, een **tekstvak** met een `p`-element en **twee knoppen**. Gebruik momenteel uitsluitend `id`-kenmerken om CSS en JavaScript aanpassingen toe te voegen.

Vergeet niet je script onderaan te koppelen met `defer` zodat het pas start als de HTML is ingeladen. In deze kleine opdracht is dat nog niet cruciaal, maar in grotere projecten wel, zo ben je zeker dat alle HTML-elementen bestaan vóór je JavaScript start.

```html
  <script src="app.js" defer></script>
```

## State: de toestand van de lamp

Een **state** is een **variabele** die onthoudt wat de huidige toestand is. Bijvoorbeeld, in dit geval, is de lamp **aan** of **uit**? Een variabele kan **veel verschillende soorten gegevens** bijhouden: getallen, stukken tekst, waar/onwaar, lijsten, enzoverder.

Gebruik hiervoor:

```js
let lampAan = false;
```

- `let` gebruik je als de waarde **kan veranderen** tijdens het programma.
- In dit geval start de lamp **uit** (`false`) en kan later **aan** gezet worden (`true`).

Een veelgebruikte manier om variabelen te schrijven is met **camelCase**: het eerste woord is **klein**, elk volgend woord start met een **hoofdletter** (zoals `lampAan` of `aantalKlikken`). Zo blijft de naam leesbaar en herken je het als één geheel.

## Selecties: elementen uit de HTML halen

In JavaScript kun je via de **DOM** (*Document Object Model*) elk onderdeel van je webpagina aanspreken. De DOM is de **boomstructuur van je HTML**, waarin elk element een tak is die je met code kunt bereiken.

Om met **JavaScript** iets te **veranderen in de HTML**, moet je het eerst **selecteren**. Gebruik `querySelector()` om elementen te vinden via hun `id`.

In dit geval:

- De **lamp** (`#lamp`)
- De **status-tekst** (`#status`)
- De twee **knoppen** (`#btn-aan` en `#btn-uit`)

Bewaar deze selecties in **const**-variabelen:

```js
const lamp = document.querySelector('#lamp');
```

- `const` gebruik je voor dingen die **niet opnieuw worden toegewezen** (maar hun **inhoud** mag wél veranderen)
- `document` verwijst naar het hele HTML-document
- `querySelector` zoekt het **eerste** element dat overeenkomt met de opgegeven selector
- Wil je **meerdere elementen** tegelijk selecteren , dan gebruik je `querySelectorAll()`

Zo zul je de geselecteerde elementen verder in je code rechtstreeks kunnen aanpassen.

## Events: reageren op klikken

De knoppen moeten **iets doen** als je erop klikt.

Dat doe je met een **eventlistener**:

```js
knopAan.addEventListener('click', zetAan);
```

- `addEventListener` zegt letterlijk: “luister naar een **event** (hier: klik) en voer dan een **functie** uit.”
- Dit is beter dan `onclick` in HTML, want je scheidt **structuur (HTML)** van **logica (JS)**. Zo blijft je code **duidelijker en properder**.

Je maakt dus twee eventlisteners:

- Eén voor **aanzetten**
- Eén voor **uitzetten**

## Functies: herbruikbare blokjes code

Een **functie** is een **groepje instructies** die samen een taak uitvoeren. Functies dienen om code **herbruikbaar** en **duidelijk** te maken.

Bijvoorbeeld:

- `zetAan()` zet de lamp aan
- `zetUit()` zet de lamp uit
- `updateLamp()` werkt de tekst en kleur bij

In de functies pas je eerst de **state** aan (bijv. `lampAan = true;`)
en roep je dan **`updateLamp()`** op om de **UI** te veranderen. Zo hou je je code overzichtelijk en vermijd je herhaling.

```js
function naamFunctie() {
  // voer iets uit
}
```

## UI-update: tekst en kleur veranderen

In de **updateLamp-functie** controleer je met een **conditionele structuur** (`if ... else`) wat de toestand is, en pas je op basis daarvan de stijl en tekst aan.

Een **conditionele structuur** betekent: *iets uitvoeren als een bepaalde voorwaarde klopt, waar is.*

Bijvoorbeeld:

- **Als** de lamp **aan** is (`if (lampAan)`), verander dan de kleur naar **geel** en de tekst naar **“Lamp is aan”**.
- **Anders** (`else`), zet de kleur terug naar **grijs** en de tekst naar **“Lamp is uit”**.

```js
if (lampAan) {
  // lamp aan → kleur geel, tekst groen
} else {
  // lamp uit → kleur grijs, tekst zwart
}
```

### Wat gebruik je hier?

- `element.style.backgroundColor = 'yellow';` → past rechtstreeks de **achtergrondkleur** aan.
- `element.textContent = 'Lamp is aan';` → verandert de **tekstinhoud** van het element.
- `element.style.color = 'green';` → past de **tekstkleur** aan.

Zo maak je de **visuele feedback** voor de gebruiker.

## Decompositie in actie

Door het probleem op te delen in vijf logische stappen (state, selecties, events, functies, UI), heb je **controle** over elk deel en kun je fout per fout opsporen. Dat is exact wat **decompositie** betekent.

## Stijl (CSS)

Ontwerp in `style.css` een **eenvoudige, overzichtelijke opmaak**. Geef de lamp bijvoorbeeld een **cirkelvorm** met een **duidelijke kleur**. 

## Mini-uitbreidingen (optioneel)

- Tel hoe vaak de lamp is aangezet (extra state: `let aantalKeer = 0`).
- Voeg meerdere lampen toe.
- ...

## Indienen

- Map **VoornaamA_Lampje** in de vakmap **Webontwikkeling**.
- Upload **OneDrive-link** van je gehele vakmap **Webontwikkeling** in **Google Classroom**.

## Puntenverdeling

- **Structuur en netheid** Correcte mapstructuur, heldere naamgeving, indeling, koppeling
- **Inhoud (HTML)**
- **Vormgeving (CSS)**
- **Interactiviteit (JS)**
  - **State** Juiste variabele gebruikt
  - **Selecties** Juiste elementen geselecteerd
  - **Events** Listeners correct gekoppeld
  - **Functies** Duidelijke functies
  - **UI-update** Correcte `if ... else`, `style`, `textContent`
- **Eigen toevoeging** Creatieve en inventieve toevoeging aan de webapp

## Bronnen

### Variabelen & state

* [let - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
* [const - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
* [JavaScript Data Types | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

### DOM-selecties

* [Document Object Model (DOM) Introduction | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
* [Document.querySelector() | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
* [Document.querySelectorAll() | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

### Events

* [Element.addEventListener() | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
* [Event reference | MDN](https://developer.mozilla.org/en-US/docs/Web/Events)

### Functies

* [Functions - JavaScript Guide | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
* [function declaration | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)

### Condities & logica

* [if...else - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
* [Booleans | MDN](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)

### UI-updates

* [Element.textContent | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
* [HTMLElement.style | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)

### HTML & defer

* [`<script>` - HTML | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer)

### Denkconcept

* [Computational Thinking | Wikipedia](https://en.wikipedia.org/wiki/Computational_thinking)