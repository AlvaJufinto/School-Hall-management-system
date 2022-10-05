import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Form } from "react-bootstrap";

import { StyledButton } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalColors, GlobalFonts } from "../../globals";
import CircularProgress from '@mui/material/CircularProgress';

import { AuthContext } from "../../context/AuthContext";
import { authApi } from "./../../api/api";

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
    const { display, isLoading, dispatch, errorMessage } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        username: "",
        password: "",
        display: "show",
    });

    useEffect(() => {
        document.title = 'Admin | Login';
    }, [])

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const LoginHandler =  async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const { username, password } = formState;

            let res = await authApi.login({ username, password });
            let { accessToken, refreshToken } = res.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            let getUserCredentials = await authApi.loggedIn({ refreshToken: refreshToken });
            dispatch({ type: "LOGIN_SUCCESS", payload: getUserCredentials });
            navigate("/admin/dashboard", { replace: true });
        } catch (err) {
            console.log(err.response.data.message);
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.message });
        }
    }

    return (
        <LoginContainer>
            <StyledForm className="StyledForm" onSubmit={(e) => LoginHandler(e)} >
                <h2>Sewa Aula</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control 
                        type="text" 
                        name="username"
                        placeholder="Username"
                        className="FormText" 
                        value={formState.username}
                        onChange={e => handleChange(e)}
                        autoComplete="on" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        className="FormText" 
                        value={formState.password}
                        onChange={e => handleChange(e)}
                        autoComplete="on" />
                </Form.Group>
                
                <StyledButton 
                    color={GlobalColors.white}
                    background={GlobalColors.violet}
                    fontSize="1.25"
                    borderRadius="5"
                    type="submit">
                        {isLoading ? <CircularProgress color="inherit" /> : "Login"}
                </StyledButton>
                <p className="text-danger text-center mt-3" style={{
                    textTransform: 'capitalize',
                }}>{ errorMessage && errorMessage }</p>
            </StyledForm>
        </LoginContainer>
    )
}

export default Login;
