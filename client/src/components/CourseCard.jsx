import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../context/useLanguage';

// Компонент карточки курса с оптимизацией через memo
const CourseCard = memo(({ id, img, title, text,
  headerIcon = 'book', // Значение по умолчанию
  headerClass = '', 
  isExpanded = false, 
  onClick }) => {
  // Получаем текущий язык из контекста
  const { language } = useLanguage();
  return (
   <div id={id} className="col-12 col-sm-6 px-5 py-2 px-sm-3" onClick={onClick}>
    <div className="card text-white bg-dark border-dark h-100" style={{cursor:'pointer'}}>
      <div className={`card-header ${headerClass} text-center`}>
        <i className={`bi bi-${headerIcon}`}></i> {text[language].headerText}
      </div>
      <img 
        src={img} 
        className={`card-img-top d-sm-block ${isExpanded ? '' : 'd-none'}`} 
        loading="lazy" 
        alt={title}
      />
      <div className="card-body text-center d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className={`card-text d-sm-block ${isExpanded ? '' : 'd-none'}`}>
          {text[language].description}
        </p>
      </div>
      <div className="card-footer text-center bg-dark">
        <a href="courses" className="btn btn-warning btn-sm mt-2">{text[language].details}</a>
      </div>
    </div>
   </div>
  )
});

// Добавляем проверку типов пропсов
CourseCard.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  headerIcon: PropTypes.string,
  headerClass: PropTypes.string,
  details: PropTypes.string,
  isExpanded: PropTypes.bool,
  onClick: PropTypes.func
};

// Именуем компонент для удобства отладки
CourseCard.displayName = 'CourseCard';

export default CourseCard;
