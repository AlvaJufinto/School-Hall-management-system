import styled from 'styled-components';

import StyledNavbar from "./../components/Navbar";
import Jumbotron from "./../components/Jumbotron";
import PreviewSection from "./../components/PreviewSection";

const HomeContainer = styled.div`
    min-height: 200vh;
`

const Home = () => {
    return (
        <HomeContainer>
            <StyledNavbar />
            <Jumbotron />
            <PreviewSection />
        </HomeContainer>
    )
}

export default Home;
