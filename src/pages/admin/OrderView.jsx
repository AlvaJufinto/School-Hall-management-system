import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { CreateOutlined, DeleteOutlineOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import OrderCardComponent from '../../components/admin/OrderCardAdmin';
import OrderCardInfo from "../../components/admin/OrderCardInfo";
import CardComponent from "../../components/Cards";

import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';
import DummmyImg from "./../../assets/img/dummy-img-2.png" 

import { AdminOrderContext } from "../../context/AdminOrderContext";
import DummyImg from "./../../assets/img/dummy-img-1.png";
import DummyImgPlain from "./../../assets/img/dummy-img-3.png";

const OrderDoneContainer = styled.div`
    font-family: ${GlobalFonts.secondary};
`;

export const DetailPreview = styled.div`
    .Option {
        margin: 20px 0 40px 0;
        width: 150px;
        max-width: 100%;
        display: flex;
        gap: 20px;

        ${StyledButton} {
            flex: 1;
        }
    }

    .InfoHolder {
        display: flex;
        gap: 20px;
        /* margin: 50px 0 0 0; */
    }


    @media (max-width: 1024px) {
        .InfoHolder {
            flex-direction: column;
        }
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
                    <h4>Option</h4>
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
                    <h3 className="fw-bolder">/Detail Pesanan - <b style={{
                        color: viewOrder && viewOrder[0].status == 'selesai' || viewOrder && viewOrder[0].status == 'paid' ? GlobalColors.green : GlobalColors.red,
                        textTransform: 'uppercase',
                    }}>{viewOrder && viewOrder[0].status}</b></h3>
                    <div className="Option">
                        <StyledButton 
                            variant="success"
                            background={GlobalColors.green}
                            borderRadius="20"
                            fontSize="2"
                            // onClick={(e) => orderDeleteHandler(idPesanan)} 
                            >
                            {/* { deleteOrderIsLoading && <CircularProgress style={{
                                color: 'white'
                            }} /> } */}
                            {/* { !deleteOrderIsLoading &&  */}
                                <CreateOutlined style={{ fontSize: '2rem' }} />
                            {/* } */}
                        </StyledButton>
                        <StyledButton 
                            variant="danger"
                            background={GlobalColors.red}
                            borderRadius="20"
                            fontSize="2"
                            // onClick={(e) => orderDeleteHandler(idPesanan)} 
                            >
                                <DeleteOutlineOutlined style={{ fontSize: '2rem' }} />
                        </StyledButton>
                    </div>
                    <div className="InfoHolder">
                        {viewOrder && viewOrder.map((viewOrder) => (
                            <OrderCardInfo 
                                key={viewOrder?._id}
                                atasNama={viewOrder?.atasNama} 
                                namaAcara={viewOrder?.namaAcara} 
                                orderId={viewOrder?._id}
                                tanggal={viewOrder?.tanggal}
                                tipeOrder={viewOrder?.tipeOrderan}
                                namaPaket={activePacket[0]?.namaPaket}
                                jumlahPorsi={viewOrder?.tipeOrderan === 'plain' ? '' : viewOrder?.jumlahPorsi}
                                harga={viewOrder?.tipeOrderan === 'plain' ? activePacket[0]?.hargaAula : (viewOrder?.jumlahPorsi * activePacket[0]?.detailCatering.hargaPerBuah) + activePacket[0]?.hargaAula}
                                status={viewOrder?.status}
                                email={viewOrder?.email}
                                whatsapp={viewOrder?.whatsapp}
                            />
                        ))}
                        {activePacket && activePacket.map((packet) => (
                            <CardComponent 
                                packetPlain={packet?.paketPlain}
                                image={packet?.paketPlain ? DummyImgPlain : DummyImg} 
                                title={packet?.namaPaket}
                                packet={!packet.paketPlain && packet.detailCatering.detailPaketCatering}
                                price={!packet.paketPlain ? packet.detailCatering.hargaPerBuah : '0'}
                                cardVariant="small"
                                className="h-100"
                            />
                        ))} 
                    </div>
                </DetailPreview>
            </AdminStyledSection>
        </OrderDoneContainer>
    )
}

export default OrderDone;
