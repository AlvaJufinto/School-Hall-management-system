import { useEffect, useState } from "react";
import styled from 'styled-components';
import { CreateOutlined, DeleteOutlineOutlined, MailOutlineRounded } from '@mui/icons-material';

import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalMeasurements, GlobalColors, GlobalFonts } from './../../globals';

import WhatsappIcon from "./../../assets/svg/Whatsapp-icon.svg";

const OrderCard = styled.div`
    padding: 30px 20px;
    margin: 0 0 50px 0;
    border-radius: 20px;
    color: white;
    background-color: ${GlobalColors.hardGrey};
    max-width: 800px;
    flex: 1;
    overflow: hidden;

    .Informations {
        margin: 30px 0;

        .information {
            margin: 20px 0;
            display: flex;
            justify-content: space-between;

            .info:nth-child(2) {
                text-align: right;
            }

            p {
                text-transform: capitalize;
                word-break: break-all;
        white-space: normal;
            }
        }
    }

    .email {
        display: flex;
        align-items: center;
        gap: 20px;
        margin: 0 0 20px 0;
        font-size: 1.25rem;
        word-break: break-all;
        white-space: normal;
    }

    a ${StyledButton} {
        width: 100%;   
    }
`

const OrderCardComponent = ({ atasNama, namaAcara, orderId, tanggal, tipeOrder, namaPaket, jumlahPorsi, harga, status, email, whatsapp }) => {

    return (
        <OrderCard>
            <div className="Details">
                <p>{atasNama}</p>
                <h2>{namaAcara}</h2>
            </div>
            <div className="Informations">
                <h5>Detail Pesanan : </h5>
                
                <div className="information">
                    <div className="info">
                        <p>Id Pesanan :</p>
                        <p>Tanggal : </p>
                        <p>Paket : </p>
                        {jumlahPorsi !== '' && <p>Jumlah Porsi : </p>}
                        <p>Harga :</p>
                        <p>Status : </p>
                    </div>
                    <div className="info">
                        <p>{orderId}</p>
                        <p>{tanggal?.toString().slice(0, 10).split("-").reverse().join("-")}</p>
                        <p>{namaPaket}</p>
                        <p>{jumlahPorsi}</p>
                        <p>Rp. {harga?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                        <p style={{
                            color: status === 'paid' ? GlobalColors.green : GlobalColors.red
                        }}><b>{status === 'paid' ? 'LUNAS' : 'BELUM LUNAS' }</b></p>
                    </div>
                </div>
            </div>
            <div className="email">
                <MailOutlineRounded style={{ 
                    fontSize: '3rem',
                }} />
                {email}
            </div>
            <a className="w-100 buttonWrapper" target="_blank" href={`https://api.whatsapp.com/send?phone=${whatsapp}&text=Saya%20mau%20tanya%20tentang%20PKI?`}>
                <StyledButton 
                    variant="success"
                    background={GlobalColors.green}
                    borderRadius="15"
                    height="55"
                    fontSize="1">
                        WhatsApp
                </StyledButton>
            </a>
        </OrderCard>
    )
}

export default OrderCardComponent;
