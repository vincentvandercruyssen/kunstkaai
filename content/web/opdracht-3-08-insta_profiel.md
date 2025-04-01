+++
title = 'Opdracht: Insta Profiel'
date = 2025-02-19T08:00:00-07:00
draft = false
+++

## Opgave

Je hebt al een eenvoudige Instagram-feed gemaakt. In deze opdracht breid je deze uit met een profielpagina. Je maakt een overzichtelijke profielpagina met een profielfoto, een gebruikersnaam, een biografie en een rasterweergave van de eerder gemaakte posts.

De pagina moet qua stijl aansluiten bij de feed en een herkenbare, eenvoudige Instagram-look behouden.

## Voorbereiding

Werk verder in de map `voornaam insta` die je eerder hebt aangemaakt.

Maak een nieuw HTML-bestand aan:  
- `profiel.html`

Je hergebruikt het CSS-bestand `style.css`, dus zorg ervoor dat je geen onnodige dubbele stijlen toevoegt.

## Bouw de profielpagina

### Basisstructuur

Open `profiel.html` en voeg de basis-HTML-structuur toe met Emmet (`!`).  
Voeg een `<title>`-element toe en link naar `style.css`.

Binnen de `<body>` plaats je:

- Een `<header>` met een `<h1>` waarin de naam van de gebruiker staat.  
- Een `<main>`-element waarin je het profielgedeelte en de post-weergave plaatst.

### Profielgedeelte

Binnen het `<main>`-element voeg je een `<section>` toe met een `id` genaam `"profiel"`, met daarin:

- Een `<img>`-element voor de profielfoto, geef deze de class `"profielfoto"`.  
- Daaronder een `<h4>` voor de gebruikersnaam (beginnend met het @-symbool).  
- Een `<p>` voor de bio-tekst.  

Onder de bio-tekst voeg je een `<div>` met class `"statistieken"` toe. 

In deze `<div>` met statistieken komen drie `<a>`-elementen (voor posts, volgers en volgend). 

### Rasterweergave van de posts

Onder het profielgedeelte plaats je een tweede `<section>` waarin je de posts in een rastervorm zult weergeven. 

Gebruik een `div` met de class `"grid"`. Plaats hier minimaal negen afbeeldingen in. 

## CSS Styling

### Profielgedeelte

- Geef het `#profiel` wat `padding`. 
- Maak de `.profielfoto` rond aan de hand van `border-radius: 50%`, geef deze ook een vaste breedte in pixels. 
- Gebruik `display: flex` voor de `.statistieken` om deze op één regel te tonen.  Met `justify-content: space-around;` krijgen alle elementen evenveel ruimte. 

### Rasterweergave

- Gebruik voor `.grid` de eigenschap `display: grid` om de posts netjes in rijen en kolommen te zetten. 
- Stel `grid-template-columns: 1fr 1fr 1fr;` in om drie gelijke kolommen te maken. 
- Met `gap` kan je de hoeveelheid ruimte tussen de elementen instellen. 

Zorg ervoor dat de afbeeldingen, binnen het grid, vierkant blijven met `aspect-ratio: 1 / 1`. Om ervoor te zorgen dat ze niet platgedrukt worden voeg je `object-fit: cover;` toe. 

## Indienen

Je dient de volgende bestanden in binnen de map `voornaam insta`:
- `index.html`
- `profiel.html`
- `style.css`
- Map `images` met alle gebruikte afbeeldingen.

Lever de map in als een zip-bestand via Google Classroom.

## Puntenverdeling

- **Structuur (04)**: Correcte bestandsnamen en mapstructuur, `voornaam insta` met `profiel.html`, `style.css`, `images`.
- **HTML (15)**: Correct gebruik van elementen en kenmerken, `html`, `title` en `link`, `header` met `h`-koptekst, `main` met `section id="profiel"` met `img class="profielfoto"`, `h4`, `p`, `div class="statistieken"`, 3 x `a` en `section id="posts"` met `div class="grid"` en 9 x `img`.
- **CSS Basis (05)**: Basisstijl correct toegepast.  
- **CSS Layout (05)**: Profiel en posts correct weergegeven.  
- **Afbeeldingen (04)**: Correct gebruik van aspect-ratio en grid-indeling.  