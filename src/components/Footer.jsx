import styled from 'styled-components';
import { EmailOutlined, Twitter, Instagram } from '@mui/icons-material';
import YouTubeIcon from '@mui/icons-material/YouTube';

import { GlobalMeasurements, GlobalColors } from '../globals';
import { StyledLink, StyledSection, StyledButton } from "../ReuseableComponents/ReuseableComponents";

import WhatsappIcon from "./../assets/svg/Whatsapp-icon.svg";

const FooterSection = styled.div`
    min-height: 450px;
    width: 100%; 
    background-color: ${GlobalColors.hardGrey};
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
                    <p><YouTubeIcon /> smkn26jktofficial</p>
                    <p><Twitter /> smkn26jktofficial</p>
                    <p><Instagram /> smkn26jktofficial</p>
                    <StyledButton 
                        background={GlobalColors.green}
                        width="auto"
                        height="auto"
                        >
                        <img src={WhatsappIcon} /> Hubungi Admin
                    </StyledButton>
                </div>
            </StyledSection>
        </FooterSection>
    )
}

export default Footer;
