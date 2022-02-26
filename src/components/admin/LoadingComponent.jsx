import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { CreateOutlined, Check, Close } from '@mui/icons-material';
import { CircularProgress, LinearProgress } from '@mui/material';
import useDraggableScroll from 'use-draggable-scroll';

import { adminDataApi } from '../../api/api';
import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';
import { AuthContext } from "../../context/AuthContext";
import { AdminOrderContext } from "../../context/AdminOrderContext";

const LoadingContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: ${GlobalColors.hardGrey};
    font-family: ${GlobalFonts.primary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 10rem;

    h1 {
        font-size: 2.5rem;
        color: white;
    }
    
    h2 {
        font-size: 2rem;
        color: ${GlobalColors.green};
    }

    p {
        color: white;
        font-family: ${GlobalFonts.secondary}
    }

    @media (max-width: 768px) {
        padding: 1rem;
    }
`

const LoadingComponent = () => {
    const { isLoading, dispatch, user } = useContext(AuthContext);

    return ( 
        <LoadingContainer>
            <h1>Sewa Aula SIJA</h1>
            <h2>{user.role ? user.role : 'unknown'}</h2>
            <p>Tip : Jika loading terlalu lama, solusinya adalah merefresh halaman atau mengecek koneksi internet Anda!</p>
            <LinearProgress />
        </LoadingContainer>
     );
}
 
export default LoadingComponent;