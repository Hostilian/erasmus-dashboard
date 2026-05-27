import re

with open("erasmus_dashboard.html", "r", encoding="utf-8") as f:
    html = f.read()
    
print("Length of erasmus_dashboard.html:", len(html))

matches = list(re.finditer(r'(?i)cyprus', html))
print(f"Found {len(matches)} occurrences of 'cyprus' (case-insensitive):")
for idx, m in enumerate(matches, 1):
    start = max(0, m.start() - 50)
    end = min(len(html), m.end() + 50)
    context = html[start:end].replace('\n', ' ')
    print(f"  {idx}: ... {context} ...")
