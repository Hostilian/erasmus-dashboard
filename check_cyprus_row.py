import openpyxl

wb = openpyxl.load_workbook("Erasmus+_Seznam Univerzit pro Studenty.xlsx", data_only=True)
ws = wb["E+ partner universities"]
row_21 = [cell.value for cell in ws[21]]
print("Row 21 cell values:")
for idx, val in enumerate(row_21, 1):
    print(f"Col {idx}: {val}")
