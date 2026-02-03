+++
title = 'Opdracht: Polaroid'
date = 2026-01-19T00:00:00Z
draft = false
+++

## Opgave

Lang voordat de digitale fotografie werd uitgevonden, was het Polaroid-fototoestel één van de manieren om het resultaat van een foto meteen te kunnen zien. 

In deze opdracht ga je een webpagina maken die een verzameling Polaroid-foto's weergeeft. Elke Polaroid heeft een vierkante afbeelding, omringd door de kenmerkende witte rand en een onderzijde waar je tekst op toevoegt. De Polaroid-foto's (minimaal negen) positioneer je op een levendige manier op de pagina. Je doet dit aan de hand van `position: absolute`. 

Je Polaroid-kaders stel je tentoon op een unieke achtergrond. 

{{< pinboard url="https://www.pinterest.com/vincentvandercruyssen/polaroid-css/" >}}

## Voorbereiding

Maak een nieuwe map aan in je map voor webontwikkeling in je OneDrive, genaamd `VoornaamA_Polaroid`. Open deze map in Visual Studio Code, klik in Visual Studio Code op *File > Open Folder* en selecteer jouw map.

Maak in de map de volgende bestanden aan:
- `index.html`
- `style.css`

Maak ook een nieuwe map aan, genaamd `images`. In deze map sla je alle afbeeldingen op die je gaat gebruiken:

- Minimaal 9 foto's voor je Polaroid-kaders (`foto01.jpg` t/m `foto09.jpg`).
- Een textuur voor de achtergrond (`textuur-achtergrond.jpg`).

## Bouw de hoofdpagina

Open `index.html` in Visual Studio Code. Maak de basis HTML-structuur aan met Emmet aan de hand van `!` (uitroepteken). 

Pas het `<title>`-element aan met een treffende titel. Voeg de link naar je stylesheet toe. 

Tussen de `body` maak je voor elke Polaroid-foto een div-element met de klasse "polaroid" en een uniek ID (bijvoorbeeld `polaroid_01`, `polaroid_02`, `polaroid_03`,...). 

In deze div-elementen plaats je telkens:

- Een `<img>`-element met een originele foto, de grootte hiervan zul je aanpassen met CSS.
- Een `<h3>`-element met een titel of beschrijving. 

Emmet-shortcut: `(.polaroid#polaroid_$$>img+h3)*9`

## CSS styling

### Polaroid breedte

Momenteel worden de polaroid-kaders onder elkaar weergegeven met afbeeldingen in verschillende formaten. Om dit aan te passen, begin je met het instellen van een vaste breedte voor de polaroid-klasse.

Open je CSS-bestand en selecteer de polaroid-klasse aan de hand van `.polaroid {}`. Voeg vervolgens de eigenschap `width` toe en stel deze in op `200px`. 

Er lijkt momenteel nog niets te veranderen, dit komt doordat de afbeeldingen uit de polaroid-kaders weten te ontsnappen. 

{{< img src="/img/web/opdracht-4-08-polaroid-breedte1.png" percent="55" >}}

Selecteer de polaroid-afbeeldingen met `.polaroid img {}`. Laat de afbeeldingen de volledige breedte van de polaroid-kaders innemen door de eigenschap `width` in te stellen op `100%`. 

### Lettertype

Onder elke Polaroid-foto hoort natuurlijk een tekstje, je immiteert de handgeschreven stijl door een gepast lettertype te zoeken.

Dit doe je bijvoorbeeld door gebruik te maken van [Adobe Fonts](https://fonts.adobe.com/). Daar kun je gemakkelijk lettertypes sorteren op Handgeschreven (Handwritten).

{{< img src="/img/web/opdracht-4-08-polaroid-font1.png" percent="50" >}}

Zoek een lettertype dat je inspireert. Klik bovenaan de pagina van je gekozen lettertype op de knop **Add to Web Project**.

{{< img src="/img/web/opdracht-4-08-polaroid-adobefonts1.png" percent="80" >}}

In het venster dat verschijnt, maak je een nieuw project aan met het dropdown-menu. 
Je kunt meerdere lettertypes aan je webproject toevoegen.

Kopieer de koppeling naar het CSS-bestand van jouw webproject naar je eigen HTML-document in het `<head>`-element. Of gebruik de `@import`-regel en plak deze bovenaan in je CSS-bestand, let er op een `@import`-regel moet altijd bovenaan het CSS-bestand staan.

Dit CSS-bestand is uniek voor jouw webproject, telkens je een lettertype aan je project toevoegt wordt het CSS-bestand aangevuld. 

| | |
|-|-|
|{{< img src="/img/web/opdracht-4-08-polaroid-adobefonts2.png" width="1400" >}}|{{< img src="/img/web/opdracht-4-08-polaroid-adobefonts3.png" width="1400" >}}|

Nu kun je de `font-family` eigenschap met bijbehorend lettertype kopiëren. Dit plak je uiteraard in de selector voor je `body {}`, zo verander je het lettertype over je gehele webpagina. 

Een andere optie is een lettertype te downloaden en gebruik te maken van de regel `@font-face`. Meer informatie daarover [vind je hier](/kunstkaai/2025-2026/web/cursus/css/#font-face). Zorg er dan wel voor dat je het lettertype in een aparte map opslaat (bijvoorbeeld `fonts`).

### Positionering

Uiteraard wil je nu de individuele plaatsen van de verschillende polaroid-kaders veranderen. In de selector die je eerder aanmaakte voor je polaroid-kaders `.polaroid {}` gebruik je de eigenschap `position` en stel je deze in op `absolute`. 

Geef elke Polaroid-kader een unieke positie. Je spreekt de unieke identiteiten aan met bijvoorbeeld `#polaroid_01 {}`. 
- Voeg de eigenschappen `top` en `left` toe en geef ze verscheidene waarden in percentages. 
- Roteer aan de hand van de eigenschap `rotate` met een waarde in `deg`. 
- Verander eventueel de eigenschap `z-index`, door een waarde hoger dan `0` in te stellen kun je ervoor zorgen dat een element boven een ander element op de pagina wordt weergegeven. 

Bronnen via MDN: [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position), [rotate](https://developer.mozilla.org/en-US/docs/Web/CSS/rotate), [z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index).

### Achtergrond

Style de body met een achtergrondafbeelding die het hele scherm bedekt. Gebruik hiervoor:

- `background-image: url("images/...");`
- `background-size: cover;`

Centreren doe je aan de hand van `background-position: center;`. 

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/RwjNrbN" height="440" >}}

### Polaroid stijl

Extra eigenschappen voor de `.polaroid` klasse:
- Gebroken witte achtergrond met subtiele schaduw.
- Padding voor de Polaroid-rand.
- Gecentreerde tekst.

Style de afbeeldingen binnen de Polaroids met:
- 1:1 aspect ratio.
- Object-fit en object-position voor de juiste uitsnede.
- Filtereffecten voor een vintage look. 

Bronnen via MDN: [box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow), [aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio), [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit), [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position), [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter).

### Box-sizing

Stel de box-sizing in voor alle polaroid-elementen met border-box. Dit zal er voor zorgen dat de padding geen invloed heeft op de breedte van je Polaroid-kaders. 

{{< showcode >}}.polaroid {
    box-sizing: border-box;
}

{{< /showcode >}}

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/rNYBwXP" height="548" >}}

## Indienen

Zorg dat in de map `VoornaamA_Polaroid` de volgende bestanden zitten:
- `index.html`
- `style.css`
- Map `images` met alle gebruikte afbeeldingen.

De map `VoornaamA_Polaroid` zit in je vakmap voor Webontwikkeling op OneDrive. 

Zorg voor een koppeling naar je volledige vakmap in je OneDrive bij de opdracht in Google Classroom.

## Puntenverdeling

- **Structuur (05)** Correcte bestandsnamen en mapstructuur, `index.html`, `style.css`, map met hernoemde afbeeldingen.
- **HTML (12)** Correct gebruik van elementen en kenmerken, `html`, `title` en `link`, `body`, 9 x `div`, `img`, `h#`, `class`, `id`, `src`.
- **CSS Basis (05)** Extern lettertype, algemene styling, `body`, `background-image`, `background-size`, `font-family`.
- **CSS Polaroid (07)** Styling van de Polaroid-elementen, `.polaroid`, `position`, `width`, `background-color`, `padding`, `box-shadow`, `text-align`.
- **CSS Positionering (03)** Plaatsing en rotatie van minimaal negen Polaroids met id-selector.
- **CSS Afbeeldingen (05)** Juiste verwerking en styling van foto's met specifieke selector, `width`, `aspect-ratio`, `object-fit`, `filter`.

## Veelvoorkomende fouten

- Foutieve HTML-nesting.
- Niet werkende navigatielinks.
- Onjuiste mapstructuur of mediapaden.
- Verkeerde aspect ratio van afbeeldingen.
- Onjuiste positionering van Polaroids.
- Ontbrekende transformaties of schaduweffecten.
- Niet-werkende lettertype-import.