import styled from 'styled-components';

import { GlobalMeasurements, GlobalColors } from '../globals';
import { StyledLink, StyledSection, StyledTitle,StyledButton, StyledCard } from "../ReuseableComponents/ReuseableComponents";

const CardsContainer = styled.div`
    
` 

const PacketCards = () => {
    return (
        <StyledSection>
            <StyledTitle>Pilih paket</StyledTitle>
        </StyledSection>
    )
}

export default PacketCards;
