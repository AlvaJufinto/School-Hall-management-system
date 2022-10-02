import { useState } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';

import { StyledTitle } from "../ReuseableComponents/ReuseableComponents";

import { GlobalMeasurements, GlobalColors } from '../globals';
import JumbotronImg from "../assets/img/gambar-aula-jumbotron.jpg";

import 'bootstrap/dist/css/bootstrap.min.css';

const PreviewSection = () => {
    const data = [
        {
            image: "https://timur.jakarta.go.id/v15/assets/images/content/news/1564990032.jpeg", 
            caption:"Caption 1",
            description:"Description 1 Here"
        },
        {
            image: "https://www.indonesiana.id/images/all/2019/11/12/f201911121656044.jpg", 
            caption:"Caption 2",
            description:"Description 2 Here"
        },
        {
            image: JumbotronImg, 
            caption:"Caption 3",
            description:"Description 2 Here"
        }
    ];

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>  
            <StyledTitle style={{
                backgroundColor: GlobalColors.lightBack,
                width: '90%',
                maxWidth: `${GlobalMeasurements.containerWidth}px`,
            }}>Preview Aula</StyledTitle>
            <Carousel activeIndex={index} onSelect={handleSelect} style={{
                margin: '-10px 0',
                maxHeight: '600px',
            }}>
                {data.map((slide, i) => {
                    return (
                        <Carousel.Item style={{
                            maxHeight: '500px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>        
                            <img
                                className="d-block w-100"
                                src={slide.image}
                                alt="slider image"
                                style={{
                                    filter: 'brightness(60%)',
                                }}
                            />
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </>
    )
}

export default PreviewSection;

