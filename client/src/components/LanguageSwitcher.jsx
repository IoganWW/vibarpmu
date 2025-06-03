import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';
import ReactCountryFlag from 'react-country-flag';

const LanguageSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams();
  const { language, changeLanguage } = useLanguage();

  // Маппинг кодов языков на коды стран
  const languageOptions = [
    { code: 'ua', country: 'UA', label: 'Українська' },
    { code: 'en', country: 'GB', label: 'English' },
    { code: 'bg', country: 'BG', label: 'Български' },
    { code: 'tr', country: 'TR', label: 'Türkçe' },
    //{ code: 'de', country: 'DE', label: 'Deutsch' },
    //{ code: 'pl', country: 'PL', label: 'Polski' },
    // Добавьте другие языки при необходимости
  ];

  const handleLanguageChange = (newLang) => {
    // Меняем контекст
    changeLanguage(newLang);
    
    // Меняем URL, сохраняя текущую страницу
    const currentPath = location.pathname.replace(`/${lang}`, '');
    navigate(`/${newLang}${currentPath || '/home'}`);
  };

  return (
    <div className="language-switcher bg-dark py-2 px-2 me-md-2 order-md-last">
      <div className="flag-buttons">
        {languageOptions.map((option) => (
          <button
            key={option.code}
            onClick={() => handleLanguageChange(option.code)}
            className={`flag-button ${language === option.code ? 'active' : ''}`}
            title={option.label}
            aria-label={`Сменить язык на ${option.label}`}
          >
            <ReactCountryFlag 
              countryCode={option.country} 
              svg
              alt={option.country}
              style={{ 
                width: '20px', 
                height: '15px',
                border: language === option.code ? '2px solid #007bff' : '1px solid #ddd',
                borderRadius: '2px',
                cursor: 'pointer'
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;