import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import OrderCardComponent from '../../components/admin/OrderCardAdmin';

import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';
import DummmyImg from "./../../assets/img/dummy-img-2.png" 

import { AdminOrderContext } from "../../context/AdminOrderContext";

const OrderQueueContainer = styled.div`
    height: 100vh;
    font-family: ${GlobalFonts.secondary};
`;

export const DetailPreview = styled.div`
    margin: 0 0 50px 0;
    
    .DetailPreview {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 25px;
        margin: 50px 0 0 0;
    }
`

const OrderQueue = () => {
    const { isLoading, dispatch, order, packet } = useContext(AdminOrderContext);
    const [orderFuture, setOrderFuture] = useState([]);
    
    useEffect(() => {
        console.log(new Date());
        console.log(new Date(order[0]?.tanggal));
        
        for (let i=0; i < order?.length; i++) {
            if (new Date(order[i]?.tanggal) >= new Date()) {
                setOrderFuture([...orderFuture, order[i]]);
            }
        }
    }, [order, packet])

    return (
        <OrderQueueContainer>
            <StyledNavbarAdmin />
            <AdminStyledSection>
                <DetailPreview>
                    <h3 className="fw-bolder">/Order Antrean</h3>
                    <div className="DetailPreview">
                        {orderFuture && orderFuture?.map((order) => (
                            <OrderCardComponent
                                idPesanan={order._id}
                                atasNama={order.atasNama} 
                                namaAcara={order.namaAcara} 
                                orderId={order._id}
                                tanggal={order.tanggal}
                                status={order.status}
                                orderFuture={orderFuture} 
                                setOrderFuture={setOrderFuture} />
                        ))}
                    </div>
                </DetailPreview>
            </AdminStyledSection>
        </OrderQueueContainer>
    )
}

export default OrderQueue;
