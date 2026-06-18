# VOLTSTEP — The 1% Survival

## Project

**VOLTSTEP** is een Future Proof crowdfunding onepager voor een fictief duurzaam tech-product.
Het product is een futuristische sneaker/inlegzool die stapdruk omzet in bruikbare noodenergie.

Voor de webapp/minigame heb ik **The 1% Survival** gemaakt.
De gebruiker start met een smartphone op 1% batterij en moet afwisselend op de linker- en rechtervoet drukken om energie op te wekken. De energie wordt opgeslagen in de VOLT-Core en laadt de telefoon op.

---

## Subthema

Mijn subthema is:

**Duurzame energie door beweging**

Het idee past bij Future Proof omdat het inspeelt op:

* minder afhankelijkheid van losse powerbanks;
* minder e-waste;
* energie halen uit dagelijkse beweging;
* een realistischer duurzaam tech-concept.

---

## Concept van de minigame

De speler bevindt zich in een noodsituatie: de smartphone staat op 1%.
Er is geen stopcontact en geen powerbank beschikbaar. De enige energiebron is beweging.

De speler moet afwisselend:

1. linker voet indrukken;
2. rechter voet indrukken;
3. ritme behouden;
4. de batterij tot 100% laden.

Als de speler stopt, loopt de energie langzaam weg.
Als de speler op de verkeerde voet drukt, verliest hij energie.

---

## States

De webapp gebruikt verschillende states:

### 1. Start state

De telefoon staat op 1%.
De gebruiker ziet de uitleg en kan op **Activeer VOLTSTEP** klikken.

### 2. Play state

De gebruiker moet afwisselend op **Linker voet** en **Rechter voet** klikken.
De batterijbalk en VOLT-Core balk vullen bij elke correcte stap.

### 3. Error state

Als de gebruiker op de verkeerde voet klikt, verliest hij energie.
De tekst geeft feedback: “Foute stap. De sensorflow breekt en je verliest energie.”

### 4. Drain state

Tijdens het spelen loopt de batterij langzaam leeg als de gebruiker niet blijft klikken.
Dit maakt de game actiever en duidelijker.

### 5. Complete state

Bij 100% verschijnt de boodschap dat 15W energie werd gegenereerd.
Daarna verschijnt de knop **Back Voltstep Nu**, die naar de crowdfundingsectie gaat.

---

## Acties

De gebruiker kan:

* de webapp starten;
* linker voet indrukken;
* rechter voet indrukken;
* fout klikken;
* resetten;
* bij 100% doorklikken naar de crowdfundingsectie;
* een steunpakket kiezen;
* een contactformulier invullen.

---

## MVP

De Minimum Viable Product versie bevatte:

* basis HTML-structuur;
* een telefooncontainer;
* startknop;
* linker- en rechtervoetknoppen;
* batterijpercentage;
* eenvoudige JavaScript-logica;
* overgang van start naar spelen;
* resetfunctie.

Daarna is het project visueel en interactief verder verfijnd.

---

## UX en visueel ontwerp

De visuele stijl sluit aan bij de branding van VOLTSTEP:

* dark-tech look;
* cobalt blue accenten;
* glassmorphism cards;
* premium productcampagne sfeer;
* iPhone-achtige webapp container;
* duidelijke knoppen en feedback.

Toegevoegde UX-feedback:

* batterijbalk vult live op;
* VOLT-Core balk vult live op;
* knoppen pulsen bij klik;
* achtergrond verandert bij laden;
* win-state verandert de interface;
* hover-effecten op kaarten;
* toast/pop-up meldingen bij contact en crowdfunding;
* crowdfunding progressbar verandert wanneer iemand doneert.

---

## Gebruikte technologie

Dit project is gemaakt met:

* **HTML** voor de structuur;
* **CSS** voor layout, branding, responsiveness en animaties;
* **JavaScript** voor interactie, game states, progressbars, formulieren en pop-up feedback.

Er zijn geen externe JavaScript-libraries gebruikt.

---

## Projectstructuur

```text
VOLTSTEP/
├── index.html
├── style.css
├── app.js
├── README.md
├── voltstep-video.mp4
└── images/
    ├── G_FutureProof_Logo.png
    ├── site-bg.jpg
    ├── hero1.jpg
    ├── hero2.jpg
    ├── hero3.jpg
    ├── gal1.jpg
    ├── gal2.jpg
    ├── gal3.jpg
    ├── gal4.jpg
    ├── gal5.jpg
    └── gal6.jpg
```

---

## Hoe open je het project?

1. Open de projectmap in Visual Studio Code.
2. Open `index.html`.
3. Start Live Preview of Live Server.
4. Test de navigatie, gallery, webapp, crowdfunding en contactsectie.

---

## Testplan

Ik heb getest of:

* de navigatie naar de juiste secties scrollt;
* de hero slider automatisch verandert;
* de gallery afbeeldingen openen in een lightbox;
* de webapp start bij 1%;
* linker- en rechtervoet correct afwisselen;
* een foute klik energie vermindert;
* de batterij en VOLT-Core balken correct vullen;
* de win-state bij 100% verschijnt;
* de crowdfundingbalk verhoogt na een donatie;
* contact en donatie een pop-up melding tonen;
* de website werkt op grote schermen en kleinere schermen.

---

## Responsiviteit

De website gebruikt media queries zodat de layout zich aanpast op kleinere schermen.
Op desktop staan veel onderdelen naast elkaar. Op mobiel worden de secties onder elkaar geplaatst.

---

## Afwerking

In de laatste fase zijn toegevoegd:

* betere hero visuals;
* gallery met 6 beelden;
* pop-up feedback;
* werkende crowdfunding progressbar;
* hover states;
* iPhone-achtige game interface;
* responsive layout;
* nette projectstructuur.

---

## Reflectie

Ik heb geleerd hoe ik een interactieve webapp kan bouwen met HTML, CSS en JavaScript.
Vooral de game states, de progressbars en de visuele feedback waren belangrijk.
De grootste uitdaging was om de website niet alleen mooi te maken, maar ook logisch en bruikbaar.
VOLTSTEP moest voelen als een echt product binnen een crowdfundingcampagne.
