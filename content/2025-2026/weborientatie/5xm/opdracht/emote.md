+++
title = 'Opdracht: Emote'
date = 2025-11-13T00:00:00Z
draft = false
+++

In deze opdracht bouw je een **emote-figuurtje** (bijvoorbeeld een avatar, monster of karakter) dat in **verschillende emotes of toestanden** kan staan. Je voegt meerdere **knoppen** toe waarmee je het figuurtje kunt laten reageren, zoals *blij*, *boos*, *chill*, *hyper*, of *neutraal*.

Wanneer de gebruiker op een knop klikt, verandert:

* het **icoon** (bijvoorbeeld een emoji, afbeelding of iets anders),
* de **titel** van de emote,
* een korte **omschrijving**,
* én de **achtergrondkleur** of sfeer.

Zo leer je stap voor stap een **state** beheren, **DOM-elementen** selecteren, **events** koppelen, **functies** schrijven en **logica** toepassen om de UI te veranderen.

## Computationeel denken

**Computational Thinking** betekent dat je problemen oplost zoals een computer dat zou doen: in kleine, logische stappen, met duidelijke beslissingen.

Het bestaat uit vier bouwstenen:

1. **Decompositie** Het probleem opdelen in kleinere, overzichtelijke stukjes.
2. **Patronen herkennen** Overeenkomsten zien tussen situaties, zodat je oplossingen kunt hergebruiken.
3. **Abstractie** Enkel focussen op wat belangrijk is en details tijdelijk weglaten.
4. **Algoritmes** Stappenplannen maken die altijd op dezelfde manier tot een resultaat leiden.

### Focus: patronen herkennen

Je figuurtje heeft verschillende emotes, maar voor **elke emote** doorloop je **dezelfde soort stappen**:

* **Stap 1**: De state veranderen naar de gekozen emote.
* **Stap 2**: De UI aanpassen: icoon wijzigen, titel aanpassen, tekst updaten.
* **Stap 3**: Eventueel ook kleuren of sfeer aanpassen.

Dat betekent dat je steeds **hetzelfde patroon** uitvoert, maar met andere waarden.

Je herkent dus een **emote-patroon**:

```
Als emote = X
    toon icoon X
    toon titel X
    toon omschrijving X
    toon kleur X
```

Omdat dit patroon identiek is voor *alle* emotes, kun je het oplossen met:

* **één enkele update-functie** die telkens dezelfde stappen uitvoert;
* een **state-variabele** die bijhoudt welke emote actief is;
* **conditionele logica** die beslist wat er getoond wordt.

## Structuur van je project

Werk in je vakmap van **Webontwikkeling** in de map voor 5XM.

Gebruik deze duidelijke structuur:

```
VoornaamA_Emote/
├── index.html
├── style.css
└── app.js
```

Zorg voor correcte benamingen en een heldere indeling. Koppel je script onderaan in het `body`-element, zodat je JavaScript pas start wanneer de HTML volledig geladen is.

## HTML

In je HTML maak je een duidelijke structuur met titel, onderdeel voor figuurtje en de knoppen.

### Basisstructuur

**Basisstructuur van de pagina**: Een header met een titel, een main-gedeelte met twee sections.

### Sections

**Een section waarin je figuurtje en de tekst verschijnen.**
* een element voor het **icoon** (bijvoorbeeld een emoji weergave),
* een korte **titel** van de emote,
* een **omschrijving** die uitlegt wat de emote betekent.

**Een section met meerdere knoppen.**
* Elke knop roept een andere emote op, zoals
* Blij, Boos, Chill, Hyper, Neutraal,...

### ID-kenmerken

Gebruik **id-kenmerken** voor elementen die je in CSS én JavaScript wilt aanspreken, zoals:
* een id voor het icoon,
* een id voor de titel,
* een id voor de omschrijving,
* ids voor de knoppen.

Gebruik “classes” voor groepen elementen die je visueel wilt groeperen (zoals een knoppenbalk).

## CSS

Voorzie een **eenvoudige basis-opmaak**, bijvoorbeeld:
* Kies een rustige pagina-kleur.
* Centreer je figuurtje.
* Geef het icoon een groter lettertype.
* Geef de knoppen een uniforme stijl.

Zorg dat:
* het hoofdfiguurtje duidelijk zichtbaar is,
* de tekst goed leesbaar is,
* de knoppen overzichtelijk staan.

Laat ruimte voor **creativiteit**: je mag zelf bepalen hoe kleurrijk, minimalistisch of humoristisch het karakter eruitziet.

## JavaScript

Hier gebeurt alle logica.

### State-variabele

Maak een **variabele die de huidige emote bijhoudt**.

Bijvoorbeeld:

```
let huidigeEmote = "neutraal";
```

Gebruik `let` omdat deze waarde verandert bij het klikken op knoppen. Je gebruikt een **string** als state omdat je daarmee gemakkelijk verschillende emotes kunt benoemen en herkennen, zoals “blij”, “boos” of “chill”.

### DOM-selecties

Selecteer alle elementen die je later moet aanpassen:

* het icoon-element,
* de titel van de emote,
* de omschrijving,
* elke emote-knop.

Bewaar ze in `const`-variabelen zodat je ze later gemakkelijk kunt aanspreken. Je gebruikt `const` bij DOM-selecties omdat jouw verwijzing naar dat element nooit verandert (letterlijk constant), ook al pas je later wel de inhoud (`textContent`) of stijl van dat element aan. Maar niet de variabele zelf.

### Events koppelen

Koppel op elke knop een **klik-event**.

Wanneer de gebruiker op “Blij” klikt:

* verander je de state naar `"blij"` EN roep de update-functie op.

Hetzelfde voor "Boos", “Chill”, “Hyper” en eventueel “Neutraal”...

Gebruik **`addEventListener`** in je JavaScript, niet `onclick` in je HTML. Zo blijft je HTML puur structuur, en je JS puur logica.

Het patroon voor elke knop is hetzelfde:

* luister naar het `"click"`-event, verander de `huidigeEmote`, roep de functie aan die de UI bijwerkt.

In code ziet dat er ongeveer zo uit:

```js
knopBlij.addEventListener("click", function () {
  // 1. state aanpassen
  // 2. update-functie oproepen
});
```

#### Opmerking

* Hier gebruik je een **anonieme functie** (een functie zonder naam) direct in de eventlistener.
* Dat mag perfect: het maakt de code compact en leesbaar.
* Later kun je er altijd een aparte, benoemde functie van maken als je dat duidelijker vindt.

### Functies schrijven

Maak één centrale functie, bijvoorbeeld `updateEmote()`, die de **volledige UI** bijwerkt op basis van de huidige state.

Deze functie kijkt eerst naar de waarde van `huidigeEmote` en beslist op basis daarvan:

* welk icoon getoond wordt,
* welke titel getoond wordt,
* welke omschrijving getoond wordt,
* welke achtergrondkleur of sfeer gebruikt wordt.

In woorden:

```text
Functie updateEmote daarin zit:
  als huidigeEmote "blij" is:
      toon blij icoon, titel en tekst
      zet een vrolijke achtergrond
  anders als huidigeEmote "boos" is:
      toon boos icoon, titel en tekst
      zet een donkere of warme achtergrond
  anders als huidigeEmote "chill" is:
      toon chill icoon, titel en tekst
      zet een rustige achtergrond
  anders als huidigeEmote "hyper" is:
      toon druk icoon, titel en tekst
      zet een felle achtergrond
  anders:
      toon een neutrale toestand
```

Alle code die de UI verandert, steek je in deze ene functie. Dat heeft voordelen:

* je past alle logica op één plek aan,
* je hoeft bij nieuwe emotes enkel de functie uit te breiden,
* je eventlisteners blijven heel kort en duidelijk.

#### Conditionele logica

In je functie `updateEmote()` gebruik je dus een **if ... else if ... else**-structuur om te beslissen wat er moet gebeuren:

```js
if (huidigeEmote === "blij") {
  // blij-icoon, blij-titel, blij-tekst, blij-kleur
} else if (huidigeEmote === "boos") {
  // boos-icoon, boos-titel, boos-tekst, boos-kleur
} else if (huidigeEmote === "chill") {
  // chill-icoon, chill-titel, chill-tekst, chill-kleur
} else if (huidigeEmote === "hyper") {
  // hyper-icoon, hyper-titel, hyper-tekst, hyper-kleur
} else {
  // neutrale of standaard-toestand
}
```

Deze structuur kun je nadien altijd uitbreiden (bijvoorbeeld nieuwe emotes toevoegen).

#### Waarom `===` en niet `==`?

In JavaScript bestaan twee soorten vergelijkingen:

* `==` probeert waarden **eerst te veranderen van type**, en dan te vergelijken.
* `===` vergelijkt **waarde én type** tegelijk, zonder iets stiekem te veranderen.

Voor je emote-state wil je:

* exact controleren of `huidigeEmote` gelijk is aan de string `"blij"`, `"boos"`, enzovoort,
* geen automatische omzettingen of “gokken” van JavaScript.

Daarom gebruik je hier **altijd `===`**:

* je weet zeker dat je een string vergelijkt met een string,
* je vermijdt rare bugs en onverwacht gedrag,
* het is de standaard in moderne JavaScript-code.

Kort:

* `===` is **strikte vergelijking**,
* `==` is **losse vergelijking** met risico op misverstanden.

### Starttoestand

Zet onderaan je script nog éénmaal een oproep van je update-functie:

```js
updateEmote();
```

Zo zorg je ervoor dat:

* de pagina meteen bij het laden in een geldige toestand staat,
* de start-emote (bijvoorbeeld `"neutraal"`) direct zichtbaar is,
* de gebruiker een duidelijk beginpunt ziet, nog voor er op knoppen geklikt is.

## Uitbreidingen

Klaar met de basis? Maak één of meerdere uitbreidingen hieronder en werk ze netjes uit in HTML, CSS én JavaScript.

* **Extra emotes toevoegen** Voeg minstens twee nieuwe emotes toe (bijvoorbeeld *slaperig*, *verveeld*, *bang*). Zorg voor een nieuw icoon, een eigen titel, een passende tekst en een aangepaste achtergrondkleur. Breid je `if ... else if ... else`-structuur uit zodat alles correct meeverandert.
* **Actieve knop in de verf zetten** Laat duidelijk zien **welke emote actief is**. Voeg in je CSS een klasse zoals `.actief` toe voor knoppen. In `updateEmote()` verwijder je eerst die klasse bij alle knoppen en voeg je ze daarna alleen toe bij de knop van de huidige emote.
* **Random emote-knop** Maak een extra knop “Random”. Wanneer je daarop klikt, kiest je script willekeurig één van de emotes en zet die actief. Voor wie al met arrays gewerkt heeft: bewaar de namen van de emotes in een array en kies een willekeurig element daaruit; anders mag je ook een aantal `if`-takken gebruiken.
* **Toetsenbord-bediening** Laat de gebruiker de emotes ook met het toetsenbord bedienen. Bijvoorbeeld: cijfers 1-5 roepen de verschillende emotes op. Luister naar het `keydown`-event, controleer `event.key` en pas `huidigeEmote` en de UI aan.
* **Automatisch terug naar neutraal** Laat het figuurtje na een tijdje **automatisch terugkeren naar neutraal**. Bijvoorbeeld: elke keer als de emote verandert, start je met `setTimeout` een timer van 5 seconden die `huidigeEmote = "neutraal"` zet en `updateEmote()` opnieuw oproept (tenzij de gebruiker intussen al een andere emote gekozen heeft).
* **Extra sfeer in de achtergrond** Verander niet alleen de achtergrondkleur van de pagina, maar ook andere sfeer-elementen: bijvoorbeeld een lichte schaduw rond het figuurtje, een randkleur die per emote verandert, of een eenvoudige animatie (bijvoorbeeld `transform: scale(...)` of een zachte overgang met `transition`).
* . . .

## Indienen

* In de vakmap **Webontwikkeling** de map **VoornaamA_Emote** op je OneDrive.
* Plaats daarin **index.html**, **style.css** en **app.js**.
* Upload de **OneDrive-link** naar je volledige vak,ap in **Google Classroom** onder deze opdracht.

## Puntenverdeling

* **Structuur en netheid** Correcte map, juiste bestanden, heldere naamgeving.
* **HTML** Duidelijke structuur, correcte elementen, logische opbouw.
* **CSS** Verzorgde vormgeving, leesbaarheid, overzicht.
* **JavaScript**
  * **State** correct gebruikt
  * **Selecties** correct uitgevoerd
  * **Events** logisch gekoppeld
  * **Functies** helder opgebouwd
  * **UI-update** werkt correct
  * **If-else-logica** juist toegepast
* **Computational Thinking** De leerling toont dat patronen worden herkend en consequent toegepast.
* **Creativiteit** Unieke karakter-uitwerking of extra sfeer.

## Bronnen

#### Variabelen & state

* [let - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
* [const - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
* [JavaScript data types and data structures | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)

#### DOM-selecties

* [Document Object Model (DOM) | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
* [Document.querySelector() | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

#### Events

* [EventTarget.addEventListener() | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
* [DOM events - event reference | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events)

#### Functies

* [Functions - JavaScript Guide | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
* [function declaration - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)

#### Logica

* [if...else - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
* [Boolean - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* [Type coercion - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion)
* [Equality (`==`) - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality)
* [Strict equality (`===`) - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)

#### UI-updates

* [Node.textContent | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
* [HTMLElement.style | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)

#### HTML & defer

* [`<script>` - HTML script element | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
* [HTMLScriptElement.defer | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement/defer)

#### Denkconcept

* [Computational thinking | Wikipedia](https://en.wikipedia.org/wiki/Computational_thinking)