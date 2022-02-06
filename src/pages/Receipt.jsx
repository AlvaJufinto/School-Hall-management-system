import { useEffect, useState } from "react";
import useWindowDimensions from "./../hooks/useWindowDimensions";
import styled from 'styled-components';

import StyledNavbar from "../components/Navbar";
import CardComponent from "../components/Cards";
import Footer from "../components/Footer";

import { StyledSection, StyledButton, StyledLink } from '../ReuseableComponents/ReuseableComponents';
import { GlobalFonts, GlobalColors } from '../globals';

import DummyImg from "../assets/img/dummy-img-1.png";
import CircleSvg from "../assets/svg/check-circle.svg";
import WhatsappImg from "../assets/svg/Whatsapp-icon.svg";

const ReceiptInformation = styled.div`
    text-align: center;
    
    img {
        margin: 50px 0 30px 0;
    }

    p {
        margin: 0;
        padding: 0;
        font-size: 1.5rem;
    }

    .Details {
        
        .DetailLeft {

        }
    }
`

const FormOrder = () => {
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const [validated, setValidated] = useState(false);

    const [roomPrice, setRoomPrice] = useState(300000);
    const [onePortion, setOnePortion] = useState(20000);
    const [portion, setPortion] = useState(30);
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
            <StyledSection style={{
                padding: '0 20px',
            }} >
                <ReceiptInformation className="text-dark">
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
                    cardVariant={ windowWidth < 768 ? "small" : "wide" }
                />
                <div className="Details text-dark">
                    <div className="DetailsLeft ">
                        <div className="Detail ">
                            <p>atas nama :</p>
                            <p>pt. when ME AND ur mom</p>
                        </div>
                        <div className="Detail">
                            <p>nama acara : </p>
                            <p>penyuluhan bahaya nyimeng</p>
                        </div>
                        <div className="Detail">
                            <p>email : </p>
                            <p>whenhe@the.me</p>
                        </div>
                        <div className="Detail">
                            <p>No.Whatsapp :</p>
                            <p>086942069420</p>
                        </div>
                        <div className="Detail">
                            <p>pilih tanggal : </p>
                            <p>04/20/22</p>
                        </div>
                    </div>
                    <div className="VerticalLine"></div>
                    <div className="DetailsRight">
                        <div className="Detail">
                            <p>Detail pembayaran</p>
                            <p></p>
                        </div>
                        <div className="Detail">
                            <p>Harga Sewa aula</p>
                            <p>Rp. {roomPrice.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                        </div>
                        <div className="Detail">
                            <p>harga paket katering</p>
                            <p> {portion} × Rp. {onePortion.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </p>
                        </div>
                        <div className="Detail">
                            <p>diskon</p>
                            <p>Rp. {discount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </p>
                        </div>
                        <div className="Detail">
                            <p>Total transfer</p>
                            <p style={{
                                color: GlobalColors.green
                            }}>Rp. {totalPrice.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                        </div>
                    </div>
                </div>
                <p className="text-danger">*HARAP SCRENSHOOT STRUK INI</p>
                <div className="Buttons">
                    
                </div>
            </StyledSection>
            <Footer />
        </>
    )
}

export default FormOrder;
