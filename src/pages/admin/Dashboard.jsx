import { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import useDraggableScroll from 'use-draggable-scroll';

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import OrderCardInfo from "../../components/admin/OrderCardInfo"; 
import { adminDataApi } from './../../api/api';
import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';

import { AuthContext } from "../../context/AuthContext";
import { authApi } from "./../../api/api";
import Icon from "./../../assets/svg/icon.svg"

const DashboardContainer = styled.div`
    height: 100vh;
    font-family: ${GlobalFonts.secondary};
`;

export const DetailPreview = styled.div`
    margin: 0 0 50px 0;

    .DetailPreview {
        margin: 20px 0 0 0;
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

const Dashboard = () => {
    const horizontalElement = useRef(null);
    const { onMouseDown } = useDraggableScroll(horizontalElement);
    const { dispatch, user } = useContext(AuthContext);
    const [isAdminDataLoading, setIsAdminDataLoading] = useState(true);
    const [activeOrder, setActiveOrder] = useState(null); 
    const [packets, setPackets] = useState(null);
    const [orders, setOrders] = useState(null);
    const [activePacket, setActivePacket] = useState(null);

    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");

    useEffect(() => {
        if(accessToken) {
            (async () => {
                try {
                    const res = await adminDataApi.allData({ accessToken: accessToken });
                    console.log(res.data.data.active);
                    console.log(res.data.data.paket);
                    setActiveOrder(res.data.data.active);
                    setOrders(res.data.data.order);
                    setPackets(res.data.data.paket);
                    setIsAdminDataLoading(!isAdminDataLoading);
                } catch (err) {
                    console.error(err.response);
                    setIsAdminDataLoading(!isAdminDataLoading);
                }
            })();
        }
    }, [accessToken, refreshToken]);
    
    useEffect(() => {
        for (let i=0; i < packets?.length; i++) {
            if (packets[i]?._id === activeOrder[0]?.paketId) {
                setActivePacket(packets[i])
            }
        }
    }, [activeOrder, orders, packets, activePacket])

    const PreviewCard = ({ color, text, value, route }) => {
        return (
            <StyledLink to={`/admin/${route}`} >
                <div style={{
                    background: color,
                    width: '300px',
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '20px',
                    padding: '20px',
                    fontFamily: GlobalFonts.secondary,
                    overflow: 'hidden'
                }}>
                    <h3>{text}</h3>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '50px',
                    }}>
                        <span style={{
                            fontSize: '4rem',
                        }}>{value}</span>
                        <img src={Icon} alt="Icon" />
                    </div>
                </div>
            </StyledLink>
        )
    }

    return (
        <DashboardContainer>
            <StyledNavbarAdmin />
            <AdminStyledSection>
                <DetailPreview>
                    <h3 className="fw-bolder" >/Detail</h3>
                    <div className="DetailPreview" ref={horizontalElement} onMouseDown={onMouseDown} >
                        <PreviewCard 
                            color={GlobalColors.violet} 
                            text="Jumlah Orderan"
                            value="10" 
                            route="order-queue" />
                        <PreviewCard 
                            color={GlobalColors.green}
                            text="Orderan Selesai"
                            value="4"
                            route="order-done" />
                        <PreviewCard 
                            color={GlobalColors.red}
                            text="Orderan Dibatalkan"
                            value="5"
                            route="order-cancel" />
                    </div>
                </DetailPreview>
                <DetailPreview>
                    <h3 className="fw-bolder mb-4">/Sedang Berlangsung</h3>
                    {isAdminDataLoading && <CircularProgress /> }                    
                    {activeOrder && activeOrder.map((order) =>(
                        <OrderCardInfo 
                            atasNama={order.atasNama} 
                            namaAcara={order.namaAcara} 
                            orderId={order._id}
                            tanggal={order.tanggal}
                            tipeOrder={order.tipeOrderan}
                            namaPaket={activePacket?.namaPaket}
                            jumlahPorsi={order.tipeOrderan === 'plain' ? '' : order.jumlahPorsi}
                            harga={order.tipeOrderan === 'plain' ? activePacket?.hargaAula : (order.jumlahPorsi *  order.detailCatering.hargaPerBuah) + activePacket?.hargaAula}
                            status={order.status}
                            email={order.email}
                            whatsapp={order.whatsapp}
                        />
                    ))}
                </DetailPreview>
            </AdminStyledSection>
        </DashboardContainer>
    )
}

export default Dashboard;
