import styled from 'styled-components';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {
  Link
} from "react-router-dom";

const NavLink = styled(Link)`
    color: black;
    font-weight: 600 !important;
    font-family: 'Varela Round';

    &:hover {
        color: black
    }
`

const StyledNavbar = () => {
    return (
        <Navbar bg="light" expand="lg" style={{
            height: '164px',
            fontSize: '48px !important'
        }}>
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>SEWA AULA</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <NavLink to="/">HOME</NavLink>
                        </Nav.Link>
                        <Nav.Link>
                            <NavLink to="/about">ABOUT</NavLink>
                        </Nav.Link>
                        <Nav.Link>
                            <NavLink to="/contact">CONTACT</NavLink>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default StyledNavbar;
