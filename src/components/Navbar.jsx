import styled from 'styled-components';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { GlobalMeasurements, GlobalColors } from '../globals';
import { StyledLink } from "../ReuseableComponents/ReuseableComponents";

const NavbarBrand = styled(Navbar.Brand)`
    font-size: ${GlobalMeasurements.navbarFontSize}rem !important;
`

const StyledNavbar = () => {
    return (
        <Navbar variant="dark" expand="lg" style={{
            padding: `20px`, 
            fontSize: `${GlobalMeasurements.navbarFontSize}rem`,
            backgroundColor: GlobalColors.hardGrey,            
        }}>
            <Container>
                <StyledLink to="/">
                    <NavbarBrand>SEWA AULA</NavbarBrand>
                </StyledLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse 
                    id="basic-navbar-nav" 
                    className=" justify-content-end">
                    <Nav className="justify-content-end">
                        <Nav.Link className="mr-5">
                            <StyledLink to="/">HOME</StyledLink>
                        </Nav.Link>
                        <Nav.Link className="mr-5">
                            <StyledLink to="/schedule">Jadwal</StyledLink>
                        </Nav.Link>
                        <Nav.Link>
                            <StyledLink to="/contact">CONTACT</StyledLink>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default StyledNavbar;
