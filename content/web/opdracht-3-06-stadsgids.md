+++
title = 'Opdracht: Stadsgids'
date = 2024-11-27T08:00:00-07:00
draft = false
+++

## Opgave

In deze opdracht maak je een toeristengids over drie steden in een land naar keuze, behalve België. Je hebt al één pagina over één stad gemaakt. Nu leer je hoe je een project met meerdere pagina’s organiseert. Ook ontdek je hoe je navigatie toevoegt, zodat gebruikers eenvoudig tussen alle pagina’s kunnen klikken. Met CSS zorg je ervoor dat alle pagina’s er netjes en samenhangend uitzien door één stijlbestand te gebruiken.

### Structuur

1. **Gebruik de projectmap uit voorgaande opdrachten**: Gebruik de bestaande map met jouw voornaam en het land van de steden (`voornaam_land`).
2. **Maak HTML-bestanden aan**: - Hernoem de huidige `index.html` naar `stad_1.html`. - Maak twee nieuwe stadspagina's: `stad_2.html` en `stad_3.html`, elk met informatie over een andere stad. - Maak een nieuwe `index.html` die dient als hoofdpagina van je gids.
3. **Gebruik één map voor afbeeldingen**: Bewaar alle afbeeldingen van de steden en bezienswaardigheden in één map genaamd `images`.
4. **Gebruik één CSS-bestand**: Link in al je HTML-bestanden naar één `style.css`-bestand in de hoofdmap. 

### Structuur en inhoud

#### Hoofdpagina (index.html)

##### `<header>`

- De `<header>` heeft een `<h1>` met daarin een link naar `index.html` en als inhoud de naam van het land. 

Bijvoorbeeld: `<h1><a href="index.html">Land</a></h1>`

- Voeg daaronder navigatielinks toe (`<a>`) naar de drie stadspagina’s (`stad_1.html`, `stad_2.html`, `stad_3.html`).

##### `<main>`

- Voeg onder de `</header>` een `<main>`-element toe met daarin een `<section>`-element waarin je kort vertelt over het land (bijv. geografie, cultuur, keuken). 
- Gebruik een `<h2>` voor een tussentitel, een `<p>`-element en eventueel een afbeelding om de tekst aantrekkelijker te maken.

#### Stadspagina’s

##### `<header>`

De `<header>` is op elke pagina dezelfde, net zoals de hoofdpagina. 

- De `<header>` heeft een `<h1>` met daarin een link naar `index.html` en als inhoud de naam van het land. 
- Voeg daaronder navigatielinks toe (`<a>`) naar de drie stadspagina’s (`stad_1.html`, `stad_2.html`, `stad_3.html`).

##### `<main>` met 3 `<section>`-elementen

Je stadspagina's zijn allemaal opgemaakt zoals je eerste stadspagina.

##### `<section>` Stadsoverzicht
- Voeg een `<h2>` toe: “Stadsoverzicht”.
- Gebruik een `<p>` voor een korte beschrijving van de stad.
- Voeg een ongeordende lijst (`<ul>`) toe met basisinformatie, zoals ligging, bevolkingsgrootte en geschiedenis.
- Voeg een afbeelding van de stad toe met `<img>` (breedte: 300px).

##### `<section>` Bezienswaardigheden
- Voeg een `<h2>` toe: “Bezienswaardigheden”.
- Gebruik een ongeordende lijst (`<ul>`) om minstens vijf bezienswaardigheden te noemen.

##### `<section>` Lokale activiteiten
- Voeg een `<h2>` toe: “Lokale activiteiten”.
- Voeg een `<h3>` en een korte beschrijving (`<p>`) toe per activiteit (minimaal vier).
- Voeg een afbeelding toe bij elke activiteit (breedte: 200px).

### CSS-styling

Alle HTML-documenten koppelen naar hetzelfde CSS-bestand.

`body { }`
- Stel een achtergrondkleur, tekstkleur en een standaardlettertype in.

`header { }`
- Geef het `header`-element een opvallende achtergrondkleur en stel `padding` in voor extra ruimte.

`a { } en a:hover { }`
- Stijl de navigatielinks met `text-decoration` en `color`. Gebruik `:hover` om een interactieve stijl toe te voegen.

`section { }`
- Voeg marges en padding toe aan de `section`-elementen om de tekst en afbeeldingen visueel te scheiden.

`img { }`
- Voeg een rand toe aan alle afbeeldingen en stel de breedte in met CSS.

## Indienen


Maak een zip-bestand van je map, zorg voor de correcte benaming (`voornaam_land.zip`), met daarin:
- `index.html`, `stad_1.html`, `stad_2.html`, `stad_3.html` en `style.css`
- Een submap `images` met alle gebruikte afbeeldingen.

Lever het zip-bestand in via Google Classroom.

## Beoordeling

- **Structuur (07)** Correcte mapstructuur en bestandsnamen.
- **Navigatie (04)** Werkende links op alle pagina’s.
- **Inhoud (04)** Informatieve teksten en afbeeldingen verwerkt in de gevraagde onderdelen. 
- **CSS-styling (08)** Samenhang en toepassing van basiseigenschappen zoals kleur, lettertypes, marges, padding.

## Veelvoorkomende fouten

1. Onjuiste bestandsnamen of mapstructuur.
2. Links die niet werken of naar een verkeerde pagina verwijzen.
3. Geen consistent gebruik van CSS tussen de pagina’s.
4. Afbeeldingen die niet worden weergegeven door verkeerde bestandslocaties.
5. Onvolledige of incorrect gestructureerde onderdelen.