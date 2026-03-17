import sys
import re

file_path = "/Users/vincentvandercruyssen/Documents/hugo/kunstkaai/content/2025-2026/doelen/dex2d.md"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.read().splitlines()

cleaned_lines = []
for line in lines:
    m = re.match(r"^((?:BK|WD)[^\s]+)\s+(.*)$", line)
    if m:
        cleaned_lines.append("")
        cleaned_lines.append(f"**{m.group(1)}**  ")
        cleaned_lines.append(m.group(2))
    elif line.startswith("    ") or line.startswith("\t") or (line.startswith(" ") and len(line) > 1):
        if cleaned_lines and cleaned_lines[-1] != "":
            if not cleaned_lines[-1].endswith("  "):
                cleaned_lines[-1] += "  "
        cleaned_lines.append(line.strip())
    elif line.strip() == "":
        cleaned_lines.append("")
    else:
        if line.startswith("##"):
            cleaned_lines.append("")
            cleaned_lines.append(line)
        else:
            cleaned_lines.append(line)

final_lines = []
for line in cleaned_lines:
    if line == "" and (len(final_lines) == 0 or final_lines[-1] == ""):
        continue
    final_lines.append(line)

# Ensure the file ends with a single newline after content
while final_lines and final_lines[-1] == "":
    final_lines.pop()

with open(file_path, "w", encoding="utf-8") as f:
    f.write("\n".join(final_lines) + "\n")
