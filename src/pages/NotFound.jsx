import styled from 'styled-components';

import StyledNavbar from "./../../components/Navbar";
import Jumbotron from "./../../components/Jumbotron";
import PreviewSection from "./../../components/PreviewSection";
import SpecificationSection from "./../../components/SpecificationSection";
import PacketCards from "./../../components/PacketCards";
import Footer from "./../../components/Footer";

const NotFoundContainer = styled.div`
    /* min-height: 200vh; */
`

const NotFound = () => {
    return (
        <NotFoundContainer>
            <StyledNavbar />
            <Jumbotron />
            <PreviewSection />
            <SpecificationSection />
            <PacketCards />
            <Footer />
        </NotFoundContainer>
    )
}

export default NotFound;
