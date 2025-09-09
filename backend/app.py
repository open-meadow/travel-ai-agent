from flask import Flask, request, jsonify, Response, stream_with_context
from dotenv import load_dotenv
from flask_cors import CORS
import json
import os
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

load_dotenv()
client = DescopeClient(
    project_id=os.getenv("DESCOPE_PROJECT_ID"),
    management_key=os.getenv("DESCOPE_MANAGEMENT_KEY")
)

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route("/chat", methods=["GET", "POST"])
def chat():
    data = request.get_json(force=True, silent=True) or {}
    messages = data.get("messages", [])

    client = Client(
        host="http://localhost:11434",
        headers={'x-some-header': 'some-value'}
    )
    
    response = client.chat(model="gemma3:1b", messages=messages)
    # print("response: ", response)

    return jsonify({"reply": response.message.content})

@app.route("/flows")
def get_flows():
    flow = client.flows().load("sign-in-social")
    return jsonify(flow)

@app.route("/oauth/callback")
def oauth_callback():
    code = request.args.get("code")
    state = request.args.get("state")

    return "OAuth flow completed, you can close this tab"

@app.route("/calendar-token", methods=["POST"])
def get_calendar_token():
    session_jwt = request.json.get("sessionJwt")
    token = client.outbound.get_app_token("google-calendar", session_jwt)
    return jsonify(token)

@app.route("/test", methods=["GET", "POST"])
def test():
    return jsonify({"msg": "CORS works!"})

if __name__ == '__main__':
    app.run(debug=True)