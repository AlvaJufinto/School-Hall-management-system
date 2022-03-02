import { useEffect, useState, useContext } from "react";
import styled from 'styled-components';
import { Card } from "react-bootstrap";
import { CreateOutlined, DeleteOutlineOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

import AddForm from "./AddPacketFormAdmin";
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
        height: 300px;
    }

    ${Card.Text} {
        font-size: 1rem;

        p {
            margin: 0;
            font-family: ${GlobalFonts.secondary};
            text-transform: capitalize;
        }
    }

    h2 {
        margin: 20px 0;
        font-family: ${GlobalFonts.primary};
        text-align: left;
        font-size: 1.5rem;
        color: ${GlobalColors.green};
    }    

    .Options {
        margin-top: auto;
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
    max-width: 300px;
    width: 100%;

    .CardBody {
        margin: 20px 0 0 0;
        display: flex;
        flex-direction: column;
    }
    
`

const CardTitle = styled(Card.Title)`
    font-size: 2rem;
    font-family: ${GlobalFonts.primary};
`

const CardComponent = ({ paketId, packetPlain, image, title, packet: activePacket, deskripsi, price, priceAula }) => {
    const { isLoading: packetIsLoading, dispatch, order, packet } = useContext(AdminOrderContext);
    const [isFormShown, setIsFormShown] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    let accessToken = localStorage.getItem("accessToken");

    useEffect(() =>{
        if(packet.length === 1) {
            setIsButtonDisabled(true);
        }
    }, [packet])

    const orderDeleteHandler = async (paketId) => {
        if(accessToken) {
            dispatch({ type: 'DELETE_ADMIN_PACKET_START'});
            try {
                const res = await adminDataApi.deletePacket({ params: paketId, accessToken: accessToken });

                dispatch({ type: 'DELETE_ADMIN_PACKET_SUCCESS', payload: paketId})
            } catch (err) {
                console.log(err);
                alert(err.response.message)
            }
        }
    }
    
    return (
        <>
            <SmallCard>
                { isFormShown ? 
                    <AddForm 
                        isAddForm={false} 
                        setIsFormShown={setIsFormShown}
                        isFormShown={isFormShown}
                        packetInfo={{
                            paketId, 
                            packetPlain,
                            tipePaket: (() => packetPlain ? 'plain' : 'order')(), 
                            image, 
                            title, 
                            packet: activePacket, 
                            deskripsi, 
                            price,
                            priceAula
                        }} />    
                    :
                    <>
                        <img variant="top" src={image} />
                        <div className="CardBody">
                                <CardTitle>{title}</CardTitle>
                                <Card.Text>
                                    {packetPlain ? deskripsi : activePacket?.map((packet, i) => (
                                        <p key={i}>{packet}</p>
                                        ))}
                                </Card.Text>
                        </div>
                        <h2>Rp. {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {price == 0 ? '' : '/orang'}</h2>
                        <div className="Options">
                                <StyledButton 
                                    variant="success"
                                    onClick={() => setIsFormShown(true)}
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
                    </>
                }
            </SmallCard>
        </>
    )
}

export default CardComponent;
