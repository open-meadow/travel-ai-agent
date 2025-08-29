from flask import Flask, request
from descope import (
    # REFRESH_TOKEN_SESSION_NAME,
    SESSION_TOKEN_NAME,
    AuthException,
    DeliveryMethod,
    DescopeClient
)

app = Flask(__name__)

try:
    descope_client = DescopeClient(project_id='P31rvuz4KAU5NBauZw9vUsGTBWRg')
except Exception as error:
    print("failed to initialize. Error: ")
    print(error)

def validate_session():
    session_token = request.header.get("Authorization")
    try:
        jwt_response = descope_client.validate_session(session_token=session_token)
        print("successfully validated session")
        print(jwt_response)
    except Exception as Error:
        print("Could not validate user session. Error")
        print(error)

@app.route('/')
def hello_world():
    return 'Hello World'

if __name__ == '__main__':
    app.run(debug=True)