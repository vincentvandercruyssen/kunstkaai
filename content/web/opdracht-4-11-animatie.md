+++
title = 'Opdracht: Animatie'
date = 2025-04-20T08:00:00-07:00
draft = false
+++

## Opgave

Maak een geanimeerde webpagina waarin een figuur zich beweegt over een achtergrond die het volledige beeldscherm vult. De figuur zit in een container die beweegt over het scherm, terwijl de figuur zelf ook een kleine beweging uitvoert (bijvoorbeeld springen of draaien). Je creëert dus een animatie *binnen* een animatie. Voeg eventueel meerdere elementen toe die ook bewegen.

{{< video src="/img/web/opdracht-4-11-animatie-vb_1.mp4" >}}

In CSS werk je met animaties door twee zaken te combineren:

1. De **`animation`-eigenschap**: hiermee geef je een HTML-element een animatie, met instellingen zoals de duur, snelheid, naam van de animatie en hoe vaak ze herhaald wordt.
2. De **`@keyframes`-regel**: hierin beschrijf je hoe die animatie precies verloopt, bijvoorbeeld van links naar rechts, van klein naar groot, van rood naar groen, enzoverder.

Je gebruikt dus `animation` op het element zelf, en `@keyframes` om te zeggen wat er verandert tijdens de animatie.

## Voorbereiding

Maak een nieuwe map aan, genaamd `voornaam animatie`, binnen je map voor `Webontwikkeling` in je OneDrive. Open de map in Visual Studio Code.

Maak in deze nieuwe map de volgende bestanden aan:
- `index.html`
- `style.css`
- Een map `images` waarin je de figuur en de achtergrond plaatst.

Gebruik zelfgekozen afbeeldingen (een personage of object, en een passende achtergrond). De figuur moet mogelijk worden uitgesneden en als PNG-bestand met transparante achtergrond worden opgeslagen.

## Structuur van je HTML

Gebruik de standaard HTML-basisstructuur (de Emmet-sneltoets uitroepteken `!`). Verander het `title`-element en voeg een koppeling naar je CSS-bestand toe.

In de `<body>` plaats je één `main`-element. Binnen deze `main` komt een `div`-element met een duidelijke klasse (bijvoorbeeld `figuur-container`). Dit element is de container die je zult laten bewegen over het scherm, bijvoorbeeld horizontaal van links naar rechts.

In deze figuur-container komt een `img`-element voor de figuur zelf (bijvoorbeeld een wandelend diertje, robot, ridder,...). Kies een afbeelding die geschikt is om te laten bewegen.

## Achtergrond

Stel in CSS een afbeelding in als achtergrond van je gehele pagina (`body`-selector). De achtergrond moet het volledige scherm opvullen. Je kunt deze eventueel anders positioneren. Gebruik hiervoor de eigenschappen `background-image`, `background-size` en `background-position`.

## Bewegende container

De container waarin de figuur zit, wordt absoluut gepositioneerd ten opzichte van het scherm. Je geeft deze vervolgens een vaste positie (bijvoorbeeld op 2/3 van het scherm), dit doe je met `top`, `bottom`, `left` of `right` gebruikmakend van de procent-eenheid.

De container geef je een vaste breedte, hier kun je wel het best pixels gebruiken.

Laat de container bijvoorbeeld horizontaal van links naar rechts bewegen. De container krijgt hiervoor een `animation`-eigenschap. Je definieert onder je container-selector een `@keyframes`-regel voor de beweging.

Let op:

- Begin de animatie buiten het scherm (je kunt hiervoor de grootte van de container gebruiken, maar dan negatief). Als je de container op `width: 200px` hebt ingesteld gebruik je dus `left: -200px;`.
- Laat de container eindigen buiten het scherm. Door bijvoorbeeld `left: 100%;` te gebruiken zal de container bij het laatste frame buiten het scherm getekend worden.
- Gebruik een animatie die oneindig doorgaat (`infinite`) en best in een vast tempo (`linear`).

### animation-eigenschap

De eigenschap `animation` combineert verschillende animatie-instellingen in één regel. De gebruikelijke volgorde is:

```css
animation: benaming duurtijd timing-function iteration-count;
```

Bijvoorbeeld:

```css
animation: beweeg 5s linear infinite;
```

Dit betekent: gebruik de animatie `beweeg`, laat ze 5 seconden duren, met een gelijkmatig tempo (`linear`), en herhaal ze oneindig (`infinite`).

[MDN: animation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)

### @keyframes-regel

Met `@keyframes` beschrijf je welke stappen een animatie doorloopt. Je geeft een naam aan de animatie en definieert wat er op bepaalde tijdstippen gebeurt (bijvoorbeeld bij `0%` en `100%`, hetzelfde als `from` en `to`):

```css
@keyframes beweeg {
  0% {
    left: -200px;
  }
  100% {
    left: 100%;
  }
}
```

De animatie `beweeg` start in dit voorbeeld buiten het scherm links (`-200px`) en eindigt helemaal rechts van het scherm (`100vw`).

[MDN: @keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)

## Figuur beweegt apart

De figuur moet allereerst de volledige grootte van de figuur-container innemen. Dit doe je eenvoudig met `width: 100%;`.

De figuur in de container krijgt ook een eigen animatie. Deze animatie werkt onafhankelijk van de beweging van de container. Denk aan een kleine sprong, een schommelende beweging of een lichte draai. Deze animatie herhaalt snel en zorgt voor een levendig effect.

Denk na over:

- De richting van de beweging (op en neer, heen en weer, draaien,…).
- De duur en het ritme van de animatie.
- De combinatie van beweging en eventueel rotatie (gebruik `transform`).

[MDN: transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

## Extra (optioneel)

- Voeg meerdere figuren toe die op verschillende plaatsen bewegen.
- Laat de achtergrond subtiel meebewegen ([parallax](https://nl.wikipedia.org/wiki/Parallax)).
- Voorzie achtergrondobjecten (zoals wolken of insecten) die ook geanimeerd zijn.
- ...

## Indienen

Mapnaam: `voornaam animatie` met volgende inhoud:
- `index.html`
- `style.css`
- Map `images` met daarin de figuur en achtergrond.

Voeg de koppeling naar je volledige OneDrive-map `webontwikkeling` toe in de opdracht in Google Classroom.

## Puntenverdeling

- **Structuur (04)**: Correcte mappen en bestandsnamen.
- **HTML (08)**: Heldere en semantische structuur.
- **CSS Basis (04)**: Volledige achtergrond en opmaak van de pagina.
- **Beweging container (10)**: Animatie van de container correct en vloeiend.
- **Beweging figuur (10)**: Afzonderlijke animatie van de figuur werkt goed.

## Veelvoorkomende fouten

- Geen correcte link tussen HTML en CSS-bestand.
- Figuur beweegt niet apart van container.
- Afbeeldingen zijn verkeerd geschaald of vervormd.
- Te snelle of slordige animaties.
- Onleesbare bestandsnamen of map niet gedeeld via OneDrive.