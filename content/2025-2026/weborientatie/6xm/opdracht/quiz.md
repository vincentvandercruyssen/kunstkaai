+++
title = "Opdracht: Quiz"
date = 2025-09-24T00:00:00Z
draft = false
+++

Je maakt een persoonlijke **quiz met minimaal 3 meerkeuzevragen**. Je kiest zelf het onderwerp van je quiz. Denk aan iets persoonlijks of iets luchtigs. Een quiz over je favoriete films, muziek of games. Een kennisquiz over een hobby of vakgebied. Enzoverder.

Elke vraag heeft **3 knoppen (mogelijke antwoorden)**, waarvan **één juist**. Na een klik verschijnt feedback (**Juist/Fout**), worden de knoppen van **die vraag** uitgezet, en wordt ergens duidelijk de **score** getoond als **juist / totaal**.

Doel: hetzelfde patroon als bij *Teller* herhalen (**state → event → if/else → UI updaten**), maar nu met **meerdere blokken**.

## Wat je precies bouwt

**3 vaste vraagblokken** in de HTML (`<section class="quiz-vraag">`), elk met:

- een element met de **vraag** (bv. `<p class="vraag">…</p>`)
- **3 knoppen** met het mogelijke antwoord → Op **exact 1** knop hang je het kenmerk `data-correct="true"`, op de twee andere `data-correct="false"`.
- een leeg element waar **feedback** verschijnt a.d.h.v. `textContent` (bv. `<p class="feedback"></p>`)

Eén **score-element** (bv. `<p id="score">Score: 0 / 3</p>`)
Eén **resetknop** (bv. `<button id="reset">Opnieuw</button>`)

Je script koppel je met `defer` onderaan de `body`:

```html
<script src="app.js" defer></script>
```

*`defer` zorgt dat de HTML eerst is ingeladen vóór je JS draait.*

## Kernbegrippen

### State (wijzigende gegevens)

Je houdt bij **hoeveel** vragen juist zijn:

```js
let juistCount = 0;
```

### DOM-selecties

Je hebt meerdere vraagblokken nodig tegelijk:

```js
const vragen = document.querySelectorAll(".quiz-vraag");
const totaal = vragen.length;
const scoreEl = document.getElementById("score");
const resetBtn = document.getElementById("reset");
```

### Events per knop

In elk vraagblok hang je op **alle knoppen** een click-handler:

```js
knoppen.forEach((btn) => { btn.addEventListener("click", handleClick); });
```

### Data-attributes lezen

Uit de aangeklikte knop haal je of die juist is:

```js
const juist = btn.dataset.correct === "true";
```

### If / else

Bepaal feedback en score:

- juist → “Juist!” + **groen** + `juistCount++`
- fout → “Fout!” + **rood**

### UI bijwerken

- feedback tonen: `feedbackEl.textContent = "…"`;
- kleur zetten: `feedbackEl.style.color = "…"`;
- score tonen: `scoreEl.textContent = \`Score: \${juistCount} / \${totaal}\`;\`

### Klikken blokkeren (één poging per vraag)

Na antwoord **alle knoppen** in dat blok uitschakelen:

```js
for (const knop of knoppen) { knop.disabled = true; }
```

## Bouwplan

### Voorbereiden

- Zet minimaal **3** `<section class="quiz-vraag">` in je HTML zoals hierboven.
- Vul **zelf je vragen en antwoorden** in.
- Zet bij precies **één** knop `data-correct="true"`.

### JavaScript

Gebruik de nodige variabelen en constanten die hierboven beschreven werden. 

Maak meteen een kleine hulpfunctie om de score te tonen:

```js
function updateScore() {
  scoreEl.textContent = `Score: ${juistCount} / ${totaal}`;
}
updateScore(); // beginstand tonen
```

### Per vraag: knoppen koppelen

Ofwel een forEach binnen een forEach.

Voor **elk** `.quiz-vraag` blok:

1. Selecteer **alle knoppen** en het **feedback-element**.
2. Hang op elke knop **éénzelfde** click-handler.

In die handler doe je, in orde:

1. Lees of het antwoord juist is (`dataset.correct`).
2. Zet **feedbacktekst** (“Juist! ✅” of “Fout! ❌”).
3. Zet **feedbackkleur** (groen of rood) met `style.color`.
4. Als **juist** → verhoog `juistCount` met 1.
5. **Update** de score (roep `updateScore()` aan).
6. Zet **alle knoppen in dit blok** op `disabled = true`.

Tip: hou de handler **klein** en in dezelfde volgorde, dan leest het vlotter.

### Resetknop

Op klik:

- zet `juistCount = 0;`
- roep `updateScore()` op.
- maak in elk vraagblok de **feedback** leeg
- zet **alle knoppen** terug op `disabled = false`

## CSS

Vormgeving Vrij te kiezen. De **feedbackkleur** mag je rechtstreeks in JS zetten met `style.color`. 

Voor knoppen-uitgeschakeld volstaat een specifieke selector `button:disabled { ... }`.

## Indienen

- Map: `Weboriëntatie/VoornaamA_Quiz` (met `index.html`, `style.css`, `app.js`).
- Deel via volledige map **Weboriëntatie** met **OneDrive-link** in **Classroom**.

## Puntenverdeling

- **Structuur & koppeling** Correcte mapstructuur en bestandsnamen, `script` juist gekoppeld.
- **Inhoud (HTML)** Minimaal drie duidelijke vraagblokken met correcte structuur
- **Interactie (JavaScript)** Detectie antwoorden, `if/else`, `dataset`, `querySelectorAll`, Feedback verschijnt correct en in kleur, Knoppen blokkeren na antwoord, Score weergegeven en geüpdatet, Resetknop
- **Vormgeving (CSS)** Overzichtelijke en verzorgde layout, Vormgeving   past bij gekozen thema
- **Inhoud en creativiteit** Eigen thema/onderwerp gekozen, Vragen persoonlijk of origineel, Antwoorden logisch