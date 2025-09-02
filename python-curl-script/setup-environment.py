#!/usr/bin/env python3
"""
Environment setup script for JWT token generator
Sets environment variables based on provided configuration data
"""

import os

def setup_environment():
    """Set environment variables for JWT token generation"""

    config = {
        'CLIENT_ID': '',
        'URL': '',
        'PRIVATE_KEY': '',
        'SCOPE': '',
        'BASE_URL':''
    }

    # Set environment variables
    for key, value in config.items():
        os.environ[key] = value
        print(f"Set {key}")

    print("Environment variables configured successfully!")
    return config

def print_environment():
    """Print current environment configuration (without sensitive data)"""
    print("\nCurrent Environment Configuration:")
    print(f"CLIENT_ID: {os.getenv('CLIENT_ID', 'Not set')}")
    print(f"URL: {os.getenv('URL', 'Not set')}")
    print(f"PRIVATE_KEY: {'Set' if os.getenv('PRIVATE_KEY') else 'Not set'}")
    print(f"SCOPE: {os.getenv('SCOPE', 'Not set')}")

if __name__ == "__main__":
    setup_environment()
    print_environment()
