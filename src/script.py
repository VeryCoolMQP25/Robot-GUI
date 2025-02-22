import time
import subprocess

def run_other_script():
    try:
        # This will run `other_script.py` in the same folder
        subprocess.run(['python3', 'realtimestt3.py'], check=True)
        print("Script executed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"An error occurred while running the script: {e}")

if __name__ == "__main__":
    run_other_script()