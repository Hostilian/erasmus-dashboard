import json
from collections import Counter
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("extracted_061.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    print(f"Total universities in extracted_061.json: {len(data)}")
    
    countries = [u.get("country", "").strip() for u in data]
    country_counts = Counter(countries)
    print("\nUniversities by Country:")
    for country, count in sorted(country_counts.items()):
        print(f"- {country}: {count}")
