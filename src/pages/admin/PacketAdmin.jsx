import { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { AddRounded, Check, Close } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import useDraggableScroll from 'use-draggable-scroll';

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import CardComponent from "./../../components/admin/PacketCardAdmin";
import AddForm from "./../../components/admin/AddPacketFormAdmin";
import { adminDataApi } from '../../api/api';
import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';

import { AdminOrderContext } from "../../context/AdminOrderContext";
import DummyImg from "./../../assets/img/dummy-img-1.png";
import DummyImgPlain from "./../../assets/img/dummy-img-3.png";
import BlankImg from "./../../assets/svg/blank-img.svg";

const PacketContainer = styled.div`
    font-family: ${GlobalFonts.secondary};
`;

export const DetailPreview = styled.div`
    margin: 0 0 50px 0;

    .DetailPreview {
        margin: 20px 0 50px 0;
        display: flex;   
        flex-wrap: wrap;
        align-items: stretch;
        gap: 20px;
    }
`

const AddCardContainer = styled.div`
    min-height: 500px;
    border-radius: 20px;
    width: 300px;
    background: ${GlobalColors.hardGrey};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
`

const Packet = () => {
    const { isLoading: isAdminDataLoading, packet } = useContext(AdminOrderContext);
    const [isShowAdd, setIsShowAdd] = useState(false);
    
    return (
        <PacketContainer>
            <StyledNavbarAdmin />
            <AdminStyledSection>
                <DetailPreview>
                    <h3 className="fw-bolder mb-4">/Paket</h3>
                    <div className="DetailPreview">
                        {isAdminDataLoading && !packet && <CircularProgress /> }                    
                        {packet?.map((packet) =>(
                            <CardComponent 
                                key={packet}
                                paketId={packet?._id}
                                packetPlain={packet?.paketPlain}
                                image={packet?.paketPlain ? DummyImgPlain : DummyImg} 
                                title={packet?.namaPaket}
                                deskripsi={packet?.deskripsi}
                                packet={packet?.detailCatering && packet?.detailCatering?.detailPaketCatering}
                                price={packet?.detailCatering ? packet.detailCatering.hargaPerBuah : '0'}
                                priceAula={packet?.hargaAula}
                                cardVariant="small"
                                className="h-100" 
                                packetIsLoading={isAdminDataLoading} />
                        ))}
                        <AddCardContainer>
                            {isShowAdd ? 
                            <AddForm
                                setIsShowAdd={setIsShowAdd}
                                isAddForm={true} />
                            : 
                            <StyledButton 
                                variant="secondary"
                                onClick={() => setIsShowAdd(true)}
                                background="rgba(255, 255, 255, 0.1)"
                                borderRadius="20"
                                border="5px solid white"
                                height="150"
                                width="100"
                                fontSize="2"
                                disabled={isAdminDataLoading}>
                                { isAdminDataLoading && <CircularProgress style={{
                                    color: 'white'
                                }} /> }
                                    { !isAdminDataLoading && 
                                        <AddRounded style={{ fontSize: '3.5rem' }} />
                                    }
                            </StyledButton>
                            }
                        </AddCardContainer>
                    </div>
                </DetailPreview>
            </AdminStyledSection>
        </PacketContainer>
    )
}

export default Packet;
