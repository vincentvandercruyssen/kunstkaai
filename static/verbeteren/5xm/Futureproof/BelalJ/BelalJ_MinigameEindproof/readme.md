# SeedChew: The Chew, Spit & Sprout Challenge
**Vak:** Weboriëntatie — Mini-Eindproef  
**Student:** Belal J.  
**Klas:** Weboriëntatie & Webontwikkeling, Stedelijk Onderwijs Antwerpen  
**Projectmap:** `BelalJ_MinigameEindproof` (VoornaamA_FutureProof)

---

## 1. Werking van de minigame / webapp
De webapp is een interactieve biologische tuin- en natuursimulator die is opgebouwd rond drie duidelijke states (Startscherm, Interactieve Speelfase, en Resultaatscherm):

*   **State 1 (Startscherm):** Introduceert de kauwgomproblematiek. Er wordt uitgelegd dat reguliere kauwgom gemaakt is van synthetische plastics (polymeren) en dat **SeedChew** een 100% biologisch afbreekbaar chicle-boomsap alternatief is gevuld met inheemse wilde bloemenzaden.
*   **State 2 (Actieve Speelfase):** Is opgesplitst in twee opeenvolgende fasen:
    *   *Fase A (Traditionele kauwgom):* De speler klikt herhaaldelijk op de **Kauw-knop** om de kauw-o-meter op te laden tot 100%. Vervolgens klikt hij op **'SPUUG UIT IN NATUUR!'**. De roze kauwgom vliegt via een real-time berekende *parabolische Bezier-curve* door de lucht en landt op de bosgrond. De speler verschuift een **Tijd-slider** van 0 naar 25 jaar: de kauwgom verkleurt naar grijs zwerfafval, trekt vogels aan (met levensgevaarlijke maagverstopping tot gevolg) en brokkelt uiteindelijk uiteen tot microscopische microplastics die de bodem voor 100% vervuilen.
    *   *Fase B (SeedChew):* De speler kauwt op de biologische gum en spuugt deze op het gras. De speler gebruikt de **Tijd-slider** van 0 naar 30 dagen:
        *   *Dag 3-7:* Regenbuien (visuele geanimeerde regen) hydrateren de chicle-basis, die begint te composteren tot rijke meststof.
        *   *Dag 10-14:* Een klein groen kiemplantje ontkiemt en schiet omhoog uit de kern.
        *   *Dag 20-24:* De plant groeit groter en krijgt blaadjes.
        *   *Dag 30:* Een prachtige inheemse wilde kamille bloeit op en er vliegen direct geanimeerde honingbijtjes omheen. De bodemvervuiling zakt naar 0% en biodiversiteit stijgt!
*   **State 3 (Resultaatscherm):** Presenteert een gedetailleerd vergelijkingsrapport (ontbindingstijd, bodemvervuiling, fauna-impact).
*   **Crowdfunding Simulator & CTA:** Bevat een interactieve **Pledge Slider** (€5 tot €250) gekoppeld aan de SeedChew-campagne. Spelers zien hun backer-rang ("Seedbomber" tot "Forest Builder") live veranderen op het holografische certificaat, inclusief de specifieke rewards (pakjes chicle-gum, houten bewaarblikken en geplante bloemenweides) en een live-updatende voortgangsbalk. De CTA-knop simuleert een backing-betaling.
*   **Meertalige Ondersteuning:** De gehele interface (kaarten, instructiepanelen, knoppen, dynamic logs en pledge-certificaten) is uitgerust met een **Language Selector** bar die naadloos schakelt tussen **Nederlands (NL)**, **Engels (EN)**, en **Frans (FR)** voor een breed internationaal bereik van de crowdfunding-campagne.

---

## 2. Technische problemen en obstakels
Tijdens de ontwikkeling zijn er verschillende interessante technische uitdagingen overwonnen:

1.  **Parabolische vliegcurve:** Een rechte lijn bij het spugen van de kauwgom zag er niet natuurlijk uit. Dit is opgelost door in JavaScript een *kwadratische Bezier-curve formule* (`B(t) = (1-t)² * P0 + 2(1-t)t * P1 + t² * P2`) te schrijven in een `requestAnimationFrame` loop. Hierdoor maakt de gum een vloeiende, boogvormige vliegbeweging van de mond naar de bodem.
2.  **Tijd-slider met dynamische groei:** Om de groeistappen en de plasticvervuiling live weer te geven, is de HTML5 range-slider gekoppeld aan een complex set JavaScript event-listeners. Bij elke verandering in de slider worden SVG-elementen dynamisch getoond, verborgen, geschaald of geanimeerd (zoals het verschijnen van de regen, de vogel, de bijen en de bloei van de kamille).
3.  **Dynamische bodemvervuiling:** Bij de traditionele kauwgom moesten er microscopische deeltjes in de bodem verschijnen. Hiervoor heb ik een JS-functie geschreven die willekeurige coördinaten berekent en dynamisch honderden kleine roze `<circle>` elementen in de SVG-bodemlaag injecteert met `document.createElementNS`.
4.  **Vibrante Neon- & Regenboogesthetiek:** Om een premium en aantrekkelijk gevoel te geven, is gekozen voor rijke glassmorphism panels, gloeiende gekleurde borders (`.border-glow-*`) die live van kleur veranderen op basis van de simulatorstatus, custom range-sliders en een spectaculaire keyframe-geanimeerde regenboogknop (`.btn-rainbow`) die de visuele ervaring stimuleert.
5.  **Confetti Fysica:** Bij het voltooien van de SeedChew simulatie barst er een uiterst soepel draaiende confetti-animatie los, geprogrammeerd via een vanilla HTML5-canvas physics loop, wat het ecologische succes-moment kracht bijzet.

---

## 3. Context binnen het grotere project
Dit minigame-project vormt de **interactieve call-to-action** van onze vakoverschrijdende crowdfundingcampagne rond **SeedChew**. 

Binnen de andere praktijkvakken ontwerpen we het logo, de huisstijl en de mockups voor dit duurzame kauwgommerk. Deze minigame wordt direct verwerkt via een responsieve container-div op de crowdfunding-onepager die we bouwen voor het vak *Webontwikkeling*. 

De simulator trekt bezoekers emotioneel over de streep: door hen eerst de schokkende realiteit van plastic kauwgom te laten 'spugen' (en de vogelmaag-risico's te zien), en daarna de directe ecologische voldoening van SeedChew te tonen (een prachtige bloeiende bloem met bijen), worden ze gestimuleerd om het product onderaan de pagina echt te backen.

---

## 4. Verantwoording (AI & Bronnen)
Bij het bouwen van dit project zijn de volgende hulpmiddelen en bronnen gebruikt:

*   **Antigravity (AI-Co-pilot):** Gebruikt als sparringpartner voor het opzetten van het CSS Grid-ontwerp, het ontwerpen van de meertalige vertaalsleutels in de JavaScript data-i18n dictionary, en het berekenen van de parabolische Bezier spit-coördinaten.
*   **Google Fonts:** Inladen van de lettertypes `Outfit` (voor strakke en leesbare bodytekst) en `Playfair Display` (voor de koppen).
*   **MDN Web Docs:** Geraadpleegd voor geavanceerde SVG element-manipulatie via JavaScript (`document.createElementNS` voor het dynamisch toevoegen van microplastics).
*   **CSS-Tricks:** Inspiratie voor de glassmorphism-styling (`backdrop-filter: blur()`) en de vloeiende custom styling van de HTML5 range-sliders.
