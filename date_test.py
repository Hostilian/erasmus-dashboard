def parse_mixed_date(dl_str):
    if not dl_str:
        return None
    dl_str = str(dl_str).strip().lower().rstrip('.')
    if dl_str in ['', 'none', '-', 'rolling', 'no deadline', 'unspecified']:
        return None
        
    months = {
        'january': 1, 'february': 2, 'march': 3, 'april': 4, 'may': 5, 'june': 6,
        'july': 7, 'august': 8, 'september': 9, 'october': 10, 'november': 11, 'december': 12,
        'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6, 'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12
    }
    
    import re
    # Match text month
    m = re.match(r'(\d+)\s+([a-z]+)', dl_str)
    if m:
        return (months[m.group(2)], int(m.group(1)))
    m = re.match(r'([a-z]+)\s+(\d+)', dl_str)
    if m:
        return (months[m.group(1)], int(m.group(2)))
        
    # Match numeric dotted format like A.B
    parts = dl_str.split('.')
    if len(parts) >= 2:
        try:
            a, b = int(parts[0]), int(parts[1])
            # Case 1: one of them is > 12
            if a > 12: # must be DD.MM
                return (b, a)
            elif b > 12: # must be MM.DD
                return (a, b)
            # Case 2: both <= 12
            # Let's check common combinations in our dataset:
            # 5.15. -> handled above (b > 12)
            # 6.30. -> handled above (b > 12)
            # 1.6. -> Juraj Dobrila (Pula) -> June 1 (Day=1, Month=6)
            # 5.1. -> Zagreb, Deusto -> May 1 (Month=5, Day=1 or Day=5, Month=1? Deusto has 5.1. which is May 1st. Zagreb has 5.1. which is May 1st.)
            # 1.5. -> Kymenlaakso, Bonn -> May 1st (Day=1, Month=5)
            # 6.1. -> Hohenheim, Portucalense -> June 1st (Month=6, Day=1 or Day=1, Month=6)
            # 7.1. -> Lleida -> July 1st (Month=7, Day=1)
            # 1.4. -> Wageningen, Karlstad -> April 1st (Day=1, Month=4)
            # 8.15. -> handled (b > 12)
            # 15.5. -> handled (a > 12)
            # 15.6. -> handled (a > 12)
            
            # Let's map these specific combinations:
            if (a, b) == (1, 6) or (a, b) == (6, 1):
                return (6, 1) # June 1st
            if (a, b) == (5, 1) or (a, b) == (1, 5):
                return (5, 1) # May 1st
            if (a, b) == (7, 1) or (a, b) == (1, 7):
                return (7, 1) # July 1st
            if (a, b) == (1, 4) or (a, b) == (4, 1):
                return (4, 1) # April 1st
                
            # Default fallback: assume A is Month, B is Day or vice versa.
            # Let's look at typical European formats (Day.Month)
            return (b, a)
        except ValueError:
            pass
    return None

import json
with open('extracted_061.json', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    dl = item['deadline_fall']
    res = parse_mixed_date(dl) if dl else None
    print(f"Raw: {str(dl):12s} -> Parsed Month/Day: {res}")
