import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import useDraggableScroll from 'use-draggable-scroll';

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import OrderCardInfo from "../../components/admin/OrderCardInfo"; 
import LoadingComponent from "../../components/admin/LoadingComponent";
import { adminDataApi } from './../../api/api';
import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton } from '../../ReuseableComponents/ReuseableComponents';

import { AuthContext } from "../../context/AuthContext";
import { AdminOrderContext } from "../../context/AdminOrderContext";
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
    const { isLoading, dispatch, order, packet, active } = useContext(AdminOrderContext);
    const horizontalElement = useRef(null);
    const { onMouseDown } = useDraggableScroll(horizontalElement);
    const [activePacket, setActivePacket] = useState(null);
    const [doneOrders, setDoneOrders] = useState([]);
    const [futureOrders, setFutureOrders] = useState([]);
    const [cancelOrders, setCancelOrders] = useState([]);
    
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");

    // useEffect(() => {
    //     if(accessToken) {
    //         (async () => {
    //             try {
    //                 const res = await adminDataApi.allData({ accessToken: accessToken });
    //                 console.log(res.data.data);
    //                 console.log("sdasdasd")
    //                 setActiveOrder(res.data.data.active);
    //                 setOrders(res.data.data.order);
                    
    //                 setPackets(res.data.data.paket);
    //                 setisLoading(!isLoading);
    //             } catch (err) {
    //                 console.error(err.response);
    //                 setisLoading(!isLoading);
    //             }
    //         })();
    //     }
    // }, [accessToken, refreshToken]);
    
    useEffect(() => {
        setActivePacket(packet?.filter(item => item._id === active[0]?.paketId))
    }, [order, packet])

    useEffect(() => {
        setDoneOrders(order?.filter((item) => item.status === 'selesai'));
        setFutureOrders(order?.filter((item) => item.status === 'order' || item.status === 'paid'))
        setCancelOrders(order?.filter((item) => item.status === 'batal'));
    }, [order]);

    const PreviewCard = ({ color, text, route, data, isLoading, total }) => {
        return (
            <StyledLink to={`/admin/${route}`} >
                <div style={{
                    background: color,
                    color: 'white',
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
        <>
        { isLoading ? 
            <LoadingComponent />      
        :  
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
                                total={order?.length}
                                isLoading={isLoading} />
                            <PreviewCard 
                                color={GlobalColors.green}
                                text="Orderan Selesai"
                                route="order-done"
                                data={doneOrders?.length}
                                total={order?.length}
                                isLoading={isLoading}  />
                            <PreviewCard 
                                color={GlobalColors.red}
                                text="Orderan Dibatalkan"
                                route="order-cancel"
                                data={cancelOrders?.length}
                                total={order?.length}
                                isLoading={isLoading}  />
                        </div>
                    </DetailPreview>
                    <DetailPreview>
                        <h3 className="fw-bolder mb-4">/Sedang Berlangsung</h3>
                        {isLoading && <CircularProgress /> }                    
                            {!isLoading && active?.map((order) =>(
                            <OrderCardInfo 
                                key={order._id}
                                atasNama={order.atasNama} 
                                namaAcara={order.namaAcara} 
                                orderId={order._id}
                                tanggal={order.tanggal}
                                tipeOrder={order.tipeOrderan}
                                namaPaket={activePacket && activePacket[0]?.namaPaket}
                                jumlahPorsi={order.tipeOrderan === 'plain' ? '' : order.jumlahPorsi}
                                harga={order.tipeOrderan === 'plain' ? activePacket && activePacket[0]?.hargaAula : activePacket && (order?.jumlahPorsi * activePacket[0]?.detailCatering?.hargaPerBuah) + activePacket[0]?.hargaAula}
                                status={order.status}
                                email={order.email}
                                whatsapp={order.whatsapp}
                            />
                        ))}
                        {!isLoading && active?.length === 0 && 
                            <h3>Tidak ada order yang sedang berlangsung</h3>
                        }
                    </DetailPreview>
                </AdminStyledSection>
            </DashboardContainer>
        }  
        </>
    )
}

export default Dashboard;
