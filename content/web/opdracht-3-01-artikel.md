+++
title = 'Opdracht: Artikel'
date = 2024-09-11T08:00:00-07:00
draft = false
+++

## Opgave

In deze opdracht leer je om gestructureerde informatie te presenteren door een correct HTML-document te maken met behulp van ChatGPT. Je kiest een onderwerp uit de geschiedenis van het internet en stelt gerichte vragen aan ChatGPT om relevante informatie te verzamelen. Vervolgens organiseer je de verzamelde gegevens in een HTML-bestand en maak je een map voor afbeeldingen. Het doel is om je te helpen de basisstructuur van HTML te begrijpen en deze toe te passen op een webpagina.

### Kies een onderwerp

In de {{< a href="../cursus-intro/" text="inleidende cursus" >}} vind je een overzicht van sleutelwoorden en belangrijke mijlpalen, gepresenteerd in chronologische volgorde. Dit kan gaan over thema's als de opkomst van e-mail, de ontwikkeling van webbrowsers of de geschiedenis van sociale media, enzovoorts.

### Stel een vraag aan ChatGPT

{{< svg src="img/web/chatgpt-logo.svg" width="100" href="https://chatgpt.com/" text="ChatGPT" >}}

{{< a href="https://chatgpt.com/" text="ChatGPT" >}} maakt gebruik van geavanceerde machine learning-technieken om menselijke taal te begrijpen. Het is een computerprogramma ontworpen om op een natuurlijke en logische manier te communiceren, vragen te beantwoorden en informatie te geven.

{{< img src="/img/web/opdracht-3-01-chatgpt_1.png" width="540" center="true" >}}

Het model is getraind op miljarden woorden en teksten uit boeken, artikelen en websites. Zo heeft het geleerd hoe taal werkt. ChatGPT kan daardoor diepgaande en contextueel relevante antwoorden bieden op gestelde vragen of instructies. Het kan eenvoudige vragen beantwoorden tot het helpen bij het opstellen van teksten, programmeren en het genereren van creatieve ideeën.

Stel een vraag over jouw gekozen onderwerp. Bijvoorbeeld: "Kun je me alles vertellen over de evolutie van webbrowsers vanaf de jaren '90 tot nu? Geef me uitgebreide teksten, met tussentitels, een link, een afbeelding en ergens een opsomming."

### Organiseer de verzamelde informatie

Maak een nieuwe map aan met een HTML-bestand en een aparte map voor afbeeldingen. Zorg ervoor dat je de informatie in HTML-elementen plaatst zoals titels, tekst, afbeeldingen en opsommingen. Gebruik Emmet om snel een basisstructuur te genereren.

### Bouw de basis HTML-structuur

Begin met een eenvoudig HTML-document met de juiste elementen zoals `<h1>` voor de hoofdtitel, `<p>` voor tekst en `<img>` voor afbeeldingen. Zorg ervoor dat elke sectie van je document goed gestructureerd is en een duidelijke indeling heeft.

Creëer een nieuwe map waarin je een HTML-document (genaamd `index.html`) en een aparte map voor afbeeldingen plaatst. Gebruik Emmet om een basisstructuur te genereren (`!` of `doc`), en organiseer de inhoud op een nette manier met de onderstaande elementen en attributen.

Gebruik `<h1>` voor de hoofdtitel, `<h2>` voor tussentitels, `<p>` voor tekst, `<img>` voor afbeeldingen, en `<ul>` en `<li>` voor opsommingen.

### Voeg afbeeldingen en links toe

Integreer relevante afbeeldingen en links. Plaats de afbeeldingen in de juiste map en zorg ervoor dat de links correct werken.

#### Basis HTML-structuur
{{< showcode >}}<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Artikel</title>
</head>

<body>
    <header>
        <h1>Hoofdtitel artikel</h1>
    </header>

    <main>
        <section id="intro">
            <h2>Tussentitel 1</h2>
            <p>Voor doorlopende tekst gebruik je het p-element.</p>
            <p>Lorem ipsum dolor sit amet.</p>
            <img src="images/ferrari.jpg" alt="Een rode Ferrari" width="450">
            <h3><a href="URL">Deze inhoud verwijst naar een link.</a></h3>
        </section>

        <section id="deel-twee">
            <h2>Tussentitel 2</h2>
            <p>Nesciunt cupiditate ullam quia alias.</p>
            <ul>
                <li>Lijstjes</li>
                <li>Lijstjes</li>
                <li>Lijstjes</li>
            </ul>
        </section>
    </main>
</body>

</html>

{{< /showcode >}}

## Puntenverdeling

| Structuur (09)                             | HTML basis (11)                                  |
|--------------------------------------------|-------------------------------------------------|
| **Folderstructuur en bestandsnamen (01)**  | **Elementen inhoudsstroom (06)**                |
| • voornaam artikel.zip met index.html      | • h1, h2,…                                      |
|   en images/afbeelding.jpg,…               | • img                                           |
|                                            | • p                                             |
| **Elementen document (05)**                | • a                                             |
| • html                                     | • ul of ol met li                               |
| • head                                     |                                                 |
| • meta                                     | **Attributes (kenmerken) (05)**                 |
| • title (aangepast)                        | • id                                            |
| • body                                     | • src                                           |
|                                            | • alt                                           |
| **Elementen inhoudsverdeling (03)**        | • width                                         |
| • header                                   | • href                                          |
| • main met section(s)                      |                                                 |

## Veelvoorkomende fouten

1. Geen aparte map voor afbeeldingen.
2. Incorrect afsluiten van een element of verkeerd nesten.
3. Geen aanpassing van het title-element.
4. Het body-element is verplaatst naar een verkeerde plek of verkeerd genest.
5. Doorlopende tekst in h1, h2-elementen.
6. Een section-element zonder id-attribute.
7. Inhoud die zich buiten een section-element bevindt.
8. Een leeg alt-attribute voor het img-element.
9. Afbeelding src verwijst niet naar een lokale afbeelding in de map met afbeeldingen.