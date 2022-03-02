import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import { CreateOutlined, DeleteOutlineOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

import StyledNavbarAdmin from '../../components/admin/NavbarAdmin';
import OrderCardComponent from '../../components/admin/OrderCardAdmin';
import OrderCardInfo from "../../components/admin/OrderCardInfo";
import CardComponent from "../../components/Cards";
import OrderEditFormComponent from "../../components/admin/OrderEditAdmin";

import { GlobalColors, GlobalFonts } from "../../globals";
import { AdminStyledSection, StyledLink, StyledButton, AdminDetailSection } from '../../ReuseableComponents/ReuseableComponents';

import { adminDataApi } from "../../api/api";
import { AdminOrderContext } from "../../context/AdminOrderContext";
import DummyImg from "./../../assets/img/dummy-img-1.png";
import DummyImgPlain from "./../../assets/img/dummy-img-3.png";

const OrderViewContainer = styled.div`
    font-family: ${GlobalFonts.secondary};

    ${Modal} {
        font-family: ${GlobalFonts.secondary};
    }
`;

export const DetailPreview = styled.div`
    padding: 0 0 50px 0;
    
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
    }


    @media (max-width: 1024px) {
        .InfoHolder {
            flex-direction: column;
        }
    }
    
`

const OrderDone = () => {
    const { isLoading: orderIsLoading, dispatch, order, packet } = useContext(AdminOrderContext);
    const [viewOrder, setViewOrder] = useState([]);
    const [activePacket, setActivePacket] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    const { orderId } = useParams();
    let navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        setViewOrder(order.filter(item => item._id === orderId));
    }, [orderId, order, packet]);
    
    useEffect(() =>{
        setActivePacket(packet.filter(item => item._id === viewOrder[0]?.paketId));
    }, [viewOrder])
    
    const orderDeleteHandler = async (orderId) => {
        if(accessToken) {
            dispatch({ type: 'DELETE_ADMIN_ORDER_START'});
            try {
                const res = await adminDataApi.deleteOrder({ params: orderId, accessToken: accessToken });
                navigate(-1, { replace: true });
                dispatch({ type: "DELETE_ADMIN_ORDER_SUCCESS", payload: orderId});
            } catch(err) {
                console.log(err.response);
                dispatch({ type: 'DELETE_ADMIN_ORDER_FAILURE' });
            }
        }
    }

    return (
        <OrderViewContainer>
            <StyledNavbarAdmin />
            <AdminStyledSection>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {viewOrder && viewOrder.map((viewOrder) => (
                            <OrderEditFormComponent 
                                key={viewOrder?._id}
                                id={orderId}
                                setShowModal={setShowModal}
                                atasNama={viewOrder?.atasNama} 
                                namaAcara={viewOrder?.namaAcara} 
                                tanggal={viewOrder?.tanggal}
                                activePacket={activePacket}
                                tipeOrder={viewOrder?.tipeOrderan}
                                namaPaket={activePacket && activePacket[0]?.namaPaket}
                                jumlahPorsi={viewOrder?.tipeOrderan === 'plain' ? '' : viewOrder?.jumlahPorsi}
                                harga={viewOrder?.tipeOrderan === 'plain' ?activePacket[0]?.hargaAula : activePacket && (viewOrder?.jumlahPorsi * activePacket[0]?.detailCatering?.hargaPerBuah) + activePacket[0]?.hargaAula}
                                status={viewOrder?.status}
                                email={viewOrder?.email}
                                whatsapp={viewOrder?.whatsapp}
                            />
                        ))}
                    </Modal.Body>
                </Modal>
                <DetailPreview>
                    <h3 className="fw-bolder">/Detail Pesanan - <b style={{
                        color: viewOrder && viewOrder[0]?.status == 'selesai' || viewOrder && viewOrder[0]?.status == 'paid' ? GlobalColors.green : GlobalColors.red,
                        textTransform: 'uppercase',
                    }}>{viewOrder && viewOrder[0]?.status}</b></h3>
                    <div className="Option">
                        {viewOrder[0]?.status === 'paid' || viewOrder[0]?.status === 'order' ?
                            <StyledButton 
                                variant="success"
                                onClick={() => setShowModal(true)}
                                background={GlobalColors.green}
                                borderRadius="20"
                                fontSize="2"
                                disabled={orderIsLoading}>
                                { orderIsLoading && <CircularProgress style={{
                                    color: 'white'
                                }} /> }
                                { !orderIsLoading && 
                                    <CreateOutlined style={{ fontSize: '2rem' }} />
                                }
                            </StyledButton>
                            : ""
                        }
                        <StyledButton 
                            variant="danger"
                            background={GlobalColors.red}
                            borderRadius="20"
                            fontSize="2"
                            onClick={(e) => orderDeleteHandler(orderId)} 
                            disabled={orderIsLoading}>
                            { orderIsLoading && <CircularProgress style={{
                                color: 'white'
                            }} /> }
                            { !orderIsLoading && 
                                <DeleteOutlineOutlined style={{ fontSize: '2rem' }} />
                            }   
                        </StyledButton>
                    </div>
                    <div className="InfoHolder">
                        {viewOrder && viewOrder.map((viewOrder) => (
                            <OrderCardInfo 
                                key={viewOrder?._id}
                                setShowModal={setShowModal}
                                atasNama={viewOrder?.atasNama} 
                                deskripsi={viewOrder?.deskripsi}
                                namaAcara={viewOrder?.namaAcara} 
                                orderId={viewOrder?._id}
                                tanggal={viewOrder?.tanggal}
                                tipeOrder={viewOrder?.tipeOrderan}
                                namaPaket={activePacket && activePacket[0]?.namaPaket}
                                jumlahPorsi={viewOrder?.tipeOrderan === 'plain' ? '' : viewOrder?.jumlahPorsi}
                                harga={viewOrder?.tipeOrderan === 'plain' ?activePacket && activePacket[0]?.hargaAula : activePacket && (viewOrder?.jumlahPorsi * activePacket[0]?.detailCatering?.hargaPerBuah) + activePacket[0]?.hargaAula}
                                status={viewOrder?.status}
                                email={viewOrder?.email}
                                whatsapp={viewOrder?.whatsapp}
                            />
                        ))}
                        {activePacket && activePacket.map((packet) => (
                            <CardComponent 
                                packetPlain={packet?.paketPlain}
                                image={packet?.paketPlain ? DummyImgPlain : DummyImg} 
                                deskripsi={packet?.deskripsi}
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
        </OrderViewContainer>
    )
}

export default OrderDone;
