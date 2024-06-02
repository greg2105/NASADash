import requests

# API base URL
BASE_URL = "https://sscweb.gsfc.nasa.gov/WS/sscr/2.6/"

# Function to retrieve data from an API endpoint
def get_data(endpoint):
    url = BASE_URL + endpoint
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for non-2xx status codes
    return response.json()

# Retrieve satellites
satellites = get_data("satcat/satellites")
print("Satellites:", satellites)

# Retrieve orbital data
orbits = get_data("satcat/orbits")
print("Orbital Data:", orbits)

# Retrieve launches
launches = get_data("satcat/launches")
print("Launches:", launches)

# Retrieve decays
decays = get_data("satcat/decays")
print("Decays:", decays)

# Retrieve box score
box_score = get_data("satcat/boxscore")
print("Box Score:", box_score)

# Retrieve sensors
sensors = get_data("satcat/sensors")
print("Sensors:", sensors)

# Retrieve satellite catalog
catalog = get_data("satcat/catalog")
print("Satellite Catalog:", catalog)