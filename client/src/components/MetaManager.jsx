// components/MetaManager.jsx
import React, { useEffect } from 'react';
import { useLanguage } from '../context/useLanguage';

const MetaManager = () => {
  const { language } = useLanguage();

  const metaData = {
    ua: {
      title: "Vi Bar PMU - Онлайн-навчання з перманентного макіяжу | Завжди з вами",
      description: "Професійне навчання з перманентного макіяжу від досвідченого майстра. Онлайн-курси та особисті заняття. Брови й губи — тільки якість, без мікроблейдингу.",
      hreflang: "uk",
      url: "https://www.vi-bar-pmu.online/ua"
    },
    en: {
      title: "Vi Bar PMU - Online Training in Permanent Makeup | Always with You",
      description: "Top-tier PMU training by a seasoned artist. Specializing in brows & lips — online courses & in-person sessions available. Quality only. No microblading.",
      hreflang: "en", 
      url: "https://www.vi-bar-pmu.online/en"
    },
    bg: {
      title: "Vi Bar PMU - Онлайн обучение по перманентен грим | Винаги с вас",
      description: "Професионално обучение по перманентен грим от опитен майстор. Онлайн курсове и присъствени сесии. Вежди и устни – без микроблейдинг, само качество.",
      hreflang: "bg",
      url: "https://www.vi-bar-pmu.online/bg"
    },
    tr: {
      title: "Vi Bar PMU - Kalıcı Makyajda Çevrimiçi Eğitim | Her Zaman Yanınızda",
      description: "Deneyimli bir uzmandan kalıcı makyaj eğitimi. Kaş ve dudak için online kurslar ve bireysel eğitim. Mikroblading yok – sadece kalite.",
      hreflang: "tr",
      url: "https://www.vi-bar-pmu.online/tr"
    }
  };

  const allLanguages = ['ua', 'en', 'bg', 'tr'];

  useEffect(() => {
    const currentMeta = metaData[language];
    
    // Обновляем title
    document.title = currentMeta.title;

    // Обновляем или создаем description
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', currentMeta.description);
      descriptionMeta.setAttribute('lang', currentMeta.hreflang);
    } else {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      descriptionMeta.setAttribute('content', currentMeta.description);
      descriptionMeta.setAttribute('lang', currentMeta.hreflang);
      document.head.appendChild(descriptionMeta);
    }

    // Удаляем все существующие alternate links
    const existingAlternates = document.querySelectorAll('link[rel="alternate"]');
    existingAlternates.forEach(link => link.remove());

    // Добавляем alternate links для всех языков
    allLanguages.forEach(lang => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', metaData[lang].hreflang);
      link.setAttribute('href', metaData[lang].url);
      document.head.appendChild(link);
    });

    // Добавляем canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', currentMeta.url);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', currentMeta.url);
      document.head.appendChild(canonicalLink);
    }

  }, [language]);

  return null; // Этот компонент ничего не рендерит
};

export default MetaManager;