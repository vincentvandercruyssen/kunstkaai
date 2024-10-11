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
2. Schakel indien nodig **split view** in, zodat je tegelijkertijd de HTML- en CSS-code kunt bekijken.
3. Gebruik in je HTML de elementen: `<body>`, `<header>`, `<h1>`, `<h2>`, `<p>`, `<section>`, `<img>`, en `<ul>`.
4. Geef deze elementen een passende kleur en stijl met CSS.

### Stijlen toepassen

Selecteer het `body`-element en geef het een passende achtergrondkleur met een kleurnaam of hexadecimale kleurwaarde. Stel een nieuwe `font-family` in en zet de `margin` op 0.

{{< showcode >}}body {
    background-color: #f4f4f4;
    font-family: 'Arial', sans-serif;
    margin: 0;
}

{{< /showcode >}}

Selecteer het `h1`-element en geef het een kleur. Pas hetzelfde toe voor `h2`-elementen.

{{< showcode >}}h1 {
    color: #333333;
}

{{< /showcode >}}

Gebruik **id-selectors** om elke `section` in jouw pagina anders te stylen. Voeg id-attributen toe in je HTML, bijvoorbeeld: `<section id="cast">`. In je **style.css**-bestand kun je deze sectie als volgt stylen:

{{< showcode >}}#cast {
    background-color: #e0f7fa;
    padding: 20px;
}

{{< /showcode >}}

### Afbeeldingen en lay-out

Selecteer het `img`-element en zorg ervoor dat de afbeeldingen netjes worden weergegeven door de breedte te specificeren en marges toe te voegen.

{{< showcode >}}img {
    width: 100%;
    max-width: 300px;
    margin-bottom: 10px;
}

{{< /showcode >}}

### Inleveren

Je levert de volgende bestanden in:

1. **index.html** en **style.css**.
2. Afbeeldingen in de map **images**.
3. Organiseer alles in één map.
4. Maak een zip-bestand van je map en hernoem het naar **voornaam_filmofserie.zip**.
5. Log in op **Google Classroom**.
6. Upload de gezipte map bij de opdracht in **3GT Webontwikkeling**.

## Puntenverdeling

{{< table_layoutfixed >}}
|                                                    |                                                             |
|----------------------------------------------------|-------------------------------------------------------------|
| **Folderstructuur en bestandsnamen (02)**          | **CSS Selectors (06)**                                      |
| • voornaam_filmofserie.zip met index.html en style.css | • body • h1 • h2 • p • section • id-selector                |
| **Elementen document (04)**                        | **CSS Properties (06)**                                     |
| • html • head • link-element naar CSS • body       | • background-color • color • font-family • margin • padding |
| **Elementen inhoudsverdeling (04)**                | **Afbeelding stijl (02)**                                   |
| • header • main met section(s) en id-selectors     | • img-styling • padding/margin rond afbeeldingen            |

## Veelvoorkomende fouten

1. Geen externe CSS correct gekoppeld.
2. Fout bij het gebruik van `id`-selectors in CSS.
3. Onjuiste mapstructuur of bestandspaden.
4. Stijlregels zoals kleur of achtergrondkleur verkeerd toegepast.
5. Geen onderscheid tussen verschillende sections met CSS.
6. Zipbestand niet correct ingeleverd of verkeerd benoemd.
7. Verkeerd gebruik van margins en padding voor visuele opmaak.