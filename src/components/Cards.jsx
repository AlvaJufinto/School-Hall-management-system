import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Card, Button } from "react-bootstrap";

import DummyImg from "../assets/img/dummy-img-1.png";
import { GlobalMeasurements, GlobalColors, GlobalFonts } from '../globals';
import { StyledLink, StyledSection, StyledButton } from "../ReuseableComponents/ReuseableComponents";

const CardTitle = styled(Card.Title)`
    font-size: 2rem;
`

const DefaultCard = styled(Card)`
    border-radius: 15px;
    background: ${GlobalColors.hardGrey};
    padding: 18px;
    max-width: 100%;

    img {
        object-fit: cover;
        border-radius: 20px;
    }
`

const SmallCard = styled(DefaultCard)`
    width: 300px;
    
    .CardBody {
        flex: 0 0 100%;
        margin: 20px 0 0 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 20px;
        
        ${Card.Text} {
            font-size: 1rem;
    
            p {
                margin: -3px 0;
                font-family: ${GlobalFonts.secondary};
            }
        }
    
        h2 {
            font-size: 2rem;
            color: ${GlobalColors.green};
        }
    }
`

const WideCard = styled(DefaultCard)`
    width: 100%;
    flex-direction: row;
`

const CardComponent = ({ image, title, packet, price, cardVariant }) => {
    const SmallCardComponent = () => {
        return (
            <SmallCard>
                <img variant="top" src={image} />
                <div className="CardBody">
                    <CardTitle>{title}</CardTitle>
                    <Card.Text>
                        {packet.map(packet => (
                            <p>{packet}</p>
                        ))}
                    </Card.Text>
                    <h2>{price}</h2>
                </div>
            </SmallCard>
        )
    }

    const WideCardComponent = () => {
        return (
            <WideCard>
                <img variant="top" src={image} />
                <div className="CardBody">
                    <CardTitle>{title}</CardTitle>
                    <Card.Text>
                        {packet.map(packet => (
                            <p>{packet}</p>
                        ))}
                    </Card.Text>
                    <h2>{price}</h2>
                </div>
            </WideCard>
        )
    }

    return (
        <>
            {(() => {
                switch (cardVariant) {
                    case "small":
                        return (
                            <SmallCardComponent />
                        );
                    case "wide":
                        return (
                            <WideCardComponent />
                        )
                }
            })()}
        </>
    )
}

export default CardComponent;
