+++
title = 'Cursus: JavaScript'
date = 2025-09-01T00:00:00Z
draft = false
+++

## Inleiding

JavaScript is één van de drie **kerntalen** van het web, samen met **HTML** en **CSS**.

- **HTML** (*HyperText Markup Language*) bepaalt de **inhoud en structuur** van een webpagina (titels, paragrafen, afbeeldingen, knoppen, indeling,...).
- **CSS** (*Cascading Style Sheets*) verzorgt de **vormgeving** (lettertypes, kleuren, marges, lay-out,...).
- **JavaScript** voegt **gedrag en interactiviteit** toe, zoals menu’s, formuliercontrole, slideshows,...

Met JavaScript kan een website **dynamisch reageren** op acties van de gebruiker: zoals klikken, typen of scrollen. Denk aan **interactiviteit** en **gebruikerservaring**:

- **Navigatie**: dropdownmenu’s, schuivende zijbalken, dynamische tabs,...
- **Formulieren**: onmiddellijke foutmeldingen of validatie zonder herladen,...
- **Inhoud**: automatisch laden van nieuwe berichten of producten,...
- **Animatie**: overgangen, bewegende elementen, sliders,...
- **Toepassingen**: interactieve kaarten, games, webapps, chatvensters,...

### Client-side scripttaal

Oorspronkelijk is JavaScript ontwikkeld als een **client-side scripttaal**: de code wordt samen met HTML en CSS naar de **browser** gestuurd en **daar** uitgevoerd. Elke moderne browser (zoals Chrome, Firefox, Safari en Edge) bevat een eigen **JavaScript-motor** die de scripts uitvoert.

Om veiligheidsredenen krijgt JavaScript in de browser **geen directe toegang** tot bestanden of hardware van de gebruiker. Zo kunnen websites je systeem niet manipuleren of lokale bestanden uitlezen.

Tegenwoordig wordt JavaScript ook **buiten de browser** gebruikt, bijvoorbeeld op **servers** met **Node.js**. In dat geval spreken we van **server-side JavaScript**. Beide toepassingen gebruiken dezelfde taal, maar in een **andere omgeving**: de browser aan de kant van de gebruiker (*client*), of de server die de pagina’s levert (*server*).

Hoewel bijna alle gebruikers JavaScript aan hebben staan, zijn er situaties waarin scripts niet worden uitgevoerd. Daarom is het goed om websites zo te bouwen dat ze ook zonder JavaScript bruikbaar blijven. 

### Een korte geschiedenis

**JavaScript** werd in **1995** ontwikkeld door **Brendan Eich** bij **Netscape**. De taal heette eerst **Mocha**, daarna **LiveScript**, en werd uiteindelijk om marketingredenen hernoemd naar **JavaScript**. Hoewel JS niets te maken heeft met Java, kon het meeliften op de hype rond Java.

**Microsoft** ontwikkelde een eigen variant, **JScript**, voor **Internet Explorer**, wat jarenlang zorgde voor verschillen tussen browsers.

Om die verschillen weg te werken, werd de taal gestandaardiseerd als **ECMAScript** door **ECMA International**. Het is deze standaard die moderne browsers volgen, al blijft de naam **JavaScript** ingeburgerd.

- **1995** Eerste versie (*Mocha → LiveScript → JavaScript*)
- **1997** **ECMAScript 1** (eerste standaard)
- **2009** **ECMAScript 5** (*strict mode*, JSON...)
- **2015** **ECMAScript 6** (*let*, *const*, classes, modules...)
- **Vanaf 2016** Jaarlijkse updates (*ES2016, ES2017...*)

Dankzij de gemeenschappelijke **ECMAScript-standaard** werken scripts tegenwoordig in alle moderne browsers veel betrouwbaarder en consistenter dan vroeger. Kleine verschillen bestaan nog, maar bij de basisfunctionaliteit merk je daar niets van.

Vandaag draait **JavaScript** in **alle moderne browsers** op **elk systeem**. Je hebt enkel een **teksteditor** nodig, zoals [**Visual Studio Code**](https://code.visualstudio.com/).

### Gereedschap en applicaties

Voor JavaScript heb je niet veel nodig, maar de juiste gereedschappen maken je werk veel eenvoudiger en overzichtelijker.

#### Een browser

Gebruik een moderne browser die JavaScript volledig ondersteunt: **Firefox**, **Safari**, of een Chromium-gebaseerde browser zoals **Chrome**, **Edge** of **Opera**. Elke browser bevat een **JavaScript-console** waarin je foutmeldingen en uitvoer kunt bekijken. Je vindt die bij de **Inspector** of **Developer Tools**.

#### Een teksteditor

Je kunt JavaScript schrijven in **elke teksteditor**, maar een goede editor biedt **syntaxkleuring** en handige **hulpmiddelen**. De populairste keuze is **Visual Studio Code (VS Code)**. Er bestaan ook andere editors, maar **VS Code** is momenteel de standaard voor de meeste ontwikkelaars.

Bewaar je JavaScript-bestanden altijd met de bestandsextensie `.js`.

{{< svg src="img/web/vsc-logo.svg" width="100" href="https://code.visualstudio.com/" text="Visual Studio Code" >}}

#### Een lokale webserver (soms nodig)

Sommige functies van JavaScript werken alleen correct wanneer je bestanden laadt via een **webserver** in plaats van rechtstreeks via `file://...`. Dat is vooral nodig wanneer je **modules** gebruikt (`import` / `export`).

#### Online playgrounds

Wil je snel iets uitproberen zonder installatie? Gebruik een online omgeving. Je ziet meteen het resultaat van je code en kunt je werk eenvoudig delen.

- [JSFiddle](https://jsfiddle.net) eenvoudig en snel
- [CodePen](https://codepen.io) populair bij front-end ontwikkelaars
- [JSBin](https://jsbin.com) live code met console

## JavaScript-structuur

### Plaatsing van het script

De browser voert JavaScript uit **van boven naar beneden** zodra een `<script>`-tag wordt gelezen. De plaats bepaalt **wanneer** de code wordt uitgevoerd.

Plaats `<script>`-tags **vlak vóór** `</body>`. Zo laadt de volledige HTML eerst voordat het script start, wat de prestaties en gebruikerservaring verbetert.

Gebruik `async` of `defer` als het script in de `<head>` staat:

- `async` laadt en voert uit zodra het beschikbaar is (**onafhankelijk**, bv. voor analytics of advertenties)
- `defer` laadt op de achtergrond en voert pas uit **na** de HTML (**nodig bij DOM-manipulatie**)

Staat je `<script>` vlak vóór `</body>`? Dan is `defer` niet nodig.

#### Inline scripts

Je kunt JavaScript rechtstreeks in het HTML-bestand schrijven, inline scripts maken de code minder overzichtelijk en moeilijker te hergebruiken. 

```html
<script>
  console.log("Hallo wereld.");
</script>
```

#### Externe scripts

Gebruik externe `.js-`bestand(en) zodat structuur en logica gescheiden blijven. Dat houdt de code overzichtelijk, herbruikbaar en makkelijk te onderhouden.

```html
<script src="mijnscript.js"></script>
```

#### Type-kenmerk

Sommige voorbeelden tonen nog een extern bestand met `type`-kenmerk. Dit is niet meer verplicht, browsers gaan standaard uit van JavaScript.

```html
<script src="mijnscript.js" type="text/javascript"></script>
```

### Schrijven en volgorde

JavaScript wordt **direct geïnterpreteerd** door de browser, er is geen aparte compileerstap nodig. Moderne JavaScript-engines gebruiken vaak **JIT-compilatie** (*Just-In-Time*) om de code vlak voor uitvoering te optimaliseren.

⚠️ **JavaScript is hoofdlettergevoelig.** Variabelen, functienamen enzovoort moeten exact overeenkomen in hoofd- en kleine letters. JavaScript gokt nooit wat je bedoelt.

JavaScript-code bestaat uit **statements**: instructies die stap voor stap aangeven wat er moet gebeuren (bijvoorbeeld een kleur aanpassen, een berekening uitvoeren of een element tonen of verbergen).

- Meestal schrijf je elk statement op één regel en meestal sluit je statements af met een puntkomma `;`. 

Gebruik een puntkomma bij **expressies** zoals toekenningen of functieaanroepen.

```js
let naam = "Vincent";
console.log(naam);
mijnFunctie();
```

Gebruik echter **geen** puntkomma bij blokstructuren (zoals `if`, `for`, `while`, `function` of `class`).

```js
function groet() {
  console.log("Hallo");
}

if (naam === "Vincent") {
  console.log("Welkom terug!");
}
```

- Bij **function expressions** (functies die je toekent aan een variabele) hoort er **wel** een puntkomma, omdat dit een expressie is:

```js
const groet = function() {
  console.log("Hallo");
};
```

JavaScript negeert extra spaties en nieuwe regels, behalve binnen aanhalingstekens. Daar tellen spaties als gewone tekens in een string.

## Fundamenten

### Variabelen

Een **variabele** is een **naam** die verwijst naar een **waarde** die je in je code wil gebruiken of onthouden. Je kunt het vergelijken met een **doos met een label**: de **doos** bevat de waarde, het **label** is de naam. Een variabele is dus een **naam voor gegevens**.

Je maakt een variabele meestal met `let` of `const`:

* `let` voor **waarden die kunnen veranderen**
* `const` voor **vaste waarden** die **niet opnieuw worden toegewezen**

```js
let gebruiker = "Sam";
let leeftijd = 17;
const pi = 3.14;
```

In JavaScript bepaalt de **waarde** automatisch het **gegevenstype**.
De taal is **dynamisch getypeerd**, dus een variabele kan later een ander type bevatten:

```js
let x = 42;       // type: number
x = "Hallo";      // nu type: string
```

### Gegevenstypes

Elke waarde in JavaScript heeft een **gegevenstype**. Dat type bepaalt **wat** de waarde voorstelt (tekst, getal, waar/onwaar, …) en **welke bewerkingen** je ermee kunt uitvoeren.

* **String** tekst: `"Hallo"`, `"123"`
* **Number** getal: `42`, `3.14`
* **Boolean** waar/onwaar: `true`, `false`
* **Null** bewuste afwezigheid van een waarde
* **Undefined** nog geen waarde toegekend
* **Symbol** unieke, onveranderbare waarde
* **BigInt** heel grote getallen
* **Object** niet-primitieve waarde met eigenschappen en methodes

Alles wat **tussen aanhalingstekens** staat, is een **string**.
Ook `"123"` is tekst, geen getal: je kunt er niet mee rekenen zonder het om te zetten.

Type controleren met `typeof`:

```js
let x = 42;
console.log(typeof x); // "number"
```

### Scope

Scope bepaalt **waar** een variabele beschikbaar is.

* **Lokale scope**: variabelen gedefinieerd **binnen een functie** zijn enkel daar bruikbaar.
* **Globale scope**: variabelen gedefinieerd **buiten functies** zijn overal beschikbaar.

```js
let bericht = "Hallo"; // globaal

function melding() {
  let naam = "Sam"; // lokaal
  console.log(bericht, naam); // ✅ werkt
}
melding();
console.log(naam); // ❌ fout: naam bestaat niet buiten de functie
```

### Console

Met `console.log()` toon je iets in de **console**, onderdeel van de **ontwikkelaarstools** in je browser.
Gebruik dit om te testen of je code werkt:

```js
console.log("Hallo wereld");
```

### Commentaar

Commentaar wordt **niet uitgevoerd**. Gebruik het om je code leesbaar te houden of tijdelijk uit te schakelen:

```js
// Dit is commentaar

/*
  Dit zijn
  meerdere regels
  commentaar
*/
```

## Objecten in JavaScript

JavaScript kent twee soorten waarden:

* **Primitieve types**: eenvoudige, onveranderlijke waarden
  (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`)
* **Objecten**: verzamelingen van **eigenschappen** (data) en **methodes** (functies)

Alles wat **geen primitief type** is, is een **object**.
Voorbeelden: gewone objecten (`{}`), arrays (`[]`), functies, de DOM (`document`), enz.

Voorbeeld:

```js
let persoon = {
  naam: "Sam",
  leeftijd: 17,
  spreek() {
    console.log("Hallo!");
  }
};

console.log(persoon.naam); // "Sam"
persoon.spreek();          // "Hallo!"
```

Eigenschappen aanspreken:

```js
console.log(persoon.naam);
console.log(persoon["leeftijd"]);
```

Eigenschappen toevoegen of wijzigen:

```js
persoon.hobby = "muziek";
persoon.leeftijd = 18;
```

Een object is dus een **container** die gegevens en functies bundelt.

## De DOM: een verzameling van objecten

De **Document Object Model (DOM)** is een **structuur** die de **browser** opbouwt op basis van de **HTML** van je webpagina. Elk HTML-element wordt vertaald naar een **JavaScript-object**.

Zo kan JavaScript de webpagina **lezen**, **aanpassen**, **toevoegen** of **verwijderen**.

```html
<body>
  <h1 id="titel">Welkom</h1>
  <p class="intro">Dit is een paragraaf.</p>
</body>
```

Wordt in de DOM voorgesteld als:

```
document
└── html
    └── body
        ├── h1#titel
        └── p.intro
```

De DOM is dus een **boom van objecten**.
Elk element is een **object** met **eigenschappen** (zoals `textContent`, `id`) en **methodes** (zoals `querySelector`, `appendChild`).

De browser maakt deze objecten aan, jij gebruikt JavaScript om ze te bewerken.

### Soorten nodes

Elke HTML-tag, tekst of kenmerk wordt een **node** (knooppunt):

* **Element nodes** HTML-tags (`<p>`, `<div>`, …)
* **Text nodes** tekst binnenin elementen
* **Attribute nodes** kenmerken zoals `id`, `class`, `src`

Navigeren in de boom:

```js
element.parentNode        // ouder
element.children          // enkel elementen
element.firstChild
element.lastChild
element.nextSibling
element.previousSibling
```

Gebruik **`children`** als je enkel elementen wilt (geen tekst).

### Elementen selecteren

Gebruik **selectors** om elementen op te halen.

#### Moderne methodes

```js
document.querySelector("#titel");
document.querySelectorAll("p.intro");
```

`querySelector` haalt één element op (de **eerste match**), `querySelectorAll` haalt **meerdere elementen** op (een NodeList of lijst met **alle matches**). Deze lijst kun je vervolgens gemakkelijk met een `forEach` doorlopen.

Werkt met alle eenvoudige CSS-selectors (zoals `#id`, `.class`, `div`, `p.intro`,...). Alsook met complexere CSS-selectors (zoals `section > p`, `ul li:first-child`, `[type="text"]`,...).

#### Oudere methodes

```js
document.getElementById("titel");
document.getElementsByTagName("p");
document.getElementsByClassName("intro");
```

Minder flexibel, maar één soort selector per functie, je kunt er geen combinaties of complexe CSS-selectors mee gebruiken.

### Elementen aanpassen

#### Tekst of HTML

```js
let titel = document.querySelector("#titel");
titel.textContent = "Nieuwe titel";          // enkel tekst
titel.innerHTML = "<em>Nieuwe</em> titel";   // met HTML-opmaak
```

Gebruik **`textContent`**, veiliger en sneller.

#### CSS

```js
titel.style.color = "red";
titel.style.fontSize = "2em";
```

Of met classes:

```js
titel.classList.add("belangrijk");
titel.classList.remove("oud");
```

#### Kenmerken

```js
let link = document.querySelector("a");
link.setAttribute("href", "https://example.com");
console.log(link.getAttribute("href"));
```

### Elementen maken, invoegen of verwijderen

Nieuw element:

```js
let nieuw = document.createElement("p");
nieuw.textContent = "Hallo wereld";
document.body.appendChild(nieuw);
```

Verwijderen:

```js
document.body.removeChild(nieuw);
```

Invoegen vóór een ander element:

```js
let lijst = document.querySelector("ul");
let item = document.createElement("li");
item.textContent = "Nieuw item";
lijst.insertBefore(item, lijst.firstChild);
```

## Events

**Events** zijn acties waarop JavaScript kan **reageren** (zoals klikken, typen, laden of focussen). Koppel ze in **JavaScript**, niet in **HTML**.

### Klik-events

Vermijd inline handlers (`onclick="..."`), overschrijven elkaar en is beperkter. Gebruik `addEventListener()` voor meer flexibiliteit: je kunt meerdere functies koppelen en extra opties instellen (zoals `once` of `capture`).

```html
<button id="knop">Klik mij</button>
<script>
document.querySelector("#knop").addEventListener("click", () => {
  console.log("Hallo!");
});
</script>
```

### Pagina laden: DOMContentLoaded & load

**`DOMContentLoaded`** start zodra de **HTML-structuur** geladen is, ideaal om scripts te activeren die de DOM gebruiken.

**`load`**: wacht tot **alles** geladen is (ook afbeeldingen en stylesheets). Gebruik dit alleen als je alle middelen nodig hebt.

```js
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM klaar");
});

window.addEventListener("load", () => {
  console.log("Pagina volledig geladen");
});
```

```
window (het browservenster)
 └── document (de HTML-pagina in dat venster)
      └── html (het root-element van de pagina)
           ├── head (metadata, titel, links naar CSS, scripts)
           └── body (zichtbare inhoud)
                └── elementen (div, p, img, button, form,...)
```

### Focus-events

* `focus`: wanneer een element focus krijgt.
* `blur`: wanneer het element focus verliest. 
  
Deze events worden enkel op het element zelf uitgevoerd. 

Wil je ook reageren op een **ouder-element** waarin ze zich bevinden, gebruik dan `focusin` en `focusout`, ook wel **“bubbling”** genoemd.

```html
<input id="naam" type="text">
<script>
const naam = document.querySelector("#naam");
naam.addEventListener("focus", () => console.log("Focus!"));
naam.addEventListener("blur",  () => console.log("Focus verloren"));
</script>
```

## Voorwaardelijke uitvoering met `if`

Met `if` laat je code enkel uitvoeren als een **voorwaarde** waar is.

```js
if (leeftijd >= 18) {
  console.log("Volwassen");
} else {
  console.log("Tiener");
}
```

* De voorwaarde tussen haakjes moet **true** of **false** opleveren.
* `else` voert uit wat gebeurt als de voorwaarde **niet waar** is.
* Met `else if` test je meerdere voorwaarden.

```js
if (score > 90) {
  console.log("Uitstekend");
} else if (score >= 50) {
  console.log("Geslaagd");
} else {
  console.log("Niet geslaagd");
}
```

Gebruik `if` om te **beslissen** welke code mag lopen, afhankelijk van een toestand.

## Herhalen met lussen

Een **lus** voert een blok code **meerdere keren** uit.

### `while`

Herhaalt **zolang** de voorwaarde waar is.

```js
let i = 0;
while (i < 3) {
  console.log(i);
  i++; // voorkom oneindige lus
}
```

Gebruik `while` als je **niet op voorhand weet** hoe vaak je wil herhalen.

### `for`

Herhaalt een **vast aantal keren**.

```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

* `i = 0` → startwaarde
* `i < 3` → voorwaarde
* `i++` → stap per ronde

Gebruik `for` als je **exact weet** hoe vaak de lus moet lopen.

## Herbruikbare code met functies

Een **functie** groepeert code en maakt ze **herbruikbaar**.

### Klassieke functie

```js
function begroet(naam) {
  console.log("Hallo " + naam);
}

begroet("Sam"); // Hallo Sam
```

### Arrow function

```js
const begroet = (naam) => {
  console.log(`Hallo ${naam}`);
};

begroet("Sam");
```

**Verschillen:**

* Arrow functions zijn **korter**
* Ze nemen de **`this`**-waarde over van hun **buitenste omgeving**
* Klassieke functies krijgen **hun eigen `this`**

`this` verwijst naar **de context waarin de functie wordt uitgevoerd**. In een klassiek voorbeeld binnen een object wijst `this` naar dat **object**; bij arrow functions blijft `this` wat het erbuiten was.

```js
const persoon = {
  naam: "Sam",
  zegNaam() {
    console.log(this.naam); // "Sam"
  }
};
persoon.zegNaam();
```

Gebruik arrow functions voor **korte taken of callbacks**, klassieke functies voor methodes in objecten of wanneer je met **`this`** werkt.

## Wiskundige bewerkingen

### Rekenkundige operatoren

| Symbool | Betekenis        |
| ------- | ---------------- |
|         |                  |
| `+`     | Optellen         |
| `-`     | Aftrekken        |
| `*`     | Vermenigvuldigen |
| `/`     | Delen            |
| `**`    | Machtsverheffen  |
| `++`    | Verhogen met 1   |
| `--`    | Verlagen met 1   |

### Toekenningsoperatoren

| Symbool | Betekenis             | Voorbeeld              |
| ------- | --------------------- | ---------------------- |
|         |                       |                        |
| `=`     | Waarde toekennen      | `x = 5`                |
| `+=`    | Optellen en opslaan   | `x += 2` → `x = x + 2` |
| `-=`    | Aftrekken en opslaan  | `x -= 1` → `x = x - 1` |
| `*=`    | Vermenigvuldigen      | `x *= 3` → `x = x * 3` |
| `/=`    | Delen en opslaan      | `x /= 2` → `x = x / 2` |
| `%=`    | Rest delen en opslaan | `x %= 3` → `x = x % 3` |

### Vergelijkingsoperatoren

| Symbool | Betekenis                             | Voorbeeld   | Resultaat |
| ------- | ------------------------------------- | ----------- | --------- |
|         |                                       |             |           |
| `==`    | Gelijk aan (met typecoercie)          | `5 == "5"`  | `true`    |
| `===`   | Strikt gelijk (zelfde waarde én type) | `5 === "5"` | `false`   |
| `!=`    | Ongelijk (met typecoercie)            | `5 != "5"`  | `false`   |
| `!==`   | Strikt ongelijk                       | `5 !== "5"` | `true`    |
| `>`     | Groter dan                            | `8 > 3`     | `true`    |
| `<`     | Kleiner dan                           | `2 < 5`     | `true`    |
| `>=`    | Groter of gelijk aan                  | `5 >= 5`    | `true`    |
| `<=`    | Kleiner of gelijk aan                 | `4 <= 3`    | `false`   |

Gebruik **`===`** en **`!==`** om verwarring door automatische type-omzetting te vermijden.

### Modulus (%)

Geeft de **rest** van een deling:

```js
console.log(10 % 3); // 1
```

### Concatenatie

Strings samenvoegen met `+`:

```js
let voornaam = "Sam";
let naam = voornaam + " Vandercruyssen";
```

Gebruik sinds **ES6** liever **template literals**:

```js
let naam = `Hallo ${voornaam}`;
```

### NaN (*Not a Number*)

Verschijnt als een berekening **geen geldig getal** oplevert:

```js
console.log(0 / 0); // NaN
```

Controleer met `isNaN()` of een waarde geen getal is.

### Het Math-object

Bevat ingebouwde **wiskundige functies**:

```js
console.log(Math.round(4.6)); // 5
console.log(Math.random());   // Willekeurig getal tussen 0 en 1
```

Andere nuttige functies:

```js
Math.floor(4.9); // 4  (naar beneden afronden)
Math.ceil(4.1);  // 5  (naar boven afronden)
Math.max(2, 8);  // 8
Math.min(2, 8);  // 2
```

### Logische operatoren

| Symbool | Betekenis |
| ------- | --------- |
|         |           |
| `&&`    | EN        |
| \|\|    | OF        |
| `!`     | NIET      |

Voorbeeld:

```js
let x = 5;
console.log(x > 0 && x < 10); // true
console.log(!(x > 0));        // false
```

### Operatorvolgorde

Net als in wiskunde voert JavaScript bewerkingen uit volgens een **vaste volgorde**. Je kunt haakjes `()` gebruiken om de volgorde expliciet te bepalen.

**Volgorde (van hoog naar laag):**

1. `()` haakjes
2. `**` machtsverheffen
3. `*`, `/`, `%`
4. `+`, `-`
5. Vergelijkingen: `<`, `>`, `<=`, `>=`
6. Gelijkheid: `==`, `===`, `!=`, `!==`
7. Logisch EN `&&`
8. Logisch OF `||`
9. Toekenningsoperatoren `=`, `+=`, `-=` …

Voorbeeld:

```js
let resultaat = 2 + 3 * 4;   // 2 + 12 = 14
let juist = (2 + 3) * 4;     // 5 * 4 = 20
```

Gebruik **haakjes** om je code leesbaar en voorspelbaar te houden.

## Arrays

We hebben tot nu toe variabelen gebruikt met één waarde.  
Een **array** is een variabele die meerdere waarden kan bevatten.

### Een lege array aanmaken

```js
let waarden = [];
// of
let waarden = new Array();
```

### Waarden toevoegen op posities (indexen)

Indexen beginnen bij **0**:

```js
waarden[0] = 100;
waarden[1] = 60;
waarden[2] = "Mouse";
```

### Waarden opvragen

```js
console.log(waarden[1]); // 60
```

### Lengte van een array

```js
console.log(waarden.length); // 3
```

### Arrays bewerken met methodes

Arrays zijn objecten en hebben ingebouwde functies (methodes):

```js
let omgekeerd = waarden.reverse();
console.log(omgekeerd.join(", "));
```

Er bestaan veel nuttige methodes zoals `.push()`, `.pop()`, `.slice()`, `.splice()`, `.map()`, `.filter()`...

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
|                       |                                    |
| `.length`             | aantal tekens                      |
| `.toUpperCase()`      | alles in hoofdletters              |
| `.toLowerCase()`      | alles in kleine letters            |
| `.trim()`             | spaties aan begin/einde weghalen   |
| `.slice(begin, eind)` | stuk tekst eruit knippen           |
| `.split(" ")`         | opsplitsen in een array op spaties |
| `.includes("...")`    | checkt of tekst voorkomt           |

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
|                  |                      |
| `.getFullYear()` | jaar                 |
| `.getMonth()`    | maand (0 = januari)  |
| `.getDate()`     | dag                  |
| `.getDay()`      | weekdag (0 = zondag) |
| `.getHours()`    | uur (0–23)           |
| `.getMinutes()`  | minuten              |

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


## Timers

Met `setTimeout` en `setInterval` kan je code na een bepaalde tijd uitvoeren.

**setTimeout** éénmalig na x milliseconden:

```js
setTimeout(() => {
  console.log("Hallo na 2 seconden");
}, 2000);
```

**setInterval** herhaaldelijk elke x milliseconden:

```js
setInterval(() => {
  console.log("Om de 3 seconden");
}, 3000);
```

Je kan een interval stoppen met `clearInterval(id)`.

## Formulieren

Formulieren gebruiken events om te reageren op gebruikersinvoer.  
Met JavaScript kun je formulierverzending tegenhouden, controleren en dynamisch reageren.

### Stop submit

Standaard **verzendt** een formulier de gegevens en **herlaadt** de pagina. Met JavaScript kun je dit gedrag **onderscheppen** en **zelf verwerken** zonder herladen.

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
```

### Reageren op formulier selecties

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

## CSS en JavaScript

Met JavaScript kun je CSS aanpassen, toevoegen of verwijderen. Zo kun je **dynamisch stijlen aanpassen**, **animaties starten of stoppen**, en de **gebruikerservaring interactiever** maken.

### Animatie via JavaScript en CSS

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
```

Je kunt ook inline stijlen rechtstreeks aanpassen:

```js
blok.style.transform = "translateX(100px)";
blok.style.transition = "transform 0.5s";
```

Maar meestal is werken met CSS-classes netter en overzichtelijker.

## JavaScript Beter

Hier leer je hoe je code netter en efficiënter schrijft en hoe je bestanden kleiner maakt voor publicatie.

### JavaScript stijl

**Schrijf leesbare code**:

- Gebruik **betekenisvolle namen** (`let aantalLeerlingen` i.p.v. `let a`) zodat je code **leesbaar** en **begrijpelijk** blijft.
- Gebruik inspringing en lege regels
- Zet accolades `{ }` correct
- Gebruik `const` waar het kan, `let` waar nodig
- Zet `;` achter je statements (optioneel, maar consequent doen)

**Voorbeeld (goed):**

```js
function telOp(a, b) {
  return a + b;
}
```

**Voorbeeld (slecht):**

```js
function x(a,b){return a+b}
```

Gebruik ook **linters** of **formatters** zoals [Prettier](https://prettier.io/) of [ESLint](https://eslint.org/) om je code automatisch op te schonen.

### Minify

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

Minifyen (en vervormen en comprimeren) doe je met speciale tools. Gebruik uiteraard de **niet-minified versie tijdens het ontwikkelen** en enkel de **minified versie bij publicatie**.

## Libraries

**Libraries** zijn herbruikbare bundels met JavaScript-code die vaak voorkomende taken makkelijker maken. Een library biedt **voorgeprogrammeerde functies** zodat je **sneller en consistenter** kunt werken zonder elk detail zelf te moeten coderen.

### Algemene utilities

- [**Lodash-es**](https://lodash.com) Handige functies voor arrays, objecten en strings; -S-moduleversie is tree-shakeable.
- [**Zod**](https://zod.dev) Schema-validatie met duidelijke foutmeldingen; ideaal voor -ormulieren en API’s.
- [**Nanoid**](https://github.com/ai/nanoid) Supersnelle generator voor unieke ID’s.

### Netwerk en data

- [**Axios**](https://axios-http.com) HTTP-client met interceptors en foutafhandeling.
- [**Ky**](https://github.com/sindresorhus/ky) Moderne wrapper rond `fetch()` met nette API en minimale footprint.
- [**Papa Parse**](https://www.papaparse.com) CSV-bestanden inlezen of exporteren, werkt ook met grote bestanden.
- [**Dexie.js**](https://dexie.org) Wrapper rond IndexedDB voor lokale opslag in de browser.

### Datum en tijd

- [**date-fns**](https://date-fns.org) Modulaire functies voor datum- en tijdbewerking.
- [**Day.js**](https://day.js.org) Kleine vervanger van Moment.js met compatibele API.
- [**Luxon**](https://moment.github.io/luxon/) Sterk in tijdzones en internationale formaten.

### Animatie en interactie

- [**GSAP**](https://gsap.com) Krachtige, performante animaties en tijdlijnen.
- [**Anime.js**](https://animejs.com) Lichte, declaratieve animaties met eenvoudige syntax.
- [**Tippy.js**](https://atomiks.github.io/tippyjs/) Tooltips, popovers en contextuele hints.
- [**Toastify-js**](https://apvarun.github.io/toastify-js/) Simpele toastmeldingen zonder afhankelijkheden.
- [**Clipboard.js**](https://clipboardjs.com) Tekst naar klembord kopiëren zonder hacks.

### Visualisaties

- [**Chart.js**](https://www.chartjs.org) Snel grafieken maken (lijn, staaf, donut …).
- [**D3.js**](https://d3js.org) Krachtige datagedreven visualisaties met SVG.
- [**Three.js**](https://threejs.org) 3D in de browser met WebGL.
- [**PixiJS**](https://pixijs.com) Snelle 2D-rendering voor games en effecten.
- [**Leaflet**](https://leafletjs.com) Interactieve kaarten met rastertiles.
- [**MapLibre GL JS**](https://maplibre.org) Open-source vector maps, alternatief voor Mapbox.

### Formulieren & uploads

- [**FilePond**](https://pqina.nl/filepond/) Mooie, toegankelijke bestandsupload met previews.
- [**Zod**](https://zod.dev) / [**Yup**](https://github.com/jquense/yup) Voor valideren van formulierinvoer.
- [**Immer**](https://immerjs.github.io/immer/) Immutable updates voor complexe state (bijv. formulieren).

### Frameworks

- [**React**](https://react.dev) Component-based library voor gebruikersinterfaces.
- [**Vue.js**](https://vuejs.org) Progressief framework met eenvoudige leercurve.
- [**Svelte**](https://svelte.dev) Compileert naar supersnelle vanilla JS zonder runtime.
- [**Next.js**](https://nextjs.org) Fullstack framework bovenop React (routing, SSR, API-routes).
- [**Nuxt**](https://nuxt.com) Vue-variant van Next.js met SSR en routing.
- [**Astro**](https://astro.build) Content-first framework met islands architecture en minimale JS.

### Performance, tooling & offline

- [**Workbox**](https://developer.chrome.com/docs/workbox) Service workers genereren voor caching en offline.
- [**Prettier**](https://prettier.io) Formatter voor consistente code.
- [**ESLint**](https://eslint.org) Linter voor codekwaliteit en fouten.
- [**Vite**](https://vitejs.dev) Supersnelle build-tool voor moderne projecten.

## Gebruik van een library

### Extern laden via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
axios.get("https://api.example.com/data")
  .then(response => console.log(response.data));
</script>
```

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

### Wanneer libraries gebruiken?

✅ Handig als:

- Je iets wil doen dat veel code vraagt om zelf te schrijven.
- Je snel resultaat wil.
- De library goed onderhouden en betrouwbaar is.

⚠️ Vermijd libraries als:

- Je het ook eenvoudig zelf kan schrijven.
- De library groot is en je site trager maakt.
- Je maar één klein onderdeel ervan nodig hebt.
