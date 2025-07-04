#!/usr/bin/env python3
"""
Railway startup script for KidneyAI Backend
"""
import os
import subprocess
import sys

def main():
    # Get port from environment or default to 8080
    port = os.environ.get('PORT', '8080')
    
    # Validate port is a number
    try:
        port_int = int(port)
        if port_int < 1 or port_int > 65535:
            raise ValueError("Port out of range")
    except ValueError:
        print(f"Invalid port: {port}, using default 8080")
        port = "8080"
    
    # Start uvicorn with the correct port
    cmd = [
        "uvicorn", 
        "app:app", 
        "--host", "0.0.0.0", 
        "--port", port,
        "--workers", "1"
    ]
    
    print(f"Starting server on port {port}...")
    print(f"Command: {' '.join(cmd)}")
    
    # Execute uvicorn
    try:
        subprocess.run(cmd, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Failed to start server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
