+++
title = 'Opdracht: Over mij (HTML)'
date = 2025-09-10T00:00:00Z
draft = false
+++

We starten het jaar met een eenvoudige maar leuke oefening: een webpagina over jezelf. Zo leer je meteen werken met HTML én toon je iets van wie je bent.

{{< pinboard url="https://www.pinterest.com/vincentvandercruyssen/over-mij/" >}}

## OneDrive-map aanmaken

- Maak in **OneDrive** een map aan voor de klasgroep en het vak **Webontwikkeling**.
- Kopieer de **deel-link** van deze map. Je voegt deze link later toe in **Google Classroom**.

### Projectmap maken

- Open de map **Webontwikkeling** in OneDrive.
- Maak een nieuwe map met de naam **VoornaamA_Overmij**.
- Binnen **VoornaamA_Overmij** maak je een submap **images** voor je afbeelding(en).

## Omschrijving

In deze opdracht schrijf je een persoonlijke tekst over jezelf en structureer je deze met HTML. Het doel is om je basisvaardigheden in HTML te ontwikkelen en een eenvoudige webpagina te maken met een afbeelding, een link en een lijst om de inhoud aantrekkelijk en informatief te maken.

## Stappenplan

- **Introductie**: Wie ben je, wat zijn je interesses, en waarom heb je voor grafische technieken gekozen?
- **Hobby's en ambities**: Vertel iets over je hobby's, ambities en favoriete projecten.
- **Lengte**: Houd de tekst kort, ongeveer 150-200 woorden.

{{< svg src="img/web/chatgpt-logo.svg" width="100" href="https://chatgpt.com/" text="ChatGPT" >}}

Je kunt [ChatGPT](https://chatgpt.com/) gebruiken om hulp te krijgen bij het schrijven van je "Over mij"-tekst. Stel vragen zoals: "Hoe stel ik mezelf kort en bondig voor?" of "Hoe kan ik mijn hobby’s en ambities creatief beschrijven?"

Je webpagina moet uiteindelijk de volgende elementen bevatten:
- één titel
- minimaal drie tussentitels
- minimaal drie stukjes tekst
- minimaal één hyperlink
- minimaal één afbeelding
- minimaal één lijst

### Bestandsstructuur

- Werk in **OneDrive › Webontwikkeling › VoornaamA_Overmij**.

Bestanden:
  - `index.html`
  - `images/` met je afbeelding(en)

### Aanmaken van de basisstructuur

- Open **Visual Studio Code**.
- Klik **Open folder** en selecteer **VoornaamA_Overmij**.
- Maak een nieuw bestand **index.html**.
- Typ `!` en druk enter om een basis-HTML te genereren.

### Aanvullen head

- Voeg een `<title>` toe met: **"Naam: Over mij"**.
- Sla regelmatig op. Gebruik de optie Auto Save in VSC (File → Auto Save aanvinken).

### Aanvullen body

Binnen het `<body>`-element bouw je je webpagina op:

- Voeg een `<main>`-element toe.
- Plaats een `<h1>` met **"Over mij"**.
- Schrijf je tekst in meerdere `<p>`-elementen en gebruik minimaal drie `<h2>`-elementen voor tussentitels.
- Voeg een afbeelding toe met `<img>` uit de map **images**, met correct `alt`-kenmerk en eventueel `width`.
- Voeg een hyperlink toe met `<a>`.
- Voeg een lijst toe met `<ul>` of `<ol>` en `<li>`.

## Indienen

- Vakmap **Webontwikkeling**, via **OneDrive-link** toegevoegd aan de opdracht in **Google Classroom**.

In je vakmap zit:

- **VoornaamA_Overmij** met `index.html` en de map `images/`.

## Puntenverdeling

- **Structuur (03)** `VoornaamA_Overmij` in OneDrive met `index.html` en `images/`.
- **Elementen document (05)** `html`, `head`, `meta`, `title` (aangepast), `body`
- **Elementen inhoud (08)** `main`, `section`'s, `h1`, `h2`, `img`, `p`, `a`, `ul` of `ol` met `li`
- **Kenmerken (04)** `src`, `alt`, `width`, `href`

## Veelvoorkomende fouten

- Geen aparte map voor afbeeldingen.
- Incorrect afsluiten of verkeerd nesten van elementen.
- Geen aangepaste titel in `<title>`.
- `<body>` op de verkeerde plek of verkeerd genest.
- Doorlopende tekst in `h1` of `h2`.
- Leeg `alt`-kenmerk bij `<img>`.
- `src` verwijst niet naar een lokale afbeelding in `images/`.