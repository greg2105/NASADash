import pyvo as vo

tap_service = vo.dal.TAPService("https://exoplanetarchive.ipac.caltech.edu/TAP")

table_names = [table.name for table in tap_service.tables]
print("Available Tables:")
print(table_names)

query = """
SELECT column_name, datatype, description
FROM TAP_SCHEMA.columns
WHERE table_name = 'ps'
"""
columns = tap_service.run_sync(query)

print("\nColumns in the 'ps' table:")
for column in columns:
    print(f"Column Name: {column['column_name']}")
    print(f"Data Type: {column['datatype']}")
    print(f"Description: {column['description']}")
    print()

query = """
SELECT pl_name, pl_masse, ra, dec
FROM ps
WHERE upper(soltype) LIKE '%CONF%'
  AND pl_masse BETWEEN 0.5 AND 2.0
"""

results = tap_service.run_sync(query)

data = []
if hasattr(results, 'columns'):
    for row in results:
        row_dict = {column.name: row[column.name] for column in results.columns}
        data.append(row_dict)
elif hasattr(results, 'fields'):
    column_names = [field.name for field in results.fields]
    for row in results:
        row_dict = {column_name: row.getvalue(column_name) for column_name in column_names}
        data.append(row_dict)
else:
    try:
        first_row = next(iter(results))
        column_names = list(first_row.keys())
        data.append(first_row)
        for row in results:
            row_dict = {column_name: row[column_name] for column_name in column_names}
            data.append(row_dict)
    except StopIteration:
        print("The query returned no results.")

print("Exoplanet Data:")
for row in data:
    print(row)