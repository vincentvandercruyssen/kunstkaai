+++
title = 'Opdracht: KMSKAarten'
date = 2025-11-12T00:00:00Z
draft = false
+++

In deze opdracht maak je een reeks van 12 prentkaarten van kunstwerken uit het **KMSKA**. Je werkt met **Google Spreadsheets**, **Adobe InDesign** en Gegevenssamenvoeging.

Elke prentkaart heeft een kunstwerk uit de collectie van het **KMSKA**. De voorkant van elke kaart toont de afbeelding van het kunstwerk. De achterkant toont het logo van het museum en informatie over het kunstwerk. Laat op het ontwerp voldoende ruimte zodat iemand een bericht kan schrijven.

Je gaat op zoek naar twaalf kunstwerken uit [de collectie](https://kmska.be/nl/overzicht/de-collectie) en verzameld de gevraagde gegevens. In deze opdracht vind je eveneens het logo van het KMSKA in SVG-formaat. Voor de kunstwerken zoek je de juiste afbeeldingen in hoge resolutie en plaats je die in dezelfde map als het logo. 

De gegevens verwerk je in **Google Spreadsheets**. Je exporteert het rekenblad als CSV-bestand en koppelt dit in **Adobe InDesign** via Data Merge (Gegevenssamenvoeging).

Gegevenssamenvoeging (Data Merge) is een InDesign-functie die gegevens automatisch koppelt aan tekst- en afbeeldingsvelden om snel delen van een pagina of meerdere pagina’s te genereren vanuit één voorontwerp. Denk aan prijslijsten, catalogi, brochures, prentkaarten, visitekaartjes, enzoverder.

Werk stap per stap en bewaar alles duidelijk in OneDrive.

{{< img src="/img/data/5gm/opdracht/kmskaarten/KMSKA_collectie1.png" percent="55" >}}

## Verzamelen en structuur

In deze eerste stap zoek je minimaal twaalf kunstwerken en verzamel je alle gevraagde gegevens die je later in InDesign gaat gebruiken. Voor elk kunstwerk download je een hoge resolutie afbeelding en sla je die op in de map `Links` met consistente bestandsnamen zoals `Kunstenaar-Titel.jpg`. 

Vul een nieuw Google Spreadsheet aan met alle gegevens (Titel, Kunstenaar, Datum, Medium, Afmetingen, @Kunstwerk, @Logo) en vermeld in de kolom voor afbeeldingen het bestandspad die overeenkomt met de bestandsnaam in `Links` (bijvoorbeeld `Links/Kunstenaar-Titel.jpg`). Sla ook het KMSKA-logo op als SVG in `Links` (in je rekenblad is dat telkens `Links/logo_kmska.svg`).

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

{{< img src="/img/data/5gm/opdracht/kmskaarten/googlesheets1.png" >}}

### Afbeeldingen en logo

Zoek 12 kunstwerken op via <https://kmska.be/nl/overzicht/de-collectie>.

Zoek **hoge resolutie** afbeeldingen (minimaal 1500 pixels breed/hoog) en benoem ze consistent op dezelfde manier (bv. `Kunstenaar-Titel.jpg`) in de map `Links`.

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
- Samengevoegd document en PDF

## Bronnen

- [Adobe Help Center: Documenten maken](https://helpx.adobe.com/be_nl/indesign/using/create-documents.html)
- [Adobe Help Center: Gegevenssamenvoeging](https://helpx.adobe.com/be_nl/indesign/using/data-merge.html)
- [Adobe Help Center: Kaders en pagina's opmaken](https://helpx.adobe.com/be_nl/indesign/using/laying-out-frames-pages.html)
- [Adobe Help Center: Objecten transformeren](https://helpx.adobe.com/be_nl/indesign/using/transforming-objects.html)
- [Adobe Help Center: Tekst en tekstkaders maken](https://helpx.adobe.com/be_nl/indesign/using/creating-text-text-frames.html)
- [Adobe Help Center: Tekst opmaken](https://helpx.adobe.com/be_nl/indesign/using/formatting-text.html)
- [Adobe Help Center: Tekens opmaken](https://helpx.adobe.com/be_nl/indesign/using/formatting-characters.html)
- [Unity Asset Store: Low Poly 3D Art by Synty](https://assetstore.unity.com/packages/3d/environments/sci-fi/polygon-sci-fi-space-low-poly-3d-art-by-synty-138857)