import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { GlobalMeasurements, GlobalFonts, GlobalColors } from '../globals';

import { StyledSection, StyledTitle } from "../ReuseableComponents/ReuseableComponents"

const TableStyled = styled(Table)`
    max-width: 500px;  
    width: 760px;
    margin: auto;
` 

const SpecificationSection = () => {
    return (
        <StyledSection>
            <StyledTitle>Spesifikasi aula</StyledTitle>
            <TableStyled bordered>
                <thead>
                    <tr>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                </tbody>
            </TableStyled>
        </StyledSection>
    )
}

export default SpecificationSection;
