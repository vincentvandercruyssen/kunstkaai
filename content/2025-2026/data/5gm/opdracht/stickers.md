+++
title = 'Opdracht: Stickers'
date = 2026-04-30T00:00:00Z
draft = false
+++

In deze opdracht maak je een reeks [guerrillamarketing stickers](https://nl.wikipedia.org/wiki/Guerrillamarketing) aan. Denk hierbij aan thematische afbeeldingen gecombineerd met een eigen logo, een specifieke naam, een quote of iets anders. Je ontwerpt een visuele stijl die perfect bij jouw thema past: dit kan een duotoon effect zijn, risostijl, oude film, een specifieke kleurenreeks, zeefdruk, enzoverder.

*Guerrillamarketing is een marketingtechniek die poogt om met beperkte middelen een groot resultaat te bereiken. Guerrillamarketing is erop gericht om in een zeer korte tijd veel media-aandacht of aandacht van publiek te behalen.*

Je werkt hiervoor met **Photoshop Actions**, **Adjustment Layers** en de **Output-functie in Bridge**. Het eindresultaat is een consistente reeks beelden in jouw gekozen stijl, gebundeld in een overzichtelijk **PDF-contactblad**. Zo oefen je zowel technische als visuele vaardigheden op een gestructureerde manier.

## Voorbereiding

Zoek 32 beelden op bijvoorbeeld via [unsplash.com](https://unsplash.com), [pexels.com](https://pexels.com), [pinterest.com](https://pinterest.com),... rond één gekozen thema of keyword dat past bij jouw guerrillamarketing concept.

Maak in je map **Datamanagement** een nieuwe map **`VoornaamA_Stickers`**, maak daarin twee submappen: 
 - **`Originelen`** → voor je 32 beelden.
 - **`Batch`** → voor de bewerkte resultaten.

Sla de 32 afbeeldingen op in **Originelen**.

## Photoshop Action maken

- Open één van je afbeeldingen in Photoshop.
- Open het venster **Handelingen** (Venster → Handelingen, Window → Actions).
- Maak een **nieuwe handeling** aan (bijv. "Stickerstijl").

In je handeling neem je volgende stappen op...

### Formaat

- Verklein de afbeelding tot **15 cm hoogte**, proportioneel, Resolutie: 300 dpi.

{{< img src="/img/data/opdracht-04-stickers-imagesize1.png" >}}

### Ontwerp & Tekst

- Voeg een of meerdere **tekstlagen of grafische elementen** toe (bijv. je logo, een naam, een quote).
- Als je tekst horizontaal en verticaal wilt centreren, gebruik dan het **Beweeg-gereedschap** in combinatie met **Alles selecteren** (Select → All).
- Schuif de elementen vervolgens manueel naar boven of onder, zoals jij wilt. 
 ➜ Let op: Het is belangrijk dat je eerst het aligneren toepast, *tijdens* je opname, anders zal de action de tekst bij andere beelden waarschijnlijk verkeerd plaatsen.
- Zorg ervoor dat het ontwerp (lettertype, kleur, compositie) past bij de Guerrilla Marketing vibe.

{{< img src="/img/data/opdracht-04-stickers-aligntext1.png" percent="40" >}}

### Stijl & Effecten

- Bedenk een bepaalde stijl die thematisch past bij je stickers: **duotoon, risostijl, oude film, een specifieke kleurenreeks, zeefdruk, etc.**
- Voeg aan de tekst effecten toe via **Laagstijl** (Layer Style), bijvoorbeeld Bevel & Emboss, Stroke of Drop Shadow. 
 ➜ Je mag hier **overdrijven**: het mag visueel knallen en moet opvallen op straat!

 {{< img src="/img/data/opdracht-04-stickers-bevel1.png" >}}

### Kleuren (Adjustment Layers)

Voeg **aanpassingslagen (Adjustment Layers)** toe om je specifieke stijl (duotoon, riso, etc.) te creëren. Bijvoorbeeld:

- **Posterize**: reduceer kleuren tot enkele stappen voor een zeefdruk-effect.
- **Gradient Map (Verloop toewijzen)**: stel een palet in voor een perfecte duotoon of risostijl.
- Optioneel: voeg andere aanpassingslagen toe (zoals Hue/Saturation, Levels, Color Balance...) om het effect te versterken.
- Zoek naar andere manieren om je foto's naar een ander niveau te tillen en bij het concept passen.

| | |
|-|-|
|{{< img src="/img/data/opdracht-04-stickers-adjustmentlayer2.png" >}}|{{< img src="/img/data/opdracht-04-stickers-adjustmentlayer1.png" >}}|

### Kopie opslaan

- Gebruik **Bestand → Kopie opslaan**
- Indeling: **JPEG**
- Kwaliteit: **9**
- Opslaan in map **Batch**

📌 **Stop nu je opname** in het Handelingen-venster.

⚠️ **Belangrijk:** De opslaglocatie die je tijdens de opname kiest, wordt vastgelegd in de handeling. Deze kan later nog worden overschreven via de **Batch-instellingen**.

## Batch uitvoeren

- Ga naar **Bestand → Automatisch → Batch**
- Kies je **aangemaakte handeling**.
- **Source folder**: map `Originelen` 
- **Destination folder**: map `Batch`
- Vink aan: **Override Action “Save As” Commands ("Opslaan als"-opdrachten in handeling negeren)**

Naamgeving: 
 - **VoornaamA_Sticker_** 
 - **2-digits volgnummer** (01, 02, 03...) 
 - **extension**

 {{< img src="/img/data/opdracht-04-stickers-batch1.png" >}}

Start de batch en laat Photoshop alle stickers automatisch genereren.

## PDF-contactblad maken in Bridge

- Open **Adobe Bridge** en ga naar de map `Batch`.
- Open de werkruimte **Output (Uitvoer)**.
- Selecteer al je 32 bewerkte stickers en sleep ze in het document.

Stel in:

- **Raster**: 4 kolommen x 4 rijen
- **Marge** boven: **0,5cm** en links, rechts, onder: **1 cm**
- **Cell spacing**: **0,4 cm**
- **Koptekst aanzetten** met als tekst: **VoornaamA Stickers**
- **Header size**: 1 cm

Je hebt maximaal twee pagina's.

Exporteer als PDF met de benaming `VoornaamA_Stickers.pdf` en sla op in de map `VoornaamA_Stickers`.

{{< img src="/img/data/opdracht-04-stickers-contactblad1.png" >}}

## Action-bestand opslaan

- Open het menu in het **Handelingen-venster**.
- Kies **Handeling opslaan (Save Action)**
- Sla het bestand op als `VoornaamA_Stickers_Effect.atn` in je map `VoornaamA_Stickers`.

## Indienen

Controleer of je in de map `VoornaamA_Stickers` volgende onderdelen hebt:

- 📂 **Originelen** → je 32 originele afbeeldingen 
- 📂 **Batch** → je 32 bewerkte stickers 
- 📄 **PDF** → contactblad met 32 thumbnails 
- 🎯 **ATN** → je opgeslagen handeling (Photoshop Action)

Ga naar **OneDrive** en kopieer de **link naar je volledige map `Datamanagement`**. 

Dien deze koppeling in via **Google Classroom** bij de opdracht **Stickers**.

## Puntenverdeling

- **Naamgeving en structuur (04)** `VoornaamA_Stickers` met submappen `Originelen` (32 zelfverzamelde JPG's rond één thema), `Batch` (32 bewerkte stickers), PDF-bestand en .ATN-bestand correct bewaard.
- **Photoshop Action-bestand (04)** bevat beeldverkleining, toegevoegde grafische elementen/tekst, gerichte stijl/effecten, minimaal twee aanpassingslagen (zoals Gradient Map of Posterize), en correcte opslaginstellingen.
- **Effecten en visuele stijl (04)** stijl past bij het thema (duotoon, riso, zeefdruk, etc.), grafische elementen (logo, tekst, quote) zijn goed geplaatst, totaalbeeld is consistent en werkt als een Guerrilla Marketing stickerreeks.
- **Originelen en Batchverwerking (04)** alle 32 beelden automatisch bewerkt en correct hernoemd (`VoornaamA_Sticker_01.jpg` tot `VoornaamA_Sticker_32.jpg`).
- **PDF-contactblad (04)** correct opgemaakt: 4x4 raster, juiste marges, header met naam, max. twee pagina's.
