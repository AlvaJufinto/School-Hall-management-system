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
    background-color: ${GlobalColors.hardGrey};
    display: flex;
    align-items: center;
    
    .Icon {
        margin: 0 10px 0 0;
    }

    p {
        font-size: 1.20rem;
    }

    ${StyledSection} {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* background: red; */
        
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
            width: 28%;

            ${StyledButton} {
                text-align: left;
                width: 100%;
            }
        }
    }
`

const Footer = () => {
    return (
        <FooterSection>
            <StyledSection backgroundColor="none">
                <div className="LeftSection">
                    <div className="TopLeftSection">
                        <p>belajar, bekerja, membangun</p>
                        <h2>SMK NEGERI 26 JAKARTA</h2>
                    </div>
                    <div className="BottomLeftSection">
                        <h4><EmailOutlined /> Contact us</h4>
                        <p>Jl. Balai Pustaka Baru I No.2, RW.7, Rawamangun, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13220</p>
                    </div>
                </div>
                <div className="RightSection">
                    <p><YouTubeIcon className="Icon" /> smkn26jktofficial</p>
                    <p><Twitter className="Icon" /> smkn26jktofficial</p>
                    <p><Instagram className="Icon" /> smkn26jktofficial</p>
                    <StyledButton 
                        variant="success"
                        background={GlobalColors.green}
                        // width="200"
                        height="auto"
                        >
                        <img 
                            src={WhatsappIcon} 
                            className="Icon" /> Hubungi Admin
                    </StyledButton>
                </div>
            </StyledSection>
        </FooterSection>
    )
}

export default Footer;
