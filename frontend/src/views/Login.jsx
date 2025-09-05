import { useEffect, useCallback } from 'react'

import { useDescope, useSession, useUser, getSessionToken, Descope } from '@descope/react-sdk';
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';

const Login = () => {
    const { isAuthenticated, isSessionLoading } = useSession();
    const { user, isUserLoading } = useUser();
    const { logout } = useDescope();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/');
            return null;
        }
    }, [isAuthenticated, navigate])

    const getGoogleToken = async () => {
        const sessionToken = getSessionToken();
        const res = await fetch("http://127.0.0.1:5000/calendar-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionJwt: sessionToken }),
        });
        const data = await res.json();
        console.log("Google token response: ", data);
    }

    const exampleFetchCall = async () => {
        const sessionToken = getSessionToken();

        fetch('http://127.0.0.1:5000/', {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + sessionToken,
            }
        })
    }

    const handleLoginSuccess = (e) => {
        console.log("Logged-in user: ", e.detail.user);
        navigate('/');
    };

    const handleLogout = useCallback(() => {
        logout()
    }, [logout])

    return <>
    {!isAuthenticated && (
        <Container className="border d-flex justify-content-center">
            <Descope
                flowId="sign-up-or-in"
                onSuccess={(e) => console.log(e.detail.user)}
                onError={(e) => console.log('Could not log in!')}
            />
        </Container>
    )}
    
    {
        (isSessionLoading || isUserLoading) && <p>Loading...</p>
    }

    {!isUserLoading && isAuthenticated &&
        (
            <>
                <p>Hello {user.name}</p>
                <div>My Private Component</div>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={getGoogleToken}>GetGoogleToken</button>
            </>
        )
    }
    </>;
}

export default Login