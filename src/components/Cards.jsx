import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Card } from "react-bootstrap";

import { GlobalMeasurements, GlobalColors, GlobalFonts } from '../globals';

const DefaultCard = styled(Card)`
    border-radius: 20px;
    background: ${GlobalColors.hardGrey};
    padding: 18px;
    height: 100%;
    color: white;

    img {
        object-fit: cover;
        border-radius: 20px;
    }

    ${Card.Text} {
        font-size: 1rem;
        
        p {
            margin: -3px 0;
            font-family: ${GlobalFonts.secondary};
            text-transform: capitalize;
        }
    }

    h2 {
        font-family: ${GlobalFonts.primary};
        text-align: left;
        min-width: 150px;
        font-size: 1.5rem;
        color: ${GlobalColors.green};
    }    
`

const SmallCard = styled(DefaultCard)`
    width: 300px;

    .CardBody {
        margin: 20px 0 0 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 20px;
        height: 100%;
    }
    
`

const WideCard = styled(DefaultCard)`
    padding: 15px;
    height: 150px;
    flex-direction: row;
    justify-content: space-between;
    
    .CardLeft {
        display: flex;
        gap: 20px;

        p {
            font-size: 1.5rem;
            align-self: center;
            font-size: 1.25rem;
        }

    }

    h2 {
        text-align: right;
        align-self: center;
    }

`

const CardTitle = styled(Card.Title)`
    font-size: 2rem;
    font-family: ${GlobalFonts.primary};
`

const CardComponent = ({ packetPlain, image, title, packet, price, cardVariant }) => {
    const SmallCardComponent = () => {
        return (
            <SmallCard>
                <img variant="top" src={image} />
                <div className="CardBody">
                    <CardTitle>{title}</CardTitle>
                    <Card.Text>
                        {packetPlain ? 'paket yang menyediakan aula saja dengan fasilitasnya' : packet.map((packet, i) => (
                            <p key={i}>{packet}</p>
                        ))}
                    </Card.Text>
                    <h2>Rp. {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {price == 0 ? '' : '/orang'}</h2>
                </div>
            </SmallCard>
        )
    }

    const WideCardComponent = () => {
        return (
            <WideCard>
                <div className="CardLeft">
                    <img variant="left" src={image} />
                    <Card.Text>
                        <CardTitle>{title}</CardTitle>
                        <Card.Text>
                            {packetPlain ? 'paket yang menyediakan aula saja dengan fasilitasnya' : packet.map((packet, i) => (
                                <span key={i}>{i === 0 ? "" : ","} {packet}</span>
                            ))}
                        </Card.Text>
                    </Card.Text>
                </div>
                <h2>Rp. {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {price == 0 ? '' : '/orang'}</h2>
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
