import React from 'react';
import { trainingInfoData, trainingIcons } from '../components/data/trainingInfoData';
import { useLanguage } from '../context/useLanguage';

const TrainingInfo = () => {
  // Получаем текущий язык из контекста
  const { language } = useLanguage();
  
  // Получаем данные для выбранного языка, по умолчанию русский
  const content = trainingInfoData[language] || trainingInfoData.ua;
  const icons = trainingIcons;
  
  // Функция для рендеринга HTML-контента с тегами
  const renderHTML = (htmlString) => {
    return <span dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };
  
  return (
    <div className="container-fluid">
      <div className="col-md-8 offset-md-2 bg-light px-4 py-5 rounded">
        <h3 className="mb-3"><i className={icons.title}></i> {content.title}</h3>
        <p><i className={icons.introduction}></i> {renderHTML(content.introduction)}</p>

        <h4 className="mt-3"><i className={icons.offlineTitle}></i> {content.offline.title}</h4>
        <ul>
          {content.offline.items.map((item, index) => (
            <li key={`offline-item-${index}`}>
              <i className={icons.offlineItems[index] || 'bi bi-check'}></i> {' '}
              {renderHTML(item)}
            </li>
          ))}
        </ul>

        <h4 className="mt-3"><i className={icons.onlineTitle}></i> {content.online.title}</h4>
        <ul>
          {content.online.items.map((item, index) => (
            <li key={`online-item-${index}`}>
              <i className={icons.onlineItems[index] || 'bi bi-check'}></i> {' '}
              {renderHTML(item)}
            </li>
          ))}
        </ul>

        <p className="mt-4">
          <i className={icons.important}></i> {' '}
          {renderHTML(content.important)}
        </p>
      </div>
    </div>
  );
};

export default TrainingInfo;