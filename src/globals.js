import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Varela Round', sans-serif;
    }
`

export const GlobalColors = {
    blue: "#63DAFF",
    violet: "#6369FF",
    grey: "E5E5E5",
    lightGrey: "#C4C4C4",
    white: "#FFF",
    green: "#04B900",
    red: "D00000"
}

export const GlobalMeasurement = {
    navbarHeight: 164,
    containerWidth: 888,

}