import { useContext, useEffect, useState, useRef } from "react"
import DatePicker from "react-datepicker";
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import { Form } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router';

import { clientDataApi } from "./../../api/api";
import StyledNavbar from "../../components/Navbar";
import CardComponent from "../../components/Cards";
import BankComponent from "../../components/BankComponent";
import Footer from "../../components/Footer";

import { StyledSection, StyledTitle, StyledButton, StyledLink } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalFonts, GlobalColors } from '../../globals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

import DummyImg from "./../../assets/img/dummy-img-1.png";
import DummyImgPlain from "./../../assets/img/dummy-img-3.png";

const StyledForm = styled.form`
    padding: 0px 20px 100px 20px;

    .TopForm {
        /* background: violet; */
        display: flex;
        gap: 50px;
        justify-content: center;
        align-items: flex-start;

        .FormGroups {
            color: black;
            font-family: ${GlobalFonts.secondary};
    
            ${Form.Group} {
                font-weight: 500;
            }
        }
    }
    
    .BottomForm {
        /* background: salmon; */
        margin: 50px 0 0 0;
        color: black;
        width: 100%;
        min-height: 200px;
        display: flex;
        justify-content: center;
        gap: 50px;

        .Buttons {
            max-width: 300px;
            width: 30%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 20px;
            /* background: lightgreen; */

            ${StyledButton} {
                
            }
        }

        .Details {
            /* background: lightblue; */
            display: flex;
            flex-direction: column;
            max-width: 650px;
            flex: 1;

            .Detail {
                /* background: red; */
                display: flex;
                justify-content: space-between;
                font-size: 1.5rem;
                
            }
            .Total {
                color: ${GlobalColors.green};
            }
        }
    }

    @media (max-width: 768px) {
        .TopForm {
            flex-direction: column;
            align-items: center;
        } 

        .BottomForm {
            justify-content: flex-end;
            align-items: center;
            flex-direction: column-reverse;
            gap: 20px;
            
            .Buttons {
                max-width: 300px;
                width: 100%;
            }

            .Details {
                margin: 20px 0px;
                width: 100%;
            }
        }
    }

`

const FormOrder = () => {
    const packetId = useParams();
    let navigate = useNavigate();
    const [packet, setPacket]  = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    const [validated, setValidated] = useState(false);
    const [roomPrice, setRoomPrice] = useState(0);
    const [onePortion, setOnePortion] = useState(0);
    const [portion, setPortion] = useState(30);
    const [portionPrice, setPortionPrice] = useState(0);
    const [discount, setDiscount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0);

    const atasNama = useRef();
    const namaAcara = useRef();
    const email = useRef();
    const whatsapp = useRef();


    useEffect(() => {
        (async () => {
            try {
                const res = await clientDataApi.packet({ params: packetId.packetId });
                
                setPacket(res.data.data) 
                setOnePortion(packet?.paketPlain ? 0 : packet?.detailCatering?.hargaPerBuah)
                setRoomPrice(packet?.hargaAula);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [onePortion, roomPrice, totalPrice]);
    
    const orderHandler = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(!isLoading);
            const detail = {
                atasNama: atasNama.current.value, 
                namaAcara: namaAcara.current.value, 
                email: email.current.value, 
                whatsapp: whatsapp.current.value, 
                jumlahPorsi: portion, 
                tanggal: startDate,
            }
            const res = await clientDataApi.addOrder({ params: packetId.packetId}, detail);
            console.log(res.data.detailPesanan._id);
            navigate(`/receipt/${res.data.detailPesanan._id}`, { replace: true });
            
        } catch (err) {
            setIsLoading(!isLoading)
            console.log(err);
        }
    }

    useEffect(() => {
        if(portion < 30) {
            setPortion(30);
        }

        setPortionPrice(portion * onePortion);
        setTotalPrice(roomPrice + portionPrice - discount)
    }, [portion, onePortion, roomPrice, portionPrice, discount])
    
    return (
        <>
            <StyledNavbar />
            <StyledSection >
                <StyledTitle style={{
                    textDecoration: 'underline',
                    textAlign: 'center',
                    margin: '0 0 70px 0',
                }} >Formulir pemesanan aula</StyledTitle>
                <StyledForm onSubmit={orderHandler} >
                    <div className="TopForm">
                        {!packet && <CircularProgress /> }                        
                        {packet && <CardComponent 
                            packetPlain={packet?.paketPlain}
                            image={packet?.paketPlain ? DummyImgPlain : DummyImg} 
                            title={packet?.namaPaket}
                            packet={!packet.paketPlain && packet.detailCatering.detailPaketCatering}
                            price={!packet.paketPlain ? packet.detailCatering.hargaPerBuah : '0'}
                            cardVariant="small"
                            className="h-100"
                        />}
                        <div className="FormGroups">
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
                            {!packet?.paketPlain && <Form.Group className="mb-3">
                                <Form.Label>Jumlah porsi</Form.Label>
                                <Form.Control 
                                    type="number"
                                    name="jumlahPorsi"
                                    // ref={jumlahPorsi} 
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
                                    onChange={(date, e) => {
                                        setStartDate(date);
                                    }} />
                            </Form.Group>
                            <p className="text-danger fw-bolder">*Pastikan formulir diisi dengan benar </p>
                        </div>
                        <BankComponent />
                    </div>
                    <div className="BottomForm">
                        <div className="Buttons">
                            <StyledButton 
                                color={GlobalColors.white}
                                background={GlobalColors.violet}
                                fontSize="1.5"
                                borderRadius="15"
                                type="submit" 
                                disabled={isLoading}>
                                    {isLoading ? <CircularProgress style={{
                                        color: 'white',
                                    }} /> : "Buat Pesanan"}
                            </StyledButton>
                            
                            <StyledLink to="/">
                                <StyledButton 
                                    variant="outline-secondary"
                                    color={GlobalColors.hardGrey}
                                    border={`2px solid ${GlobalColors.hardGrey}`}
                                    fontSize="1.5"
                                    borderRadius="15" style={{
                                        width: "100%",
                                    }}
                                    disabled={isLoading}>
                                        Kembali
                                </StyledButton>
                            </StyledLink>
                        </div>
                        <div className="Details">
                            <h1>Detail Pembayaran</h1>
                            <div className="Detail">
                                <p>Harga Sewa Aula</p>
                                <p>Rp. {isNaN(roomPrice) ? 0 : roomPrice?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                            </div>
                            <div className="Detail">
                                <p>Harga Paket Katering</p>
                                <p>Rp. {isNaN(portionPrice) ? 0 : portionPrice?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                            </div>
                            <div className="Detail">
                                <p>Diskon</p>
                                <p>Rp. {isNaN(discount) ? 0 : discount?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                            </div>
                            <div className="Detail">
                                <p>Total Transfer</p>
                                <p className="Total" >Rp. {isNaN(totalPrice) ? 0 : totalPrice?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </p>
                            </div>
                        </div>
                    </div>
                </StyledForm>
                
            </StyledSection>
            <Footer />
        </>
    )
}

export default FormOrder;
