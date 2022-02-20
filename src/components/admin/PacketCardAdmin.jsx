import { useEffect, useState, useContext } from "react";
import styled from 'styled-components';
import { Card } from "react-bootstrap";
import { CreateOutlined, DeleteOutlineOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

import { GlobalMeasurements, GlobalColors, GlobalFonts } from '../../globals';
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';

import { adminDataApi } from "../../api/api";
import { AdminOrderContext } from "../../context/AdminOrderContext";
import DummyImg from "./../../assets/img/dummy-img-1.png";
import DummyImgPlain from "./../../assets/img/dummy-img-3.png";

const DefaultCard = styled(Card)`
    border-radius: 20px;
    background: ${GlobalColors.hardGrey};
    padding: 18px;
    color: white;

    img {
        object-fit: cover;
        border-radius: 20px;
    }

    ${Card.Text} {
        font-size: 1rem;

        p {
            margin: 0 0;
            font-family: ${GlobalFonts.secondary};
            text-transform: capitalize;
        }
    }

    h2 {
        margin: 30px 0 0 0;
        font-family: ${GlobalFonts.primary};
        text-align: left;
        min-width: 150px;
        font-size: 1.5rem;
        color: ${GlobalColors.green};
    }    

    .Options {
        margin: 20px 0 0 0;
        height: 50px;
        display: flex;
        gap: 20px;

        ${StyledButton} {
            height: 100%;
            font-size: 10px;
        }
    }
`

const SmallCard = styled(DefaultCard)`
    width: 300px;

    .CardBody {
        margin: 20px 0 0 0;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    
`

const CardTitle = styled(Card.Title)`
    font-size: 2rem;
    font-family: ${GlobalFonts.primary};
`


const CardComponent = ({ paketId, packetPlain, image, title, packet: activePacket, price, cardVariant }) => {
    const { isLoading: packetIsLoading, dispatch, order, packet } = useContext(AdminOrderContext);
    const [showEdit, setShowEdit] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    let accessToken = localStorage.getItem("accessToken");

    useEffect(() =>{
        if(packet.length === 1) {
            setIsButtonDisabled(true);
        }
    }, [packet])

    const orderDeleteHandler = (paketId) => {
        console.log(paketId);
        if(accessToken) {
            dispatch({ type: 'DELETE_ADMIN_PACKET_START'});
            try {
                dispatch({ type: 'DELETE_ADMIN_PACKET_SUCCESS', payload: paketId})
            } catch (err) {
                console.log(err);
            }
        }
    }
    
    return (
        <SmallCard>
            <img variant="top" src={image} />
            <div className="CardBody">
                <CardTitle>{title}</CardTitle>
                <Card.Text>
                    {packetPlain ? 'paket yang menyediakan aula saja dengan fasilitasnya' : activePacket.map((packet, i) => (
                        <p key={i}>{packet}</p>
                        ))}
                </Card.Text>
            </div>
            <h2>Rp. {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {price == 0 ? '' : '/orang'}</h2>
            <div className="Options">
                <StyledButton 
                    variant="success"
                    onClick={() => setShowEdit(true)}
                    background={GlobalColors.green}
                    borderRadius="20"
                    fontSize="2"
                    disabled={packetIsLoading}>
                    { packetIsLoading && <CircularProgress style={{
                        color: 'white'
                    }} /> }
                    { !packetIsLoading && 
                        <CreateOutlined style={{ fontSize: '2rem' }} />
                    }
                </StyledButton>
                <StyledButton 
                    variant="danger"
                    background={GlobalColors.red}
                       borderRadius="20"
                       fontSize="2"
                       onClick={() => orderDeleteHandler(paketId)} 
                       disabled={packetIsLoading || isButtonDisabled}>
                       { packetIsLoading && <CircularProgress style={{
                           color: 'white'
                       }} /> }
                       { !packetIsLoading && 
                           <DeleteOutlineOutlined style={{ fontSize: '2rem' }} />
                    }   
                </StyledButton>
            </div>
        </SmallCard>
    )
}

export default CardComponent;
