from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/run-script', methods=['GET'])
def run_script():
    try:
        subprocess.run(['python', 'script.py'], check=True)
        return jsonify({"message": "Script executed successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)