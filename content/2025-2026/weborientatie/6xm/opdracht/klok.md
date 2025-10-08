+++
title = "Opdracht: Klok"
date = 2025-10-08T00:00:00Z
draft = false
+++

## Inleiding

Je maakt in deze opdracht de meest ongelooflijke schermvullende digitale klok met JavaScript die de wereld ooit gezien heeft. De klok toont **tijd** en **datum** in **real-time** en gebruikt de tijdzone van je **computer**. 

Je leert:
- datum en tijd ophalen met `Date()`
- formatteren met `Intl.DateTimeFormat`
- de DOM aanpassen met `textContent`
- de klok precies per seconde te laten tikken

De **CSS/vormgeving** bepaal je zelf. Laat je creativiteit de vrije gang!

## Bestanden en namen

```
└── Weboriëntatie/
  └── VoornaamA_Klok/
    ├── index.html
    ├── style.css
    ├── app.js
    └── ...
```

## HTML minimale structuur

Plaats in de `body` een `<main>`-element met twee `<div>`-elementen:
- één voor de **tijd**
- één voor de **datum**

Gebruik duidelijke `id`-namen (bijv. `tijd` en `datum`), zodat je ze later in JavaScript kunt opzoeken. Zet het `<script>`-element **onderaan** de `body`, zodat de elementen eerst bestaan voor het script wordt uitgevoerd.

## JavaScript stap voor stap

### Elementen selecteren

```js
const tijdText = document.querySelector('#tijd');
const datumText = document.querySelector('#datum');
```

Je kiest de juiste elementen uit de HTML. Met `const` geef je aan dat deze verwijzingen **niet meer veranderen**. Zo kun je straks hun tekstinhoud (`textContent`) aanpassen.

### Tijdzone en formatters

Om tijd en datum leesbaar te tonen, gebruik je een **formatter**. Die maak je met de ingebouwde functie **`Intl.DateTimeFormat()`**.

Het object **`Intl`** staat voor *Internationalization* (internationale instellingen). Het zorgt ervoor dat de browser weet **hoe tijd en datum eruit moeten zien** in een bepaalde **taal en regio**.

Het idee is eerst de formatter te maken, iets wat een complex gegeven als de huidige datum en tijd kan opmaken (*to format*) tot iets wat voor jouw project leesbaar is. Wanneer je die formatter dan loslaat op de huidige datum en/of tijd kun je die omzetten tot leesbare tekst!

Je maakt voor de tijd een `const` `tijdFormat`. Je geeft die een waarde met Intl.DateTimeFormat(locatie tussen aanhalingstekens, opties tussen accolades).

#### Locale

De eerste parameter, `'nl-BE'`, bepaalt de taal en regio.

* `'nl'` = Nederlands
* `'BE'` = België

Zo weet de browser dat maandnamen in het Nederlands moeten en dat we een 24-uursnotatie gebruiken.

#### Opties

De tweede parameter is een **object** tussen `{ ... }` waarin je aangeeft **welke delen** van de tijd of datum je wil tonen, en **hoe**.

Je maakt bijvoorbeeld:

```js
const tijdFormaat = new Intl.DateTimeFormat('nl-BE', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
});
```

Wanneer je straks `.format(new Date())` gebruikt, zet dit een datumobject om naar tekst.

[MDN - Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

#### Overzicht van mogelijke instellingen

| Eigenschap | Mogelijke waarden                                         | Uitleg                               | Voorbeeld              |
| ---------- | --------------------------------------------------------- | ------------------------------------ | ---------------------- |
| `weekday`  | `'long'`, `'short'`, `'narrow'`                           | Dagnaam voluit of afgekort           | `woensdag`, `woe`      |
| `day`      | `'2-digit'`, `'numeric'`                                  | Dagnummer, met of zonder voorloopnul | `09` of `9`            |
| `month`    | `'long'`, `'short'`, `'narrow'`, `'2-digit'`, `'numeric'` | Maand voluit of als cijfer           | `oktober`, `okt`, `10` |
| `year`     | `'numeric'`, `'2-digit'`                                  | Jaartal volledig of 2 cijfers        | `2025` of `25`         |
| `hour`     | `'2-digit'`, `'numeric'`                                  | Uur met of zonder voorloopnul        | `09` of `9`            |
| `minute`   | `'2-digit'`, `'numeric'`                                  | Minuut met of zonder voorloopnul     | `05` of `5`            |
| `second`   | `'2-digit'`, `'numeric'`                                  | Seconde met of zonder voorloopnul    | `03` of `3`            |
| `hour12`   | `true` of `false`                                         | 12- of 24-uursnotatie                | `1:00 PM` of `13:00`   |

[ECMAScript - DateTimeFormat options](https://tc39.es/ecma402/#sec-datetimeformat-abstracts)

### Tikkende klok

Je kunt **nu** de klok al *triggeren* door de huidige tijd en datum op te halen met `new Date()`. Laat daarna je formatter erop los om deze om te zetten naar leesbare tekst. Zet die tekst vervolgens in de juiste HTML-elementen met `.textContent`. Zo verschijnt de tijd en datum direct op je pagina.

```js
const nu = new Date();
tijdText.textContent = tijdFormaat.format(nu);
```

Uiteraard zal de klok nu nog niet verdergaan, ze toont enkel de moment van het laden van de pagina. 

Om de klok **telkens opnieuw** te laten verversen, maak je een functie die zichzelf **elke seconde** opnieuw oproept aan de hand van `setTimeout`.

```js
function tikken() {
  ...
}

tikken();
```

Vergeet de functie zelf niet minimaal éénmalig zelf buiten de scope van de functie (onder de functie) te triggeren. 

Nu kun je zelfs de titel van de tab live veranderen. Die kun je aanpassen met `document.title`.

## Extra opties

- Eerste letter van datum kapitaliseren, correcter in Nederlands

```js
function capFirst(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
```

## Puntenverdeling

* Structuur correct met vaste bestandsnamen
* HTML bevat `main`, `#tijd`, `#datum`, en script onderaan
* JavaScript gebruikt correcte selecties en `Intl.DateTimeFormat`
* Klok tikt precies per seconde zonder drift
* Werking is stabiel en leesbaar
* Code is helder benoemd en logisch opgebouwd
* Vormgeving is eigen invulling zonder de logica te breken

## Bronvermelding

* [MDN Intl overzicht](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
* [MDN Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
* [ECMAScript DateTimeFormat object](https://tc39.es/ecma402/#datetimeformat-objects)