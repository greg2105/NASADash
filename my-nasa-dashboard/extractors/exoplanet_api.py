import pyvo as vo

# Set up the TAP service
tap_service = vo.dal.TAPService("https://exoplanetarchive.ipac.caltech.edu/TAP")

# Get the available table names
table_names = [table.name for table in tap_service.tables]
print("Available Tables:")
print(table_names)

# Get the column information for the 'ps' table
query = """
SELECT column_name, datatype, description
FROM TAP_SCHEMA.columns
WHERE table_name = 'ps'
"""
columns = tap_service.run_sync(query)

# Print the column information
print("\nColumns in the 'ps' table:")
for column in columns:
    print(f"Column Name: {column['column_name']}")
    print(f"Data Type: {column['datatype']}")
    print(f"Description: {column['description']}")
    print()

# Define your TAP query
query = """
SELECT pl_name, pl_masse, ra, dec
FROM ps
WHERE upper(soltype) LIKE '%CONF%'
  AND pl_masse BETWEEN 0.5 AND 2.0
"""

# Execute the query
results = tap_service.run_sync(query)

# Convert the results to a list of dictionaries
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
    # Handle the case where the TAPResults object doesn't have 'columns' or 'fields' attributes
    try:
        first_row = next(iter(results))
        column_names = list(first_row.keys())
        data.append(first_row)
        for row in results:
            row_dict = {column_name: row[column_name] for column_name in column_names}
            data.append(row_dict)
    except StopIteration:
        print("The query returned no results.")

# Print the data
print("Exoplanet Data:")
for row in data:
    print(row)