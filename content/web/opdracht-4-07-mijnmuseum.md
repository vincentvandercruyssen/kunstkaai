+++
title = 'Opdracht: Mijn museum'
date = 2025-01-05T08:00:00-07:00
draft = false
+++

## Opgave

In deze opdracht maak je een website genaamd **Mijn museum**, waarin je drie persoonlijke thema's (kunstwerken, technologie, historische items, muziek, films, favoriete boeken,...) tentoonstelt. Elk thema of object krijgt een eigen pagina met beschrijvingen, media en een galerij. 

Elke pagina bevat informatie over één object of thema, en alle pagina's zijn gekoppeld via dezelfde navigatiebalk.

Je herhaalt wat je geleerd hebt over HTML, CSS, navigatie en structuur, terwijl je nieuwe moderne layouttechnieken toepast. Succes met het bouwen van jouw digitale museum!

### Voorbereiding

Maak een nieuwe map aan op je computer in map voor webontwikkeling, genaamd `voornaam museum`. Open deze map in Visual Studio Code: Klik in Visual Studio Code op *File > Open Folder* en selecteer jouw map.

Maak in de map de volgende bestanden aan:
- `index.html` (voor de hoofdpagina).
- `thema1.html`, `thema2.html`, `thema3.html` (voor de themapagina's).
- `style.css` (voor de opmaak van alle pagina's).

Maak ook een nieuwe map aan, genaamd `images`. Hierin sla je alle afbeeldingen op die je wilt gebruiken.

### Bouw de hoofdpagina

Open `index.html` in Visual Studio Code en typ `!` (uitroepteken) en druk op Enter. Dit is de Emmet-shortcut die de basisstructuur van een HTML-document genereert.

Pas het `<title>`-element aan, vervang "Document" door *Mijn museum*.

Voeg een header met titel en navigatie toe: 
- In de `<body>` typ je **`header>h1>a`** en druk op Enter. Deze combinatie genereert een `<header>` met een `<h1>` waarin een `<a>`-element zit. Plaats tussen de opening en afsluiting van het anker-element de titel van je website, bij de waarde van `href` typ je `index.html`. 
- Onder de titel maak je een navigatie met minimaal drie linkjes. Dit kan met Emmet aan de hand van de combinatie **`nav>a*3`**. Tussen elk anker-element plaats je de naam van het thema, elke `href` verwijst naar desbetreffende pagina/document. 

### CSS voor body en header

Maak in het `style.css`-bestand een CSS-selector voor de `body`. Stel hierin minimaal de achtergrondkleur, tekstkleur en het lettertype in. Dit bepaalt de algemene stijl van je website.

`body { }`

Voor de `header` maak je ook een CSS-selector. Pas de `margin` en `padding` aan en geef, indien gewenst, een andere achtergrondkleur. 

`header { }`

Gebruik percentages in plaats van pixels voor `margin` en `padding`. Bijvoorbeeld, door de padding in te stellen op `5%`, wordt de afstand aangepast aan de grootte van het scherm. Dit zorgt ervoor dat je website meteen meer responsive is. Probeer het effect zelf uit: verklein het venster en kijk hoe de layout verandert.

Een kleine demonstratie die het verschil tussen pixels en percenten aantoont:

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/azoEpGm" height="560" >}}

### CSS flexbox voor navigatie

Flexbox is perfect voor één-dimensionale layouts (rij OF kolom). 

Gebruik in `style.css` flexbox om de navigatiebalk te stijlen. Dit zorgt ervoor dat de links overzichtelijk naast elkaar worden weergegeven en voldoende ruimte tussen elkaar hebben. 

Hiermee maak je de navigatie een flex-container. De gap zorgt voor ruimte tussen de links.

{{< showcode >}}nav {
  display: flex;
  gap: 16px;
}

{{< /showcode >}}

Nu kan je van de navigatie-links eenvoudig knoppen maken. 

{{< showcode >}}nav a {
  padding: 16px;
  background-color: #fffa;
  color: red;
  text-decoration: none;
}

nav a:hover {
  background-color: #fff4;
}

{{< /showcode >}}

Deze regels voegen een achtergrondkleur en padding toe aan de links, maken de tekst goed leesbaar en verwijderen de standaard onderstreping. Met de hover-stijl verandert de achtergrondkleur subtiel wanneer de muis over de link beweegt.

### De main en footer

Maak in `index.html` een main-element onder de `</header>`. Voeg een `<section>` toe. Binnen deze section voeg je een `<h2>`-kop, een paragraaf en een afbeelding toe. Vul de kop en paragraaf in met een welkomsboodschap. Voeg een afbeeldingspad toe, bijvoorbeeld: `images/welkom.jpg`.

Voeg eveneens een `footer` toe, onder de `</main>`: typ `footer>p` en druk op Enter. Vul het `<p>`-element in met jouw naam en jaartal.

### Themapaginas

Open `thema1.html` in Visual Studio Code en kopieer alles uit `index.html` als basis voor je eerste thema. 
Pas het `<title>`-element aan: *Mijn Museum - Thema 1*.

In plaats van de inhoud binnen de section van de hoofdpagina voeg je telkens een galerijtje toe. 

Je maakt binnen de section telkens een div-element (dit dient om inhoud van elkaar te verdelen, denk aan het Engels *to divide*) met de klasse `galerij`. 

Met Emmet kan je in Visual Studio Code eenvoudig `.galerij` typen en op Enter drukken en dan geeft Emmet je: 

`<div class="galerij"></div>`

### CSS grid voor galerijen

In dit deeltje gebruik je CSS Grid om je galerijen te maken. Grid werkt perfect voor layouts die zowel rijen als kolommen bevatten, zoals een galerij.

De galerij wordt gedefinieerd met de `.galerij`-class. 

{{< showcode >}}.galerij {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
}

{{< /showcode >}}

**display: grid;**: Dit verandert de container in een grid, waarmee je items in rijen en kolommen kunt organiseren.
**grid-template-columns: 1fr 1fr;**: De container wordt verdeeld in twee gelijke kolommen. De waarde 1fr betekent "1 fractie van de beschikbare ruimte".
**gap: 32px;**: Voegt een afstand van 32px toe tussen de items.

Vergeet niet je afbeeldingen een maximum-breedte van 100% te geven!

{{< showcode >}}img {
    max-width: 100%;
}

{{< /showcode >}}

Herhaal dit proces en experimenteer voor `thema2.html` en `thema3.html`, met unieke inhoud per pagina. Zoek naar nieuwe manieren om je thema's voor te stellen. 

## Indienen

Mapnaam: `voornaam museum` met HTML-bestanden: `index.html`, `thema1.html`, `thema2.html`, `thema3.html`, CSS-bestand: `style.css` en map `images` voor mediabestanden.
Maak één zip-bestand van de map. Lever in via Google Classroom.

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