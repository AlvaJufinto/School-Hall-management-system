import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { CreateOutlined, DeleteOutlineOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalMeasurements, GlobalColors, GlobalFonts } from './../../globals';

import { adminDataApi } from "../../api/api";
import { AdminOrderContext } from "../../context/AdminOrderContext";

import 'bootstrap/dist/css/bootstrap.min.css';

const OrderEditFormContainer = styled.form`
    font-family: ${GlobalFonts.secondary};
    
    ${Form.Group} {
        text-transform: capitalize;
    }

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

const OrderEditFormComponent = ({ id, atasNama: atasNamaDefault, namaAcara: namaAcaraDefault, tanggal, activePacket, jumlahPorsi: jumlahPorsiDefault, whatsapp: whatsappDefault, email: emailDefault, setShowModal, status: statusDefault }) => {
    const { isLoading: orderIsLoading, dispatch, order, packet } = useContext(AdminOrderContext);

    const [packetDropdownValue, setPacketDropdownValue] = useState(`${activePacket[0]?.namaPaket}-${activePacket[0]?._id}-${activePacket[0]?.paketPlain}`);
    const [packetDropdownId, setPacketDropdownId] = useState(packetDropdownValue.split('-')[1]);
    const [isPlain, setIsPlain] = useState(activePacket[0]?.paketPlain)
    const accessToken = localStorage.getItem('accessToken');    
    
    const [startDate, setStartDate] = useState(new Date(tanggal));
    const [portion, setPortion] = useState(jumlahPorsiDefault ? jumlahPorsiDefault : 30);
    const [atasNama, setAtasNama] = useState(atasNamaDefault);
    const [namaAcara, setNamaAcara] = useState(namaAcaraDefault);
    const [email, setEmail] = useState(emailDefault);
    const [whatsapp, setWhatsapp] = useState(whatsappDefault);
    const [status, setStatus] = useState(statusDefault);

    useEffect(() => {
        setPacketDropdownId(packetDropdownValue.split("-")[1]);
        setIsPlain(packetDropdownValue.split("-")[2] == "true" ? true : false);
        console.log(accessToken);
    }, [packetDropdownValue, packetDropdownId, isPlain, order, dispatch])
    
    useEffect(() => {
        if(portion < 30) {
            setPortion(30)
        }
    }, [portion])

    const orderEditHandler = async (e) => {
        e.preventDefault()
        const detail = {
            _id: id,
            namaAcara: namaAcara, 
            paketId: packetDropdownId,
            tipeOrderan: isPlain ? 'plain' : 'paket',
            atasNama: atasNama, 
            email: email,  
            whatsapp: whatsapp, 
            jumlahPorsi: isPlain ? null : portion,
            tanggal: startDate.toISOString(),
            status: status,
        }

        
        if(accessToken) {
            dispatch({ type: 'EDIT_ADMIN_ORDER_START' });
            try {
                const res = await adminDataApi.editOrder({ params: id, accessToken: accessToken }, detail);

                const findIndex = order.findIndex(obj => obj._id === id);
                let newOrders = order.filter((item) => item._id !== id);
                newOrders.splice(findIndex, 0, detail);
                
                dispatch({ type: "EDIT_ADMIN_ORDER_SUCCESS", payload: newOrders });
                setShowModal(false);
            } catch(err) {
                console.log(err.response.data);
                console.log(err.response.data);
                console.error("asdasd")
                dispatch({ type: 'EDIT_ADMIN_ORDER_FAILURE' });
            }
        }
    }

    return (
        <OrderEditFormContainer onSubmit={e => orderEditHandler(e)} >
            <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Label>Atas Nama</Form.Label>
                <Form.Control 
                    type="text"
                    name="atasNama"
                    value={atasNama}
                    onChange={e => setAtasNama(e.target.value)}
                    required />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Nama Acara</Form.Label>
                <Form.Control 
                    type="text"
                    name="namaAcara"
                    value={namaAcara}
                    onChange={e => setNamaAcara(e.target.value)}
                    required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                    required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>No. Whatsapp</Form.Label>
                <Form.Control 
                    type="number" 
                    name="whatsapp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    pattern="/^+62(7\d|8\d|9\d)\d{9}$/"
                    required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Pilih Paket</Form.Label>
                <DropdownButton 
                    id="dropdown-basic-button" 
                    variant={"dark"}
                    title={`${packetDropdownValue.split("-")[0]} ${' '}`}
                    onSelect={e => {
                        setPacketDropdownValue(e);
                        setIsPlain(e)
                        console.log(e);
                    }}>
                    {packet.map(packet =>(
                        <Dropdown.Item eventKey={`${packet?.namaPaket}-${packet?._id}-${packet?.paketPlain}`}>{packet.namaPaket}</Dropdown.Item>
                    ))}
                        
                </DropdownButton>
            </Form.Group>
            {isPlain === false && <Form.Group className="mb-3">
                <Form.Label>Jumlah porsi</Form.Label>
                <Form.Control 
                    type="number"
                    name="jumlahPorsi"
                    min="30"
                    value={portion}
                    onChange={e => {
                        setPortion(e.currentTarget.value);
                    }}
                    pattern="[0-9]"
                    required />
            </Form.Group> }
            <Form.Group className="mb-3" >
                <Form.Label>Pilih tanggal</Form.Label>
                <DatePicker 
                    type="date"
                    name="tanggal"
                    selected={startDate}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setStartDate(date);
                        console.log(date.toISOString())
                    }} 
                    required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Pilih status</Form.Label>
                <DropdownButton 
                    id="dropdown-basic-button" 
                    variant={"dark"}
                    title={status}
                    onSelect={e => {
                        setStatus(e)
                        console.log(e);
                    }}>
                        <Dropdown.Item eventKey="order">Order</Dropdown.Item>
                        <Dropdown.Item eventKey="paid">Paid</Dropdown.Item>
                </DropdownButton>
            </Form.Group>
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
