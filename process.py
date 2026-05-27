import json
from datetime import date
import re

with open('extracted_061.json', encoding='utf-8') as f:
    data = json.load(f)

REF_DATE = date(2026, 5, 27)

def parse_deadline(dl_str):
    if not dl_str:
        return None
    dl_str = str(dl_str).strip().lower()
    if dl_str in ['', 'none', '-', 'rolling', 'no deadline', 'unspecified']:
        return None
    
    months = {
        'january': 1, 'february': 2, 'march': 3, 'april': 4, 'may': 5, 'june': 6,
        'july': 7, 'august': 8, 'september': 9, 'october': 10, 'november': 11, 'december': 12,
        'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6, 'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12
    }
    
    # Clean string
    clean_str = dl_str.replace('st', '').replace('nd', '').replace('rd', '').replace('th', '').rstrip('.')
    
    # 1. Match DD Month or Month DD
    m = re.match(r'(\d+)\s+([a-z]+)', clean_str)
    if m:
        day = int(m.group(1))
        mon_str = m.group(2)
        if mon_str in months:
            return date(2026, months[mon_str], day)
    
    m = re.match(r'([a-z]+)\s+(\d+)', clean_str)
    if m:
        mon_str = m.group(1)
        day = int(m.group(2))
        if mon_str in months:
            return date(2026, months[mon_str], day)
            
    # 2. Match MM.DD. or DD.MM.
    parts = clean_str.split('.')
    if len(parts) >= 2:
        try:
            a, b = int(parts[0]), int(parts[1])
            # Ambiguity handling:
            # Let's inspect typical patterns:
            # 1.5. is May 1st (EU format)
            # 15.5. is May 15th (EU format)
            # 5.15. is May 15th (US format)
            # Let's write a logic:
            if a > 12:
                # Must be DD.MM
                return date(2026, b, a)
            elif b > 12:
                # Must be MM.DD
                return date(2026, a, b)
            else:
                # Both <= 12. Let's check the country.
                # In most European countries it is DD.MM. 
                # Let's look at specific cases:
                # Row 20: Zagreb, Croatia (5.1.) -> Zagreb's deadline is May 1st. In EU format that would be 1st of May (1.5) or 5th of January (5.1)?
                # Wait, Zagreb's nomination deadline is May 1st. So 1.5 is May 1st. But why is it written as 5.1.?
                # Ah! In Croatia, it's often DD.MM. So 1.5. is 1.5. Why would it be 5.1.? Maybe 5.1. is 1st of May in MM.DD?
                # Actually, let's write a lookup for specific ones or check their exact dates.
                # Let's print them out to see what we get if we do DD.MM or MM.DD.
                # Let's print out all parsed vs raw values.
                return date(2026, b, a)  # default to DD.MM
        except ValueError:
            pass
            
    return None

print("--- VALIDATING DEADLINE PARSING ---")
for item in data:
    dl_fall = item['deadline_fall']
    parsed = parse_deadline(dl_fall)
    print(f"Raw: {str(dl_fall):15s} | Parsed: {str(parsed):12s} | Univ: {item['university'][:30]} ({item['country']})")
