# exoplanet_api.py
from pyvo.dal import tap

# Set up the TAP service
tap_service = tap.TAPService("https://exoplanetarchive.ipac.caltech.edu/TAP")

# Define your TAP query
query = """
SELECT pl_name, pl_masse, ra, dec
FROM ps
WHERE upper(soltype) LIKE '%CONF%'
  AND pl_masse BETWEEN 0.5 AND 2.0
"""

# Execute the query
results = tap_service.run_sync(query)

# Get the column names
column_names = [f.name for f in results.fields]

# Convert the results to a list of dictionaries
data = []
for row in results:
    row_dict = {}
    for column_name in column_names:
        row_dict[column_name] = row.getvalue(column_name)
    data.append(row_dict)

# Print the data (you can serialize it and return it as a response instead)
print(data)