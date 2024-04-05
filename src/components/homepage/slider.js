// src/components/Carousel.js
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './slider.css'; 
import d2 from '../../assets/sliders/z1.png';
import d3 from '../../assets/sliders/z2.png';
import d4 from '../../assets/sliders/z3.png';


const images = [ d2, d3, d4];

const CarouselComponent = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const carouselSettings = {
    responsive: responsive,
    autoPlay: true, 
    autoPlaySpeed: 4000, 
    infinite: true,
  };

  return (
    <Carousel {...carouselSettings}>
      {images.map((image, index) => (
        <div key={index} className="carousel-item">
          <img className='responsive-image' src={image} alt={`carousel-${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
