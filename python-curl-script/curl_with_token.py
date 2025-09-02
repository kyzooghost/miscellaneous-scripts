#!/usr/bin/env python3
"""
Generate access token and make curl request to the API
"""

import subprocess
import json
from setup_environment import setup_environment
from jwt_token_generator import JWTTokenGenerator

def generate_and_curl():
    """Generate fresh access token and make curl request"""

    # Setup environment
    setup_environment()

    # Generate access token
    generator = JWTTokenGenerator()

    try:
        generator.validate_environment()

        # Get fresh access token
        import os
        scope = os.getenv('SCOPE')
        access_token = generator.get_access_token(scope)

        if not access_token:
            print("Failed to get access token")
            return None

        print(f"✓ Generated access token: {access_token}")

        # Prepare curl command
        base_url=""
        url = ""

        payload = {
            "field1": "",
            "field2": "",
        }

        # Build curl command
        curl_cmd = [
            'curl',
            '-v',
            '-k',
            '--request', 'POST',
            '--url', url,
            '--header', f'authorization: Bearer {access_token}',
            '--header', 'content-type: application/json',
            '--data', json.dumps(payload)
        ]

        print(f"\nMaking curl request to: {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")

        # Execute curl command
        result = subprocess.run(curl_cmd, capture_output=True, text=True)

        print(f"\nCurl exit code: {result.returncode}")
        print(f"Response: {result.stdout}")

        if result.stderr:
            print(f"Error: {result.stderr}")

        return result.stdout

    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    generate_and_curl()
