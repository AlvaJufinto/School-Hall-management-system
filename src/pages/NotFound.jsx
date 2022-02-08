import styled from 'styled-components';
import useWindowDimensions from "../hooks/useWindowDimensions";

import StyledNavbar from "./../components/Navbar";
import Footer from "./../components/Footer";

import { GlobalFonts, GlobalColors } from "./../globals";
import NotFoundImage from "./../assets/svg/not-found-picture.svg";
import NotFoundText from "./../assets/svg/not-found-word.svg";

import { StyledButton, StyledLink } from '../ReuseableComponents/ReuseableComponents';

const NotFoundContainer = styled.div`
    height: 100vh;
    font-family: ${GlobalFonts.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 350px 0px;

    .ImageContainer {
        position: relative;

        .BackImage {
            max-width: 800px;
            width: 90vw;
        }

        .TextImage {
            width: 150%;
        }

        .TextContainer {
            position: absolute;
            top: 20%;
            right: 20%;

            h1 {
                font-size: 5rem;
            }
            h3 {
                font-size: 2.5rem;
                margin: 0 0 40px 0;
            }
        }
    }
    
    @media (max-width: 875px) {
        
        .ImageContainer {
            position: relative;
            
            .BackImage {
                max-width: 800px;
                width: 90vw;
            }
            
            .TextImage {
                width: 50vw;
            }
            
            .TextContainer {
                position: absolute;
                top: 15vw;
                right: 5vw;

                h1 {
                    font-size: 8vw;
                }
                h3 {
                    font-size: 5vw;
                    margin: 0 0 10px 0;
                }

                ${StyledButton} {
                    height: 15vw;
                    width: 80%;
                    font-size: 5vw;
                }
            }
        }
    }
`;

const NotFound = () => {
    const { height:windowHeight, width: windowWidth } = useWindowDimensions();

    return (
        <>
            <StyledNavbar />
            <NotFoundContainer>
                <div className="ImageContainer">
                    <img src={NotFoundImage} className="BackImage" alt="back-image" />
                    <div className="TextContainer">
                        <img className="TextImage" src={NotFoundText} alt="back-image" />
                        <h1>MAAF</h1>
                        <h3>Halaman tidak ditemukan</h3>
                        <StyledLink to="/">
                            <StyledButton 
                                color={GlobalColors.white}
                                background={GlobalColors.violet}
                                fontSize="1.8"
                                height="90"
                                width="250"
                                borderRadius="15">
                                    Kembali ke Home
                            </StyledButton>
                        </StyledLink>
                    </div>
                </div>
            </NotFoundContainer>   
            <Footer />
        </>
    )
}

export default NotFound;
