+++
title = 'Opdracht: Space'
date = 2025-03-19T08:00:00-07:00
draft = false
+++

## Opgave  

Je maakt in deze opdracht een interactieve ruimtepagina met HTML en CSS. De pagina heeft een achtergrondafbeelding die de volledige ruimte bedekt en toont planeten en sterren op verschillende posities. De tekst en titels worden gecentreerd met flexbox, zodat ze mooi in het midden van het scherm staan.  

De planeten en sterren worden gepositioneerd met `position: absolute` en de eigenschappen `top`, `right`, `bottom`, `left`. Daarnaast voeg je animaties toe: de planeten bewegen en de sterren twinkelen met CSS-animaties.  

Wil je liever een ander thema dan ruimte? Dat kan, zolang je de gevraagde technieken gebruikt: een achtergrondafbeelding, flexbox voor centrering, absolute positionering en CSS-animaties.

## Voorbereiding

Maak een nieuwe map aan genaamd `voornaam space` in je OneDrive-map voor dit vak. Open deze map in Visual Studio Code.

Maak in de map de volgende bestanden aan:
- `index.html`
- `style.css`
- Een map voor de afbeeldingen genaamd `images`.

## Bouw de hoofdpagina

Open `index.html` in Visual Studio Code. Maak de basis HTML-structuur aan met Emmet door `!` (uitroepteken) te typen.

Pas de titel in het `<title>`-element aan naar *Space* en voeg een link naar `style.css` toe.

Voeg in de `body` een `main`-element toe met de volgende onderdelen:
- Een `<h1>`-element met de tekst *Welkom in de ruimte*.
- Een `<p>`-element met een korte introductie.
- Afbeeldingen van twee planeten en twee sterren.
- Zorg ervoor dat de afbeeldingen duidelijke klassen krijgen voor CSS-styling. Elke planeet en ster heeft een gemeenschappelijke klasse en een unieke klasse (bv. `planeet` en `planeet-1`).

## CSS-styling

### Basisstyling

Open `style.css` en zorg ervoor dat de `html` en `body` 100% van de hoogte beslaan. 

```css
html, body {
    height: 100%;
}
```

Stel een achtergrondafbeelding die de hele achtergrond van de `body` beslaat. Geef hier ook je lettertype, tekstkleur in.

```css
body {
    margin: 0;
    background-image: url('images/sterrenachtergrond.jpg');
    background-size: cover;
    background-position: center;
}
```

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/RwjNrbN" height="440" >}}

### Structuur

Het `main`-element moet alle onderliggende tekst centreren in het midden van het beeldscherm. Dit doe je aan de hand van flexbox. Omdat flexbox de inhoud standaard van links naar rechts toont, stel je de richting in op `column`.

```css
main {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
```

### Styling van tekst

Geef de titels en paragrafen een goed leesbare grootte.

```css
h1 {
    font-size: 3rem;
}

p {
    font-size: 1.5rem;
}
```

### Plaatsing van objecten

Geef de planeten en sterren een absolute positie. Geef de gemeenschappelijke klasse `position: absolute;` hier kun je ook de breedte (`width`) instellen. Nu kun je de individuele planeten verplaatsen aan de hand van `top`, `right`, `bottom` of `left` met percentages.

```css
.planeet {
    position: absolute;
    width: 250px;
}

.planeet-1 {
    top: 15%;
    left: 5%;
}
```

### Animaties

Gebruik `@keyframes` om de beweging van de planeten en de twinkeling van de sterren te realiseren.

```css
@keyframes orbit1 {
    from {
        transform: rotate(0deg) translateX(30px) rotate(0deg);
    }
    to {
        transform: rotate(360deg) translateX(30px) rotate(-360deg);
    }
}

@keyframes twinkle {
    from {
        opacity: 0.2;
    }
    to {
        opacity: 1;
    }
}
```

Voeg de `animation`-eigenschap toe aan de juiste klasse.

Bijvoorbeeld:

```css
.planeet-1 {
    animation: orbit1 6s infinite linear;
}
```

## Indienen

Mapnaam: `voornaam space` met de volgende bestanden:
- `index.html`
- `style.css`
- Map `images` met alle gebruikte afbeeldingen.

Zorg ervoor dat je map `Webontwikkeling` gedeeld wordt, maak een koppeling aan en deel in de juiste opdracht van Google Classroom.

## Puntenverdeling

- **Structuur (04)**: Correcte bestandsnamen en mapstructuur.
- **HTML (10)**: Correct gebruik van HTML-elementen.
- **CSS Basis (04)**: Basisstyling van de pagina.
- **CSS Objecten (10)**: Correcte plaatsing van de planeten en sterren.
- **Animaties (08)**: Correcte werking van de animaties.

## Veelvoorkomende fouten

- Onjuiste mapstructuur of bestandsnamen.
- Foutieve HTML-nesting.
- Afbeeldingen die niet correct worden geladen.
- Ontbrekende of foutieve CSS-animaties.
- Geen juiste absolute positionering van planeten en sterren.
- Gebruik van pixels in plaats van percentages bij positionering, waardoor de layout minder flexibel wordt.
- Onjuiste of ontbrekende `@keyframes`-animaties, waardoor objecten niet bewegen of twinkelen. 
- Geen correct gebruik van flexbox, waardoor tekst en titels niet goed gecentreerd worden. 