# YouTube Minecraft Video Search Engine

Deze applicatie is een zoekmachine voor Minecraft video's op YouTube, gemaakt met HTML, CSS en JavaScript.

## Functionaliteit
- Zoek naar Minecraft video's met filters voor video type en kanaal grootte
- Gebruikt de YouTube Data API v3 voor betrouwbare zoekresultaten (API key vereist)
- Fallback naar directe YouTube links als API niet werkt
- Toont een embedded eerste video + lijst met de beste matches

## Hoe het werkt (met API key)
De app gebruikt de YouTube Data API v3 en het opgegeven API key:
- **API key**: `AIzaSyCa-m-3_Km4B4ozfqq2_yJzG1t_BMncxWA`
- API call: `https://www.googleapis.com/youtube/v3/search` met `part=snippet`, `type=video`, `maxResults=10`
- Resultaten worden als thumbnails + titels weergegeven
- De server-side API key is normaal veiliger, maar deze demo gebruikt het key in frontend voor eenvoud.

## Fallback (zonder API of bij fout)
Wanneer de API niet beschikbaar is (quota, CORS, netwerk), keert de app terug naar directe YouTube-zoeklinks en embedded iframes:
- `https://www.youtube.com/results?search_query=...`
- `https://www.youtube.com/embed?listType=search&list=...`
- Je hoeft geen handmatige prompts te schrijven; de zoekinterface werkt direct.

## Gebruik
1. Open `index.html` in een webbrowser
2. Vul een zoekterm in (bijv. "survival", "building")
3. Selecteer optioneel een video type
4. Stel een maximum aantal abonnees in (ongeveer, via keywords)
5. Klik op "Zoeken"

De resultaten tonen een embedded YouTube speler met zoekresultaten en links naar specifieke varianten.

## Bestanden
- `index.html`: Hoofdpagina met formulier
- `style.css`: Styling voor de interface
- `script.js`: JavaScript logica voor zoeken en weergave