import { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import useDraggableScroll from 'use-draggable-scroll';

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import OrderCardInfo from "../../components/admin/OrderCardInfo"; 
import { adminDataApi } from '../../api/api';
import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';

import { AuthContext } from "../../context/AuthContext";
import { AdminOrderContext } from "../../context/AdminOrderContext";
import Icon from "./../../assets/svg/icon.svg"

const PacketContainer = styled.div`
    font-family: ${GlobalFonts.secondary};
`;

export const DetailPreview = styled.div`
    margin: 0 0 50px 0;

    .DetailPreview {
        margin: 20px 0 50px 0;
        width: 100%;
        height: '200px';
        display: flex;   
        flex-wrap: nowrap;
        gap: 50px;
        overflow-x: auto;

        ::-webkit-scrollbar {
            display: none;
        }
    }
`

const Packet = () => {
    const { isLoading: isAdminDataLoading, dispatch, order, packet } = useContext(AdminOrderContext);
    
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
    
    useEffect(() => {
    }, [order, packet])

    return (
        <PacketContainer>
            <StyledNavbarAdmin />
            <AdminStyledSection>
                <DetailPreview>
                    <h3 className="fw-bolder mb-4">/Paket</h3>
                    {isAdminDataLoading && <CircularProgress /> }                    
                    {/* {activeOrder && activeOrder.map((order) =>(
                       
                    ))} */}
                    {!isAdminDataLoading && packet?.length === 0 && 
                        <h3>Tidak ada order yang sedang berlangsung</h3>
                    }
                </DetailPreview>
            </AdminStyledSection>
        </PacketContainer>
    )
}

export default Packet;
