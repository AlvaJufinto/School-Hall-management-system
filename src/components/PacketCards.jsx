import styled from 'styled-components';

import { GlobalMeasurements, GlobalColors } from '../globals';
import CardComponent from "./Cards";
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
            image: require('./../assets/img/dummy-img-2.png'), 
            title: "Paket 2",
            packet: ['Nasi', 'Ayam Kentucky', 'Air Mineral'],
            price: "Rp 15.000/orang",
        },
        {
            image: require('./../assets/img/dummy-img-3.png'), 
            title: "No katering",
            packet: ['Hanya Memesan Aula'],
            price: "Rp 0",
        },
    ];

    return (
        <StyledSection>
            <StyledTitle>Pilih paket</StyledTitle>
            <CardsContainer>
                {data.map(data =>(
                    <StyledLink to="/form-order/:packetId">
                        <CardComponent 
                            image={data.image} 
                            title={data.title}
                            packet={data.packet}
                            price={data.price}
                            cardVariant="small"
                            className="h-100"
                        />
                    </StyledLink>
                ))}
            </CardsContainer>
        </StyledSection>
    )
}

export default PacketCards;
