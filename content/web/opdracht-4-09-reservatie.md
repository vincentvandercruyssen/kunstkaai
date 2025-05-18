+++
title = 'Opdracht: Reservatie'
date = 2025-02-16T08:00:00-07:00
draft = false
+++

## Opgave

In deze opdracht ga je een reservatie-formulier maken voor een fictief bedrijf. Het formulier moet gebruiksvriendelijk en visueel aantrekkelijk zijn, met een moderne uitstraling. Het formulier bevat verschillende invoervelden, waaronder tekstvelden, een e-mailveld, een datum- en tijdselector, een tekstarea en een verzendknop. Het formulier moet ook validatie bevatten om ervoor te zorgen dat gebruikers alle vereiste informatie invullen.

Je gaat het formulier stylen met CSS. 

Daarnaast ga je het formulier functioneel maken met behulp van [Formspree](https://formspree.io/), een service die het mogelijk maakt om formuliergegevens via e-mail te ontvangen zonder dat je backend-code hoeft te schrijven.

{{< img src="/img/web/opdracht-4-09-reservatie-vb-01.png" percent="50" center="true" >}}

## Voorbereiding

Maak een nieuwe map aan in je map voor webontwikkeling, genaamd `voornaam reservatie`. Open deze map in Visual Studio Code, klik in Visual Studio Code op *File > Open Folder* en selecteer jouw map.

Maak in de map de volgende bestanden aan:
- `index.html`
- `style.css`
- Indien je een afbeeldingen gebruikt, plaats deze dan in een aparte map.  

## Bouw de hoofdpagina

Open `index.html` in Visual Studio Code. Maak de basis HTML-structuur aan met Emmet aan de hand van `!` (uitroepteken). 

Pas het `<title>`-element aan met een treffende titel, zoals "Reservatie". Voeg de link naar je stylesheet toe. 

Tussen de `body` maak je een `main`-element aan waarin je het formulier plaatst. Voor het formulier voeg je wel nog een titel toe met bijvoorbeeld een `<h2>`-element met de tekst "Reservatie".

## Formspree instellen

Om het formulier werkend te maken, ga je gebruikmaken van **Formspree**. Formspree is een gratis service die formuliergegevens via e-mail naar je verstuurt. Volg deze stappen:

1. Ga naar de website van Formspree: [https://formspree.io/](https://formspree.io/).
2. Maak een account aan of log in als je al een account hebt. Doe dit met de e-mail van de school. Alvorens je Formspree kunt gebruiken, zul je de account moeten verifiëren. 
3. Klik op **New Form** om een nieuw formulier aan te maken.
4. Vul een naam naar keuze in bij Form Name. 
5. Formspree genereert een unieke URL voor je formulier. Deze URL ziet er ongeveer zo uit: `https://formspree.io/f/your-form-id`
6. Kopieer deze URL en plak deze in de `action`-attribuut van je `<form>`-element in je HTML-bestand. 
7. Zorg ervoor dat het `method`-attribuut van het formulier is ingesteld op `POST`.

| | |
|-|-|
|{{< img src="/img/web/opdracht-4-09-reservatie-formspree-01.png" >}}|{{< img src="/img/web/opdracht-4-09-reservatie-formspree-02.png" >}}|
|Registreer voor een account. |Gebruik je eduso-adres. |
|{{< img src="/img/web/opdracht-4-09-reservatie-formspree-03.png" >}}|{{< img src="/img/web/opdracht-4-09-reservatie-formspree-04.png" >}}|
|Maak een nieuwe form. |Zorg ervoor dat je account geactiveerd is. Check je SO-mail.|
|{{< img src="/img/web/opdracht-4-09-reservatie-formspree-05.png" >}}|{{< img src="/img/web/opdracht-4-09-reservatie-formspree-06.png" >}}|
|Kies een naam voor je nieuwe project. |Het belangrijkste is de action-link. |

## Het formulier

Het `<form>`-element wordt gebruikt om een formulier te maken waarin gebruikers gegevens kunnen invoeren. Het `action`-kenmerk specificeert de URL waar de gegevens naartoe moeten worden gestuurd, en het `method`-kenmerk bepaalt hoe de gegevens verzonden worden (meestal `POST`). 

Formspree vereist dat de `action` de juiste URL van hun service bevat en dat de `method` op `POST` staat.

Onder de koptekst voeg je een `<form>`-element toe met de volgende invoervelden:
- Een tekstveld voor de naam.
- Een e-mailveld.
- Een datumselector.
- Een tijdselector.
- Een textarea voor een bericht.
- Een telefoonnummerveld.
- Een verzendknop (`<button type="submit">`).

Dit is een voorbeeld van de naam-input, met daarvoor een label met een `for`-kenmerk verwijzend naar het `id` van het input-element:
```html
    <label for="naam">Naam *</label>
    <input type="text" id="naam" name="naam" required>

```

Voor elk input-veld komt dus telkens een label-element. 

Let goed op het kenmerk `type` (Emmet helpt je hierbij). Maar nog belangrijker zijn telkens de kenmerken `id` en `name`, deze moeten per input verschillend zijn. 

Zorg ervoor dat alle vereiste velden het `required`-attribuut hebben.

## CSS styling

### Basisstyling

Begin met het instellen van een basisstyling voor het formulier. Open je CSS-bestand en voeg de volgende stijlen toe:

- Stel de `box-sizing` in op `border-box` voor alle elementen.

```css
* {
    box-sizing: border-box;
}

```

- Stel een basislettertype in voor de `body`. Stel de `margin` van de `body` in op 0.
- Centreer het main-element op de pagina met behulp van `margin: auto` en `max-width`.

### Formulierstyling

Style het formulier met de volgende eigenschappen:

- Voeg padding en een border toe aan het formulier.
- Gebruik `border-radius` om de hoeken van het formulier af te ronden.
- Voeg een subtiele `box-shadow` toe om het formulier een driedimensionaal effect te geven.

### Invoervelden

Style de invoervelden en de tekstarea met de volgende eigenschappen:

- Geef ze een vaste breedte en padding.
- Voeg een border en border-radius toe.
- Gebruik `margin-bottom` om ruimte tussen de velden te creëren.

### Knopstyling

Style de verzendknop met de volgende eigenschappen:

- Geef de knop een achtergrondkleur en tekstkleur.
- Voeg padding en een border-radius toe.

## Testen van het formulier

1. Open je `index.html`-bestand in een browser.
2. Vul het formulier in en klik op de verzendknop.
3. Controleer het e-mailadres dat je hebt opgegeven in Formspree. Je zou een e-mail moeten ontvangen met de ingevulde gegevens.

## Indienen

Mapnaam: `voornaam reservatie` met de volgende bestanden:
- `index.html`
- `style.css`
- Map `images` met alle gebruikte afbeeldingen.

Maak één zip-bestand van de map. Lever in via Google Classroom.

## Puntenverdeling

- **Structuur (04)** Correcte bestandsnamen en mapstructuur.
- **HTML (14)** Correct gebruik van elementen en attributen, `<title>`, `<main>`, `h`-kop, `<form>`, `action`, `method`, zeven formulier-elementen met specifieke kenmerken. 
- **CSS Basis (04)** Algemene styling, `body`, `background-color`, `color`, `font-family`.
- **CSS Formulier (10)** Styling van het formulier, invoervelden en knop.
- **Formspree (02)** Correcte integratie van Formspree en werkend formulier (via schermafbeelding).

## Veelvoorkomende fouten

- Foutieve HTML-nesting.
- Ontbrekende `required`-attributen voor vereiste velden.
- Onjuiste mapstructuur of bestandsnamen.
- Ontbrekende hover-effecten op de knop.
- Onjuiste gebruik van `box-shadow` of `border-radius`.
- Verkeerde Formspree URL in de `action`-attribuut.