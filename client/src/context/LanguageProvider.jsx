import React, { useState } from "react";
import { LanguageContext } from "./useLanguage";

// Создаем провайдер
export const LanguageProvider = ({ children }) => {
  const getDefaultLanguage = () => {
    const pathLang = window.location.pathname.split("/")[1];
    const supported = ["ua", "en", "bg", "tr"];
    return supported.includes(pathLang) ? pathLang : "ua";
  };

  const [language, setLanguage] = useState(getDefaultLanguage());

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
