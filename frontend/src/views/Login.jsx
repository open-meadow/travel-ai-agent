import { useCallback } from 'react'

import { useDescope, useSession, useUser } from '@descope/react-sdk';
import { Descope } from '@descope/react-sdk';
import { getSessionToken } from '@descope/react-sdk';
import { Container } from 'react-bootstrap';

const Login = () => {
    const { isAuthenticated, isSessionLoading } = useSession()
    const { user, isUserLoading } = useUser()
    const { logout } = useDescope()

    const exampleFetchCall = async () => {
        const sessionToken = getSessionToken();

        fetch('http://127.0.0.1:5000/', {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + sessionToken,
            }
        })
    }

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
            </>
        )
    }
    </>;
}

export default Login