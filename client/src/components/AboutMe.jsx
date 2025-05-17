import React from 'react';
import { aboutMeContent } from '../components/data/aboutMeData';
import { aboutMeImg } from '../assets/images';
import { useLanguage } from '../context/useLanguage';

const AboutMe = () => {
  // Получаем текущий язык из контекста
  const { language } = useLanguage();
    
  // Получаем данные для выбранного языка, по умолчанию ua
  const content = aboutMeContent[language] || aboutMeContent.ua;
  const { title, intro, instagramLink, instagramNick, paragraphs, footer } = content;
  
  return (
    <div className="card mb-3 rounded-3 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 bg-light">
      <div className="row g-0 row-cols-1 row-cols-md-2 align-items-center">
        <div className="col h-100 col-sm-8 offset-sm-2 col-md-5 offset-md-0">
          <img src={aboutMeImg} className="rounded-start" loading="lazy" alt="aboutMe" style={{width:'100%'}}/>
        </div>
        <div id="aboutMe" className="col h-100 col-md-7 p-3">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="lead textAboutMe">
              {intro.split(instagramNick)[0]}
              <a href={instagramLink}> {instagramNick}</a>
              {intro.split(instagramNick)[1]}
            </p>
            
            {paragraphs.map((paragraph, index) => (
              <p key={`about-paragraph-${index}`} className="textAboutMe">
                {paragraph}
              </p>
            ))}
            
            <p className="card-text"><small className="text-muted">{footer}</small></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;