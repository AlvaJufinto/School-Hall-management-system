import styled from 'styled-components';
import { EmailOutlined, Twitter, Instagram } from '@mui/icons-material';
import YouTubeIcon from '@mui/icons-material/YouTube';

import { GlobalMeasurements, GlobalColors } from '../globals';
import { StyledLink, StyledSection, StyledButton } from "../ReuseableComponents/ReuseableComponents";

import WhatsappIcon from "./../assets/svg/Whatsapp-icon.svg";

const FooterSection = styled.div`
    padding: 50px 0px;
    height: 400px;
    width: 100%; 
    /* background-color: ${GlobalColors.hardGrey}; */
    display: flex;
    align-items: center;
    box-shadow: 0px 5px 100px rgba(0, 0, 0, 0.15);
    
    .Icon {
        margin: 0 10px 0 0;
    }

    p {
        font-size: 1.20rem;
    }
    
    span {
        font-size: 0.75;
    }

    ${StyledSection} {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: ${GlobalColors.hardGrey};

        .MobileView {
            display: none;
        }
        
        .LeftSection {
            height: 100%;
            width: 28%;
            /* background: orange; */
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .RightSection {
            /* background: green; */
            width: 25%;

            ${StyledButton} {
                text-align: left;
                width: 100%;
            }
        }
    }

    @media (max-width: 768px) {
        ${StyledSection} {
            .MobileView {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                /* background: blue; */

                .Icon {
                    margin: 20px;
                    font-size: 3rem;
                }

                .BottomSection {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .BottomLeftSection {
                        width: 50%;

                        p {
                            font-size: 0.75rem;
                        }
                    }

                    .BottomRightSection {
                        width: 50%;
                        /* background: salmon; */

                        ${StyledButton} {
                            width: 100%;
                            font-size: 1rem;
                        }
                    }
                }
            }

            .LeftSection {
                display: none;
            }
    
            .RightSection {
                display: none;
            }
            
        }

    }
`

const Footer = () => {
    return (
        <FooterSection>
            <StyledSection backgroundColor="none">
                <div className="MobileView">
                    <p>belajar, bekerja, membangun</p>
                    <h2>SMK NEGERI 26 JAKARTA</h2>

                    <div className="TopSection">
                        <YouTubeIcon className="Icon" /> 
                        <Twitter className="Icon" /> 
                        <Instagram className="Icon" /> 
                    </div>

                    <div className="BottomSection">
                        <div className="BottomLeftSection">
                            <h4><EmailOutlined /> Contact us</h4>
                            <p>Jl. Balai Pustaka Baru I No.2, RW.7, Rawamangun, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13220</p>
                        </div>

                        <div className="BottomRightSection">
                            <StyledButton 
                                variant="success"
                                background={GlobalColors.green}
                                height="auto"
                                fontSize="1.5">
                            <img 
                                src={WhatsappIcon}
                                style={{
                                    margin: '0px 15px 0 0',
                                    width: '50px',
                                }} /> Hubungi Admin
                        </StyledButton>
                        </div>
                    </div>
                </div>

                <div className="LeftSection">
                    <div className="TopLeftSection">
                        <span>belajar, bekerja, membangun</span>
                        <h2>SMK NEGERI 26 JAKARTA</h2>
                    </div>
                    <div className="BottomLeftSection">
                        <h4><EmailOutlined className="Icon" /> Contact us</h4>
                        <p>Jl. Balai Pustaka Baru I No.2, RW.7, Rawamangun, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13220</p>
                    </div>
                </div>
                <div className="RightSection">
                    <p><YouTubeIcon className="Icon" /> smkn26jktofficial</p>
                    <p><Twitter className="Icon" /> smkn26jktofficial</p>
                    <p><Instagram className="Icon" /> smkn26jktofficial</p>
                    <a target="_blank" href="https://api.whatsapp.com/send?phone=89601943530&text=Saya%20ingin%20tanya%20tentang%20penyewaan%20aula">
                        <StyledButton 
                            variant="success"
                            background={GlobalColors.green}
                            // width="200"
                            height="auto"
                            fontSize="1.5" 
                            style={{
                                padding: '15px'
                            }}>
                            <img 
                                src={WhatsappIcon}
                                width="25"
                                style={{
                                    margin: '0px 15px 0 0'
                                }} /> Hubungi Admin
                        </StyledButton>
                    </a>
                </div>
            </StyledSection>
        </FooterSection>
    )
}

export default Footer;
