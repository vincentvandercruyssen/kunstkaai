+++
title = "Opdracht: Variabelen"
date = 2025-10-12T00:00:00Z
draft = false
+++

Variabelen, operatoren en rekenlogica in PHP.

Zoals je ondertussen weet, is PHP een **server-side programmeertaal**. Dat betekent dat de code eerst wordt uitgevoerd op de server, en dat het resultaat daarna naar de browser gestuurd wordt als gewone HTML. Hier leer je hoe je met PHP kunt rekenen, datums vergelijken en resultaten tonen op je webpagina.

In deze drie oefeningen leer je:

- Waarden opslaan in **variabelen**
- Rekenbewerkingen uitvoeren met **operatoren**
- Waarden netjes **afronden en tonen**
- **Datums** vergelijken en een **verschil in dagen** berekenen
- Eenvoudige **navigatie** maken tussen oefenpagina’s

## Belangrijke basisbegrippen

### Variabelen

Een variabele is een naam die je koppelt aan een waarde.  

Voorbeeld:  

```php
$getal1 = 10;
$naam = "Sara";
```

Alle variabelen in PHP beginnen met een `$`. 

Bron: [php.net → Variables](https://www.php.net/manual/en/language.variables.basics.php)

### Operatoren

Gebruik rekenoperatoren zoals `+`, `-`, `*`, `/`, `%` (restwaarde). Met haakjes `()` kun je de **volgorde van berekeningen** bepalen. 

Bron: [php.net → Operators](https://www.php.net/manual/en/language.operators.arithmetic.php)

### Functies

Functies voeren een specifieke taak uit. Ze nemen **parameters** (tussen haakjes) en geven een resultaat terug. Je kunt ingebouwde functies gebruiken, en zelf functies schrijven.

Voorbeelden van ingebouwde functies:

* `round($getal, 2)` → rondt af op 2 cijfers
* `number_format($getal, 2, ',', ' ')` → toont getal met komma en spatie als duizendtalscheiding
* `date("d-m-Y")` → geeft de datum van vandaag
* `strtotime()` → zet een datum om in seconden sinds 1 januari 1970

Bron: [php.net → Functions](https://www.php.net/manual/en/funcref.php)

### Output
  Met `echo` toon je tekst of waarden. Je kunt combineren met `.` (concatenatie):

```php
echo "De som is " . $som;
```

Bron: [w3schools.com → Concatenate Strings](https://www.w3schools.com/php/php_string_concatenate.asp)

## Opdracht 1 Rekenen met getallen

Met deze opdracht leer je hoe je in PHP getallen opslaat, ermee rekent en het resultaat netjes laat zien. Je ontdekt hoe je optelt, aftrekt, deelt, afrondt en zelfs checkt of je niet per ongeluk door nul deelt. Zo krijg je snel grip op variabelen en rekenwerk in PHP. 

Kortom: Variabelen gebruiken, rekenen met operatoren en resultaten tonen.

### Stappen

Maak twee variabelen, bijvoorbeeld `$getal1` en `$getal2`.

Bereken:

* Variabele voor Som (`$getal1 + $getal2`)
* Variabele voor Verschil (`$getal1 - $getal2`)
* Variabele voor Product (`$getal1 * $getal2`)
* Variabele voor Quotiënt (`$getal1 / $getal2`) - Gebruik `round(..., 2)` voor afronding van het quotiënt!
* Variabele voor Restwaarde (ofwel modulo) (`$getal1 % $getal2`)

Extra: Controleer of `$getal2` niet nul is:

```php
if ($getal2 === 0) {
  echo "Delen door nul kan niet.";
}
```

Toon elke berekening in een aparte zin met duidelijke labels. Leg kort uit waarom haakjes handig zijn bij complexe berekeningen.

### Let op!

* **Delen door nul** geeft een foutmelding.
* `round()` wijzigt de waarde; `number_format()` alleen de weergave.

### Kleine uitbreidingen

* Formatteer met `number_format($quotient, 2, ',', ' ')`.
* Toon machtsverheffing met `$getal1 ** $getal2`.

### Bronnen

* [php.net → Arithmetic operators](https://www.php.net/manual/en/language.operators.arithmetic.php)
* [W3Schools → PHP Operators](https://www.w3schools.com/php/php_operators.asp)

## Opdracht 2 Temperatuurrapport

In deze opdracht ga je een klein temperatuurrapport maken met PHP. Je leert hoe je variabelen gebruikt om minimum- en maximumtemperaturen op te slaan, het gemiddelde en bereik berekent, en alles netjes toont. Je oefent met afronden, omrekenen naar Fahrenheit en het mooi presenteren van je resultaten. Zo krijg je snel grip op rekenen en formatteren in PHP!

Kortom: Rekenen met meerdere variabelen en resultaten leesbaar tonen.

### Stappen

Maak variabelen `$seizoen`, `$mintemp`, `$maxtemp`.

Bereken:

```php
$gem = ($mintemp + $maxtemp) / 2;
$bereik = $maxtemp - $mintemp;
```

* Rond het gemiddelde af op 1 cijfer: `round($gem, 1)`.
* Toon de resultaten in korte zinnen met `echo`.
* Voeg conversie toe naar Fahrenheit:

```php
$gem_f = ($gem * 9/5) + 32;
```

* Gebruik `number_format()` voor een nette weergave met °C en °F.
* Zorg voor leesbare labels, bijvoorbeeld:
  “Gemiddelde temperatuur in de zomer: 21,5°C (70,7°F).”

### Let op!

* Gebruik **punt** als decimaalscheiding in berekeningen.
* `number_format()` maakt het resultaat leesbaar voor de gebruiker.

### Kleine uitbreidingen

* Gebruik `min()` en `max()` op een array met metingen.
* Toon het seizoen dynamisch in de titel.

### Bronnen

* [php.net → round()](https://www.php.net/manual/en/function.round.php)
* [W3Schools → PHP Numbers](https://www.w3schools.com/php/php_numbers.asp)

## Opdracht 3 Dagen tot verjaardag

In deze opdracht ga je met PHP berekenen hoeveel dagen het nog duurt tot je volgende verjaardag. Je leert werken met het **DateTime-object**, dat veel gebruikt wordt om datums en tijdstippen te vergelijken. Je oefent met het berekenen van verschillen tussen datums en het tonen van een duidelijke boodschap op je webpagina. Zo krijg je inzicht in het werken met datums, tijdzones en logische controles in PHP.

Kortom: Werken met DateTime-objecten en het verschil in dagen berekenen.

### Stappen

**Optioneel:** zet bovenaan de tijdzone vast zodat je berekening overal hetzelfde resultaat geeft.
(Handig als de server in een andere tijdzone staat.)

```php
date_default_timezone_set('Europe/Brussels');
```

Maak een **DateTime-object** voor vandaag en één voor je verjaardag:

```php
$vandaag = new DateTime();
$verjaardag = new DateTime('12 April');
```

Controleer of je verjaardag dit jaar al voorbij is.
Zo ja, tel dan één jaar bij:

```php
if ($verjaardag < $vandaag) {
  $verjaardag->modify('+1 year');
}
```

Bereken daarna het verschil in dagen:

```php
$verschil = $vandaag->diff($verjaardag);
$dagen = $verschil->days;
```

Toon de resultaten in duidelijke zinnen:

```php
echo "Vandaag is het " . $vandaag->format('d-m-Y') . ".<br>";
echo "Je volgende verjaardag is op " . $verjaardag->format('d-m-Y') . ".<br>";
echo "Nog " . $dagen . " dagen te gaan!";
```

### Kleine uitbreidingen

* Toon ook weken en dagen:

```php
$weken = intdiv($dagen, 7);
$rest = $dagen % 7;
echo "Dat is $weken weken en $rest dagen.";
```

* Toon een feestelijke boodschap wanneer het vandaag je verjaardag is:

```php
if ($dagen === 0) {
  echo "Gefeliciteerd!";
}
```

* Toon maanden en dagen apart met `DateInterval`-eigenschappen:

```php
echo "Nog {$verschil->m} maanden en {$verschil->d} dagen.";
```

### Let op!

* Het `DateTime`-object rekent automatisch correct met schrikkeljaren.
* Gebruik `format('d-m-Y')` om een datum netjes als dag-maand-jaar te tonen.
* Vergelijken met `<` werkt rechtstreeks tussen `DateTime`-objecten.
* De tijdzone instellen is **optioneel**, maar voorkomt verschillen tussen servers.

### Bronnen

* [php.net → DateTime](https://www.php.net/manual/en/class.datetime.php)
* [php.net → DateTime diff()](https://www.php.net/manual/en/datetime.diff.php)
* [W3Schools → PHP Date and Time](https://www.w3schools.com/php/php_date.asp)

## Navigatie plaatsen

Zet bovenaan op elke pagina een eenvoudige navigatie:

```html
<nav>
  <a href="rekenen.php">Rekenen</a>
  <a href="temperaturen.php">Temperaturen</a>
  <a href="verjaardag.php">Verjaardag</a>
</nav>
```

Of werk op één pagina met ankers:

```html
<nav>
  <a href="#rekenen">Rekenen</a>
  <a href="#temperaturen">Temperaturen</a>
  <a href="#verjaardag">Verjaardag</a>
</nav>
```

## Wat je moet kunnen na deze reeks

* Variabelen declareren en gebruiken in zinnen met `echo`
* Operatoren toepassen en afronden of formatteren
* Datum- en tijdfuncties gebruiken om verschillen te berekenen
* Kleine foutcontroles toevoegen (`if`)
* Basisnavigatie opbouwen in HTML

### Verder oefenen en verdiepen?

* [W3Schools PHP Tutorial](https://www.w3schools.com/php/default.asp)
* [php.net Handleiding (officieel)](https://www.php.net/manual/en/)

## Puntenverdeling

* **Structuur** Correcte bestandsnamen en mapstructuur.
* **Variabelen** Correcte declaratie en gebruik.
* **Rekenen** Juiste operatoren en afronding.
* **Datum** Correcte berekening van verschil in dagen.
* **Output** Duidelijke, leesbare tekst met labels.
* **Navigatie** Werkende links of ankers.