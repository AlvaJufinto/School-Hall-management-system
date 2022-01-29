import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import {
  Link
} from "react-router-dom";
import { GlobalMeasurements, GlobalFonts, GlobalColors } from '../globals';


export const StyledLink = styled(Link)`
    color: ${GlobalColors.white};
    font-family: ${GlobalFonts.primary};
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }

    &:hover {
        color: white;
    }
`

export const StyledButton = styled(Button)`
    color: ${props => props.color ? props.color : 'white'};
    background: ${props => props.background ? props.background : 'none'};
    border: ${props => props.border ? props.border : "none"};
    width: ${props => props.width ? props.width : "100"}px;
    height: ${props => props.height ? props.height : "50"}px;
    font-size: ${props => props.fontSize ? props.fontSize : "1"}rem;
    border-radius: ${props => props.borderRadius ? props.border : "15"}px;
`
