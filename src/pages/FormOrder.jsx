import styled from 'styled-components';
import { Form } from "react-bootstrap";

import StyledNavbar from "../components/Navbar";
import CardComponent from "../components/Card";
import BankComponent from "../components/BankComponent";
import Footer from "../components/Footer";
import { StyledSection, StyledTitle, StyledButton, StyledLink } from '../ReuseableComponents/ReuseableComponents';
import { GlobalFonts, GlobalColors } from '../globals';

const StyledCardComponent = styled(CardComponent)`
    @media (max-width: 768px) {

    }
`

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
            width: 100%;
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
    
    const data = {
        image: require('./../assets/img/dummy-img-1.png'), 
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
                <StyledForm>
                    <div 
                        className="TopForm">
                        <StyledCardComponent 
                            image={data.image} 
                            title={data.title}
                            packet={data.packet}
                            price={data.price}
                        />
                        <div className="FormGroups">
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Atas Nama</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Nama Acara</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>No. Whatsapp</Form.Label>
                                <Form.Control type="number" min="0" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Jumlah porsi</Form.Label>
                                <Form.Control type="number" min="0" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Pilih tanggal</Form.Label>
                                <Form.Control type="date" />
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
                                <p>Rp. 300.000</p>
                            </div>
                            <div className="Detail">
                                <p>Harga Paket Katering</p>
                                <p>Rp. 600.000</p>
                            </div>
                            <div className="Detail">
                                <p>Diskon</p>
                                <p>Rp. 0</p>
                            </div>
                            <div className="Detail">
                                <p>Total Transfer</p>
                                <p className="Total" >Rp. 900.000</p>
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
