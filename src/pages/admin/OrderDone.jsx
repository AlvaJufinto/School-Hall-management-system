import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import OrderCardComponent from '../../components/admin/OrderCardAdmin';

import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';
import DummmyImg from "./../../assets/img/dummy-img-2.png" 

import { AdminOrderContext } from "../../context/AdminOrderContext";

const OrderDoneContainer = styled.div`
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

const OrderDone = () => {
    const { isLoading, dispatch, order, packet } = useContext(AdminOrderContext);
    const [orderDone, setOrderDone] = useState([]);
    
    useEffect(() => {
        setOrderDone(order.filter((item) => item.status === 'selesai'));
    }, [order]);

    return (
        <OrderDoneContainer>
            <StyledNavbarAdmin />
            <AdminStyledSection>
                <DetailPreview>
                    <h3 className="fw-bolder">/Order Selesai</h3>
                    <div className="DetailPreview">
                        {orderDone && orderDone.map((order) => (
                            <OrderCardComponent
                                key={order._id}
                                idPesanan={order._id}
                                idPaket={order.paketId}
                                atasNama={order.atasNama} 
                                namaAcara={order.namaAcara} 
                                orderId={order._id}
                                tanggal={order.tanggal}
                                status={order.status}
                                OrderDone={orderDone} 
                                setOrderDone={setOrderDone} />
                        ))}
                        {!isLoading && !orderDone && 
                            <h3 style={{
                                alignSelf: 'flex-start'
                            }}>Tidak ada order yang sudah selesai</h3>
                        }
                    </div>
                </DetailPreview>
            </AdminStyledSection>
        </OrderDoneContainer>
    )
}

export default OrderDone;
