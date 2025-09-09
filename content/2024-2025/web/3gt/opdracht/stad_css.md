+++
title = 'Opdracht: Stad (CSS)'
date = 2024-11-20T08:00:00-07:00
draft = false
aliases = ["/web/opdracht-3-05-stad-css/"]
+++

## Opgave

Deze opdracht leert je hoe je CSS kunt gebruiken om je HTML-pagina over een stad visueel aantrekkelijk te maken. Je oefent het toepassen van basis CSS-selectors en eigenschappen om de opmaak van je website te verbeteren.

### Organiseer je project

- **Voeg een CSS-bestand toe**: Maak binnen dezelfde map als je HTML-bestand een nieuw bestand aan genaamd `style.css`.
- **Link CSS aan HTML**: Voeg in het `<head>`-element van je `index.html` een `<link>`-element toe dat verwijst naar het CSS-bestand.

### Basisopmaak

- Stel voor de `body` een achtergrondkleur en tekstkleur in met `background-color` en `color`.
- Gebruik de eigenschap `font-family` om een lettertype te kiezen voor de hele pagina.

Bijvoorbeeld:

{{< showcode >}}body {
  background-color: #f0f0f0;
  color: #123456;
  font-family: Arial, sans-serif;
}

{{< /showcode >}}

### Opmaak per element

- **`header`**: Geef het `header`-element een opvallende achtergrondkleur en stel een `padding` in voor extra ruimte.
- **`h1` en `h2`**: Pas bijvoorbeeld de grootte en kleur van de kopteksten aan met `font-size` en `color`.
- **`section`**: Voeg een andere achtergrondkleur of rand toe aan de `section`-elementen en gebruik `margin` en `padding` om de onderdelen beter te scheiden.

### Gebruik van id-kenmerk

- **Unieke stijlen**: Gebruik een `id`-selector voor één specifieke `section` (bijvoorbeeld de "Bezienswaardigheden") en geef het een unieke stijl, zoals een andere achtergrondkleur of rand.

### Details verbeteren

- **Hyperlinks**: Stijl links met `text-decoration` en `color`, en gebruik een `:hover`-selector voor interactieve effecten.

Je kan ook:

- **Afbeeldingen**: Stel een `width` in voor afbeeldingen en voeg een rand toe met de eigenschap `border`.
- **Lijsten**: Gebruik `list-style-type` om het type opsommingstekens aan te passen (bijvoorbeeld `circle` of `square`).
- ...

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/ExqqyzZ" height="320" >}}

## Indienen

- **Bestanden organiseren**: Zorg dat je een correcte mapstructuur hebt: - Een `index.html` in de hoofdmap. - Een `style.css` in de hoofdmap. - Afbeeldingen in de map `images`.
- **Zip-bestand**: Maak een zip-bestand van je projectmap (bijvoorbeeld `voornaam_land.zip`).
- **Google Classroom**: Upload het bestand in de juiste opdracht.

## Puntenverdeling

- **Structuur (05)** `voornaam_land.zip` met `index.html`, `style.css` en één map met afbeeldingen.
- **Elementen document (04)** `html`, `head` met `title` en `link` naar CSS-bestand, `body`.
- **Elementen inhoudsverdeling (06)** `header`, `main` met min. drie `section`-elementen, min. één `section` met `id`-kenmerk.
- **CSS selectors (07)** `body`, `header`, `h1` of `h2`, `section`, `id`-selector, `a`, `:hover`.
- **CSS eigenschappen (06)** `background-color`, `color`, `font-family`, `margin`, `padding`, `text-decoration`.

## Veelvoorkomende fouten

1. Geen link naar CSS in het `<head>`-element.
2. Fout bij het gebruik van `id`-selectors in CSS.
3. Onjuiste mapstructuur of bestandspaden.
4. Stijlregels zoals kleur of achtergrondkleur verkeerd toegepast.
5. Geen onderscheid tussen verschillende sections met CSS.
6. Zipbestand niet correct ingeleverd of verkeerd benoemd.
7. Verkeerd gebruik van margins en padding voor visuele opmaak.