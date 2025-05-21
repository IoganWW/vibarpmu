const path = require('path');
const dotenv = require('dotenv');

// Загружаем соответствующий файл окружения
//console.log("Current NODE_ENV:", process.env.NODE_ENV);
const envFile = `.env.${(process.env.NODE_ENV || 'development').trim()}`;
const result = dotenv.config({ path: path.resolve(__dirname, envFile) });
if (result.error) {
  console.error("Error loading .env file:", result.error);
} else {
  console.log(".env file loaded successfully");
}
// Отладка значений после загрузки
//console.log("DB_URI after loading:", process.env.DB_URI);

module.exports = {
  port: process.env.PORT || 5000,
  host: process.env.HOST || 'localhost',
  dbUri: process.env.DB_URI,
  clientUrl: process.env.CLIENT_URL.split(','),
  rateLimit: {
    windowMs: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000,
    max: process.env.RATE_LIMIT_MAX || 100
  },
  logging: {
    format: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    directory: process.env.LOG_DIR || 'logs'
  },
  compression: {
    level: process.env.COMPRESSION_LEVEL || 6,
    threshold: process.env.COMPRESSION_THRESHOLD || 100
  },
  jwtSecret: process.env.JWT_SECRET,
  stripeSecret: process.env.STRIPE_SECRET_KEY,
  environment: process.env.NODE_ENV || 'development',
  // Можно добавить логику для разных окружений
  isDev: (process.env.NODE_ENV || 'development') !== 'production'
};
