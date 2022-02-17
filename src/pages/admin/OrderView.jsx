import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";

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
    const [viewOrder, setViewOrder] = useState(null);
    const [status, setStatus] = useState(null);

    const { orderId } = useParams();

    useEffect(() => {
        for(let i = 0; i < order?.length; i++) {
            if(order[i]?._id === orderId) {
                setViewOrder(order[i]);
                console.log(order[i]);
            }
        }
        
        console.log(viewOrder)
    }, [order, packet]);

    useEffect(() => {
        if(new Date(viewOrder?.tanggal) < new Date() && order?.status == 'paid') {
            setStatus('selesai');
        } else if(new Date(viewOrder?.tanggal) > new Date() && order?.status === 'paid') {
            setStatus(order?.status);
        } else if(new Date(viewOrder?.tanggal) < new Date() && order?.status == 'order') {
            setStatus(order?.status);
        }
    }, [viewOrder, status, order]);
    
    return (
        <OrderDoneContainer>
            <StyledNavbarAdmin />
            <AdminStyledSection>
                <DetailPreview>
                    <h3 className="fw-bolder">/Order - {status && status}</h3>
                    
                </DetailPreview>
            </AdminStyledSection>
        </OrderDoneContainer>
    )
}

export default OrderDone;
