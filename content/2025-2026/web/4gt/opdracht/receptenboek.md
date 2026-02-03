+++
title = 'Opdracht: Receptenboek'
date = 2025-11-16T00:00:00Z
draft = false
+++

## Opgave

In dit derde deel van de opdracht bouw je een receptenboek met meerdere receptenpagina's en een hoofdpagina. Je maakt drie nieuwe HTML-pagina's aan: twee voor extra recepten en één indexpagina telkens met dezelfde navigatielinks naar elk recept. Het doel is om te leren hoe je een project met meerdere pagina's structureert en hoe je navigatielinks toevoegt om een duidelijke gebruikerservaring te creëren.

### Projectstructuur

- **Bestand hernoemen**: Hernoem je huidige `index.html` naar `recept_1.html`.
- **Maak nieuwe pagina's aan**: Voeg twee nieuwe HTML-bestanden toe aan je project: `recept_2.html` en `recept_3.html`. Zorg ervoor dat elk bestand de juiste structuur bevat zoals je eerder hebt toegepast in deel 1 en deel 2 van de opdracht. Deze twee nieuwe pagina's bevatten unieke recepten, gestructureerd op dezelfde manier als het eerste recept. 
- **Maak een hoofdpagina aan**: Maak een nieuwe `index.html` aan. Deze pagina wordt de hoofdpagina van je receptenboek en bevat informatie over het boek zelf. Voeg in een `main`-element een `section` toe voor een beschrijving waarin je kort vertelt over de recepten die de bezoeker kan maken.

### Navigatie en structuur

- Zorg ervoor dat elke pagina **een `<header>`-element** heeft met de titel van je receptenboek.
- **Navigatielinks toevoegen**: Maak in elke `<header>` een reeks links aan die naar de drie receptenpagina's verwijzen (`recept_1.html`, `recept_2.html`, `recept_3.html`). Gebruik `<a>`-elementen om de links te maken. 
- Voeg dezelfde `header` met de links ook toe aan de nieuwe `index.html` (hoofdpagina).

### Inhoud op elke pagina

**Recept 1, 2 en 3**

- Voeg aan elke pagina een `<h2>` toe met de naam van het recept, doe dit bovenaan het eerste `section`-element van elke receptpagina.
- Volg voor de rest dezelfde indeling en opbouw als in deel 1: drie `section`-elementen met beschrijving, ingrediënten, en instructies.

**Hoofdpagina (`index.html`)**

- Plaats een beschrijvende tekst in een `<p>`-element waarin je uitlegt waarover het receptenboek gaat. Dit staat onder de `header`, genest in een `section` binnen een `main`-element. 
- De drie links naar de receptenpagina's zijn ook hier in de `header` aanwezig, zodat bezoekers eenvoudig tussen de recepten kunnen navigeren.

### CSS aanpassen voor eenheid

- **Pas je `style.css`-bestand aan** om stijlen voor de navigatie aan te maken, zoals:
- Een samenhangende stijl voor alle links in de `<header>` van elke pagina.
- Stijlen voor de `<header>`, `<main>`, `<section>`, enzovoort, zodat alle pagina's een gelijkmatig uiterlijk hebben.
- Gebruik `margin` en `padding` om de layout te verbeteren en de inhoud visueel te scheiden.

### Controleren en indienen

- **Controleer alle links**: Zorg ervoor dat elke link correct werkt en dat je zonder problemen van de ene pagina naar de andere kunt navigeren.
- **Mapstructuur controleren**: Alle `html`-bestanden, `style.css` en afbeeldingen moeten zich in dezelfde projectmap bevinden.

## Indienen

Zorg dat in de map `VoornaamA_Receptenboek` de volgende bestanden zitten:

* `index.html`
* `recept_1.html`
* `recept_2.html`
* `recept_3.html`
* `style.css`
* een map `images` met alle gebruikte afbeeldingen

Plaats de map `VoornaamA_Receptenboek` in je vakmap voor Webontwikkeling op OneDrive.

Zorg voor een koppeling naar je volledige vakmap in je OneDrive bij de opdracht in Google Classroom.

## Puntenverdeling

- **Structuur (08)** Correcte map met index.html, recept_1.html, recept_2.html, recept_3.html, style.css en één map met afbeeldingen met duidelijke benamingen.
- **Header en navigatie (08)** Dezelfde header-vormgeving op elke pagina, werkende links op elke pagina die leiden naar elk recept en terug naar de hoofdpagina.
- **Inhoud en opmaak (08)** Volledige recepten op elke pagina met een correcte indeling, samenhangende vormgeving en gebruik van de eerder gevraagde CSS-eigenschappen.

## Veelvoorkomende fouten

1. Onjuiste bestandsnamen of mappenstructuur.
2. Links die niet werken of naar een verkeerde pagina verwijzen.
3. Geen overeenkomende opmaak in de headers of links op elke pagina.
4. Foutief gelinkte CSS-bestand waardoor stijlen niet eenduidig worden toegepast.
5. Verkeerde indeling in de hoofdpagina  (`index.html`) en recepten pagina's zonder links naar de recepten.