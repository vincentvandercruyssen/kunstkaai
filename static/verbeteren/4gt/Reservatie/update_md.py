grades = open('/Users/vincentvandercruyssen/Documents/hugo/kunstkaai/static/verbeteren/4gt/Reservatie/grades.txt').read()

header = """# Verbeteren Reservatie

## Rubrieken

- **Structuur (04)** Correcte bestandsnamen en mapstructuur.
- **HTML (07)** Correct gebruik van elementen en kenmerken, `<title>`, `<main>`, `h`-kop, `<form>`, `action`, `method`, formulier-elementen met specifieke kenmerken. 
- **CSS Basis (04)** Algemene styling, `body`, `background-color`, `color`, `font-family`.
- **CSS Formulier (05)** Styling van het formulier, invoervelden en knop.
- **Formspree (04)** Correcte integratie van Formspree en werkend formulier (via schermafbeelding).
"""

with open('/Users/vincentvandercruyssen/Documents/hugo/kunstkaai/static/verbeteren/4gt/Reservatie/verbeteren_reservatie.md', 'w') as f:
    f.write(header + "\n" + grades)
