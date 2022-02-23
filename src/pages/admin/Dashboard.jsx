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

const Dashboard = () => {
    const horizontalElement = useRef(null);
    const { dispatch, user } = useContext(AuthContext);
    const { onMouseDown } = useDraggableScroll(horizontalElement);
    const [isAdminDataLoading, setIsAdminDataLoading] = useState(true);
    const [activeOrder, setActiveOrder] = useState(null); 
    const [packets, setPackets] = useState(null);
    const [activePacket, setActivePacket] = useState(null);
    const [orders, setOrders] = useState([]);
    const [doneOrders, setDoneOrders] = useState([]);
    const [futureOrders, setFutureOrders] = useState([])
    
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");

    // useEffect(() => {
    //     (async () => {
    //         dispatch({ type: "LOGIN_START" });
    //         if (refreshToken) {
    //             try {
    //                 const res = await authApi.loggedIn({ refreshToken: refreshToken});
    //                 dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

    //                 // console.log(res)
    //             } catch (err) {
    //                 console.error(err);
    //             }
    //         }
    //     })();
    // }, [refreshToken, accessToken]);

    useEffect(() => {
        if(accessToken) {
            (async () => {
                try {
                    const res = await adminDataApi.allData({ accessToken: accessToken });
                    console.log(res.data.data);
                    console.log("sdasdasd")
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
        setActivePacket(packets?.filter(item => item._id === activeOrder[0]?.paketId))
    }, [activeOrder, orders, packets])

    useEffect(() => {
        setDoneOrders(orders?.filter((item) => item.status === 'selesai'));
        setFutureOrders(orders?.filter((item) => item.status === 'order' || item.status === 'paid'))
    }, [orders]);

    const PreviewCard = ({ color, text, route, data, isLoading, total }) => {
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
                            fontSize: '3rem',
                        }}>{isLoading ? <CircularProgress style={{
                            color: 'white',
                        }} /> : `${data}/${total}` }</span>
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
                            text="Order Antre"
                            route="order-queue"
                            data={futureOrders?.length}
                            total={orders?.length}
                            isLoading={isAdminDataLoading} />
                        <PreviewCard 
                            color={GlobalColors.green}
                            text="Orderan Selesai"
                            route="order-done"
                            data={doneOrders?.length}
                            total={orders?.length}
                            isLoading={isAdminDataLoading}  />
                        <PreviewCard 
                            color={GlobalColors.red}
                            text="Orderan Dibatalkan"
                            route="order-cancel"
                            data={0}
                            total={orders?.length}
                            isLoading={isAdminDataLoading}  />
                    </div>
                </DetailPreview>
                <DetailPreview>
                    <h3 className="fw-bolder mb-4">/Sedang Berlangsung</h3>
                    {isAdminDataLoading && <CircularProgress /> }                    
                    {activeOrder && activeOrder.map((order) =>(
                        <OrderCardInfo 
                            key={order._id}
                            atasNama={order.atasNama} 
                            namaAcara={order.namaAcara} 
                            orderId={order._id}
                            tanggal={order.tanggal}
                            tipeOrder={order.tipeOrderan}
                            namaPaket={activePacket && activePacket[0]?.namaPaket}
                            jumlahPorsi={order.tipeOrderan === 'plain' ? '' : order.jumlahPorsi}
                            harga={order.tipeOrderan === 'plain' ? activePacket[0]?.hargaAula : activePacket && (order?.jumlahPorsi * activePacket[0]?.detailCatering?.hargaPerBuah) + activePacket[0]?.hargaAula}
                            status={order.status}
                            email={order.email}
                            whatsapp={order.whatsapp}
                        />
                    ))}
                    {!isAdminDataLoading && activeOrder?.length === 0 && 
                        <h3>Tidak ada order yang sedang berlangsung</h3>
                    }
                </DetailPreview>
            </AdminStyledSection>
        </DashboardContainer>
    )
}

export default Dashboard;
