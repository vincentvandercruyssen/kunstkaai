+++
title = "Opdracht: Kaaikunst (Frontend)"
date = 2025-10-19T00:00:00Z
draft = false
+++

Bouw een werkende front-end van de Kaaikunst-website op basis van jouw XD/Figma-ontwerp. Gebruik semantische HTML, eigen CSS en PHP-includes voor herbruikbare delen. Bereid de site voor op latere koppeling met een MySQL-database.

De website is responsive voor desktop/laptop en smartphone. 

## Pagina’s en velden

* Home
  * Algemene info uit de tekst
* Aanmelden / Registreren
  * E-mail
  * Wachtwoord
* Artikelen
  * Sleutelhangers
  * Kaartjes
  * Mockups
* Contact
  * Voornaam
  * Naam
  * E-mail
  * Onderwerp
  * Bericht

Referentie: [https://kaaikunst.kunstkaai.online/](https://kaaikunst.kunstkaai.online/index.php)

## Techniek

* Maak een PHP-structuur met includes
  * `partials/header.php` met logo en navigatie
  * `partials/footer.php`
  * `partials/head.php` voor `<meta>` en stylesheet-koppeling
* Bestandsstructuur
  * `index.php`, `aanmelden.php`, `registreren.php`, `contact.php`
  *  `artikelen.php`, `artikelen-sleutelhangers.php`, `artikelen-kaartjes.php`,... OF singlepage op de landingspagina
  * `css/style.css`
  * `img/` en `mockups/`
  * `partials/`
* Formulieren
  * Gebruik correcte `name`-kenmerken voor alle velden.
  * Client-side validatie met HTML-kenmerken waar zinvol.
* Responsief
  * Mobile-first CSS met flex of grid.
  * Navigatie werkt op mobiel en desktop.
* Toekomst
  * Voorzie waar nodig plaats voor dynamische inhoud uit de database.
  * Gebruik nu al nette componenten zodat de overgang naar PHP+MySQL eenvoudiger wordt.

## Tekst voor Home

> Welkom bij Kaaikunst van 6 Grafimedia en 6 Crossmedia
>
> KAAIKUNST is een vakoverschrijdend project van 6 Crossmedia en 6 Grafimedia aan Kunstkaai ter voorbereiding van hun geïntegreerde eindproef. Het uitgangspunt hiervoor was Pop Art, in het kader van het vak kunstgeschiedenis. Andy Warhol, Roy Lichtenstein en Keith Haring werden als inspiratiebronnen geanalyseerd en herwerkt.
>
> **Wenskaarten & Sleutelhangers**
> Alle leerlingen hebben bij het vak grafische vormgeving een drukklare wenskaart, of een sleutelhanger ontworpen. De sleutelhangers werden door de leerlingen zelf vervaardigd in Fablab+. De technische opmaak gebeurde in de klas in het programma Illustrator op ware grootte. Omdat de goederen nog niet bestonden tijdens de opmaak van de webshop, maakten de leerlingen voorbeelden ter presentatie in Photoshop.
>
> **Samenwerking drukwerk**
> Na het ontwerpwerk, wordt een drukklaar document klaargemaakt, zodat de leerlingen uit het 6de van de afdeling Printmedia van De Stemstroom de wenskaarten kunnen drukken en verwerken. De kaarten zullen na bestelling verstuurd worden met de post.
>
> **Website**
> Bij het vak internettechnieken ontwikkelden de leerlingen van 6 Crossmedia een volledig interactieve website waarop klanten zich kunnen registreren, aanmelden en vervolgens de artikelen kunnen aankopen. De grafische opmaak gebeurde in de klas in XD of Figma, de technische uitwerking in html, css, php en mysql.
>
> **Aanbod kaarten en Sleutelhangers**
> Ons aanbod is beperkt: op is op. Mocht de voorraad niet toereikend zijn, nemen wij contact met u op om een alternatieve bestelling te bespreken. Let op: door variaties in het materiaal kunnen de kleuren van het uiteindelijke ontwerp enigszins afwijken van het voorbeeld.
>
> **Pakketten gedrukte wenskaarten**
> De gedrukte kaarten van 6 Grafimedia zullen per 11 verkocht worden. U heeft de keuze tussen pakket 1 en pakket 2.

## Minimale criteria

* Correcte HTML-structuur met semantische elementen.
* Eén extern CSS-bestand, netjes georganiseerd en herbruikbaar.
* PHP-includes voor head, header en footer werken op alle pagina’s.
* Werkende navigatie met actieve staat.
* Responsief gedrag voor minimaal één breekpunt.
* Formulieren tonen labels, placeholders en basisvalidatie.
* Mappen- en bestandsnamen zijn duidelijk en zonder spaties.

## Aanpak en workflow

* Start vanuit je XD/Figma-frames en vertaal componenten naar semantische HTML.
* Maak eerst de desktopversie volgens 1920 × 1080, voeg daarna mobiele stijlen toe. Of omgekeerd...
* Test lokaal met XAMPP of PHP Server in VS Code.
* Voorzie duidelijke alt-teksten en bestandsnamen voor alle afbeeldingen.
* ...

## Indienen

* Werk in je vakmap in OneDrive, kopieer de koppeling en plak in de opdracht in Google Classroom.
* In je vakmap zit een map `VoornaamA_Kaaikunst` met alles erop en eraan.

## Puntenverdeling

* **Structuur en includes** Correcte mappen en bestanden, consistente includes (PHP).
* **Inhoud (HTML)** Semantiek, correcte kenmerken, navigatie.
* **Vormgeving (CSS)** Layout, typografie en responsive op mobiel en desktop.
* **Formulieren en UX** Duidelijke labels, states, validatie,...
* **Vormgeving ontwerp** Trouw aan voorontwerp, verzorgd.