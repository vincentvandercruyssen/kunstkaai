import os
import re
from pathlib import Path

base_dir = Path('/Users/vincentvandercruyssen/Documents/hugo/kunstkaai/static/verbeteren/4gt/Reservatie')

students = [d for d in base_dir.iterdir() if d.is_dir()]
students.sort(key=lambda x: x.name)

report_lines = []

for student in students:
    s_name = student.name
    
    html_files = list(student.rglob('index.html'))
    has_html = len(html_files) > 0
    html_path = html_files[0] if has_html else None
    html_dir = html_path.parent if has_html else student
    
    is_correct_folder = html_dir.name.endswith('_Reservatie')
    
    has_css = (html_dir / 'style.css').exists()
    has_images_dir = (html_dir / 'images').is_dir()
    
    img_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    all_files = list(student.rglob('*'))
    has_screenshot = any(f.suffix.lower() in img_extensions for f in all_files if f.is_file())
    
    struct_score = 0
    if is_correct_folder: struct_score += 1
    if has_html: struct_score += 1
    if has_css: struct_score += 1
    if has_images_dir: struct_score += 1
    
    html_score = 0
    html_notes = []
    
    if has_html:
        with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
            html_content = f.read().lower()
            
            if re.search(r'<title>[^<]+</title>', html_content):
                html_score += 0.5
            else:
                html_notes.append("Ontbrekende of lege <title>")
                
            if '<main' in html_content:
                html_score += 0.5
            else:
                html_notes.append("Geen <main> element")
                
            if '<h1' in html_content or '<h2' in html_content:
                html_score += 0.5
            else:
                html_notes.append("Geen h-kop")
                
            form_match = re.search(r'<form([^>]*)>', html_content)
            if form_match:
                html_score += 0.5
                attrs = form_match.group(1)
                
                if 'formspree.io' in attrs:
                    html_score += 1
                else:
                    html_notes.append("Action mist formspree URL")
                    
                if 'post' in attrs:
                    html_score += 1
                else:
                    html_notes.append("Method is niet POST")
                
                items = 0
                has_text = 'type="text"' in html_content or "type='text'" in html_content
                has_email = 'type="email"' in html_content or "type='email'" in html_content
                has_date = 'type="date"' in html_content or "type='date'" in html_content
                has_time = 'type="time"' in html_content or "type='time'" in html_content
                has_tel = 'type="tel"' in html_content or "type='tel'" in html_content
                has_textarea = '<textarea' in html_content
                has_submit = 'type="submit"' in html_content or "type='submit'" in html_content or '<button' in html_content
                has_required = 'required' in html_content
                
                if has_text: items += 1
                else: html_notes.append("Geen text input")
                if has_email: items += 1
                else: html_notes.append("Geen email input")
                if has_date: items += 1
                else: html_notes.append("Geen date input")
                if has_time: items += 1
                else: html_notes.append("Geen time input")
                if has_tel: items += 1
                else: html_notes.append("Geen tel input")
                if has_textarea: items += 1
                else: html_notes.append("Geen textarea")
                if has_submit: items += 1
                else: html_notes.append("Geen submit button")
                if has_required: items += 1
                else: html_notes.append("Geen required attributen")
                
                html_score += (items / 8) * 3
            else:
                html_notes.append("Geen <form> element")
    else:
        html_notes.append("Geen index.html")
    
    html_score = round(html_score * 2) / 2
    
    css_basis = 0
    css_form = 0
    css_notes = []
    
    if has_css:
        with open(html_dir / 'style.css', 'r', encoding='utf-8', errors='ignore') as f:
            css = f.read().lower()
            css_clean = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
            css_nospace = css_clean.replace(" ", "").replace("\n", "")
            
            body_match = re.search(r'body{[^}]*}', css_nospace)
            if body_match:
                css_basis += 1
                body_css = body_match.group(0)
                if 'background-color' in body_css or 'background:' in body_css:
                    css_basis += 1
                else:
                    css_notes.append("Geen background-color op body")
                if 'color' in body_css:
                    css_basis += 1
                else:
                    css_notes.append("Geen color op body")
                if 'font-family' in body_css:
                    css_basis += 1
                else:
                    css_notes.append("Geen font-family op body")
            else:
                css_notes.append("Geen body styling")
                
            css_blocks = re.findall(r'([^{]+)\{([^}]+)\}', css_clean)
            
            form_styled = False
            input_styled = False
            button_styled = False
            
            for selector_str, rules in css_blocks:
                selector_str = re.sub(r':[a-z-]+', '', selector_str)
                selectors = [s.strip() for s in selector_str.split(',')]
                for sel in selectors:
                    parts = sel.split()
                    for p in parts:
                        if 'form' in p or p.startswith('.form') or p.startswith('#form') or 'fieldset' in p:
                            form_styled = True
                        if 'input' in p or 'textarea' in p or 'select' in p:
                            input_styled = True
                        if 'button' in p or 'submit' in p or p.startswith('.btn'):
                            button_styled = True
                            
            form_score = 0
            if form_styled: form_score += 1
            else: css_notes.append("form niet aangesproken")
            
            if input_styled: form_score += 1
            else: css_notes.append("input/textarea niet aangesproken")
            
            if button_styled: form_score += 1
            else: css_notes.append("button niet aangesproken")
            
            if any(p in css_nospace for p in ['padding:', 'margin:', 'width:', 'display:']):
                form_score += 1
            else:
                css_notes.append("Geen lay-out CSS")
                
            visuals = sum(1 for p in ['border', 'border-radius', 'box-shadow', 'background'] if p in css_nospace)
            if visuals >= 2:
                form_score += 1
            elif visuals == 1:
                form_score += 0.5
                css_notes.append("Weinig visuele CSS")
            else:
                css_notes.append("Geen visuele CSS")
                
            css_form = min(5, form_score)
            
    else:
        css_notes.append("Geen style.css")
        
    formspree_score = 4 if has_screenshot else 0
    
    first_name = re.sub(r'[A-Z]+$', '', s_name)
    first_name = first_name if first_name else s_name
    
    good = []
    bad = []

    if struct_score < 4:
        bad.append("let op je mapstructuur")

    if html_score >= 6:
        good.append("HTML zit goed in elkaar")
    elif html_score >= 4:
        bad.append("er ontbreken wat elementen in je HTML")
    else:
        bad.append("je HTML structuur kan nog veel beter")

    css_total = css_basis + css_form
    if css_total >= 7:
        good.append("CSS ziet er mooi uit")
    elif css_total >= 4:
        bad.append("je CSS is een goed begin maar kan nog uitgebreid worden")
    else:
        bad.append("je CSS vereist nog heel wat werk")

    if formspree_score == 4:
        good.append("Formspree is succesvol geïntegreerd")
    else:
        bad.append("Formspree werkt nog niet of bewijs (screenshot) ontbreekt")

    if html_notes:
        bad.append("HTML mist: " + ", ".join(html_notes))
    if css_notes:
        bad.append("CSS mist: " + ", ".join(css_notes))

    feedback = f"**Feedback:** Goed gewerkt, {first_name}. "
    if not bad:
        feedback += "Alles ziet er perfect uit! Je hebt alle vereisten mooi geïmplementeerd."
    else:
        if good:
            if len(good) >= 2:
                feedback += f"Je {good[0]} en je {good[1]}. "
            else:
                feedback += f"Je {good[0]}. "
        feedback += "Werkpunten: " + "; ".join(bad) + "."
    
    struct_str = f"**Structuur ({struct_score}/04)**"
    html_str = f"**HTML ({html_score}/07)** " + (", ".join(html_notes) if html_notes else "Correct.")
    css_basis_str = f"**CSS Basis ({css_basis}/04)** " + (", ".join(css_notes) if css_notes else "Goed.")
    css_form_str = f"**CSS Formulier ({css_form}/05)**"
    formspree_str = f"**Formspree ({formspree_score}/04)** {'Screenshot gevonden.' if has_screenshot else 'Geen screenshot.'}"
    
    total = struct_score + html_score + css_basis + css_form + formspree_score
    
    report_lines.append(f"### {s_name}\n")
    report_lines.append(feedback + "\n")
    report_lines.append(f"- {struct_str}")
    report_lines.append(f"- {html_str}")
    report_lines.append(f"- {css_basis_str}")
    report_lines.append(f"- {css_form_str}")
    report_lines.append(f"- {formspree_str}")
    report_lines.append(f"\n**Totaal: {total}/24**\n")

print("\n".join(report_lines))
