import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Home from './views/Home'
import Login from './views/Login'
import TopBar from './components/TopBar'

const App = () => {
    return(
        <BrowserRouter>
            <TopBar></TopBar>
            {/* <Home></Home> */}

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App