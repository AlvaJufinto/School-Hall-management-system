import styled from 'styled-components';
import { Container } from 'react-bootstrap';

import { GlobalMeasurements, GlobalColors } from '../globals';
import { StyledLink, StyledSection } from "../ReuseableComponents/ReuseableComponents";

const FooterSection = styled.div`
    min-height: 450px;
    width: 100%; 
    background-color: ${GlobalColors.hardGrey};
`

const Footer = () => {
    return (
        <FooterSection>
            <StyledSection backgroundColor="none">
                <div className="LeftSection">
                    
                </div>
                <div className="RightSection">

                </div>
            </StyledSection>
        </FooterSection>
    )
}

export default Footer;
