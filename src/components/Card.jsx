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
    
    ${Card.Text} {
        font-size: 1rem;

        p {
            margin: -3px 0;
            font-family: ${GlobalFonts.secondary};
        }
    }

    h2 {
        margin: 30px 0 0 0;
        font-size: 2rem;
        color: ${GlobalColors.green};
    }
`

const CardTitle = styled(Card.Title)`
    margin: 20px 0;
    font-size: 2rem;
`

const CardComponent = () => {
    return (
        <StyledCard>
            <Card.Img variant="top" src={DummyImg} />
            <div className="CardBody">
                <CardTitle>Paket A</CardTitle>
                <Card.Text>
                    <p>Nasi Ayam</p>
                    <p>Lawar</p>
                    <p>Air Mineral</p>
                </Card.Text>
                <h2>Rp 20.000/orang </h2>
            </div>
        </StyledCard>
    )
}

export default CardComponent;
