# Open Dag Pulse

## Wat heb ik gemaakt en waarom

Ik heb een visueel experiment gebouwd dat direct opvalt: een pulserende, glitch-achtige energiebol geschreven met de Canvas API. Het scherm beweegt zelfstandig, maar verandert ook als je met je muis speelt of geluid maakt met de microfoon.

## Hoe het werkt

- Het canvas draait continu met requestAnimationFrame.
- Er zijn tientallen lijnen en lichtpunten die in cirkels ronddraaien en opwellen.
- De microfoon versterkt de intensiteit: meer geluid, meer glitch en grotere lichtpunten.
- De muis trekt de vormen subtiel naar zich toe en geeft bezoekers direct voelbare controle.

## Bronnen en AI

- Ideeën voor generative art en interactieve effecten zijn geïnspireerd door Canvas-experimenten en Open Dag-presentaties.
- Ik heb ChatGPT gebruikt om de structuur van het project te vormen en om hulp te krijgen bij het gebruik van `requestAnimationFrame`, `getUserMedia` en compositiestanden.

## Wat heb ik geleerd

- Hoe je een fullscreen canvas opzet en dynamisch schaalt.
- Hoe je audio-input via `navigator.mediaDevices.getUserMedia` verwerkt in een visuele animatie.
- Hoe je meerdere canvas technieken combineert, zoals `globalCompositeOperation` en zachte trails.
- Hoe je een project maakt dat zowel autonoom beweegt als interactief reageert.

## Wat zou ik anders doen

- Een extra visuele laag toevoegen met echte shaders of WebGL voor nog gladdere vervorming.
- Een kleine gebruikersmodus toevoegen, bijvoorbeeld een knop om te kiezen tussen "stille" en "luid" thema's.
- Meer geluidssensitieve vormen toevoegen, zoals rimpelingen of kleuren die veranderen op muziekritme.
