import sys, io, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('all_data.json', encoding='utf-8') as f:
    data = json.load(f)

print(f'Total rows with country: {len(data)}')

# Show all unique colors found
all_colors = set()
for r in data:
    for c in r['colors']:
        all_colors.add(c)
print('All unique cell colors found:', all_colors)

# Show rows marked as red
red_rows = [r for r in data if r['is_red']]
print(f'\nRows detected as RED: {len(red_rows)}')
for r in red_rows[:5]:
    print(f"  {r['country']} | {r['university']} | colors={r['colors']}")

# Show 061 field entries
field061 = [r for r in data if r['field_061']]
print(f'\nRows with 061 field: {len(field061)}')
for r in field061:
    print(f"  {r['country']} | {r['university']} | fall={r['deadline_fall']} | red={r['is_red']} | colors={r['colors']}")
