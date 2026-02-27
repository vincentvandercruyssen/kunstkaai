+++
title = 'Opdracht: API'
date = 2026-02-23T00:00:00Z
draft = false
+++

## Introductie

In deze opdracht bouw je een website die gegevens (data) ophaalt via een externe API. Deze gegevens maak je zichtbaar in een duidelijke interface. Je gebruikt hiervoor HTML, CSS en JavaScript.

### Wat is een API?

Een **API** ([Application Programming Interface](https://nl.wikipedia.org/wiki/Application_programming_interface)) is een soort "doorgeefluik" waarmee twee systemen met elkaar kunnen communiceren. Een API geeft toegang tot bepaalde gegevens en functies van een programma. Het is een "afspraak" die bepaalt hoe verschillende onderdelen van software met elkaar communiceren. In die afspraak staat welke functies beschikbaar zijn, welke soort gegevens worden gebruikt en onder welke voorwaarden iets mag gebeuren. De interne werking van het programma blijft verborgen, alleen de afgesproken manier van communiceren zijn zichtbaar.

Dankzij API’s kan software opgebouwd worden uit aparte onderdelen. Daardoor is ze gemakkelijker aanpasbaar, beter te onderhouden en eenvoudiger uit te breiden. Je kunt nieuwe functies toevoegen zonder alles opnieuw te moeten maken.

Een API is dus geen moeilijk modewoord, maar een belangrijk basisprincipe in software. Bijna alle grote technologieplatformen maken er gebruik van, zoals cloudservices, mobiele apps, websites en systemen die uit meerdere kleine diensten bestaan. 

Een concreet voorbeeld: wanneer je een website bouwt en JavaScript gebruikt, manipuleer je de DOM via de DOM API die de browser ter beschikking stelt. Elementen selecteren, toevoegen, verwijderen, stijlen aanpassen, event listeners registreren, etc. gebeurt allemaal via de DOM API.

### API's en webontwikkeling

In de context van deze opdracht gebruik je API's om externe gegevens op te halen uit een database (bijvoorbeeld actuele weergegevens, een boeken-catalogus, wikipedia-artikels,...).

In plaats van alle data zelf handmatig in je HTML te typen, stuur je via JavaScript (met het `fetch`-commando) een vraag naar een specifiek webadres (het *endpoint*). De API antwoordt vervolgens met de gewenste data, meestal in het overzichtelijke **JSON-formaat**. Jouw taak is om die data uit te lezen en netjes in de gebruikersomgeving (user interface) te verwerken.

JSON ([JavaScript Object Notation](https://nl.wikipedia.org/wiki/JSON)) is een lichtgewicht formaat voor het uitwisselen van tekstgegevens in de vorm van data-objecten.

## Keuze van API

Voor de opdracht mag je één van deze toegankelijke APIs gebruiken voor je project.

- **REST Countries** - [Website](https://restcountries.com/) | [Documentatie](https://restcountries.com/#endpoints-all) | [Voorbeeld fetch-link](https://restcountries.com/v3.1/name/belgium)
- **Open Library** - [Website](https://openlibrary.org/) | [Documentatie](https://openlibrary.org/developers/api) | [Voorbeeld fetch-link](https://openlibrary.org/search.json?q=1984)
- **Open-Meteo** - [Website](https://open-meteo.com/) | [Documentatie](https://open-meteo.com/en/docs) | [Voorbeeld fetch-link](https://api.open-meteo.com/v1/forecast?latitude=51.22&longitude=4.40&current_weather=true)
- **Quotable** - [Website](https://github.com/lukePeavey/quotable) | [Documentatie](https://github.com/lukePeavey/quotable#api-reference) | [Voorbeeld fetch-link](https://api.quotable.io/random)
- **Wikipedia** - [Website](https://nl.wikipedia.org/) | [Documentatie](https://www.mediawiki.org/wiki/API:Main_page) | [Voorbeeld fetch-link](https://nl.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=5)
- **Random User** - [Website](https://randomuser.me/) | [Documentatie](https://randomuser.me/) | [Voorbeeld fetch-link](https://randomuser.me/api/?results=5)
- **OpenWeatherMap** (API key vereist) - [Website](https://openweathermap.org/) | [Documentatie](https://openweathermap.org/api) | [Voorbeeld fetch-link](https://api.openweathermap.org/data/2.5/weather?q=Brussels&appid=YOUR_API_KEY)
- **NewsAPI** (API key vereist) - [Website](https://newsapi.org/) | [Documentatie](https://newsapi.org/docs) | [Voorbeeld fetch-link](https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY)
- **Pixabay** (API key vereist) - [Website](https://pixabay.com/) | [Documentatie](https://pixabay.com/api/docs/) | [Voorbeeld fetch-link](https://pixabay.com/api/?key=YOUR_API_KEY&q=yellow+flowers&image_type=photo)
- **Unsplash** (API key vereist) - [Website](https://unsplash.com/) | [Documentatie](https://unsplash.com/documentation) | [Voorbeeld fetch-link](https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY)

### Eigen API zoeken
Je mag ook zelf een andere API kiezen. Je moet dan wel **zélf** uitzoeken hoe die API werkt (het endpoint, de parameters, de JSON-structuur). 

### API keys
Als jouw gekozen API om een API key vraagt (zoals OpenWeatherMap, NewsAPI, Pixabay of Unsplash), moet je deze key **zélf aanvragen** en werkend in je code krijgen. Dit doe je meestal door je te registreren op de website van de API en een account aan te maken. In de instellingen van je account vind je dan je API key terug.

API keys zijn persoonlijk. Deel jouw key niet in Smartschool en vermeld deze niet ergens publiek online.

## Wat maak je?

Je bouwt een semantisch correcte website met een duidelijke structuur en lay-out. Je website bevat onderstaande onderdelen.

### Structuur van je project

Werk in je vakmap voor **Weboriëntatie**.

```
VoornaamA_API/
├── index.html
├── style.css
└── app.js
```

- **HTML:** Zorg voor een logische semantische opbouw (bijv. `header` `nav`, `main`).
- **CSS:** Voorzie een rustige lay-out en vormgeving.
- **JS:** Gebruik duidelijke functies, zorg dat resultaten naar de DOM worden geladen.

### HTML

- **Koptekst en uitleg**: Een duidelijke titel en een korte uitleg over wat de website doet.
- **Input:** Een zoekveld en/of een drukknop (`button`) die een API-call triggert. 
- **Resultaat:** Een `div` of lijst (`ul`/`li`) waarin de opgehaalde data wordt weergegeven.

In je HTML ziet dat er als volgt uit: 

```html
<main>
  <h1>Titel van je website</h1>
  <p>Korte uitleg over wat de website doet</p>
  
  <input type="text" id="zoekveld" placeholder="Zoek hier...">
  <button id="zoekknop">Zoeken</button>

  <div id="resultaat"></div>
</main>
```

### JavaScript

- **Feedback tijdens laden:** Een eenvoudige visuele indicatie (bijv. de tekst `"<p>Bezig met laden...</p>"`) zolang de data aan het ophalen is.
- **Error state of geen resultaten:** Een begrijpelijke melding op het scherm als er iets misgaat of als er geen resultaten zijn voor de zoekopdracht.
- **Input:** Bij een zoekveld moet ook de Enter-toets (`keypress`) werken om te zoeken.
- **Resultaten tonen:** Laat de opgehaalde data netjes zien in de interface (bijvoorbeeld in een `div` of lijst). Voorzie minstens titel/naam, wat kerninformatie en waar mogelijk een afbeelding. Als je meerdere resultaten ophaalt, kan je hiervoor "kaarten" (cards) bouwen of een lijst (`ul`/`li`) gebruiken.
- **Geen hardcoded resultaten** in je HTML. Alle data (inclusief foutmeldingen of laadberichten) wordt via JavaScript (`innerHTML` of `createElement`) in de DOM geladen.
- **Functies:** Schrijf je JavaScript netjes in functies (bijv. `zoekKnop()` of `toonResultaat()`).

### Extra interactie

Voeg een extra interactie toe aan je website (dit mag een simpele knop zijn zoals de "Willekeurig Artikel" knop uit het Wikipedia voorbeeld, het beperken van het aantal resultaten met `.slice()`, sorteren, een "laad meer"-functie, etc.).

## Technisch

Zorg ervoor dat je de volgende technische concepten begrijpt en toepast in je JavaScript, schrijf commentaar waar nodig.

- **`fetch`**: Dit is de functie die je gebruikt om via het internet een aanvraag (request) te sturen naar het webadres (endpoint) van de API om de gegevens op te halen.
- **`async` en `await`**: 
  - **`async`** zet je voor een functie om aan te geven dat deze taak op de achtergrond gebeurt. Zo kan de rest van je website gewoon blijven werken terwijl je wacht op een antwoord van de API.
  - **`await`** vertelt je code om even te "pauzeren" bij die specifieke regel, totdat de gegevens van de API ook daadwerkelijk zijn binnengekomen.
- **`encodeURIComponent`**: Een functie die speciale tekens (zoals spaties of leestekens) in een zoekterm omzet naar een veilig formaat. Hierdoor "breekt" je URL niet als een gebruiker een spatie in de zoekbalk typt.
- **`try...catch`**: Een veilige manier om fouten op te vangen. In het **`try`**-blok zet je je ophaal-code. Gaat er iets mis (bijv. de API is offline)? Dan crasht je code niet, maar springt het script naar het **`catch`**-blok, waar je een nette foutmelding kan afhandelen.

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
