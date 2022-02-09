import styled from 'styled-components';
import { Form } from "react-bootstrap";

import { StyledButton } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalColors, GlobalFonts } from "../../globals";

const LoginContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${GlobalColors.grey};
    font-family: ${GlobalFonts.secondary};
`;

const StyledForm = styled.form`
    border-radius: 10px;
    background: white;
    width: 500px;
    max-width: 90%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px;

    h2 {
        color: ${GlobalColors.violet};
        text-align: center;
        margin: 0 0 25px 0;
    }

    .FormText {
        background-color: white;
        color: black;
        border: none;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15) !important; 
    }

    ${StyledButton} {
        height: auto;
        width: 100%;
        padding: 10px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25) !important; 
    }

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

const Login = () => {
    const LoginHandler = (e) => {

    }

    return (
        <LoginContainer>
            <StyledForm className="StyledForm" >
                <h2>Sewa Aula</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control 
                        variant="dark"
                        type="text" 
                        placeholder="Username"
                        className="FormText" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        className="FormText" />
                </Form.Group>
                
                <StyledButton 
                    color={GlobalColors.white}
                    background={GlobalColors.violet}
                    fontSize="1.25"
                    borderRadius="5"
                    type="submit">
                        Login
                </StyledButton>
            </StyledForm>
        </LoginContainer>
    )
}

export default Login;
