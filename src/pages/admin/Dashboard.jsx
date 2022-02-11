import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import useDraggableScroll from 'use-draggable-scroll';

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';

import { AuthContext } from "./../../context/Auth/AuthContext";
import api from "./../../api/auth";
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
    const { isLoading, dispatch, user } = useContext(AuthContext);
    
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
                    <h3 className="fw-bolder">/Active</h3>
                </DetailPreview>
            </AdminStyledSection>
        </DashboardContainer>
    )
}

export default Dashboard;
