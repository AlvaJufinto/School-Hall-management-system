import styled from 'styled-components';

import StyledNavbar from "./../components/Navbar";
import Jumbotron from "./../components/Jumbotron";
import PreviewSection from "./../components/PreviewSection";
import SpecificationSection from "./../components/SpecificationSection";

const HomeContainer = styled.div`
    min-height: 200vh;
`

const Home = () => {
    return (
        <HomeContainer>
            <StyledNavbar />
            <Jumbotron />
            <PreviewSection />
            <SpecificationSection />
        </HomeContainer>
    )
}

export default Home;
