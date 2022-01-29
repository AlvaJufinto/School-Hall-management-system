import { useState } from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';

import { StyledTitle } from "../ReuseableComponents/ReuseableComponents";

import { GlobalMeasurements } from '../globals';
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
            <StyledTitle style={{display: 'flex', justifyContent: 'center'}}>Preview Aula</StyledTitle>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {data.map((slide, i) => {
                    return (
                    <Carousel.Item>        
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

