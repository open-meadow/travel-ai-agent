import { Navbar, Container, NavbarBrand, Button, Nav } from "react-bootstrap"

const TopBar = () => {
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavbarBrand>AI Travel Agent</NavbarBrand>
                <Button>Login</Button>
            </Container>
        </Navbar>       
    )
}

export default TopBar