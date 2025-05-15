+++
title = 'Opdracht: Webshop'
date = 2025-05-15T08:00:00-07:00
draft = false
+++

## Opgave

In deze opdracht ontwerp je een **webshop-website** in HTML en CSS. De website bestaat uit twee delen:

**Hoofdpagina (index.html)** met:

- een **header** met een logo en navigatiebalk
- een **main** met minimaal één section: een minishop met enkele voorbeelditems
- een **footer** met je naam en social media icoontjes

**Extra detailpagina** voor één item uit je shop (bijvoorbeeld `item1.html`)

Je werkt stap voor stap en gebruikt enkel HTML en CSS. Zorg voor een nette vormgeving met een duidelijke structuur.

## Structuur van de hoofdpagina

### Bestanden en mappen

Maak een nieuwe map aan in je OneDrive:
📁 `webshop`

Daarin komen volgende bestanden:

* `index.html` (hoofdpagina van de shop)
* `style.css` (alle opmaakregels)
* `item1.html` (extra pagina voor een item)
* eventueel een map `images` voor je logo of productfoto's

### HTML-structuur

De opbouw van de HTML in alle pagina’s:

```html
<header>...</header>
<main>
  <section>...</section>
</main>
<footer>Gemaakt door [jouw naam]</footer>
```

Zorg ervoor dat de structuur en vormgeving **overeenkomen in beide pagina’s**.

## Header met flexbox of grid

De header bevat een **logo** en een **navigatiebalk**.

### HTML

Open Visual Studio Code.

Maak een nieuw bestand: `index.html` in de map `webshop`.

Voeg de basis HTML-structuur toe met de Emmet-afkorting `!`

In de `<body>` maak je een `<header>` aan met daarin:

- een `<div class="flex-container">` waarin je logo en icoontjes staan
- een `<nav>` met enkele `<a>`-linkjes naar categorieën

Voorbeeld:

```html
<header>
    <div class="flex-container">
        <input placeholder="🔍">
        <img src="images/logo.svg" alt="Logo webshop" />
        <div>
            <a href="#">🛒</a>
            <a href="#">👤</a>
        </div>
    </div>
    <nav class="flex-container">
        <a href="#">Home</a>
        <a href="#">Shop</a>
        <a href="#">Contact</a>
        <a href="#">Over ons</a>
    </nav>
</header>
```

> Gebruik SVG voor je logo. Je kan zelf iets ontwerpen of iets zoeken op [https://www.svgrepo.com](https://www.svgrepo.com).

### CSS

Maak nu `style.css` aan en koppel het aan je HTML-bestand in de `<head>`.

```html
<link rel="stylesheet" href="style.css" />
```

Schrijf dan CSS om je header vorm te geven. Gebruik `display: flex` op `.flex-container`.

Voorbeeld:

```css
body {
    background-color: #e6e6e6;
    color: #223333;
    font-family: Arial, sans-serif;
    font-size: 16px;
}

.flex-container {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-bottom: 20px;
    padding: 20px;
}

.flex-container * {
    flex: 1;
}

nav {
    background-color: #f2f2f2;
}
```

## Main: minishop

Onder je header komt het hoofdgedeelte van je website. Je maakt daarin een `<main>` met één `<section>` waarin je **3 tot 4 items** toont. Elk item bestaat uit een afbeelding, een naam en een knop/link naar de detailpagina (`item1.html`).

Voorbeeldstructuur:

```html
<section id="minishop">
    <article>
        <img src="images/item1.jpg" alt="Item 1" />
        <h2>Naam van item</h2>
        <a href="item1.html">Meer info</a>
    </article>
    <!-- meer artikelen -->
</section>
```

Geef je items opmaak met CSS: randjes, witruimte, layout met grid of flex.

## Detailpagina

Maak nu een tweede HTML-bestand: `item1.html`. Hier geef je meer uitleg over één product.

Je hergebruikt dezelfde structuur als je hoofdpagina, met exact dezelfde header en footer.

De inhoud van je `<main>` bevat:

- een grote afbeelding van het item
- een titel en een korte beschrijving
- eventueel een knop “bestellen” of “terug naar shop”

## Indienen

Plaats je volledige map `webshop` in je OneDrive onder `Webontwikkeling`.

Deze map bevat:

* `index.html`
* `item1.html`
* `style.css`
* eventueel een `images`-map

## Puntenverdeling

* **HTML-structuur (08)**: juiste elementen, semantische opbouw
* **Header (06)**: goed gebruik van flexbox of grid
* **CSS-styling (06)**: verzorgde vormgeving
* **Detailpagina (06)**: duidelijke info over één item
* **Consistentie (04)**: zelfde structuur op beide pagina’s