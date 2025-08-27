from descope import (
    REFRESH_TOKEN_SESSION_NAME,
    SESSION_TOKEN_NAME,
    AuthException,
    DeliveryMethod,
    DescopeClient
)

try:
    descope_client = DescopeClient(project_id='P31rvuz4KAU5NBauZw9vUsGTBWRg')
except Exception as error:
    print("failed to initialize. Error: ")
    print(error)

def validate_session():
    session_token = "xxxx"

    try:
        jwt_response = descope_client.validate_session(session_token=session_token)
        print("successfully validated session")
        print(jwt_response)
    except Exception as Error:
        print("Could not validate user session. Error")
        print(error)
