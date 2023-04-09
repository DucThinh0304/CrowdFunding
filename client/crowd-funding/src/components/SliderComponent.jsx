import React from 'react'
import styled from 'styled-components';
import { sliders } from '../data'
import Slider from "react-slick";
import '../CSS/SliderComponent.css'



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
`;

const Title = styled.h1`
  color: #c9366f;
  font-size: 36px;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 30px;
`;

const SliderContainer = styled.div`
  width: 1110px;
  align-items: center;
  justify-content: center;
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: false,
}

const SliderComponent = () => {
return (
  <Container>
      <Title>Báo chí nói về chúng tôi</Title>
      <SliderContainer>
        <Slider {...settings}>
          {sliders.map(slide => (
            <div key={slide.Id} className='sliderContainer'>
              <p className='text'>"{slide.text}"</p>
              <div className='imageContainer'>
                <img className='logo' src={slide.logosrc} alt={slide.logotxt}/>
              </div>
              <a className='title'>{slide.title}</a>
              <div className='logoText'>{slide.logotxt}</div>
            </div>
          ))}
        </Slider>
      </SliderContainer>
  </Container>
  )
}


export default SliderComponent