import openpyxl

wb = openpyxl.load_workbook("Erasmus+_Seznam Univerzit pro Studenty.xlsx", data_only=True)
ws = wb["E+ partner universities"]
headers = [cell.value for cell in ws[2]]
for idx, h in enumerate(headers, 1):
    print(f"Col {idx}: {h}")
