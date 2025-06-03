import React from 'react';
import lipsBasicSert from '../assets/images/lipsBasicSert.webp';
import { useLanguage } from '../context/useLanguage';
import { guaranteeData, guaranteeIcons } from './data/guaranteeData';

const GuaranteeSection = () => {
  const { language } = useLanguage();
  const { altText, title, benefitsList, guaranteeTitle, guaranteesList } = guaranteeData[language] || guaranteeData.ua;

  return (
    <div className="container-fluid col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 p-2">
      <div className="row align-items-center">
        <div className="col-sm-4 p-3 d-none d-sm-block">
          <img src={lipsBasicSert} className="card-img-top" alt={altText} />
        </div>
        <div className="col-12 col-sm-8 p-3 bg-light">
          <h2><i className="bi bi-shield-check"></i> {title}</h2>
          <ul className="list-unstyled">
            {benefitsList.map((benefit, index) => (
              <li key={`benefit-${index}`}>
                <i className={guaranteeIcons.benefitsList[index]}></i> {benefit}
              </li>
            ))}
          </ul>
          <p><b><i className="bi bi-exclamation-circle"></i> {guaranteeTitle}</b></p>
          <ul className="list-unstyled">
            {guaranteesList.map((guarantee, index) => (
              <li key={`guarantee-${index}`}>
                <i className={guaranteeIcons.guaranteesList[index]}></i> {guarantee}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeSection;