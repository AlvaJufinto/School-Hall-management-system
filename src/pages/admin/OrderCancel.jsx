import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import OrderCardComponent from '../../components/admin/OrderCardAdmin';

import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';
import DummmyImg from "./../../assets/img/dummy-img-2.png"

import { AdminOrderContext } from "../../context/AdminOrderContext";

const OrderCancelContainer = styled.div`
    font-family: ${GlobalFonts.secondary};
`;

export const DetailPreview = styled.div`
    margin: 0 0 50px 0;
    
    .DetailPreview {
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
        margin: 50px 0 50px 0;
    }
`

const OrderCancel = () => {
    const { isLoading, dispatch, order, packet } = useContext(AdminOrderContext);
    const [orderCancel, setOrderCancel] = useState([]);

    useEffect(() => {
        setOrderCancel(order.filter((item) => item.status === 'batal'));
    }, [order]);

    return (
        <OrderCancelContainer>
            <StyledNavbarAdmin />
            <AdminStyledSection>
                <DetailPreview>
                    <h3 className="fw-bolder">/Order Batal</h3>
                    <div className="DetailPreview">
                        {orderCancel && orderCancel.map((order) => (
                            <OrderCardComponent
                                key={order._id}
                                idPesanan={order._id}
                                idPaket={order.paketId}
                                atasNama={order.atasNama}
                                namaAcara={order.namaAcara}
                                orderId={order._id}
                                tanggal={order.tanggal}
                                status={order.status}
                                OrderCancel={orderCancel}
                                setOrderCancel={setOrderCancel} />
                        ))}
                        {!isLoading && orderCancel.length === 0 &&
                            <h3 style={{
                                alignSelf: 'flex-start'
                            }}>Tidak ada order yang sudah selesai</h3>
                        }
                    </div>
                </DetailPreview>
            </AdminStyledSection>
        </OrderCancelContainer>
    )
}

export default OrderCancel;
