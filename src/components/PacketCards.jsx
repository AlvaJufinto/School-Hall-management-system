import styled from 'styled-components';

import { GlobalMeasurements, GlobalColors } from '../globals';
import CardComponent from "./Card";
import { StyledLink, StyledSection, StyledTitle, StyledButton } from "../ReuseableComponents/ReuseableComponents";

const CardsContainer = styled.div`
`

const PacketCards = () => {
    const data = [
        {
            image: require('./../assets/img/dummy-img-1.png'), 
            title: "Packet 1",
            packet: ['Nasi Ayam', 'Lawar', 'Air Mineral'],
            price: "Description 1 Here",
        },
        {
            image: require('./../assets/img/dummy-img-1.png'), 
            title: "Packet 2",
            packet: ['Nasi Ayam', 'Lawar', 'Air Mineral'],
            price: "Description 1 Here",
        },
        {
            image: require('./../assets/img/dummy-img-1.png'), 
            title: "Packet 3",
            packet: ['Nasi Ayam', 'Lawar', 'Air Mineral'],
            price: "Description 1 Here",
        }
    ];

    return (
        <StyledSection style={{
            padding: '0 50px 100px 50px'
        }} >
            <StyledTitle>Pilih paket</StyledTitle>
            <CardsContainer>
                <StyledLink to="order/:packetId/">
                    <CardComponent />
                </StyledLink>
            </CardsContainer>
        </StyledSection>
    )
}

export default PacketCards;
