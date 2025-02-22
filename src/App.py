from flask import Flask, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/api/run-script', methods=['GET'])
def run_script():
    try:
        # Run the Python script
        result = subprocess.run(['python', 'script.py'], capture_output=True, text=True)
        # Check if script ran successfully
        if result.returncode == 0:
            return jsonify({
                "message": "Script executed successfully!",
                "output": result.stdout  # Send the output of the script
            })
        else:
            return jsonify({
                "message": "Script execution failed!",
                "output": result.stderr  # Send any error output from the script
            }), 500
    except Exception as e:
        # In case of an error, return the error message
        return jsonify({
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
