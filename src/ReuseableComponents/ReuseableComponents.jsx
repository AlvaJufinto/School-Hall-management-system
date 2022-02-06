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
    width: ${props => props.width ? props.width : "auto"}px;
    height: ${props => props.height ? props.height : "65"}px;
    font-size: ${props => props.fontSize ? props.fontSize : "1"}rem;
    border-radius: ${props => props.borderRadius ? props.borderRadius : "0"}px !important;
    
    &:focus, &:hover, &:visited, &:link, &:active {
        background: ${props => props.backgroundInteract ? props.backgroundInteract : props.background };
    }
`

export const StyledTitle = styled.h1`
    margin: auto;
    display: flex;
    justify-content: center;
    color: ${props => props.color ? props.color : 'black'};
    font-size: ${props => props.fontSize ? props.fontSize : "3"}rem;
    padding: ${props => props.marginY ? props.marginY : "100"}px 0px 50px 0px;
    font-family: ${props => props.fontFamily ? props.fontFamily : GlobalFonts.primary};
`

export const StyledSection = styled.div`
    margin: 0 auto;
    width: 90%;
    max-width: ${GlobalMeasurements.containerWidth}px;
    background: ${props => props.backgroundColor ? props.backgroundColor : GlobalColors.lightBack};
    font-family: ${props => props.fontFamily ? props.fontFamily : GlobalFonts.primary};
    color: ${props => props.color ? props.color : GlobalColors.white};
`
