import styled from 'styled-components';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { GlobalMeasurements, GlobalFonts, GlobalColors } from '../globals';
import {
  Link
} from "react-router-dom";

const NavLink = styled(Link)`
    color: ${GlobalColors.white};
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
    font-size: ${GlobalMeasurements.navbarFontSize}rem !important;
`

const StyledNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{
            minHeight: `${GlobalMeasurements.navbarHeight}px`, 
            fontSize: `${GlobalMeasurements.navbarFontSize}rem`,            
        }}>
            <Container>
                <NavLink to="/">
                    <NavbarBrand>SEWA AULA</NavbarBrand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="me-auto">
                        <Nav.Link className="mr-5">
                            <NavLink to="/">HOME</NavLink>
                        </Nav.Link>
                        <Nav.Link className="mr-5">
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
