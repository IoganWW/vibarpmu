const Sitemap = require('react-router-sitemap').default;
const path = require('path');

const BASE_URL = 'https://vibarpmu-client.onrender.com';

const supportedLangs = ['ua', 'en', 'bg', 'tr'];

// Генерируем параметры для каждого языка
const langParams = supportedLangs.map(lang => ({ lang }));

const paramsConfig = {
  '/:lang': langParams,
  '/:lang/home': langParams,
  '/:lang/coursesGroup': langParams,
  '/:lang/gallery': langParams,
  '/:lang/faq': langParams,
};

const sitemap = new Sitemap([
  { path: '/:lang' },
  { path: '/:lang/home' },
  { path: '/:lang/coursesGroup' },
  { path: '/:lang/gallery' },
  { path: '/:lang/faq' },
]);

sitemap
  .applyParams(paramsConfig)
  .build(BASE_URL)
  .save(path.resolve(__dirname, 'client', 'public', 'sitemap.xml'));