+++
title = 'Opdracht: Portfolio'
date = 2025-05-04T08:00:00-07:00
draft = false
+++

## Opgave

Je bouwt een persoonlijke portfolio van dit schooljaar - en als je wil, ook met werk uit vorige jaren. Dit wordt jouw plek om te laten zien waar je trots op bent. De site maak je helemaal zelf, met HTML en CSS.

Je verzamelt werk uit **vier praktijkvakken** en minstens **één atelier** naar keuze. Jij bepaalt hoe je dat in beeld brengt. Voor de navigatie gebruik je de icoontjes die je maakte bij het vak 'Vectorieel tekenen'. 

### Vakken

- Beeldverwerking  
- Typografische vormgeving  
- Vectorieel tekenen  
- Webontwikkeling  

### Ateliers

- Grafisch atelier  
- Manueel atelier  
- Audiovisueel atelier  
- Printatelier  

## Structuur

Je portfolio bestaat uit **minstens 5 pagina’s**:

- `index.html`: je startpagina, met overzicht
- `about.html`: een korte bio over jezelf
- vier vakpagina’s + minimaal één atelierpagina

### Mappenstructuur

Je houdt alles netjes en overzichtelijk in één map:

```txt
portfolio/
├── index.html
├── about.html
├── beeldverwerking.html
├── typografie.html
├── ...
├── style.css
└── images/...
```

## HTML-opbouw

Elke pagina gebruikt dezelfde vaste structuur in `<body>`. Zo oogt je site samenhangend:

```html
<header>
  <nav>...</nav>
  <h1>...</h1>
</header>

<main>
  <section>...</section>
</main>

<footer>
  ...
</footer>
```

- Pas telkens de `<title>` aan in `<head>`
- Je **navigatie (`<nav>`) staat altijd in de `<header>`**
- Elke pagina heeft **dezelfde header en navigatiebalk**
- In de **`<footer>` zet je minimaal je eigen naam**

## CSS-opbouw

- Je werkt met **één enkel CSS-bestand**: `style.css`
- Voor de layout gebruik je **Flexbox of Grid**
- Kies duidelijke klassennamen en juiste selectors (`body`, `nav`, `.vak`, `#id`, ...)
- Werk je pagina’s mooi af met eigen kleuren, typografie en voldoende witruimte (marges en paddings)

## Inhoud van de pagina’s

### `index.html`

- Een raster van thumbnails of pictogrammen
- Elke afbeelding linkt naar een vak- of atelierpagina
- Zet er een titel of korte beschrijving bij

### `about.html`

- Je voornaam en achternaam
- Eén of twee korte paragrafen over wie je bent
- Voeg een foto of zelfportret toe

### Vakpagina’s (bijv. `typografie.html`)

- Toon **minstens drie werken** per vak
- Per werk: minstens één afbeelding, een titel en een korte uitleg
- Gebruik een raster- of kolomlayout voor de opbouw

## Afbeeldingen

- Gebruik `.jpg` of `.webp` voor rasterafbeeldingen
- Max. breedte: **1500 px**
- Max. bestandsgrootte: **300 KB**
- Vectorwerk? Exporteer als **`.svg`**
- Webpagina’s? Voeg een **screenshot** toe met link of gebruik een `<iframe>`

Let op kwaliteit en bestandsgrootte. Slordige beelden doen afbreuk aan je werk.

## Indienen

- Geef je map de naam: `voornaam portfolio`
- Zorg dat de map alles bevat: HTML-bestanden, je CSS, alle afbeeldingen
- Upload naar je **OneDrive-map `Webontwikkeling`**
- Bezorg de link via **Google Classroom**

## Puntenverdeling

- **Structuur (05)** Correcte mappenstructuur en bestandsnamen: `voornaam portfolio`, `index.html`, `about.html`, vakpagina’s (x5), `style.css`, map `images`.
- **Optimalisatie afbeeldingen (05)** Correcte bestandsformaten, maximale grootte gerespecteerd, duidelijke en verzorgde beelden. 
- **HTML (06)** Correct gebruik van HTML-elementen en kenmerken: `<head>` met `<title>` en `<link>`, `<header>`, `<nav>`, `<main>`, `<section>`, `h`-elementen, `<p>`, `<img>`, `<a>` en `<footer>` op alle portfolio-pagina’s (minstens 7). 
- **Navigatie (07)** Dezelfde navigatiebalk komt op de minstens 7 pagina's exact terug, visueel herkenbaar, correcte structuur.
- **Inhoud (07)** Introductie op hoofdpagina, duidelijke about-pagina, vier vakpagina’s met elk minstens drie werken, één atelierpagina met werk, telkens beschrijvingen en afbeeldingen per werk.
- **CSS Basis (05)** Eén centraal stylesheet (`style.css`), correcte koppeling, consistente styling van `body`, kleuren, typografie, witruimte.
- **CSS Lay-out (05)** Gebruik van duidelijke selectors en klassen, de nodige eigenschappen voor visuele eenheid tussen pagina’s, overzichtelijke lay-out.
- **Presentatie en vormgeving (05)** Algemeen verzorgde en samenhangende vormgeving, leesbaarheid, structuur, kleuren- en typografiekeuzes passen bij portfolio.

## Veelvoorkomende fouten

- Geen correcte link naar je CSS-bestand
- Warboel aan bestandsnamen of mappen
- Afbeeldingen te groot of vervormd
- Vakpagina’s niet volledig of slordig
- Navigatie die niet werkt of verwarrend is