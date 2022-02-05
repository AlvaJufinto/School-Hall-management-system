import { useEffect, useState } from "react";
import styled from 'styled-components';

import StyledNavbar from "../components/Navbar";
import CardComponent from "../components/Cards";
import BankComponent from "../components/BankComponent";
import Footer from "../components/Footer";

import { StyledSection, StyledTitle, StyledButton, StyledLink } from '../ReuseableComponents/ReuseableComponents';
import { GlobalFonts, GlobalColors } from '../globals';

import DummyImg from "../assets/img/dummy-img-1.png";
import CircleSvg from "../assets/svg/check-circle.svg";
import WhatsappImg from "../assets/svg/Whatsapp-icon.svg";

const ReceiptInformation = styled.div`
    text-align: center;
    color: black;
    
    img {
        margin: 50px 0 30px 0;
    }

    p {
        margin: 0;
        font-size: 1.5rem;
    }
`

const FormOrder = () => {
    const [validated, setValidated] = useState(false);

    const [roomPrice, setRoomPrice] = useState(300000);
    const [onePortion, setOnePortion] = useState(20000);
    const [portion, setPortion] = useState(0);
    const [portionPrice, setPortionPrice] = useState(0);
    const [discount, setDiscount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setPortionPrice(portion * onePortion);
        setTotalPrice(roomPrice + portionPrice - discount)
    }, [portion, portionPrice, totalPrice])
        
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
                <ReceiptInformation>
                    <img src={CircleSvg} alt="CircleSvg" />
                    <p>Pesanan berhasil dibuat</p>
                    <p>Id pesanan : 00021329384</p>
                    <p>Silahkan mengirim bukti transfer ke whatsapp admin</p>
                </ReceiptInformation>
                <CardComponent 
                    image={data.image} 
                    title={data.title}
                    packet={data.packet}
                    price={data.price}
                    cardVariant="wide"
                />
                <div className="Details">
                    <div className="DetailsLeft">
                        <div className="Detail">
                            <p></p>
                            <p></p>
                        </div>
                        <div className="Detail">
                            <p></p>
                            <p></p>
                        </div>
                        <div className="Detail">
                            <p></p>
                            <p></p>
                        </div>
                        <div className="Detail">
                            <p></p>
                            <p></p>
                        </div>
                        <div className="Detail">
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                    <div className="DetailsRight">
                        <div className="Detail">
                            <p></p>
                            <p></p>
                        </div>
                        <div className="Detail">
                            <p></p>
                            <p></p>
                        </div>
                        <div className="Detail">
                            <p></p>
                            <p></p>
                        </div>
                        <div className="Detail">
                            <p></p>
                            <p></p>
                        </div>
                        <div className="Detail">
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </div>
                <p className="text-danger fw-bolder">*HARAP SCRENSHOOT STRUK INI</p>
                <div className="Buttons">
                    
                </div>
            </StyledSection>
            <Footer />
        </>
    )
}

export default FormOrder;
