import styled from 'styled-components';
import { Form } from "react-bootstrap";

import StyledNavbar from "../components/Navbar";
import CardComponent from "../components/Card";
import BankComponent from "../components/BankComponent";
import Footer from "../components/Footer";

import { StyledSection, StyledTitle } from '../ReuseableComponents/ReuseableComponents';
import { GlobalFonts, GlobalColors } from '../globals';

const StyledForm = styled.form`
    .FormGroups {
        color: black;
        font-family: ${GlobalFonts.secondary};

        ${Form.Group} {
            font-weight: 500;
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
            <StyledSection>
                <StyledTitle style={{
                    textDecoration: 'underline'
                }} >Formulir pemesanan aula</StyledTitle>
                <StyledForm>
                    <div className="TopForm">
                        <CardComponent 
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
                                <Form.Label>No Whatsapp</Form.Label>
                                <Form.Control type="number" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Jumlah porsi</Form.Label>
                                <Form.Control type="number"  />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Pilih tanggal</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                        </div>
                        <BankComponent />
                    </div>
                </StyledForm>
                
            </StyledSection>
            <Footer />
        </>
    )
}

export default FormOrder;
