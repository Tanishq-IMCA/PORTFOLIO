import subprocess
import os
import atexit
import signal

# --- Configuration ---
FRONTEND_DIR = os.path.dirname(os.path.abspath(__file__))
# To be used when we have a backend
# BACKEND_SCRIPT = "backend/server.py" 

# --- Process Management ---
processes = []

def cleanup():
    """
    Terminates all child processes on script exit.
    """
    print("Shutting down child processes...")
    for p in processes:
        if p.poll() is None:  # If the process is still running
            # p.terminate() # Use this for a graceful shutdown
            p.kill() # Use this for a more forceful shutdown
    print("Cleanup complete.")

# Register cleanup function to be called on script exit
atexit.register(cleanup)
signal.signal(signal.SIGINT, lambda signum, frame: exit(1))
signal.signal(signal.SIGTERM, lambda signum, frame: exit(1))


def start_frontend():
    """
    Starts the Vite development server.
    """
    print("Starting frontend development server...")
    # First, ensure dependencies are installed
    npm_install = subprocess.Popen("npm install", cwd=FRONTEND_DIR, shell=True)
    npm_install.wait() # Wait for npm install to finish
    
    if npm_install.returncode == 0:
        frontend_process = subprocess.Popen(
            "npm run dev", 
            cwd=FRONTEND_DIR, 
            shell=True
        )
        processes.append(frontend_process)
        print(f"Frontend server started with PID: {frontend_process.pid}")
    else:
        print("npm install failed. Frontend server not started.")
        exit(1)


def start_backend():
    """
    Placeholder for starting the backend server.
    """
    print("Starting backend server (placeholder)...")
    # Example:
    # backend_process = subprocess.Popen(
    #     ["python", BACKEND_SCRIPT],
    #     cwd=os.path.dirname(BACKEND_SCRIPT)
    # )
    # processes.append(backend_process)
    # print(f"Backend server started with PID: {backend_process.pid}")
    pass


if __name__ == '__main__':
    start_frontend()
    start_backend()

    # Keep the main script alive to manage child processes
    try:
        # Wait for all processes to complete
        for p in processes:
            p.wait()
    except KeyboardInterrupt:
        print("Main script interrupted. Initiating cleanup...")
        exit(0)
