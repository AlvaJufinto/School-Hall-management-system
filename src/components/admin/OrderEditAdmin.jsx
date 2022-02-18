import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { CreateOutlined, DeleteOutlineOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalMeasurements, GlobalColors, GlobalFonts } from './../../globals';

import { adminDataApi } from "../../api/api";
import { AdminOrderContext } from "../../context/AdminOrderContext";

const OrderEditFormContainer = styled.form`
    font-family: ${GlobalFonts.secondary};
    
    .Buttons {
        width: 250px;
        display: flex;
        gap: 20px;
        height: 50px;

        ${StyledButton} {
            flex: 1;
            height: 100%;
        }
    }
`

const OrderEditFormComponent = ({ setShowModal }) => {
    const { isLoading: orderIsLoading, dispatch, order, packet } = useContext(AdminOrderContext);
    let accessToken = localStorage.getItem("accessToken");

    const atasNama = useRef();
    const namaAcara = useRef();
    const email = useRef();
    const whatsapp = useRef();

    const orderEditHandler = async () => {
        if(accessToken) {
            dispatch({ type: 'EDIT_ADMIN_ORDER_START'});
            try {
                // const res = await adminDataApi.editOrder({ params: idPesanan, accessToken: accessToken });
                
                // dispatch({ type: "EDIT_ADMIN_ORDER_SUCCESS", payload: idPesanan});
            } catch(err) {
                dispatch({ type: 'EDIT_ADMIN_ORDER_FAILURE' });
            }
        }
    }

    return (
        <OrderEditFormContainer>
            <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Label>Atas Nama</Form.Label>
                <Form.Control 
                    type="text"
                    name="atasNama"
                    ref={atasNama}
                    required />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Nama Acara</Form.Label>
                <Form.Control 
                    type="text"
                    name="namaAcara"
                    ref={namaAcara}
                    required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email"
                    name="email"
                    ref={email} 
                    required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>No. Whatsapp</Form.Label>
                <Form.Control 
                    type="number" 
                    min="30"
                    name="whatsapp"
                    ref={whatsapp} 
                    pattern="/^+91(7\d|8\d|9\d)\d{9}$/"
                    required />
            </Form.Group>
            {/* {!packet?.paketPlain && <Form.Group className="mb-3">
                <Form.Label>Jumlah porsi</Form.Label>
                <Form.Control 
                    type="number"
                    name="jumlahPorsi"
                    value={portion}
                    onChange={e => {
                        setPortion(e.currentTarget.value);
                    }}
                    pattern="[0-9]"
                    required />
            </Form.Group> } */}
            {/* <Form.Group className="mb-3" >
                <Form.Label>Pilih tanggal</Form.Label>
                <DatePicker 
                    type="date"
                    name="tanggal"
                    selected={startDate}
                    minDate={new Date()}
                    onChange={(date) => {
                        setStartDate(date);
                                    }} 
                    required/>
            </Form.Group> */}
            <div className="Buttons">
                <StyledButton 
                    color={GlobalColors.white}
                    background={GlobalColors.green}
                    variant="success"
                    fontSize="1.25"
                    borderRadius="20"
                    type="submit" 
                    disabled={orderIsLoading}>
                    {orderIsLoading ? <CircularProgress style={{
                        color: 'white',
                    }} /> : "Edit"}
                </StyledButton>
                <StyledButton 
                    color={GlobalColors.white}
                    background={GlobalColors.red}
                    variant="danger"
                    fontSize="1.25"
                    borderRadius="20"
                    type="submit" 
                    disabled={orderIsLoading}
                    onClick={() => setShowModal(false)}>
                    {orderIsLoading ? <CircularProgress style={{
                        color: 'white',
                    }} /> : "Cancel"}
                </StyledButton>
            </div>
        </OrderEditFormContainer>
    )
}

export default OrderEditFormComponent;
