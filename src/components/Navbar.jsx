import styled from 'styled-components';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { GlobalMeasurements, GlobalFonts } from '../globals';
import {
  Link
} from "react-router-dom";

const NavLink = styled(Link)`
    color: white;
    font-family: ${GlobalFonts.primary};
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }

    &:hover {
        color: white;
    }
`

const NavbarBrand = styled(Navbar.Brand)`
    font-size: ${GlobalMeasurements.navbarFontSize}px !important;
`

const StyledNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{
            height: `${GlobalMeasurements.navbarHeight}px`, 
            fontSize: `${GlobalMeasurements.navbarFontSize}px`,            
        }}>
            <Container>
                <NavLink to="/">
                    <NavbarBrand>SEWA AULA</NavbarBrand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="me-auto">
                        <Nav.Link style={{
                            marginLeft: '40px'
                        }}>
                            <NavLink to="/">HOME</NavLink>
                        </Nav.Link>
                        <Nav.Link style={{
                            marginLeft: '40px'
                        }}>
                            <NavLink to="/about">ABOUT</NavLink>
                        </Nav.Link>
                        <Nav.Link  style={{
                            marginLeft: '40px'
                         }}>
                            <NavLink to="/contact">CONTACT</NavLink>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default StyledNavbar;
