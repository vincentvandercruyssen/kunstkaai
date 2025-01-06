+++
title = 'Opdracht: Kaartspel'
date = 2024-08-30T08:00:00-07:00
draft = false
+++

Je gaat een uniek kaartspel ontwikkelen met **Adobe InDesign** en data merge. Het project bestaat uit twee delen: eerst maak je een **Google Spreadsheet** met alle kaartgegevens, daarna een **InDesign-document** waarin deze data automatisch wordt verwerkt. Je leert werken met nauwkeurige documentinstellingen, lagen, rasters en het effectief gebruik van tekstkaders.

Het eindresultaat wordt een volledig speelbaar kaartspel met 18 unieke karakters, elk met eigen kenmerken en effecten.

## Deel 1

In dit eerste deel ga je aan de slag met het voorbereiden van de data voor je kaartspel. Je maakt een gestructureerde Google Spreadsheet waarin je alle informatie van de kaarten netjes organiseert - van de namen en types tot de statistieken en effecten. Deze voorbereiding is cruciaal voor een vlotte verwerking in InDesign later. Je leert ook meteen hoe je bestanden en mappen overzichtelijk kunt structureren.

### Mapstructuur

Maak een duidelijke mapstructuur, een projectmap in je map voor Datamanagement genaamd **Voornaam Kaartspel** waar je het volgende zult in verwerken:

- InDesign-bestand en CSV-bestand.
- Een map genaamd **Links** met alle benodigde PDF-bestanden (voorkant, kost, aanval, verdediging), afbeeldingen personages, PSD-bestand achterkant.

{{< img src="/img/data/opdracht-02-kaartspel-finder_links.png" width="400" >}}

### Google Sheets

Maar eerst...

- Ga naar {{< a href="https://sheets.new" text="sheets.new" >}} in je internetbrowser, dit maakt een nieuw Google Spreadsheet bestand aan. 

Je hebt 12 kolommen nodig:
- Tekstkolommen: Benaming, Type, Effect
- Waardekolommen: Kost, Aanval, Verdediging
- Afbeeldingskolommen (met `'@`): '@Illustratie, '@Kost symbool, '@Aanval symbool, '@Verdediging symbool, '@Kaart Voorkant, '@Kaart Achterkant

De kolommen met `'@` vooraan zijn kolommen met afbeeldingen. Elke speelkaart heeft een unieke illustratie. Niet alle speelkaarten hebben een kost of een aanval, laat de cellen voor de tekst en afbeeldingen in dit geval leeg. De voorkant en de symbolen zullen PDF-bestanden zijn. De achterkant is een PSD-bestand. Voor -en achterkant zijn voor alle kaarten dezelfde. 

Vergeet niet voor elke bestandsnaam `"Links/"` toe te voegen, in deze submap zullen namelijk al je afbeeldingen zitten. Let goed op bestandstype. 

{{< img src="/img/data/opdracht-02-kaartspel-sheets_ingevuld.png" width="1200" >}}

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

- Download de spreadsheet als CSV en plaats het bestand in je map `Voornaam Kaartspel`.

### Indienen

Lever de link in van je Google Sheets. 

| | |
|-|-|
|{{< img src="/img/data/opdracht-02-kaartspel-sheets_delen1.png" width="500" >}}|{{< img src="/img/data/opdracht-02-kaartspel-sheets_delen2.png" >}}|

### Puntenverdeling

- Naamgeving bestand. (02)
- 12 Kolommen: Zes voor tekst, zes voor afbeeldingen. (06)
- Correct ingegeven gegevens voor 18 verschillende kaarten/personages. (18)

## Deel 2

Nu je data klaarstaat, duiken we in het ontwerp van je kaartspel met Adobe InDesign. Je gaat een professioneel document opzetten met de juiste specificaties voor speelkaarten. Met behulp van lagen, rasters en data merge ga je alle kaartinformatie automatisch in een strak design gieten. Het resultaat wordt een speelklaar kaartspel met een consistente uitstraling.

### InDesign-document aanmaken

- **Bestandsnaam**: `Voornaam Kaartspel`.
- **Afmetingen**: 64 x 88 mm.
- **Bleed**: 3 mm.
- **Marges**: 7 mm (boven, links, rechts), 6 mm (onder).
- **Pagina-instelling**: Twee pagina’s onder elkaar.
- **Raster**: 5 mm met 10 subdivisies (horizontaal en verticaal).

| | |
|-|-|
|{{< img src="/img/data/opdracht-02-kaartspel-indesign_doc.png" width="250" >}}|{{< img src="/img/data/opdracht-02-kaartspel-indesign_grid.png" >}}|

- Maak een laag voor de tekeningen en een laag voor de tekstkaders. 

{{< img src="/img/data/opdracht-02-kaartspel-indesign_new.png" width="1200" >}}

### Exporteren uit Adobe Illustrator

- Open het gekregen Illustrator-bestand.

{{< img src="/img/data/opdracht-02-kaartspel-illustrator_open.png" width="1200" >}}

Gebruik **Export for Screens**:
- Formaat: PDF
- Inclusief bleed
- Exporteer de artboards.
- Sla de geëxporteerde bestanden op in de map **Links**.

| | |
|-|-|
|{{< img src="/img/data/opdracht-02-kaartspel-illustrator_export1.png" width="460" >}}|{{< img src="/img/data/opdracht-02-kaartspel-illustrator_export.png" width="1200" >}}|

{{< img src="/img/data/opdracht-02-kaartspel-finder_links.png" width="1200" >}}

### Fonts installeren

Via Adobe Fonts, zorg dat je bent aangemeld met je Adobe account en druk op de knop Add Family.
- {{< a href="https://fonts.adobe.com/fonts/field-gothic-narrow" text="Field Gothic Narrow" >}} : Voor kosten, aanval, verdediging, kaartbenaming en kaarttype.
- {{< a href="https://fonts.adobe.com/fonts/big-caslon" text="Big Caslon" >}} : Voor effecten.

### InDesign-document ontwerpen

- **Gegevens samenvoegen**: Importeer het CSV-bestand. 
- **Frames voor afbeeldingen**. 

{{< img src="/img/data/opdracht-02-kaartspel-indesign_symbolen.png" width="460" >}}

- **Tekstkaders**: Plaats alle tekstkaders op de aparte laag en op de juiste posities.
- **Toepassen van text frame options**: Gebruik **inset spacing** voor een nette plaatsing van tekst.
- Controleer via **Preview** of de gegevens correct worden geplaatst.

{{< img src="/img/data/opdracht-02-kaartspel-indesign_datamergevb1.png" width="1280" >}}

### Indienen

Dien één zip-bestand in (met je voornaam en de opdrachtbenaming in de bestandsnaam) dat de volgende onderdelen bevat:

- InDesign-sjabloondocument met gekoppelde gegevens. 
- Geëxporteerde CSV-bestand.
- Map met de bijbehorende afbeeldingen.

Geen onnodige bestanden toevoegen die onduidelijkheid scheppen. Zorg ervoor dat alle bestanden correct benoemd en georganiseerd zijn in de zip-map, zodat de koppelingen in InDesign behouden blijven en de bestanden zonder fouten kunnen geopend worden.

### Puntenverdeling

- Een zip-bestand met voornaam en opdrachtbenaming. (02)
- InDesign-sjabloondocument met werkende gekoppelde gegevens. (08)
- Geëxporteerd CSV-bestand met zes kenmerken en twee afbeeldingen, vijftien producten. (04)
- Correcte map met de bijbehorende afbeeldingen. (02)
- Alle bestanden correct benoemd en georganiseerd. Geen onnodige bestanden en/of mappen toegevoegd die onduidelijkheid scheppen. (02)