+++
title = 'Cursus: PHP'
date = 2025-09-01T00:00:00Z
draft = false
+++

## Wat is PHP?

**PHP** staat voor *Hypertext Preprocessor* en is een **open source server-side scriptingtaal** die vooral wordt gebruikt in **webontwikkeling**.
Met PHP kun je **dynamische websites** bouwen: websites die niet altijd dezelfde inhoud tonen, maar reageren op de gebruiker, tijd, gegevens uit een database of andere invoer.

PHP draait op de **server**, niet in de browser. Dat betekent dat de PHP-code eerst op de **webserver** wordt uitgevoerd, waarna enkel de **HTML-uitvoer** naar de bezoeker wordt gestuurd. De gebruiker ziet dus nooit de onderliggende code.

PHP wordt al sinds de jaren 1990 gebruikt en is vandaag nog steeds aanwezig op bijna **80% van alle websites**, volgens onafhankelijke webtechnologie-onderzoeken. Grote platformen zoals **Facebook**, **Wikipedia**, **WordPress** en **Drupal** zijn ofwel met PHP gebouwd, of gebruiken het nog steeds als kernonderdeel.

{{< youtube a7_WFUlFS94 >}}

### Waarom is PHP zo populair?

* **Gratis en open source**: Iedereen kan het gebruiken, aanpassen en uitbreiden.
* **Platformonafhankelijk**: Werkt op Linux, macOS, Windows en vrijwel elke webserver.
* **Sterke community**: Uitgebreide documentatie, fora en miljoenen voorbeelden online.
* **Naadloze integratie met HTML**: Je kunt PHP-code direct tussen HTML schrijven.
* **Ondersteuning voor databases**: Vooral **MySQL**, maar ook **PostgreSQL**, **SQLite**, enz.

Dankzij die kenmerken is PHP bijzonder geschikt voor **beginners** én **professionals**. Zeker wie **WordPress** of **webapplicaties** wil aanpassen, heeft met PHP een krachtig gereedschap in handen.

## Programmeertaal of scripttaal?

PHP is een **scripttaal** die zich richt op specifieke **webtoepassingen**. Maar wat betekent dat precies?

### Programmeertaal

Een **programmeertaal** (zoals C of Java) wordt **gecompileerd**: de code wordt eerst vertaald naar **machinetaal**, die rechtstreeks door de computer kan worden uitgevoerd. Deze programma’s draaien **zelfstandig**.

### Scripttaal

Een **scripttaal** (zoals PHP, Python, JavaScript) wordt meestal **geïnterpreteerd**: de code wordt **regel per regel uitgevoerd** door een ander programma (de interpreter).
Scripttalen worden vaak gebruikt voor **specifieke taken** zoals webpagina’s genereren, data verwerken of automatisering.

### Server-side versus client-side

* **Client-side**: de code draait in de **browser** (zoals **JavaScript**)
* **Server-side**: de code draait op de **server** (zoals **PHP**)

PHP is dus een **server-side scripttaal**:
de **server voert de instructies uit**, bouwt de webpagina op, en stuurt de **klaar gegenereerde HTML** naar de gebruiker.

**Voorbeeld van de werking:**

1. De gebruiker vraagt een pagina aan (`index.php`)
2. De webserver voert de PHP-code uit
3. De PHP-code haalt bijvoorbeeld gegevens op uit een database
4. De server bouwt een HTML-pagina
5. De browser ontvangt enkel de HTML (geen PHP meer)

## Wat kun je doen met PHP?

PHP is veelzijdig. Je kunt er o.a. mee:

* **Dynamische inhoud tonen** (bv. persoonlijke begroetingen, tijdsafhankelijke boodschappen)
* **Data opslaan of ophalen uit een database** (meestal MySQL)
* **Contactformulieren** verwerken en **e-mails verzenden**
* **Gebruikers beheren** (inloggen, registreren, sessies)
* **Bestanden genereren** (PDF’s, CSV’s)
* **Volwaardige webapplicaties** bouwen

Omdat PHP enkel op de **server** draait, is het ook **veiliger**: gebruikers zien enkel de **HTML-uitvoer**, nooit de broncode.

### Voorbeeld

```php
<?php
  echo "Hello World!";
?>
```

**Browseroutput:**

`Hello World!`

Let op: de PHP-code zelf is **onzichtbaar** in de broncode van de pagina.

## Waarom PHP gebruiken?

PHP heeft vele troeven:

* **Beginner-vriendelijk**: De syntax is eenvoudig en goed te begrijpen voor wie HTML kent.
* **Breed toepasbaar**: Van kleine scripts tot grote webplatformen.
* **Sterke integratie met HTML**: PHP en HTML werken moeiteloos samen.
* **Snelheid**: Door jarenlange optimalisatie is PHP zeer performant.
* **Ruime ondersteuning**: Veel hostingproviders ondersteunen PHP standaard.
* **Lage kostprijs**: PHP is gratis, en open source frameworks zijn dat ook.

Daarnaast bestaan er krachtige **frameworks** die PHP nog efficiënter maken. Frameworks helpen ontwikkelaars om **sneller**, **veiliger** en **gestructureerder** te werken.

PHP is een krachtige, flexibele en toegankelijke **server-side scripttaal** waarmee je dynamische websites kunt bouwen.
Ze vormt de **ruggengraat** van veel moderne webapplicaties, en is onmisbaar voor wie de stap wil zetten van **statische HTML-sites** naar **interactieve en datagestuurde webapplicaties**.

## PHP installeren

PHP is **software** die je op je computer installeert om **dynamische websites** lokaal te kunnen draaien en testen. Zonder PHP kan je geen `.php`-bestanden uitvoeren op je eigen toestel.

Je kunt **PHP** handmatig downloaden via de officiële website [php.net](https://www.php.net/downloads), dat vereist echter enkele **extra stappen**: je moet het pakket zelf **uitpakken**, **configureren**, en **handmatig toevoegen aan het systeempad**, zodat het overal in je omgeving herkend wordt. Dat proces is minder gebruiksvriendelijk en foutgevoeliger.

Een **handigere en snellere keuze** is daarom om PHP te installeren via een pakketbeheerder of **package manager**. Een *package manager* is een programma dat software automatisch kan **zoeken, downloaden en installeren**, inclusief alle vereiste onderdelen. Zo hoef je niet zelf op zoek te gaan naar downloads of instellingen.

- Op **macOS** gebruik je de bekende package manager **Homebrew**.
- Op **Windows** gebruik je **Winget**, de standaard open source package manager van Windows.

Door PHP via zo’n package manager te installeren, wordt het bijvoorbeeld automatisch toegevoegd aan het **PATH** en meteen overal herkend (ook in **VS Code**).

### Homebrew (macOS)

Ga naar [brew.sh](https://brew.sh/), de officiële website van **Homebrew**. Daar vind je een kort commando dat je moet kopiëren en plakken in je **Terminal**. Dat kan in de standaard **Terminal-app** van macOS, of in de ingebouwde Terminal van **VS Code**.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

De installatie kan enkele minuten duren. Volg de instructies in beeld en beantwoord eventuele vragen met **Enter** of **y** (voor “yes”).

Na de installatie kun je meteen **PHP** installeren. Homebrew installeert automatisch de **laatste stabiele versie**.

```bash
brew install php
```

Start daarna **VS Code** eventueel even opnieuw op. Controleer vervolgens of PHP correct is geïnstalleerd met:

```bash
php -v
```

Als je een versie te zien krijgt (bijvoorbeeld `PHP 8.4.13`), is alles goed verlopen en kun je aan de slag.

### Winget (Windows)

Gebruik als pakketbeheerder **Winget**, de standaard open source **package manager** van Windows. Chocolatey is eveneens een bekende en betrouwbare keuze, maar Winget volstaat ruim voor PHP.

- Je kunt deze installatie uitvoeren in de **terminal van VS Code** (met PowerShell of Git Bash).
- Controleer eerst of Winget beschikbaar is:

```bash
winget -v
```

Verschijnt er een versienummer? Dan is Winget actief.

Zoek daarna naar beschikbare PHP-versies:

```bash
winget search php
```

Zoek de **laatste stabiele versie** in de lijst (bijvoorbeeld `PHP.PHP.8.4`).

Installeer PHP met:

```bash
winget install PHP.PHP.8.4
```

Controleer de installatie:

```bash
php -v
```

Als je nog niets ziet, herstart dan **VS Code**. Daarna zou `php -v` de geïnstalleerde versie moeten tonen.

## PHP Server (VS Code-extensie)

**PHP Server** is een eenvoudige manier om een **lokale server** te starten via een **extensie** in **VS Code**. Zo kun je je PHP-bestanden meteen testen in de browser.

- Installeer de extensie **PHP Server** (van *brapifra*).
- Open je **projectmap** in VS Code en ga naar een `.php`-bestand.
- Klik **rechts** in het bestand en kies **"PHP Server: Serve project"**, of gebruik het **blauwe icoontje** rechtsbovenaan.
- Er verschijnt een **lokale link** (bijv. `http://localhost:3000`) die opent in je browser.
- De server **voert je PHP-code uit** en toont het resultaat als **gewone HTML**, net zoals op een echte webserver.

---

Wordt vervolgd...