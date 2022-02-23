import { useEffect, useState } from "react";
import useWindowDimensions from "./../../hooks/useWindowDimensions";
import styled from 'styled-components';
import { Form } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router';
import { clientDataApi } from "./../../api/api";
import CircularProgress from '@mui/material/CircularProgress';

import StyledNavbar from "../../components/Navbar";
import CardComponent from "../../components/Cards";
import Footer from "../../components/Footer";

import { StyledSection, StyledButton, StyledLink, StyledTitle } from '../../ReuseableComponents/ReuseableComponents';
import { GlobalFonts, GlobalColors } from '../../globals';

const SelectHolder = styled.div`
    display: flex;
    width: 50%;
    gap: 20px;

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 556px) {
        flex-direction: column;
    }

`

const CardScheduleContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 0 0 300px 0;
`

const Schedule = () => {
    const { height, width } = useWindowDimensions();
    const [yearValue, setYearValue] = useState("Pilih Tahun")
    const [monthValue, setMonthValue] = useState("Pil")

    const CardSchedule = ({ isActive }) => {

        return (
            <div style={{
                width: width >= 994 ? '450px' : '100%',
                maxWidth: '100%',
                fontFamily: GlobalFonts.secondary,
                background: isActive === true ? GlobalColors.violet : GlobalColors.hardGrey,
                padding: '20px',
                borderRadius: '20px'
            }}>
                <p>Nama Pete</p>
                <h3 style={{
                    margin: '20px 0px'
                }}>Penyuluhan Bahaya Nyimeng Bagi Anak Lanjut Usia</h3>
                <p>26/03/2022</p>
            </div>
        )
    }

    return ( 
        <>
            <StyledNavbar />
            <StyledSection className="p-3">
                <StyledTitle justifyContent="flex-start" fontSize="2.5">Lihat ketersediaan hari</StyledTitle>
                <SelectHolder>
                    <Form.Select size="lg" 
                        value={yearValue}
                        onChange={e => setYearValue(e)}
                        style={{
                            borderRadius: '30px',
                            background: GlobalColors.violet,
                            color: 'white',
                            padding: '10px 20px',
                        }}>
                        <option></option>
                        <option></option>
                    </Form.Select>
                    <Form.Select size="lg" 
                        value={monthValue}
                        onChange={e => setMonthValue(e)}
                        style={{
                            borderRadius: '30px',
                            background: GlobalColors.violet,
                            color: 'white',
                            padding: '10px 20px',
                        }}>
                        <option></option>
                        <option></option>
                    </Form.Select>
                </SelectHolder>
                <StyledTitle 
                    justifyContent="flex-start" 
                    fontSize="2.5"
                    isActive={true}>Sedang Berlangsung</StyledTitle>
                <CardSchedule isActive={true} />
                <StyledTitle 
                    justifyContent="flex-start" 
                    fontSize="2.5">Akan Datang</StyledTitle>
                <CardScheduleContainer>
                    <CardSchedule />
                    <CardSchedule />
                    <CardSchedule />
                    <CardSchedule />
                    <CardSchedule />
                    <CardSchedule />
                    <CardSchedule />
                    <CardSchedule />
                    <CardSchedule />
                    <CardSchedule />
                </CardScheduleContainer>
            </StyledSection>
            <Footer />
        </>
     );
}
 
export default Schedule;
