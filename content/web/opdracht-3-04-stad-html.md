+++
title = 'Opdracht: Stad (HTML)'
date = 2024-11-13T08:00:00-07:00
draft = false
+++

## Opgave

In deze opdracht leer je hoe je een HTML-pagina maakt over een stad in een land naar keuze (behalve België). Het doel is om de HTML-structuur correct toe te passen en informatie overzichtelijk te presenteren.

### Kies een stad

- **Kies een stad** die je graag zou willen bezoeken.
- **Verzamel basisinformatie**: Noteer de belangrijkste feiten en bezienswaardigheden over de stad. Later voeg je deze toe aan je HTML-pagina.

### Organiseer je project

- **Maak een projectmap aan**: Creëer een nieuwe map met je voornaam en de naam van het land van de gekozen stad (bijvoorbeeld `voornaam_land`).
- **Maak het HTML-bestand**: Maak een bestand aan genaamd `index.html` in de hoofdmap.
- **Maak een submap**: Binnen deze map maak je een submap aan voor afbeeldingen, bijvoorbeeld `images`, waarin je afbeeldingen van de stad opslaat.

### Bouw de basis HTML-structuur

- **Gebruik Emmet**: Open `index.html` in Visual Studio Code en gebruik de Emmet-shortcut `!` (het uitroepteken) om de basisstructuur van een HTML-pagina te genereren.
- **Pas het `<title>`-element aan**: Verander in het `<head>`-element het `<title>`-element naar de naam van het land en de stad (bijvoorbeeld `Nederland - Rotterdam`).

### Structuur van de pagina

Binnen het `<body>`-element bouw je de stadspagina met een `header` en een `main` met drie `section`-elementen.

#### Voeg een header toe

Binnen `<body>` voeg je een `<header>`-element toe met een `<h1>`-element dat de naam van het land bevat.

Daaronder voeg je een `<main>`-element toe met drie verschillende `<section>`-elementen.

#### Section: Stadsoverzicht

- **Sectietitel**: Voeg een `<h2>`-element toe met als titel de naam van de stad, zoals "Stad".
- **Beschrijving**: Schrijf een korte inleidende tekst over de stad in een `<p>`-element.
- **Algemene informatie**: Maak een ongeordende lijst (`<ul>`) met `<li>`-elementen voor basisgegevens, zoals: ligging (bijv. “Gelegen in het zuiden van het land”), bevolkingsgrootte, oppervlakte, en een korte geschiedenis van de stad.
- **Afbeelding**: Voeg een afbeelding van de stad toe met het `<img>`-element. Zorg dat de afbeelding in de `images`-map staat en gebruik het `src`-kenmerk om ernaar te verwijzen. Voeg ook een `alt`-kenmerk toe met een beschrijving van de afbeelding. Pas de grootte aan door het `width`-kenmerk op `300` te zetten.

#### Section: Bezienswaardigheden

- **Sectietitel**: Voeg een `<h2>`-element toe met de titel "Bezienswaardigheden".
- **Lijst van plekken**: Maak een ongeordende lijst (`<ul>`) met `<li>`-elementen waarin je minstens vijf iconische locaties noemt, zoals musea, monumenten, parken, en andere interessante plekken die de stad typeren.

#### Section: Lokale activiteiten

- **Sectietitel**: Voeg een `<h2>`-element toe met de titel "Lokale activiteiten".
- **Activiteiten**: Voeg voor elke activiteit een `<h3>`-kop toe met de naam van de activiteit, gevolgd door een `<p>`-element met een korte beschrijving. Voeg per activiteit een afbeelding toe van 200 pixels breed, bij voorkeur onder het `<p>`-element. Beschrijf minimaal vier activiteiten. Tip: Google op "activiteiten in [stad]".

### Controleer je document

- **Structuur**: Zorg dat alle HTML-elementen correct zijn genest en afgesloten.
- **Afbeeldingen**: Controleer dat afbeeldingen correct worden weergegeven en dat het `src`-kenmerk naar de juiste map verwijst.
- **Kenmerken**: Voeg noodzakelijke kenmerken toe, zoals `alt` bij afbeeldingen.

## Indienen

- Zoek de map van je website in Finder, maak er een zip-bestand van, en upload dit in de juiste opdracht.
- Voornaam en opdrachtbenaming zijn telkens aanwezig in ingeleverde bestanden.

## Puntenverdeling

- **Structuur (03)**: Gezipte map met `index.html` en afbeeldingenmap.
- **Elementen document (04)**: Correct gebruik van `html`, `head`, aangepaste `title`, en `body`.
- **Elementen inhoudsverdeling (05)**: Gebruik van `header`, `main`, en `section`.
- **Elementen inhoudsstroom (07)**: Gebruik van `h1`, `h2`, `h3`, `p`, `img`, `ul` met `li`.
- **Kenmerken (03)**: Correct gebruik van `src`, `alt`, en `width`.

## Veelvoorkomende fouten

1. Geen aparte map voor afbeeldingen.
2. Verkeerd geneste of niet-afgesloten HTML-elementen.
3. `<title>`-element niet aangepast naar de naam van de stad.
4. Inhoud buiten de `<section>`-elementen geplaatst.
5. Lange teksten in `<h1>` of `<h2>` in plaats van in `<p>`.
6. `src`-kenmerk van afbeelding verwijst niet naar een lokale afbeelding.
7. Ontbrekend of leeg `alt`-kenmerk bij afbeeldingen.