import os
import re

base_dir = '/Users/vincentvandercruyssen/Documents/hugo/kunstkaai/static/verbeteren/5xm/Webpresentatie'

def extract_text(html):
    html = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', html, flags=re.IGNORECASE | re.DOTALL)
    text = re.sub(r'<[^>]+>', ' ', html)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

with open('/Users/vincentvandercruyssen/Documents/hugo/kunstkaai/static/verbeteren/5xm/Webpresentatie/eval_content.txt', 'w', encoding='utf-8') as out:
    for student in os.listdir(base_dir):
        student_dir = os.path.join(base_dir, student)
        if not os.path.isdir(student_dir) or student == 'RomaissaDB':
            continue

        out.write(f"\n{'='*50}\nStudent: {student}\n{'='*50}\n")
        
        subfolders = [d for d in os.listdir(student_dir) if os.path.isdir(os.path.join(student_dir, d))]
        w_dir = student_dir
        if subfolders:
            w_dir = os.path.join(student_dir, subfolders[0])
            
        html_texts = []
        js_codes = []
            
        for root, dirs, files in os.walk(w_dir):
            for f in files:
                if f.endswith('.html'):
                    try:
                        with open(os.path.join(root, f), 'r', encoding='utf-8') as file:
                            content = file.read()
                            body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.IGNORECASE | re.DOTALL)
                            if body_match:
                                html_texts.append(extract_text(body_match.group(1)))
                            else:
                                html_texts.append(extract_text(content))
                    except:
                        pass
                elif f.endswith('.js'):
                    try:
                        with open(os.path.join(root, f), 'r', encoding='utf-8') as file:
                            js_codes.append(file.read())
                    except:
                        pass
        
        out.write("--- HTML TEXT ---\n")
        combined_text = " ".join(html_texts)
        words = combined_text.split()
        out.write(f"(Word count: {len(words)})\n")
        out.write(" ".join(words[:150]))
        if len(words) > 150:
            out.write(" ...\n")
        else:
            out.write("\n")
            
        out.write("\n--- JS CODE ---\n")
        combined_js = "\n\n".join(js_codes)
        out.write(combined_js[:500])
        if len(combined_js) > 500:
            out.write(" ...\n")
        else:
            out.write("\n")

