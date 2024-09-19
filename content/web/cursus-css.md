+++
title = 'Cursus: CSS'
date = 2024-09-10T08:00:00-07:00
draft = false
+++

## Cascading Style Sheets

Alle HTML-elementen hebben standaard stijlkenmerken. Wanneer je een eigen website maakt, kun je deze stijlkenmerken aanpassen met CSS. Je kunt dan informatie toevoegen aan HTML-elementen, zoals kleur, lettertype, afstand en achtergrond. Dit kan binnen het document zelf (als attribute van ieders element of met een `<style>`-element) of, nog veel beter, in een extern CSS-bestand aan de hand van het `<link>`-element.

{{< showcode >}}<link rel="stylesheet" href="style.css">

{{< /showcode >}}

CSS staat voor Cascading Style Sheets. Het is een taal die wordt gebruikt om het uiterlijk, of lay-out, van een webpagina te beschrijven. CSS wordt gebruikt om alle HTML-elementen op een pagina op te maken, inclusief de koppen, alinea's en andere stukken tekst. Te beginnen bij het geheel of het hoogst liggend element, om dan steeds gedetailleerder vorm te geven.

Dit stijlblad dat verschillende eigenschappen toepast op één of meerdere documenten wordt verwerkt van boven naar beneden, vandaar cascade (waterval). CSS kan niet alleen worden gebruikt om de lay-out van een pagina op te maken, maar ook om functies zoals bijvoorbeeld animaties en interactieve dropdownmenu's te creëren.

### CSS Vernieuwingen

CSS is de afgelopen jaren steeds veelzijdiger geworden en kan inmiddels veel meer dan vroeger. Met het nieuwe zogenaamde flex en grid systeem kunnen we eenvoudiger vloeiende lay-outs maken. Deze lay-outs zijn *responsive* of adaptief aan het beeldscherm; ze zorgen ervoor dat ze op alle schermgroottes goed te zien zijn, van smartphone tot computerscherm.

{{< svg src="/img/web/cursus-css-responsive-1.svg" >}}

**Responsive design:** lay-outs die veranderlijk zijn aan de schermgrootte van een apparaat.

**CSS flex(box)** is een eendimensionale lay-outmethode die werkt met flex-items binnen een flex-container. Deze flex-items kunnen in een rij of kolom gestapeld worden. Dit is afhankelijk van de flex-richting.

**CSS grid** is een tweedimensionale lay-outmethode die een gebied in rijen en kolommen verdeelt. De elementen binnen het grid kunnen zo netjes meegaan met de schermgrootte.

In tegenstelling tot de reguliere flow lay-out zijn flex en grid ouderlijke elementen of containers. Zij krijgen extra eigenschappen die voornamelijk bepalen hoe de indeling van onderliggende elementen gebeurt. Dit staat tegenover de bekende flow lay-out waar je speelt met de display-methode van individuele elementen om een vormgeving te creëren.

## CSS Declaration

Een CSS-regelset bestaat uit een selector en een declaratieblok. De selector verwijst naar het HTML-element dat je wil opmaken. Het declaratieblok bevat één of meer veranderingen of eigenschappen, gescheiden door puntkomma's. Elke verandering bevat een CSS eigenschapsnaam en een waarde, gescheiden door een dubbele punt.

{{< showcode >}}p {
  color: red;
  text-align: center;
}

{{< /showcode >}}

Veranderingen aan CSS eigenschappen eindigen altijd met een puntkomma en declaratieblokken zijn omgeven door accolades. De volgorde van de declaratie is belangrijk. Wanneer meerdere declaraties dezelfde eigenschap hebben, wordt alleen de laatste gebruikt.

{{< showcode >}}p {
  color: red;
  color: blue; /* → deze wordt gebruikt */
}

{{< /showcode >}}

## CSS Selectors

- {{< a href="https://www.w3schools.com/CSSref/trysel.asp" >}}

Met CSS maak je gebruik van verschillende selectors. Hiermee selecteer je de elementen waarop je stijl wilt toepassen. De selectors kunnen verschillende vormen aannemen, afhankelijk van de elementen waarop je wilt selecteren.

- Een element-selector: selecteert alle elementen van een bepaalde soort.
- Een id-selector: selecteert een element met een bepaald id.
- Een klasse-selector: selecteert alle elementen met een bepaalde class.
- Een pseudo-selector: selecteert elementen op basis van hun (vaak tijdelijke) toestand.

### Element-selector

De eenvoudigste selector is een element-selector. Met deze selector selecteer je alle elementen van een bepaalde soort. Je gebruikt hiervoor de naam van het element. Denk bijvoorbeeld aan de body of `<h1>` (kop 1).

{{< showcode >}}body {
  background-color: red;
}

h1 {
  property: value;
}

{{< /showcode >}}

### Id-selector

Een id-selector is een aanduiding waarmee je kunt opgeven welke stijlen worden aangepast voor een element met een bepaalde id-waarde. Een id-selector wordt geschreven als een hashtag (#) gevolgd door de id van het element. In het onderstaande voorbeeld wordt de id "#uniek" gebruikt om de stijlen van het element met id="uniek" toe te passen.

{{< showcode >}}#uniek {
  background-color: yellow;
}

{{< /showcode >}}

### Klasse-selector

Een klasse-selector is een aanduiding waarmee je kunt opgeven welke stijlen worden toegepast op een HTML-element met een class-attribute. Een klasse-selector is een aanduiding die begint met een punt (.). In de onderstaande CSS-regel wordt de klasse-selector ".groepje" gebruikt. Dit betekent dat de eigenschappen worden toegepast op alle HTML-elementen met de klasse "groepje".

{{< showcode >}}.groepje {
  background-color: red;
}

{{< /showcode >}}

### Pseudo-selector

Met een pseudo-selector ga je een bepaalde stijl toepassen op een element dat in een bepaalde relatie tot een ander element staat. Het beste voorbeeld van een pseudo-selector is `:hover`, waarmee je kunt opgeven dat je een bepaalde stijl wilt toepassen op een element wanneer de muisaanwijzer eroverheen gaat. Pseudo-selectors hebben dus vaak te maken met de, al dan niet tijdelijke, toestand van een element.

{{< showcode >}}a:hover {
  color: red;
}

{{< /showcode >}}

### Combinaties

#### Afstammeling combinatie

Je kan meer verfijnde selecties maken door een spatie te gebruiken om afstammelingen van een element te selecteren. Hieronder selecteer ik bijvoorbeeld alleen de list-items binnen nav-elementen.

{{< showcode >}}nav li {
  display: inline-block;
}

{{< /showcode >}}

### Selector lijst

Een selector lijst is een aantal selectors gescheiden door komma's, die samen een unieke set van elementen selecteren. Zo kan je heel gemakkelijk meerdere elementen selecteren en eigenschappen toekennen.

{{< showcode >}}header, main, footer {
  padding: 2vh 4vw;
}

{{< /showcode >}}

## CSS eigenschappen

CSS eigenschappen of properties zijn de stylingsmogelijkheden die je hebt binnen CSS. Ze bepalen hoe je HTML-elementen kunt opmaken, zoals de kleur, het lettertype, de achtergrond, de margins en de padding.

#### De meest gebruikte CSS eigenschappen

{{< table_layoutfixed >}}
| **Kleur en tekst**     | **Lay-out**        | **Geavanceerd**     |
|------------------------|--------------------|---------------------|
| background             | position           | overflow            |
| color                  | z-index            | cursor              |
| font                   | top                | opacity             |
| text-align             | right              | filter              |
| line-height            | bottom             | @font-face          |
| text-transform         | left               | @import             |
| text-decoration        | display            | @media              |
| letter-spacing         | margin             | transform           |
| word-spacing           | border             | animation           |
| list-style             | width              |                     |
|                        | height             |                     |
|                        | padding            |                     |


### Shorthands

Een shorthand is een manier om een aantal CSS-regels in één regel te schrijven. Het is een kortere manier om dezelfde CSS-regels te schrijven. Het is beter om de shorthand-methode in sommige gevallen te vermijden omdat de code zo moeilijker leesbaar wordt. Voor margin en padding is het aan te raden om de shorthand wel te gebruiken.

### background

De `background` eigenschap is een kortere manier, *shorthand*, om `background-color`, `background-image`, `background-position`, `background-repeat`, en `background-size` in één regel te definiëren. Gemakkelijker is het vaak om deze eigenschappen afzonderlijk te definiëren.

{{< showcode >}}body {
  background: #ff0000 url("img/lizard.png") center no-repeat 200px;
}

{{< /showcode >}}

Dat is hetzelfde als:

{{< showcode >}}body {
  background-color: #ff0000;
  background-image: url("img/lizard.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 200px;
}

{{< /showcode >}}

### background-image

De eigenschap `background-image` stelt één of meer achtergrondafbeeldingen in op een element. De eigenschappen gekoppeld aan `background-image` worden gebruikt om de afbeelding in de achtergrond van een element op verschillende manieren te bewerken.

**Background-repeat**: De eigenschap `background-repeat` wordt gebruikt om aan te geven hoe een achtergrondbeeld moet worden herhaald. Een achtergrondafbeelding kan langs de horizontale en verticale as worden herhaald, of helemaal niet. Zo zijn er onder andere de waarden `repeat`, `repeat-x`, `repeat-y`, en `no-repeat`.

**Background-position**: De eigenschap `background-position` wordt gebruikt om de positie van een achtergrondbeeld te specificeren. Zo zijn er de waarden `left`, `right`, `top`, `bottom`, `center`, en combinaties daarvan zoals `left center`, `right center`, etc.

**Background-size**: De eigenschap `background-size` wordt gebruikt om aan te geven hoe een achtergrondbeeld moet worden geschaald. De afbeelding kan behouden blijven in de oorspronkelijke grootte, uitgerekt of beperkt worden om in de beschikbare ruimte te passen. Je kunt onder andere de waarden `cover` en `contain` gebruiken.

#### background-image eigenschappen

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/RwjNrbN" height="420" >}}

### color

De `color` eigenschap bepaalt de kleur van de tekst in een element. De kleur kan worden opgegeven als een hexadecimaal getal, RGB- of HSL-waarde, of een naam van {{< a href="https://www.w3schools.com/colors/colors_names.asp" text="een standaard kleur" >}}.

{{< showcode >}}p {
  color: red;
  color: #ff0000;
  color: rgb(255,0,0);
  color: hsl(0,100%,50%);
}

{{< /showcode >}}

#### Standaardkleuren

Alle moderne browsers ondersteunen 140 standaard kleurnamen. {{< a href="https://www.w3schools.com/colors/colors_names.asp" text="Je kan de lijst onder andere terugvinden op w3schools..." >}}

{{< showcode >}}color: firebrick;

{{< /showcode >}}

#### Hexadecimale kleuren

Een hexadecimale kleur wordt opgegeven met: `#RRGGBB`. RR (rood), GG (groen) en BB (blauw) zijn hexadecimale gehele getallen tussen 00 en FF die de intensiteit van de kleur aangeven.

{{< showcode >}}color: #B22222;

{{< /showcode >}}

#### rgb() kleuren

De notatie `rgb()` drukt een kleur uit met drie parameters: rood, groen en blauw (r, g, b). De waarde van elke parameter moet liggen tussen 0 en 255. Een optionele alfacomponent vertegenwoordigt de transparantie van de kleur.

{{< showcode >}}color: rgb(178, 34, 34);

{{< /showcode >}}

#### hsl() kleuren

De notatie `hsl()` drukt een kleur uit volgens de componenten voor tint (*hue*), verzadiging (*saturation*), en lichtheid (*lightness/brightness*).

{{< showcode >}}color: hsl(0, 68%, 42%);

{{< /showcode >}}

{{< img src="/img/web/cursus-css-color_wheel-1.png" width="360" >}}

#### Additieve kleuren

Additieve kleuren zijn kleuren die door licht te combineren worden gevormd. Het licht dat we zien is een mix van verschillende kleuren licht, elk met hun eigen golflengte. Wanneer deze kleuren licht samenkomen, worden ze toegevoegd aan elkaar en wordt het totaal licht dat we zien helderder. De primaire additieve kleuren zijn rood, groen, en blauw.

|   |   |
| - | - |
| {{< svg src="img/web/colors-additive-rgb.svg" width="1200" >}} | {{< svg src="img/web/colors-subtractive-cmyk.svg" width="1200" >}} |
| RGB Additieve kleurmenging | CMYK Subtractieve kleurmenging |

#### Kleurenkiezer in VSC

In Visual Studio Code kan je door de verschillende kleurennotaties kiezen door over een kleureigenschap te zweven (hoveren) en door te klikken op de balk met de kleurnotatie. 

{{< video src="/img/web/cursus-css-vsc-colorpicker-1.mp4" width="360" >}}

### font

De `font` eigenschap bepaalt de weergave van de lettertypen. Het is een kortere manier van het definiëren van onder andere de `font-family`, `font-weight`, en `font-size` eigenschappen in één regel.

{{< showcode >}}section {
  font-family: Georgia, serif;
  font-size: 1.5rem;
  font-weight: bold;
}

{{< /showcode >}}

#### font-family

Een `font-family` is een verzameling van verschillende lettertypen die allemaal een soortgelijke stijl hebben. De `font-family` eigenschap geeft de browser aan welke font de tekst moet laten zien.

#### font-size

De `font-size` eigenschap bepaalt de grootte van de tekst in een element.

#### font-weight

De `font-weight` eigenschap in CSS bepaalt de dikte van de tekst. De beschikbare gewichten zijn afhankelijk van de lettertypefamilie die momenteel is ingesteld.

#### Schreefloos (sans-serif) en schreef (serif)

Een sans-serif, ook wel schreefloze, lettertype is een lettertype zonder de kleine, versierde details van het lettertype. Serif, of schreef, lettertypes hebben deze kleine details wel.

{{< p_style style="font-family: sans-serif; font-size: 2rem; padding: 0 6rem;" >}}
    Schreefloos (sans-serif) 
{{< /p_style >}}

{{< p_style style="font-family: serif; font-size: 2.2rem; padding: 0 6rem;" >}}
    Schreef (serif)
{{< /p_style >}}

#### Proportioneel en monospace

Een proportioneel lettertype is een lettertype waarbij de letters verschillende breedtes hebben. Een monospace lettertype is een lettertype waarbij iedere letter evenveel ruimte inneemt.

{{< checkerboard >}}
    Proportioneel: alle schrifttekens hebben steeds een verschillende breedte.
{{< /checkerboard >}}

{{< checkerboard monospace="true" >}}
    Monospace: alle schrifttekens hebben telkens dezelfde breedte.
{{< /checkerboard >}}

#### CDN Fonts

Een CDN, *content delivery network*, is een netwerk van servers die gebruikt worden om inhoud te leveren aan gebruikers over de hele wereld. CDN fonts zijn lettertypes die via zo een netwerk worden geleverd.

- {{< a href="https://fonts.adobe.com/" text="Adobe Fonts" >}}
- {{< a href="https://fonts.google.com/" text="Google Fonts" >}}

### @font-face

`@font-face` specificeert een aangepast lettertype waarmee tekst moet worden weergegeven; het lettertype kan worden geladen vanaf een externe server of een lokaal geïnstalleerd lettertype op de eigen computer van de gebruiker.

{{< showcode >}}@font-face {
  font-family: "Open Sans";
  font-weight: 400;
  src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
}

{{< /showcode >}}

### @import

De `@import` wordt gebruikt om stijlregels uit andere stylesheets te importeren, bijvoorbeeld een verzameling fonts.

{{< showcode >}}@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap');

{{< /showcode >}}

## Flow Lay-out

Flow lay-out is de manier waarop block- en inline-elementen op een pagina worden weergegeven. Elk HTML-element heeft een standaardweergave (*display, inline,...*), deze eigenschap is afhankelijk van het type element en kan worden aangepast.

In de flow lay-out worden inline-elementen weergegeven in de inline-richting, dat wil zeggen in de richting van een zin of een regel. Na elkaar van links naar rechts.

Blokelementen worden onder elkaar weergegeven, zoals alinea's. Onder elkaar van boven naar onder.

### display

De `display` eigenschap stelt in of een element wordt behandeld als een blok- of inline-element in de normale flow lay-out. Het kan ook onderliggende elementen (*children*) in een bepaald lay-outtype gieten, zoals bij grid en flex.

- **display: none;** Verbergt een element (en onderliggende geneste elementen).
- **display: inline;** Elementen worden geplaatst op dezelfde regel als de omringende inhoud. Een inline element begint niet op een nieuwe regel en neemt slechts zoveel breedte in beslag als nodig is.
- **display: block;** Elementen worden geplaatst op een nieuwe regel. Een element op blokniveau neemt altijd de volledige beschikbare ruimte in beslag.
- **display: inline-block;** Elementen worden geplaatst op dezelfde regel als de omringende tekst, maar kunnen worden aangepast in breedte en hoogte.

{{< table_layoutfixed >}}
| | |
|-|-|
|░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ {{< br >}}░░░░░░░░░░░░░░░░ ← `inline` richting → {{< br >}}░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ {{< br >}}|↑ {{< br >}} `block` richting {{< br >}} ↓|

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/QWOwbWJ" height="548" >}}

#### Flow lay-out navigatie met li's en a's

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/bGMZyde" height="480" >}}

## Box Model

Het Box model is de manier van weergeven van HTML-elementen in de webbrowser. Het bevat vier verschillende onderdelen: de content (*inhoud*), de padding (*opvulling*), de border (*rand*), en de margin (*marge*). Deze onderdelen kunnen verschillende eigenschappen hebben, zoals afmetingen, kleuren, en randstijlen.

{{< img src="/img/web/cursus-css-box-model-1.png" width="1600" >}}

- **Content area:** Bevat de "echte" inhoud van het element, zoals tekst, een afbeelding, of een videospeler. 
- **Padding area:** Breidt het inhoudsgebied uit met de padding van het element.
- **Border area:** Breidt het opvulgebied uit met randen rond het element.
- **Margin area:** Breidt het randgebied uit met een leeg gebied dat wordt gebruikt om het element van zijn buren te scheiden.

### padding

Padding wordt gebruikt om tussenruimte te geven rond de inhoud van een element. Net als een postpakketje kan er opvulling (*padding*) rond de inhoud toegevoegd worden zodat deze de rand van de doos niet raakt.

De padding shorthand stelt padding aan alle vier de zijden van een element tegelijk in. Deze shorthand kan worden veranderd met één, twee, drie of vier waarden.

- Wanneer één waarde is opgegeven, wordt dezelfde padding toegepast op alle vier de zijden.
- Bij twee waarden: de eerste is voor boven/onder, de tweede voor links/rechts.
- Bij drie waarden: de eerste is voor boven, de tweede voor rechts/links, en de derde voor onder.
- Bij vier waarden: de padding is van toepassing op *boven, rechts, onder, en links* in die volgorde (met de klok mee).

### border

Een border is een lijn die rond de rand van een element wordt getekend. De `border`-eigenschap is een kortere manier om de `border-width`, `border-style`, en `border-color` eigenschappen in één regel te schrijven.

{{< showcode >}}section {
  border-width: 4px;
  border-style: dotted;
  border-color: red;
}

{{< /showcode >}}

### margin

Margin wordt gebruikt om elementen op een pagina op een bepaalde afstand van elkaar te houden.

De margin shorthand stelt margin aan alle vier de zijden van een element tegelijk in. De eigenschap margin kan worden opgegeven met één, twee, drie, of vier waarden.

- Wanneer één waarde is opgegeven, wordt dezelfde margin toegepast op alle vier de zijden.
- Bij twee waarden: de eerste is voor boven/onder, de tweede voor links/rechts.
- Bij drie waarden: de eerste is voor boven, de tweede voor rechts/links, en de derde voor onder.
- Bij vier waarden: de margin is van toepassing op *boven, rechts, onder, en links* in die volgorde.

#### Horizontale centrering

Om iets horizontaal te centreren, kun je `display: flex` en `justify-content: center` gebruiken. Ook kun je `margin: 0 auto` toepassen om een element binnen het bovenliggende element te centreren.

#### Centreren met margin

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/ZERGera" height="330" >}}

## Eenheden

Er zijn in CSS verschillende maateenheden om afmetingen aan te passen. Veel van de eigenschappen kunnen veranderd worden met deze eenheden, zoals `width`, `height`, `margin`, `padding`, en `font-size`. 

### Absolute eenheden

Absolute eenheden zijn onafhankelijk van de context waarin ze worden gebruikt. De meest voorkomende absolute CSS-eenheid is pixels (*px*). 

### Relatieve eenheden

Relatieve eenheden zijn afhankelijk van de context waarin ze worden gebruikt. Ze zijn relatief aan iets anders, zoals de grootte van het lettertype van het bovenliggende element of de grootte van de viewport.

| **Eenheid** | **in verhouding tot** |
|-------------|-----------------------|
| `%`         | Percentagewaarden zijn altijd relatief ten opzichte van een andere hoeveelheid, bijvoorbeeld relatief aan de breedte van het bovenliggende element. |
| `em`        | De lettergrootte van het bovenliggende element. |
| `rem`       | Lettergrootte van het root-element. |
| `ch`        | De breedte van letterteken "0" van het lettertype (van het element). |
| `vw`        | Viewport Width, 1% van de breedte van het venster. |
| `vh`        | Viewport Height, 1% van de hoogte van het venster. |

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/bGMZJBP" height="520" >}}

## box-sizing

De `box-sizing` eigenschap wordt gebruikt om te definiëren hoe het CSS box-model werkt. Bij het berekenen van de breedte en hoogte van een element wordt standaard de inhoud, de paddings, en de borders meegeteld.

{{< showcode >}}* {
  box-sizing: border-box;
}

{{< /showcode >}}

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/rNYBwXP" height="548" >}}

## Flexbox

Flexbox is een CSS lay-outmodel dat een efficiëntere manier biedt om ruimte tussen elementen op een pagina in te delen, uit te lijnen, en te verdelen. Je geeft het bovenliggende element een `display: flex` om een flex-container te maken.

In het flexbox lay-outmodel kunnen de kinderen van een flex-container in elke richting worden opgesteld.

#### Kolommen met Flexbox

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/KKeyWQj" height="580" >}}

#### Centreren met Flexbox

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/eYemZLZ" height="480" >}}

#### Flexbox Eigenschappen (Demo)

{{< iframe src="https://codepen.io/vincent-vandercruyssen-kunstkaai/embed/MWOYyGY" height="800" >}}

## Bronnen

#### Icoontjes

- {{< a href="https://www.svgrepo.com/" >}}

#### Fotografie

- {{< a href="https://unsplash.com/" >}}

#### Typografie

- {{< a href="https://fonts.adobe.com/" >}}
- {{< a href="https://fonts.google.com/" >}}

#### Kleuren

- {{< a href="https://color.adobe.com/create/color-wheel" >}}

#### Cheat sheets & tools

- {{< a href="https://www.w3schools.com/cssref/trysel.asp" >}}
- {{< a href="https://css-tricks.com/almanac/" >}}
- {{< a href="https://flexboxsheet.com/" >}}
- {{< a href="https://monsido.com/tools/contrast-checker" >}}
- {{< a href="https://www.w3schools.com/html/html5_semantic_elements.asp" >}}
- {{< a href="https://caniuse.com/" >}}
- {{< a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" >}}

#### Meer leren

- {{< a href="https://www.freecodecamp.org/learn/" >}}
- {{< a href="https://www.youtube.com/kepowob/" >}}
- {{< a href="https://developer.mozilla.org/en-US/docs/Web/HTML" >}}
- {{< a href="https://developer.mozilla.org/en-US/docs/Web/CSS" >}}

#### Inspiratie

- {{< a href="https://www.siteinspire.com/" >}}
- {{< a href="https://www.awwwards.com/" >}}