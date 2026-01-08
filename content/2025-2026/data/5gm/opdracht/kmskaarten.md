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

In deze stap maak je **één sjabloon** in Adobe InDesign dat later automatisch wordt ingevuld via Gegevenssamenvoeging. Dit sjabloon vormt de basis voor alle prentkaarten, dus werk nauwkeurig en consequent.

### Documentinstellingen

- Maak een **nieuw InDesign-document**
- Formaat: **100 × 150 mm**
- Aantal pagina’s: **2**
- Zet de pagina’s **onder elkaar** (geen spreads)

De twee pagina’s stellen samen één prentkaart voor:
- Pagina 1 is de **voorkant**
- Pagina 2 is de **achterkant**

### Voorkant (pagina 1)

- Plaats één afbeeldingskader dat het kunstwerk toont
- Dit kader wordt later gekoppeld aan **@Kunstwerk**
- Zorg dat de afbeelding correct wordt uitgesneden en schaalt zonder vervorming
- De voorkant bevat **geen tekst**

### Achterkant (pagina 2)

- Plaats een afbeeldingskader voor het **KMSKA-logo (SVG)** (te koppelen aan **@Logo**)
- Maak aparte tekstkaders voor:
  - Titel
  - Kunstenaar
  - Datum
  - Medium
  - Afmetingen
- Deze tekstkaders worden later gekoppeld aan de overeenkomstige kolommen uit het CSV-bestand
- Voorzie voldoende **witruimte** zodat de kaart ook functioneert als echte prentkaart (**ruimte om iets te schrijven**)

### Lagenstructuur

Werk met duidelijke lagen om overzicht te bewaren:
- **Afbeeldingen**  
  - Kunstwerk
  - Logo
- **Tekst**  
  - Alle tekstkaders

Plaats elk object op de juiste laag en benoem lagen correct.

### Vormgeving

- Zorg voor een duidelijke **typografische hiërarchie**
- Houd de lay-out sober, leesbaar en verzorgd
- Het sjabloon moet werken voor alle kunstwerken, zonder handmatige aanpassingen
- Gebruik uitlijning en consistente marges

Controleer of elk kader correct staat en klaar is om gekoppeld te worden vóór je start met Gegevenssamenvoeging.

### Opslaan

- Controleer of de koppelingen naar de map **Links** correct zijn
- Sla het document op als **VoornaamA_KMSKAkaarten.indd**
- Bewaar het bestand in de hoofdmap **VoornaamA_KMSKAkaarten** in je OneDrive-map

## Gegevenssamenvoeging

In deze stap gebruik je **Gegevenssamenvoeging (Data Merge)** om je InDesign-sjabloon automatisch te vullen met de gegevens uit je CSV-bestand. Je koppelt tekst- en afbeeldingskaders aan de juiste kolommen en genereert zo alle prentkaarten in één keer.

### CSV koppelen

- Open je **InDesign-sjabloon**
- Ga naar **Window → Utilities → Data Merge**
- Kies **Select Data Source...**
- Selecteer **VoornaamA_KMSKAkaarten.csv**

De kolommen uit je rekenblad verschijnen nu als velden in het Data Merge-paneel.

### Kaders koppelen

- Plaats de tekstcursor in een **tekstkader**
- Klik op het juiste veld (Titel, Kunstenaar, Datum,...)
- Koppel afbeeldingskaders aan:
  - **@Kunstwerk** (voorkant)
  - **@Logo** (achterkant)

Elk kader mag slechts **één veld** bevatten.

### Voorvertoning controleren

- Activeer **Voorvertoning** in het Data Merge-paneel
- Blader door de records
- Controleer:
  - Tekstinhoud
  - Afbeeldingen
  - Uitlijning en witruimte

Pas het sjabloon aan indien nodig.

### Problemen met speciale tekens

Bij het inschakelen van Voorvertoning kunnen **accenten of speciale tekens** fout verschijnen (bv. √ of vreemde symbolen).  
Dit is een **bekende bug in InDesign Data Merge** en ligt niet aan je spreadsheet.

De meest eenvoudige en betrouwbare oplossing is het **converteren van je CSV-bestand naar UTF-16-codering**.

Volg hiervoor deze stappen:

* Ga naar [https://www.freeformatter.com/convert-file-encoding.html]()
* Upload je CSV-bestand (VoornaamA_KMSKAkaarten.csv)
* Laat **Original encoding** staan op *Auto-detect*
* Kies bij **Target encoding** **UTF-16**
* Klik op **Convert file encoding**
* Plaats dit nieuwe bestand opnieuw in je map VoornaamA_KMSKAkaarten
* Ga terug naar **Adobe InDesign**
* Laad het gecorrigeerde CSV-bestand opnieuw in via **Data Merge**

De tekst zou nu **correct en leesbaar** moeten verschijnen, zonder foutieve symbolen.

### Samengevoegd document maken

- Klik op **Samengevoegd document maken**
- Kies:
  - All records
  - Nieuwe pagina per record

Resultaat:
- **24 pagina’s**
- Eén nieuw InDesign-bestand met alle prentkaarten dat je apart opslaat

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