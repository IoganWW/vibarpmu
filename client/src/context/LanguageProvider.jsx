import React, { useState } from 'react';
import { LanguageContext } from './useLanguage';

// Создаем провайдер
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ua'); // По умолчанию укр мова
  
    // Функция для изменения языка
    const changeLanguage = (newLanguage) => {
      setLanguage(newLanguage);
    };
  
    return (
      <LanguageContext.Provider value={{ language, changeLanguage }}>
        {children}
      </LanguageContext.Provider>
    );
};

export default LanguageProvider;