Werking
SORT is een browsergebaseerde vangstgame gebouwd met HTML, CSS en JavaScript (Canvas API). De speler bestuurt een vuilbak die links en rechts beweegt onderaan het scherm via de pijltoetsen, de A/D-toetsen of door de muis te bewegen. Afvalitems (blikjes, flessen, groente, …) vallen willekeurig van bovenaan naar beneden. Wanneer de speler een item vangt, verschijnt er een sorteeruitdaging: de speler moet kiezen of het afval bij PMD, GFT of Restafval hoort. Een juiste sortering levert bonuspunten op, een foute keuze kost punten. Het spel heeft drie duidelijke states: een startscherm (moeilijkheidsgraad kiezen), een speelscherm (60 seconden spelen met levens en score) en een eindscherm (statistieken, een milieufeit en een call-to-action naar de crowdfundingpagina). Als alle levens op zijn of de tijd om is, eindigt het spel.

Problemen en obstakels
Botsingsdetectie: In een eerste versie werd afval soms "dubbel" gevangen doordat de botsingscheck meerdere frames achter elkaar afvuurde. Dit is opgelost door het gevangen item meteen uit de array te verwijderen met splice() en tegelijk de sorteer-modus te activeren, zodat geen nieuw afval spawn zolang er een item wacht op sortering.
Canvas schaling op mobiel: De canvas had een vaste pixelbreedte van 420px, waardoor hij op smalle schermen uitpuilde. Dit is opgelost door width: 100% in CSS in te stellen en bij muis- en touchevents de schaalfactor (CANVAS_B / rect.width) mee te rekenen, zodat de coördinaten altijd kloppen ongeacht de weergavegrootte.
Sorteer-timing: Wanneer de speler te snel klikte kon een sorteerkeuze voor een nog niet gevangen item worden geregistreerd. Dit is opgelost door de sorteerAfval()-functie direct te laten stoppen als huidigAfvalItem leeg is.
Afval-interval: Bij moeilijkere niveaus daalde het spawn-interval te snel, waardoor het scherm volliep. Een Math.max(45, …) ondergrens zorgt ervoor dat het interval nooit kleiner wordt dan 45 frames, ook op het hoogste niveau.

Context
SORTAI is een slimme vuilbak met ingebouwde AI-camera (Logitech Brio webcam) die afval automatisch herkent en naar het juiste compartiment (PMD, Papier of Restafval) stuurt. Het product speelt in op het probleem dat veel mensen afval verkeerd sorteren, niet uit onwil maar uit onwetendheid.
VuilbakHeld sluit hier rechtstreeks op aan: de game leert spelers op een speelse manier welk afval in welke categorie hoort, precies het kernprobleem dat SORTAI oplost. Door de sorteermechaniek in de game te verwerken, ervaren bezoekers van de crowdfundingpagina zelf hoe lastig correct sorteren kan zijn — wat het product meteen relevanter maakt. De visuele stijl (donkere achtergrond, blauw-groene accenten, strakke typografie) is afgestemd op de moodboard en huisstijl van SORTAI.

Verantwoording (AI & Bronnen)
Claude (Anthropic) — claude.ai
De volledige code van dit project is gegenereerd via Claude Sonnet. Gebruikte prompts (samengevat):

"Je mag de code voor deze game schrijven, de code moet bestaan uit HTML, CSS en JavaScript" — voor de initiële gegenereerde versie als één bestand.
"Splits nu de HTML, CSS en JavaScript in aparte delen" — voor het opsplitsen in index.html, stijl.css en spel.js.

MDN Web Docs (developer.mozilla.org)
Geraadpleegd voor documentatie over de Canvas API (CanvasRenderingContext2D), met name voor roundRect(), shadowBlur en requestAnimationFrame.
Google Fonts
Lettertypen Nunito en Space Mono geladen via fonts.googleapis.com, passend bij de strakke, technische huisstijl van SORTAI.
Eigen wireframe (Weboriëntatie opdracht)
Vóór de codegeneratie is er een low-fidelity wireframe gemaakt met de drie schermen en de bijhorende acties. Deze wireframe is als basis gebruikt bij het opstellen van de prompts voor Claude.