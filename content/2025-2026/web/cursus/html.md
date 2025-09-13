+++
title = 'Cursus: HTML'
date = 2025-09-01T00:00:00Z
draft = false
+++

## HyperText Markup Language

HTML (HyperText Markup Language) is de meest elementaire bouwsteen van het web. Het is de standaard opmaaktaal voor documenten die zijn ontworpen om in een webbrowser te worden weergegeven. Het geeft webcontent (inhoud) weer in een bepaalde structuur. Naast HTML worden ook andere technologieën gebruikt om het uiterlijk (CSS) of de functionaliteit (JavaScript) van een webpagina te veranderen.

HyperText verwijst naar links die webpagina's met elkaar verbinden, zowel binnen één website als tussen verschillende websites. Links zijn een fundamenteel aspect van het web.

HTML gebruikt opmaaktaal (of Markup) om tekst, afbeeldingen en andere inhoud te structureren voor weergave in een webbrowser. Het is de codetaal die de inhoud van een document structureert. Inhoud kan bijvoorbeeld worden gestructureerd in de vorm van alinea's, lijsten met opsommingstekens, afbeeldingen enzovoort. HTML-opmaak omvat speciale elementen of tags zoals `<head>`, `<title>`, `<body>`, `<header>`, `<footer>`, `<section>`, `<p>`, `<div>`, `<span>`, `<img>`, `<nav>`, `<video>`, `<ul>`, `<ol>`, `<li>` en vele anderen.

Een HTML-element wordt van andere tekst in een document gescheiden door 'tags'. Deze tags bestaan uit de elementnaam omringd door "<" en ">". Het is een afspraak om tags in kleine letters te schrijven.

HTML is dus een opmaaktaal die de structuur en inhoud van een webpagina bepaalt. Het bestaat uit een reeks elementen die gebruikt worden om inhoud te omkaderen of te nesten, waardoor deze een specifieke vormgeving krijgt of op een bepaalde manier functioneert.

Neem bijvoorbeeld de volgende zin:

Ik ben blij.

Als we willen dat deze zin op zichzelf staat, kunnen we aangeven dat het een alinea (of paragraph) is door deze tussen openende en sluitende alinea-tags te plaatsen:

`<p>Ik ben blij.</p>`

Op deze manier weet de browser dat deze tekst als een aparte alinea of paragraaf moet worden weergegeven.

### Webbrowsers

Een webbrowser is een programma dat toegang geeft tot het internet. Het doel van een webbrowser is het tonen van webpagina's. Een webbrowser maakt gebruik van het HyperText Transfer Protocol (HTTP) om pagina’s op te halen van webservers. Enkele voorbeelden van webbrowsers zijn Mozilla Firefox, Google Chrome, Microsoft Edge, Opera en Apple Safari. Deze browsers lezen HTML-documenten en tonen deze als webpagina's. Een browser geeft de broncode van een HTML-document niet weer, maar toont de opmaak van het document en geeft zo de inhoud weer.

{{< img src="img/web/cursus-html-browser-1.png" >}}

### Anatomie van een HTML-element

Laten we het alinea-element nog wat verder onderzoeken.

|              | element      |               |
|--------------|--------------|---------------|
| openende tag |              | sluitende tag |
| `<p>`        | Ik ben blij. | `</p>`        |
|              | ↑ inhoud ↑   |               |

### De belangrijkste onderdelen van een element

1. **De openingstag:** Deze bestaat uit de naam van het element (in dit geval 'p'), omsloten door openings- en sluitpunthaakjes. Het geeft aan waar het element begint – in dit geval waar de alinea begint.
2. **De afsluitende tag:** Deze lijkt op de openingstag, maar heeft een schuine streep voor de elementnaam. Het geeft aan waar het element eindigt – in dit geval waar de alinea eindigt. Het weglaten van een afsluitende tag is een veelgemaakte beginnersfout en kan tot vreemde resultaten leiden.
3. **De inhoud:** Dit is wat tussen de openingstag en de afsluitende tag staat, in dit geval is dat tekst.
4. **Het element:** De combinatie van de openingstag, de afsluitende tag en de inhoud vormen samen het element.

Elementen kunnen ook attributen bevatten. Deze zien er als volgt uit:

{{< showcode >}}<a href="https://www.url.com">Klik hier.</a>
<section id="introductie">...</section>
<img src="img/afbeelding.jpg" />

{{< /showcode >}}

Attributen geven extra informatie over het element die je niet direct in de inhoud wilt tonen. In het bovenstaande voorbeeld verwijst het attribuut `href` naar een URL, `id` geeft een unieke identificatie voor het element en `src` verwijst naar het pad van een afbeelding.

### Elementen nesten

Je kunt elementen binnen andere elementen plaatsen. Dit heet 'nesten' (of nesting).

`<p>Ik ben <strong>zeer</strong> blij.</p>`

Dit wordt:

Ik ben **zeer** blij.

Het is belangrijk om ervoor te zorgen dat de elementen correct genest zijn. In het gegeven voorbeeld hebben we eerst het `<p>`-element geopend en daarna het `<strong>`-element. Daarom moeten we eerst het `</strong>`-element sluiten en daarna het `</p>`-element.

Zorg ervoor dat de elementen correct openen en sluiten, zodat ze duidelijk binnen of buiten elkaar vallen.

### Lege elementen

Bepaalde HTML-elementen maken geen tekstuele inhoud op en worden daarom 'lege elementen' genoemd. Neem bijvoorbeeld het `<img>`-element: het heeft typisch attributen zoals `src` en `alt`, maar er is *geen* afsluitende `<img>`-tag nodig.

`<img src="images/icon.png" alt="icoontje" />`

### Anatomie van een HTML-document

{{< showcode >}}<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mijn paginatitel</title>
  </head>
  <body>
    <h1>Een koptitel</h1>
    <p>Een stukje tekst.</p>
    <img src="images/afbeelding.jpg" alt="Mijn afbeelding" />
  </body>
</html>

{{< /showcode >}}

### De belangrijkste onderdelen van een document

1. **`<!DOCTYPE html>`** De doctype is een verplichte inleiding. Het zorgt ervoor dat de browser de relevante specificaties volgt.
2. **`<html>... </html>`** Het `<html>`-element omhult alle inhoud van de pagina.
3. **`<head>... </head>`** Het `<head>`-element bevat metagegevens zoals trefwoorden, stijlen en scripts.
4. **`<meta charset="UTF-8" />`** Stelt de tekenset van het document in.
5. **`<meta name="viewport" content="width=device-width" />`** Zorgt ervoor dat de pagina op de breedte van het apparaat wordt weergegeven.
6. **`<title>... </title>`** Stelt de titel van de pagina in die in het tabblad van de browser wordt weergegeven.
7. **`<body>... </body>`** Bevat alle zichtbare inhoud voor gebruikers.

### Document metadata

Metadata is informatie over andere gegevens, ofwel data over data. In het geval van een webpagina bevat metadata vaak informatie die niet direct zichtbaar is voor gebruikers.

{{< showcode >}}<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Cursus" />
  <meta name="keywords" content="HTML, CSS, JavaScript" />
  <meta name="author" content="Vincent Vander Cruyssen" />
  <title>Mijn webpagina</title>
  <link rel="stylesheet" href="style.css" />
</head>

{{< /showcode >}}

## Inhoudsstroom

De inhoudsstroom, *flow content*, omvat de meeste elementen die binnen het `<body>`-element kunnen worden geplaatst.

{{< showcode >}}<a>, <audio>, <blockquote>, <br>, <button>, <canvas>, <code>, <div>, <em>, <embed>, <footer>, <form>, <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, <header>, <hr>, <iframe>, <img>, <input>, <label>, <main>, <mark>, <nav>, <ol>, <p>, <picture>, <script>, <section>, <select>, <span>, <strong>, <sub>, <sup>, <svg>, <textarea>, <time>, <ul>, <video>

{{< /showcode >}}

### Inhoudsverdeling

Inhoudsverdeling, *sectioning content*, verdeelt of segmenteert alle inhoud binnen de body van een webpagina.

1. **`<header>...</header>`** Bevat de introductie van de inhoud, zoals navigatie en logo.
2. **`<nav>...</nav>`** Voor navigatie tussen secties binnen of buiten de pagina.
3. **`<main>...</main>`** Hoofdinhoud van het document.
4. **`<section>...</section>`** Onderverdelingen van het hoofdonderwerp binnen `<main>`.
5. **`<footer>...</footer>`** Voettekst met informatie zoals copyright en links.

### Kopteksten

Kopinhoud, *heading content*, omschrijft de titel of ondertitel van een onderdeel.

{{< showcode >}}<h1>Koptitel</h1>
<h2>Ondertitel</h2>
<h3>...</h3>
<h4>...</h4>
<h5>...</h5>
<h6>...</h6>

{{< /showcode >}}

### Alinea-element

Het `<p>`-element vertegenwoordigt een alinea.

{{< showcode >}}<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ducimus quae placeat, ipsam minus necessitatibus atque.</p>

{{< /showcode >}}

### Lijst met Lijstitems

Het `<li>`-element wordt gebruikt om een item in een lijst weer te geven.

{{< showcode >}}<ul>
  <li>...</li>
  <li>...</li>
  <li>...</li>
</ul>

{{< /showcode >}}
Dit wordt:
- ...
- ...
- ...

{{< showcode >}}<ol>
  <li>...</li>
  <li>...</li>
  <li>...</li>
</ol>

{{< /showcode >}}
Dit wordt:
1. ...
2. ...
3. ...

### Attributen of kenmerken

Elementen in HTML hebben vaak *attributes*.

1. **`id="..."`** Definieert een unieke identifier.
2. **`src="..."`** Geeft de URL aan van de in te sluiten inhoud.
3. **`alt="..."`** Geeft alternatieve tekst weer voor afbeeldingen.
4. **`href="..."`** Verwijst naar een gekoppelde bron.
5. **`width="..."`** Bepaalt de breedte van een afbeelding.
6. **`height="..."`** Bepaalt de hoogte van een afbeelding.

### Anker-element

Het `<a>`-element maakt een hyperlink.

{{< showcode >}}<a href="#interne-link">Deze link verwijst naar een id binnen de pagina</a>
<a href="http://www.externe-link.be">Deze link verwijst buiten de website</a>

{{< /showcode >}}

### Formulieren

Het `<form>`-element creëert een formulier waarin gebruikers gegevens kunnen invoeren.

### Invoerelement

Het `<input>`-element creëert interactieve elementen voor gebruikersinvoer.

| Element                                       | Voorbeeld                    |
| --------------------------------------------- | ----------------------------- |
| `<input type="text">`                         | Tekstveld                     |
| `<input type="number">`                       | Numeriek veld                 |
| `<input type="password">`                     | Wachtwoordveld                |
| `<input type="checkbox">`                     | Selectievakjes                |
| `<input type="radio">`                        | Keuzevakjes                   |

### Tekstvak

Het `<textarea>`-element creëert een groter invoerveld voor tekst.

{{< showcode >}}<textarea name="opmerking" cols="8" rows="3" placeholder="Hier kan je tekst schrijven."></textarea>

{{< /showcode >}}

### Opties selecteren

Het `<select>`-element creëert een dropdown-menu.

{{< showcode >}}<select name="selectie">
  <option value="waarde1">Kies een optie</option>
  <option value="waarde2">Waarde 2</option>
  <option value="waarde3">Waarde 3</option>
</select>

{{< /showcode >}}

### Knop

Het `<button>`-element creëert een klikbare knop.

{{< showcode >}}<button type="submit">Indienen</button>
<button type="reset">Reset</button>

{{< /showcode >}}

### Veld en omschrift

Het `<fieldset>`-element groepeert invoervelden, en `<legend>` geeft een titel aan een veldset.

{{< showcode >}}<fieldset>
  <legend>Voorbeeld van een fieldset.</legend>
  <input type="text" name="tekstje" placeholder="Voorbeeld" />
</fieldset>

{{< /showcode >}}

### Ingesloten inhoud

Ingesloten elementen importeren inhoud uit een andere bron.

{{< showcode >}}<audio>, <canvas>, <embed>, <iframe>, <img>, <math>, <picture>, <svg>, <video>

{{< /showcode >}}

### Interactieve inhoud

Interactieve elementen zijn specifiek ontworpen voor gebruikersinteractie.

{{< showcode >}}<a>, <button>, <details>, <embed>, <iframe>, <label>, <select>

{{< /showcode >}}

## Bronnen

287: - [MDN Web Docs - HTML Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)