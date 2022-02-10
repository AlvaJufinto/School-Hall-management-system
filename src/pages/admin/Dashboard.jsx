import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

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

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT_START", payload: user });
        try {
            let refreshToken = localStorage.getItem("refreshToken");

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            await api.logout(refreshToken);
            dispatch({ type: "LOGOUT_SUCCESS" });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <DashboardContainer>
            <p>ini dashboard bang awkoakwoawk</p>
            <p>yang lagi login sekarang ni <b>{user && user.username}</b></p>
            <StyledButton 
                variant="danger"
                color={GlobalColors.white}
                background={GlobalColors.red}
                fontSize="1"
                borderRadius="15"
                type="submit"
                onClick={handleLogout}>
                    {isLoading ? <CircularProgress color="inherit" /> : "Logout Ngab"}
            </StyledButton>
        </DashboardContainer>
    )
}

export default Dashboard;
