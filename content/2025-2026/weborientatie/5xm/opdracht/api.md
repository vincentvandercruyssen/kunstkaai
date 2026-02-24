+++
title = 'Opdracht: API'
date = 2026-02-23T00:00:00Z
draft = false
+++

## Introductie

In deze opdracht bouw je een kleine website die gegevens (data) ophaalt via een externe API. Deze gegevens maak je zichtbaar in een duidelijke interface. Je gebruikt hiervoor HTML, CSS en JavaScript.

### Wat is een API?

Een **API** ([Application Programming Interface](https://nl.wikipedia.org/wiki/Application_programming_interface)) is een soort "doorgeefluik" waarmee twee systemen met elkaar kunnen communiceren. Een API verbergt hoe een programma intern werkt, maar geeft wel toegang tot bepaalde gegevens en functies. Het is een "afspraak" die bepaalt hoe verschillende onderdelen van software met elkaar communiceren. In die afspraak staat welke functies beschikbaar zijn, welke soort gegevens worden gebruikt en onder welke voorwaarden iets mag gebeuren. De interne werking van het programma blijft verborgen, alleen de afgesproken manier van communiceren zijn zichtbaar.

Dankzij API’s kan software opgebouwd worden uit aparte onderdelen. Daardoor is ze gemakkelijker aanpasbaar, beter te onderhouden en eenvoudiger uit te breiden. Je kunt nieuwe functies toevoegen zonder alles opnieuw te moeten maken.

Een API is dus geen moeilijk modewoord, maar een belangrijk basisprincipe in software. Bijna alle grote technologieplatformen maken er gebruik van, zoals cloudservices, mobiele apps, websites en systemen die uit meerdere kleine diensten bestaan.

### API's en webontwikkeling

In de context van deze opdracht gebruik je API's om externe gegevens op te halen uit een database (bijvoorbeeld actuele weergegevens, een boeken-catalogus, of profielen).

In plaats van alle data zelf handmatig in je HTML te typen, stuur je via JavaScript (met het `fetch`-commando) een vraag naar een specifiek webadres (het *endpoint*). De API antwoordt vervolgens met de gewenste data, meestal in het overzichtelijke **JSON-formaat**. Jouw taak is om die data uit te lezen en netjes in de gebruikersomgeving (user interface) te verwerken.

## Keuze van API

Je mag één van deze toegankelijke APIs gebruiken voor je project. Voor elk van deze APIs is een werkend voorbeeld beschikbaar in de lesbestanden:

- **REST Countries** - [Website](https://restcountries.com/) | [Documentatie](https://restcountries.com/#endpoints-all)
- **Open Library** - [Website](https://openlibrary.org/) | [Documentatie](https://openlibrary.org/developers/api)
- **Open-Meteo** - [Website](https://open-meteo.com/) | [Documentatie](https://open-meteo.com/en/docs)
- **Quotable** - [Website](https://github.com/lukePeavey/quotable) | [Documentatie](https://github.com/lukePeavey/quotable#api-reference)
- **Wikipedia** - [Website](https://nl.wikipedia.org/) | [Documentatie](https://www.mediawiki.org/wiki/API:Main_page)
- **Random User** - [Website](https://randomuser.me/) | [Documentatie](https://randomuser.me/documentation)
- **OpenWeatherMap** (API key vereist) - [Website](https://openweathermap.org/) | [Documentatie](https://openweathermap.org/api)
- **NewsAPI** (API key vereist) - [Website](https://newsapi.org/) | [Documentatie](https://newsapi.org/docs)
- **Pixabay** (API key vereist) - [Website](https://pixabay.com/) | [Documentatie](https://pixabay.com/api/docs/)
- **Unsplash** (API key vereist) - [Website](https://unsplash.com/) | [Documentatie](https://unsplash.com/documentation)

### Eigen API zoeken
Je mag ook zelf een andere API kiezen. Je moet dan wel **zélf** uitzoeken hoe die API werkt (het endpoint, de parameters, de JSON-structuur). 

### API keys
Als jouw gekozen API om een API key vraagt (zoals NewsAPI, Pixabay of Unsplash), moet je deze key **zélf aanvragen** en werkend in je code krijgen.

> **Belangrijk:** API keys zijn persoonlijk. Deel jouw key niet in Smartschool en vermeld deze niet ergens publiek online.

## Wat maak je?

Je website moet minstens de volgende onderdelen bevatten:

- **Input:** Een zoekveld en/of een drukknop (`button`) die een API-call triggert. Bij een zoekveld moet ook de Enter-toets (`keypress`) werken om te zoeken.
- **Feedback tijdens laden:** Een eenvoudige visuele indicatie (bijv. de tekst `"<p>Bezig met laden...</p>"`) zolang de data aan het ophalen is.
- **Error state of geen resultaten:** Een begrijpelijke melding op het scherm als er iets misgaat of als er geen resultaten zijn voor de zoekopdracht.
- **Resultaten tonen:** Laat de opgehaalde data netjes zien in de interface (bijvoorbeeld in een `div` of lijst). Voorzie minstens titel/naam, wat kerninformatie en waar mogelijk een afbeelding. Als je meerdere resultaten ophaalt, kan je hiervoor "kaarten" (cards) bouwen of een lijst (`ul`/`li`) gebruiken.
- **Extra interactie (minstens 1):** Voeg een extra interactie toe aan je website (dit mag een simpele knop zijn zoals de "Willekeurig Artikel" knop uit het Wikipedia voorbeeld, het beperken van het aantal resultaten met `.slice()`, sorteren, een "laad meer"-functie, etc.).

## Technisch

- Gebruik `fetch` in combinatie met `async/await`.
- Gebruik `encodeURIComponent` bij zoektermen in een URL om fouten te vermijden.
- **Geen hardcoded resultaten** in je HTML. Alle data (inclusief foutmeldingen of laadberichten) wordt via JavaScript (`innerHTML` of `createElement`) in de DOM geladen.
- Schrijf je JavaScript netjes in functies (bijv. `zoekBoek()` of `haalWeer()`).
- Gebruik een `try-catch` blok als je de kans op fouten wil opvangen.

## Structuur van je project

Werk in je vakmap voor **Weboriëntatie**.

```
VoornaamA_API/
├── index.html
├── style.css
└── script.js (of javascript in html)
```

- **HTML:** Zorg voor een logische opbouw (bijv. `header`, `nav`, `main`).
- **CSS:** Voorzie een rustige lay-out en vormgeving (zoals het `card` design uit de voorbeelden).
- Je mag alles in aparte bestanden opsplitsen, of zoals in de voorbeelden de CSS in een extern bestand (`style.css`) steken en de JavaScript onderaan de pagina in een `<script>` tag plaatsen.

## Inleveren

- Plaats de map **VoornaamA_API** in je OneDrive-map voor Weboriëntatie.
- De map bevat al je bestanden. Geen losse stukjes code.
- Voeg in dezelfde map een **screenshot** toe waarop duidelijk het werkende resultaat te zien is.
- Deel de **OneDrive-link** via **Google Classroom**.

## Puntenverdeling

- **Structuur en bestanden:** Je levert een complete map in en gebruikt de juiste bestandsnamen. Screenshot en docje toegevoegd.
- **Werking API:** De data wordt correct opgehaald m.b.v. `fetch` en `async/await`. Extra parameters/zoektermen worden juist meegegeven.
- **DOM manipulatie en interactie:** Zoeken/klikken werkt, er is een laad- of foutstatus, resultaten verschijnen correct en netjes in de interface zonder dat de pagina refresht.
- **UI en weergave:** De applicatie is overzichtelijk, leesbaar en netjes gestyled (CSS).
- **Codekwaliteit en extra optie:** De code is opgedeeld in functies, zoektermen passeren via `encodeURIComponent` en de gevraagde extra specifieke interactie is aanwezig.
