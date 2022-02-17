import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import OrderCardComponent from '../../components/admin/OrderCardAdmin';
import OrderCardInfo from "../../components/admin/OrderCardInfo";

import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';
import DummmyImg from "./../../assets/img/dummy-img-2.png" 

import { AdminOrderContext } from "../../context/AdminOrderContext";
import { ContactMailSharp } from '@mui/icons-material';

const OrderDoneContainer = styled.div`
    height: 100vh;
    font-family: ${GlobalFonts.secondary};
`;

export const DetailPreview = styled.div`
    margin: 0 0 50px 0;
    
    .DetailPreview {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 25px;
        margin: 50px 0 0 0;
    }
`

const OrderDone = () => {
    const { isLoading, dispatch, order, packet } = useContext(AdminOrderContext);
    const [viewOrder, setViewOrder] = useState(null);
    const [status, setStatus] = useState(null);
    const [activePacket, setActivePacket] = useState(null);

    const { orderId } = useParams();
    const { packetId }= useParams();

    useEffect(() => {
        setViewOrder(order.filter(item => item._id === orderId));
        console.log(order.filter(item => item._id === orderId));
    }, [orderId, order, packet]);
    
    useEffect(() =>{
        setActivePacket(packet?.filter(item => item._id === packetId));
        console.log(packet?.filter(item => item._id == packetId))
    }, [viewOrder, packet, order, packetId])

    return (
        <OrderDoneContainer>
            <StyledNavbarAdmin />
            <AdminStyledSection>
                <DetailPreview>
                    <h3 className="fw-bolder">/Order - <b style={{
                        color: viewOrder && viewOrder[0].status == 'selesai' || viewOrder && viewOrder[0].status == 'paid' ? GlobalColors.green : GlobalColors.red,
                        textTransform: 'uppercase',  
                    }}>{viewOrder && viewOrder[0].status}</b></h3>
                    <OrderCardInfo 
                            key={viewOrder && viewOrder[0]?._id}
                            atasNama={viewOrder && viewOrder[0]?.atasNama} 
                            namaAcara={viewOrder && viewOrder[0]?.namaAcara} 
                            orderId={viewOrder && viewOrder[0]?._id}
                            tanggal={viewOrder && viewOrder[0]?.tanggal}
                            tipeOrder={viewOrder && viewOrder[0]?.tipeOrderan}
                            namaPaket={activePacket && activePacket[0]?.namaPaket}
                            jumlahPorsi={viewOrder && viewOrder[0]?.tipeOrderan === 'plain' ? '' : viewOrder && viewOrder[0]?.jumlahPorsi}
                            harga={viewOrder && viewOrder[0]?.tipeOrderan === 'plain' ? activePacket && activePacket[0]?.hargaAula : (viewOrder && viewOrder[0]?.jumlahPorsi *  activePacket && activePacket[0]?.detailCatering?.hargaPerBuah) + activePacket && activePacket[0]?.hargaAula}
                            status={viewOrder && viewOrder[0]?.status}
                            email={viewOrder && viewOrder[0]?.email}
                            whatsapp={viewOrder && viewOrder[0]?.whatsapp}
                        />
                </DetailPreview>
            </AdminStyledSection>
        </OrderDoneContainer>
    )
}

export default OrderDone;
