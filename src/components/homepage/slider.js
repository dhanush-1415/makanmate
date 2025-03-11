// src/components/Carousel.js
import React , {useEffect , useState} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './slider.css'; 
import d2 from '../../assets/sliders/z1.png';
import d3 from '../../assets/sliders/z2.png';
import d4 from '../../assets/sliders/z3.png';
import { toast  } from 'react-toastify';
import { makan } from '../../config';
import { getAllBanners } from '../../apiCalls';

const images = [ d2, d3, d4];

const CarouselComponent = () => {

  const [carouselData, setCarouselData] = useState([]);


  useEffect(() => {
    const requestData = {
      OrgId: makan.orgId,
    };

    getAllBanners(requestData)
      .then((response) => {
        if (response.Message === 'Sucess') {
          if (response.Data && response.Data.length) {
            setCarouselData(response.Data);
          } else {
            console.log("No Add-on products");
          }
        } else {
          console.log(response.Message + ' in getting options');
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

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
      {carouselData.map((item, index) => (
        <div key={index} className="carousel-item">
          <img className='responsive-image' src={item.BannerImageFilePath} alt={`carousel-${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
