from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import requests
from ollama import Client, chat
from descope import (
    # REFRESH_TOKEN_SESSION_NAME,
    SESSION_TOKEN_NAME,
    AuthException,
    DeliveryMethod,
    DescopeClient
)

app = Flask(__name__)
CORS(app)

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

@app.route("/chat", methods=["GET", "POST"])
def chat():
    data = request.get_json(force=True, silent=True) or {}
    prompt = data.get("message", "Default prompt")

    client = Client(
        host="http://localhost:11434",
        headers={'x-some-header': 'some-value'}
    )
    
    response = client.generate(model="gemma3:1b", prompt=prompt)
    return jsonify({"reply": response.get("response")})

@app.route("/test", methods=["GET", "POST"])
def test():
    return jsonify({"msg": "CORS works!"})

if __name__ == '__main__':
    app.run(debug=True)