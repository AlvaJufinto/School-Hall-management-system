import { useState } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';

import { StyledTitle } from "../ReuseableComponents/ReuseableComponents";

import { GlobalMeasurements, GlobalColors } from '../globals';
import PreviewImg from "../assets/img/preview-img.png";

import 'bootstrap/dist/css/bootstrap.min.css';

const PreviewSection = () => {
    const data = [
        {
            image: require('./../assets/img/preview-img.png'), 
            caption:"Caption 1",
            description:"Description 1 Here"
        },
        {
            image: require('./../assets/img/preview-img.png'), 
            caption:"Caption 2",
            description:"Description 2 Here"
        },
        {
            image: require('./../assets/img/preview-img.png'), 
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
                maxHeight: '530px',
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

