import React from 'react';
import { useLanguage } from '../context/useLanguage';
import { carouselSlides } from '../components/data/carouselData';

const ImageCarousel = () => {
  // Получаем текущий язык из контекста
  const { language } = useLanguage();
  const content = carouselSlides[language] || carouselSlides.ua;
  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
      <div className="carousel-indicators"> 
        {content.rows.map((_, index) => (
          <button 
            key={`indicator-${index}`}
            type="button" 
            data-bs-target="#carouselExampleCaptions" 
            data-bs-slide-to={index} 
            className={index === 0 ? "active" : ""}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {content.rows.map((slide, index) => (
          <div key={`slide-${index}`} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img src={slide.image} className="d-block w-100" loading="lazy" alt={slide.alt} />
            <div className="carousel-caption d-none d-md-block">
              <h5>{slide.title}</h5>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div> 
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};
  
export default ImageCarousel;