+++
title = 'Opdracht: Polaroid'
date = 2025-01-27T08:00:00-07:00
draft = false
+++

## Opgave

Lang voordat digitale fotografie werd uitgevonden, was het Polaroid-fototoestel één van de manieren om het resultaat van een foto meteen te kunnen zien. 

In deze opdracht ga je een webpagina maken die een verzameling Polaroid-foto's weergeeft. Elke Polaroid heeft een vierkante afbeelding, omringd door de kenmerkende witte rand en een onderzijde waar je tekst op toevoegt. De Polaroid-foto's (minimaal negen) positioneer je op een levendige manier op de pagina. Je doet dit aan de hand van `position: absolute`.

{{< pinboard url="https://www.pinterest.com/vincentvandercruyssen/polaroid-css/" >}}

## Voorbereiding

Maak een nieuwe map aan op je computer in de map voor webontwikkeling, genaamd `voornaam polaroid`. Open deze map in Visual Studio Code: Klik in Visual Studio Code op *File > Open Folder* en selecteer jouw map.

Maak in de map de volgende bestanden aan:
- `index.html`
- `style.css`

Maak ook een nieuwe map aan, genaamd `images`. Hierin sla je alle afbeeldingen op die je wilt gebruiken, waaronder:
- Een textuur voor de achtergrond (`textuur-achtergrond.jpg`).
- Minimaal 9 foto's voor je Polaroids (`foto01.jpg` t/m `foto09.jpg`).

## Bouw de hoofdpagina

Open `index.html` in Visual Studio Code. Maak de basis HTML-structuur aan met Emmet aan de hand van `!` (uitroepteken). Vergeet niet de link naar je stylesheet en het `<title>`-element aan te passen met een passende titel. 

Voor elke Polaroid-foto maak je een div-element met de class "polaroid" en een unieke ID (bijvoorbeeld "polaroid_01"). 

In deze div-elementen plaats je telkens:

- Een `<img>`-element met de foto (de grootte zul je aanpassen via CSS).
- Een `<h3>`-element met een titel of beschrijving. 

## CSS styling

### Lettertype

Begin met het importeren van een handgeschreven lettertype. Dit kan aan de hand van {{< a href="https://fonts.adobe.com/" text="Adobe Fonts" >}}. Zoek een lettertype en klik op de knop **Add to Web Project** op de pagina van je gekozen lettertype.

{{< img src="/img/web/opdracht-4-08-polaroid-adobefonts1.png" width="520" >}}

In het venster dat verschijnt, maak je een nieuw project aan. Kopieer vervolgens de `@import`-regel en plak deze bovenaan in je CSS-bestand. Nu kun je de `font-family` gebruiken welke je ook in hetzelfde venster aantreft. 

| | |
|-|-|
|{{< img src="/img/web/opdracht-4-08-polaroid-adobefonts2.png" width="1400" >}}|{{< img src="/img/web/opdracht-4-08-polaroid-adobefonts3.png" width="1400" >}}|

Een andere optie is een lettertype te downloaden en gebruik te maken van de regel `@font-face`. Meer informatie daarover {{< a href="https://www.w3schools.com/cssref/atrule_font-face.php" text="vind je hier" >}}. Zorg er dan wel voor dat je het lettertype in een aparte map opslaat. 

### Box-sizing

Stel de box-sizing in voor alle elementen met border-box. Dit zal er voor zorgen dat de padding geen invloed heeft op de breedte van onze Polaroid's. 

{{< showcode >}}* {
    box-sizing: border-box;
}

{{< /showcode >}}

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/rNYBwXP" height="548" >}}

### Achtergrond

Style de body met:
- Een relatieve positie.
- Minimale hoogte van 100vh.
- Een achtergrondafbeelding die het hele scherm bedekt.
- Het geïmporteerde lettertype.

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/RwjNrbN" height="440" >}}

### Polaroid

Maak een .polaroid class met:
- Absolute positionering.
- Vaste breedte (bv. 200px).
- Gebroken witte achtergrond met subtiele schaduw.
- Padding voor de Polaroid-rand.
- Gecentreerde tekst.

Style de afbeeldingen binnen de Polaroids met:
- 100% breedte.
- 1:1 aspect ratio.
- Object-fit en object-position voor de juiste uitsnede.
- Filtereffecten voor een vintage look.

### Positionering

Geef elk Polaroid-element een unieke positie met:
- Verschillende top en left waarden (in percentages).
- Een subtiele rotatie via transform: rotate().
- Overlappende z-indices waar nodig.

## Indienen

Mapnaam: `voornaam polaroid` met de volgende bestanden:
- `index.html`
- `style.css`
- Map `images` met alle gebruikte afbeeldingen.

Maak één zip-bestand van de map. Lever in via Google Classroom.

## Puntenverdeling

- **Structuur (05)**: Correcte bestandsnamen en mapstructuur.
- **HTML (05)**: Correct gebruik van elementen en attributen.
- **CSS Basis (05)**: Import, algemene styling en box model.
- **CSS Polaroid (10)**: Styling van de Polaroid-elementen.
- **Positionering (10)**: Correcte plaatsing en rotatie van Polaroids.
- **Afbeeldingen (05)**: Juiste verwerking en styling van foto's.

## Veelvoorkomende fouten

- Foutieve HTML-nesting.
- Niet werkende navigatielinks.
- Onjuiste mapstructuur of mediapaden.
- Verkeerde aspect ratio van afbeeldingen.
- Onjuiste positionering van Polaroids.
- Ontbrekende transformaties of schaduweffecten.
- Niet-werkende lettertype-import.