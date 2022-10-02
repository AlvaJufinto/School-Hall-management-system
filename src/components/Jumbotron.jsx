import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';
import { GlobalMeasurements, GlobalFonts, GlobalColors } from '../globals';
import { StyledLink, StyledButton } from "../ReuseableComponents/ReuseableComponents";

import JumbotronImg from "../assets/img/gambar-aula-jumbotron.jpg";

const JumbotronDescription = styled.p`
    font-family: ${GlobalFonts.secondary};
    font-size: 1.25rem;
    width: 50%;

    @media screen and (max-width: 767px){
        width: 100%
    }
`

const Jumbotron = () => {
    return (
        <div class="container-fluid text-light" style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 84%), rgba(196, 196, 196, 0%)), url(${JumbotronImg})`,
            height: '530px',
            fontFamily: GlobalFonts.primary,
            color: GlobalColors.white,
            display: 'flex',
            alignItems: 'center',
            backgroundSize: 'cover',
            backgroundPosition: 'center ',
            backgroundRepeat: 'no-repeat',
        }}>
            <Container>
                <h1 class="display-4">AULA SMKN 26 Jakarta </h1>
                <JumbotronDescription class="py-2">Sistem penyewaan aula untuk SMK Negeri 26 Jakarta.</JumbotronDescription>
                <StyledLink to="/" >
                    <StyledButton 
                        color={GlobalColors.white}
                        background={GlobalColors.violet}
                        height="65" 
                        width="205"
                        fontSize="1.5"
                        borderRadius="15">
                            Info Lanjut
                    </StyledButton>
                </StyledLink>
            </Container>
        </div>
    )
}

export default Jumbotron;
