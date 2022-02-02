import styled from 'styled-components';

import { GlobalMeasurements, GlobalColors } from '../globals';
import CardComponent from "./Card";
import { StyledLink, StyledSection, StyledTitle, StyledButton } from "../ReuseableComponents/ReuseableComponents";

const CardsContainer = styled.div`
    padding: 0 0 100px 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
`

const PacketCards = () => {
    const data = [
        {
            image: require('./../assets/img/dummy-img-1.png'), 
            title: "Paket 1",
            packet: ['Nasi Ayam', 'Lawar', 'Air Mineral'],
            price: "Rp 20.000/orang",
        },
        {
            image: require('./../assets/img/dummy-img-1.png'), 
            title: "Paket 2",
            packet: ['Nasi Ayam', 'Lawar', 'Air Mineral'],
            price: "Rp 20.000/orang",
        },
        {
            image: require('./../assets/img/dummy-img-1.png'), 
            title: "Paket 3",
            packet: ['Nasi Ayam', 'Lawar', 'Air Mineral'],
            price: "Rp 20.000/orang",
        },
    ];

    return (
        <StyledSection>
            <StyledTitle>Pilih paket</StyledTitle>
            <CardsContainer>
                {data.map(data =>(
                    <StyledLink to="order/:packetId/">
                        <CardComponent 
                            image={data.image} 
                            title={data.title}
                            packet={data.packet}
                            price={data.price}
                    />
                    </StyledLink>
                ))}
            </CardsContainer>
        </StyledSection>
    )
}

export default PacketCards;
