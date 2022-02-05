import styled from 'styled-components';
import { GlobalMeasurements, GlobalColors, GlobalFonts } from '../globals';

import MandiriLogo from "./../assets/img/mandiri-logo.png";
import BcaLogo from "./../assets/img/bca-logo.png";
import BriLogo from "./../assets/img/bri-logo.png";

const BankGroup = styled.div`
    color: black;
    font-family: ${GlobalFonts.secondary};

    .AdminName, .BankNumber {
        margin: 5px 0;
    }
`

const BankComponent = () => {
    const banks = [
        {
            image: MandiriLogo,
            name: "SMK Negeri 26 JAKARTA (ADMIN  MIMIN)",
            number: "172938920379",
        }, 
        {
            image: BcaLogo,
            name: "SMK Negeri 26 JAKARTA (ADMIN  MIMIN)",
            number: "8438492842343",
        },
        {
            image: BriLogo,
            name: "SMK Negeri 26 JAKARTA (ADMIN  MIMIN)",
            number: "709092393293",
        }
    ]

    return (
        <BankGroup>
            <p className="fw-bolder">Pembayaran transfer melalui</p>
            {banks.map(bank =>(
                <div class="Bank">
                    <img src={bank.image} alt="Bank Logo" />
                    <p class="AdminName">{bank.name}</p>
                    <p class="Bank Number">{bank.number}</p>
                </div>
            ))}
            <p class="text-danger fw-bolder" >*Harap catat nomor rekening di atas</p>
        </BankGroup>
    )
}

export default BankComponent;