+++
title = 'Opdracht: Over mij (CSS)'
date = 2025-10-06T00:00:00Z
draft = false
+++

## Omschrijving

Je gaat jouw "Over mij"-pagina vormgeven met behulp van **CSS**. In deze opdracht leer je hoe je externe stijlen en CSS-selectors kunt gebruiken om een goed gestructureerde en aantrekkelijk vormgegeven webpagina te maken.

Je maakt gebruik van **sections** om de verschillende onderdelen van je pagina te structureren. Minstens één section moet je anders vormgeven met behulp van een **id-selector** en het **id-attribuut** in HTML.

{{< pinboard url="https://www.pinterest.com/vincentvandercruyssen/over-mij/" >}}

## Stappenplan

Dit stappenplan begeleidt je stap voor stap bij het vormgeven van jouw "Over mij"-pagina met CSS. Je leert hoe je een externe stylesheet koppelt, stijlen toepast op HTML-elementen, en hoe je jouw werk correct inlevert.

### Bestandsstructuur

1. Open **Visual Studio Code**.
2. Open de map **overmij**.
3. Maak een nieuw bestand aan in deze map met de naam **style.css**.
4. Open het bestand **index.html**.
5. Koppel het CSS-bestand aan jouw **index.html**-bestand door een `link`-element toe te voegen binnen het `<head>`-element.
6. Zorg ervoor dat het pad naar jouw **style.css**-bestand correct is.

### CSS toevoegen

1. Open het **style.css**-bestand.
2. Schakel indien nodig **split view** in, zodat je tegelijkertijd de HTML- en CSS-code kunt bekijken.
3. Gebruik in je HTML de elementen: `<body>`, `<h1> - <h6>`, `<p>`, `<section>`.
4. Geef deze elementen een passende kleur en stijl met CSS.

### Stijlen toepassen

Selecteer het `body`-element en geef het een passende achtergrondkleur met een kleurnaam of hexadecimale kleurwaarde. Stel een nieuwe `font-family` in en zet de `margin` op 0.

{{< showcode >}}body {
    background-color: #f4f4f4;
}

{{< /showcode >}}

Selecteer het `h1`-element en geef het een kleur met een kleurnaam of hexadecimale kleurwaarde. Pas hetzelfde toe voor `h2`-elementen.

{{< showcode >}}h1 {
    color: #333333;
}

{{< /showcode >}}

Selecteer het `p`-element en geef het een passende kleur met een kleurnaam of hexadecimale kleurwaarde.

{{< showcode >}}p {
    color: #555555;
}

{{< /showcode >}}

Gebruik een **id-selector** om een specifieke `section` anders vorm te geven. Voeg een id-attribuut toe in je HTML, bijvoorbeeld: `<section id="intro">`. In je **style.css**-bestand kun je deze `section` als volgt stylen:

{{< showcode >}}#intro {
    background-color: #e0f7fa;
}

{{< /showcode >}}

**`margin` en `padding`**: Voeg ruimte toe aan je elementen met marges en padding.

{{< showcode >}}h1 {
    margin-bottom: 20px;
    padding: 10px;
}

{{< /showcode >}}

{{< img src="/img/web/cursus-css-box-model-1.png" width="1800" >}}

## Indienen

- Vakmap **Webontwikkeling**, via **OneDrive-link** toegevoegd aan de opdracht in **Google Classroom**.

In je vakmap zit:

```
VoornaamA_Overmij/
├── index.html
├── style.css
└── images/
    └── afbeeldingen in JPG, PNG, WEBP,...
```

## Indienen

Je levert de volgende bestanden in:

1. **index.html** en **style.css**.
2. Afbeeldingen in de map **images**.
3. Organiseer alles in één map.
4. Maak een zip-bestand van je **overmij**-map en hernoem het naar **voornaam_overmij.zip**.
5. Log in op **Google Classroom**.
6. Upload de gezipte map bij de opdracht in **4GT Webontwikkeling**.

## Puntenverdeling

- **Structuur (05)** `voornaam_overmij.zip` met `index.html`, `style.css` en map met afbeeldingen. 
- **Elementen document (04)** `html`, `head` met `title`, `link`-element naar CSS-bestand, `body`
- **Elementen inhoudsverdeling (06)** `header`, `main` met min. drie `section`-elementen en min. één met `id`-kenmerk
- **CSS selectors (05)** `body`, `header`, `h1` of `h2`, `section`, `id`-selector
- **CSS properties (05)** `background-color`, `color`, `font-family`, `margin`, `padding`

## Veelvoorkomende fouten

1. Geen externe CSS correct gekoppeld.
2. Fout bij het gebruik van `id`-selectors in CSS.
3. Onjuiste mapstructuur of bestandspaden.
4. Stijlregels zoals kleur of achtergrondkleur verkeerd toegepast.
5. Geen onderscheid tussen verschillende sections met CSS.
6. Zipbestand niet correct ingeleverd of verkeerd benoemd.
7. Verkeerd gebruik van margins en padding voor visuele opmaak.