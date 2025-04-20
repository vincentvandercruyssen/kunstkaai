+++
title = 'Opdracht: Stickers'
date = 2025-04-02T08:00:00-07:00
draft = false
+++

In deze opdracht maak je een reeks **grafische stickers** aan. Je combineert je **voornaam of bijnaam** met een opvallend grafisch effect op een serie foto's. Je werkt met **Photoshop Actions**, **Adjustment Layers** en de **Output-functie in Bridge**. Het eindresultaat is een consistente reeks beelden in jouw stijl, gebundeld in een overzichtelijk **PDF-contactblad**. Zo oefen je zowel technische als visuele vaardigheden op een gestructureerde manier.

## Voorbereiding

Zoek 32 beelden op [unsplash.com](https://unsplash.com) of [pexels.com](https://pexels.com) rond één gekozen thema of keyword.

Maak in je map **Datamanagement** een nieuwe map **`Voornaam Stickers`**, maak daarin twee submappen: 
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

### Tekst

- Voeg een **grote tekstlaag** toe met je **voornaam of bijnaam**.
- Gebruik het **Beweeg-gereedschap** in combinatie met **Alles selecteren** (Select → All) om je tekst mooi horizontaal en verticaal te centreren.
- Schuif de tekst vervolgens manueel naar boven of onder, zoals jij wilt. 
 ➜ Let op: Het is belangrijk dat je eerst het aligneren toepast, *tijdens* je opname, anders zal de action de tekst bij andere beelden waarschijnlijk verkeerd plaatsen.
- Kies een **strak en leesbaar lettertype** en een opvallende kleur.

{{< img src="/img/data/opdracht-04-stickers-aligntext1.png" percent="40" >}}

### Stijl

- Voeg aan de tekst een **Bevel & Emboss** toe via **Laagstijl** (Layer Style). 
 ➜ Je mag hier **overdrijven**: het mag visueel knallen.

 {{< img src="/img/data/opdracht-04-stickers-bevel1.png" >}}

### Kleuren

Voeg de volgende **aanpassingslagen (Adjustment Layers)** toe:

- **Posterize**: reduceer kleuren tot enkele stappen.
- **Gradient Map (Verloop toewijzen)**: stel een palet in van minimaal **drie kleuren**.
- Optioneel: voeg nog een derde aanpassingslaag toe (zoals Hue/Saturation, Levels,...).

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
 - **Voornaam Sticker_** 
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
- **Koptekst aanzetten** met als tekst: **Voornaam Stickers**
- **Header size**: 1 cm

Je hebt maximaal twee pagina's.

Exporteer als PDF met de benaming `Voornaam Stickers.pdf` en sla op in de map `Voornaam Stickers`.

{{< img src="/img/data/opdracht-04-stickers-contactblad1.png" >}}

## Action-bestand opslaan

- Open het menu in het **Handelingen-venster**.
- Kies **Handeling opslaan (Save Action)**
- Sla het bestand op als `Voornaam Stickers Effect.atn` in je map `Voornaam Stickers`.

## Indienen

Controleer of je in de map `Voornaam Stickers` volgende onderdelen hebt:

- 📂 **Originelen** → je 32 originele afbeeldingen 
- 📂 **Batch** → je 32 bewerkte stickers 
- 📄 **PDF** → contactblad met 32 thumbnails 
- 🎯 **ATN** → je opgeslagen handeling (Photoshop Action)

Ga naar **OneDrive** en kopieer de **link naar je volledige map `Datamanagement`**. 

Dien deze koppeling in via **Google Classroom** bij de opdracht **Stickers**.

## Puntenverdeling

- Mapstructuur en naamgeving (02)
- Correcte Photoshop Action (06)
- Effecten en lagen juist toegepast (04)
- Batch correct toegepast op 32 beelden (04)
- Contactblad in PDF met juiste instellingen (02)
- Handeling opgeslagen als ATN-bestand (02)