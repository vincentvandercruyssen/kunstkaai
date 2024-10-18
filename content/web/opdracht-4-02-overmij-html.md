+++
title = 'Opdracht: Over mij (HTML)'
date = 2024-09-11T08:00:00-07:00
draft = false
+++

## Omschrijving

In deze opdracht schrijf je een persoonlijke tekst over jezelf en structureer je deze met HTML. Het doel is om je basisvaardigheden in HTML te ontwikkelen en een eenvoudige webpagina te maken met een afbeelding, een link en een lijst om de inhoud aantrekkelijk en informatief te maken.

Uiteindelijk lever je je werk in als een gezipte map via Google Classroom.

## Stappenplan

- **Introductie**: Wie ben je, wat zijn je interesses, en waarom heb je voor grafische technieken gekozen?
- **Hobby's en ambities**: Vertel iets over je hobby's, ambities en favoriete projecten.
- **Lengte**: Houd de tekst kort, ongeveer 150-200 woorden.

{{< svg src="img/web/chatgpt-logo.svg" width="100" href="https://chatgpt.com/" text="ChatGPT" >}}

Je kunt {{< a href="https://chatgpt.com/" text="ChatGPT" >}} gebruiken om hulp te krijgen bij het schrijven van je "Over mij"-tekst. Stel vragen zoals: "Hoe stel ik mezelf kort en bondig voor?" of "Hoe kan ik mijn hobby’s en ambities creatief beschrijven?"

Je webpagina moet uiteindelijk de volgende elementen bevatten:
- Eén titel.
- Minimaal drie tussentitels.
- Minimaal drie stukjes tekst.
- Minimaal één hyperlink.
- Minimaal één afbeelding.
- Minimaal één lijst.

### Bestandsstructuur

1. Maak een nieuwe map aan in je **Documents**-map, genaamd **webontwikkeling**.
2. Maak binnen de map **webontwikkeling** een submap genaamd **overmij**.
3. Maak in de map **overmij** een submap **images** voor de afbeelding.

### Aanmaken van de basisstructuur

1. Open **Visual Studio Code**.
2. Klik op **"Open folder"** en selecteer de map **webontwikkeling**.
3. Maak een nieuw bestand aan in de map **overmij**.
4. Sla dit bestand op als **index.html**.
5. Typ `!` en druk op enter om snel een basis HTML-structuur te genereren.

### Aanvullen head

1. Voeg een `<title>`-element toe met de tekst: **"Naam: Over mij"**.
2. Vergeet niet regelmatig op te slaan.

### Aanvullen body

Binnen het `<body>`-element bouw je je webpagina op:

1. Voeg een `<main>`-element toe.
2. Binnen het `<main>`-element plaats je een `<h1>`-element met de tekst **"Over mij"**.
3. Schrijf je tekst in meerdere `<p>`-elementen, zorg dat je minimaal drie `<h2>`-elementen gebruikt voor tussentitels.
4. Voeg een afbeelding toe met het `<img>`-element (afbeelding opgeslagen in de map **images**), vul het `alt`-kenmerk aan, gebruik `width` om de afbeelding te vergroten of verkleinen.
5. Voeg een hyperlink toe naar een interessante website met het `<a>`-element.
6. Voeg een lijstje toe van hobby's of dergelijk met `<ul>` of `<ol>` en `<li>`-elementen.

## Inleveren

Aan het einde van de les lever je de volgende bestanden in:

1. **index.html**.
2. De afbeeldingen in de map **images**.
3. Organiseer alles in één map.
4. Maak een gezipte map van je **overmij**-map.
5. Log in op **Google Classroom**.
6. Upload de gezipte map bij de opdracht in **4GT Webontwikkeling**.

## Puntenverdeling

- **Structuur (03)** | voornaam overmij.zip met index.html en afbeeldingen in de juiste map
- **Elementen document (05)** | html | head | meta | title (aangepast) | body
- **Elementen inhoud (07)** | main | h1, h2,... | img | p | a | ul of ol met li                                                   
- **Kenmerken (04)** | src | alt | width | href

## Veelvoorkomende fouten

1. Geen aparte map voor afbeeldingen.
2. Incorrect afsluiten van een element of verkeerd nesten.
3. Geen aanpassing van het title-element.
4. Het body-element is verplaatst naar een verkeerde plek of verkeerd genest.
5. Doorlopende tekst in h1, h2-elementen.
6. Een leeg alt-attribute voor het img-element.
7. Afbeelding src verwijst niet naar een lokale afbeelding in de map met afbeeldingen.