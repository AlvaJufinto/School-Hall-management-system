import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';
import { GlobalMeasurements, GlobalFonts, GlobalColors } from '../globals';
import { StyledLink, StyledButton } from "../ReuseableComponents/ReuseableComponents";

import JumbotronImg from "../assets/img/jumbotron-img.png";

const JumbotronDescription = styled.p`
    font-family: ${GlobalFonts.secondary};
    font-size: 1.25rem;
    width: 50%;

    @media screen and (max-width: 767px){
        width: 100%
    }
`

const StyledNavbar = () => {
    return (
        <div class="container-fluid text-light" style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 64%), rgba(196, 196, 196, 0%)), url(${JumbotronImg})`,
            height: '530px',
            fontFamily: GlobalFonts.primary,
            color: GlobalColors.white,
            display: 'flex',
            alignItems: 'center',
        }}>
            <Container>
                <h1 class="display-4 fw-bold">Lorem ipsum </h1>
                <JumbotronDescription class="py-2">Dolor sit amet, consectetur adipiscing elit. Diam proin ut orci sem nunc. Fermentum pulvinar urna malesuada amet ornare. Enim erat sit maecenas diam auctor viverra vitae sed. </JumbotronDescription>
                <StyledLink to="/" >
                    <StyledButton 
                        color={GlobalColors.white}
                        background={GlobalColors.violet}
                        height="65" 
                        width="205"
                        fontSize="1.5" >Lorem</StyledButton>
                </StyledLink>
            </Container>
        </div>
    )
}

export default StyledNavbar;
