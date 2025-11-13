+++
title = 'Opdracht: KMSKAarten'
date = 2025-11-12T00:00:00Z
draft = false
+++

Je maakt een reeks prentkaarten van kunstwerken uit het KMSKA. Je werkt met **Google Spreadsheets**, **Adobe InDesign** en Gegevenssamenvoeging.

Gegevenssamenvoeging (Data Merge) is een InDesign-functie die gegevens automatisch koppelt aan tekst- en afbeeldingsvelden om snel delen van een pagina of meerdere pagina’s te genereren vanuit één voorontwerp. Denk aan prijslijsten, catalogi, brochures, prentkaarten, visitekaartjes, enzoverder.

Werk stap per stap en bewaar alles duidelijk in OneDrive.

| | |
|-|-|
|{{< img src="/img/data/5gm/opdracht/kmskaarten/De_schilder_en_zijn_vrouw-Meester_van_Frankfurt.jpg" >}}|{{< img src="/img/data/5gm/opdracht/kmskaarten/Portret_van_een_predikant-Rembrandt.jpg" >}}|
|Meester van Frankfurt, De schilder en zijn vrouw (1496)|Rembrandt, Portret van een predikant (1637)|
|{{< img src="/img/data/5gm/opdracht/kmskaarten/De_intrige-James_Ensor.jpg" >}}|{{< img src="/img/data/5gm/opdracht/kmskaarten/Snelheid-Jules_Schmalzigaug.jpg" >}}|
|James Ensor, De intrige (1890)|Jules Schmalzigaug, Snelheid (1914)|

## Verzamelen en structuur

In deze eerste stap zoek je kunstwerken en verzamel je alle gevraagde gegevens die je later in InDesign gaat gebruiken. Voor elk kunstwerk download je een hoge resolutie afbeelding en sla je die op in de map `Links` met bestandsnamen volgens `"Kunstenaar-Titel.jpg"`. 

Vul een nieuw Google Spreadsheet aan met alle gegevens (Titel, Kunstenaar, Datum, Medium, Afmetingen) en vermeld in de kolom voor afbeeldingen het bestandspad die overeenkomt met de bestandsnaam in `Links` (bijvoorbeeld `Links/Kunstenaar-Titel.jpg`). Sla ook het KMSKA-logo op als SVG in `Links` (in je rekenblad is dat telkens `Links/logo_kmska.svg`).

Let op naamgeving en volledige gegevens zodat Data Merge in InDesign later probleemloos werkt.

### Mappen

Maak in **OneDrive → Datamanagement** een map **VoornaamA_KMSKAkaarten**.

Maak daarin de map **Links**.

### Rekenblad

Maak een rekenblad in Google Spreadsheet met de naam VoornaamA_KMSKAkaarten. 

Voeg de volgende kolommen toe:

- **Titel**
- **Kunstenaar**
- **Datum**
- **Medium**
- **Afmetingen**
- **@Kunstwerk**
- **@Logo**

Het @-symbool geeft aan dat die kolommen bestanden koppelt, zodat InDesign's Data Merge ze herkent en correct importeert.

### Afbeeldingen

Zoek 12 kunstwerken op via <https://kmska.be/nl/overzicht/de-collectie>

Zoek **hoge resolutie** afbeeldingen (minimaal 1500 pixels breed/hoog) en sla op in `Links/Kunstenaar-Titel.jpg`.

Logo van KMSKA in **SVG** (Scalable Vector Graphics), sla je ook op in de map `Links`.

{{< svg src="img/data/5gm/opdracht/kmskaarten/logo_kmska.svg" >}}

### Exporteren CSV

Controleer alle gegevens (inclusief de bestandspaden in de kolommen @Kunstwerk en @Logo). 

Exporteer daarna het rekenblad als CSV via Bestand → Download → Comma-separated values (.csv). Plaats het CSV-bestand (**VoornaamA_KMSKAkaarten.csv**) in de opdrachtmap VoornaamA_KMSKAkaarten.

## InDesign-sjabloon

- Nieuw InDesign-document
  - **100 × 150 mm**
  - 2 pagina’s onder elkaar
- Voorkant:
  - Afbeelding van het kunstwerk
- Achterkant:
  - Logo (SVG)
  - Tekstvelden voor Titel, Kunstenaar, Datum, Medium, Afmetingen
- Werk met lagen:
  - **Afbeeldingen**
  - **Tekst**
- Zorg voor duidelijke hiërarchie en verzorgde lay-out

## Gegevenssamenvoeging

- Laad het **CSV-bestand** in InDesign via **Data Merge**
- Koppel tekst en afbeeldingen aan de juiste velden
- Controleer met **Voorvertoning**
- Genereer een **samengevoegd document**
  - Resultaat: **24 pagina’s**

## Export en structuur

Bewaar alles in **VoornaamA_KMSKAkaarten**:

- **VoornaamA_KMSKAkaarten.indd**
- **VoornaamA_KMSKAkaarten.csv**
- **VoornaamA_KMSKAkaarten-samengevoegd.indd**
- **VoornaamA_KMSKAkaarten.pdf**
- **Map Links** (afbeeldingen + `logo_kmska.svg`)

Deel de OneDrive-koppeling in Google Classroom.

## Puntenverdeling

- Structuur en naamgeving
- Spreadsheet correct en volledig
- CSV correct
- Sjabloon in InDesign correct
- Gegevenssamenvoeging werkt
- Samengevoegd document en PDF ok