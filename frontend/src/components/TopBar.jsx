import { Navbar, Container, NavbarBrand, Button, Nav } from "react-bootstrap"
import { Link, Route, Routes } from "react-router-dom"

const TopBar = () => {
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link to="/">
                    <NavbarBrand>AI Travel Agent</NavbarBrand>
                </Link>
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
            </Container>
        </Navbar>       
    )
}

export default TopBar