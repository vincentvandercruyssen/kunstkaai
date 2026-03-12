import os
import glob
import re

BASE_DIR = "/Users/vincentvandercruyssen/Documents/hugo/kunstkaai/static/verbeteren/4gt/Polaroid"
OUT_FILE = os.path.join(BASE_DIR, "verbeteren-polaroid.md")

students = [d for d in os.listdir(BASE_DIR) if os.path.isdir(os.path.join(BASE_DIR, d))]
students.sort()

rubrics = []

for student in students:
    student_dir = os.path.join(BASE_DIR, student)
    
    html_files = glob.glob(f"{student_dir}/**/index.html", recursive=True)
    css_files = glob.glob(f"{student_dir}/**/style.css", recursive=True)
    
    html_file = html_files[0] if html_files else None
    css_file = css_files[0] if css_files else None
    
    scores = {
        "struct": 0, "html": 0, "css_basis": 0, "css_polaroid": 0, "css_pos": 0, "css_img": 0
    }
    
    feedback = {"good": [], "missed": []}
    
    html_content = ""
    css_content = ""
    
    # 1. Structuur (05)
    struct_score = 0
    if html_file and css_file:
        struct_score += 3
        img_dir1 = os.path.join(os.path.dirname(html_file), "images")
        img_dir2 = os.path.join(os.path.dirname(html_file), "img")
        if os.path.isdir(img_dir1) or os.path.isdir(img_dir2):
            struct_score += 2
            
    scores["struct"] = struct_score
    if struct_score == 5:
        feedback["good"].append("je hebt de mapstructuur inclusief de afbeeldingenmap correct opgezet")
    else:
        feedback["missed"].append("let beter op de gevraagde mapstructuur en bestandsnamen (index.html, style.css, images map)")

    if html_file:
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            html_content = f.read().lower()
            
    if css_file:
        with open(css_file, 'r', encoding='utf-8', errors='ignore') as f:
            css_content = f.read().lower()
            
    # 2. HTML (12)
    html_score = 0
    if html_content:
        if '<html' in html_content: html_score += 1
        if '<title' in html_content: html_score += 1
        if '<link' in html_content and 'stylesheet' in html_content: html_score += 2
        if '<body' in html_content: html_score += 1
        
        polaroids = re.findall(r'<div[^>]*class=["\'][^"\']*polaroid[^"\']*["\']', html_content)
        if len(polaroids) >= 9:
            html_score += 2
        elif len(polaroids) > 0:
            html_score += 1
            
        imgs = re.findall(r'<img', html_content)
        if len(imgs) >= 9:
            html_score += 2
        elif len(imgs) > 0:
            html_score += 1
            
        h3s = re.findall(r'<h[234]', html_content)
        if len(h3s) >= 9:
            html_score += 2
            
        if re.search(r'<div[^>]*id=["\']polaroid', html_content):
            html_score += 1
        
    scores["html"] = html_score
    if html_score >= 10:
        feedback["good"].append("je HTML-code zit stevig en correct in elkaar met alle gevraagde elementen")
    elif html_score >= 6:
        feedback["missed"].append("je HTML-structuur is grotendeels in orde, maar controleer of je wel 9 polaroid-divs met afbeeldingen en koppen hebt")
    else:
        feedback["missed"].append("je HTML-document mist flink wat basiskenmerken en elementen")

    css_normalized = re.sub(r'\\s+', ' ', css_content)
    
    # 3. CSS Basis (5)
    cb_score = 0
    if ('@import' in html_content) or ('fonts.googleapis.com' in html_content) or ('use.typekit.net' in html_content) or ('fonts.adobe.com' in html_content):
        cb_score += 2
    elif '@import' in css_normalized or '@font-face' in css_normalized:
        cb_score += 2
        
    if 'background-image' in css_normalized or 'background: url' in css_normalized: cb_score += 1
    if 'background-size' in css_normalized and 'cover' in css_normalized: cb_score += 1
    if 'font-family' in css_normalized: cb_score += 1
    
    scores["css_basis"] = cb_score
    if cb_score == 5:
        feedback["good"].append("de basis styling met achtergrond en extern lettertype is mooi toegepast")
    else:
        feedback["missed"].append("vergeet niet de achtergrondafbeelding (cover) of je externe font correct in te stellen op de body")

    # 4. CSS Polaroid (7)
    cp_score = 0
    if '.polaroid' in css_normalized:
        if 'position' in css_normalized and 'absolute' in css_normalized: cp_score += 2
        if 'width' in css_normalized: cp_score += 1
        if 'background-color' in css_normalized or 'background:' in css_normalized or 'background :' in css_normalized: cp_score += 1
        if 'padding' in css_normalized: cp_score += 1
        if 'box-shadow' in css_normalized or 'filter: drop-shadow' in css_normalized: cp_score += 1
        if 'text-align' in css_normalized: cp_score += 1
        
    scores["css_polaroid"] = min(cp_score, 7)
    if cp_score >= 6:
        feedback["good"].append("de polaroid-kaders zien er authentiek uit door de juiste padding en positionering")
    else:
        feedback["missed"].append("sommige CSS-eigenschappen voor je .polaroid-klasse ontbreken nog (zoals box-shadow, positionering of width)")
        
    # 5. CSS Positionering (3)
    cpos_score = 0
    id_blocks = re.findall(r'#[a-zA-Z0-9_-]+\s*\{[^}]+\}', css_content)
    if len(id_blocks) >= 2:
        cpos_score += 1
        has_rotate = False
        has_pos = False
        for b in id_blocks:
            if 'rotate' in b or 'transform: rotate' in b or 'transform:rotate' in b: has_rotate = True
            if 'top' in b or 'left' in b or 'right' in b or 'bottom' in b: has_pos = True
        if has_rotate: cpos_score += 1
        if has_pos: cpos_score += 1
        
    scores["css_pos"] = min(cpos_score, 3)
    if cpos_score == 3:
        feedback["good"].append("het positioneren en roteren via id-selectoren geeft een speels resultaat")
    else:
        feedback["missed"].append("je hebt de id-selectoren onvoldoende benut om de kaders individueel te plaatsen en te roteren")
        
    # 6. CSS Afbeeldingen (5)
    ci_score = 0
    img_blocks = re.findall(r'[^\{]*img\s*\{([^}]+)\}', css_content)
    if img_blocks:
        block = " ".join(img_blocks)
        if 'width' in block: ci_score += 1
        if 'aspect-ratio' in block or 'height' in block: ci_score += 2
        if 'object-fit' in block: ci_score += 1
        if 'filter' in block: ci_score += 1
        
    scores["css_img"] = min(ci_score, 5)
    if ci_score >= 4:
        feedback["good"].append("je hebt de foto's netjes bijgesneden met aspect-ratio en object-fit")
    else:
        feedback["missed"].append("de afmetingen van de afbeeldingen (aspect-ratio, width 100%, en object-fit) kunnen nog beter afgesteld worden om ze mooi vierkant in het kader te krijgen")

    total = sum(scores.values())
    
    first_name = re.sub(r'[A-Z]$', '', student)
    if not first_name: first_name = student
    
    good_text = " en ".join(feedback["good"])
    missed_text = " en ".join(feedback["missed"])
    
    txt_parts = [f"Goed gewerkt, {first_name}."]
    if good_text:
        txt_parts.append(good_text.capitalize() + ".")
    if missed_text:
        txt_parts.append(missed_text.capitalize() + ".")
        
    txt = " ".join(txt_parts)
    
    md = f"""### {student}
{txt}

- **Structuur** ({scores['struct']:02d}/05)
- **HTML** ({scores['html']:02d}/12)
- **CSS Basis** ({scores['css_basis']:02d}/05)
- **CSS Polaroid** ({scores['css_polaroid']:02d}/07)
- **CSS Positionering** ({scores['css_pos']:02d}/03)
- **CSS Afbeeldingen** ({scores['css_img']:02d}/05)
**Totaal: {total:02d}/37**
"""
    rubrics.append(md)
    
output_content = "# Verbeteren Polaroid\n\n" + "\n".join(rubrics)

with open(OUT_FILE, "w", encoding="utf-8") as f:
    f.write(output_content)
    
print(f"Done. Graded {len(students)} students.")
