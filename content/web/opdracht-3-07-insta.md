+++
title = 'Opdracht: Insta'
date = 2025-01-29T08:00:00-07:00
draft = false
+++

## Opgave

Sociale media zoals Instagram tonen foto's in een overzichtelijke feed, met likes en bijschriften. In deze opdracht bouw je een eenvoudige Instagram-feed met HTML en CSS. Je plaatst verschillende posts in een overzicht, waarbij elke post bestaat uit een afbeelding, een like-knop, een gebruikersnaam en een beschrijving.

Je gebruikt een vaste breedte voor de feed en zorgt ervoor dat afbeeldingen mooi binnen het ontwerp passen. De stijl wordt sober en minimalistisch gehouden, geïnspireerd door de echte Instagram-layout.

## Voorbereiding

Maak een nieuwe map aan in je map voor webontwikkeling, genaamd `voornaam insta`. Open deze map in Visual Studio Code.

Maak in de map de volgende bestanden aan:
- `index.html`
- `style.css`

Maak ook een nieuwe map aan, genaamd `images`. Hierin bewaar je de afbeeldingen die je voor de posts gebruikt.

## Bouw de hoofdpagina

Open `index.html` en maak de basis HTML-structuur aan met Emmet (`!`).

Voeg een passend `<title>`-element toe en link naar je CSS-bestand.



### Header

Binnen de `<body>` plaats je een `<header>` met een `<h1>` die de titel van je pagina bevat.

### Main

Onder de `</header>` plaats je een `<main>`-element waarin je de verschillende posts plaatst. 

Elke post zit genest binnen een `<section>`-element, daarin zit telkens:

- Een `<img>`-element voor de afbeelding.

Onder het `<img>`-element een `<div>`-element met daarin:
- Een `<button>`-element met een hart-icoon als like-knop. 
- Een `<h4>` met de gebruikersnaam (beginnent met het @-symbool).
- Een `<p>` met de beschrijving (vergeet de #hashtags niet). 

Gebruik Emmet om snel meerdere posts te genereren: `(.post>img+div>button+h4+p)*6`

## CSS styling

### Algemene opmaak

Stel in `style.css` de algemene opmaak van je website (`body`) in:

- Stel de marges in op `0`. 
- Een lichte achtergrondkleur en een andere tekstkleur. 
- Een ander lettertype. 

### Header-opmaak

De `header` geef je ook een unieke vormgeving:

- Een schaduw aan de hand van de eigenschap `box-shadow`. 
- Geef extra marge aan de onderkant. 
- Voeg wat padding toe. 
- Verander de achtergrondkleur. 
- Centreer de tekst. 

Bronnen via MDN: {{< a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow" text="box-shadow">}}.

### Feed-opmaak

Maak de feed niet breder dan 500px, gebruik hiervoor de eigenschap max-width en stel deze in op bijvoorbeeld `500px`.  

Je kan de gehele feed (of `main`) centreren aan de hand van de eigenschap `margin` en deze met `0 auto` in te stellen. 

### Post-opmaak

Geef elke post een witte achtergrond, afgeronde hoeken (`border-radius`) en een subtiele rand (`border`). Geef ook al deze posts een beetje `margin-bottom`. 

Bronnen via MDN: {{< a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius" text="border-radius">}}, {{< a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border" text="border">}}.

### Afbeeldingen

De afbeeldingen moeten de volledige breedte van de post innemen en vierkant blijven. Je doet dit door de eigenschap `width` in te stellen op `100%`. 

Aan de hand van de eigenschap `aspect-ratio` kun je de beeldverhoudingen van de afbeeldingen veranderen. Deze eigenschap verwacht een verhouding van breedte tot hoogte. Bijvoorbeeld, `aspect-ratio: 1 / 1` zorgt ervoor dat de afbeelding vierkant blijft. 

Als je afbeeldingen nu allemaal platgeduwt worden kun je `object-fit: cover;` gebruiken om te zorgen dat de afbeeldingen niet vervormen en de juiste verhoudingen behouden. Het zorgt er wel mogelijk voor dat de afbeeldingen worden bijgesneden. 

Bronnen via MDN: {{< a href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio" text="aspect-ratio">}}, {{< a href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit" text="object-fit">}}. 

### De tekst

Geef alle inhoud onder de afbeelding wat meer `padding`. Je maakt een selector aan voor `section div`. Nu ga je specifiek de `padding` kunnen aanpassen voor de inhoud onder de afbeeldingen. 

### Like-knop

De like-knop krijgt een subtiele hover-effect wanneer de gebruiker erover zweeft.

```css
button {
    background: none;
    border: none;
    font-size: 24px;
    transition: all 0.2s;
}

button:hover {
    color: #ed4956;
}
```

Bronnen via MDN: {{< a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:hover" text=":hover">}}, {{< a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition" text="transition">}}. 

## Indienen

Mapnaam: `voornaam insta` met de volgende bestanden:
- `index.html`
- `style.css`
- Map `images` met alle gebruikte afbeeldingen.

Maak één zip-bestand van de map en lever in via Google Classroom.

## Puntenverdeling

- **Structuur (04)**: Correcte bestandsnamen en mapstructuur.
- **HTML (12)**: Correct gebruik van elementen en kenmerken.
- **CSS Basis (05)**: Basisstijl correct toegepast.
- **CSS Layout (05)**: Feed correct gecentreerd, posts correct weergegeven.
- **Interactie (04)**: Like-knop werkt visueel.
- **Afbeeldingen (02)**: Correct gebruik van aspect-ratio en object-fit.