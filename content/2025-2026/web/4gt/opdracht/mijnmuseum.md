+++
title = 'Opdracht: Mijn museum'
date = 2026-02-12T00:00:00Z
draft = false
+++

## Opgave

In deze opdracht maak je een website genaamd **Mijn museum**, waarin je drie persoonlijke thema's (kunstwerken, technologie, historische items, muziek, films, favoriete boeken,...) tentoonstelt. Elk thema of object krijgt een eigen pagina met beschrijvingen, media en een galerij.

Elke pagina bevat informatie over één object of thema, en alle pagina's zijn gekoppeld via dezelfde navigatiebalk.

Je herhaalt wat je geleerd hebt over HTML, CSS, navigatie en structuur, terwijl je nieuwe moderne layouttechnieken toepast. Succes met het bouwen van jouw digitale museum!

## Voorbereiding

Maak een nieuwe map in je map voor webontwikkeling, genaamd `VoornaamA_MijnMuseum`. Open deze map in Visual Studio Code: Klik in Visual Studio Code op *File > Open Folder* en selecteer jouw map.

Maak in de map de volgende bestanden aan:
- `index.html` (voor de hoofdpagina).
- `thema1.html`, `thema2.html`, `thema3.html` (voor de themapagina's).
- `style.css` (voor de opmaak van alle pagina's).

Maak ook een nieuwe map aan, genaamd `images`. Hierin sla je alle afbeeldingen op die je wilt gebruiken.

## Bouw de hoofdpagina

Open `index.html` in Visual Studio Code en typ `!` (uitroepteken) en druk op Enter. Dit is de Emmet-shortcut die de basisstructuur van een HTML-document genereert.

Pas het `<title>`-element aan, vervang "Document" door *Mijn museum*.

Koppel het `style.css`-bestand aan je HTML-document door de volgende regel toe te voegen in de `<head>` van je HTML-document:

`<link rel="stylesheet" href="style.css">` ofwel `link:css` met de Emmet-shortcut.

### Header met titel en navigatie

Voeg een header met titel en navigatie toe. De titel linkt naar de hoofdpagina, de navigatie linkt naar de verschillende themapagina's.

Binnen het `<body>`-element typ je **`header>h1>a`** en druk je op Enter. Deze Emmet-combinatie genereert een `<header>` met een `<h1>`-koptitel waarin een `<a>`-element zit. Plaats tussen de opening en afsluiting van het `<a>`-element de titel van je website, bij de waarde van `href` typ je `"index.html"`.

Onder de `<h1>`-titel maak je een navigatie met minimaal drie linkjes. Dit kan je doen met Emmet aan de hand van de combinatie **`nav>a*3`**. Druk na het typen op Enter. Met deze shortcut maak je binnen de `<nav>`-tag in één keer drie `<a>`-elementen aan.

```html
nav>a*3 → <nav><a href=""></a><a href=""></a><a href=""></a></nav>
```

Tussen elk anker-element plaats je de naam van het thema, elke `href` verwijst naar desbetreffende pagina/document. Bijvoorbeeld: `href="thema1.html"`.

### CSS voor body en header

Maak in het `style.css`-bestand een CSS-selector voor de `body`. Stel hierin minimaal de achtergrondkleur, tekstkleur en het lettertype in. Dit bepaalt de algemene stijl van je website.

```css
body {
  background-color: ...;
  color: ...;
  font-family: ...;
}
```

Voor de `header` maak je ook een CSS-selector. Pas de `margin` en `padding` aan en geef, indien gewenst, een andere achtergrondkleur.

```css
header {
  margin: ...;
  padding: ...;
  background-color: ...;
}
```

Gebruik eens percentages in plaats van pixels voor `margin` en `padding`. Bijvoorbeeld, door de padding in te stellen op `5%`, wordt de afstand aangepast aan de grootte van het scherm. Dit zorgt ervoor dat je website meteen meer responsive is. Probeer het effect zelf uit: verklein het venster en kijk hoe de layout verandert.

Een kleine demonstratie die het verschil tussen pixels en percenten aantoont:

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/azoEpGm" height="560" >}}

### CSS flexbox voor navigatie

Flexbox is perfect voor één-dimensionale layouts (rij OF kolom).

Gebruik in `style.css` flexbox om de navigatiebalk te stijlen. Dit zorgt ervoor dat de links overzichtelijk naast elkaar worden weergegeven en voldoende ruimte tussen elkaar hebben.

Hiermee maak je de navigatie een flex-container. De gap zorgt voor ruimte tussen de links.

```css
nav {
  display: flex;
  gap: 16px;
}
```

Nu kan je van de navigatie-links eenvoudig knoppen maken.

```css
nav a {
  padding: 16px;
  background-color: ...;
  color: ...;
  text-decoration: none;
}

nav a:hover {
  background-color: ...;
}
```

Deze regels voegen een achtergrondkleur en padding toe aan de links, maken de tekst goed leesbaar en verwijderen de standaard onderstreping (`text-decoration: none;`). 

Met de hover-stijl kun je subtiel de achtergrondkleur veranderen wanneer de muis over de link beweegt. Dit is een duidelijke manier om de gebruiker te laten weten dat het een klikbare link is.

### Typografie

Standaard lettertypes zijn functioneel, maar ook wat beperkt. Geef je museum meer sfeer door een passend lettertype te kiezen via **Adobe Fonts**.

1. Ga naar [Adobe Fonts](https://fonts.adobe.com/) en zoek een lettertype dat past bij jouw museum.
2. Klik op **Add to Web Project** en maak een nieuw project aan.
3. Kopieer de `<link>`-code of `@import`-code.
  - Bij `<link>`: Plak dit in de `<head>` van al je HTML-pagina's.
  - Bij `@import`: Plak dit helemaal bovenaan in je `style.css`.

Gebruik nu de verkregen `font-family` code in je CSS, doet dit best bij de `body`-selector zodanig dat het lettertype voor de volledige website geldt.

```css
body {
  font-family: "jouw-gekozen-font", sans-serif;
}
```

### De main en footer

Maak in `index.html` een main-element onder de `</header>`. Voeg daarin een `<section>`-element aan toe. 

Binnen dit nieuwe `<section>`-onderdeel voeg je een `<h2>`-kop, een `<p>`-paragraaf en een `<img>`-afbeelding toe. Vul de kop en paragraaf in met een welkomsboodschap. Voeg een afbeeldingspad toe, bijvoorbeeld: `src="images/welkom.jpg"`.

Voeg eveneens een `<footer>`-element toe, onder de `</main>`. Binnenin dit `<footer>`-element voeg je een `<p>`-element toe met jouw naam en jaartal.

Een footer is een vast onderdeel van je website dat onderaan elke pagina verschijnt. Het wordt vaak gebruikt om contactgegevens, links naar sociale media, copyrightinformatie en andere nuttige links weer te geven.

## Themapagina's

Open `thema1.html` in Visual Studio Code en kopieer alles uit `index.html` als basis voor je eerste thema.

Pas in deze pagina het `<title>`-element aan: *Mijn Museum - Thema 1*.

In plaats van de inhoud binnen de section van de hoofdpagina voeg je telkens een galerij toe.

Je maakt binnen de section telkens een `<div>`-element. Een `<div>` dient om inhoud van elkaar te verdelen, denk aan het Engels *to divide*. 

Geef deze `<div>` de klasse `class="galerij"`. 

Nog eenvoudiger: met Emmet kun je in Visual Studio Code eenvoudig `.galerij` typen en op Enter drukken en dan geeft Emmet je meteen:

```html
.galerij → <div class="galerij"></div>
```

### CSS grid voor galerijen

In dit onderdeel gebruik je CSS Grid om je galerijen te maken. Grid (ofwel raster) werkt perfect voor layouts die zowel rijen als kolommen bevatten, zoals een galerij.

De galerij wordt gedefinieerd met de `.galerij`-class.

```css
.galerij {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}
```

**display: grid;**: Dit verandert de container in een grid, waarmee je items in rijen en kolommen kunt organiseren.
**grid-template-columns: 1fr 1fr;**: De container wordt verdeeld in twee gelijke kolommen. De waarde 1fr betekent "1 fractie van de beschikbare ruimte".
**gap: 32px;**: Voegt een afstand van 32px toe tussen de items.

Vergeet niet je afbeeldingen een maximum-breedte van 100% te geven!

```css
img {
  max-width: 100%;
}
```

Herhaal dit proces en experimenteer voor `thema2.html` en `thema3.html`, met unieke inhoud per pagina. Zoek naar nieuwe manieren om je thema's voor te stellen.

## Mobiele weergave (media queries)

Op een computerscherm staan je galerij-items netjes naast elkaar in twee kolommen. Maar op een smal scherm van een telefoon wordt dit al snel te krap.

Om dit op te lossen gebruiken we **media queries**. Hiermee kan je CSS-regels toepassen die *alleen* gelden als het scherm kleiner is dan een bepaalde breedte (bijvoorbeeld 600px).

Voeg dit onderaan je `style.css` toe:

```css
@media (max-width: 600px) {
  .galerij {
    grid-template-columns: 1fr;
  }
}
```

Zodra het scherm smaller is dan 600 pixels, verandert de grid van 2 kolommen (`1fr 1fr`) naar 1 kolom (`1fr`). Hierdoor komen de items op mobiel mooi onder elkaar te staan. Probeer het uit door je browservenster smal te maken.

## Indienen

Zorg dat in de map `VoornaamA_MijnMuseum` de volgende bestanden zitten:

* `index.html`
* `thema1.html`
* `thema2.html`
* `thema3.html`
* `style.css`
* een map `images` met alle gebruikte afbeeldingen

Plaats de map `VoornaamA_MijnMuseum` in je vakmap voor Webontwikkeling op OneDrive.

Zorg voor een koppeling naar je volledige vakmap in je OneDrive bij de opdracht in Google Classroom.

## Puntenverdeling

- **Structuur (08)** Correcte bestandsnamen en mapstructuur. `index.html`, drie thema's, `style.css`, map met afbeeldingen (min. 12).
- **Navigatie (08)** Werkende navigatielinks en dezelfde header op elke pagina.
- **HTML (20)** Correct gebruik van header, main, footer, section, h1-6, p, img/iframe en div met class voor de galerij.
- **CSS (20)** Gebruik van flexbox, grid en consistentie in stijlen. Minimaal acht selectors, eigenschappen (background-color, color, font-family, margin, padding, width, display:flex, display:grid, grid-template-columns, gap).

## Veelvoorkomende fouten

- Foutieve HTML-nesting.
- Niet werkende navigatielinks.
- Onjuiste mapstructuur of mediapaden.
- Geen gebruik van grid of flexbox.
- Inconsistente stijlen tussen pagina's.