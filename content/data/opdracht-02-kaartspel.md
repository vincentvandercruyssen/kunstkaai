+++
title = 'Opdracht: Kaartspel'
date = 2024-08-30T08:00:00-07:00
draft = false
+++

Je gaat een kaartspel ontwikkelen met **Adobe InDesign** en data merge. Het project bestaat uit twee delen: eerst maak je een **Google Spreadsheet** met alle kaartgegevens, daarna een **InDesign-document** waarin deze gegevens automatisch worden verwerkt. Je leert werken met verschillende bestanden, bestandspaden, nauwkeurige documentinstellingen, lagen, rasters en het effectief gebruik van tekstkaders.

Het eindresultaat wordt een volledig speelbaar kaartspel met 18 unieke personages, elk met eigen kenmerken en effecten.

## Deel 1

In dit eerste deel ga je aan de slag met het voorbereiden van de gegevens voor je kaartspel. Je maakt een gestructureerde Google Spreadsheet waarin je alle informatie van de kaarten netjes organiseert - van de namen en types tot de statistieken en effecten. Deze voorbereiding is cruciaal voor een vlotte verwerking later binnen InDesign. Je leert ook meteen hoe je bestanden en mappen overzichtelijk kunt structureren.

### Mapstructuur

Maak een duidelijke mapstructuur, een projectmap in je map voor Datamanagement genaamd **Voornaam Kaartspel** waar je het volgende zult in verwerken:

- InDesign-bestand en CSV-bestand.
- Een map genaamd **Links** met alle benodigde PDF-bestanden (voorkant, kost, aanval, verdediging), afbeeldingen personages, PSD-bestand achterkant.

[Hier vind je een link naar het zip-bestand met de benodigdheden.](../../zip/Kaartspel-Links.zip) Hierin vind je: illustraties van de personages, Voorkant.ai (de voorkant en symbolen zul je hieruit exporteren voor je ontwerp in InDesign) en Achterkant.psd.

{{< img src="/img/data/opdracht-02-kaartspel-finder_links.png" percent="55" >}}

### Google Sheets

Maar eerst...

- Ga naar [sheets.new](https://sheets.new) in je internetbrowser, dit maakt een nieuw Google Spreadsheet bestand aan. 

Je hebt 12 kolommen nodig:
- Tekstkolommen: Benaming, Type, Effect
- Waardekolommen: Kost, Aanval, Verdediging
- Afbeeldingskolommen (met vooraan `'@`): '@Illustratie, '@Kost symbool, '@Aanval symbool, '@Verdediging symbool, '@Kaart Voorkant, '@Kaart Achterkant

De kolommen met `'@` vooraan zijn kolommen met afbeeldingen, dit symbool gebruikt InDesign om te weten dat de gegevens in deze kolom geen tekst zijn. Elke speelkaart heeft een unieke illustratie (bv. `Personage.png`). 

De symbolen op de kaarten achter Kost, Aanval en Verdediging worden respectievelijk aangeduid als: `Kost.pdf`, `Aanval.pdf` en `Verdediging.pdf`. Voor speelkaarten zonder kost of aanval laat je de cellen voor de bijbehorende tekst en afbeeldingen leeg. 

De Voorkant noemt `Voorkant.pdf`. De achterkant is een PSD-bestand genaamd `Achterkant.psd`. Voor -en achterkant zijn voor alle kaarten dezelfde. 

Vergeet niet voor elke bestandsnaam `"Links/"` toe te voegen, in deze submap zullen namelijk al je afbeeldingen zitten. Let goed op de bestandstypes. 

{{< img src="/img/data/opdracht-02-kaartspel-sheets_ingevuld.png" width="1400" >}}

#### Lijst kaarten

Hieronder staan alle tekstgegevens van de gevraagde personages/kaarten:

{{< table_layoutfixed >}}
| | |
|-|-|
| **Elegard** (Bemanning) {{< br >}} Kost: 1, Aanval: 1, Verdediging: 2 {{< br >}} Effect: Kan een vijandige aanval blokkeren als er minstens 1 geallieerde Bemanning in het spel is. | **Finton** (Bemanning) {{< br >}} Kost: 2, Aanval: 2, Verdediging: Geen {{< br >}} Effect: Krijgt +1 Aanval wanneer een andere geallieerde kaart wordt gespeeld. |
| **Nereus** (Bemanning) {{< br >}} Kost: 5, Aanval: Geen, Verdediging: 1 {{< br >}} Effect: +2 Verdediging voor alle geallieerden. Kan niet worden aangevallen als geallieerden in het spel zijn. | **Rosha** (Bemanning) {{< br >}} Kost: Geen, Aanval: 1, Verdediging: 1 {{< br >}} Effect: Kan voor 4 Kost een vijandige kaart neutraliseren tot de volgende beurt. |
| **Skadi** (Bemanning) {{< br >}} Kost: 2, Aanval: 1, Verdediging: 1 {{< br >}} Effect: Kan twee keer aanvallen. | **Kapitein Connelly** (Leider) {{< br >}} Kost: 5, Aanval: 2, Verdediging: 4 {{< br >}} Effect: +1 Aanval voor alle geallieerde Bemanningen. |
| **Harold** (Monteur) {{< br >}} Kost: 2, Aanval: Geen, Verdediging: 4 {{< br >}} Effect: Wanneer gespeeld, herstel 1 Schade van een geallieerde kaart. | **Haley** (Premiejager) {{< br >}} Kost: 3, Aanval: 3, Verdediging: 2 {{< br >}} Effect: Kan onmiddellijk aanvallen. |
| **Morrigan** (Premiejager) {{< br >}} Kost: 3, Aanval: 2, Verdediging: 3 {{< br >}} Effect: Wanneer gespeeld, breng 2 Schade toe aan een vijandige kaart. | **Davy** (Soldaat) {{< br >}} Kost: 5, Aanval: 5, Verdediging: 2 {{< br >}} Effect: Bij het aanvallen, breng ook 2 Schade toe aan een nabijgelegen vijandelijke kaart. |
| **Eon** (Soldaat) {{< br >}} Kost: 9, Aanval: 7, Verdediging: 6 {{< br >}} Effect: Immuun voor schade van kaarten met een Kost van 4 of lager. | **Freya** (Soldaat) {{< br >}} Kost: 3, Aanval: 3, Verdediging: 4 {{< br >}} Effect: Wanneer gespeeld, herstel 1 Verdediging van alle geallieerde kaarten. |
| **Magnus** (Soldaat) {{< br >}} Kost: 7, Aanval: 4, Verdediging: 5 {{< br >}} Effect: Als er 2 andere geallieerde soldaten in het spel zijn, krijg je +3 Aanval. | **Nilus** (Soldaat) {{< br >}} Kost: 5, Aanval: 6, Verdediging: 2 {{< br >}} Effect: Wanneer gespeeld, vernietig een vijandige kaart met een kost van 3 of lager. |
| **Russ** (Soldaat) {{< br >}} Kost: 2, Aanval: 3, Verdediging: 1 {{< br >}} Effect: Wanneer vernietigd, breng 2 Schade toe aan de kaart die hem elimineerde. | **Serj** (Soldaat) {{< br >}} Kost: 5, Aanval: 3, Verdediging: 5 {{< br >}} Effect: Kan een vijandige kaart blokkeren van aanvallen in de volgende beurt. |
| **Tim** (Soldaat) {{< br >}} Kost: 4, Aanval: 4, Verdediging: 3 {{< br >}} Effect: Wanneer gespeeld, krijgt een andere geallieerde kaart +1 Aanval tot de volgende beurt. | **Smith** (Wetenschapper) {{< br >}} Kost: 2, Aanval: Geen, Verdediging: 2 {{< br >}} Effect: +1 Verdediging voor alle geallieerden. |

#### Vastzetten rij en kolom

Zet je eerste rij en eerste kolom vast. Dit maakt het gemakkelijker om gegevens overzichtelijk te houden terwijl je door de rest van het document navigeert. 

{{< img src="/img/data/opdracht-02-kaartspel-sheets_vastzetten1.png" >}}

#### Afwisselende kleuren

Ga naar Opmaak en selecteer Afwisselende kleuren om je tabel overzichtelijker te maken. Hiermee worden rijen automatisch in verschillende kleuren weergegeven, wat het lezen en interpreteren van gegevens eenvoudiger maakt. 

{{< img src="/img/data/opdracht-02-kaartspel-sheets_kleuren1.png" >}}

### Indienen

Lever de link in van je Google Sheets. 

| | |
|-|-|
|{{< img src="/img/data/opdracht-02-kaartspel-sheets_delen1.png" width="500" >}}|{{< img src="/img/data/opdracht-02-kaartspel-sheets_delen2.png" >}}|

### Puntenverdeling

- Naamgeving, Google Spreadsheet. (02)
- 12 Kolommen: Zes voor tekst, zes voor afbeeldingen. (06)
- Correct ingegeven gegevens voor 18 verschillende kaarten/personages. (09)
- Vastzetten rij en kolom, afwisselende kleuren. (04)

## Deel 2

Nu je gegevens klaarstaan, duik je in het ontwerp van je kaartspel met Adobe InDesign. Je gaat een document opzetten met de juiste specificaties voor deze speelkaarten. Met behulp van lagen, rasters en data merge ga je alle kaartinformatie automatisch in een strak design gieten. Het resultaat wordt een speelklaar kaartspel met een consistente uitstraling.

- Download de spreadsheet als CSV en plaats het bestand in je map `Voornaam Kaartspel`.

### InDesign-document aanmaken

- **Bestandsnaam**: `Voornaam Kaartspel`.
- **Afmetingen**: 64 x 88 mm.
- **Bleed**: 3 mm.
- **Marges**: 7 mm (boven, links, rechts), 6 mm (onder).
- **Pagina-instelling**: Twee pagina’s onder elkaar.
- **Raster**: 5 mm met 10 subdivisies (horizontaal en verticaal). Het raster zal het eenvoudiger maken de tekst- en afbeeldingskaders correct te plaatsen.

| | |
|-|-|
|{{< img src="/img/data/opdracht-02-kaartspel-indesign_doc.png" width="250" >}}|{{< img src="/img/data/opdracht-02-kaartspel-indesign_grid.png" >}}|

Maak een laag voor de tekeningen en een laag voor de tekstkaders. 

{{< img src="/img/data/opdracht-02-kaartspel-indesign_new.png" >}}

### Exporteren uit Adobe Illustrator

Open het gekregen Illustrator-bestand.

{{< img src="/img/data/opdracht-02-kaartspel-illustrator_open.png" >}}

Gebruik **Export for Screens**:
- Formaat: PDF.
- Inclusief bleed!
- Exporteer de artboards.
- Sla de geëxporteerde bestanden op in de map **Links**.

| | |
|-|-|
|{{< img src="/img/data/opdracht-02-kaartspel-illustrator_export1.png" width="460" >}}|{{< img src="/img/data/opdracht-02-kaartspel-illustrator_export.png" >}}|

{{< img src="/img/data/opdracht-02-kaartspel-finder_links.png" >}}

### Fonts installeren

Via Adobe Fonts, zorg dat je bent aangemeld met je Adobe account en druk op de knop Add Family.
- [Field Gothic Narrow](https://fonts.adobe.com/fonts/field-gothic-narrow): Voor kosten, aanval, verdediging, kaartbenaming en kaarttype.
- [Big Caslon](https://fonts.adobe.com/fonts/big-caslon): Voor effecten.

### InDesign-document ontwerpen

**Gegevens samenvoegen**: Importeer het CSV-bestand. 

**Afbeeldingskaders**. In totaal zullen er zes afbeeldingskaders nodig zijn. Plaats het referentiepunt voor het transformeren in de linkerbovenhoek. 

{{< img src="/img/data/opdracht-02-kaartspel-indesign_referentiepunt1.png" percent="30" >}}

Koppel zodra je een kader tekent meteen de juiste gegevens eraan en zet de voorvertoning aan. Dan weet je direct of je gegevens correct zijn gekoppeld.

{{< img src="/img/data/opdracht-02-kaartspel-indesign_datamergevoorvertoning1.png" percent="30" >}}

De posities en groottes van elk **afbeeldingskader** zijn:

- **Illustratie** X: 4,5 mm, Y: 3 mm, W: 55 mm, H: 55 mm
- **Voorkant** X: -3 mm, Y: -3 mm, W: 70 mm, H: 94 mm
- **Kost** X: 3,5 mm, Y: 3,5 mm, W: 15 mm, H: 13 mm
- **Aanval** X: 3,5 mm, Y: 56 mm, W: 14,5 mm, H: 12 mm
- **Verdediging** X: 46 mm, Y: 56 mm, W: 14,5 mm, H: 12 mm

{{< img src="/img/data/opdracht-02-kaartspel-indesign_symbolen.png" percent="65" >}}

**Tekstkaders**: Plaats alle tekstkaders op de aparte laag en op de juiste posities.

De posities, groottes, lettertype en tekengrootte van elk **tekstkader** zijn:

- **Kaartbenaming** X: 14,5 mm, Y: 54,5 mm, W: 35 mm, H: 8,5 mm, Font: Field Gothic (No.34 Demi XCond), Tekengrootte: 18 pt
- **Kaarttype** X: 19 mm, Y: 64 mm, W: 26 mm, H: 5 mm, Font: Field Gothic (No.32 Reg XCond), Tekengrootte: 10 pt
- **Effect** X: 8,5 mm, Y: 69 mm, W: 47 mm, H: 13 mm, Font: Big Caslon (Medium), Tekengrootte: 6 pt
- **Kost** X: 3,5 mm, Y: 3,5 mm, W: 15 mm, H: 13 mm, Font: Field Gothic (No.34 Demi XCond), Tekengrootte: 25 pt
- **Aanval** X: 3,5 mm, Y: 56 mm, W: 14,5 mm, H: 12 mm, Font: Field Gothic (No.34 Demi XCond), Tekengrootte: 25 pt
- **Verdediging** X: 46 mm, Y: 56 mm, W: 14,5 mm, H: 12 mm, Font: Field Gothic (No.34 Demi XCond), Tekengrootte: 25 pt

Gebruik bij tekstkaderopties (text frame options) inzetafstand (inset spacing) voor een nette plaatsing van tekst. Verschuif waar nodig de basislijn (Baseline shift) om de tekst netjes verticaal te centreren. 

| | |
|-|-|
|{{< img src="/img/data/opdracht-02-kaartspel-indesign_inzetafstand1.png" width="1400" >}}|{{< img src="/img/data/opdracht-02-kaartspel-indesign_basislijn1.png" width="1400" >}}|

Controleer via Voorvertoning (Preview) in het Gegevenssamenvoeging (Data Merge) paneel of de gegevens correct worden geplaatst.

| | |
|-|-|
|{{< img src="/img/data/opdracht-02-kaartspel-indesign_datamergevb1.png" width="1500" >}}|{{< img src="/img/data/opdracht-02-kaartspel-indesign_tekeningen1.png" width="850" >}}|

Zorg ervoor dat de achterkant op pagina twee ook correct ingeladen wordt. 

{{< img src="/img/data/opdracht-02-kaartspel-indesign_acherkant1.png" >}}

### Samengevoegd document maken

Wanneer je op de knop **Samengevoegd document maken** (*Create Merged Document*) klikt, verschijnt een venster waarin je kunt kiezen hoe het samengevoegde document wordt gegenereerd. Je kunt instellen of het een enkel bestand met meerdere pagina's wordt of afzonderlijke documenten per record. 

{{< img src="/img/data/opdracht-02-kaartspel-indd_create1.png" percent="26" >}}

In dit geval wil je alle gegevens (records) op afzonderlijke pagina's. 

| | |
|-|-|
|{{< img src="/img/data/opdracht-02-kaartspel-indd_create2.png" >}}|{{< img src="/img/data/opdracht-02-kaartspel-indd_create3.png" >}}|

Sla dit nieuwe bestand op als `voornaam kaartspel samengevoegd.indd`. Maak hiervan ook een PDF-bestand met dezelfde naamgeving. 

Los eventuele fouten op. 

### Indienen

Dien één zip-bestand in (met je voornaam en de opdrachtbenaming in de bestandsnaam) dat de volgende onderdelen bevat:

- InDesign-sjabloondocument met gekoppelde gegevens. 
- Geëxporteerde CSV-bestand. 
- Map met de bijbehorende afbeeldingen (png, pdf, psd). 
- InDesign-document met samengevoegde gegevens. 
- PDF-bestand met samengevoegde gegevens (in printkwaliteit). 

Geen onnodige bestanden toevoegen die onduidelijkheid scheppen. Zorg ervoor dat alle bestanden correct benoemd en georganiseerd zijn in de zip-map, zodat de koppelingen in InDesign behouden blijven en de bestanden zonder fouten kunnen geopend worden.

### Puntenverdeling

- **Zip-bestand (02)** Eén zip-bestand met voornaam en opdrachtbenaming (`voornaam kaartspel.zip`).
- **Sjabloon (24)** InDesign-sjabloondocument (`voornaam kaartspel.indd`) twee pagina's met werkende gekoppelde gegevens, Correct gebruik van lagen, Plaatsing kaders, Twee gevraagde lettertypes, Afwerking.
- **CSV (02)** Geëxporteerd CSV-bestand met zes kolommen voor tekst en zes voor afbeeldingen, Correct ingegeven gegevens voor 18 verschillende kaarten/personages.
- **Links (02)** Correcte map (`Links`) met de bijbehorende afbeeldingen (png, pdf, psd).
- **Samengevoegd (02)** Samengevoegd InDesign-document (`voornaam kaartspel samengevoegd.indd`) en PDF-bestand (`voornaam kaartspel samengevoegd.pdf`).
- **Structuur (02)** Alle bestanden correct benoemd en georganiseerd. Geen onnodige bestanden en/of mappen toegevoegd die onduidelijkheid scheppen.

## Bronnen

- [Adobe Help Center: Documenten maken](https://helpx.adobe.com/be_nl/indesign/using/create-documents.html)
- [Adobe Help Center: Gegevenssamenvoeging](https://helpx.adobe.com/be_nl/indesign/using/data-merge.html)
- [Adobe Help Center: Kaders en pagina's opmaken](https://helpx.adobe.com/be_nl/indesign/using/laying-out-frames-pages.html)
- [Adobe Help Center: Objecten transformeren](https://helpx.adobe.com/be_nl/indesign/using/transforming-objects.html)
- [Adobe Help Center: Tekst en tekstkaders maken](https://helpx.adobe.com/be_nl/indesign/using/creating-text-text-frames.html)
- [Adobe Help Center: Tekst opmaken](https://helpx.adobe.com/be_nl/indesign/using/formatting-text.html)
- [Adobe Help Center: Tekens opmaken](https://helpx.adobe.com/be_nl/indesign/using/formatting-characters.html)
- [Unity Asset Store: Low Poly 3D Art by Synty](https://assetstore.unity.com/packages/3d/environments/sci-fi/polygon-sci-fi-space-low-poly-3d-art-by-synty-138857)