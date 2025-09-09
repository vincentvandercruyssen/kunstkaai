+++
title = 'Opdracht: Absolutely'
date = 2025-04-02T08:00:00-07:00
draft = false
aliases = ["/web/opdracht-3-10-absolutely/"]
+++

## Opgave  

Je maakt in deze opdracht een interactieve webpagina met HTML en CSS. De pagina krijgt een achtergrondafbeelding die het hele scherm bedekt, en toont verschillende objecten (bijvoorbeeld dieren, voertuigen, bloemen, snoepjes...) op diverse posities. De tekst en titels worden gecentreerd met flexbox, zodat ze mooi in het midden van het scherm staan.  

De objecten worden gepositioneerd met `position: absolute` en de kenmerken `top`, `right`, `bottom`, `left`. Daarnaast voeg je animaties toe: de objecten bewegen of knipperen met CSS-animaties.  

Je kiest zelf een thema: dat mag alles zijn (bv. jungle, onder water, in een snoepwinkel, circus...), zolang je de gevraagde technieken gebruikt: een achtergrondafbeelding, flexbox voor centrering, absolute positionering en CSS-animaties.

## Voorbereiding

Maak een nieuwe map aan genaamd `voornaam absolutely` in je OneDrive-map voor dit vak. Open deze map in Visual Studio Code.

Maak in de map de volgende bestanden aan:
- `index.html`
- `style.css`
- Een map voor de afbeeldingen genaamd `images`.

## Bouw de hoofdpagina

Open `index.html` in Visual Studio Code. Maak de basis HTML-structuur aan met Emmet door `!` (uitroepteken) te typen.

Pas de titel in het `<title>`-element aan naar jouw gekozen thema en voeg een link naar `style.css` toe.

Voeg in de `body` een `main`-element toe met de volgende onderdelen:
- Een `<h1>`-element met een passende titel voor je thema.
- Een `<p>`-element met een korte introductie.
- Afbeeldingen van minstens vier objecten (zoals dieren, auto’s, vissen, enz.).
- Zorg ervoor dat de afbeeldingen duidelijke klassen krijgen voor CSS-styling. Elk object heeft een gemeenschappelijke klasse en een unieke klasse (bv. `object` en `object-1`).

## CSS-styling

### Basisstyling

Open `style.css` en zorg ervoor dat de `html` en `body` 100% van de hoogte beslaan. 

```css
html, body {
    height: 100%;
}
```

Stel een achtergrondafbeelding in die de volledige `body` bedekt. Voeg hier ook je lettertype en tekstkleur toe.

```css
body {
    margin: 0;
    background-image: url('images/achtergrond.jpg');
    background-size: cover;
    background-position: center;
}
```

### Structuur

Het `main`-element moet alle onderliggende tekst centreren in het midden van het beeldscherm met flexbox. Zet de richting op `column`.

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

Geef titels en paragrafen een goed leesbare grootte.

```css
h1 {
    font-size: 3rem;
}

p {
    font-size: 1.5rem;
}
```

### Plaatsing van objecten

Geef de objecten een absolute positie. Gebruik `position: absolute` en stel `width` in. Positioneer de objecten met `top`, `right`, `bottom` of `left`.

```css
.object {
    position: absolute;
    width: 200px;
}

.object-1 {
    top: 10%;
    left: 15%;
}
```

### Animaties

Gebruik `@keyframes` om beweging of effecten toe te voegen.

```css
@keyframes bewegen1 {
    from {
        transform: rotate(0deg) translateX(30px) rotate(0deg);
    }
    to {
        transform: rotate(360deg) translateX(30px) rotate(-360deg);
    }
}

@keyframes knipperen {
    from {
        opacity: 0.3;
    }
    to {
        opacity: 1;
    }
}
```

Voeg de `animation`-eigenschap toe aan de juiste klasse.

Bijvoorbeeld:

```css
.object-1 {
    animation: bewegen1 5s infinite linear;
}
```

## Indienen

Mapnaam: `voornaam absolutely` met de volgende bestanden:
- `index.html`
- `style.css`
- Map `images` met alle gebruikte afbeeldingen.

Zorg ervoor dat je map `Webontwikkeling` gedeeld wordt, maak een koppeling aan en deel in de juiste opdracht van Google Classroom.

## Puntenverdeling

- **Structuur (04)** Correcte bestandsnamen en mapstructuur, `voornaam absolutely`, `index.html`, `style.css`, `images`.
- **HTML (10)** Correct gebruik van elementen en kenmerken, `html`, `title` en `link`, `main` met `h1`, `p`, afbeeldingen met gemeenschappelijke en unieke klassen.
- **CSS Basis (08)** Basisstijl correct toegepast, `html` en `body` met `height`, `body` met `margin`, `background-image`, `background-size`, `font-family`, `color`.
- **CSS Layout (05)** Flexbox correct toegepast op `main`, met `display`, `flex-direction`, `justify-content`, `align-items`, tekst correct gecentreerd (`h1`, `p`).
- **CSS Objecten en animatie (14)** Objecten correct gepositioneerd met `position: absolute`, gebruik van gemeenschappelijke en unieke klassen (minimaal vier) met `width` en positionering-eigenschappen, correcte werking van minimaal twee `@keyframes`-regels, animatie toegepast op de objecten.

## Veelvoorkomende fouten

- Verkeerde mapstructuur of foutieve bestandsnamen.
- HTML-fouten zoals verkeerde nesting.
- Afbeeldingen die niet laden.
- Ontbrekende of foutieve CSS-animaties.
- Geen gebruik van absolute positionering.
- Positionering met pixels i.p.v. percentages.
- Geen `@keyframes`-animaties.
- Geen correcte centrering via flexbox.