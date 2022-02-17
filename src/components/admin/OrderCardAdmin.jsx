import { useEffect, useState, useContext } from "react";
import styled from 'styled-components';
import { CreateOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
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
    /* width: 100%; */
    flex-grow: 1;
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
`

const OrderCardComponent = ({ idPesanan, atasNama, namaAcara, tanggal, status, orderFuture, setOrderFuture }) => {
    const { dispatch, order, isLoading: deleteOrderIsLoading } = useContext(AdminOrderContext);
    let accessToken = localStorage.getItem("accessToken");

    const orderDeleteHandler = async (idPesanan) => {
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
            <div className="Details">
                <p className="id">Id Pesanan : {idPesanan}</p>
                <h2>{namaAcara}</h2>
                <p>{atasNama}</p>
                <p>{tanggal.toString().slice(0, 10).split("-").reverse().join("-")}</p>
            </div>
            <div className="Information">
                <p>Status : <b style={{
                        textTransform: 'uppercase',
                        color: status === 'paid' || status === 'selesai' ? GlobalColors.green : GlobalColors.red
                    }}>{status}</b></p>
                <StyledLink className="link-primary" 
                to={`/admin/order/${idPesanan}`} >Informasi lainnya...</StyledLink>
            </div>
            <div className="Buttons">
                <StyledLink to={`/admin/order/${idPesanan}`} >
                    <StyledButton 
                        variant="success"
                        background={GlobalColors.green}
                        borderRadius="0"
                        fontSize="2">
                        <CreateOutlined style={{ fontSize: '2rem' }} />
                    </StyledButton>
                </StyledLink>
                <StyledButton 
                    variant="danger"
                    background={GlobalColors.red}
                    borderRadius="0"
                    fontSize="2"
                    data-id={idPesanan}
                    onClick={(e) => orderDeleteHandler(idPesanan)} >
                    { deleteOrderIsLoading && <CircularProgress style={{
                        color: 'white'
                    }} /> }
                    { !deleteOrderIsLoading && 
                        <DeleteOutlineOutlined style={{ fontSize: '2rem' }} />
                    }
                </StyledButton>
            </div>
        </OrderCard>
    )
}

export default OrderCardComponent;
