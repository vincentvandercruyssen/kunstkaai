+++
title = 'Opdracht: Reservatie'
date = 2026-01-04T00:00:00Z
draft = false
+++

## Opgave

In deze opdracht ga je een reservatie-formulier maken voor een fictief restaurant. Het formulier moet gebruiksvriendelijk en visueel aantrekkelijk zijn, met een heldere uitstraling. Het formulier bevat verschillende invoervelden, waaronder tekstvelden, een e-mailveld, een datum- en tijdselector, een veld voor een telefoonnummer, een tekstgebied en een verzendknop. Gebruik browservalidatie met `required` en correcte `type`-waarden, zodat gebruikers alle vereiste informatie invullen.

Je gaat het formulier stylen met CSS. 

Daarnaast ga je het formulier functioneel maken met behulp van [Formspree](https://formspree.io/), een service die het mogelijk maakt om formuliergegevens via e-mail te ontvangen zonder dat je backend-code hoeft te schrijven.

{{< img src="/img/web/opdracht-4-09-reservatie-vb-01.png" percent="60" center="true" >}}

## Voorbereiding

Open Visual Studio Code. Klik op *File > Open Folder* en selecteer jouw map voor webontwikkeling in je OneDrive. Maak een nieuwe map aan genaamd `VoornaamA_Reservatie`. 

Maak in de map de volgende bestanden en één map aan:
- `index.html`
- `style.css`
- map `images`

## Bouw de hoofdpagina

Open `index.html` in Visual Studio Code. Maak de basis HTML-structuur aan met Emmet aan de hand van `!` (uitroepteken).

Pas het `<title>`-element aan met een treffende titel, zoals "Reservatie". 

Koppel het CSS-bestand in het `<head>`-element.

In de `<body>` maak je één `<main>`-element aan waarin je het formulier plaatst. Voor het formulier voeg je een titel toe met een `<h1>`-element met de tekst "Reservatie". Gebruik eventueel een `<h2>`-element voor een tussentitel.

## Formspree instellen

Maar eerst...

Om het formulier werkend te maken, ga je gebruikmaken van **Formspree**. Formspree is een gratis dienst die onder andere formuliergegevens via e-mail naar je verstuurt. Volg deze stappen:

1. Ga naar de website van Formspree: [https://formspree.io/](https://formspree.io/).
2. Maak een account aan of log in als je al een account hebt. Doe dit met je eduso adres.
3. Zorg ervoor dat je account geactiveerd is, controleer je eduso-email.
4. Klik op **New Form** om een nieuw formulier aan te maken.
5. Vul een naam naar keuze in bij Form Name. 
6. Formspree genereert een unieke URL voor je formulier. Deze voor jou unieke URL ziet er ongeveer zo uit: `https://formspree.io/f/your-form-id`
7. Kopieer deze URL en plak deze in het `action`-kenmerk van je `<form>`-element in je HTML-bestand. 
8. Zorg ervoor dat het `method`-kenmerk van het formulier is ingesteld op `POST`.

| | |
|-|-|
|{{< img src="/img/web/opdracht-4-09-reservatie-formspree-01.png" >}}|{{< img src="/img/web/opdracht-4-09-reservatie-formspree-02.png" >}}|
|Registreer voor een account. |Gebruik je eduso-adres. |
|{{< img src="/img/web/opdracht-4-09-reservatie-formspree-03.png" >}}|{{< img src="/img/web/opdracht-4-09-reservatie-formspree-04.png" >}}|
|Maak een nieuwe form. |Zorg ervoor dat je account geactiveerd is, controleer je eduso-email.|
|{{< img src="/img/web/opdracht-4-09-reservatie-formspree-05.png" >}}|{{< img src="/img/web/opdracht-4-09-reservatie-formspree-06.png" >}}|
|Kies een naam voor je nieuwe project. |Het belangrijkste is de action-link. |

## Het formulier

Het `<form>`-element wordt gebruikt om een formulier te maken waarin gebruikers gegevens kunnen invoeren. Het `action`-kenmerk specificeert de URL waar de gegevens naartoe moeten worden gestuurd. Het `method`-kenmerk bepaalt dan weer hoe de gegevens verzonden worden, meestal aan de hand van `POST`.

Formspree vereist dat de `action` de juiste URL van hun service bevat en dat de `method` op `POST` staat.

### Invoervelden

Invoervelden kunnen verschillende types hebben, zoals `text`, `email`, `date` enzoverder. Elk ontworpen voor specifieke soorten gebruikersinvoer. Door het juiste type in te stellen, zorgen we ervoor dat browsers ingebouwde validatie en visuele feedback bieden, wat de gebruikerservaring verbetert.

Onder de eerder gemaakte koptekst voeg je een `<form>`-element toe met de volgende invoervelden:
- Een tekstveld voor de naam *
- Een e-mailveld *
- Een datumselector * (`type="date"`)
- Een tijdselector * (`type="time"`)
- Een telefoonnummerveld * (`type="tel"`, gebruik niet `type="number"` voor telefoon.)
- Een textarea voor een bericht (Let op: dit is geen `input`-element!)
- Een verzendknop (`<button type="submit">`)

`*` een verplicht in te voeren veld, hiervoor gebruik je het `required`-kenmerk. Gebruik een sterretje in het label voor verplichte velden.

Hieronder een voorbeeld van de naam-input, met daarvoor een label met een `for`-kenmerk verwijzend naar het `id` van het input-element:

```html
    <label for="naam">Naam *</label>
    <input type="text" id="naam" name="naam" required>
```

Voor elk input-veld hoort dus telkens een label-element te staan. 

Let goed op het kenmerk `type` (Emmet helpt je hierbij). Maar nog belangrijker zijn telkens de kenmerken `id` en `name`, deze moeten per input verschillend zijn. 

## CSS styling

### Basisstyling

Begin met het instellen van een basisstyling voor het formulier. Open je CSS-bestand en voeg de volgende stijlen toe:

`body`: Stel een basislettertype (`font-family`) in. Stel de `margin` in op 0. Geef achtergrondkleur en tekstkleur.
`main`: Centreer het `main`-element op de pagina met behulp van `margin: 0 auto`. Geef de eigenschap `max-width` met een lengte in pixels (bijvoorbeeld 640px). Stel `padding` in zodanig niet alles tegen de rand plakt.

### Formulierstyling

Style het formulier met de volgende eigenschappen:

- Voeg `padding` en een `border` toe aan het formulier.
- Gebruik `border-radius` om de hoeken van het formulier af te ronden.
- Voeg een subtiele `box-shadow` toe om het formulier een driedimensionaal effect te geven.

### Invoervelden

Style de invoervelden en het tekstgebied (`textarea`) met de volgende eigenschappen:

- Gebruik `width: 100%` en voeg `padding` toe in pixels.
- Met `display: block` worden de velden onder elkaar geplaatst op de pagina.
- Voeg een `border` en `border-radius` toe.
- Gebruik `margin-bottom` om ruimte tussen de velden te creëren.

### Knopstyling

Style de verzendknop met de volgende eigenschappen:

- Geef de knop een achtergrondkleur en tekstkleur.
- Voeg `padding` en een `border-radius` toe.
- Extra: `cursor: pointer`, een `:hover`-stijl.

## Testen van het formulier

1. Open je `index.html`-bestand in een browser.
2. Vul het formulier in en klik op de verzendknop.
3. Controleer het e-mailadres dat je hebt opgegeven in Formspree. Je zou een e-mail moeten ontvangen met de ingevulde gegevens.

## Indienen

Zorg dat in de map `VoornaamA_Reservatie` de volgende bestanden zitten:

- `index.html`
- `style.css`
- map `images`
- Schermafbeelding van werkend Formspree-resultaat (Formspree dashboard met min. 1 submission zichtbaar)

Plaats de map `VoornaamA_Reservatie` in je vakmap voor Webontwikkeling op OneDrive.

Zorg voor een koppeling naar je volledige vakmap in je OneDrive bij de opdracht in Google Classroom.

## Puntenverdeling

- **Structuur (04)** Correcte bestandsnamen en mapstructuur.
- **HTML (14)** Correct gebruik van elementen en kenmerken, `<title>`, `<main>`, `h`-kop, `<form>`, `action`, `method`, formulier-elementen met specifieke kenmerken. 
- **CSS Basis (04)** Algemene styling, `body`, `background-color`, `color`, `font-family`.
- **CSS Formulier (10)** Styling van het formulier, invoervelden en knop.
- **Formspree (02)** Correcte integratie van Formspree en werkend formulier (via schermafbeelding).

## Veelvoorkomende fouten

- Onjuiste mapstructuur of bestandsnamen
- Foutieve HTML-nesting
- Ontbrekende `required`-kenmerken voor vereiste velden
- Verkeerde Formspree URL in het `action`-kenmerk
- Label en input niet gekoppeld (`for` matcht niet met `id`)
- De `name` ontbreekt of is dubbel
- Onjuiste gebruik van `box-shadow` of `border-radius`