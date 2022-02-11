import { useEffect, useState } from "react";
import styled from 'styled-components';
import { CreateOutlined, DeleteOutlineOutlined } from '@mui/icons-material';

import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalMeasurements, GlobalColors, GlobalFonts } from '../globals';

const OrderCard = styled.div`
    border-radius: 20px;
    background: ${GlobalColors.hardGrey};
    padding: 18px;
    max-width: 100%;
    
    img {
        object-fit: cover;
        border-radius: 20px;
    }

    ${OrderCard.Text} {
        font-size: 1rem;
        
        p {
            margin: -3px 0;
            font-family: ${GlobalFonts.secondary};
        }
    }

    h2 {
        text-align: left;
        min-width: 150px;
        font-size: 1.5rem;
        color: ${GlobalColors.green};
    }    
`

const OrderCardTitle = styled.div`
    font-size: 2rem;
    font-family: ${GlobalFonts.primary};
`

const OrderCardComponent = ({ title, name, packet, price }) => {

    return (
        <OrderCard>
            <div className="Details">
                <h2>{title}</h2>
                <p>{name}</p>
                <p>{date}</p>
            </div>
            <div className="Information">
                <p>ORDER ANTREAN</p>
                <StyledLink>Informasi lainnya...</StyledLink>
            </div>
            <div className="Buttons">
                <StyledLink to="/admin/order-queue/:orderQueueId" >
                    <StyledButton 
                        variant="success"
                        background={GlobalColors.green}
                        borderRadius="15"
                        height="95"
                        fontSize="2">
                        <CreateOutlined />
                    </StyledButton>
                </StyledLink>
                <StyledButton 
                    variant="success"
                    background={GlobalColors.red}
                    borderRadius="15"
                    height="95"
                    fontSize="2">
                    <DeleteOutlineOutlined />
                </StyledButton>
            </div>
        </OrderCard>
    )
}

export default OrderCardComponent;
