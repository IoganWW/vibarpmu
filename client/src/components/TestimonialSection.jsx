import React from 'react';
import { useLanguage } from '../context/useLanguage';
import { testimonialData, testimonialIcons } from './data/testimonialData';

const TestimonialSection = () => {
  const { language } = useLanguage();
  const { title, testimonials } = testimonialData[language] || testimonialData.ua;

  return (
    <div className="bg-dark text-white px-4 py-5">
      <h4 className="text-center">
        <i className="bi bi-chat-quote"></i> {title}
      </h4>
      <div className="pt-3">
        {testimonials.map(({ text, author, iconKey }, index) => (
          <blockquote key={index} className="blockquote text-center">
            <p><i className={testimonialIcons[iconKey]}></i> "{text}"</p>
            <footer className="blockquote-footer text-white">{author}</footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;