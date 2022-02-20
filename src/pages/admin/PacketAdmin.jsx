import { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { CreateOutlined, AddRounded, DeleteOutlineOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import useDraggableScroll from 'use-draggable-scroll';

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import CardComponent from "./../../components/admin/PacketCardAdmin";
import { adminDataApi } from '../../api/api';
import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';

import { AdminOrderContext } from "../../context/AdminOrderContext";
import DummyImg from "./../../assets/img/dummy-img-1.png";
import DummyImgPlain from "./../../assets/img/dummy-img-3.png";

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
    border-radius: 20px;
    width: 300px;
    background: ${GlobalColors.hardGrey};
    display: flex;
    justify-content: center;
    align-items: center;
`

const Packet = () => {
    const { isLoading: isAdminDataLoading, dispatch, order, packet } = useContext(AdminOrderContext);
    const [isShowAdd, setIsShowAdd] = useState(false);
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");

    // useEffect(() => {
    //     if(accessToken) {
    //         (async () => {
    //             try {
    //                 const res = await adminDataApi.allData({ accessToken: accessToken });
    //                 console.log(res.data);
    //                 setActiveOrder(res.data.data.active);
    //                 setOrders(res.data.data.order);
                    
    //                 setPackets(res.data.data.paket);
    //                 setIsAdminDataLoading(!isAdminDataLoading);
    //             } catch (err) {
    //                 console.error(err.response);
    //                 setIsAdminDataLoading(!isAdminDataLoading);
    //             }
    //         })();
    //     }
    // }, [accessToken, refreshToken]);

    return (
        <PacketContainer>
            <StyledNavbarAdmin />
            <AdminStyledSection>
                <DetailPreview>
                    <h3 className="fw-bolder mb-4">/Paket</h3>
                    <div className="DetailPreview">
                        {isAdminDataLoading && <CircularProgress /> }                    
                        {packet && packet.map((packet) =>(
                            <CardComponent 
                                paketId={packet?._id}
                                packetPlain={packet?.paketPlain}
                                image={packet?.paketPlain ? DummyImgPlain : DummyImg} 
                                title={packet?.namaPaket}
                                packet={packet?.detailCatering && packet?.detailCatering?.detailPaketCatering}
                                price={packet?.detailCatering ? packet.detailCatering.hargaPerBuah : '0'}
                                cardVariant="small"
                                className="h-100" 
                                packetIsLoading={isAdminDataLoading} />
                        ))}
                        <AddCardContainer>
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
                    </AddCardContainer>
                    </div>
                </DetailPreview>
            </AdminStyledSection>
        </PacketContainer>
    )
}

export default Packet;
