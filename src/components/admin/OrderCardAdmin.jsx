import { useEffect, useState } from "react";
import styled from 'styled-components';
import { CreateOutlined, DeleteOutlineOutlined } from '@mui/icons-material';

import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalMeasurements, GlobalColors, GlobalFonts } from './../../globals';

const OrderCard = styled.div`
    border-radius: 20px;
    color: white;
    background-color: ${GlobalColors.hardGrey};
    max-width: 400px;
    /* width: 100%; */
    flex-grow: 1;
    overflow: hidden;
    
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
        min-width: 150px;
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

const OrderCardTitle = styled.div`
    font-size: 2rem;
    font-family: ${GlobalFonts.primary};
`

const OrderCardComponent = ({ idPesanan, atasNama, namaAcara, orderId, tanggal, status}) => {
    
    const orderDeleteHandler = (idPesanan) => {
        console.log(idPesanan);
    }

    return (
        <OrderCard>
            <div className="Details">
                <p class="id" >ID Pesanan : {idPesanan}</p>
                <h2>{namaAcara}</h2>
                <p>{atasNama}</p>
                <p>{tanggal.toString().slice(0, 10).split("-").reverse().join("-")}</p>
            </div>
            <div className="Information">
                <p>Status : <b style={{
                    color: status == 'order' ? GlobalColors.red : GlobalColors.green,
                }}>{status == 'order' ? 'BELUM LUNAS' : 'LUNAS' }</b></p>
                <StyledLink className="link-primary" 
                to={`/admin/order-queue/${idPesanan}`} >Informasi lainnya...</StyledLink>
            </div>
            <div className="Buttons">
                <StyledLink to={`/admin/order-queue/:${idPesanan}`} >
                    <StyledButton 
                        variant="success"
                        background={GlobalColors.green}
                        borderRadius="0"
                        // height="95"
                        fontSize="2">
                        <CreateOutlined style={{ fontSize: '2rem' }} />
                    </StyledButton>
                </StyledLink>
                <StyledButton 
                    variant="danger"
                    background={GlobalColors.red}
                    borderRadius="0"
                    // height="95"
                    fontSize="2"
                    data-id={idPesanan}
                    onClick={(e) => orderDeleteHandler(idPesanan)} >
                    <DeleteOutlineOutlined style={{ fontSize: '2rem' }} />
                </StyledButton>
            </div>
        </OrderCard>
    )
}

export default OrderCardComponent;
