+++
title = 'Opdracht: Live share'
date = 2025-04-23T08:00:00-07:00
draft = false
+++

⚠️ Experimentele opdracht!

Met dank aan Amine en LLeyton…

## Opgave

In deze opdracht werk je in duo aan een website. Jullie kiezen samen een thema en bouwen elk **één individuele HTML-pagina**. Deze pagina’s worden samengebracht in **één gedeeld project**, met een **gezamenlijk gemaakte hoofdpagina** (`index.html`).

Jullie gebruiken **Live Share in Visual Studio Code** om samen in realtime aan het project te werken.

{{< img src="/img/web/opdracht-3-11-live_share-icon_1.png" percent="20" >}}

### Belangrijk

- **Eén gedeelde index-pagina (`index.html`)**: samen gemaakt, bevat een korte introductie over de site.
- **Twee individuele HTML-pagina’s**: elk van jullie maakt één pagina met eigen inhoud.
- Alle HTML-pagina’s (inclusief de index) hebben **dezelfde header en navigatie**, met dezelfde klasse-indeling.
- Alle pagina’s hebben een **gelijke structuur en vormgeving**.
- In de **footer van elke individuele pagina staat de voornaam van de maker**.
- In de **footer van de index-pagina staan beide voornamen**.

### Structuur

Maak in je OneDrive-map voor Webontwikkeling een map genaamd `Live share`. Deel en werk samen in deze map met je partner aan de hand van Liva Share (VSC Extensions).

Maak volgende bestanden/mappen aan:
   - `index.html` (gezamenlijke hoofdpagina)
   - `style.css` (voor de opmaak van alle pagina’s)
   - `jouw-naam.html` (jouw individuele pagina)
   - `partner-naam.html` (de pagina van je partner)
   - `images` (map voor afbeeldingen, indien nodig)

Gebruik Emmet (`!` uitroepteken) om een HTML-basisstructuur in te voegen.

Alle pagina’s gebruiken dezelfde structuur binnen de `<body>`:

```html
<header>...</header>
<main>
  <section>...</section>
  <section>...</section>
</main>
<footer>Gemaakt door [jouw naam]</footer>
```

> De structuur en vormgeving moeten op alle pagina’s exact overeenkomen.

### Thema

Kies samen een leuk en werkbaar thema. Enkele voorbeelden:

- Je favoriete dier
- Een fandom (serie, game, artiest)
- Een mini-receptensite (vegan, ontbijt, wereldkeuken …)
- Een stad of land dat je boeiend vindt
- Een lifestylepagina over boeken, muziek of mode
- . . .

De inhoud kies je zelf, zolang je structuur logisch blijft en je site er verzorgd uitziet.

### CSS-styling

- Gebruik één externe stylesheet (`style.css`)
- Zorg voor een **verzorgde en consistente vormgeving**: marges, lettertypes, kleuren, witruimte

## Indienen

Plaats de volledige map `Live share` in je `Webontwikkeling` OneDrive-map.

Deze map bevat:
- `index.html` (hoofdpagina, samen gemaakt)
- `style.css`
- `jouw-naam.html` en `partner-naam.html` (individuele pagina’s)
- eventueel een `images`-map

## Puntenverdeling

- **Structuur en samenwerking (06)** Correcte mappen en bestandsnamen, gedeeld via Live Share, samenwerking zichtbaar in één gedeeld project.
- **HTML (12)** Correcte opbouw van alle pagina’s met `header`, `main`, `section`-elementen, `footer`.
- **Navigatie (06)** Consistente navigatie op alle pagina’s.
- **Inhoud (08)** Gekozen thema uitgewerkt op alle pagina’s met logische structuur, duidelijke tekst, afbeeldingen en visueel verzorgde inhoud.
- **Footer en identificatie (02)** Duidelijke vermelding van wie welke pagina maakte, correcte voornamen in elke footer.
- **CSS (10)** Eén gedeeld stijlblad met verzorgde en consequente vormgeving: marges, lettertypes, kleuren, leesbaarheid.

## Veelvoorkomende fouten

- Geen samenwerking via Live Share
- Header of navigatie die afwijken tussen pagina’s
- Slordige of onsamenhangende structuur
- Onduidelijke taakverdeling of ontbrekende pagina’s
- Geen naam in de footer
- Geen gebruik van `<header>`, `<main>` met `<section>`'s, `<footer>`
- Slechte leesbaarheid of storende kleuren