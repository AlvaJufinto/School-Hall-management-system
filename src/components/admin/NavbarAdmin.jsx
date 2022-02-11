import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import { Menu } from '@mui/icons-material';
import useWindowDimensions from './../../hooks/useWindowDimensions';

import { Navbar, Container, Nav } from 'react-bootstrap';
import { GlobalMeasurements, GlobalColors, GlobalFonts } from '../../globals';

import { StyledLink, StyledButton } from "../../ReuseableComponents/ReuseableComponents";
import { AuthContext } from "./../../context/Auth/AuthContext";
import api from "./../../api/auth";

import Chad from "./../../assets/img/chad.png";

const StyledNavbar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${GlobalColors.hardGrey};
    h2 {
        font-size: 2rem;
    }
    
    p {
        font-size: 1.5rem;
        text-align: center;
        color: ${GlobalColors.green};
    }

`


const NavbarAdmin = styled.nav`
    font-family: ${GlobalFonts.primary};
    width: 200px;
    height: 100vh;
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    padding: 50px 0;
    background: ${GlobalColors.hardGrey};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    h2 {
        font-size: 2rem;
    }
    
    p {
        font-size: 1.5rem;
        text-align: center;
        color: ${GlobalColors.green};
    }

    .NavbarLinkContainer {
        display: flex;
        flex-direction: column;
        gap: 50px;
        font-size: 1.5rem;
    }
`

const ProfileContainer = styled.div`
    text-align: center;

    p {
        font-size: 20px;
        color: white;
        margin: 5px 0 20px 0;
        font-family: ${GlobalFonts.secondary};
    }
`



const StyledNavbarAdmin = () => {
    const { width: windowWidth } = useWindowDimensions();
    const { isLoading, dispatch, user } = useContext(AuthContext);

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT_START", payload: user });
        try {
            let refreshToken = localStorage.getItem("refreshToken");

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            await api.logout(refreshToken);
            dispatch({ type: "LOGOUT_SUCCESS" });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            { windowWidth < 768 &&
                <StyledNavbar bg="dark" variant="dark">
                    {/* <Container> */}
                    <Menu />
                    <StyledLink to="/admin/dashboard">
                        <h2>SEWA AULA</h2>
                        <p>ADMIN</p>
                    </StyledLink>
                    {/* </Container> */}
                </StyledNavbar>
            }
            <NavbarAdmin>
                <StyledLink to="/admin/dashboard">
                    <h2>SEWA AULA</h2>
                    <p>ADMIN</p>
                </StyledLink>
                <div className="NavbarLinkContainer">
                    <Nav.Link>
                        <StyledLink to="/admin/dashboard">Dashboard</StyledLink>
                    </Nav.Link>
                    <Nav.Link>
                        <StyledLink to="/admin/order-queue">Order Antrean</StyledLink>
                    </Nav.Link>
                    <Nav.Link>
                        <StyledLink to="/admin/order-done">Order Selesai</StyledLink>
                    </Nav.Link>
                    <Nav.Link>
                        <StyledLink to="/admin/order-cancel">Order Batal</StyledLink>
                    </Nav.Link>
                    <Nav.Link>
                        <StyledLink to="/admin/packet">Paket</StyledLink>
                    </Nav.Link>
                </div>
                <ProfileContainer>
                    <img src={Chad} alt="" />
                    <p>{user && user.username}</p>
                    <StyledButton 
                        variant="danger"
                        color={GlobalColors.white}
                        background={GlobalColors.red}
                        fontSize="1.4"
                        height="50"
                        width="140"
                        borderRadius="30"
                        type="submit"
                        onClick={handleLogout}>
                            {isLoading ? 
                                <CircularProgress 
                                    color="inherit" 
                                    style={{fontSize: '1rem' }} /> 
                                : 
                                "Logout"
                            }
                    </StyledButton>
                </ProfileContainer>
            </NavbarAdmin>
        </>
    )
}

export default StyledNavbarAdmin;