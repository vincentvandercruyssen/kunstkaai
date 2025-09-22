+++
title = 'Cursus: JavaScript'
date = 2025-09-01T00:00:00Z
draft = false
+++

💥 Oké — geen vragen meer, geen pauzes.
Ik ga nu **alles** van de cursus achter elkaar zetten in **Markdown**, in grote blokken (omdat alles in één bericht niet past).

📍 Start met blok 1

* Inleiding
* Een korte geschiedenis
* Ken je tools en applicaties

Hier komt blok 1 ↓

---

```markdown
# Inleiding

Het komt veel voor dat men JavaScript noemt als één van de drie kerntalen van webpagina’s.

Zo heb je **HTML** (Hyper Text Markup Language) om inhoud en structuur te geven aan een webpagina. Het bevat je paginatitel, hoeveel divisies er in je pagina zijn, hoeveel paragrafen en wat de inhoud is van die paragrafen.

Dan is er **CSS** (Cascading Style Sheet) om de presentatie van je pagina te verzorgen: wat voor lettertype, de achtergrond of de breedte van een divisie, …

Als derde is er **JavaScript**, de programmeertaal voor gedrag en interactiviteit. Wat gebeurt er wanneer je met je cursor over een menu gaat of wanneer je de verkeerde waarde in een veld in een formulier ingevuld hebt, of hoe lang een foto in een slideshow zichtbaar is, …

JavaScript is een programmeertaal die vaak wordt aangezien als scriptingtaal. Soms hoor je van programmeurs dat JavaScript met opzet gelimiteerd is en dat je er daarom geen desktopapplicaties mee kan maken, maar dat is ook de bedoeling! JavaScript werkt enkel in één applicatie: de webbrowser. Althans, dit was vroeger zo; nu kan het ook op de server, op een mobiel toestel, … overal zo een beetje.

En of dit nu Internet Explorer, Safari, Firefox, Chrome, of Opera is, zij bevatten allemaal een JavaScript-motor die de JavaScripts in je pagina doen werken!

Het operating system van je computer draait de webbrowser, die bevat je webpagina, en die bevat je JavaScripts.

Een andere eigenschap van JavaScript is dat het geen toegang heeft tot bestanden op je computer. Er is geen manier om bestanden te laden of te bewaren omdat dit een beveiligingsrisico is. Er is geen manier om een database aan te spreken of om USB-poorten te gebruiken. Dit is vreemd voor een doorwinterde programmeur, omdat de meeste programmeertalen vooral gaan over input/output, maar JavaScript niet! JavaScript is niet ontworpen als een algemene programmeertaal.

Het werd ontworpen om webpagina’s te manipuleren en doet dat ook heel goed.

Zoals je weet: wanneer een gebruiker zijn webbrowser opent en een webpagina opvraagt van een server, dan worden HTML en CSS toegezonden als gewone tekst. De browser doet zijn best om alles er netjes uit te laten zien. Zo is het ook met JavaScript.

JavaScript is een ‘client-side’ taal. Het wordt verstuurd naar de computer van de gebruiker en daar pas uitgevoerd. Dit in tegenstelling tot talen zoals PHP, ASP.NET, Ruby on Rails, … Deze talen voeren hun opdrachten uit op de webserver en sturen de resultaten naar de gebruiker.

Omdat JavaScript zo populair is, wordt het ook gebruikt binnen andere applicaties zoals Adobe Acrobat of Photoshop of Unity3D. Ook server-side wordt deze taal steeds meer gebruikt (Node.js, Google Apps Script), maar daar gaan we niet verder op in.

Een belangrijk aspect van het opsturen en uitvoeren van scripts in de webbrowser van de gebruiker, is dat deze gebruiker ‘JavaScripts uitvoeren’ aan heeft staan. Wanneer dat niet zo is, wordt het script wel opgestuurd, maar niet uitgevoerd. Deze situatie komt echter bijna niet meer voor wat niet wil zeggen dat we ons best moeten doen om onze pagina’s te doen werken met of zonder JavaScript. Natuurlijk zal een website zonder JavaScript veel statischer zijn.

Een ander probleem is het verschil tussen browsers. Zoals je waarschijnlijk al wel weet ziet een website er niet helemaal hetzelfde uit in verschillende browsers met dezelfde meegestuurde CSS. Hetzelfde geldt voor JavaScript en dit is de reden waarom deze taal zo lang een slechte naam heeft gehad. Tot voor kort moest je scripts voorzien van browserdetectie zodat elk script juist uitgevoerd zou worden. Gelukkig is dat nu voorbij! Er zijn nog wel enkele punten waar dit nog steeds zo is, maar voor het fundamentele dat we hier bespreken niet.

[Volgende: Een korte geschiedenis](#een-korte-geschiedenis)

---

# Een korte geschiedenis

JavaScript werd in 1995 ontwikkeld door Brendan Eich bij Netscape, in amper 10 dagen. De bedoeling was om webpagina’s interactiever te maken. Het kreeg aanvankelijk de naam **Mocha**, werd daarna **LiveScript**, en uiteindelijk **JavaScript** (voor marketingredenen, om mee te surfen op de populariteit van Java).

Microsoft bouwde snel een eigen versie genaamd **JScript** in Internet Explorer. Daardoor ontstond jarenlange chaos omdat de twee versies verschillend werkten.

Later werd de taal gestandaardiseerd onder de naam **ECMAScript** door ECMA International. De moderne JavaScript-versies die we vandaag gebruiken (ES6 en verder) zijn gebaseerd op deze standaard.

Belangrijke mijlpalen:

- 1995 — Eerste versie (Mocha → LiveScript → JavaScript)  
- 1997 — ECMAScript 1  
- 2009 — ECMAScript 5 (strikte modus, JSON)  
- 2015 — ECMAScript 6 (let, const, classes, arrow functions, modules, …)  
- Nu — Jaarlijks nieuwe versies met extra functies

[Volgende: Ken je tools en applicaties](#ken-je-tools-en-applicaties)

---

# Ken je tools en applicaties

Om JavaScript te schrijven heb je niet veel nodig:

## Een browser

Je hebt een moderne webbrowser nodig die JavaScript ondersteunt. Bijna alle browsers doen dat: Chrome, Firefox, Safari, Edge, Opera, …

De browser bevat ook de **JavaScript-console** waar je foutmeldingen en uitvoer kunt zien. In Chrome en Firefox open je die met `F12` of `Ctrl+Shift+I`.

## Een teksteditor

Eender welke teksteditor kan JavaScript schrijven, maar handig zijn:

- VS Code  
- Sublime Text  
- Atom  
- Notepad++

Zorg dat je bestanden bewaart met de extensie `.js`.

## Een lokale webserver (optioneel)

Voor sommige oefeningen is een lokale webserver handig, vooral als je werkt met modules (`import/export`). Dit kan eenvoudig met:

- VS Code + Live Server-extensie  
- Python: `python -m http.server`  
- Node.js: `npx serve`

## Online playgrounds

Je kunt ook online oefenen, zonder installatie:

- [JSFiddle](https://jsfiddle.net)  
- [CodePen](https://codepen.io)  
- [JSBin](https://jsbin.com)  
- [StackBlitz](https://stackblitz.com)

[Volgende: JavaScript structuur](#javascript-structuur)
```

Perfect ⚡
Hier komt **blok 2** — **JavaScript structuur** met zijn twee subpagina’s:

---

````markdown
# JavaScript structuur

## Schrijven en Volgorde

Zoals je ziet wordt JavaScript geschreven als gewone tekst, zoals HTML en CSS. JavaScript is een zogezegd geïnterpreteerde taal, geen gecompileerde taal. Veel andere talen moeten gecompileerd worden: een compiler zet je code om naar machinetaal. Bij JavaScript hoeft dat niet. Je schrijft de code en de browser interpreteert en voert ze meteen uit.

⚠️ **JavaScript is hoofdlettergevoelig!**

> JAVASCRIPT IS HOOFDLETTERGEVOELIG !!!

Als je van een programmeertaal komt die dat niet is (zoals Visual Basic, Pascal of HTML), let hier goed op. Als je er niet op let, werkt je script niet. JavaScript raadt niet wat je bedoelt.

JavaScript-code bestaat uit **statements**: afzonderlijke instructies die stap voor stap zeggen wat er moet gebeuren (bijv. een kleur veranderen, een leeftijd berekenen, een afbeelding verschuiven, een menu tonen of verbergen, een waarschuwing tonen).

- Elk statement schrijf je meestal op één lijn.
- Je eindigt statements met een **puntkomma `;`** (zoals een punt aan het einde van een zin).
- Je mag meerdere statements op één lijn schrijven (maar dat maakt het onleesbaar).
- Je mag een lang statement over meerdere regels schrijven (het eindigt pas bij de puntkomma).

JavaScript is niet gevoelig voor extra spaties of regelafbrekingen, **behalve binnen aanhalingstekens** — daar tellen spaties als gewone tekens in een string.

## Plaatsing van het script

Code wordt uitgevoerd **van boven naar beneden, regel per regel**, vanaf het moment dat de browser het script ziet. Je kunt `<script>`-tags op veel plaatsen zetten: in de `<head>`, in de `<body>`, middenin, of onderaan.

De positie bepaalt dus **wanneer** de code wordt uitgevoerd. Soms wil je wachten tot de gebruiker iets doet (muisklik, formulier invullen, toets indrukken). Dan bundel je je code in functies en roep je ze pas op bij bepaalde gebeurtenissen.

### Inline scripts

Bij eenvoudige pagina’s mag je inline scripts gebruiken (JavaScript in dezelfde HTML-bestand):

```html
<script>
  console.log("Hallo wereld");
</script>
````

### Externe scripts

Voor grotere projecten is het beter om JavaScript in een apart `.js`-bestand te zetten. Zo wordt de code herbruikbaar en makkelijker te onderhouden.

```html
<script src="mijnscript.js"></script>
```

De `<script>`-tag krijgt het attribuut `src` met de bestandsnaam. De code staat dus niet meer tussen de tags, alleen de verwijzing.

**Best practice**: Zet je `<script>`-tags **onderaan de `<body>`**, vlak vóór `</body>`, zodat de HTML eerst geladen is vóór de scripts starten. CSS zet je juist **bovenaan**, zodat de pagina direct goed vormgegeven is.

### `type`-attribuut

Sommige voorbeelden tonen dit:

```html
<script src="mijnscript.js" type="text/javascript"></script>
```

`type="text/javascript"` is niet meer verplicht in HTML5, maar mag wel blijven staan (sommige editors voegen het automatisch toe).

[Volgende: Fundamenten](#fundamenten)

```

💥 Nice — hier komt **blok 3: Fundamenten** met **alle subpagina’s** netjes opgeschoond in Markdown.

---

````markdown
# Fundamenten

## Commentaar

Commentaar wordt niet uitgevoerd. Het is handig om je code leesbaar te houden of tijdelijk uit te schakelen.

**Eenregelige commentaar:**
```js
// Dit is commentaar
console.log("Hallo");
````

**Meerdere regels commentaar:**

```js
/*
  Dit is
  meerdere regels
  commentaar
*/
```

---

## Variabelen (let)

Een variabele is een naam voor een stukje data. Je maakt er één met `let`:

```js
let naam = "Sam";
let leeftijd = 17;
```

* `let` gebruik je als je de waarde later nog wil wijzigen
* `const` gebruik je als de waarde nooit verandert

```js
const pi = 3.14;
```

---

## Gegevenstypes

Belangrijkste types in JavaScript:

* **String** — tekst `"Hallo"`
* **Number** — getallen `42` of `3.14`
* **Boolean** — waar/onwaar `true` of `false`
* **Null** — geen waarde
* **Undefined** — nog geen waarde toegewezen
* **Object** — verzamelstructuur
* **Array** — lijst van waarden

Je kunt met `typeof` het type checken:

```js
let x = 42;
console.log(typeof x); // "number"
```

---

## Boodschappen naar de console sturen

Met `console.log()` toon je iets in de console (F12):

```js
console.log("Hallo wereld");
```

Zo kun je makkelijk testen of je code werkt.

---

## Wiskundige bewerkingen

### Rekenkundige operatoren

| Symbool | Betekenis        |
| ------- | ---------------- |
| `+`     | optellen         |
| `-`     | aftrekken        |
| `*`     | vermenigvuldigen |
| `/`     | delen            |
| `**`    | machtsverheffen  |
| `++`    | verhogen met 1   |
| `--`    | verlagen met 1   |

### Modulus of restwaarde (%)

Geeft de rest van een deling:

```js
console.log(10 % 3); // 1
```

### Concatenatie

Strings samenvoegen met `+`:

```js
let voornaam = "Sam";
let naam = voornaam + " Vandercruyssen";
```

Sinds ES6 gebruik je vaak template strings:

```js
let naam = `Hallo ${voornaam}`;
```

### NaN (Not a Number)

Als een berekening geen geldig getal oplevert:

```js
console.log(0 / 0); // NaN
```

### Het Math object

`Math` bevat veel wiskundige functies:

```js
console.log(Math.round(4.6)); // 5
console.log(Math.random());   // willekeurig getal tussen 0 en 1
```

### Logische operatoren (&& en ||)

* `&&` = EN
* `||` = OF
* `!` = NIET

```js
let x = 5;
console.log(x > 0 && x < 10); // true
```

---

## Vraagstellingen en condities (if)

Met `if` voer je code alleen uit als iets waar is:

```js
if (leeftijd >= 18) {
  console.log("Volwassen");
} else {
  console.log("Minderjarig");
}
```

---

## Werken met lussen (while, for)

**While-lus**: herhaalt zolang de voorwaarde waar is

```js
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}
```

**For-lus**: herhaalt vast aantal keer

```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

---

## Functies (function)

Functies groeperen code en maken ze herbruikbaar:

```js
function begroet(naam) {
  console.log("Hallo " + naam);
}

begroet("Sam");
```

Of als **arrow function**:

```js
const begroet = (naam) => {
  console.log(`Hallo ${naam}`);
};
```

---

## De 'scope' van een variabele

**Scope** = waar een variabele geldig is:

* `let` en `const` hebben **blokscope** → alleen binnen `{ }`
* `var` (oud) heeft **function scope**

```js
{
  let x = 10;
  console.log(x); // 10
}
console.log(x); // fout: x bestaat hier niet
```

---

[Volgende: Arrays](#arrays)

```

Perfect ⚡
Hier komt **blok 4: Arrays** — kort maar belangrijk.

---

````markdown
# Arrays

We hebben tot nu toe variabelen gebruikt met één waarde.  
Een **array** is een variabele die meerdere waarden kan bevatten.

## Een lege array aanmaken

```js
let waarden = [];
// of
let waarden = new Array();
````

## Waarden toevoegen op posities (indexen)

Indexen beginnen bij **0**:

```js
waarden[0] = 100;
waarden[1] = 60;
waarden[2] = "Mouse";
```

## Waarden opvragen

```js
console.log(waarden[1]); // 60
```

## Lengte van een array

```js
console.log(waarden.length); // 3
```

## Arrays bewerken met methodes

Arrays zijn objecten en hebben ingebouwde functies (methodes):

```js
let omgekeerd = waarden.reverse();
console.log(omgekeerd.join(", "));
```

Er bestaan veel nuttige methodes zoals `.push()`, `.pop()`, `.slice()`, `.splice()`, `.map()`, `.filter()`, …

---

[Volgende: Objecten](#objecten)

```

Perfect 💪
Hier komt **blok 5: Objecten** met alle subpagina’s erin verwerkt.

---

````markdown
# Objecten

## Het Object model

Een **object** is een verzameling van eigenschappen (properties) en functies (methodes).  
Eigenschappen zijn stukjes data, methodes zijn functies die op het object werken.

```js
let persoon = {
  naam: "Sam",
  leeftijd: 17,
  spreek: function () {
    console.log("Hallo!");
  }
};

console.log(persoon.naam); // Sam
persoon.spreek(); // Hallo!
````

Je spreekt eigenschappen aan met **puntnotatie** of **blokhaken**:

```js
console.log(persoon["leeftijd"]);
```

Je kunt nieuwe eigenschappen toevoegen of wijzigen:

```js
persoon.hobby = "muziek";
persoon.leeftijd = 18;
```

---

## Werken met Strings

**Strings** zijn tekst. Je kunt ze samenvoegen, splitsen en doorzoeken.

```js
let tekst = "Hallo wereld";
console.log(tekst.length);      // 12
console.log(tekst.toUpperCase()); // "HALLO WERELD"
console.log(tekst.includes("wereld")); // true
```

**Handige stringmethodes**:

| Methode               | Uitleg                             |
| --------------------- | ---------------------------------- |
| `.length`             | aantal tekens                      |
| `.toUpperCase()`      | alles in hoofdletters              |
| `.toLowerCase()`      | alles in kleine letters            |
| `.trim()`             | spaties aan begin/einde weghalen   |
| `.slice(begin, eind)` | stuk tekst eruit knippen           |
| `.split(" ")`         | opsplitsen in een array op spaties |
| `.includes("...")`    | checkt of tekst voorkomt           |

---

## Werken met Datums

**Date** is een ingebouwd object om met datums en tijden te werken.

```js
let nu = new Date();
console.log(nu); // huidige datum en tijd

console.log(nu.getFullYear()); // jaar
console.log(nu.getMonth());    // maand (0-11)
console.log(nu.getDate());     // dag (1-31)
```

Je kunt ook zelf datums maken:

```js
let verjaardag = new Date(2000, 4, 15); // 15 mei 2000
```

**Handige datummethodes**:

| Methode          | Uitleg               |
| ---------------- | -------------------- |
| `.getFullYear()` | jaar                 |
| `.getMonth()`    | maand (0 = januari)  |
| `.getDate()`     | dag                  |
| `.getDay()`      | weekdag (0 = zondag) |
| `.getHours()`    | uur (0–23)           |
| `.getMinutes()`  | minuten              |

---

## Werken met Objecten

### Object literal

```js
let auto = {
  merk: "Volvo",
  kleur: "rood"
};
```

### Object constructor

```js
function Auto(merk, kleur) {
  this.merk = merk;
  this.kleur = kleur;
}

let mijnAuto = new Auto("Tesla", "blauw");
console.log(mijnAuto.merk);
```

### Itereren over eigenschappen

```js
for (let sleutel in mijnAuto) {
  console.log(sleutel + ": " + mijnAuto[sleutel]);
}
```

### Object.keys() en Object.values()

```js
console.log(Object.keys(mijnAuto));   // ["merk", "kleur"]
console.log(Object.values(mijnAuto)); // ["Tesla", "blauw"]
```

---

[Volgende: Document Object Model](#document-object-model)

```

Perfect ⚡
Hier komt **blok 6: Document Object Model (DOM)** met alle subonderdelen.

---

````markdown
# Document Object Model

Het **Document Object Model (DOM)** is de structuur waarin je webpagina wordt voorgesteld.  
JavaScript kan via de DOM elk element op de pagina aanspreken, veranderen, toevoegen of verwijderen.

---

## Wat is de DOM?

De DOM beschrijft een webpagina als een **boomstructuur van objecten (nodes)**.

### Document

De webpagina waar je op dat moment naar kijkt.  
Het is hetzelfde document, of je nu naar de HTML-bron kijkt of naar de visuele weergave.  
Voor JavaScript is de HTML-bron belangrijk.

### Object

Een **object** is een element in de HTML (zoals `<h1>`, `<p>`, `<ul>`, `<li>`).  
Objecten kunnen andere objecten bevatten.

### Model

De HTML wordt weergegeven als een **boomstructuur** van nodes:  
bijv. document → body → div → p → ul → li

- Elke node kan child-nodes (onderliggende elementen) en parent-nodes (bovenliggende elementen) hebben.
- De DOM is dus een hiërarchische structuur.

---

## Werken met nodes en elementen

Elke HTML-tag is een node in de DOM.  
De belangrijkste types:

- **element nodes** — HTML-tags zoals `<p>`, `<div>`, `<ul>`  
- **text nodes** — de tekst binnen een element  
- **attribute nodes** — de kenmerken van een element

Je kunt navigeren in de DOM met:

```js
element.parentNode     // ouder
element.childNodes     // kinderen
element.firstChild
element.lastChild
element.nextSibling
element.previousSibling
````

---

## Aanspreken van DOM-elementen

Gebruik deze functies om elementen te selecteren:

```js
document.getElementById("titel");
document.getElementsByTagName("p");
document.getElementsByClassName("belangrijk");
document.querySelector("#titel");
document.querySelectorAll("p.belangrijk");
```

Met `querySelector` kun je CSS-selectors gebruiken — meestal de handigste optie.

---

## DOM-elementen aanpassen

### Tekst of HTML aanpassen

```js
let titel = document.getElementById("titel");
titel.textContent = "Nieuwe titel";
titel.innerHTML = "<em>Nieuwe</em> titel";
```

### CSS aanpassen

```js
titel.style.color = "red";
titel.style.fontSize = "2em";
```

### Kenmerken (attributen) aanpassen

```js
let link = document.querySelector("a");
link.setAttribute("href", "https://example.com");
link.getAttribute("href");
```

---

## DOM-elementen creëren

Nieuwe elementen toevoegen aan de DOM:

```js
let nieuw = document.createElement("p");
nieuw.textContent = "Hallo wereld";

document.body.appendChild(nieuw);
```

Je kunt ook verwijderen:

```js
document.body.removeChild(nieuw);
```

Of elders invoegen:

```js
let lijst = document.querySelector("ul");
let item = document.createElement("li");
item.textContent = "Nieuw item";

lijst.insertBefore(item, lijst.firstChild);
```

---

[Volgende: Events](#events)

```

Top 🔥
Hier komt **blok 7: Events** met alle subonderdelen erin.

---

````markdown
# Events

Met **events** kan je code uitvoeren wanneer de gebruiker iets doet (klikt, typt, beweegt …).  
Je kunt events koppelen aan HTML-elementen.

---

## Werken met onclick events

`onclick` wordt uitgevoerd als een element wordt aangeklikt:

```html
<button onclick="zegHallo()">Klik mij</button>

<script>
function zegHallo() {
  console.log("Hallo!");
}
</script>
````

**Betere manier** (scheidt HTML en JS):

```html
<button id="knop">Klik mij</button>

<script>
document.getElementById("knop").onclick = () => {
  console.log("Hallo!");
};
</script>
```

Of met `addEventListener` (meest gebruikt):

```js
document.getElementById("knop")
  .addEventListener("click", () => {
    console.log("Hallo!");
  });
```

---

## Werken met onload events

`onload` gebeurt als de pagina volledig geladen is:

```html
<body onload="init()">

<script>
function init() {
  console.log("Pagina geladen");
}
</script>
```

Beter met JS:

```js
window.addEventListener("load", () => {
  console.log("Pagina geladen");
});
```

---

## De onblur en onfocus events

* `onfocus` → als een invoerveld actief wordt
* `onblur` → als het veld focus verliest

```html
<input type="text" id="naam">

<script>
const naam = document.getElementById("naam");

naam.addEventListener("focus", () => {
  console.log("Focus!");
});

naam.addEventListener("blur", () => {
  console.log("Focus verloren");
});
</script>
```

---

## Timers

Met `setTimeout` en `setInterval` kan je code na een bepaalde tijd uitvoeren.

**setTimeout** — éénmalig na x milliseconden:

```js
setTimeout(() => {
  console.log("Hallo na 2 seconden");
}, 2000);
```

**setInterval** — herhaaldelijk elke x milliseconden:

```js
setInterval(() => {
  console.log("Om de 3 seconden");
}, 3000);
```

Je kan een interval stoppen met `clearInterval(id)`.

---

[Volgende: Formulieren](#formulieren)

```

Perfect ⚡
Hier komt **blok 8: Formulieren** met de twee subonderdelen.

---

````markdown
# Formulieren

Formulieren gebruiken events om te reageren op gebruikersinvoer.  
Met JavaScript kun je formulierverzending tegenhouden, controleren en dynamisch reageren.

---

## Stop submit

Standaard verzendt een formulier zichzelf en herlaadt de pagina.  
Met `preventDefault()` kun je dat verhinderen:

```html
<form id="mijnForm">
  <input type="text" id="naam" required>
  <button type="submit">Verzend</button>
</form>

<script>
document.getElementById("mijnForm")
  .addEventListener("submit", (e) => {
    e.preventDefault(); // voorkomt herladen
    console.log("Formulier onderschept");
  });
</script>
````

---

## Reageren op formulier selecties

Je kunt reageren op veranderingen in invoervelden, selecties of checkboxes met `change` of `input` events:

```html
<select id="kleur">
  <option>Rood</option>
  <option>Blauw</option>
  <option>Groen</option>
</select>

<script>
document.getElementById("kleur")
  .addEventListener("change", (e) => {
    console.log("Gekozen kleur:", e.target.value);
  });
</script>
```

Ook tekstvelden kunnen reageren:

```html
<input type="text" id="naam">

<script>
document.getElementById("naam")
  .addEventListener("input", (e) => {
    console.log("Invoer:", e.target.value);
  });
</script>
```

---

[Volgende: CSS en JavaScript](#css-en-javascript)

```

Perfect 💪
Hier komt **blok 9: CSS en JavaScript** met het onderdeel over animatie.

---

````markdown
# CSS en JavaScript

Met JavaScript kun je CSS aanpassen, toevoegen of verwijderen.  
Zo kan je dynamisch stijlen wijzigen of animaties starten/stoppen.

---

## Animatie via JavaScript en CSS

Je kunt CSS-classes toevoegen of verwijderen met `classList` om animaties te starten:

```html
<style>
.verberg {
  opacity: 0;
  transition: opacity 1s;
}
.tonen {
  opacity: 1;
  transition: opacity 1s;
}
</style>

<div id="blok" class="verberg">Hallo!</div>
<button id="toon">Toon</button>
<button id="verberg">Verberg</button>

<script>
const blok = document.getElementById("blok");
document.getElementById("toon").addEventListener("click", () => {
  blok.classList.remove("verberg");
  blok.classList.add("tonen");
});
document.getElementById("verberg").addEventListener("click", () => {
  blok.classList.remove("tonen");
  blok.classList.add("verberg");
});
</script>
````

Je kunt ook inline stijlen rechtstreeks aanpassen:

```js
blok.style.transform = "translateX(100px)";
blok.style.transition = "transform 0.5s";
```

Maar meestal is werken met CSS-classes netter en overzichtelijker.

---

[Volgende: JavaScript Beter](#javascript-beter)

```

Perfect ⚡
Hier komt **blok 10: JavaScript Beter** met de twee subonderdelen.

---

````markdown
# JavaScript Beter

Hier leer je hoe je code netter en efficiënter schrijft en hoe je bestanden kleiner maakt voor publicatie.

---

## JavaScript stijl

**Schrijf leesbare code**:

- Gebruik duidelijke namen (`let aantalLeerlingen` i.p.v. `let a`)
- Gebruik inspringing en lege regels
- Zet accolades `{ }` correct
- Gebruik `const` waar het kan, `let` waar nodig
- Zet `;` achter je statements (optioneel, maar consequent doen)

**Voorbeeld (goed):**
```js
function telOp(a, b) {
  return a + b;
}
````

**Voorbeeld (slecht):**

```js
function x(a,b){return a+b}
```

Gebruik ook **linters** of **formatters** zoals [Prettier](https://prettier.io/) of [ESLint](https://eslint.org/) om je code automatisch op te schonen.

---

## Minify

**Minifyen** = overbodige spaties, enters en comments verwijderen om je bestand kleiner te maken.

Voorbeeld:

**Voor:**

```js
function telOp(a, b) {
  return a + b; // telt 2 getallen op
}
```

**Na:**

```js
function telOp(a,b){return a+b;}
```

Minifyen doe je met tools zoals:

* [UglifyJS](https://skalman.github.io/UglifyJS-online/)
* [Terser](https://terser.org/)
* [JavaScript Minifier](https://javascript-minifier.com/)

⚠️ Let op: gebruik bij voorkeur de **niet-minified versie tijdens het ontwikkelen**
en enkel de **minified versie bij publicatie**.

---

[Volgende: Libraries](#libraries)

```

Perfect 💥
Hier komt **blok 11: Libraries** — de laatste sectie.

---

````markdown
# Libraries

**Libraries** zijn herbruikbare bundels met JavaScript-code die vaak voorkomende taken makkelijker maken.  
In plaats van alles zelf te schrijven, gebruik je een library en roep je functies ervan aan.

---

## Voorbeelden van libraries

- **jQuery** — eenvoudige DOM-manipulatie en events  
- **Lodash** — hulpfuncties voor arrays, objecten, strings, …  
- **Moment.js / Day.js** — werken met datums en tijden  
- **Axios** — HTTP-verzoeken (AJAX) doen  
- **Chart.js** — grafieken en diagrammen  
- **Three.js** — 3D in de browser  
- **GSAP** — animaties

---

## Gebruik van een library

### Extern laden via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
axios.get("https://api.example.com/data")
  .then(response => console.log(response.data));
</script>
````

### Installeren via npm (Node.js-project)

```bash
npm install axios
```

en dan:

```js
import axios from "axios";

axios.get("https://api.example.com/data")
  .then(res => console.log(res.data));
```

---

## Wanneer libraries gebruiken?

✅ Handig als:

* Je iets wil doen dat veel code vraagt om zelf te schrijven
* Je snel resultaat wil
* De library goed onderhouden en betrouwbaar is

⚠️ Vermijd libraries als:

* Je het ook eenvoudig zelf kan schrijven
* De library groot is en je site trager maakt
* Je maar één klein onderdeel ervan nodig hebt
