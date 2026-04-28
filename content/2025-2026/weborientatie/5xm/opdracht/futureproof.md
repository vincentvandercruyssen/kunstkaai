+++
title = 'Opdracht: Future Proof'
date = 2026-04-27T00:00:00Z
draft = false
aliases = ["/2025-2026/weborientatie/5xm/opdracht/duurzaamheid/"]
+++

## Introductie

Voor de **mini-eindproef** maak je voor het vak Weboriëntatie een **interactieve minigame of webapp** (dit hoeft dus niet per se een spelletje te zijn) rond een thema binnen duurzaamheid. Binnen de eindproef bedenk je een **product** en voor dit product maak je in de andere praktijkvakken een logo, huisstijl, mockups enzovoort. **Het globale einddoel van dit vakoverschrijdend project is een overtuigende crowdfunding website** voor jouw product, met als doel bezoekers te overtuigen om je product te steunen ("backen"). De visuele stijl en het gekozen subthema lopen door in alle vakken.

Je minigame of webapp speelt in op de crowdfunding campagne en wordt liefst verwerkt in deze website. Het doel van de applicatie? De gebruiker bewust maken van de gekozen problematiek of vernieuwing rond jouw product op een boeiende, interessante manier! Mogelijk heeft je webapp een duidelijke "Call to Action" (CTA) om de gebruiker aan te sporen het product te backen op de crowdfundingpagina.

We focussen in de eerste fase op het conceptuele en een schets of wireframe. Vervolgens werk je op basis daarvan een **Minimum Viable Product (MVP)** uit. Dit betekent dat je de kernfunctionaliteit werkend krijgt voordat je verdere details toevoegt. 

Als tweede onderdeel voor het vak Weboriëntatie word je ook beoordeeld op de UX en interactieve toevoegingen van de website die je maakt bij het vak Webontwikkeling.

### Subthema's

Je kiest zelf een subthema uit onderstaande lijst, of stelt een ander verwant thema voor:

- **Kleding:** Ontwerp een product als reactie op de fast fashion industrie.
- **Voeding:** Focus op efficiënt landgebruik en alternatieve bronnen.
- **Verpakkingen:** Bedenk een oplossing voor de plasticberg door gebruik te maken van alternatieve materialen.
- **Wonen:** Creëer een product dat helpt bij het besparen van water of energie.
- **Elektronica:** Ontwikkel een toestel dat e-waste beperkt of het energieverbruik minimaliseert.
- **Mobiliteit:** Ontwerp een product dat de afhankelijkheid van fossiele brandstoffen vermindert.
- **Eigen keuze:** *(eerst navragen)*

## Technisch, UX

De applicatie wordt gebouwd met **HTML, CSS en JavaScript**. Je gebruikt een eigen visueel ontwerp dat naadloos aansluit bij het gekozen product.

- **States en acties:** De applicatie is opgebouwd rond duidelijke 'states' (bijvoorbeeld: een startscherm, een actieve fase, en een resultaat- of eindscherm) en 'acties' (gebruikersinput die de state verandert).
- **UX (User Experience):** De gebruikerservaring is cruciaal. Acties moeten voorzien zijn van duidelijke visuele feedback via CSS-animaties, vloeiende overgangen of JavaScript-effecten.
- **Kwaliteit:** De interacties in je webapp moeten van hetzelfde kwaliteitsniveau zijn als het UX- en interactieve gedeelte van de bijbehorende productwebsite die je maakt voor het vak Webontwikkeling. De webapp en de website vullen elkaar hierin aan.
- **Integratie en responsiviteit:** Houd er rekening mee dat de game/app in een andere website geplaatst zal worden (bijvoorbeeld via een `iframe` of een specifieke container-div). Dit betekent dat het ontwerp responsief moet zijn en visueel niet mag vloeken met de rest van de onepager.
- **Code:** Je code moet netjes en overzichtelijk opgebouwd zijn.

## Werkwijze

Bouw de webapp stap voor stap op. Een succesvol digitaal product schrijf je niet in één keer van begin tot eind uit. Door het proces op te delen in duidelijke fases, behoud je het overzicht en voorkom je dat je halverwege vastloopt in complexe code of ontbrekende logica.

### Low-fidelity wireframe

Voordat je een code-editor aanraakt of een AI-prompt schrijft, start je op papier (of met een simpele designtool) met een **low-fidelity wireframe**. Dit is een ruwe, snelle schets van de structuur van je webapp. Je brengt in kaart:
- Welke **schermen** of **states** zijn er? (bijv. startscherm, speelscherm, eindscherm)
- Welke **acties** kan de gebruiker doen om van het ene scherm naar het andere te gaan?

**Waarom is dit onmisbaar?**
Als je zonder plan begint te coderen (of AI laat genereren), verlies je al snel het overzicht. Een wireframe is je blauwdruk: het dwingt je om eerst na te denken over de logica en de gebruikerservaring, zonder dat je afgeleid wordt door code, kleuren of details. Het bespaart je uren frustratie en herschrijfwerk achteraf.

**Indienen voor je start:**
Maak een foto of exporteer je schets en dien deze in via de bijhorende opdracht in Google Classroom. Je begint pas aan de ontwikkeling nadat je schets is ingediend.

### Ontwikkelen

Wanneer je plan helder is, mag je overgaan tot de code. Voor dit project maak je gebruik van zoeken, bestaande kennis, kunde, en **vibecoding**. Je mag AI-modellen en gespecialiseerde editors gebruiken als co-piloot of om meer beheer te nemen over je project:

- **AI Chatbots:** [ChatGPT](https://chatgpt.com/), [Claude](https://claude.ai/), [Gemini](https://gemini.google.com/), [DeepSeek](https://chat.deepseek.com/)
- **Visual Studio Code:** Met behulp van de Copilot/Chat extensie die rechtstreeks met je code interageert en aanpassingen voorstelt.
- **AI-gedreven Editors:** Losse applicaties, gebouwd op de basis van VS Code, met geïntegreerde LLM-modellen:
  - [Antigravity](https://antigravity.google/) (Gratis tot je limiet bereikt is)
  - [Cursor](https://cursor.com/) (Beperkt gratis)
  - [Windsurf](https://windsurf.com/) (Gratis 25 prompts per maand)
  - [Trae](https://www.trae.ai/) (Gratis 10 snelle requests, 50 trage requests)

### Handige bibliotheken en bronnen

Naast standaard HTML, CSS en JavaScript, mag je voor je webapp ook gebruik maken van externe bibliotheken of API's om je werk interactiever of visueel interessanter te maken. Mogelijke startpunten:

- [p5.js](https://p5js.org/): Creatief coderen in JavaScript.
  - [OpenProcessing](https://openprocessing.org/): Creatieve code-sketches.
- [Three.js](https://threejs.org/): 3D en WebGL in de browser.
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API): Tekenen met JavaScript.
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API): Geluid genereren of visualiseren.
- [Shadertoy](https://www.shadertoy.com/): GLSL shaders in de browser.
- [CodePen](https://codepen.io/): Duizenden voorbeelden om van te leren.

## Structuur van je project

Werk in je OneDrive vakmap voor Weboriëntatie, met deze structuur:

```text
VoornaamA_FutureProof/
├── index.html
├── style.css
├── app.js
└── readme.md
```

* Volg de schoolafspraak: Voornaam + initialen achternaam_Naam opdracht.
* Je levert niet in als zipbestand.
* Je deelt je vakmap via een OneDrive link met leesrechten.

### Toelichting

Voeg aan je projectmap een kort tekstdocument toe (`readme.md`). Hierin beantwoord je in enkele zinnen per punt het volgende:
- **Werking:** Hoe werkt je minigame of webapp precies?
- **Problemen en obstakels:** Welke technische problemen of fouten ben je tegengekomen tijdens het ontwikkelen, en hoe heb je ze (proberen te) verhelpen?
- **Context:** Hoe past dit project in het grotere plaatje van het product dat jullie bedacht hebben?
- **Verantwoording (AI & Bronnen):** Welke specifieke (AI-)tools, prompts of andere online bronnen heb je gebruikt om je code op te bouwen?

## Indienen

1. Plaats de map `VoornaamA_FutureProof` in je OneDrive map Weboriëntatie.
2. Deel de OneDrive link met leesrechten.
3. Dien de link in via Google Classroom.

## Beoordeling

Je project wordt beoordeeld op de volgende criteria:

- Concept en UX-intentie.
- Technische uitwerking (feitelijke werking en logica van de minigame/webapp).
- Visueel ontwerp, UX en interactiviteit van de bijbehorende productwebsite.