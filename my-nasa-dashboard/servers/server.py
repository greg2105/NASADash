# server.py
from flask import Flask
from exoplanet_api import tap_service, query

app = Flask(__name__)

@app.route('/api/exoplanets')
def get_exoplanets():
    results = tap_service.run_sync(query)
    data = [row.to_dict() for row in results]
    return {'data': data}

if __name__ == '__main__':
    app.run(debug=True)