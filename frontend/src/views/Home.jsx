import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import TextSection from '../components/TextSection'
import Login from './Login'

const Home = () => {
    return(
        <>
            <Container style={{height: "90vh"}} className='border border-danger d-flex flex-column flex-wrap justify-content-between align-items-center'>
                <Container className='border border-danger d-flex flex-column flex-wrap justify-content-between align-items-center'>
                    <Container>Hello World</Container>
                </Container>
                <TextSection></TextSection>
            </Container>
        </>
    )
}

export default Home