// src/components/Footer.js
import React from 'react';
import { useLanguage } from '../context/useLanguage';
import footerData from '../components/data/footerData';

const Footer = () => {
  const { language } = useLanguage();
  // Получаем данные для выбранного языка, по умолчанию ua
  const content = footerData[language] || footerData.ua;

  return (
    <footer className="bg-dark text-white pt-4">
		<div className="container text-center">
		    <div className="row">
			    <div className="col-6 col-sm-6 col-lg">
				    <button className="btn btn-soft-light mb-3" data-bs-toggle="collapse"
						data-bs-target="#footerSocial">{content.social}</button>
				    <section id="footerSocial" className="collapse d-md-block mb-3">
					  <a className="btn btn-outline-light m-1" href="https://www.instagram.com/vi_bar_pmu" target="_blank">
						  <i className="bi bi-instagram fs-3" style={{color:'red'}}></i>
					  </a>
					  <a className="btn btn-outline-light m-1" href="https://www.facebook.com/ViBarPMU/" target="_blank">
						  <i className="bi bi-facebook fs-3" style={{color:'#0000CD'}}></i>
					  </a>
					  <a className="btn btn-outline-light m-1" href="https://t.me/vi_bar_pmu" target="_blank">
						  <i className="bi bi-telegram fs-3" style={{color:'#00BFFF'}}></i>
					  </a>
					  <a className="btn btn-outline-light m-1" href="https://www.tiktok.com/@yourtiktok" target="_blank">
						  <i className="bi bi-tiktok fs-3"></i>
					  </a>
					  <a className="btn btn-outline-light m-1" href="https://www.youtube.com/@youryoutube" target="_blank" hidden>
						  <i className="bi bi-youtube fs-3" style={{color:'#FF0000'}}></i>
					  </a>
					  <a className="btn btn-outline-light m-1" href="https://wa.me/+380956832803" target="_blank">
						  <i className="bi bi-whatsapp fs-3" style={{color:'#25D366'}}></i>
					  </a>
					  <a className="btn btn-outline-light m-1" href="viber://chat?number=+380956832803" target="_blank">
						  <i className="bi bi-chat-dots-fill fs-3" style={{color:'#7360F2'}}></i>
					  </a>
				    </section>
			    </div>
  
			    <div className="col-6 col-sm-6 col-lg">
				    <button className="btn btn-soft-light mb-3" data-bs-toggle="collapse"
						data-bs-target="#footerProducts">{content.products}</button>
				    <div id="footerProducts" className="collapse d-md-block p-2">
					  <h5>{content.offline}</h5>
					  <ul className="list-unstyled mb-1">
						  <li><a href="coursesGroup">{content.basic}</a></li>
						  <li><a href="coursesGroup"><span style={{color:"red"}}>{content.levelUp}</span></a></li>
					  </ul>
					  <h5>{content.online}</h5>
					  <ul className="list-unstyled mb-1">
						  <li><a href="coursesGroup">{content.thematic}</a></li>
						  <li><a href="coursesGroup"><span style={{color:"red"}}>{content.personal}</span></a></li>
					  </ul>
				    </div>
			    </div>
  
			    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl d-flex justify-content-center mb-3">
					<button className="btn btn-soft-light me-3 d-lg-none" data-bs-toggle="collapse"
						data-bs-target="#footerMap">{content.map}</button>
					<div id="footerMap" className="ratio ratio-16x9 collapse d-md-block" style={{width:'260px', height:'180px'}}>
					  <iframe src="https://www.google.com/maps/embed?pb=!4v1742571300830!6m8!1m7!1sp2OmkjFIPm-8qO2d9jpneA!2m2!1d42.55839841103944!2d27.52135263360402!3f185.06722905011293!4f0.30763675103546007!5f0.7820865974627469"
						  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
					  </iframe>
				    </div>
			    </div>
  
			    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl">
				    <button className="btn btn-soft-light mb-3" data-bs-toggle="collapse"
						data-bs-target="#footerContacts">{content.contacts}</button>
				    <div id="footerContacts" className="collapse d-md-block">
						<address>
					  		<strong>{content.tel}:</strong> +380956832803, +359886138004<br/>
					  		<strong>{content.email}:</strong> <a href="mailto:arabadzhyvioletta@gmail.com" className="text-white">arabadzhyvioletta@gmail.com</a><br/>
					  		<strong>{content.address}:</strong> 8016 Bulgaria, Burgas, Sarafovo<br/>
					  		{content.location}
				    	</address>
					</div>
			    </div>
		    </div>
		</div>

		<div className="text-center p-3" style={{backgroundColor:'rgba(0, 0, 0, 0.2'}}>
			{content.copyright}
			<a className="text-white p-2" href="https://www.instagram.com/vi_bar_pmu">ViBarPMU</a>
		</div>
	</footer>
  );
};

export default Footer;