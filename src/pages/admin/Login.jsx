import styled from 'styled-components';
import { Form, Button } from "react-bootstrap";

import { GlobalColors } from "../../globals";

const LoginContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Login = () => {
    return (
        <LoginContainer>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </LoginContainer>
    )
}

export default Login;
