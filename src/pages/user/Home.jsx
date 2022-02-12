import { useEffect } from 'react';
import styled from 'styled-components';

import StyledNavbar from "./../../components/Navbar";
import Jumbotron from "./../../components/Jumbotron";
import PreviewSection from "./../../components/PreviewSection";
import SpecificationSection from "./../../components/SpecificationSection";
import PacketCards from "./../../components/PacketCards";
import Footer from "./../../components/Footer";

const HomeContainer = styled.div`
    /* min-height: 200vh; */
`

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <HomeContainer>
            <StyledNavbar />
            <Jumbotron />
            <PreviewSection />
            <SpecificationSection />
            <PacketCards />
            <Footer />
        </HomeContainer>
    )
}

export default Home;
