import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';

import { StyledButton } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalColors, GlobalFonts } from "../../globals";

import { AuthContext } from "./../../context/Auth/AuthContext";
import api from "./../../api/auth";

const DashboardContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${GlobalColors.grey};
    font-family: ${GlobalFonts.secondary};
`;

const Dashboard = () => {
    const { display, isLoading, dispatch, errorMessage, user } = useContext(AuthContext);
    
    return (
        <DashboardContainer>
            <p>ini dashboard bang awkoakwoawk</p>
            <p>yang lagi login sekarang ni <b>{user.username}</b></p>

        </DashboardContainer>
    )
}

export default Dashboard;
