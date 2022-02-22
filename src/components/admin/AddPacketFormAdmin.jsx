import { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { AddRounded, Check, Close } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import useDraggableScroll from 'use-draggable-scroll';

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import CardComponent from "./../../components/admin/PacketCardAdmin";
import { adminDataApi } from '../../api/api';
import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';

import { AdminOrderContext } from "../../context/AdminOrderContext";
import DummyImg from "./../../assets/img/dummy-img-1.png";
import DummyImgPlain from "./../../assets/img/dummy-img-3.png";
import BlankImg from "./../../assets/svg/blank-img.svg";


const AddForm = styled.form`
    height: 100%;
    width: 100%;

    img {
        width: 100%;
        object-fit: cover;
        border-radius: 20px;
        height: 300px;
    }

    .CardBody {
        margin: 20px 0;
        .NamaPaket, .Harga {
            font-family: ${GlobalFonts.primary};
            
        }
        
        .NamaPaket {
            font-size: 1.8rem;
        }

        .Deskripsi {
            margin: 10px 0;
            height: 100px;
        }

        .Harga {
            color: ${GlobalColors.green};
            font-size: 1.5rem;
        }

    }
`

const AddFormContainer = ({ setIsShowAdd }) => {
    const { isLoading: isAdminDataLoading, dispatch, packet } = useContext(AdminOrderContext);
    const [newPackets, setNewPackets] = useState(packet);
    let accessToken = localStorage.getItem("accessToken");
    
    const [namaPaket, setNamaPaket] = useState("");
    const [tipePaket, setTipePaket] = useState("plain"); 
    const [deskripsiPaket, setDeskripsiPaket] = useState("");
    const [spesifikasiPaket, setSpesifikasiPaket] = useState("");
    const [hargaAula, setHargaAula] = useState(0);
    const [hargaPaket, setHargaPaket] = useState(0);
    
    useEffect(() => {
        console.log("AAOKWOAKWOAWK")
        console.log(packet)
    }, [packet, newPackets])
    
    const AddPaketHandler = async (e) => {
        e.preventDefault();
        const detail = {
            paketPlain : tipePaket === "plain" ? true : false,
            namaPaket : namaPaket,
            hargaAula : Number(hargaAula),
            deskripsi : deskripsiPaket ? deskripsiPaket : "kosong",
            detailCatering : {
                gambar: "GambarAja",
                hargaPerBuah : tipePaket === "plain" ? "" : Number(hargaPaket),
                detailPaketCatering : spesifikasiPaket ? spesifikasiPaket.replace(/\s/g, '').split(',') : "",
            }
        } 

        if(accessToken) {
            dispatch({ type: "ADD_ADMIN_PACKET_START" })
            try {
                console.log(detail)
                const res = await adminDataApi.addPacket({ accessToken: accessToken }, detail); 
                
                console.log(res);
                dispatch({ type: "ADD_ADMIN_PACKET_SUCCESS", payload: res.data.data })
            } catch (err) {
                console.log(err.response);
                dispatch({ type: "ADD_ADMIN_PACKET_FAILURE", payload: err.response })
            }
        }
    }

    return (
        <AddForm onSubmit={e => AddPaketHandler(e)} >
            <img variant="top" src={BlankImg} />
                <div className="CardBody">
                    <Form.Control 
                        variant="success"
                        type="text"
                        placeholder="Nama Paket"
                        className="NamaPaket"
                        value={namaPaket}
                        onChange={e => setNamaPaket(e.target.value)}
                        required />
                    <Form.Select className="mt-3" onChange={e => setTipePaket(e.target.value)}  aria-label="Floating label select example">
                        <option 
                            value="plain">Tanpa Catering</option>
                        <option 
                            value="order">Paket Catering</option>
                    </Form.Select>
                    {tipePaket === 'order' ?
                        <Form.Control 
                            as="textarea" 
                            value={spesifikasiPaket}
                            onChange={e => setSpesifikasiPaket(e.target.value)}
                            className="Deskripsi"
                            placeholder="Spesifikasi paket (Pisahkan tiap paket dengan koma (,))" 
                            required />
                        :
                        <Form.Control 
                            as="textarea"
                            value={deskripsiPaket}
                            onChange={e => setDeskripsiPaket(e.target.value)} 
                            className="Deskripsi"
                            placeholder="Deskripsi Aula" 
                            required />
                        }
                    <InputGroup className="mb-3">
                        <InputGroup.Text className="Harga">Rp. </InputGroup.Text>
                        <FormControl 
                            variant="info"
                            type="text"
                            value={hargaAula}
                            onChange={e => setHargaAula(e.target.value.replace(/[.,\s]/g, ""))}
                            className="Harga"
                            type="number"
                            min='0'
                            placeholder="Harga Aula"
                            required />
                    </InputGroup>
                    { tipePaket === 'order' &&
                        <InputGroup className="mb-3">
                            <InputGroup.Text className="Harga">Rp. </InputGroup.Text>
                            <FormControl 
                                variant="info"
                                type="text"
                                value={hargaPaket}
                                onChange={e => setHargaPaket(e.target.value.replace(/[.,\s]/g, ""))}
                                type="number"
                                min='0'
                                className="Harga"
                                placeholder="Harga paket"
                                required />
                            <InputGroup.Text className="Harga">/Orang</InputGroup.Text> 
                        </InputGroup>
                    }
                </div> 
                <StyledButton 
                    variant="success"
                    onClick=""
                    background={GlobalColors.green}
                    borderRadius="20"
                    height="50"
                    className="mr-3"
                    type="submit"
                    disabled={isAdminDataLoading}>
                    { isAdminDataLoading && <CircularProgress style={{
                        color: 'white'
                    }} /> }
                    { !isAdminDataLoading && 
                        <Check style={{ fontSize: '2rem' }} />
                    }
                </StyledButton>
                <StyledButton 
                    variant="danger"
                    onClick={() => setIsShowAdd(false)}
                    background={GlobalColors.red}
                    borderRadius="20"
                    height="50"
                    disabled={isAdminDataLoading}>
                    { isAdminDataLoading && <CircularProgress style={{
                        color: 'white'
                    }} /> }
                    { !isAdminDataLoading && 
                        <Close style={{ fontSize: '2rem' }} />
                    }   
                </StyledButton>
        </AddForm>

    )
}

export default AddFormContainer;
