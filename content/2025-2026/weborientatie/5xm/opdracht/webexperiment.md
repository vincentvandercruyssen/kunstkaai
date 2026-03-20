+++
title = 'Opdracht: Webexperiment'
date = 2026-03-20T00:00:00Z
draft = false
+++

## Introductie

Voor de opendeurdag van Kunstkaai maak je een **webexperiment**: een audio, visueel of interactief stuk dat op een scherm te zien is en bezoekers trekt, verrast of laat nadenken.

Deze opdracht heeft geen vaste oplossing en geen vast eindresultaat. Jij beslist zelf wat je maakt, hoe het eruitziet en wat het doet. Je gaat een **interactieve, digitale blikvanger** bouwen. Het doel is niet om een nuttige tool te maken, maar om bezoekers te laten stoppen, kijken, nadenken, spelen,...

Je mag alles gebruiken: HTML, CSS, JavaScript, Canvas, WebGL, externe API's, geluid, animatie, kleur, tekst, chaos. Voorbeelden opzoeken is uitdrukkelijk toegestaan, *vibecoden* ook.

De vereiste is dat het in een browser draait en dat je achteraf kan uitleggen wat je gedaan hebt.

### Tentoonstelling opendeurdag

Je werk wordt getoond tijdens de opendeurdag. Hou daarmee rekening in je ontwerp en functionaliteit:

- **Scherm:** Het moet er indrukwekkend, raar, grappig of mooi uitzien op een groot scherm.
- **Autonoom:** Het draait continu. Ook als er niemand iets doet, moet er iets te zien zijn.
- **Interactie:** De bezoeker kan iets doen (niet verplicht). Dit kan via de muis (klikken, slepen, hoveren), het toetsenbord, of via de webcam of microfoon.
- **Intuïtief:** Als bezoekers kunnen interageren, moet dat vanzelfsprekend zijn, er is geen begeleiding nodig om uit te leggen hoe het werkt.

### Wat kan je maken?

Ter inspiratie, maar zeker niet beperkt hiertoe:

- Een generatieve animatie die nooit exact hetzelfde is.
- Een interactief kleur- of geluidsexperiment.
- Een databron (API) die op een onverwachte of totaal verkeerde manier gevisualiseerd wordt.
- Een typografisch experiment dat reageert op muisbewegingen.
- Een procedureel gegenereerde wereld of patroon.
- Een spelachtige interface zonder spelregels.
- Gebruik van canvas of WebGL.
- Webcam + canvas: Gebruik van de `navigator.mediaDevices.getUserMedia` API om videobeelden in real-time te vervormen, te vertragen, of te overspoelen met bizarre filters zodra de bezoeker beweegt.
- Microfoon + canvas: een webpagina die "luistert" naar omgevingsgeluid en het volume of de toonhoogte koppelt aan CSS-animaties of elementen op het scherm.

Twijfel je of iets mag? Vraag het na.

## Vibecoding & werkwijze

Voor deze opdracht is uitdrukkelijk toegestaan om te *vibecoden*.

**Vibecoding** is een term bedacht door [Andrej Karpathy](https://en.wikipedia.org/wiki/Andrej_Karpathy) die verwijst naar een manier van programmeren waarbij je de controle grotendeels overlaat aan een AI-assistent en zelf vooral op gevoel en doel stuurt. Je beschrijft wat je wilt in natuurlijke taal, de AI genereert de code, en jij test en stuurt. De naam verwijst naar het "op de vibe afgaan", je laat je meevoeren door wat de AI produceert in plaats van elke regel zelf te redeneren. 

Vibecoding verlaagt de drempel om werkende software te maken, maar brengt risico's mee zoals buggy of onveilige code. Critici stellen dat vibecoding geen echt programmeren is, terwijl voorstanders het zien als een legitieme nieuwe vaardigheid in een [LLM](https://nl.wikipedia.org/wiki/Groot_taalmodel)-gedreven wereld.

- Je mag het internet (CodePen, GitHub, tutorials) afschuimen naar code-voorbeelden en deze schaamteloos als inspiratie gebruiken. Ga naar websites zoals CodePen.io, zoek op termen als "creative coding", "generative art" of "interactive background" en verzamel coole snippets.
- **AI als co-piloot**: Gebruik LLM's om complexe stukken code te genereren die je zelf misschien nog niet helemaal begrijpt, zolang je het werkend krijgt en achteraf (grotendeels) snapt wat het doet.
- **Trial & error / Frankenstein**: Laat je inspireren door de code die je tof vindt, voeg je eigen HTML/CSS toe, trek er een API bij en bouw je monster. Plak dingen aan elkaar, kijk of het breekt, en pas het aan tot de *vibe* klopt. 

**Laat je project aan een klasgenoot zien**: Weten ze intuïtief wat ze moeten doen? Is het leuk om mee te spelen? Combineer technieken die je al kent (zoals DOM-manipulatie of een API) met iets compleet nieuws (een externe library of een experimentele browser-functie).

### Bronnen en inspiratie

Je mag vrijuit bronnen opzoeken en voorbeeldcode bekijken. Vermeld achteraf duidelijk wat je gebruikt hebt en wat je bronnen waren.

Mogelijke startpunten:

- [p5.js](https://p5js.org/): Creatief coderen in JavaScript.
  - [OpenProcessing](https://openprocessing.org/): Creatieve code-sketches.
- [Three.js](https://threejs.org/): 3D en WebGL in de browser.
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API): Tekenen met JavaScript.
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API): Geluid genereren of visualiseren.
- [Shadertoy](https://www.shadertoy.com/): GLSL shaders in de browser.
- [CodePen](https://codepen.io/): Duizenden voorbeelden om van te leren.

## Structuur van je project

Werk in je OneDrive vakmap voor **Weboriëntatie**. Zorg voor de volgende mappen- en bestandenstructuur:

```text
VoornaamA_Webexperiment/
├── index.html
├── style.css
├── app.js
└── readme.md
```

Heb je extra bestanden nodig (fonts, afbeeldingen, geluiden, extra scripts) maak dan submappen aan zoals `fonts/`, `images/` of `audio/`.

### Toelichting (readme.md)

Je levert in je map ook een kort tekstdocument in (`readme.md`). Dit hoeft geen essay te zijn, twee tot vijf zinnen per punt is genoeg:
- Wat je gemaakt hebt en waarom.
- Welke bronnen en prompts/AI je gebruikte.
- Wat je geleerd hebt.
- Wat je anders zou doen als je meer tijd had.

## Indienen

- Plaats de map `VoornaamA_Webexperiment` in je OneDrive-map voor Weboriëntatie.
- Deel de **OneDrive-link** met **leesrechten**.
- Dien de link in via **Google Classroom**.

## Puntenverdeling

- **Werking en afwerking (06)**: Het experiment draait foutloos in een browser en is volledig afgewerkt.
- **Visuele en/of interactieve impact (06)**: Het trekt de aandacht, verrast of doet iets interessants. Het is niet generiek.
- **Technische ambitie (04)**: Je hebt iets geprobeerd dat nieuw, gedurfd of moeilijk was voor jou.
- **Verantwoording (04)**: Bronnen vermeld, kort maar eerlijk beschreven wat je deed en leerde in je `readme.md`.