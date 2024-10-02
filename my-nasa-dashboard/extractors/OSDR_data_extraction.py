import requests

endpoint = "https://osdr.nasa.gov/osdr/data/osd/files/87-95,137,153.2"
params = {
    "page": 0,  
    "size": 25,  
    "all_files": "true"  
}

response = requests.get(endpoint, params=params)

if response.status_code == 200:
    data = response.json()
    for study in data["study_files"]:
        study_id = study["study_id"]
        study_version = study["study_version"]
        files = study["files"]
        print(f"Study ID: {study_id}, Version: {study_version}")
        for file in files:
            file_name = file["file_name"]
            remote_url = file["remote_url"]
            download_url = f"https://osdr.nasa.gov{remote_url}"
            print(f"  File: {file_name}, Download URL: {download_url}")
else:
    print(f"Error: {response.status_code}")