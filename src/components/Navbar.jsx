import styled from 'styled-components';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { GlobalMeasurements, GlobalColors } from '../globals';
import { StyledLink } from "../ReuseableComponents/ReuseableComponents";

const NavbarBrand = styled(Navbar.Brand)`
    font-size: ${GlobalMeasurements.navbarFontSize}rem !important;
    color: ${GlobalColors.hardGrey};

`

const StyledNavbar = () => {
    return (
        <Navbar variant="light" expand="lg" style={{
            padding: `5px 20px`, 
            fontSize: `${GlobalMeasurements.navbarFontSize}rem`,
            // backgroundColor: GlobalColors.grey,  
            boxShadow: '0px 5px 100px rgba(0, 0, 0, 0.15)'
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
