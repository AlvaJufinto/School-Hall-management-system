import { useEffect, useState } from "react";
import axios from "axios";
import useWindowDimensions from "./../../hooks/useWindowDimensions";
import styled from 'styled-components';
import { Form, Spinner } from "react-bootstrap";
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

const AvailableDateContainer = styled.div`
    margin: 40px 0 0 0;
    font-family: ${GlobalFonts.secondary};

    h5 {
        color: black;
    }

    span {
        font-size: 1.25rem;
        color: ${GlobalColors.green};
    }
`

const Schedule = () => {
    const { width } = useWindowDimensions();
    const date = new Date();
    const [isAvailableDateLoading, setIsAvailableDateLoading] = useState(true);
    const [availableDate, setAvailableDate] = useState([]);
    const [months, setMonths] = useState([ "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]);
    const [years, setYears] = useState(Array(6).fill().map((_, idx) => new Date().getFullYear() + idx));
    const [yearValue, setYearValue] = useState(date.getFullYear())
    const [monthValue, setMonthValue] = useState(date.getMonth() + 1);

    const [isOrderLoading, setIsOrderLoading] = useState(true);
    const [activeOrder, setActiveOrder] = useState();
    const [queueOrder, setQueueOrder] = useState();

    useEffect(() => {
        document.title = 'Schedule';
    }, [])
    

    useEffect(async () => {
        setIsAvailableDateLoading(true);
        try {
            const res = await clientDataApi.getAvailableDate({ month: monthValue, year: yearValue });
            setAvailableDate(res.data.details.data);
            setIsAvailableDateLoading(false);
        } catch (err) {
            setIsAvailableDateLoading(false);
        }
    }, [yearValue, monthValue])

    useEffect(async () => {
        setIsOrderLoading(true);
        try {
            const res = await clientDataApi.allData();
            setActiveOrder(res.data.data.active);
            setQueueOrder(res.data.data.order);
            setIsOrderLoading(false)
        } catch (err) {
            setIsOrderLoading(false);
        }
    }, [])
    
    const CardSchedule = ({ isActive, orderDetail }) => {

        const breakStyle = {
            wordBreak: 'break-word',
        }

        return (
            <div style={{
                width: width >= 994 ? '450px' : '100%',
                maxWidth: '100%',
                fontFamily: GlobalFonts.secondary,
                background: isActive === true ? GlobalColors.green : GlobalColors.hardGrey,
                padding: '20px',
                borderRadius: '20px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <p>{orderDetail?.atasNama}</p>
                    { isActive === true ? <Spinner animation="grow" variant="danger" /> : "" }
                </div>
                <h3 style={{
                    margin: '20px 0px'
                }}>{orderDetail?.namaAcara}</h3>
                <p style={breakStyle}>{orderDetail?.email}</p>
                <p style={breakStyle}>{orderDetail?.tanggal?.toString().slice(0, 10).split('-').reverse().join('-')}</p>
            </div>
        )
    }

    return ( 
        <>
            <StyledNavbar />
            <StyledSection className="p-3">
                <StyledTitle justifyContent="flex-start" fontSize="2.5">Lihat ketersediaan Tanggal</StyledTitle>
                <SelectHolder>
                    <Form.Select size="lg" 
                        value={yearValue}
                        onChange={e => setYearValue(e.target.value)}
                        style={{
                            borderRadius: '30px',
                            fontSize: '1.5rem',
                            background: GlobalColors.hardGrey,
                            color: 'white',
                            padding: '10px 20px',
                        }}>
                        {years?.map((year, i) => (
                            <option key={i} value={year}>{year}</option>
                        ))}
                    </Form.Select>
                    <Form.Select size="lg" 
                        value={monthValue}
                        onChange={e => setMonthValue(e.target.value)}
                        style={{
                            borderRadius: '30px',
                            fontSize: '1.5rem',
                            background: GlobalColors.hardGrey,
                            color: 'white',
                            padding: '10px 20px',
                        }}>
                        {months?.map((month, i) => (
                            <option key={i} value={i+1}>{month}</option>
                        ))}
                    </Form.Select>
                </SelectHolder>
                <AvailableDateContainer>
                    <h5>{`Tanggal yang tersedia bulan ${months[monthValue]} Tahun ${yearValue} :`}</h5>
                    { isAvailableDateLoading && <CircularProgress /> }
                    { !isAvailableDateLoading && availableDate?.map((date, i) => (
                        <span key={i} >{i === 0 ? "" : ","} {date}</span>
                    ))}
                </AvailableDateContainer>
                <StyledTitle 
                    justifyContent="flex-start" 
                    fontSize="2.5"
                    isActive={true}>
                        Sedang Berlangsung
                </StyledTitle>
                { isOrderLoading && <CircularProgress /> }
                { !isOrderLoading && activeOrder?.map((order, i) => (
                    <CardSchedule key={i} isActive={true} orderDetail={order} />
                ))}
                { !isOrderLoading && activeOrder?.length === 0 && <p style={{
                    color: GlobalColors.green,
                    fontSize: '2rem',
                }}>😔 Tidak ada order yang sedang berlangsung</p> }
                <StyledTitle 
                    justifyContent="flex-start" 
                    fontSize="2.5">
                        Akan Datang
                </StyledTitle>
                <CardScheduleContainer>
                    {isOrderLoading && <CircularProgress />}
                    {!isOrderLoading && queueOrder?.map((order, i) => (
                        <CardSchedule key={i} orderDetail={order} />
                    ))}
                    {!isOrderLoading && queueOrder?.length === 0 && <p style={{
                        color: GlobalColors.violet,
                        fontSize: '2rem',
                    }}>😔 Tidak ada order yang sedang mengantre, ayo buruan pesan!</p>}
                </CardScheduleContainer>
            </StyledSection>
            <Footer />
        </>
     );
}
 
export default Schedule;
