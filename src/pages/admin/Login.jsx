import styled from 'styled-components';
import { Form } from "react-bootstrap";

import { StyledButton } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalColors, GlobalFonts } from "../../globals";

const LoginContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${GlobalColors.hardGrey};
    font-family: ${GlobalFonts.secondary};

`;

const StyledForm = styled.form`
    background: #000000;
    width: 500px;
    max-width: 90%;
    height: 400px;

    h2 {
        color: ${GlobalColors.violet};
    }
`;

const Login = () => {
    return (
        <LoginContainer>
            <StyledForm className="StyledForm" >
                <h2>Sewa Aula</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control 
                        type="text" 
                        placeholder="Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control 
                        type="password" 
                        placeholder="Password" />
                </Form.Group>
                
                <StyledButton 
                    color={GlobalColors.white}
                    background={GlobalColors.violet}
                    fontSize="1.5"
                    borderRadius="15"
                    type="submit">
                        Buat Pesanan
                </StyledButton>
            </StyledForm>
        </LoginContainer>
    )
}

export default Login;
