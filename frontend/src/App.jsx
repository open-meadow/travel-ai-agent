import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSession, useUser } from "@descope/react-sdk"

import Home from './views/Home'
import Login from './views/Login'
import TopBar from './components/TopBar'

const App = () => {
    const { isAuthenticated, isSessionLoading } = useSession();
    const { isUserLoading } = useUser();

    if (isSessionLoading || isUserLoading) return <p>Loading...</p>

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login"/>
    };

    return(
        <BrowserRouter>
            <TopBar></TopBar>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route 
                    path='/'
                    element={
                        <PrivateRoute>
                            <Home/>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App