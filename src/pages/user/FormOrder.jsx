import { useContext, useEffect, useState } from "react"
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import { Form } from "react-bootstrap";
import { useParams } from 'react-router';

import { clientDataApi } from "./../../api/api";
import StyledNavbar from "../../components/Navbar";
import CardComponent from "../../components/Cards";
import BankComponent from "../../components/BankComponent";
import Footer from "../../components/Footer";

import DummyImg from "./../../assets/img/dummy-img-1.png";
import { StyledSection, StyledTitle, StyledButton, StyledLink } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalFonts, GlobalColors } from '../../globals';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    const [packet, setPacket]  = useState();
    const [error, setError] = useState(null) 
    
    const [validated, setValidated] = useState(false);
    const [roomPrice, setRoomPrice] = useState(0);
    const [onePortion, setOnePortion] = useState(0);
    const [portion, setPortion] = useState(1);
    const [portionPrice, setPortionPrice] = useState(0);
    const [discount, setDiscount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0);
    
    useEffect(() => {
        (async () => {
            try {
                const res = await clientDataApi.packet({ params: packetId.packetId });
                
                setPacket(res.data.data) 
                setOnePortion(packet && packet?.paketPlain ? 0 : packet?.detailCatering?.hargaPerBuah)
                setRoomPrice(packet && packet?.hargaAula);
            } catch (err) {
                console.log(err);
                setError(err);
            }
        })();
    }, [onePortion, roomPrice, totalPrice]);

    const handleOrder = (e) => {
        const form = e.currentTarget;
        e.preventDefault();

    }

    useEffect(() => {
        if(portion < 1) {
            setPortion(1);
        }

        setPortionPrice(portion * onePortion);
        setTotalPrice(roomPrice + portionPrice - discount)
    }, [portion, onePortion, roomPrice, portionPrice, discount])
    
    const data = {
        image: require('./../../assets/img/dummy-img-1.png'), 
        title: "Paket 1",
        packet: ['Nasi Ayam', 'Lawar', 'Air Mineral'],
        price: "Rp 20.000/orang",
    }
    
    return (
        <>
            <StyledNavbar />
            <StyledSection >
                <StyledTitle style={{
                    textDecoration: 'underline',
                    textAlign: 'center',
                    margin: '0 0 70px 0',
                }} >Formulir pemesanan aula</StyledTitle>
                <StyledForm onSubmit={handleOrder} >
                    <div className="TopForm">
                        {!packet && <CircularProgress /> }                        
                        {packet && <CardComponent 
                            packetPlain={packet.paketPlain}
                            image={DummyImg} 
                            title={packet.namaPaket}
                            packet={packet.detailCatering && packet.detailCatering.detailPaketCatering}
                            price={packet.detailCatering ? packet.detailCatering.hargaPerBuah : '0'}
                            cardVariant="small"
                            className="h-100"
                        />}
                        <div className="FormGroups">
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label>Atas Nama</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    required />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Nama Acara</Form.Label>
                                <Form.Control 
                                    type="text"
                                    required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email"
                                    required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>No. Whatsapp</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    min="1"
                                    pattern="/^+91(7\d|8\d|9\d)\d{9}$/"
                                    required />
                            </Form.Group>
                            {packet && !packet.paketPlain && <Form.Group className="mb-3">
                                <Form.Label>Jumlah porsi</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    value={portion}
                                    onChange={e => setPortion(e.currentTarget.value)}
                                    pattern="[0-9]"
                                    required />
                            </Form.Group> }
                            <Form.Group className="mb-3" >
                                <Form.Label>Pilih tanggal</Form.Label>
                                <Form.Control 
                                    type="date"
                                    required />
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
                                type="submit">
                                    Buat Pesanan
                            </StyledButton>
                            
                            <StyledLink to="/">
                                <StyledButton 
                                    variant="outline-secondary"
                                    color={GlobalColors.hardGrey}
                                    border={`2px solid ${GlobalColors.hardGrey}`}
                                    fontSize="1.5"
                                    borderRadius="15" style={{
                                        width: "100%",
                                    }}>
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
