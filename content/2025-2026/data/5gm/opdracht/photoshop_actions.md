+++
title = 'Opdracht: Photoshop Actions'
date = 2025-09-22T00:00:00Z
draft = false
+++

In deze opdracht leer je hoe je **Photoshop Actions** gebruikt om een reeks foto's automatisch te bewerken en op te slaan met een nieuwe bestandsnaam. Je maakt een action (handeling) aan, past minimaal twee aanpassingslagen toe en voert een batchverwerking uit om dezelfde handelingen automatisch op meerdere foto's toe te passen. 

Je organiseert de bestanden correct in een mappenstructuur. Aan het einde van deze opdracht heb je een action (handeling) gemaakt en toegepast op een reeks foto's. 

Je maakt een contactblad waarop je alle originele en bewerkte foto's plaatst.

Je bewaart je resultaten en deelt ze via **OneDrive** en **Google Classroom**.

## Voorbereiding

### Mappenstructuur en download

Maak een nieuwe map in **Datamanagement** genaamd **VoornaamA_Photoshop Actions**.

Maak hierin twee submappen:

- **Originelen** (voor de originele foto's)
- **Batch** (voor de bewerkte foto's)

Afbeeldingen downloaden: 

- Ga naar **[unsplash.com](https://unsplash.com/)**. 
- Zoek **16 afbeeldingen** met als zoekterm **een zoekterm naar keuze**.
- Download de afbeeldingen in de **hoogste kwaliteit**, de download-knop op de thumbnail zorgt hier automatisch voor.
- Afbeeldingen aangeduid met "+" zijn niet gratis beschikbaar.
- Plaats de nieuwe foto's in de map **Originelen**, en hernoem ze met je zoekterm en een volgnummer.

## Photoshop Action aanmaken

### Venster Handelingen openen

- Open één van de foto's.
- Open **Photoshop** en ga naar **Window → Actions (Venster → Handelingen)**.
- Klik op het **+ icoon** om een nieuwe action (handeling) te maken.
- Geef de action (handeling) een naam, bijvoorbeeld **Aanpassingslagen Effect**.

| | |
|-|-|
|{{< img src="/img/data/opdracht-03-photoshop_actions-new1.png" >}}|{{< img src="/img/data/opdracht-03-photoshop_actions-new2.png" >}}|

Let op: zodra je een handeling (action) maakt, begint Photoshop meteen met al je handelingen op te nemen. Je kunt altijd op de stop-knop drukken, of stappen die je hebt opgenomen terug verwijderen.

Maak eventueel eerst een nieuwe set of mapje aan om je eigen handelingen (actions) in op te slaan.

### Effecten toepassen

Voeg in je opname minstens **twee aanpassingslagen** toe, bijvoorbeeld:

- **Curves**: verhoog contrast door schaduwen te verdiepen en hooglichten feller te maken. Of verander de curven van een specifieke kleur.
- **Kleurtoon/verzadiging**: pas de kleuren aan voor een retro-, sepia- of vervaagde look.
- **Kleurbalans**: pas de kleurverhoudingen aan in schaduwen, middentonen en hooglichten voor een koelere of warmere uitstraling.
- **Helderheid/contrast**: verfijn de lichtheid en het contrast om details beter zichtbaar te maken of een dramatisch effect te creëren.
- ...

### Kopie opslaan

Sla het bewerkte bestand correct op.

- Ga naar **Bestand → Kopie opslaan**.
- Kies als bestandsindeling **JPEG**.
- Navigeer naar de map **Batch** en sla het bestand op.
- Stel de kwaliteit in op **9**, een goede balans tussen bestandsgrootte en kwaliteit.

⚠️ **Belangrijk:** De opslaglocatie die je tijdens de opname kiest, wordt vastgelegd in de handeling. Deze kan later nog worden overschreven via de **Batch-instellingen**.

Klik op **Stop** in het Handelingen-paneel zodra je klaar bent.

## Batchverwerking uitvoeren

### Automatisering instellen

- Ga naar **Bestand → Automatisch → Batch**.
- Selecteer bij **Set** de handeling-map waarin je handelingen zijn opgeslagen.
- Kies bij **Action (Handeling)** de handelingen die je zojuist hebt gemaakt.
- Bij **Source (Bron)**: selecteer de map **Originelen**.
- Bij **Destination (Doel)**: selecteer Folder (Map) en kies je map **Batch**.
- Vink **Override Action "Save As" Commands ("Opslaan als"-opdrachten in handeling negeren)** aan om te zorgen dat de bestanden correct worden opgeslagen volgens jouw naamgeving.
- De bewerkte foto's krijgen de oorspronkelijke bestandsnaam met **_bewerkt** als toevoeging. Bekijk onderstaande afbeelding.
- Klik op **OK**, Photoshop zal nu automatisch de handelingen op alle foto's toepassen en opslagen in de juiste map met de juiste benaming.

{{< img src="/img/data/opdracht-03-photoshop_actions-batch1.png" >}}

Controleer of de bestanden correct zijn opgeslagen in de map **Batch**.

## Action-bestand opslaan

Sla je action-bestand apart op zodat je het later kunt hergebruiken of delen.

- In het Venster Handelingen selecteer je de aangemaakte action (handelingen) in de lijst.
- Klik op het menu-icoon rechtsboven in het handelingenvenster en kies **Save Action (Handelingen opslaan)**.
- Sla het bestand op als **ATN-bestand** in je map **VoornaamA_Photoshop Actions**.

⚠️ **Let op:** Zorg ervoor dat je handeling volledig is en correct werkt voordat je deze opslaat. 

{{< img src="/img/data/opdracht-03-photoshop_actions-save1.png" percent="50" >}}

Heb je nog problemen, bekijk dan deze duidelijke video over Photoshop Actions (Handelingen):

{{< youtube rhaDBbj_qnE >}}

## PDF met Bridge Output

### Output-workspace

- Ga naar de tab **Output (Uitvoer)**.
- Selecteer in Bridge alle 16 afbeeldingen in de map **Originelen** (Ctrl/Cmd+A) en sleep ze naar het contactblad.
- Herhaal voor de map **Batch**: selecteer alle afbeeldingen en sleep ze naar hetzelfde contactblad, zodat zowel originelen als bewerkte versies worden toegevoegd.

{{< img src="/img/data/opdracht-03-bridge_workflow-output_2.png" percent="75" >}}

### Instellingen voor de contactsheet

#### Raster en marges

- Open het menu **Grid and Margins (Raster en marges)**.
- Stel het raster in op **4 x 4** (4 rijen, 4 kolommen).
- Zet **Auto Spacing** aan.
- Pas de marges aan: **Boven:** 0,5 cm en **onder, links, rechts:** 1 cm.

{{< img src="/img/data/opdracht-03-bridge_workflow-output_4.png" >}}

### Koptekst

- Open het menu **Header and Footer (Koptekst en voettekst)**.
- Vink Include Header (Inclusief koptekst) aan.
- Vul in bij **Text (Tekst)**: **Voornaam Photoshop Actions**.
- **Uitlijning:** Centreren.
- **Header size (Grootte koptekst):** 1 cm.

{{< img src="/img/data/opdracht-03-bridge_workflow-output_5.png" >}}

### PDF exporteren

- Klik op **Export PDF** en sla het bestand op als: **"VoornaamA_Photoshop Actions.pdf"** in de map **"VoornaamA_Photoshop Actions"**.

{{< img src="/img/data/opdracht-03-bridge_workflow-export_1.png" percent="35" >}}

## Indienen

Open je OneDrive-map **Datamanagement**.

Controleer of de volgende bestanden aanwezig zijn in de map **VoornaamA_Photoshop Actions**:

- Het Action-bestand.
- Het PDF-bestand, contactblad.
- De oorspronkelijke foto's in de map **Originelen**.
- De bewerkte foto's in de map **Batch**.

Deel de link naar je gehele **Datamanagement OneDrive-map** via **Google Classroom**.

## Puntenverdeling

- **Naamgeving en mappenstructuur** `VoornaamA_Photoshop Actions` met `Originelen`-map (originele JPG-afbeeldingen), `Batch`-map (bewerkt en correct hernoemd), `.ATN`-bestand (action), `.PDF`-bestand (contactblad).
- **Photoshop Action** Bevat minimaal twee aanpassingslagen en correcte opslaginstellingen.
- **Batchverwerking** Alle foto's automatisch bewerkt en correct opgeslagen met `*_bewerkt`-suffix.
- **Contactblad** Twee pagina's, met de correcte instellingen.
- **OneDrive-koppeling (01)** naar volledige vakmap `Datamanagement`.

## Bronnen

- [Handelingen en het deelvenster Handelingen](https://helpx.adobe.com/be_nl/photoshop/using/actions-actions-panel.html)
- [Aanpassingslagen, opvullagen en voorinstellingen](https://helpx.adobe.com/be_nl/photoshop/using/adjustment-fill-layers.html)
- [Aanpassing curven](https://helpx.adobe.com/be_nl/photoshop/using/curves-adjustment.html)
- [De kleurtoon en verzadiging aanpassen](https://helpx.adobe.com/be_nl/photoshop/using/adjusting-hue-saturation.html)
- [Uw afbeelding verbeteren met aanpassingen in kleurbalans](https://helpx.adobe.com/be_nl/photoshop/using/applying-color-balance-adjustment.html)