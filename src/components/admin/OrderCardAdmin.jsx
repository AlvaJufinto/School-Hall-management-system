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
    flex: 1;
    overflow: hidden;

    .Details {
        padding: 20px;
    }

    .Information {
        padding: 20px;
        
        p {
            margin: 0;

            span {
                color: ${GlobalColors.green};
            }
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

const OrderCardComponent = ({ title, name, packet, price, date }) => {

    return (
        <OrderCard>
            <div className="Details">
                <p>ID Pesanan : 532438929</p>
                <h2>Sosialisasi Bahaya Nyimeng Bagi Anak Lanjut Usia</h2>
                <p>PT. Anti Nyimeng Sedunia</p>
                <p>26/02/2021</p>
            </div>
            <div className="Information">
                <p>Status : <span>Lunas</span></p>
                <StyledLink className="link-primary" to="/admin/order-queue/:orderQueueId" >Informasi lainnya...</StyledLink>
            </div>
            <div className="Buttons">
                <StyledLink to="/admin/order-queue/:orderQueueId" >
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
                    fontSize="2">
                    <DeleteOutlineOutlined style={{ fontSize: '2rem' }} />
                </StyledButton>
            </div>
        </OrderCard>
    )
}

export default OrderCardComponent;
