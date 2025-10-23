+++
title = "Opdracht: Favorieten"
date = 2025-10-16T00:00:00Z
draft = false
+++

Je maakt een mini-pagina die een **lijst van favoriete dingen** toont en er **twee eenvoudige acties** op uitvoert. Zo leer je wat een **array** is, hoe je erdoor **loopt**, hoe je een **willekeurig element** kiest, en hoe je de **DOM** bijwerkt.

## Opdracht

Je toont een lijst van **favoriete dingen** en voegt **twee knoppen** toe:

* Toon het **aantal** items in de lijst
* Toon **één willekeurig** item uit de lijst

Alles gebeurt in **JavaScript** met een **array** als bron.

### Projectmap maken

Zorg dat je werkt in je vakmap voor het vak **Weboriëntatie**.

```
VoornaamA_Favorieten/
├── index.html
├── style.css
└── app.js
```

### Wat je leert

* Een **array** aanmaken met meerdere waarden
* Een **element** aanspreken via een **index**
* Met **forEach** door de array lopen
* Het **aantal** elementen lezen met `length`
* Een **willekeurig** element kiezen met `Math.random` en `Math.floor`
* Tekst op het scherm zetten met `textContent`

## Bestanden

### index.html bevat

* Een titel
* Een lege `<ul id="lijst">` die je via JS vult
* Twee knoppen met de kenmerken `id="toon"` en `id="random"`
* Een `<p id="uitkomst">` waar jij resultaattekst zet
* Je script wordt gekoppeld onderaan de pagina

### style.css bevat

* Basisopmaak
* Een eenvoudige grid voor de knoppen
* Vrij te wijzigen naar eigen stijl, maak er iets moois en origineel van

### app.js bevat

* Een **array** `favorieten` met een paar startitems
* Code die de lijst in de **DOM** schrijft
* Twee click-handlers voor de knoppen
* Logica om het **aantal** te tonen en **willekeurig** te kiezen

## Stappenplan

### Array begrijpen

* Een array is één variabele met meerdere waarden
* De eerste waarde zit op **index 0**
* Je kunt elk item aanspreken met `[index]`
* De lengte van de lijst lees je met `length`

[W3Schools: JavaScript Arrays](https://www.w3schools.com/js/js_arrays.asp)

[W3Schools: JavaScript Arrays: Add and Remove Items](https://www.w3schools.com/js/js_array_methods.asp)

### Lijst vullen in de DOM

* Selecteer het `<ul>`-element met `id="lijst"`
* Maak voor de *unordered list* een variabele aan met `document.querySelector("#lijst")`
* Loop met `forEach` door de array, waarbij je een eigen `function` aanroept
* Die functie voegt per item (of waarde) een `<li>` toe met `createElement`
* Zet de tekst van elke arraywaarde in de nieuwe `<li>`-elementen met `textContent`

Bekijk ook eens of je de lijst kunt aanmaken met een **for-loop**. Een `for`-loop doet in essentie hetzelfde als een `forEach`, maar je beheert zelf de teller (`i`) en de stopvoorwaarde. `forEach` neemt dat automatisch over en doorloopt elk element van de array.

MDN info: [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) | [Document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) | [Node.appendChild()](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) | [Element.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) | [Array.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

### Aantal tonen

* Koppel een click-handler aan de knop **Toon aantal**
* Lees `favorieten.length` en schrijf een korte zin in `#uitkomst`

MDN info: [Array.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) | [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) 

### Willekeurig tonen

* Koppel een click-handler aan de knop **Toon willekeurige**
* Bereken een geldige index met `Math.random()` en `Math.floor()`
* `Math.floor()` is belangrijk, anders geeft `Math.random()` mogelijk een kommagetal
* Neem het item op die index uit de array en schrijf het naar `#uitkomst`

MDN info: [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) | [Math.floor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)

### Zelf aanpassen

* Vervang de startitems door **favorieten van jezelf of je klasgenoot**
* Controleer in de **console** dat de eerste en laatste index kloppen
* Let erop dat de lijst zichtbaar blijft als je pagina herlaadt

[Console.log()](https://developer.mozilla.org/en-US/docs/Web/API/console/log)

## Mini-uitbreidingen

Nu ga je op zoek deze eenvoudige webapplicatie verder uit te breiden, wees creatief, gebruik je verbeelding.

Hieronder enkele mogelijke voorbeelden.

* Voeg één nieuw item toe aan de array en controleer of het **aantal** klopt
* Zet de **willekeurige keuze** ook als **extra `<li>`** bovenaan de lijst
* Maak de eerste letter van elk item **hoofdletter** in de weergave
* Voeg zelf favorieten toe met een invoerveld
* Werk de lijst meteen bij na toevoegen
* Vermijd dubbels met `includes()`
* Maak een knop om alles te wissen
* Zet automatisch hoofdletters bij elk item
* Verander de tekstkleur willekeurig
* Laat een item verwijderen met `filter()`
* Bewaar de lijst met `localStorage`
* ...

## Indienen

* Map **Weboriëntatie/VoornaamA_Favorieten** met `index.html`, `style.css`, `app.js`
* Deel volledige vakmap **Weboriëntatie** via de **OneDrive-link** in **Google Classroom**

## Puntenverdeling

* **Array en weergave** Lijst correct aangemaakt en logisch gevuld, netjes opgebouwd in de DOM
* **Interactie** Knoppen werken en tonen de juiste informatie
* **Codekwaliteit** Duidelijke namen, consequente inspringing, geen overbodige code
* **Vormgeving (CSS)** Verzorgde, originele en overzichtelijke lay-out
* **Toevoeging** Creatieve uitbreiding van het oorspronkelijke idee, minimale vereisten blijven behouden