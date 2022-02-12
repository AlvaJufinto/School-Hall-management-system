import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import OrderCardComponent from '../../components/admin/OrderCardAdmin';

import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';
import DummmyImg from "./../../assets/img/dummy-img-2.png" 

import { AuthContext } from "../../context/AuthContext";

const OrderQueueContainer = styled.div`
    height: 100vh;
    font-family: ${GlobalFonts.secondary};
`;

export const DetailPreview = styled.div`
    margin: 0 0 50px 0;

    .DetailPreview {
        margin: 50px 0 0 0;
    }
`

const OrderQueue = () => {
    const { isLoading, dispatch, user } = useContext(AuthContext);
    
    return (
        <OrderQueueContainer>
            <StyledNavbarAdmin />
            <AdminStyledSection>
                <DetailPreview>
                    <h3 className="fw-bolder">/Order Antrean</h3>
                    <div className="DetailPreview">
                        <OrderCardComponent />
                    </div>
                </DetailPreview>
            </AdminStyledSection>
        </OrderQueueContainer>
    )
}

export default OrderQueue;
