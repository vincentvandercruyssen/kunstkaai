+++
title = 'Opdracht: Film of Serie (CSS)'
date = 2024-10-10T08:00:00-07:00
draft = false
+++

## Omschrijving

Je gaat de webpagina die je hebt gemaakt voor de opdracht **Film of Serie (HTML)** vormgeven met behulp van **CSS**. In deze opdracht leer je hoe je externe stijlen en CSS-selectors kunt gebruiken om een goed gestructureerde en aantrekkelijk vormgegeven webpagina te maken.

Je maakte gebruik van **sections** om de verschillende onderdelen van je pagina te structureren. Je moet minimaal één section op een unieke manier vormgeven met behulp van **id-selectors** en het **id-attribute** in HTML.

## Stappenplan

Dit stappenplan begeleidt je stap voor stap bij het vormgeven van jouw film of serie-pagina met CSS. Je leert hoe je een externe stylesheet koppelt, stijlen toepast op HTML-elementen, en hoe je jouw werk correct inlevert.

### Bestandsstructuur

1. Open **Visual Studio Code**.
2. Open de map van jouw **Film of Serie**-project.
3. Maak een nieuw bestand aan in deze map met de naam **style.css**.
4. Open het bestand **index.html**.
5. Koppel het CSS-bestand aan jouw **index.html**-bestand door een `link`-element toe te voegen binnen het `<head>`-element.
6. Zorg ervoor dat het pad naar jouw **style.css**-bestand correct is.

### CSS toevoegen

1. Open het **style.css**-bestand.
2. Schakel **split view** in, zodat je tegelijkertijd de HTML- en CSS-code kunt bekijken.
3. Je hebt in je HTML de volgende elementen gebruikt: `<body>`, `<header>`, `<h1>`, `<h2>`, `<p>`, `<section>`, `<img>`, en `<ul>`.
4. Je kunt deze nu een passende stijl met CSS geven.

### Stijlen toepassen

Selecteer het `body`-element en geef het een achtergrondkleur met een kleurnaam of hexadecimale kleurwaarde. Stel een nieuwe `font-family` en `color` in.

{{< showcode >}}body {
    background-color: #f4e4f4;
}

{{< /showcode >}}

Selecteer het `h1`-element en geef het een kleur. Pas het ook toe voor `h2`-elementen.

{{< showcode >}}h1 {
    color: #333333;
}

{{< /showcode >}}

Geef de `section`-elementen een achtergrondkleur. Gebruik **id-selectors** om een `section` in jouw pagina anders te stylen. Voeg id-attributen toe in je HTML, bijvoorbeeld: `<section id="cast">`. In je **style.css**-bestand kun je deze sectie als volgt stylen:

{{< showcode >}}#cast {
    background-color: #e0f7fa;
    padding: 20px;
}

{{< /showcode >}}

Padding gebruik je om de inhoud van een element meer ruimte te geven binnen de rand, terwijl je margin gebruikt om afstand te creëren tussen het element en andere elementen op de pagina.

{{< img src="/img/web/cursus-css-box-model-1.png" width="1800" >}}

### Afbeeldingen

Selecteer het `img`-element en zorg ervoor dat de afbeeldingen netjes worden weergegeven door de breedte te specificeren en marges toe te voegen.

{{< showcode >}}img {
    width: 300px;
    margin-bottom: 10px;
}

{{< /showcode >}}

### Inleveren

Je levert de volgende bestanden in:

1. **index.html** en **style.css**.
2. Afbeeldingen in een aparte map.
3. Organiseer alles in één map.
4. Maak een zip-bestand van je map en hernoem het naar **voornaam_filmofserie.zip**.
5. Log in op **Google Classroom**.
6. Upload de gezipte map bij de opdracht in **3GT Webontwikkeling**.

## Puntenverdeling

- **Folderstructuur en bestandsnamen (05)** | voornaam_filmofserie.zip met index.html, style.css en map met afbeeldingen
- **Elementen document (04)** | html | head met title | link-element naar CSS | body
- **Elementen inhoudsverdeling (07)** | header | main met section(s) en id-selectors
- **CSS Selectors (05)** | body | h1 | h2 | section | id-selector
- **CSS Properties (05)** | background-color | color | font-family | margin | padding

## Veelvoorkomende fouten

1. Geen externe CSS correct gekoppeld.
2. Fout bij het gebruik van `id`-selectors in CSS.
3. Onjuiste mapstructuur of bestandspaden.
4. Stijlregels zoals kleur of achtergrondkleur verkeerd toegepast.
5. Geen onderscheid tussen verschillende sections met CSS.
6. Zipbestand niet correct ingeleverd of verkeerd benoemd.
7. Verkeerd gebruik van margins en padding voor visuele opmaak.