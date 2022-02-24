import { useContext, useEffect, useState } from "react"
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

import { clientDataApi } from "./../api/api";
import CardComponent from "./Cards";

import { GlobalMeasurements, GlobalColors } from '../globals';
import { StyledLink, StyledSection, StyledTitle, StyledButton } from "../ReuseableComponents/ReuseableComponents";

import DummyImg from "./../assets/img/dummy-img-1.png";
import DummyImgPlain from "./../assets/img/dummy-img-3.png";


const CardsContainer = styled.div`
    padding: 0 0 100px 0;
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 40px;
`

const PacketCards = () => {
    const [packets, setPackets]  = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const res = await clientDataApi.allPackets();
                setPackets(res.data.data.paket);
                console.log(res.data.data.paket);
                console.log(packets);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        })();
    }, []);

    return (
        <StyledSection>
            <StyledTitle>Pilih paket</StyledTitle>
            <CardsContainer>
                {isLoading && <CircularProgress /> }
                {!isLoading && packets?.map((packet) =>(
                    <StyledLink to={`/form-order/${packet._id}`}>
                        <CardComponent 
                            packetPlain={packet?.paketPlain}
                            image={packet?.paketPlain ? DummyImgPlain : DummyImg} 
                            title={packet?.namaPaket}
                            deskripsi={packet?.deskripsi}
                            packet={packet?.detailCatering && packet?.detailCatering?.detailPaketCatering}
                            price={packet?.detailCatering ? packet.detailCatering.hargaPerBuah : '0'}
                            cardVariant="small"
                            className="h-100"
                        />
                    </StyledLink>
                ))}
            </CardsContainer>
        </StyledSection>
    )
}

export default PacketCards;
