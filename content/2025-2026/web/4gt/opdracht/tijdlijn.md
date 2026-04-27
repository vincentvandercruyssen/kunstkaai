+++
title = 'Opdracht: Tijdlijn'
date = 2026-04-27T00:00:00Z
draft = false
+++

## Opgave

In deze opdracht maak je een interactieve tijdlijn met HTML en CSS. Een tijdlijn is een perfecte manier om gebeurtenissen over een bepaald onderwerp in chronologische volgorde te presenteren. Je kiest zelf een thema of onderwerp en zoekt hierover minstens 10 belangrijke gebeurtenissen. 

Voor elke gebeurtenis of mijlpaal voorzie je een jaartal, een titel, een passende afbeelding en een korte beschrijving. Om het geheel visueel aantrekkelijk te maken, gebruikt de tijdlijn de volledige hoogte van het scherm en kan de bezoeker er horizontaal doorheen scrollen. De belangrijkste technieken die je hierbij hanteert zijn `flexbox`, `overflow-x` en `scroll-snap`.

## Voorbereiding

Open je map `Webontwikkeling` vanuit je OneDrive-map in Visual Studio Code. Maak een nieuwe map aan voor deze opdracht genaamd `VoornaamA_Tijdlijn`.

Zorg voor de volgende structuur en bestanden:

```text
VoornaamA_Tijdlijn/
├── images/
├── index.html
└── style.css
```

## Bouw de hoofdpagina

Open `index.html` in Visual Studio Code. Maak de basis HTML-structuur aan met Emmet door `!` (uitroepteken) te typen.

Pas de titel in het `<title>`-element aan naar iets dat past bij het thema van jouw tijdlijn. Voeg een correcte `link` naar je CSS-bestand toe.

Voeg in de `<body>` een `<header>`-element toe met de titel van je tijdlijn. Onder de header voeg je een `<main>`-element toe. In deze `main` zal je de tijdlijn-container plaatsen.

## De tijdlijn

### Tijdlijn-container

Voor de tijdlijn gebruik je één overkoepelend container-element waarin je alle tijdlijn-items plaatst. Doe dit door in de `main` een `<div>`-element toe te voegen met de `class` `tijdlijn-container`.

### Tijdlijn-items

Elk tijdlijn-item voeg je toe als een eigen `<div>`-element met de klasse `tijdlijn-item`. Een tijdlijn-item bevat minimaal:

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
  <p>Het WWW werd in 1991 geïntroduceerd door Tim Berners-Lee.</p>
</div>
```

Zorg ervoor dat je minimaal 10 items toevoegt. Elk item moet een unieke gebeurtenis uit jouw tijdlijn bevatten, in chronologische volgorde.

## CSS-styling

Het is de bedoeling dat je een tijdlijn bouwt waar horizontaal doorheen genavigeerd kan worden, zoals de onderstaande afbeelding illustreert. 

De lay-out is gebaseerd op **flexbox**. Door de hoofdcontainer (`.tijdlijn-container`) om te zetten in een flex-container, worden alle tijdlijn-items netjes naast elkaar geplaatst in plaats van onder elkaar. Omdat deze items samen breder zijn dan het scherm, moet de container zodanig ingesteld worden dat de gebruiker horizontaal kan scrollen. Dit doe je door de container in te stellen met `overflow-x`. Zo blijft de rest van de webpagina ongewijzigd op zijn plaats.

{{< img src="/img/web/opdracht/tijdlijn-flex_container-01.png" >}}

### Basisstyling

Open je `style.css` bestand en begin met het instellen van de basisstyling voor je pagina. Als extra zorg je ervoor dat de `html` en `body` 100% van de hoogte van de pagina beslaan. Dit zorgt ervoor dat de pagina helemaal in de hoogte kan gevuld worden, en kan de tijdlijn de gehele hoogte innemen of netjes verticaal gecentreerd worden.

```css
html, body {
  height: 100%;
}
```

Zorg ervoor dat de `body` een achtergrondkleur heeft en de tekst goed leesbaar is. Gebruik hiervoor een standaard of extern lettertype. Gebruik minstens de eigenschappen `background-color`, `font-family` en `color` in de `body`.

### Header

Geef de `header` een vaste hoogte (eigenschap `height`). Deze hoogte zul je gebruiken in de berekening van je `main` element. 

### Main

In je HTML zit de tijdlijncontainer genest binnen je `main`. Zorg ervoor dat deze container in het verticaal gecentreerd wordt binnen de `main`. Dit doe je door de hoogte van je `main` in te stellen op 100% - de hoogte van de `header`. 

In CSS kun je hiervoor de functie `calc()` gebruiken. Als je `header` bijvoorbeeld `120px` hoog is, gebruik dan `height: calc(100% - 120px);` voor de `main`.

Daarna centreer je de tijdlijncontainer verticaal. Door je `main` in een flexbox te veranderen, kun je eenvoudig de eigenschap `align-items` instellen op `center`.

```css
main {
  height: calc(100% - 120px);
  display: flex;
  align-items: center;
}
```

### Tijdlijn-container

De tijdlijncontainer moet horizontaal kunnen scrollen. Dit doe je door de `overflow-x` in te stellen op `auto`. Ook de container wordt een flexbox om de onderliggende items naast elkaar te plaatsen. Stel ook een `gap` in van een aantal pixels. 

```css
.tijdlijn-container {
    display: flex;
    gap: 20px;
    overflow-x: auto;
}
```

### Tijdlijn-items

Elk tijdlijnitem moet je wat styling geven. Een achtergrond, wat padding, en een border-radius bijvoorbeeld. Zorg ervoor dat de breedte van elk item wordt ingesteld op een minimum, zodat de items goed leesbaar zijn.

Je kunt voor `min-width` de eenheid `ch` gebruiken. Deze meeteenheid representeert de breedte van een karakter uit de gebruikte fontfamilie. Een minimum van `40ch` is bijvoorbeeld al voldoende.

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

Mapnaam: `VoornaamA_Tijdlijn` met de volgende bestanden:

```text
VoornaamA_Tijdlijn/
├── images/
├── index.html
└── style.css
```

Zorg ervoor dat je map `Webontwikkeling` gedeeld wordt, maak een koppeling aan en deel in de juiste opdracht van Google Classroom. 

## Puntenverdeling

- **Structuur (04)** Correcte bestandsnamen en mapstructuur, `VoornaamA_Tijdlijn`, `index.html`, `style.css`, map `images`.
- **HTML (14)** Correct gebruik van HTML-elementen en kenmerken: `html` en `body`, `head` met `title` en `link`, `header` met `h1`, `main`, `div`'s met klassen `tijdlijn-container` en `tijdlijn-item`, elk item met `h2`, `h3`, `img`, `p`.
- **Inhoud (05)** Minimaal 10 items in chronologische volgorde.
- **CSS Basis (04)** `html`, `body` met `height: 100%`, achtergrondkleur, lettertype.
- **CSS Layout (06)** `header` met vaste hoogte (`height`), `main` met `height: calc(100% - header)`, `display: flex`, `align-items: center` voor verticale centrering van de tijdlijncontainer.
- **CSS Tijdlijncontainer (05)** `display: flex`, `gap`, `overflow-x: auto`, `scroll-snap-type`, correcte horizontale opbouw, geen foutieve wrapping.
- **CSS Tijdlijnitems (05)** `min-width`, achtergrond, padding, `scroll-snap-align`, visuele eenheid tussen items.
- **CSS Afbeeldingen (02)** Afbeeldingen responsive binnen tijdlijnitem, zonder vervorming.

## Veelvoorkomende fouten

- Onjuiste mapstructuur of bestandsnamen.
- Foutieve HTML-nesting.
- Te weinig tijdlijn-items of incomplete informatie per item.
- Slecht gekozen afbeeldingen die niet relevant zijn voor het item.
- Incorrecte hoogte-instellingen waardoor de tijdlijn niet de volledige hoogte benut.
- Ontbrekende horizontale scrolling.
- Onjuiste gebruik van `flexbox` of `overflow-x`.
- Ontbrekende styling voor tijdlijn-items.
