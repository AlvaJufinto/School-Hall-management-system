import styled from 'styled-components';
import { Card, Button } from "react-bootstrap";

import DummyImg from "../assets/img/dummy-img-1.png";
import { GlobalMeasurements, GlobalColors, GlobalFonts } from '../globals';
import { StyledLink, StyledSection, StyledButton } from "../ReuseableComponents/ReuseableComponents";

const StyledCard = styled(Card)`
    border-radius: 15px;
    background: ${GlobalColors.hardGrey};
    padding: 18px;
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
            /* margin: 30px 0 0 0; */
            font-size: 2rem;
            color: ${GlobalColors.green};
        }
    }
`

const CardTitle = styled(Card.Title)`
    /* margin: 20px 0; */
    font-size: 2rem;
`

const CardComponent = ({ image, title, packet, price }) => {
    return (
        <StyledCard>
            <Card.Img variant="top" src={image} />
            <div className="CardBody">
                <CardTitle>{title}</CardTitle>
                <Card.Text>
                    {packet.map(packet => (
                        <p>{packet}</p>
                    ))}
                </Card.Text>
                <h2>{price}</h2>
            </div>
        </StyledCard>
    )
}

export default CardComponent;
