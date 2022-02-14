import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { GlobalMeasurements, GlobalFonts, GlobalColors } from '../globals';

import { StyledSection, StyledTitle } from "../ReuseableComponents/ReuseableComponents"

const TableStyled = styled(Table)`
    max-width: 500px;  
    width: 100%;
    margin: auto;
    text-align: center;
    font-family: ${GlobalFonts.secondary};
    
    td {
        width: 50%;
    }
` 

const SpecificationSection = () => {
    return (
        <StyledSection>
            <StyledTitle>Spesifikasi aula</StyledTitle>
            <TableStyled bordered>
                <thead style={{
                    background: GlobalColors.violet,
                    color: GlobalColors.white,
                }}>
                    <tr>
                        <td>Aspek</td>
                        <td>Keterangan</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Luas</td>
                        <td>150m<sup>2</sup></td>
                    </tr>
                    <tr>
                        <td>Kapasitas</td>
                        <td>300 Orang</td>
                    </tr>
                    <tr>
                        <td>Sound System</td>
                        <td>3D Stereo</td>
                    </tr>
                    <tr>
                        <td>Proyektor</td>
                        <td>2 Buah</td>
                    </tr>
                    <tr>
                        <td>Harga</td>
                        <td>Rp. 300.000,00/Hari</td>
                    </tr>
                </tbody>
            </TableStyled>
        </StyledSection>
    )
}

export default SpecificationSection;
