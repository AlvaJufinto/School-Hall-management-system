import styled from 'styled-components';

import StyledNavbar from "../components/Navbar";
import CardComponent from "../components/Card";
import Footer from "../components/Footer";

import { StyledSection, StyledTitle } from '../ReuseableComponents/ReuseableComponents';

const StyledForm = styled.form`
    
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

                </StyledForm>
                <CardComponent 
                    image={data.image} 
                    title={data.title}
                    packet={data.packet}
                    price={data.price}
                />
            </StyledSection>
            <Footer />
        </>
    )
}

export default FormOrder;
