+++
title = "Opdracht: Wiki"
date = 2025-09-24T00:00:00Z
draft = false
+++

In deze opdracht bouw je een kleine website over een natuurthema. Je kiest één onderwerp: een diersoort (fauna) of een plantensoort (flora). Je maakt meerdere pagina’s (minimaal vier) die inhoudelijk bij elkaar horen en via een duidelijke navigatie met elkaar verbonden zijn. 

Alle pagina’s delen dezelfde kop en voettekst met PHP via `include`, om de header en footer slechts **één keer te schrijven**, en vervolgens op elke pagina te **hergebruiken**. In de voettekst toon je automatisch het huidige jaar en een e-mailadres met een PHP-variabele. De focus ligt op structuur en hergebruik, niet op complex programmeren. Werk met een eenvoudige, verzorgde opmaak in CSS voor een leesbaar geheel. Geef de site een persoonlijk karakter, maar vermijd overbodige code of stijlen uit willekeurige (robot) templates.

PHP is een **server-side scripttaal** waarmee je dynamische websites kunt bouwen. De code wordt uitgevoerd op de server en zet PHP-instructies om in gewone HTML. Zo kun je makkelijk onderdelen hergebruiken of automatisch inhoud tonen.

Binnen deze opdracht installeren we PHP lokaal via **Winget** (Windows) of **Homebrew** (macOS). De pagina’s bekijken we rechtstreeks met de **VS Code-extensie PHP Server**. Zie dit als een soort lokale testserver die de PHP-code omzet naar leesbare HTML voor de browser. We maken nog geen koppelingen met een database, dus deze eenvoudige opstelling volstaat voor nu.

Lees meer over de basis in de [cursus PHP](../../../cursus/php/).

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

## OneDrive-map

- Maak in **OneDrive** een map voor het vak **Webontwikkeling**. 
- Kopieer de **deel-link**. Je dient die in via **Google Classroom**. 

## Mapstructuur

- Maak een map in je vakmap **Webontwikkeling** met naam **VoornaamA_Wiki**.
- Volg de schoolafspraak: Voornaam + initialen achternaam_Naam opdracht. 

```
VoornaamA_Wiki/
├── index.php
├── pagina2.php
├── pagina3.php
├── pagina4.php
├── style.css
└── includes/
    ├── header.inc.php
    └── footer.inc.php
└── images/
```

De bestandsnamen mogen afwijken, zolang je **minstens vier pagina’s** hebt die via de navigatie bereikbaar zijn.

Zorg dat je **header** en **footer** via `include()` in elk PHP-bestand worden toegevoegd.

## Inhoud

Kies één **diersoort** of **plant** en maak vier logische pagina’s, bijvoorbeeld:

### fauna (dieren)
- **Home** algemene inleiding over het dier 
- **Leefgebied** waar leeft het, welk klimaat, verspreiding 
- **Voeding** wat eet het, hoe jaagt of zoekt het eten 
- **Weetjes** interessante feiten, bedreigingen, rol in ecosysteem 

### flora (planten)
- **Home** algemene beschrijving 
- **Kenmerken** uiterlijk, groeiwijze, hoogte, blad, bloem 
- **Verspreiding** waar komt het voor, inheems of exotisch 
- **Gebruik of weetjes** toepassingen, symboliek, bijzondere feiten 

Gebruik op elke pagina minstens één korte paragraaf tekst en eventueel een lijst. 
Beeldmateriaal is toegestaan, maar optimaliseer de grootte (max. 800px breed).

## Header en navigatie

In je **header** komt:
- De **titel** van je website (bv. “De tijger”, “De eik”)
- Een **navigatiebalk** met links naar alle pagina’s

Je header schrijf je **één keer** in `includes/header.inc.php` en voeg je toe in elke pagina met `include()`.

## Footer

In je **footer** komt:
- Jouw **voornaam + eerste letter achternaam**.
- Het **huidige jaar** via PHP (functie `date("Y")`).
- Een **e-mailadres** als klikbare link (`mailto:`), via een **PHP-variabele**.

Je footer schrijf je **één keer** in `includes/footer.inc.php` en voeg je toe in elke pagina met `include()`.

## Stijl (CSS)

Schrijf een **eenvoudige, overzichtelijke CSS** in `style.css`.

Richt je op:
- leesbaarheid (lettertype, regelafstand)
- nette layout (marges, padding)
- onderscheid tussen koppen, paragrafen, navigatie
- geen eindeloos gekopieerde templates of AI-gegenereerde stijlen

Hou het **licht en functioneel**, focus op **structuur**.

## Testen en bekijken

- Start je project in **VS Code**
- Open de **Command Palette** (`Ctrl + Shift + P`)
- Kies **PHP Server: Serve Project**
- De browser opent een **lokale link** (bijv. `http://localhost:3000`)

Controleer of:
- alle pagina’s bereikbaar zijn via de navigatie
- header en footer correct hergebruikt worden
- het jaartal en e-mailadres verschijnen
- je CSS correct wordt toegepast

## Inleveren

- Zorg dat je map **VoornaamA_Wiki** in je **OneDrive** gesynchroniseerd wordt. 
- Deel de **leeslink** van je gehele vakmap **Webontwikkeling** via **Google Classroom**.