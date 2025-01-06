+++
title = 'Opdracht: Mijn museum'
date = 2025-01-05T08:00:00-07:00
draft = false
+++

## Opgave

In deze opdracht maak je een website genaamd **Mijn museum**, waarin je drie persoonlijke thema's tentoonstelt. Elk thema of object krijgt een eigen pagina met beschrijvingen, media en een galerij. 

Je herhaalt wat je geleerd hebt over HTML, CSS, navigatie en structuur, terwijl je nieuwe moderne layouttechnieken toepast. Succes met het bouwen van jouw digitale museum!

### Voorbereiding

Maak een nieuwe map aan op je computer, genaamd `voornaam museum`. Open deze map in Visual Studio Code: Klik in VSC op *File > Open Folder* en selecteer jouw map.

Maak in de map de volgende bestanden aan:
- `index.html` (voor de hoofdpagina).
- `thema1.html`, `thema2.html`, `thema3.html` (voor de themapagina's).
- `style.css` (voor de opmaak van alle pagina's).

Maak ook een nieuwe map aan, genaamd `images`. Hierin sla je alle afbeeldingen op die je wilt gebruiken.

### Bouw de hoofdpagina

Open `index.html` in VSC. Typ `!` en druk op Enter. Dit is de Emmet-shortcut die de basisstructuur van een HTML-document genereert.

Pas het `<title>`-element aan: Vervang "Document" door *Mijn museum*.

Voeg een header met titel en navigatie toe: 
- In de `<body>` typ je **`header>h1>a`** en druk op Enter. Dit genereert een `<header>` met een `<h1>` waarin een link zit. Plaats tussen het anker-element de titel van je website, de waarde van `href` is `index.html`. 
- Onder de titel maken we een navigatie met minimaal drie linkjes. Dit kan met Emmet aan de hand van de combinatie **`nav>a*3`**. Tussen elk anker-element plaats je de naam van het thema, elke `href` verwijst naar desbetreffende pagina. 

### CSS voor body en header

Maak in het `style.css`-bestand een CSS-selector voor de `body`. Stel hierin minimaal de achtergrondkleur, tekstkleur en het lettertype in. Dit bepaalt de algemene stijl van je website.

Voor de `header` maak je ook een CSS-selector. Pas de `margin` en `padding` aan en geef, indien gewenst, een andere achtergrondkleur. 

Gebruik percentages in plaats van pixels voor `margin` en `padding`. Bijvoorbeeld, door de padding in te stellen op `5%`, wordt de afstand aangepast aan de grootte van het scherm. Dit zorgt ervoor dat je website meteen meer responsive is. Probeer het effect zelf uit: verklein het venster en kijk hoe de layout verandert.

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/azoEpGm" height="560" >}}

### De main en footer van de hoofdpagina

Maak in `index.html` een main-element onder de `</header>`. Voeg een `<section>` toe en binnen de section: een `<h2>`-kop, een paragraaf en een afbeelding. Vul de kop en paragraaf in met een welkomsboodschap. Voeg een afbeeldingspad toe, bijvoorbeeld: `images/welkom.jpg`.

Voeg eveneens een `footer` toe, onder de `</main>`: typ `footer>p` en druk op Enter. Vul het `<p>`-element in met jouw naam en jaartal.

### Themapagina's

Open `thema1.html` in VSC en kopieer alles uit `index.html` als basis voor je eerste thema. 
Pas het `<title>`-element aan: *Mijn Museum - Thema 1*.

In plaats van de 

4. **Voeg een main-element toe**:
   - Typ `main>section>h2+p+div.galerij-grid>img*3` en druk op Enter. Dit genereert:
     - Een `<section>` met een kop, een beschrijving en een galerij.
     - Binnen de galerij (`div.galerij-grid`) staan drie afbeeldingen.
   - Vul de kop en beschrijving in. Verwijs de afbeeldingen naar bestanden in jouw `images`-map, zoals `images/thema1-1.jpg`.
5. **Footer kopiëren**:
   - Kopieer de footer van `index.html` en plak deze onderaan in `thema1.html`.
6. Herhaal dit proces voor `thema2.html` en `thema3.html`, met unieke inhoud per pagina.

### CSS galerijen


## Indienen

Mapnaam: `voornaam museum` met HTML-bestanden: `index.html`, `thema1.html`, `thema2.html`, `thema3.html`, CSS-bestand: `style.css` en map `images` voor mediabestanden.
Maak één zip-bestand van de map. Lever in via Google Classroom.

## Puntenverdeling

- **Structuur (06)**: Correcte bestandsnamen en mapstructuur.
- **Navigatie (06)**: Werkende navigatielinks op elke pagina.
- **HTML-elementen (08)**: Correct gebruik van header, main, footer en section.
- **CSS (08)**: Gebruik van flexbox, grid en consistentie in stijlen.
- **Creativiteit (02)**: Originele thema’s en visuele presentatie.

## Veelvoorkomende fouten

1. Niet werkende navigatielinks.
2. Onjuiste mapstructuur of mediapaden.
3. Geen gebruik van grid of flexbox.
4. Inconsistente stijlen tussen pagina's.
5. Foutieve HTML-nesting.