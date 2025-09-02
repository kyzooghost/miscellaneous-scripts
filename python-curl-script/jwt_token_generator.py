import os
import time
import json
import requests
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
import jwt
from datetime import datetime, timezone

class JWTTokenGenerator:
    def __init__(self):
        self.client_id = os.getenv('CLIENT_ID')
        self.url = os.getenv('URL')
        self.private_key_pem = os.getenv('PRIVATE_KEY')

    def generate_token(self):
        """Generate JWT token using ES256 algorithm"""
        try:
            # Current time in seconds
            current_time = int(time.time())

            # Token expires in 1 hour (3600 seconds)
            expiration_time = current_time + 3600

            # Create header
            header = {
                "alg": "ES256",
                "typ": "JWT"
            }

            # Create payload
            payload = {
                "iss": self.client_id,
                "aud": f"https://{self.url}/as/token.oauth2",
                "sub": self.client_id,
                "exp": expiration_time,
                "iat": current_time
            }

            # Load private key
            private_key = serialization.load_pem_private_key(
                self.private_key_pem.encode(),
                password=None
            )

            # Generate JWT token
            token = jwt.encode(
                payload=payload,
                key=private_key,
                algorithm="ES256",
                headers=header
            )

            return token

        except Exception as e:
            print(f"Error generating token: {e}")
            return None

    def validate_environment(self):
        """Validate required environment variables are set"""
        missing_vars = []

        if not self.client_id:
            missing_vars.append('CLIENT_ID')
        if not self.url:
            missing_vars.append('URL')
        if not self.private_key_pem:
            missing_vars.append('PRIVATE_KEY')

        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")

        return True

    def get_access_token(self, scope=None):
        """Get access token using client credentials flow"""
        try:
            # Generate JWT assertion
            jwt_token = self.generate_token()
            if not jwt_token:
                return None

            # Prepare token request
            url = f"https://{self.url}/tls/as/token.oauth2"

            headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }

            data = {
                'client_id': self.client_id,
                'client_assertion_type': 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                'client_assertion': jwt_token,
                'grant_type': 'client_credentials'
            }

            if scope:
                data['scope'] = scope

            # Make token request
            response = requests.post(url, headers=headers, data=data, verify=False)

            if response.status_code == 200:
                token_data = response.json()
                return token_data.get('access_token')
            else:
                print(f"Token request failed: {response.status_code}")
                print(f"Response: {response.text}")
                return None

        except Exception as e:
            print(f"Error getting access token: {e}")
            return None

def main():
    """Main function to generate JWT token and get access token"""
    generator = JWTTokenGenerator()

    try:
        # Validate environment variables
        generator.validate_environment()

        # Generate JWT assertion
        jwt_token = generator.generate_token()

        if jwt_token:
            print(f"Generated JWT Token: {jwt_token}")

            # Get access token (optional)
            scope = os.getenv('SCOPE')  # Optional scope
            access_token = generator.get_access_token(scope)

            if access_token:
                print(f"Access Token: {access_token}")
            else:
                print("Failed to get access token")

            return jwt_token
        else:
            print("Failed to generate JWT token")
            return None

    except ValueError as e:
        print(f"Configuration error: {e}")
        print("\nSet the following environment variables:")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

if __name__ == "__main__":
    main()
