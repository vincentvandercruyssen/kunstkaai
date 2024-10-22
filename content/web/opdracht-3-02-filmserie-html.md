+++
title = 'Opdracht: Film of Serie (HTML)'
date = 2024-09-25T08:00:00-07:00
draft = false
+++

## Opgave

In deze opdracht leer je informatie te presenteren door een correct HTML-document te maken. Je kiest een film of serie en verzamelt informatie die je op een gestructureerde manier gaat indelen in een HTML-pagina. Het doel is om de basisstructuur van HTML toe te passen op een webpagina.

### Kies een film of serie

Kies een film of serie die je interessant vindt. Verzamel informatie en organiseer deze in vier onderdelen (`section`):
1. **Titel, Jaartal, Synopsis, Poster**: Voeg de titel van de film/serie toe, een korte samenvatting van het verhaal, en een posterafbeelding.
2. **Personages + Cast**: Beschrijf de belangrijkste personages en de acteurs/actrices die hen spelen.
3. **Visuele Shots**: Geef minimaal 5 screenshots of visuele hoogtepunten van de film of serie.
4. **Trivia of eigen interessant onderdeel**: Deze sectie kan variëren, bijvoorbeeld trivia, productiefeiten, of opmerkelijke weetjes over de film of serie.

### Organiseer de informatie

Maak een nieuwe map aan met een HTML-bestand en een aparte map voor afbeeldingen. Zorg ervoor dat je de informatie in HTML-elementen plaatst zoals titels, tekst, afbeeldingen en opsommingen. Gebruik Emmet om snel een basisstructuur te genereren.

Voor het onderdeel personages en cast gebruik je minstens één lijstje (`ul` met `li`-elementen).

### Bouw de basis HTML-structuur

Bij het maken van een HTML-pagina is het belangrijk om een duidelijke en logische structuur te hanteren. Dit doe je door verschillende HTML-elementen te gebruiken die elk een specifieke functie hebben. Zo gebruik je `<h1>` voor de hoofdtitel, `<p>` voor tekstblokken, en `<img>` voor het weergeven van afbeeldingen. Daarnaast zorgen elementen zoals `<header>`, `<main>`, en `<section>` ervoor dat de inhoud overzichtelijk wordt gepresenteerd en goed gestructureerd is.

1. **HTML-opmaak**: Gebruik de shortcut `!` in Emmet om de basisstructuur van een HTML-pagina snel te genereren. Dit creëert automatisch een correct gestructureerd document met de nodige elementen zoals `html`, `head`, en `body`.
2. **`title`-element**: Het `title`-element specificeert de titel van de webpagina. Deze titel wordt weergegeven in het tabblad van de browser en is belangrijk voor zoekmachines en gebruikers.
3. **`body`-element**: In de `body` creëer je twee hoofdinhoudsverdelende elementen, namelijk een `header` en een `main`.
4. **`header`-element**: Dit bevat de hoofdtitel van de pagina in een `<h1>`-element. Dit is de belangrijkste titel van je website, bijvoorbeeld de naam van de film of serie, en moet slechts één keer per pagina voorkomen.
5. **`main`-element**: Hierin plaats je de hoofdinhoud van de webpagina. Binnen het `<main>`-element verdeel je de inhoud in verschillende onderdelen aan de hand van `section`-element. Elke `section` krijgt een uniek `id`-attribuut zodat je deze goed kunt identificeren en later met CSS kunt stylen of via links kunt bereiken. 

Gebruik de volgende HTML-elementen:
- **`h2`-elementen** voor tussentitels van de `section`-elementen.
- **`p`-elementen** voor langere tekstblokken zoals beschrijvingen of samenvattingen.
- **`img`-elementen** voor het weergeven van afbeeldingen, met bijbehorende kenmerken zoals `src` (voor het bronbestand) en `alt` (voor beschrijvende tekst).
- **`ul`-element** met **`li`-elementen** voor opsommingslijsten, bijvoorbeeld om de cast of personages te tonen.

### Voeg afbeeldingen toe

Zorg ervoor dat de afbeeldingen in een aparte map worden geplaatst en dat de `src`-attributen correct verwijzen naar de afbeeldingen in de map.

## Puntenverdeling

- **Structuur (04)** `voornaam film.zip` met daarin `index.html` en map met afbeeldingen.
- **Elementen document (05)** `html`, `head`, `meta`, `title` (aangepast), body.
- **Elementen inhoudsverdeling (06)** `header`, `main`, min. vier `section`-elementen.
- **Elementen inhoudsstroom (06)** `h1`, `h2`,..., `img`, `p`, `ul` of `ol`, `li`.
- **Kenmerken (02)** `src`, `alt` of `width`.

## Veelvoorkomende fouten

1. Geen aparte map voor afbeeldingen.
2. Incorrect afsluiten van een element of verkeerd nesten.
3. Geen aanpassing van het `title`-element.
4. Het `body`-element is verplaatst naar een verkeerde plek of verkeerd genest.
5. Doorlopende tekst in `h1`, `h2`-elementen.
6. Een `section`-element zonder `id`-attribute.
7. Inhoud die zich buiten een `section`-element bevindt.
8. Een leeg alt-attribute voor het img-element.
9. Afbeelding `src` verwijst niet naar een lokale afbeelding in de map met afbeeldingen.