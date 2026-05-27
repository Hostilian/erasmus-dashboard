import openpyxl, sys, io, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

wb = openpyxl.load_workbook('Erasmus+_Seznam Univerzit pro Studenty.xlsx')
ws = wb['E+ info']
rows = []
for r in range(2, 35):
    row_vals = [ws.cell(row=r, column=c).value for c in range(1, 15)]
    if any(row_vals):
        rows.append(row_vals)

for r in rows[:15]:
    print(r)
