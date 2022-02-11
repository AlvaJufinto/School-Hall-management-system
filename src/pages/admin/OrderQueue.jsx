import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';

import { AuthContext } from "./../../context/Auth/AuthContext";

const OrderQueueContainer = styled.div`
    height: 100vh;
    font-family: ${GlobalFonts.secondary};
`;

export const DetailPreview = styled.div`
    margin: 0 0 50px 0;
`

const OrderQueue = () => {
    const { isLoading, dispatch, user } = useContext(AuthContext);
    
    const PreviewCard = () => {
        return (
            <StyledLink to="/" >
                
            </StyledLink>
        )
    }

    return (
        <OrderQueueContainer>
            <StyledNavbarAdmin />
            <AdminStyledSection>
                <DetailPreview>
                    <h3 className="fw-bolder">/Order-Antrean</h3>
                    <div className="DetailPreview">
                    </div>
                </DetailPreview>
            </AdminStyledSection>
        </OrderQueueContainer>
    )
}

export default OrderQueue;
