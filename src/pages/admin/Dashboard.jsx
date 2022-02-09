import styled from 'styled-components';
import { Form } from "react-bootstrap";

import { StyledButton } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalColors, GlobalFonts } from "../../globals";

const DashboardContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${GlobalColors.grey};
    font-family: ${GlobalFonts.secondary};
`;

const Dashboard = () => {

    return (
        <DashboardContainer>
            ini dashboard bang awkoakwoawk
        </DashboardContainer>
    )
}

export default Dashboard;
