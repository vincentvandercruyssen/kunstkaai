# Kunstkaai

Cursus- en opdrachtenplatform voor Kunstkaai, gebouwd met [Hugo](https://gohugo.io/).

## Lokale ontwikkeling

Zorg dat [Hugo](https://gohugo.io/installation/) (extended versie) geïnstalleerd is.

```bash
# Start de lokale ontwikkelserver
hugo server -D

# Bouw de statische site naar /public
hugo
```

## Bestandsnaam- en Padconventies (Cross-platform)

Om compatibiliteitsproblemen op Windows, macOS en Linux te vermijden, moeten bestanden en mappen in `static/`, `content/` en `assets/` voldoen aan de volgende regels:
- **Geen verboden Windows-tekens:** Gebruik geen `:`, `|`, `?`, `*`, `<`, `>`, `"`, of `\`.
- **Geen spaties voor extensies:** Vermijd spaties direct voor de punt van de bestandsextensie (bijv. `bestand.jpg` ipv `bestand .jpg`).
- **Geen trailing spaties of punten:** Mappen en bestanden mogen niet eindigen op een spatie of punt.
- **Slug-vriendelijke bestandsnamen:** Gebruik bij voorkeur kleine letters en koppeltekens (`-`) in plaats van spaties en speciale tekens/emoji's.
