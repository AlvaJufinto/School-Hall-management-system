import { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from 'styled-components';
// import {
import { useNavigate } from 'react-router';
import { CreateOutlined, DeleteOutlineOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalMeasurements, GlobalColors, GlobalFonts } from './../../globals';

import { adminDataApi } from "../../api/api";
import { AdminOrderContext } from "../../context/AdminOrderContext";

const OrderCard = styled.div`
    border-radius: 20px;
    color: white;
    background-color: ${GlobalColors.hardGrey};
    max-width: 400px;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .Details {
        padding: 20px;
        
        .id {
            word-break: break-all;
            white-space: normal;
        }
    }
    .Information {
        padding: 20px;
        
        p {
            margin: 0;
        }

        ${StyledLink} {
            font-family: ${GlobalFonts.secondary}
        }
    }


    h2 {
        text-align: left;
        /* min-width: 150px; */
        font-size: 1.5rem;
    }    

    .Buttons {
        padding: 0;
        width: 100%;
        display: flex;

        ${StyledButton}, ${StyledLink} {
            flex: 1;   
        }

        ${StyledLink} ${StyledButton} {
            width: 100%;
            border: none;
        }
    }

    @media (max-width: 1024px) {
        min-width: 100%;
    }
`

const OrderCardComponent = ({ idPesanan, idPaket, atasNama, namaAcara, tanggal, status, orderFuture, setOrderFuture }) => {
    const { dispatch, order, isLoading: deleteOrderIsLoading } = useContext(AdminOrderContext);
    let accessToken = localStorage.getItem("accessToken");

    const orderEditHandler = async (idPesanan) => {
        if(accessToken) {
            dispatch({ type: 'DELETE_ADMIN_ORDER_START'});
            try {
                const res = await adminDataApi.deleteOrder({ params: idPesanan, accessToken: accessToken });
                
                dispatch({ type: "DELETE_ADMIN_ORDER_SUCCESS", payload: idPesanan});
                setOrderFuture(orderFuture.filter((item) => item._id !== idPesanan));
            } catch(err) {
                dispatch({ type: 'DELETE_ADMIN_ORDER_FAILURE' });
            }
        }
    }

    return (
        <OrderCard>
        </OrderCard>
    )
}

export default OrderCardComponent;
