import json
import matplotlib as mpl
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
from packaging import version
from datetime import datetime, timedelta
import re

from sscws.sscws import SscWs

def parse_date(date_obj):
    if isinstance(date_obj, str):
        # Remove any trailing 'Z' or timezone info
        date_str = re.sub(r'[Z+-].*$', '', date_obj)
    elif hasattr(date_obj, 'isoformat'):
        # If it's a datetime-like object
        return date_obj
    elif hasattr(date_obj, '__str__'):
        # If it's some other object, try to convert it to string
        date_str = str(date_obj)
    else:
        raise TypeError(f"Unsupported date type: {type(date_obj)}")
    
    # Try parsing with different formats
    formats = [
        '%Y-%m-%dT%H:%M:%S',  # ISO format without timezone
        '%Y-%m-%dT%H:%M',     # ISO format without seconds
        '%Y-%m-%d',           # Just date
        '%Y-%m-%dT%H:%M:%S.%f'  # ISO format with microseconds
    ]
    
    for fmt in formats:
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            pass
    
    raise ValueError(f"Unable to parse date: {date_obj}")

def fetch_ssc_data():
    # Initialize the SSC Web Service client
    ssc = SscWs()

    # Get a list of available satellites
    satellites = ssc.get_observatories()
    print("Available satellites:")
    all_satellites = satellites['Observatory']
    for observatory in all_satellites[:20]:  # Showing more satellites
        print('{:15s} {:20.20s} {:25s}'.format(
            observatory['Id'], 
            observatory['Name'], 
            str(observatory['StartTime'])
        ))
    print('...')

    # Function to try getting data for a satellite
    def try_get_data(sat, start_time, end_time):
        try:
            locations = ssc.get_locations([sat], [start_time.strftime('%Y-%m-%dT%H:%M:%SZ'), 
                                               end_time.strftime('%Y-%m-%dT%H:%M:%SZ')])
            if len(locations.get('Data', [])) > 0 and len(locations['Data'][0].get('Coordinates', [])) > 0:
                return locations
        except Exception as e:
            print(f"  Error: {e}")
        return None

    # Let's use exact IDs from the list, adjusting for case
    all_ids = [sat['Id'].lower() for sat in all_satellites]
    selected_satellites = [
        'ace', 'dscovr', 'stereo ahead', 'stereo behind', 'iss', 
        'themis b', 'goes-r', 'sdo', 'stereo a', 'stereo b',
        'wind', 'soho', 'parker solar probe'
    ]

    # Initialize a dictionary to store satellite data
    satellite_data = {}

    # Fetch data for each selected satellite
    for sat in selected_satellites:
        print(f"\nTrying satellite: {sat}")
        
        # Find the satellite in our list
        found = False
        for full_sat in all_satellites:
            if sat in full_sat['Id'].lower() or sat in full_sat['Name'].lower():
                details = full_sat
                found = True
                break

        if found:
            print(f"  Details: {details}")
            try:
                start_time = parse_date(details['StartTime'])
                print(f"  Available from {start_time}")
            except (ValueError, KeyError, TypeError) as e:
                print(f"  Error parsing start time: {e}")
                continue
        else:
            print(f"  No details found for {sat}")
            continue
        
        # Now let's try to get location data
        locations = None
        
        # Define date ranges
        date_ranges = [
            ("1 month after launch", timedelta(days=30)),
            ("1 year after launch", timedelta(days=365)),
            ("5 years after launch", timedelta(days=365*5)),
            ("Jan 1, 2000 - Jan 1, 2001", (datetime(2000, 1, 1), datetime(2001, 1, 1))),
            ("Jan 1, 2010 - Jan 1, 2011", (datetime(2010, 1, 1), datetime(2011, 1, 1))),
            ("Jan 1, 2020 - Jan 1, 2021", (datetime(2020, 1, 1), datetime(2021, 1, 1)))
        ]

        for desc, date_range in date_ranges:
            print(f"  Trying {desc}...")
            if isinstance(date_range, timedelta):
                end_time = start_time + date_range
                locations = try_get_data(sat, start_time, end_time)
            else:
                locations = try_get_data(sat, date_range[0], date_range[1])
            
            if locations:
                break

        # If we have data, process it
        if locations:
            data = locations['Data'][0]
            coords = data['Coordinates'][0] if 'Coordinates' in data and data['Coordinates'] else None

        if coords:
            satellite_data[sat] = {
                'Name': details['Name'],
                'X': coords.get('X', []).tolist(),
                'Y': coords.get('Y', []).tolist(),
                'Z': coords.get('Z', []).tolist(),
                'CoordinateSystem': getattr(coords.get('CoordinateSystem'), 'value', 'Unknown'),
                'StartTime': data.get('StartTime') or coords.get('Time', [0]),
                'EndTime': data.get('EndTime') or coords.get('Time', [-1])
            }
        # ... rest of the code ...
        else:
            print("  No coordinate data found")
    else:
        print(f"  No location data found for {sat}")

    # Convert the data to JSON format
    json_data = json.dumps(satellite_data, indent=4)

    # Save the data to a file
    with open('ssc_data.json', 'w') as f:
        f.write(json_data)

    return json_data

if __name__ == '__main__':
    fetch_ssc_data()