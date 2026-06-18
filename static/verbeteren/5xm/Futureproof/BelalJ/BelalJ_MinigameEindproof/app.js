/**
 * SeedChew: The Chew, Spit & Sprout Challenge
 * Core Application Logic & Interactive State Machine
 * Author: Belal J. (Weboriëntatie Mini-Eindproef)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // TRANSLATIONS DICTIONARY (Dutch, English, French)
    // ==========================================================================
    const translations = {
        nl: {
            // General & Start Screen
            "tagline": "KAUW • SPUUG • BLOEI & GROEI",
            "start-card-title": "Chew, Spit, and Sprout!",
            "start-card-p1": "Wist je dat reguliere kauwgom gemaakt is van <strong>synthetische plastics en rubber polymeren</strong> (dezelfde plastics als autobanden)? Wereldwijd dumpen we jaarlijks 100.000 ton kauwgom, wat leidt tot microplastics en dodelijke risico's voor vogels.",
            "start-card-p2": "<strong>SeedChew</strong> verandert dit volledig. Onze kauwgom is 100% biologisch afbreekbaar, gemaakt van natuurlijk chicle-boomsap en gevuld met <strong>inheemse wildbloemenzaden</strong>. Spuug het uit in de natuur en zie het veranderen in een bloemenparadijs in plaats van plasticvervuiling!",
            "preview-val-1": "25 Jaar",
            "preview-lbl-1": "Ontbinding reguliere gum",
            "preview-val-2": "30 Dagen",
            "preview-lbl-2": "SeedChew Bloeitijd",
            "preview-val-3": "100%",
            "preview-lbl-3": "Bijen- & Bijvriendelijk",
            "btn-start": "START SIMULATIE",
            
            // Simulation lab & stats
            "stat-pollution-lbl": "Bodemvervuiling:",
            "stat-flowers-lbl": "Bloemen gekweekt:",
            "instructions-hdr": "SIMULATIE-LAB INSTRUCTIES",
            "terminal-hdr": "SYSTEM LOGS",
            "plastic-litter-txt": "PLASTIC VERVUILING",
            
            // Chew Controls
            "chew-card-hdr": "Kauw-o-meter",
            "chew-bar-l1": "Hard",
            "chew-bar-l2": "GELIJKMATIG KAUWEN",
            "chew-bar-l3": "Super Elastisch!",
            "chew-metrics-lbl": "Kauwstatus:",
            "btn-chew": "KLIK SNEL OM TE KAUWEN",
            
            // Chew status levels
            "chew-status-not": "Nog niet gekauwd",
            "chew-status-hard": "Hard en taai...",
            "chew-status-stretching": "Plastic polymeren rekken uit...",
            "chew-status-stretching-sc": "Organisch chiclesap warmt op...",
            "chew-status-ready": "Klaar om uit te spugen!",

            // Spit Controls
            "spit-card-hdr": "Spuug-activator",
            "spit-card-desc": "Zodra de kauwgom de juiste textuur heeft, kun je hem op het grasperk spugen.",
            "btn-spit": "SPUUG UIT IN NATUUR!",
            
            // Timelapse Controls
            "timelapse-hdr": "TIME-LAPSE TIJDREIS",
            "btn-next-stage": "GA NAAR SEEDCHEW CHALLENGE",
            
            // Instructions Details - Traditional
            "instruction-t-stepA-title": "Stap A: Kauwen maar!",
            "instruction-t-stepA-p1": "Klik herhaaldelijk op de <strong>KAUW-knop</strong> om de textuur van de kauwgom elastisch en zacht te maken.",
            "instruction-t-stepA-p2": "Kauw tot de meter 100% bereikt om de kauwgom klaar te maken om uit te spugen.",
            "instruction-t-stepB-title": "Stap B: Spuug het uit.",
            "instruction-t-stepB-p1": "De plastic kauwgom is gekauwd. Klik op de knop <span class='text-error font-bold'>'SPUUG UIT IN NATUUR!'</span> om hem op het gazon te deponeren.",
            "instruction-t-stepB-p2": "Kauwgom belandt helaas vaak langs de weg of in grasvelden.",
            "instruction-t-stepC-title": "Stap C: Versnel de tijd.",
            "instruction-t-stepC-p1": "De plastic kauwgom ligt op de bosgrond. Verschuif de **Tijd-slider** van 0 naar 25 jaar om te zien hoe snel dit plastic afbreekt.",
            "instruction-t-stepC-p2": "Pas op voor vogels en bodemvervuiling!",

            // Instructions Details - SeedChew
            "instruction-s-stepA-title": "Stap A: Lekker kauwen!",
            "instruction-s-stepA-p1": "Klik op de <strong>KAUW-knop</strong>. De gum smaakt naar biologische munt en bevat natuurlijke vitaminen en inheemse zaadjes.",
            "instruction-s-stepA-p2": "Geen plastics of rubbers aanwezig.",
            "instruction-s-stepB-title": "Stap B: Spuug het uit.",
            "instruction-s-stepB-p1": "Klaar met kauwen? Klik op <span class='text-success font-bold'>'SPUUG UIT IN NATUUR!'</span> om de biologische zaden in de aarde te planten.",
            "instruction-s-stepB-p2": "100% veilig voor vogels en micro-organismen!",
            "instruction-s-stepC-title": "Stap C: Versnel de tijd.",
            "instruction-s-stepC-p1": "De chicle kauwgom ligt in de modder. Verschuif de **Tijd-slider** van 0 naar 30 dagen om te zien hoe de natuur het biologische chiclesap afbreekt en in bloei zet.",
            "instruction-s-stepC-p2": "Zorg voor water en zonlicht!",

            // Timeline narratives - Traditional
            "narrative-t-0": "Sleep de regelaar om de klok vooruit te spoelen en de chemische afbraak te bestuderen.",
            "narrative-t-low": "Jaar ${years}: De kauwgom behoudt zijn felle kleur. Een hongerige vogel landt en ziet de roze kauwgom aan voor een sappige bes of worm!",
            "narrative-t-med": "Jaar ${years}: Het elastomeer droogt uit en verkleurt tot vuilgrijs onder invloed van UV-straling. De gum brokkelt uit tot kleine stukjes plastic zwerfafval.",
            "narrative-t-high": "Jaar ${years}: De kauwgom is uiteengevallen in ontelbare microscopische microplastics. Ze dringen door in de toplaag van de aarde en verstikken micro-organismen.",
            "narrative-t-end": "Jaar 25+: Na een kwart eeuw is de basis nog steeds niet biologisch afgebroken. De microplastics sijpelen door tot in het grondwater. Dit plastic vergaat nooit echt!",

            // Timeline narratives - SeedChew
            "narrative-s-0": "Sleep de regelaar om de klok vooruit te spoelen en de compostering en groei te simuleren.",
            "narrative-s-low": "Dag ${days}: Lichte regenbuien hydrateren de boomsap-basis. De chicle kauwgom lost op natuurlijke wijze op en voedt de omliggende aarde met organische stoffen.",
            "narrative-s-med": "Dag ${days}: De chicle huls is 90% opgelost in de bodem. Uit de bloemenzaadjes die in de gum zaten, ontkiemt een prachtig groen kiemplantje!",
            "narrative-s-high": "Dag ${days}: De boomsap-compost is volledig opgenomen als meststof. De stengel groeit razendsnel omhoog en vormt diepe wortels en bladeren dankzij de rijke grond.",
            "narrative-s-end": "Dag ${days}: KERS OP DE TAART! De inheemse wilde kamille bloeit volledig op! Twee honingbijen arriveren direct om kostbare nectar te verzamelen. Biodiversiteit +1!",

            // Results & Table
            "results-hdr": "SIMULATIE RAPPORT",
            "results-tagline": "RESULTATEN VAN DE KAUWGOM VERGELIJKING",
            "table-hdr": "TRADITIONEEL VS. SEEDCHEW",
            "t-criteria": "Criteria",
            "t-traditional": "Traditioneel",
            "t-seedchew": "SeedChew",
            "tc-basis": "Grondstof basis",
            "tc-basis-trad": "Synthetisch Plastic (Polymeer)",
            "tc-basis-sc": "100% Natuurlijk Chicle sap",
            "tc-time": "Volledige afbraaktijd",
            "tc-time-trad": "> 25 Jaar (microplastics)",
            "tc-time-sc": "3 tot 4 Weken (compost)",
            "tc-pollution": "Bodemvervuiling",
            "tc-pollution-trad": "100% toxische ophoping",
            "tc-pollution-sc": "0% (Verrijkt de grond)",
            "tc-fauna": "Invloed op fauna",
            "tc-fauna-trad": "Dodelijk (vogelmaag verstopping)",
            "tc-fauna-sc": "Veilig (inheemse zaden eetbaar)",
            "tc-impact": "Ecologische impact",
            "tc-impact-trad": "Zwerfafval & Plasticberg",
            "tc-impact-sc": "Groei wilde bloemen / bijenvoeding",
            "chart-title": "Ontbindingstijd Vergelijking (in dagen)",
            "chart-val-trad": "9125 dagen",
            "chart-val-sc": "30 dagen",
            
            // Pledge
            "pledge-badge": "CROWDFUNDING CAMPAGNE",
            "pledge-hdr": "Plant bloemen met jouw steun",
            "pledge-intro": "SeedChew lost het kauwgomprobleem op en maakt van de steden groene ecosystemen. We hebben jouw steun nodig om biologisch chicle-boomsap op grote schaal in te kopen en machines aan te passen voor zaadinjecties.",
            "cert-title": "OFFICIEEL CROWDFUND-CERTIFICAAT",
            "cert-text": "Gecertificeerd Wildbloem Zaaier",
            "cert-seal": "100% BIODEGRADABLE",
            "slider-lbl": "Kies jouw Pledge bedrag:",
            "pledge-target": "doel",
            "btn-back-now": "BACK SEEDCHEW NU",
            "btn-replay": "SPEEL OPNIEUW",

            // Ranks & Tiers
            "rank-seedbomber": "SEEDBOMBER",
            "rank-sprout": "SPROUT BACKER",
            "rank-patron": "FLOWER PATRON",
            "rank-builder": "FOREST BUILDER",
            "tier-digital": "TIER 1: DIGITAL THANK YOU",
            "tier-starter": "TIER 2: STARTER PACK",
            "tier-variety": "TIER 3: VARIETY PACK & SEEDBOX",
            "tier-ecosystem": "TIER 4: ECOSYSTEM PARTNER",
            "desc-digital": "Ontvang exclusieve digitale SeedChew wallpapers, een unieke backer badge op Discord, en onze eeuwige dankbaarheid voor het zaaien van wilde bloemen!",
            "desc-starter": "Je ontvangt 3 pakjes SeedChew (Munt, Aardbei en Wildbloesem) in 100% composteerbaar perkamentpapier en een set biologische Sprout stickers!",
            "desc-variety": "Ontvang 10 pakjes SeedChew, een prachtig herbruikbaar houten bewaarblikje en een pocket-gids met inheemse bloemen die je kunt zaaien en kweken!",
            "desc-ecosystem": "Ontvang een jaarvoorraad SeedChew (50 pakjes), een gepersonaliseerde houten zaaidoos en wij planten namens jou direct 50m² wilde bloemenweide voor honingbijen!",

            // System logs
            "log-init": "Natuur-simulator geïnitialiseerd. Welkom onderzoeker.",
            "log-t-step1": "STAP 1: Neem een traditionele roze kauwgom en start met kauwen.",
            "log-t-info1": "Reguliere kauwgom is gemaakt van synthetisch polyisobutyleen plastic.",
            "log-chew-hard": "Kauwgom is nog hard. Synthetische elastomeren weigeren mee te geven.",
            "log-chew-stretching": "Polymeerketens warmen op. Textuur wordt kleverig.",
            "log-chew-ready": "Kauwgom perfect elastisch! Synthetisch rubber is volledig warm gedraaid.",
            "log-spit-launched": "Kauwgom afgeschoten! Berekenen parabolische baan...",
            "log-spit-landed": "SPLAT! De plastic kauwgom ligt op de bosgrond.",
            "log-s-step1": "STAP 2: Neem een SeedChew wildbloemen gum en start met kauwen.",
            "log-s-info1": "SeedChew is gemaakt van 100% biologisch afbreekbaar sap van de Chicleboom.",
            "log-pledge-gateway": "Verbinden met beveiligde betalingsgateway...",
            "log-pledge-success": "Pledge met succes verwerkt! Je bent officieel lid van de circulaire wildbloemen revolutie.",
            "seed-card-hdr": "Kies je Bloemzaad",
            "seed-daisy": "Kamille",
            "seed-violet": "Viooltje",
            "seed-poppy": "Klaproos",
            "nurture-water-lbl": "Water:",
            "nurture-sun-lbl": "Zon:",
            "cert-name-lbl": "Naam op certificaat:",
            "stamps-lbl": "Klik om een stempel te zetten:",
            "log-bird-warning": "Er is een vogel geland! Klik op de vogel in het scherm om hem te redden!",
            "log-bird-saved": "Flap flap! Je hebt de vogel verjaagd. Hij is veilig weggevlogen!",
            "log-bird-choked": "De vogel heeft de plastic kauwgom opgegeten... Hij krijgt maagverstopping."
        },
        en: {
            // General & Start Screen
            "tagline": "CHEW • SPIT • BLOOM & GROW",
            "start-card-title": "Chew, Spit, and Sprout!",
            "start-card-p1": "Did you know that regular chewing gum is made of <strong>synthetic plastics and rubber polymers</strong> (the same plastics used in car tires)? Globally, we discard 100,000 tons of gum every year, leading to microplastics and deadly hazards for birds.",
            "start-card-p2": "<strong>SeedChew</strong> changes this completely. Our chewing gum is 100% biodegradable, made from natural chicle tree sap, and filled with <strong>native wildflower seeds</strong>. Spit it out in nature and watch it transform into a floral paradise instead of plastic pollution!",
            "preview-val-1": "25 Years",
            "preview-lbl-1": "Regular gum decomposition",
            "preview-val-2": "30 Days",
            "preview-lbl-2": "SeedChew Bloom Time",
            "preview-val-3": "100%",
            "preview-lbl-3": "Bee- & Insect-Friendly",
            "btn-start": "START SIMULATION",
            
            // Simulation lab & stats
            "stat-pollution-lbl": "Soil Pollution:",
            "stat-flowers-lbl": "Flowers Grown:",
            "instructions-hdr": "SIMULATION LAB INSTRUCTIONS",
            "terminal-hdr": "SYSTEM LOGS",
            "plastic-litter-txt": "PLASTIC POLLUTION",
            
            // Chew Controls
            "chew-card-hdr": "Chew-o-meter",
            "chew-bar-l1": "Hard",
            "chew-bar-l2": "CHEW EVENLY",
            "chew-bar-l3": "Super Elastic!",
            "chew-metrics-lbl": "Chew Status:",
            "btn-chew": "CLICK RAPIDLY TO CHEW",
            
            // Chew status levels
            "chew-status-not": "Not chewed yet",
            "chew-status-hard": "Hard and tough...",
            "chew-status-stretching": "Plastic polymers stretching...",
            "chew-status-stretching-sc": "Organic chicle sap heating up...",
            "chew-status-ready": "Ready to spit!",

            // Spit Controls
            "spit-card-hdr": "Spit Activator",
            "spit-card-desc": "As soon as the gum has the right texture, you can spit it onto the grass.",
            "btn-spit": "SPIT OUT IN NATURE!",
            
            // Timelapse Controls
            "timelapse-hdr": "TIME-LAPSE TIME TRAVEL",
            "btn-next-stage": "GO TO SEEDCHEW CHALLENGE",
            
            // Instructions Details - Traditional
            "instruction-t-stepA-title": "Step A: Get chewing!",
            "instruction-t-stepA-p1": "Click repeatedly on the <strong>CHEW button</strong> to make the gum texture elastic and soft.",
            "instruction-t-stepA-p2": "Chew until the meter reaches 100% to prepare the gum for spitting.",
            "instruction-t-stepB-title": "Step B: Spit it out.",
            "instruction-t-stepB-p1": "The plastic gum is chewed. Click the <span class='text-error font-bold'>'SPIT OUT IN NATURE!'</span> button to deposit it on the lawn.",
            "instruction-t-stepB-p2": "Unfortunately, gum often ends up on roadsides or in fields.",
            "instruction-t-stepC-title": "Step C: Speed up time.",
            "instruction-t-stepC-p1": "The plastic gum lies on the forest floor. Slide the **Time slider** from 0 to 25 years to see how quickly this plastic degrades.",
            "instruction-t-stepC-p2": "Watch out for birds and soil pollution!",

            // Instructions Details - SeedChew
            "instruction-s-stepA-title": "Step A: Enjoy chewing!",
            "instruction-s-stepA-p1": "Click on the <strong>CHEW button</strong>. The gum tastes like organic mint and contains natural vitamins and native seeds.",
            "instruction-s-stepA-p2": "No plastics or rubbers present.",
            "instruction-s-stepB-title": "Step B: Spit it out.",
            "instruction-s-stepB-p1": "Finished chewing? Click <span class='text-success font-bold'>'SPIT OUT IN NATURE!'</span> to plant the organic seeds in the soil.",
            "instruction-s-stepB-p2": "100% safe for birds and micro-organisms!",
            "instruction-s-stepC-title": "Step C: Speed up time.",
            "instruction-s-stepC-p1": "The chicle gum lies in the mud. Slide the **Time slider** from 0 to 30 days to see how nature decomposes the organic chicle sap and brings it to bloom.",
            "instruction-s-stepC-p2": "Provide water and sunlight!",

            // Timeline narratives - Traditional
            "narrative-t-0": "Drag the slider to fast-forward the clock and study the chemical degradation.",
            "narrative-t-low": "Year ${years}: The gum retains its bright color. A hungry bird lands and mistakes the pink gum for a juicy berry or worm!",
            "narrative-t-med": "Year ${years}: The elastomer dries out and turns dirty grey under the influence of UV radiation. The gum crumbles into tiny pieces of plastic litter.",
            "narrative-t-high": "Year ${years}: The gum has broken down into countless microscopic microplastics. They penetrate the topsoil layer and suffocate micro-organisms.",
            "narrative-t-end": "Year 25+: After a quarter of a century, the base is still not biodegraded. The microplastics seep through to the groundwater. This plastic never truly decays!",

            // Timeline narratives - SeedChew
            "narrative-s-0": "Drag the slider to fast-forward the clock and simulate composting and growth.",
            "narrative-s-low": "Day ${days}: Light rain showers hydrate the sap base. The chicle chewing gum dissolves naturally, nourishing the surrounding soil with organic matter.",
            "narrative-s-med": "Day ${days}: The chicle shell is 90% dissolved in the soil. A beautiful green seedling sprouts from the wildflower seeds embedded in the gum!",
            "narrative-s-high": "Day ${days}: The tree sap compost has been fully absorbed as fertilizer. The stem grows rapidly upwards, forming deep roots and leaves thanks to the rich soil.",
            "narrative-s-end": "Day ${days}: ICING ON THE CAKE! The native wild chamomile blooms in full! Two honeybees arrive immediately to gather precious nectar. Biodiversity +1!",

            // Results & Table
            "results-hdr": "SIMULATION REPORT",
            "results-tagline": "RESULTS OF THE GUM COMPARISON",
            "table-hdr": "TRADITIONAL VS. SEEDCHEW",
            "t-criteria": "Criteria",
            "t-traditional": "Traditional",
            "t-seedchew": "SeedChew",
            "tc-basis": "Ingredient base",
            "tc-basis-trad": "Synthetic Plastic (Polymer)",
            "tc-basis-sc": "100% Natural Chicle tree sap",
            "tc-time": "Full decomposition time",
            "tc-time-trad": "> 25 Years (microplastics)",
            "tc-time-sc": "3 to 4 Weeks (compost)",
            "tc-pollution": "Soil pollution",
            "tc-pollution-trad": "100% toxic accumulation",
            "tc-pollution-sc": "0% (Enriches the soil)",
            "tc-fauna": "Fauna impact",
            "tc-fauna-trad": "Fatal (bird stomach blockage)",
            "tc-fauna-sc": "Safe (native seeds are edible)",
            "tc-impact": "Ecological impact",
            "tc-impact-trad": "Littering & Plastic mountain",
            "tc-impact-sc": "Wildflower growth / Bee food",
            "chart-title": "Decomposition Comparison (in days)",
            "chart-val-trad": "9125 days",
            "chart-val-sc": "30 days",
            
            // Pledge
            "pledge-badge": "CROWDFUNDING CAMPAIGN",
            "pledge-hdr": "Plant flowers with your support",
            "pledge-intro": "SeedChew solves the gum pollution problem and turns cities into green ecosystems. We need your backing to purchase organic chicle tree sap in bulk and adapt machinery for seed injection.",
            "cert-title": "OFFICIAL CROWDFUND CERTIFICATE",
            "cert-text": "Certified Wildflower Sower",
            "cert-seal": "100% BIODEGRADABLE",
            "slider-lbl": "Choose your Pledge amount:",
            "pledge-target": "target",
            "btn-back-now": "BACK SEEDCHEW NOW",
            "btn-replay": "PLAY AGAIN",

            // Ranks & Tiers
            "rank-seedbomber": "SEEDBOMBER",
            "rank-sprout": "SPROUT BACKER",
            "rank-patron": "FLOWER PATRON",
            "rank-builder": "FOREST BUILDER",
            "tier-digital": "TIER 1: DIGITAL THANK YOU",
            "tier-starter": "TIER 2: STARTER PACK",
            "tier-variety": "TIER 3: VARIETY PACK & SEEDBOX",
            "tier-ecosystem": "TIER 4: ECOSYSTEM PARTNER",
            "desc-digital": "Receive exclusive digital SeedChew wallpapers, a unique backer badge on Discord, and our eternal gratitude for sowing wildflowers!",
            "desc-starter": "You receive 3 packs of SeedChew (Mint, Strawberry, and Wildflower) in 100% compostable parchment paper and a set of organic Sprout stickers!",
            "desc-variety": "Receive 10 packs of SeedChew, a beautiful reusable wooden storage tin, and a pocket guide featuring native wildflowers you can sow and grow!",
            "desc-ecosystem": "Receive a year's supply of SeedChew (50 packs), a personalized wooden seed box, and we will plant 50m² of wildflower meadow for honeybees in your name!",

            // System logs
            "log-init": "Nature simulator initialized. Welcome researcher.",
            "log-t-step1": "STEP 1: Take a traditional pink chewing gum and start chewing.",
            "log-t-info1": "Regular gum is made from synthetic polyisobutylene plastic.",
            "log-chew-hard": "Chewing gum is still hard. Synthetic elastomers refuse to give.",
            "log-chew-stretching": "Polymer chains are warming up. Texture is becoming sticky.",
            "log-chew-ready": "Chewing gum perfectly elastic! Synthetic rubber is fully warmed up.",
            "log-spit-launched": "Chewing gum launched! Calculating parabolic trajectory...",
            "log-spit-landed": "SPLAT! The plastic chewing gum lies on the forest floor.",
            "log-s-step1": "STEP 2: Take a SeedChew wildflower gum and start chewing.",
            "log-s-info1": "SeedChew is made from 100% biodegradable Chicle tree sap.",
            "log-pledge-gateway": "Connecting to secure payment gateway...",
            "log-pledge-success": "Pledge successfully processed! You are officially part of the circular wildflower revolution.",
            "seed-card-hdr": "Choose your Wildflower",
            "seed-daisy": "Chamomile",
            "seed-violet": "Violet",
            "seed-poppy": "Poppy",
            "nurture-water-lbl": "Water:",
            "nurture-sun-lbl": "Sun:",
            "cert-name-lbl": "Name on Certificate:",
            "stamps-lbl": "Click to place a stamp:",
            "log-bird-warning": "A bird has landed! Click the bird on screen to save it!",
            "log-bird-saved": "Flap flap! You scared the bird away. It flew to safety!",
            "log-bird-choked": "The bird swallowed the plastic gum... It suffers stomach blockage."
        },
        fr: {
            // General & Start Screen
            "tagline": "MÂCHE • CRACHE • FLEURIS & GRANDIS",
            "start-card-title": "Chew, Spit, and Sprout!",
            "start-card-p1": "Saviez-vous que le chewing-gum ordinaire est composé de <strong>plastiques synthétiques et de polymères de caoutchouc</strong> (les mêmes plastiques que les pneus de voiture) ? Globalement, nous jetons 100 000 tonnes de gum par an, ce qui engendre des microplastiques et des risques mortels pour les oiseaux.",
            "start-card-p2": "<strong>SeedChew</strong> change cela complètement. Notre chewing-gum est 100% biodégradable, fabriqué à partir de sève de chicle naturelle et rempli de <strong>graines de fleurs sauvages indigènes</strong>. Crachez-le dans la nature et voyez-le se transformer en un paradis floral au lieu d'une pollution plastique !",
            "preview-val-1": "25 Ans",
            "preview-lbl-1": "Décomposition du gum ordinaire",
            "preview-val-2": "30 Jours",
            "preview-lbl-2": "Floraison de SeedChew",
            "preview-val-3": "100%",
            "preview-lbl-3": "Ami des abeilles et insectes",
            "btn-start": "LANCER LA SIMULATION",
            
            // Simulation lab & stats
            "stat-pollution-lbl": "Pollution du sol:",
            "stat-flowers-lbl": "Fleurs cultivées:",
            "instructions-hdr": "INSTRUCTIONS DU LAB DE SIMULATION",
            "terminal-hdr": "JOURNAL DU SYSTÈME",
            "plastic-litter-txt": "POLLUTION PLASTIQUE",
            
            // Chew Controls
            "chew-card-hdr": "Mâchomètre",
            "chew-bar-l1": "Dur",
            "chew-bar-l2": "MÂCHER RÉGULIÈREMENT",
            "chew-bar-l3": "Super élastique !",
            "chew-metrics-lbl": "Statut de mâche:",
            "btn-chew": "CLIQUER VITE POUR MÂCHER",
            
            // Chew status levels
            "chew-status-not": "Pas encore mâché",
            "chew-status-hard": "Dur et coriace...",
            "chew-status-stretching": "Les polymères s'étirent...",
            "chew-status-stretching-sc": "La sève de chicle chauffe...",
            "chew-status-ready": "Prêt à être craché !",

            // Spit Controls
            "spit-card-hdr": "Crachateur actif",
            "spit-card-desc": "Dès que le chewing-gum a la bonne texture, vous pouvez le cracher sur la pelouse.",
            "btn-spit": "CRACHER DANS LA NATURE !",
            
            // Timelapse Controls
            "timelapse-hdr": "VOYAGE DANS LE TEMPS ACCÉLÉRÉ",
            "btn-next-stage": "PASSER AU DÉFI SEEDCHEW",
            
            // Instructions Details - Traditional
            "instruction-t-stepA-title": "Étape A : À vos mâchoires !",
            "instruction-t-stepA-p1": "Cliquez à plusieurs reprises sur le <strong>bouton MÂCHER</strong> pour rendre la texture du chewing-gum élastique et douce.",
            "instruction-t-stepA-p2": "Mâchez jusqu'à ce que la jauge atteigne 100% pour que le chewing-gum soit prêt à être craché.",
            "instruction-t-stepB-title": "Étape B : Crachez-le.",
            "instruction-t-stepB-p1": "Le chewing-gum plastique est mâché. Cliquez sur le bouton <span class='text-error font-bold'>'CRACHER DANS LA NATURE !'</span> pour le déposer sur la pelouse.",
            "instruction-t-stepB-p2": "Malheureusement, le chewing-gum finit souvent au bord des routes ou dans les champs.",
            "instruction-t-stepC-title": "Étape C : Accélérez le temps.",
            "instruction-t-stepC-p1": "Le chewing-gum plastique repose sur le sol forestier. Faites glisser le **curseur de temps** de 0 à 25 ans pour voir à quelle vitesse ce plastique se dégrade.",
            "instruction-t-stepC-p2": "Attention aux oiseaux et à la pollution du sol !",

            // Instructions Details - SeedChew
            "instruction-s-stepA-title": "Étape A : Bon mâchage !",
            "instruction-s-stepA-p1": "Cliquez sur le <strong>bouton MÂCHER</strong>. Le chewing-gum a un goût de menthe biologique et contient des vitamines naturelles et des graines indigènes.",
            "instruction-s-stepA-p2": "Aucun plastique ni caoutchouc présent.",
            "instruction-s-stepB-title": "Étape B : Crachez-le.",
            "instruction-s-stepB-p1": "Mâche terminée ? Cliquez sur <span class='text-success font-bold'>'CRACHER DANS LA NATURE !'</span> pour planter les graines biologiques dans le sol.",
            "instruction-s-stepB-p2": "100% sûr pour les oiseaux et les micro-organismes !",
            "instruction-s-stepC-title": "Étape C : Accélérez le temps.",
            "instruction-s-stepC-p1": "Le chewing-gum de chicle repose dans la boue. Faites glisser le **curseur de temps** de 0 à 30 jours pour voir comment la nature décompose la sève de chicle biologique et la fait fleurir.",
            "instruction-s-stepC-p2": "Assurez l'eau et la lumière du soleil !",

            // Timeline narratives - Traditional
            "narrative-t-0": "Faites glisser le curseur pour avancer l'horloge et étudier la dégradation chimique.",
            "narrative-t-low": "An ${years}: Le chewing-gum conserve sa couleur vive. Un oiseau affamé atterrit et prend le chewing-gum rose pour une baie juteuse ou un ver !",
            "narrative-t-med": "An ${years}: L'élastomère se dessèche et devient gris sale sous l'effet du rayonnement UV. Le chewing-gum s'effrite en petits morceaux de déchets plastiques.",
            "narrative-t-high": "An ${years}: Le chewing-gum s'est désintégré en d'innombrables microplastiques microscopiques. Ils pénètrent dans la couche arable et étouffent les micro-organismes.",
            "narrative-t-end": "An 25+: Après un quart de siècle, la base n'est toujours pas biodégradée. Les microplastiques s'infiltrent dans les nappes phréatiques. Ce plastique ne disparaît jamais vraiment !",

            // Timeline narratives - SeedChew
            "narrative-s-0": "Faites glisser le curseur pour avancer l'horloge et simuler le compostage et la croissance.",
            "narrative-s-low": "Jour ${days}: De légères averses hydratent la base de sève. Le chewing-gum de chicle se dissout naturellement, nourrissant le sol environnant de matières organiques.",
            "narrative-s-med": "Jour ${days}: La coque de chicle est dissoute à 90 % dans le sol. Une magnifique jeune pousse germe à partir des graines de fleurs sauvages contenues dans le gum !",
            "narrative-s-high": "Jour ${days}: Le compost de sève est entièrement absorbé comme engrais. La tige grandit rapidement, formant des racines profondes et des feuilles grâce au sol riche.",
            "narrative-s-end": "Jour ${days}: CERISE SUR LE GÂTEAU ! La camomille sauvage indigène fleurit pleinement ! Deux abeilles arrivent immédiatement pour récolter le précieux nectar. Biodiversité +1 !",

            // Results & Table
            "results-hdr": "RAPPORT DE SIMULATION",
            "results-tagline": "RÉSULTATS DE LA COMPARAISON DES GUMS",
            "table-hdr": "TRADITIONNEL VS. SEEDCHEW",
            "t-criteria": "Critères",
            "t-traditional": "Traditionnel",
            "t-seedchew": "SeedChew",
            "tc-basis": "Matière première",
            "tc-basis-trad": "Plastique synthétique (Polymère)",
            "tc-basis-sc": "100% sève de Chicle naturelle",
            "tc-time": "Temps de décomposition",
            "tc-time-trad": "> 25 Ans (microplastiques)",
            "tc-time-sc": "3 à 4 Semaines (compost)",
            "tc-pollution": "Pollution du sol",
            "tc-pollution-trad": "100% d'accumulation toxique",
            "tc-pollution-sc": "0% (Enrichit le sol)",
            "tc-fauna": "Impact sur la faune",
            "tc-fauna-trad": "Mortel (blocage d'estomac d'oiseau)",
            "tc-fauna-sc": "Sûr (les graines indigènes sont comestibles)",
            "tc-impact": "Impact écologique",
            "tc-impact-trad": "Déchets et montagne plastique",
            "tc-impact-sc": "Fleurs sauvages / Nourriture d'abeille",
            "chart-title": "Temps de décomposition (en jours)",
            "chart-val-trad": "9125 jours",
            "chart-val-sc": "30 jours",
            
            // Pledge
            "pledge-badge": "CAMPAGNE DE FINANCEMENT PARTICIPATIF",
            "pledge-hdr": "Plantez des fleurs avec votre soutien",
            "pledge-intro": "SeedChew résout le problème de pollution des chewing-gums et transforme les villes en écosystèmes verts. Nous avons besoin de votre soutien pour acheter de la sève de chicle biologique en vrac et adapter les machines pour l'injection des graines.",
            "cert-title": "CERTIFICAT OFFICIEL DE SOUTIEN",
            "cert-text": "Semeur de fleurs sauvages certifié",
            "cert-seal": "100% BIODÉGRADABLE",
            "slider-lbl": "Choisissez le montant de votre don:",
            "pledge-target": "cible",
            "btn-back-now": "SOUTENIR SEEDCHEW MAINTENANT",
            "btn-replay": "REJOUER",

            // Ranks & Tiers
            "rank-seedbomber": "SEMEUR DE GRAINES",
            "rank-sprout": "SOUTIEN DE POUSSE",
            "rank-patron": "MÉCÈNE DES FLEURS",
            "rank-builder": "BÂTISSEUR DE FORÊTS",
            "tier-digital": "TIER 1 : REMERCIEMENT NUMÉRIQUE",
            "tier-starter": "TIER 2 : PACK DE DÉPART",
            "tier-variety": "TIER 3 : PACK VARIÉTÉ & BOÎTE À GRAINES",
            "tier-ecosystem": "TIER 4 : PARTENAIRE DE L'ÉCOSYSTÈME",
            "desc-digital": "Recevez des fonds d'écran numériques exclusifs SeedChew, un badge de soutien unique sur Discord, et notre gratitude éternelle pour avoir semé des fleurs sauvages !",
            "desc-starter": "Vous recevez 3 paquets de SeedChew (Menthe, Fraise et Fleurs Sauvages) dans du papier sulfurisé 100% compostable et un ensemble d'autocollants bio Sprout !",
            "desc-variety": "Recevez 10 paquets de SeedChew, une jolie boîte de rangement en bois réutilisable et un guide de poche présentant les fleurs sauvages indigènes à semer et à faire pousser !",
            "desc-ecosystem": "Recevez un an de SeedChew (50 paquets), une boîte à graines en bois personnalisée, et nous planterons en votre nom 50m² de prairie de fleurs sauvages pour les abeilles !",

            // System logs
            "log-init": "Simulateur de nature initialisé. Bienvenue, chercheur.",
            "log-t-step1": "ÉTAPE 1 : Prenez un chewing-gum rose traditionnel et commencez à mâcher.",
            "log-t-info1": "Le chewing-gum ordinaire est fait de plastique polyisobutylène synthétique.",
            "log-chew-hard": "Le chewing-gum est encore dur. Les élastomères synthétiques refusent de céder.",
            "log-chew-stretching": "Les chaînes de polymères se réchauffent. La texture devient collante.",
            "log-chew-ready": "Chewing-gum parfaitement élastique ! Le caoutchouc synthétique est totalement prêt.",
            "log-spit-launched": "Chewing-gum lancé ! Calcul de la trajectoire parabolique...",
            "log-spit-landed": "SPLAT ! Le chewing-gum plastique repose sur le sol de la forêt.",
            "log-s-step1": "ÉTAPE 2 : Prenez un chewing-gum de fleurs sauvages SeedChew et commencez à mâcher.",
            "log-s-info1": "SeedChew est fait à 100% de sève de Chicle biodégradable.",
            "log-pledge-gateway": "Connexion à la passerelle de paiement sécurisée...",
            "log-pledge-success": "Don traité avec succès ! Vous faites officiellement partie de la révolution circulaire des fleurs sauvages.",
            "seed-card-hdr": "Choisissez votre fleur",
            "seed-daisy": "Camomille",
            "seed-violet": "Violette",
            "seed-poppy": "Coquelicot",
            "nurture-water-lbl": "Eau:",
            "nurture-sun-lbl": "Soleil:",
            "cert-name-lbl": "Nom sur le certificat:",
            "stamps-lbl": "Cliquez pour tamponner:",
            "log-bird-warning": "Un oiseau a atterri ! Cliquez sur l'oiseau pour le sauver !",
            "log-bird-saved": "Flap flap ! Vous avez effrayé l'oiseau. Il s'est envolé en sécurité !",
            "log-bird-choked": "L'oiseau a avalé le gum plastique... Il s'étouffe."
        }
    };

    // ==========================================================================
    // STATE & GAME VARIABLES
    // ==========================================================================
    let currentLanguage = 'nl';
    let currentStage = 'traditional'; // 'traditional' or 'seedchew'
    
    // Stats for final comparison
    let traditionalPollution = 100;
    let traditionalDecompTime = '25+ jaar';
    let traditionalBioImpact = 'Negatief (Vogelverstopping)';
    
    let seedchewPollution = 0;
    let seedchewDecompTime = '30 dagen';
    let seedchewBioImpact = 'Positief (Bijenvoeding)';

    // Game variables - Stage 1 (Traditional) & Stage 2 (SeedChew)
    let chewProgress = 0;
    let isChewed = false;
    let isSpit = false;
    let flowersCount = 0;
    let microplasticsCount = 0;

    // Projectile Bezier points
    const pStart = { x: 30, y: 180 };
    const pControl = { x: 120, y: 40 }; // Apex peak of spit
    const pEnd = { x: 200, y: 236 };   // Lands on grass wad

    // ==========================================================================
    // DOM ELEMENTS SELECTORS
    // ==========================================================================
    // Screens
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');

    // Buttons
    const btnStartChallenge = document.getElementById('btn-start-challenge');
    const btnChewAction = document.getElementById('btn-chew-action');
    const btnSpitAction = document.getElementById('btn-spit-action');
    const btnNextStage = document.getElementById('btn-next-stage');
    const btnBackProject = document.getElementById('btn-back-project');
    const btnRestartGame = document.getElementById('btn-restart-game');

    // Headers & Badges
    const stageBadge = document.getElementById('stage-badge');
    const stageTitle = document.getElementById('stage-title');
    const statPollution = document.getElementById('stat-pollution');
    const statFlowers = document.getElementById('stat-flowers');
    
    const instructionStep = document.getElementById('instruction-step');
    const terminalLogs = document.getElementById('terminal-logs');

    // Interactive SVG Overlays
    const weatherOverlay = document.getElementById('weather-overlay');
    const impactFlashOverlay = document.getElementById('impact-flash-overlay');
    const svgGumProjectile = document.getElementById('svg-gum-projectile');
    const svgGumColor = document.getElementById('svg-gum-color');
    const gumWad = document.getElementById('gum-wad');
    const soilPollutionLayer = document.getElementById('soil-pollution-layer');
    const traditionalPollutionUnderground = document.getElementById('traditional-pollution-underground');
    
    // SVGs Animals
    const svgBird = document.getElementById('svg-bird');
    const svgBees = document.getElementById('svg-bees');

    // SVG SeedChew plant stages
    const plantSprout = document.getElementById('plant-sprout');
    const plantLeaves = document.getElementById('plant-leaves');
    const plantFlower = document.getElementById('plant-flower');

    // Controls
    const chewCard = document.getElementById('chew-card');
    const spitCard = document.getElementById('spit-card');
    const chewGaugeFill = document.getElementById('chew-gauge-fill');
    const valChewStatus = document.getElementById('val-chew-status');
    
    const timeLapseControls = document.getElementById('time-lapse-controls');
    const timeLapseRange = document.getElementById('time-lapse-range');
    const valTimeLapse = document.getElementById('val-time-lapse');
    const timeLapseTicks = document.getElementById('time-lapse-ticks');
    const timeLapseNarrative = document.getElementById('time-lapse-narrative');

    // State 3 (Results) Controls
    const pledgeRange = document.getElementById('pledge-range');
    const certAmountDisplay = document.getElementById('cert-amount-display');
    const sliderValDisplay = document.getElementById('slider-val-display');
    const certRankDisplay = document.getElementById('cert-rank-display');
    const rewardTitle = document.getElementById('reward-title');
    const rewardDesc = document.getElementById('reward-desc');
    const campaignProgressFill = document.getElementById('campaign-progress-fill');
    const backerCertificate = document.getElementById('backer-certificate');

    // ==========================================================================
    // SYSTEM LOGGER UTILITY
    // ==========================================================================
    function log(messageKey, type = 'system') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        
        let prefix = '> ';
        if (type === 'error') prefix = '✕ [GEVAAR] ';
        if (type === 'warning') prefix = '⚠ [WARN] ';
        if (type === 'success') prefix = '✓ [INFO] ';
        if (type === 'info') prefix = 'ℹ [SYSTEM] ';

        // Lookup translation or fallback to raw key
        const message = (translations[currentLanguage] && translations[currentLanguage][messageKey])
            ? translations[currentLanguage][messageKey]
            : messageKey;

        entry.textContent = `${prefix}${message}`;
        terminalLogs.appendChild(entry);
        
        terminalLogs.scrollTop = terminalLogs.scrollHeight;
    }

    // ==========================================================================
    // LANGUAGE SWITCHER ENGINE
    // ==========================================================================
    function setLanguage(lang) {
        currentLanguage = lang;
        
        // Update language selector active classes
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Set language attribute on document
        document.documentElement.setAttribute('lang', lang);
        
        // Scan elements and translate text contents
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                const text = translations[lang][key];
                // Use innerHTML for text with strong, span, or special formatting
                if (key.includes('p1') || key.includes('p2') || key.includes('intro') || key.includes('btn') || key.includes('desc') || key.includes('title')) {
                    el.innerHTML = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        // Translate the current game stage headers
        if (currentStage === 'traditional') {
            stageBadge.textContent = currentLanguage === 'nl' ? 'FASE 1' : (currentLanguage === 'fr' ? 'PHASE 1' : 'STAGE 1');
            stageTitle.textContent = translations[currentLanguage]['t-traditional'];
        } else {
            stageBadge.textContent = currentLanguage === 'nl' ? 'FASE 2' : (currentLanguage === 'fr' ? 'PHASE 2' : 'STAGE 2');
            stageTitle.textContent = translations[currentLanguage]['t-seedchew'] + " (Circulair)";
        }

        // Re-render instructions, status displays, narratives, and certificates
        updateChewStatusText();
        updateTimelapseTicks();
        updateTimelapseNarrative();
        updatePledgeRewards();
    }

    // Bind language selector buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // ==========================================================================
    // INSTRUCTIONS & LAB STATUS UPDATES
    // ==========================================================================
    function updateChewStatusText() {
        if (!isChewed) {
            if (chewProgress === 0) {
                valChewStatus.textContent = translations[currentLanguage]['chew-status-not'];
            } else if (chewProgress < 40) {
                valChewStatus.textContent = translations[currentLanguage]['chew-status-hard'];
            } else {
                valChewStatus.textContent = (currentStage === 'traditional') 
                    ? translations[currentLanguage]['chew-status-stretching']
                    : translations[currentLanguage]['chew-status-stretching-sc'];
            }
        } else {
            valChewStatus.textContent = translations[currentLanguage]['chew-status-ready'];
        }
    }

    function updateTimelapseTicks() {
        if (currentStage === 'traditional') {
            timeLapseTicks.innerHTML = `<span>${currentLanguage === 'fr' ? 'An' : (currentLanguage === 'en' ? 'Year' : 'Jaar')} 0</span>
                                        <span>${currentLanguage === 'fr' ? 'An' : (currentLanguage === 'en' ? 'Year' : 'Jaar')} 8</span>
                                        <span>${currentLanguage === 'fr' ? 'An' : (currentLanguage === 'en' ? 'Year' : 'Jaar')} 16</span>
                                        <span>${currentLanguage === 'fr' ? 'An' : (currentLanguage === 'en' ? 'Year' : 'Jaar')} 25 (Litter)</span>`;
        } else {
            timeLapseTicks.innerHTML = `<span>${currentLanguage === 'fr' ? 'Jour' : (currentLanguage === 'en' ? 'Day' : 'Dag')} 0</span>
                                        <span>${currentLanguage === 'fr' ? 'Jour' : (currentLanguage === 'en' ? 'Day' : 'Dag')} 10</span>
                                        <span>${currentLanguage === 'fr' ? 'Jour' : (currentLanguage === 'en' ? 'Day' : 'Dag')} 20</span>
                                        <span>${currentLanguage === 'fr' ? 'Jour' : (currentLanguage === 'en' ? 'Day' : 'Dag')} 30 (Bloei)</span>`;
        }
    }

    function updateTimelapseNarrative() {
        const val = parseInt(timeLapseRange.value);
        if (currentStage === 'traditional') {
            if (val === 0) {
                timeLapseNarrative.textContent = translations[currentLanguage]['narrative-t-0'];
            } else if (val > 0 && val <= 4) {
                timeLapseNarrative.textContent = translations[currentLanguage]['narrative-t-low'].replace('${years}', val);
            } else if (val > 4 && val <= 12) {
                timeLapseNarrative.textContent = translations[currentLanguage]['narrative-t-med'].replace('${years}', val);
            } else if (val > 12 && val <= 24) {
                timeLapseNarrative.textContent = translations[currentLanguage]['narrative-t-high'].replace('${years}', val);
            } else {
                timeLapseNarrative.textContent = translations[currentLanguage]['narrative-t-end'];
            }
            valTimeLapse.textContent = `${val} ` + (currentLanguage === 'nl' ? 'Jaar' : (currentLanguage === 'fr' ? 'Ans' : 'Years'));
        } else {
            if (val === 0) {
                timeLapseNarrative.textContent = translations[currentLanguage]['narrative-s-0'];
            } else if (val > 0 && val <= 7) {
                timeLapseNarrative.textContent = translations[currentLanguage]['narrative-s-low'].replace('${days}', val);
            } else if (val > 7 && val <= 14) {
                timeLapseNarrative.textContent = translations[currentLanguage]['narrative-s-med'].replace('${days}', val);
            } else if (val > 14 && val <= 24) {
                timeLapseNarrative.textContent = translations[currentLanguage]['narrative-s-high'].replace('${days}', val);
            } else {
                timeLapseNarrative.textContent = translations[currentLanguage]['narrative-s-end'].replace('${days}', val);
            }
            valTimeLapse.textContent = `${val} ` + (currentLanguage === 'nl' ? 'Dagen' : (currentLanguage === 'fr' ? 'Jours' : 'Days'));
        }
    }

    function updateTraditionalInstructions() {
        let descHtml = '';
        if (!isChewed) {
            descHtml = `<p><strong>${translations[currentLanguage]['instruction-t-stepA-title']}</strong></p>
                        <p>${translations[currentLanguage]['instruction-t-stepA-p1']}</p>
                        <p class="text-warning">${translations[currentLanguage]['instruction-t-stepA-p2']}</p>`;
        } else if (!isSpit) {
            descHtml = `<p><strong>${translations[currentLanguage]['instruction-t-stepB-title']}</strong></p>
                        <p>${translations[currentLanguage]['instruction-t-stepB-p1']}</p>
                        <p class="text-muted">${translations[currentLanguage]['instruction-t-stepB-p2']}</p>`;
        } else {
            descHtml = `<p><strong>${translations[currentLanguage]['instruction-t-stepC-title']}</strong></p>
                        <p>${translations[currentLanguage]['instruction-t-stepC-p1']}</p>
                        <p class="text-error font-bold">${translations[currentLanguage]['instruction-t-stepC-p2']}</p>`;
        }
        instructionStep.innerHTML = descHtml;
    }

    function updateSeedchewInstructions() {
        let descHtml = '';
        if (!isChewed) {
            descHtml = `<p><strong>${translations[currentLanguage]['instruction-s-stepA-title']}</strong></p>
                        <p>${translations[currentLanguage]['instruction-s-stepA-p1']}</p>
                        <p class="text-success">${translations[currentLanguage]['instruction-s-stepA-p2']}</p>`;
        } else if (!isSpit) {
            descHtml = `<p><strong>${translations[currentLanguage]['instruction-s-stepB-title']}</strong></p>
                        <p>${translations[currentLanguage]['instruction-s-stepB-p1']}</p>
                        <p class="text-success font-bold">${translations[currentLanguage]['instruction-s-stepB-p2']}</p>`;
        } else {
            descHtml = `<p><strong>${translations[currentLanguage]['instruction-s-stepC-title']}</strong></p>
                        <p>${translations[currentLanguage]['instruction-s-stepC-p1']}</p>
                        <p class="text-success font-bold">${translations[currentLanguage]['instruction-s-stepC-p2']}</p>`;
        }
        instructionStep.innerHTML = descHtml;
    }

    // ==========================================================================
    // SCREEN STATE ROUTER
    // ==========================================================================
    function showScreen(screen) {
        [startScreen, gameScreen, resultScreen].forEach(s => {
            s.classList.remove('active');
            s.style.display = 'none';
        });

        screen.style.display = 'block';
        setTimeout(() => {
            screen.classList.add('active');
        }, 50);
    }

    // Start Screen Button Trigger
    btnStartChallenge.addEventListener('click', () => {
        initTraditionalStage();
        showScreen(gameScreen);
    });

    // ==========================================================================
    // STAGE 1: TRADITIONAL GUM LOGIC (THE POLLUTER)
    // ==========================================================================
    function initTraditionalStage() {
        currentStage = 'traditional';
        chewProgress = 0;
        isChewed = false;
        isSpit = false;
        microplasticsCount = 0;
        birdClicked = false;
        
        // Reset SVG items visibility
        svgGumProjectile.setAttribute('opacity', '0');
        svgGumColor.setAttribute('fill', '#ec4899'); // Pink
        gumWad.setAttribute('opacity', '0');
        soilPollutionLayer.innerHTML = '';
        traditionalPollutionUnderground.setAttribute('opacity', '0');
        svgBird.setAttribute('opacity', '0');
        svgBird.setAttribute('transform', 'translate(-50, 80)');
        
        // Reset slingshot aim
        disableSlingshotAiming();
        botanicalGroup.setAttribute('transform', 'translate(200, 240)');
        
        // Hide seed card
        const seedCard = document.getElementById('seed-card');
        if (seedCard) {
            seedCard.style.display = 'none';
            seedCard.classList.add('card-disabled');
        }
        
        // Reset certificate personalization & stamps
        const stampsLayer = document.getElementById('cert-stamps-layer');
        if (stampsLayer) stampsLayer.innerHTML = '';
        const nameDisplay = document.getElementById('cert-backer-name-display');
        if (nameDisplay) nameDisplay.textContent = 'Belal J.';
        const nameInput = document.getElementById('cert-name-input');
        if (nameInput) nameInput.value = 'Belal J.';
        
        // Plant resets
        plantSprout.setAttribute('opacity', '0');
        plantLeaves.setAttribute('opacity', '0');
        plantFlower.setAttribute('opacity', '0');
        svgBees.setAttribute('opacity', '0');
        
        // Header resets
        stageBadge.textContent = currentLanguage === 'nl' ? 'FASE 1' : (currentLanguage === 'fr' ? 'PHASE 1' : 'STAGE 1');
        stageBadge.className = 'badge badge-traditional';
        stageTitle.textContent = translations[currentLanguage]['t-traditional'];
        statPollution.textContent = '0%';
        statPollution.className = 'stat-value text-error';
        statFlowers.textContent = '0';
        
        // Cards resets
        chewCard.classList.remove('card-disabled');
        btnChewAction.disabled = false;
        spitCard.classList.add('card-disabled');
        btnSpitAction.disabled = true;
        timeLapseControls.style.display = 'none';
        btnNextStage.style.display = 'none';
        
        chewGaugeFill.style.width = '0%';
        updateChewStatusText();
        
        // Configure time-lapse slider for years
        timeLapseRange.min = '0';
        timeLapseRange.max = '25';
        timeLapseRange.value = '0';
        valTimeLapse.textContent = `0 ${currentLanguage === 'nl' ? 'Jaar' : (currentLanguage === 'fr' ? 'Ans' : 'Years')}`;
        
        updateTimelapseTicks();
        updateTraditionalInstructions();
        
        log('log-t-step1', 'success');
        log('log-t-info1', 'system');
    }

    // Chewing mechanics
    btnChewAction.addEventListener('click', () => {
        if (isChewed) return;
        
        chewProgress = Math.min(100, chewProgress + 15);
        chewGaugeFill.style.width = `${chewProgress}%`;
        
        // Play chew sound
        playSound('chew');
        
        // Shake interaction stage slightly for chewing vibration
        document.getElementById('garden-svg-container').classList.add('shake-device');
        setTimeout(() => {
            document.getElementById('garden-svg-container').classList.remove('shake-device');
        }, 150);

        updateChewStatusText();

        if (chewProgress < 40) {
            log('log-chew-hard', 'system');
        } else if (chewProgress < 80) {
            log('log-chew-stretching', 'system');
        } else if (chewProgress >= 100) {
            isChewed = true;
            updateChewStatusText();
            btnChewAction.disabled = true;
            chewCard.classList.add('card-disabled');
            
            // Unlock Seed Card if seedchew stage
            if (currentStage === 'seedchew') {
                const seedCard = document.getElementById('seed-card');
                if (seedCard) seedCard.classList.remove('card-disabled');
            }
            
            // Unlock Spit Card
            spitCard.classList.remove('card-disabled');
            btnSpitAction.disabled = false;
            
            // Enable slingshot aiming!
            initSlingshotAiming();
            
            log('log-chew-ready', 'success');
            if (currentStage === 'traditional') {
                updateTraditionalInstructions();
            } else {
                updateSeedchewInstructions();
            }
        }
    });

    // Spit Projectile Trajectory Animation (Parabolic path calculation)
    btnSpitAction.addEventListener('click', () => {
        if (isSpit) return;
        customEnd = { x: 200, y: 236 };
        customControl = { x: 115, y: 108 };
        disableSlingshotAiming();
        spitGumAlongCustomPath();
    });

    // Traditional time lapse slider listener
    timeLapseRange.addEventListener('input', () => {
        const val = parseInt(timeLapseRange.value);
        updateTimelapseNarrative();

        if (currentStage === 'traditional') {
            // Dynamic time degradation stages
            if (val === 0) {
                svgGumColor.setAttribute('fill', '#ec4899'); // fresh pink
                svgBird.setAttribute('opacity', '0');
                svgBird.setAttribute('transform', 'translate(-50, 80)');
                traditionalPollutionUnderground.setAttribute('opacity', '0');
                statPollution.textContent = '0%';
                soilPollutionLayer.innerHTML = '';
                birdClicked = false;
            } 
            else if (val > 0 && val <= 4) {
                svgGumColor.setAttribute('fill', '#db2777'); // slightly darker pink
                if (!birdClicked) {
                    svgBird.setAttribute('opacity', '1');
                    svgBird.setAttribute('transform', 'translate(100, 160)'); // Bird slides near the gum
                    log('log-bird-warning', 'warning');
                } else {
                    svgBird.setAttribute('opacity', '0.3');
                    svgBird.setAttribute('transform', 'translate(450, 40) rotate(-15)');
                }
                traditionalPollutionUnderground.setAttribute('opacity', '0');
                statPollution.textContent = '5%';
            } 
            else {
                // val > 4
                if (!birdClicked) {
                    // Missed it
                    svgBird.setAttribute('opacity', '0');
                    svgBird.setAttribute('transform', 'translate(450, 80)');
                    log('log-bird-choked', 'error');
                } else {
                    svgBird.setAttribute('opacity', '0');
                }
                
                if (val > 4 && val <= 12) {
                    svgGumColor.setAttribute('fill', '#94a3b8'); // turning dusty grey
                    traditionalPollutionUnderground.setAttribute('opacity', '0.5');
                    statPollution.textContent = '40%';
                    renderMicroplastics(12);
                } 
                else if (val > 12 && val <= 24) {
                    svgGumColor.setAttribute('fill', '#475569'); // dark grey slate
                    traditionalPollutionUnderground.setAttribute('opacity', '1');
                    statPollution.textContent = '80%';
                    renderMicroplastics(30);
                } 
                else if (val >= 25) {
                    svgGumColor.setAttribute('fill', '#1e293b'); // almost black coal
                    statPollution.textContent = '100%';
                    renderMicroplastics(50);
                    btnNextStage.style.display = 'block';
                }
            }
        }
    });

    function renderMicroplastics(count) {
        if (microplasticsCount === count) return;
        microplasticsCount = count;
        
        soilPollutionLayer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            // Distribute randomly in soil coordinate range (y: 245 to 300, x: 20 to 380)
            const rx = Math.floor(Math.random() * 360) + 20;
            const ry = Math.floor(Math.random() * 55) + 245;
            circle.setAttribute('cx', rx);
            circle.setAttribute('cy', ry);
            circle.setAttribute('r', '2');
            circle.setAttribute('fill', '#ec4899'); // Pink microplastics highlight
            circle.setAttribute('opacity', '0.75');
            soilPollutionLayer.appendChild(circle);
        }
    }

    // Transition to Stage 2 (SeedChew)
    btnNextStage.addEventListener('click', () => {
        initSeedchewStage();
    });

    // ==========================================================================
    // STAGE 2: SEEDCHEW LOGIC (THE GERMINATOR)
    // ==========================================================================
    function initSeedchewStage() {
        currentStage = 'seedchew';
        chewProgress = 0;
        isChewed = false;
        isSpit = false;
        
        // Reset SVG items visibility
        svgGumProjectile.setAttribute('opacity', '0');
        svgGumColor.setAttribute('fill', '#ec4899'); // Pink (strawberry natural gum chicle)
        gumWad.setAttribute('opacity', '0');
        soilPollutionLayer.innerHTML = '';
        traditionalPollutionUnderground.setAttribute('opacity', '0');
        svgBird.setAttribute('opacity', '0');
        weatherOverlay.className = 'weather-overlay'; // remove raining
        
        // Slingshot resets
        disableSlingshotAiming();
        botanicalGroup.setAttribute('transform', 'translate(200, 240)');
        
        // Configure Seed selector
        const seedCard = document.getElementById('seed-card');
        if (seedCard) {
            seedCard.style.display = 'block';
            seedCard.classList.add('card-disabled');
            document.querySelectorAll('.seed-option-btn').forEach(b => b.classList.remove('active'));
            const defaultSeed = document.querySelector('[data-seed="daisy"]');
            if (defaultSeed) defaultSeed.classList.add('active');
            selectedSeed = 'daisy';
            updateFlowerVarietyColors();
        }
        
        // Plant resets
        plantSprout.setAttribute('opacity', '0');
        plantLeaves.setAttribute('opacity', '0');
        plantFlower.setAttribute('opacity', '0');
        svgBees.setAttribute('opacity', '0');
        
        // Header resets
        stageBadge.textContent = currentLanguage === 'nl' ? 'FASE 2' : (currentLanguage === 'fr' ? 'PHASE 2' : 'STAGE 2');
        stageBadge.className = 'badge badge-volt';
        stageTitle.textContent = translations[currentLanguage]['t-seedchew'] + " (Circulair)";
        statPollution.textContent = '0%';
        statPollution.className = 'stat-value text-success';
        
        // Cards resets
        chewCard.classList.remove('card-disabled');
        btnChewAction.disabled = false;
        spitCard.classList.add('card-disabled');
        btnSpitAction.disabled = true;
        timeLapseControls.style.display = 'none';
        btnNextStage.style.display = 'none';
        
        chewGaugeFill.style.width = '0%';
        updateChewStatusText();
        
        // Configure time-lapse slider for Days
        timeLapseRange.min = '0';
        timeLapseRange.max = '30';
        timeLapseRange.value = '0';
        valTimeLapse.textContent = `0 ${currentLanguage === 'nl' ? 'Dagen' : (currentLanguage === 'fr' ? 'Jours' : 'Days')}`;
        
        updateTimelapseTicks();
        updateSeedchewInstructions();
        
        log('log-s-step1', 'success');
        log('log-s-info1', 'system');
    }

    // ==========================================================================
    // STAGE 3: RESULTS SCREEN & CROWDFUNDING SIMULATOR
    // ==========================================================================
    function initResultsScreen() {
        showScreen(resultScreen);
        startConfettiEffect();
        updatePledgeRewards();
    }

    // PLEDGE CALCULATOR LOGIC
    pledgeRange.addEventListener('input', () => {
        updatePledgeRewards();
    });

    function updatePledgeRewards() {
        const pledge = parseInt(pledgeRange.value);
        certAmountDisplay.textContent = `€ ${pledge}`;
        sliderValDisplay.textContent = `€${pledge}`;
        
        let rank = '';
        let title = '';
        let desc = '';
        let progressPercent = 92 + (pledge / 1000); 

        if (pledge < 15) {
            rank = translations[currentLanguage]['rank-seedbomber'];
            title = translations[currentLanguage]['tier-digital'];
            desc = translations[currentLanguage]['desc-digital'];
        } else if (pledge >= 15 && pledge < 50) {
            rank = translations[currentLanguage]['rank-sprout'];
            title = translations[currentLanguage]['tier-starter'];
            desc = translations[currentLanguage]['desc-starter'];
        } else if (pledge >= 50 && pledge < 150) {
            rank = translations[currentLanguage]['rank-patron'];
            title = translations[currentLanguage]['tier-variety'];
            desc = translations[currentLanguage]['desc-variety'];
        } else {
            rank = translations[currentLanguage]['rank-builder'];
            title = translations[currentLanguage]['tier-ecosystem'];
            desc = translations[currentLanguage]['desc-ecosystem'];
        }

        // Apply UI updates
        certRankDisplay.textContent = rank;
        rewardTitle.textContent = title;
        rewardDesc.textContent = desc;
        campaignProgressFill.style.width = `${Math.min(100, progressPercent)}%`;
        
        // Adjust badge glowing border color according to levels
        if (pledge < 15) {
            backerCertificate.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            certRankDisplay.style.color = '#cbd5e1';
        } else if (pledge >= 15 && pledge < 50) {
            backerCertificate.style.borderColor = 'rgba(34, 197, 94, 0.35)';
            certRankDisplay.style.color = '#22c55e';
        } else if (pledge >= 50 && pledge < 150) {
            backerCertificate.style.borderColor = 'rgba(245, 158, 11, 0.4)';
            certRankDisplay.style.color = '#f59e0b';
        } else {
            backerCertificate.style.borderColor = 'rgba(236, 72, 153, 0.5)';
            certRankDisplay.style.color = '#ec4899'; // Blossom pink
        }
    }

    // Restart game button
    btnRestartGame.addEventListener('click', () => {
        initTraditionalStage();
    });

    // Real Campaign redirection simulated pop
    btnBackProject.addEventListener('click', () => {
        log('log-pledge-gateway', 'info');
        btnBackProject.disabled = true;
        
        setTimeout(() => {
            const alertMsg = currentLanguage === 'nl' 
                ? `Bedankt Belal! Je hebt met succes een backing van €${pledgeRange.value} geplaatst voor SeedChew!\n\nDit project toont de kracht aan van een prachtig en duurzaam biodegradatie-concept voor de mini-eindproef Weboriëntatie.`
                : (currentLanguage === 'fr'
                    ? `Merci Belal ! Vous avez simulé avec succès un don de ${pledgeRange.value} € pour SeedChew !\n\nCe projet démontre la puissance d'un concept de biodégradation magnifique et durable pour la mini-épreuve finale de Weboriëntatie.`
                    : `Thank you Belal! You have successfully simulated a backing of €${pledgeRange.value} for SeedChew!\n\nThis project demonstrates the power of a beautiful and sustainable biodegradation concept for the Weboriëntatie mini-final exam.`);

            alert(alertMsg);
            btnBackProject.disabled = false;
            log('log-pledge-success', 'success');
        }, 1000);
    });

    // ==========================================================================
    // VANILLA HIGH-PERFORMANCE CONFETTI PHYSICS ENGINE
    // ==========================================================================
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let confettiActive = false;
    let particles = [];
    
    // Vibrant blossom and grass theme colors
    const colors = [
        '#10b981', // emerald green
        '#22c55e', // grass green
        '#ec4899', // cherry blossom pink
        '#fbbf24', // golden yellow
        '#eab308'  // sun yellow
    ];

    function startConfettiEffect() {
        canvas.style.display = 'block';
        resizeConfettiCanvas();
        confettiActive = true;
        particles = [];
        
        for (let i = 0; i < 150; i++) {
            particles.push(createParticle());
        }
        
        window.addEventListener('resize', resizeConfettiCanvas);
        requestAnimationFrame(updateConfettiPhysics);
        
        setTimeout(() => {
            confettiActive = false;
            setTimeout(() => {
                canvas.style.display = 'none';
                window.removeEventListener('resize', resizeConfettiCanvas);
            }, 1000);
        }, 4500);
    }

    function resizeConfettiCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * -100 - 20,
            size: Math.random() * 8 + 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 5 + 3,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 8 - 4
        };
    }

    function updateConfettiPhysics() {
        if (!confettiActive && particles.length === 0) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 1.5);
            ctx.restore();

            if (p.y > canvas.height) {
                if (confettiActive) {
                    particles[index] = createParticle();
                } else {
                    particles.splice(index, 1);
                }
            }
        });

        if (confettiActive || particles.length > 0) {
            requestAnimationFrame(updateConfettiPhysics);
        }
    }

    // ==========================================================================
    // INITIALIZATION RUNTIME
    // ==========================================================================
    // ==========================================================================
    // SOUND EFFECTS SYNTHESIZER (WEB AUDIO API)
    // ==========================================================================
    let soundEnabled = true;
    const soundBtn = document.getElementById('sound-btn');
    
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                soundBtn.classList.add('active');
            } else {
                soundBtn.classList.remove('active');
            }
        });
    }

    function playSound(type) {
        if (!soundEnabled) return;
        
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            
            if (type === 'chew') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(80, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.1);
                
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.12);
            } 
            else if (type === 'spit') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(160, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.22);
                
                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.22);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.22);
            } 
            else if (type === 'splat') {
                const bufferSize = ctx.sampleRate * 0.12;
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }
                
                const noise = ctx.createBufferSource();
                noise.buffer = buffer;
                
                const filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(350, ctx.currentTime);
                
                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.18, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
                
                noise.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                
                noise.start();
                noise.stop(ctx.currentTime + 0.12);
            }
            else if (type === 'chirp') {
                const now = ctx.currentTime;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, now);
                osc.frequency.exponentialRampToValueAtTime(1400, now + 0.07);
                osc.frequency.setValueAtTime(880, now + 0.08);
                osc.frequency.exponentialRampToValueAtTime(1600, now + 0.18);
                
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.linearRampToValueAtTime(0.06, now + 0.12);
                gain.gain.linearRampToValueAtTime(0.005, now + 0.18);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start();
                osc.stop(now + 0.18);
            }
            else if (type === 'water') {
                const now = ctx.currentTime;
                for (let i = 0; i < 3; i++) {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    const delay = i * 0.06;
                    
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(250 + i * 160, now + delay);
                    osc.frequency.exponentialRampToValueAtTime(650 + i * 200, now + delay + 0.09);
                    
                    gain.gain.setValueAtTime(0.04, now + delay);
                    gain.gain.linearRampToValueAtTime(0.001, now + delay + 0.1);
                    
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    
                    osc.start(now + delay);
                    osc.stop(now + delay + 0.1);
                }
            }
            else if (type === 'sun') {
                const now = ctx.currentTime;
                const osc1 = ctx.createOscillator();
                const osc2 = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc1.type = 'triangle';
                osc2.type = 'sine';
                
                osc1.frequency.setValueAtTime(280, now);
                osc1.frequency.linearRampToValueAtTime(420, now + 0.35);
                
                osc2.frequency.setValueAtTime(283, now);
                osc2.frequency.linearRampToValueAtTime(423, now + 0.35);
                
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.35);
                
                osc1.connect(gain);
                osc2.connect(gain);
                gain.connect(ctx.destination);
                
                osc1.start();
                osc2.start();
                osc1.stop(now + 0.35);
                osc2.stop(now + 0.35);
            }
            else if (type === 'bloom') {
                const now = ctx.currentTime;
                const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
                
                notes.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    const start = now + idx * 0.08;
                    
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, start);
                    
                    gain.gain.setValueAtTime(0.06, start);
                    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
                    
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    
                    osc.start(start);
                    osc.stop(start + 0.3);
                });
            }
            else if (type === 'stamp') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(100, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.1);
                
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.1);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start();
                osc.stop(ctx.currentTime + 0.1);
            }
        } catch (e) {
            console.error("Audio Context initialization failed", e);
        }
    }

    // ==========================================================================
    // SLINGSHOT AIM DRAG & RELEASE LOGIC
    // ==========================================================================
    const slingshotGroup = document.getElementById('svg-slingshot-group');
    const svgTrajectory = document.getElementById('svg-trajectory');
    const svgAimTarget = document.getElementById('svg-aim-target');
    const gardenSvg = document.getElementById('garden-svg');
    const botanicalGroup = document.getElementById('interactive-botanical-group');

    function initSlingshotAiming() {
        if (!slingshotGroup) return;
        slingshotGroup.style.opacity = '1';
        slingshotGroup.style.pointerEvents = 'auto';
        slingshotGroup.setAttribute('cursor', 'grab');
    }
    
    function disableSlingshotAiming() {
        if (!slingshotGroup) return;
        slingshotGroup.style.opacity = '0';
        slingshotGroup.style.pointerEvents = 'none';
    }

    let isDragging = false;
    let dragStartCoords = { x: 0, y: 0 };
    let dragOffset = { x: 0, y: 0 };
    let customEnd = { x: 200, y: 236 };
    let customControl = { x: 120, y: 40 };

    if (slingshotGroup && gardenSvg) {
        slingshotGroup.addEventListener('pointerdown', (e) => {
            if (!isChewed || isSpit) return;
            isDragging = true;
            slingshotGroup.setPointerCapture(e.pointerId);
            dragStartCoords = { x: e.clientX, y: e.clientY };
            dragOffset = { x: 0, y: 0 };
            
            svgTrajectory.setAttribute('opacity', '0.75');
            svgAimTarget.setAttribute('opacity', '0.85');
            
            playSound('chew');
            
            document.body.style.cursor = 'grabbing';
            e.preventDefault();
        });

        slingshotGroup.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            
            const dx = e.clientX - dragStartCoords.x;
            const dy = e.clientY - dragStartCoords.y;
            
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxPull = 55;
            
            if (dist > maxPull) {
                dragOffset.x = (dx / dist) * maxPull;
                dragOffset.y = (dy / dist) * maxPull;
            } else {
                dragOffset.x = dx;
                dragOffset.y = dy;
            }
            
            slingshotGroup.setAttribute('transform', `translate(${30 + dragOffset.x}, ${180 + dragOffset.y})`);
            
            const shotX = -dragOffset.x;
            const shotY = -dragOffset.y;
            
            let targetX = 200 + (shotX * 3.2);
            targetX = Math.max(90, Math.min(370, targetX));
            
            customEnd.x = targetX;
            customEnd.y = 236;
            
            const pullMag = Math.sqrt(dragOffset.x * dragOffset.x + dragOffset.y * dragOffset.y);
            customControl.x = (30 + targetX) / 2;
            customControl.y = Math.max(20, 180 - (pullMag * 2.5));
            
            svgTrajectory.setAttribute('d', `M 30 180 Q ${customControl.x} ${customControl.y} ${customEnd.x} 236`);
            svgAimTarget.setAttribute('cx', customEnd.x);
            svgAimTarget.setAttribute('cy', 236);
            
            e.preventDefault();
        });

        const handlePointerUp = (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            document.body.style.cursor = 'default';
            
            svgTrajectory.setAttribute('opacity', '0');
            svgAimTarget.setAttribute('opacity', '0');
            
            let snapX = dragOffset.x;
            let snapY = dragOffset.y;
            const snapSpeed = 0.25;
            
            function snapBack() {
                snapX -= snapX * snapSpeed;
                snapY -= snapY * snapSpeed;
                
                if (Math.abs(snapX) < 0.5 && Math.abs(snapY) < 0.5) {
                    slingshotGroup.setAttribute('transform', 'translate(30, 180)');
                    disableSlingshotAiming();
                    spitGumAlongCustomPath();
                } else {
                    slingshotGroup.setAttribute('transform', `translate(${30 + snapX}, ${180 + snapY})`);
                    requestAnimationFrame(snapBack);
                }
            }
            
            snapBack();
        };

        slingshotGroup.addEventListener('pointerup', handlePointerUp);
        slingshotGroup.addEventListener('pointercancel', handlePointerUp);
    }

    function spitGumAlongCustomPath() {
        if (isSpit) return;
        isSpit = true;
        
        btnSpitAction.disabled = true;
        spitCard.classList.add('card-disabled');
        
        const seedCard = document.getElementById('seed-card');
        if (seedCard) seedCard.classList.add('card-disabled');
        
        log('log-spit-launched', 'info');
        playSound('spit');

        svgGumProjectile.setAttribute('opacity', '1');
        
        let t = 0;
        const animationSpeed = 0.035;
        
        botanicalGroup.setAttribute('transform', `translate(${customEnd.x}, 240)`);
        
        function animateSpit() {
            t += animationSpeed;
            if (t > 1) t = 1;
            
            const x = Math.pow(1 - t, 2) * pStart.x + 2 * (1 - t) * t * customControl.x + Math.pow(t, 2) * customEnd.x;
            const y = Math.pow(1 - t, 2) * pStart.y + 2 * (1 - t) * t * customControl.y + Math.pow(t, 2) * customEnd.y;
            
            svgGumProjectile.setAttribute('cx', x);
            svgGumProjectile.setAttribute('cy', y);
            
            if (t < 1) {
                requestAnimationFrame(animateSpit);
            } else {
                svgGumProjectile.setAttribute('opacity', '0');
                gumWad.setAttribute('opacity', '1');
                
                playSound('splat');
                impactFlashOverlay.classList.add('flash-active');
                setTimeout(() => {
                    impactFlashOverlay.classList.remove('flash-active');
                }, 150);
                
                log('log-spit-landed', 'warning');
                
                timeLapseControls.style.display = 'block';
                
                if (currentStage === 'traditional') {
                    document.getElementById('time-lapse-slider-wrapper').style.display = 'block';
                    document.getElementById('nurture-controls-wrapper').style.display = 'none';
                    updateTraditionalInstructions();
                } else {
                    document.getElementById('time-lapse-slider-wrapper').style.display = 'none';
                    document.getElementById('nurture-controls-wrapper').style.display = 'flex';
                    initNurturingState();
                    updateSeedchewInstructions();
                }
            }
        }
        
        requestAnimationFrame(animateSpit);
    }

    // ==========================================================================
    // INTERACTIVE NURTURE LOGIC (WATER / SUN SEQUENCING)
    // ==========================================================================
    let waterCount = 0;
    let sunCount = 0;
    let nurtureDay = 0;
    let nurtureStep = 0;

    function initNurturingState() {
        waterCount = 0;
        sunCount = 0;
        nurtureDay = 0;
        nurtureStep = 0;
        
        document.getElementById('nurture-water-val').textContent = `0/3`;
        document.getElementById('nurture-sun-val').textContent = `0/3`;
        valTimeLapse.textContent = `0 ${currentLanguage === 'nl' ? 'Dagen' : (currentLanguage === 'fr' ? 'Jours' : 'Days')}`;
        
        updateNurtureNarrative();
        
        document.getElementById('btn-nurture-water').disabled = false;
        document.getElementById('btn-nurture-sun').disabled = true;
    }

    document.getElementById('btn-nurture-water').addEventListener('click', () => {
        if (nurtureStep % 2 !== 0) return;
        
        waterCount++;
        nurtureStep++;
        nurtureDay += 5;
        
        playSound('water');
        document.getElementById('nurture-water-val').textContent = `${waterCount}/3`;
        valTimeLapse.textContent = `${nurtureDay} ` + (currentLanguage === 'nl' ? 'Dagen' : (currentLanguage === 'fr' ? 'Jours' : 'Days'));
        
        weatherOverlay.className = 'weather-overlay raining';
        
        updateNurtureVisuals(nurtureDay);
        updateNurtureNarrative();
        
        document.getElementById('btn-nurture-water').disabled = true;
        document.getElementById('btn-nurture-sun').disabled = false;
        
        if (currentStage === 'seedchew') {
            updateSeedchewInstructions();
        }
    });

    document.getElementById('btn-nurture-sun').addEventListener('click', () => {
        if (nurtureStep % 2 !== 1) return;
        
        sunCount++;
        nurtureStep++;
        nurtureDay += 5;
        
        playSound('sun');
        document.getElementById('nurture-sun-val').textContent = `${sunCount}/3`;
        valTimeLapse.textContent = `${nurtureDay} ` + (currentLanguage === 'nl' ? 'Dagen' : (currentLanguage === 'fr' ? 'Jours' : 'Days'));
        
        weatherOverlay.className = 'weather-overlay';
        
        const sunCircle = document.querySelector('circle[cx="340"]');
        if (sunCircle) {
            sunCircle.classList.add('sun-glow');
            setTimeout(() => sunCircle.classList.remove('sun-glow'), 1500);
        }
        
        updateNurtureVisuals(nurtureDay);
        updateNurtureNarrative();
        
        if (nurtureDay < 30) {
            document.getElementById('btn-nurture-water').disabled = false;
            document.getElementById('btn-nurture-sun').disabled = true;
        } else {
            document.getElementById('btn-nurture-water').disabled = true;
            document.getElementById('btn-nurture-sun').disabled = true;
            
            flowersCount = 1;
            statFlowers.textContent = `${flowersCount}`;
            
            playSound('bloom');
            setTimeout(() => {
                initResultsScreen();
            }, 3000);
        }
        
        if (currentStage === 'seedchew') {
            updateSeedchewInstructions();
        }
    });

    function updateNurtureVisuals(day) {
        if (day === 5) {
            gumWad.setAttribute('opacity', '0.7');
            svgGumColor.setAttribute('fill', '#f472b6');
            
            plantSprout.setAttribute('opacity', '0');
            plantLeaves.setAttribute('opacity', '0');
            plantFlower.setAttribute('opacity', '0');
            svgBees.setAttribute('opacity', '0');
        }
        else if (day === 10) {
            gumWad.setAttribute('opacity', '0.4');
            
            plantSprout.setAttribute('opacity', '1');
            plantLeaves.setAttribute('opacity', '0');
            plantFlower.setAttribute('opacity', '0');
            svgBees.setAttribute('opacity', '0');
        }
        else if (day === 15) {
            gumWad.setAttribute('opacity', '0.2');
            
            plantSprout.setAttribute('opacity', '1');
            plantLeaves.setAttribute('opacity', '0');
            plantFlower.setAttribute('opacity', '0');
            svgBees.setAttribute('opacity', '0');
        }
        else if (day === 20) {
            gumWad.setAttribute('opacity', '0');
            
            plantSprout.setAttribute('opacity', '0');
            plantLeaves.setAttribute('opacity', '1');
            plantFlower.setAttribute('opacity', '0');
            svgBees.setAttribute('opacity', '0');
        }
        else if (day === 25) {
            plantSprout.setAttribute('opacity', '0');
            plantLeaves.setAttribute('opacity', '1');
            plantFlower.setAttribute('opacity', '0');
            svgBees.setAttribute('opacity', '0');
        }
        else if (day === 30) {
            plantSprout.setAttribute('opacity', '0');
            plantLeaves.setAttribute('opacity', '0');
            plantFlower.setAttribute('opacity', '1');
            svgBees.setAttribute('opacity', '1');
        }
    }

    function updateNurtureNarrative() {
        let text = '';
        if (currentLanguage === 'nl') {
            if (nurtureStep === 0) text = "💧 De aarde is droog. Klik op 'GIET WATER' om de gum te hydrateren.";
            else if (nurtureStep === 1) text = "☀️ Goed! Klik op 'LAAT ZON SCHIJNEN' om de ontkieming te starten.";
            else if (nurtureStep === 2) text = "💧 Een klein kiemplantje verschijnt! Giet water om de wortels te voeden.";
            else if (nurtureStep === 3) text = "☀️ Het kiemplantje groeit. Geef zonlicht om sterke bladeren te vormen.";
            else if (nurtureStep === 4) text = "💧 De bladeren zijn gevormd! Giet nog één keer water voor de bloemknop.";
            else if (nurtureStep === 5) text = "☀️ De knop is klaar! Geef zonlicht om de bloem te laten bloeien!";
            else text = "🌸 Succes! De bloem staat in volle bloei en de bijen zijn gearriveerd!";
        } else if (currentLanguage === 'fr') {
            if (nurtureStep === 0) text = "💧 La terre est sèche. Cliquez sur 'GIET WATER' pour hydrater le gum.";
            else if (nurtureStep === 1) text = "☀️ Super ! Cliquez sur 'LAAT ZON SCHIJNEN' pour lancer la germination.";
            else if (nurtureStep === 2) text = "💧 Une petite pousse apparaît ! Arrosez pour nourrir les racines.";
            else if (nurtureStep === 3) text = "☀️ La pousse grandit. Donnez de la lumière pour former des feuilles.";
            else if (nurtureStep === 4) text = "💧 Les feuilles sont formées ! Arrosez une dernière fois pour le bouton floral.";
            else if (nurtureStep === 5) text = "☀️ Le bouton est prêt ! Donnez du soleil pour faire éclore la fleur !";
            else text = "🌸 Succès ! La fleur est épanouie et les abeilles sont arrivées !";
        } else {
            if (nurtureStep === 0) text = "💧 The soil is dry. Click 'GIET WATER' to hydrate the gum.";
            else if (nurtureStep === 1) text = "☀️ Great! Click 'LAAT ZON SCHIJNEN' to start germination.";
            else if (nurtureStep === 2) text = "💧 A tiny sprout appears! Give it water to feed the roots.";
            else if (nurtureStep === 3) text = "☀️ The sprout is growing. Give it sunlight to form strong leaves.";
            else if (nurtureStep === 4) text = "💧 Leaves are fully formed! Water one last time to prepare the flower bud.";
            else if (nurtureStep === 5) text = "☀️ The bud is ready! Give it sunlight to bloom the wildflower!";
            else text = "🌸 Success! The flower is in full bloom and bees have arrived!";
        }
        timeLapseNarrative.textContent = text;
    }

    // ==========================================================================
    // SEED SELECTION & FLOWER VARIETY
    // ==========================================================================
    let selectedSeed = 'daisy';
    
    document.querySelectorAll('.seed-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.parentElement.parentElement.classList.contains('card-disabled')) return;
            
            document.querySelectorAll('.seed-option-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            selectedSeed = btn.getAttribute('data-seed');
            playSound('chew');
            
            if (currentLanguage === 'nl') {
                log("Zaad geselecteerd: " + btn.title, "success");
            } else if (currentLanguage === 'fr') {
                log("Graine sélectionnée : " + btn.title, "success");
            } else {
                log("Seed selected: " + btn.title, "success");
            }
            
            updateFlowerVarietyColors();
        });
    });

    function updateFlowerVarietyColors() {
        const flowerHead = document.querySelector('.flower-head');
        if (!flowerHead) return;
        
        const petals = flowerHead.querySelectorAll('circle:not([cx="0"][cy="0"])');
        const center = flowerHead.querySelector('circle[cx="0"][cy="0"]');
        
        if (selectedSeed === 'daisy') {
            petals.forEach(p => p.setAttribute('fill', '#ffffff'));
            if (center) center.setAttribute('fill', '#facc15');
        } else if (selectedSeed === 'violet') {
            petals.forEach(p => p.setAttribute('fill', '#818cf8'));
            if (center) center.setAttribute('fill', '#fde047');
        } else if (selectedSeed === 'poppy') {
            petals.forEach(p => p.setAttribute('fill', '#f43f5e'));
            if (center) center.setAttribute('fill', '#111827');
        }
    }

    // ==========================================================================
    // SCARE BIRD INTERACTION
    // ==========================================================================
    let birdClicked = false;
    
    if (svgBird) {
        svgBird.style.cursor = 'pointer';
        svgBird.addEventListener('click', () => {
            if (currentStage === 'traditional' && !birdClicked) {
                birdClicked = true;
                playSound('chirp');
                
                svgBird.setAttribute('transform', 'translate(450, 40) rotate(-15)');
                log('log-bird-saved', 'success');
                
                timeLapseNarrative.textContent = currentLanguage === 'nl' 
                    ? "Geweldig! Je hebt de vogel op tijd weggejaagd. Hij slikt de plastic kauwgom niet in!" 
                    : (currentLanguage === 'fr'
                        ? "Super ! Vous avez fait fuir l'oiseau. Il n'avalera pas le gum !"
                        : "Great job! You scared the bird away. It won't swallow the plastic!");
            }
        });
    }

    // ==========================================================================
    // CERTIFICATE PERSONALIZATION & STAMPS
    // ==========================================================================
    const certNameInput = document.getElementById('cert-name-input');
    const certNameDisplay = document.getElementById('cert-backer-name-display');
    
    if (certNameInput && certNameDisplay) {
        certNameInput.addEventListener('input', () => {
            certNameDisplay.textContent = certNameInput.value || "Anonymous";
        });
    }

    document.querySelectorAll('.stamp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-stamp');
            placeStamp(type);
        });
    });

    function placeStamp(type) {
        const stampsLayer = document.getElementById('cert-stamps-layer');
        if (!stampsLayer) return;
        
        const rotation = Math.floor(Math.random() * 60) - 30;
        const randLeft = Math.floor(Math.random() * 60) + 15;
        const randTop = Math.floor(Math.random() * 50) + 15;
        
        const stamp = document.createElement('div');
        stamp.className = 'placed-stamp';
        stamp.style.left = `${randLeft}%`;
        stamp.style.top = `${randTop}%`;
        stamp.style.setProperty('--rotation', `${rotation}deg`);
        
        if (type === 'sprout') {
            stamp.innerHTML = '🌱';
            stamp.style.color = 'var(--success)';
        } else if (type === 'bee') {
            stamp.innerHTML = '🐝';
            stamp.style.color = 'var(--warning)';
        } else if (type === 'verified') {
            stamp.className = 'placed-stamp stamp-text';
            stamp.innerHTML = '✓ ECO';
            stamp.style.color = 'var(--error)';
        }
        
        stampsLayer.appendChild(stamp);
        playSound('stamp');
        
        if (currentLanguage === 'nl') {
            log("Stempel geplaatst op certificaat!", "success");
        } else if (currentLanguage === 'fr') {
            log("Timbre placé sur le certificat !", "success");
        } else {
            log("Stamp placed on certificate!", "success");
        }
    }

    // Set Dutch as initial default language
    setLanguage('nl');
});
