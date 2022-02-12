import { useEffect, useState } from "react";
import useWindowDimensions from "./../../hooks/useWindowDimensions";
import styled from 'styled-components';

import StyledNavbar from "../../components/Navbar";
import CardComponent from "../../components/Cards";
import Footer from "../../components/Footer";

import { StyledSection, StyledButton, StyledLink } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalFonts, GlobalColors } from '../../globals';

import CircleSvg from "../../assets/svg/check-circle.svg";
import WhatsappIcon from "../../assets/svg/Whatsapp-icon.svg";

const ReceiptInformation = styled.div`
    padding: 40px 0;
    text-align: center;
    
    img {
        margin: 50px 0 30px 0;
    }

    p {
        margin: 0;
        padding: 0;
        font-size: 1.5rem;
    }
`
export const Details = styled.div`
    margin: 50px 0 30px 0;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    .DetailsSection {
        display: flex;
        flex-direction: column;
        flex: 1;
        font-size: 1.5rem;

        .Detail {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }

    .VerticalLine {
        width: 2px;
        height: 250px;
        background: ${GlobalColors.hardGrey};
    }

    @media (max-width: 768px) {
        .DetailsSection {
            font-size: 1.20rem;
        }
    }

    @media (max-width: 1023px) {
        flex-direction: column;

        .VerticalLine {
            display: none;
        }
    }
`

export const Buttons = styled.div`
    padding: 60px 20px 100px 20px;
    width: 100%;
    display: flex;
    gap: 80px;

    ${StyledButton}, a {
        flex: 1;
    }

    ${StyledButton} {
        width: 100%;
        padding: 0 20px;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
        padding: 60px 20px 100px 20px;
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
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        setPortionPrice(portion * onePortion);
        setTotalPrice(roomPrice + portionPrice - discount)
    }, [portion, portionPrice, totalPrice])
        
    const data = {
        image: require('./../../assets/img/dummy-img-1.png'), 
        title: "Paket 1",
        packet: ['Nasi Ayam', 'Lawar', 'Air Mineral'],
        price: "Rp 20.000/orang",
    }
    
    return (
        <>
            <StyledNavbar />
            <StyledSection>
                <ReceiptInformation className="text-dark">
                    <img src={CircleSvg} alt="CircleSvg" />
                    <p>Pesanan berhasil dibuat</p>
                    <p>Id pesanan : 00021329384</p>
                    <p>Silahkan mengirim bukti transfer ke whatsapp admin</p>
                </ReceiptInformation>
                <div style={{
                    display: windowWidth < 768 ?  'flex' : "",
                    justifyContent: windowWidth < 768 ? 'center' : '',
                    padding: windowWidth < 768 ? '' : ' 0 20px',
                }}>
                    <CardComponent 
                        image={data.image} 
                        title={data.title}
                        packet={data.packet}
                        price={data.price}
                        cardVariant={ windowWidth < 768 ? "small" : "wide" }
                    />
                </div>
                <Details className="text-dark" >
                    <div className="DetailsSection">
                        <div className="Detail">
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
                    <div className="DetailsSection">
                        <div className="Detail">
                            <p style={{
                                color: GlobalColors.hardGrey,
                            }} >Detail pembayaran</p>
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
                </Details>
                <p className="text-danger text-center m-auto" style={{
                    fontSize: '1.5rem'
                }}>*HARAP SCRENSHOOT STRUK INI</p>
                <Buttons>
                    <a target="_blank" href="https://api.whatsapp.com/send?phone=89601943530&text=Saya%20ingin%20tanya%20tentang%20penyewaan%20aula" >
                        <StyledButton 
                            variant="success"
                            background={GlobalColors.green}
                            borderRadius="15"
                            height="95"
                            fontSize="2">
                            <img 
                                src={WhatsappIcon}
                                width="40"
                                style={{
                                    margin: '0px 10px 0 0'
                                }} /> Chat Admin
                        </StyledButton>
                    </a>

                    <StyledLink to="/">
                        <StyledButton 
                            variant="outline-secondary"
                            color={GlobalColors.hardGrey}
                            border={`2px solid ${GlobalColors.hardGrey}`}
                            fontSize="2"
                            height="95"
                            borderRadius="15" style={{
                                width: "100%",
                            }}>
                                Kembali ke home
                        </StyledButton>
                    </StyledLink>
                </Buttons>
            </StyledSection>
            <Footer />
        </>
    )
}

export default FormOrder;
