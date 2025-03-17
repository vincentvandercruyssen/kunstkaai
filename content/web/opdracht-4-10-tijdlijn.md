+++
title = 'Opdracht: Tijdlijn'
date = 2025-03-16T08:00:00-07:00
draft = false
+++

## Opgave

Maak een interactieve tijdlijn met HTML en CSS. Een tijdlijn toont gebeurtenissen over een bepaald onderwerp of thema in chronologische volgorde. Kies zelf een thema/onderwerp en voeg minstens 10 gebeurtenissen toe. Elke gebeurtenis bevat een jaartal, een titel, een afbeelding en een korte beschrijving. De tijdlijn gebruikt de volledige hoogte van het scherm en moet horizontaal scrollen. Gebruik flexbox voor de structuur en zorg voor een duidelijke navigatie.

## Voorbereiding

Maak een nieuwe map aan voor deze opdracht genaamd `voornaam tijdlijn` in het mapje in je Onedrive voor dit vak. Open deze map in Visual Studio Code.

Maak in de map de volgende bestanden aan:
- `index.html`
- `style.css`
- Een map voor de afbeeldingen genaamd `images`.

## Bouw de hoofdpagina

Open `index.html` in Visual Studio Code. Maak de basis HTML-structuur aan met Emmet door `!` (uitroepteken) te typen.

Pas de titel in het `<title>`-element aan naar iets dat past bij het thema van jouw tijdlijn. Vergeet niet de link naar je CSS-bestand toe te voegen.

Voeg in de `body` een `header`-element toe met de titel van je tijdlijn. Onder de header komt een `main`-element, waarin je de tijdlijn plaatst.

## HTML-structuur van de tijdlijn

In de tijdlijn gebruik je een container-element (een `<div>`) om alle items te bevatten. Geef dit `div`-element de `class` `tijdlijn-container`.

Elk item krijgt een `div`-element met een klasse `tijdlijn-item`. En elk item bevat minimaal:

- een jaartal (`<h2>`)
- een tussentitel (`<h3>`)
- een afbeelding (`<img>`)
- een tekstbeschrijving (`<p>`)

Een voorbeeld van een tijdlijn-item in HTML:
```html
<div class="tijdlijn-item">
    <h2>1991</h2>
    <h3>World Wide Web</h3>
    <img src="images/www.jpg" alt="World Wide Web">
    <p>Het World Wide Web werd in 1991 geïntroduceerd door Tim Berners-Lee.</p>
</div>
```

Zorg ervoor dat je minimaal 10 items toevoegt. Elk item moet een unieke gebeurtenis uit jouw tijdlijn bevatten, in chronologische volgorde.

## CSS-styling

### Basisstyling

Open je `style.css` bestand en begin met het instellen van de basisstyling voor je pagina. Zorg ervoor dat de `html` en `body` 100% van de hoogte van de pagina beslaan. Dit zorgt ervoor dat de pagina helemaal in de hoogte kan gevuld worden.

```css
html, body {
    height: 100%;
}
```

Zorg ervoor dat de `body` een achtergrondkleur heeft en de tekst goed leesbaar is. Gebruik een standaard of extern lettertype.

### Header

Geef de `header` een vaste hoogte (eigenschap `height`). Deze hoogte zul je gebruiken in de berekening van je `main` element. 

### Main

In je HTML zit de tijdlijncontainer genest binnen je `main`. Zorg ervoor dat deze container in het verticaal gecentreerd wordt binnen de `main`. Dit doe je door de hoogte van je `main` in te stellen op 100% - de hoogte van de `header`. 

In CSS kun je hiervoor de functie `calc()` gebruiken. Als je `header` bijvoorbeeld `120px` hoog is, gebruik dan `height: calc(100% - 120px);` voor de `main`.

Daarna centreer je de tijdlijncontainer verticaal. Door je `main` in een flexbox te veranderen, kun je eenvoudig de eigenschap `align-items` instellen op `center`.

### Tijdlijncontainer

De tijdlijncontainer moet horizontaal kunnen scrollen. Dit doe je door de `overflow-x` in te stellen op `auto`. Ook de container wordt een flexbox om de onderliggende items naast elkaar te plaatsen. Stel ook een `gap` in van een aantal pixels. 

```css
.tijdlijn-container {
    display: flex;
    gap: 20px;
    overflow-x: auto;
}
```

### Tijdlijnitems

Elk tijdlijnitem moet je wat styling geven. Een achtergrond, wat padding, en een border-radius bijvoorbeeld. Zorg ervoor dat de breedte van elk item wordt ingesteld op een minimum, zodat de items goed leesbaar zijn.

Je kunt voor `min-width` de eenheid `ch` gebruiken. Deze meeteenheid staat voor een karakter breed, zodat de inhoud gemakkelijk leesbaar is. Een minimum van `40ch` is bijvoorbeeld al voldoende.

### Afbeeldingen

De afbeeldingen in elk tijdlijnitem moeten zich aanpassen aan de breedte van het item zonder vervorming. Zorg ervoor dat ze de volledige breedte van het item vullen zonder de verhoudingen te verstoren. De afbeeldingen kun je boven en/of onder wat marge geven.

### Scrollen en navigatie

Omdat de tijdlijn horizontaal moet scrollen, kun je de visuele weergave aanpassen door de items een overgang te geven als ze in beeld komen. Dit zorgt voor een dynamisch effect.

```css
.tijdlijn-container {
    scroll-snap-type: x proximity;
    overflow-x: auto;
}

.tijdlijn-item {
    scroll-snap-align: start;
}
```

## Indienen

Mapnaam: `voornaam tijdlijn` met de volgende bestanden:
- `index.html`
- `style.css`
- Map `images` met alle gebruikte afbeeldingen.

Zorg ervoor dat je map `Webontwikkeling` gedeeld wordt, maak een koppeling aan en deel in de juiste opdracht van Google Classroom. 

## Puntenverdeling

- **Structuur (04)**: Correcte bestandsnamen en mapstructuur.
- **HTML (12)**: Correct gebruik van HTML-elementen voor de tijdlijn.
- **CSS Basis (04)**: Basisstyling van de pagina.
- **CSS Tijdlijncontainer (10)**: Stijl van de tijdlijn en horizontaal scrollen.
- **CSS Tijdlijnitems (08)**: Styling van de tijdlijnitems.
- **Afbeeldingen (02)**: Verantwoord gebruik van afbeeldingen.

## Veelvoorkomende fouten

- Onjuiste mapstructuur of bestandsnamen.
- Foutieve HTML-nesting.
- Te weinig tijdlijn-items of incomplete informatie per item.
- Slecht gekozen afbeeldingen die niet relevant zijn voor het item.
- Incorrecte hoogte-instellingen waardoor de tijdlijn niet de volledige hoogte benut.
- Ontbrekende horizontale scrolling.
- Onjuiste gebruik van `flexbox` of `overflow-x`.
- Ontbrekende styling voor tijdlijn-items.