+++
title = 'Opdracht: Recept (CSS)'
date = 2024-10-20T08:00:00-07:00
draft = false
aliases = ["/web/opdracht-4-05-recept-css/"]
+++

## Opgave

In deze opdracht ga CSS toepassen op de HTML-pagina van het recept dat je eerder hebt aangemaakt, om het zo vorm te geven. Het doel is om basiskennis van CSS-selectors en eigenschappen toe te passen om de opmaak van de pagina te verbeteren.

### Organiseer je project

- **Voeg een CSS-bestand toe**: Binnen dezelfde projectmap waar je eerder het bestand `index.html` hebt gemaakt, maak je een nieuw bestand aan genaamd `style.css`.
- **Link naar CSS**: Voeg in de `<head>` van je index.html een `link`-element toe dat verwijst naar je CSS-bestand.

### Basis CSS

- **Stel de achtergrondkleur van de body in**: Gebruik de `background-color`-eigenschap om een achtergrondkleur voor de hele pagina te kiezen.
- **Pas lettertypes aan**: Gebruik de `font-family`-eigenschap om een geschikt lettertype voor de gehele pagina te definiëren.
- **Margin en padding**: Zorg ervoor dat er consistentie is in de uitlijning en afstand tussen elementen met behulp van `margin` en `padding`.

### Selectors en opmaak

- **`body`**: Stel de `background-color`, `font-family` en `color` van de body in.
- **`header`**: Gebruik een selector voor het `header`-element om een achtergrondkleur of rand toe te voegen. Stel ook de `padding` in voor wat extra ruimte binnen het element.
- **`h1`**: Definieer de opmaak voor het `h1`-element, bijvoorbeeld door de `font-size` aan te passen en een `color` te definiëren.
- **`section` en `id`-selectors**: Geef specifieke stijlen aan de `section`-elementen, bijvoorbeeld een achtergrondkleur of margin. Voor minstens één section gebruik je een `id`-selector om unieke stijlen toe te passen.

### CSS eigenschappen

- **Kleuren**: Gebruik de `background-color` en `color`-eigenschappen om de visuele hiërarchie te verbeteren.
- **Afstanden**: Pas `margin` en `padding` toe om ruimte rond en binnen de elementen te creëren.
- **Lettertypes**: Gebruik `font-family` om consistentie in de typografie te waarborgen.
- **Links en Hover**: Voor links gebruik je de `a`-selector om de standaard opmaak van hyperlinks te definiëren, zoals de kleur en het wel of niet onderstrepen van de tekst met de eigenschap `text-decoration`. Voeg ook een `a:hover`-selector toe om de stijl van de link te veranderen wanneer een gebruiker met de muis over de link beweegt. Bijvoorbeeld, je kunt de kleur veranderen met de eigenschap `color`, of de onderstreping verwijderen door `text-decoration: none;` toe te passen bij hover. Dit zorgt voor een interactieve ervaring.

## Indienen

Je levert de volgende bestanden in:

1. **index.html** en **style.css**.
2. Afbeeldingen in de map **images**.
3. Organiseer alles in één map.
4. Maak een zip-bestand van je **recept**-map en hernoem het naar **recept overmij.zip**.
5. Log in op **Google Classroom**.
6. Upload de gezipte map bij de juiste opdracht in **4GT Webontwikkeling**.

## Puntenverdeling

- **Structuur (05)** `voornaam gerecht.zip` met `index.html`, `style.css` en één map met afbeeldingen.
- **Elementen document (04)** `html`, `head` met `title` en `link` naar CSS-bestand, `body`.
- **Elementen inhoudsverdeling (06)** `header`, `main` met min. drie `section`-elementen, min. één `section` met `id`-kenmerk.
- **CSS selectors (07)** `body`, `header`, `h1` of `h2`, `section`, `id`-selector, `a`, `:hover`.
- **CSS eigenschappen (06)** `background-color`, `color`, `font-family`, `margin`, `padding`, `text-decoration`.

## Veelvoorkomende fouten

1. Geen externe CSS correct gekoppeld.
2. Fout bij het gebruik van `id`-selectors in CSS.
3. Onjuiste mapstructuur of bestandspaden.
4. Stijlregels zoals kleur of achtergrondkleur verkeerd toegepast.
5. Geen onderscheid tussen verschillende sections met CSS.
6. Zipbestand niet correct ingeleverd of verkeerd benoemd.
7. Verkeerd gebruik van margins en padding voor visuele opmaak.