import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        /* font-family: 'Bebas Neue', cursive; */
    }

    .warning {
        color: ${GlobalColors.red}
    }
`

export const GlobalColors = {
    blue: "#63DAFF",
    violet: "#6369FF",
    hardGrey: "#393E46",
    grey: "#E5E5E5",
    lightGrey: "#C4C4C4",
    white: "#FFF",
    green: "#04B900",
    red: "#D00000",
    lightBack: "#F5F6FF",
}

export const GlobalMeasurements = {
    navbarHeight: 100,
    containerWidth: 1300,
    navbarFontSize: 1.75,
}

export const GlobalFonts = {
    primary: 'Bebas Neue',
    secondary: 'Poppins',
}
