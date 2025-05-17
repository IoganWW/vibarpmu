const path = require('path');
const dotenv = require('dotenv');

// Загружаем соответствующий файл окружения
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });

module.exports = {
  port: process.env.PORT || 5000,
  host: process.env.HOST || 'localhost',
  dbUri: process.env.DB_URI,
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
