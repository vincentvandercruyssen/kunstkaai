+++
title = 'Opdracht: Recept (HTML)'
date = 2025-10-19T00:00:00Z
draft = false
+++

## Opgave

In deze opdracht leer je hoe je een HTML-pagina maakt op basis van een online gevonden recept. Het doel is om de HTML-structuur correct toe te passen en informatie op een overzichtelijke manier te presenteren.

### Zoek een recept

- **Vind een recept**: Gebruik Google of een andere bron om een recept te vinden (bijvoorbeeld een gerecht, een gebak, iets dat je graag eet).
- **Noteer de bron**: Zorg ervoor dat je de link van de website waar je het recept hebt gevonden bewaart. Je zult deze link later toevoegen aan je HTML-document als bronvermelding.

### Organiseer je project

- **Maak een projectmap aan**: Creëer een nieuwe map volgens de schoolregels (`VoornaamA_Recept`), in je vakmap in OneDrive.
- **Creëer het HTML-bestand**: Maak een bestand aan genaamd `index.html` in de hoofdmap.
- **Maak submappen**: Binnen deze nieuwe map maak je een map aan voor je afbeeldingen (bijvoorbeeld `images`).

### Bouw de basis HTML-structuur

- **Gebruik Emmet**: Open `index.html` in je Visual Studio Code en gebruik de Emmet-shortcut `!` (het uitroepteken) om de basisstructuur van een HTML-pagina te genereren.
- **Pas het `title`-element aan**: In het `<title>`-element in het `<head>`-element, beschrijf je de naam van het gerecht.

### Structuur van de pagina

- **Voeg een `<header>` toe**: Binnen de `<body>`, voeg je een `<header>`-element toe met een `<h1>`-element dat de naam van het gerecht bevat.
- **Bronvermelding**: Voeg onderaan de `header`, onder het `<h1>`-element, een paragraaf toe waarin je de bron vermeldt. Verwijder alles achter .com, .org, .be of dergelijk. Bijvoorbeeld:

{{< showcode >}}<p>Bron: <a href="https://voorbeeldsite.com">voorbeeldsite.com</a></p>

{{< /showcode >}}

- **Voeg een `<main>` toe**: Na het `<header>`-element, voeg je een `<main>`-element toe. Hierin komt de hoofdinhoud van de pagina.

### Inhoud toevoegen in onderdelen

Binnen het `<main>`-element maak je drie `<section>`-elementen aan:

**1. Beschrijving**
- Voeg een `<h2>`-element toe met de titel "Beschrijving".
- Schrijf, of kopieer en plak, een paragraaf (`<p>`) waarin je het gerecht beschrijft.
- Voeg een afbeelding van het gerecht toe met het `<img>`-element. Zorg dat de afbeelding in de `images`-map staat en gebruik het `src`-kenmerk om ernaar te verwijzen. Voeg ook een `alt`-kenmerk toe met een beschrijving van de afbeelding. Verklein of vergroot de afbeelding met het `width`-kenmerk tot `300`. 

**2. Ingrediënten**
- Voeg een `<h2>`-element toe met de titel "Ingrediënten".
- Maak een ongeordende lijst (`<ul>`) met `<li>`-elementen voor elk ingrediënt.

**3. Instructies**
- Voeg een `<h2>`-element toe met de titel "Instructies".
- Maak een geordende lijst (`<ol>`) met `<li>`-elementen voor elke stap in het recept.

### Controleer je document

- **Controleer de structuur**: Zorg dat alle HTML-elementen correct zijn genest en afgesloten.
- **Afbeeldingen**: Controleer dat de afbeeldingen correct worden weergegeven en dat het `src`-kenmerk naar de juiste map verwijst.
- **Kenmerken**: Zorg dat alle noodzakelijke kenmerken zijn toegevoegd, zoals `alt` en `width` bij afbeeldingen, `href` bij het `<a>`-element.

## Indienen

- Vakmap **Webontwikkeling**, via **OneDrive-link** toegevoegd aan de opdracht in **Google Classroom**.

In je vakmap zit:

- **VoornaamA_Recept** met `index.html` en de map `images/`.

## Puntenverdeling

- **Structuur** `VoornaamA_Recept` met daarin `index.html` en map met afbeeldingen. 
- **Elementen document** `html`, `head`, aangepaste `title`, `body`                             
- **Elementen inhoudsverdeling** `header`, `main`, `section`                                             
- **Elementen inhoudsstroom** `h1`, `h2`, `p`, `a`, `img`, `ul` met `li`, `ol` met `li`   
- **Kenmerken** `src`, `alt`, `width`, `href`                                                 

## Veelvoorkomende fouten

1. Geen aparte map voor afbeeldingen.
2. HTML-elementen die niet correct zijn afgesloten of verkeerd zijn genest.
3. Het `<title>`-element is niet aangepast.
4. Het `<body>`-element staat op de verkeerde plek of is verkeerd genest.
5. Lange teksten geplaatst in `<h1>` of `<h2>` in plaats van in `<p>`.
6. Inhoud buiten de `<section>`-elementen geplaatst.
7. Ontbrekend of leeg `alt`-kenmerk bij het `<img>`-element.
8. Het `src`-kenmerk van de afbeelding verwijst niet naar een lokale afbeelding.