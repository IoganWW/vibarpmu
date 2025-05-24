// Обработка необработанных ошибок
process.on("unhandledRejection", (reason, promise) => {
  console.error("Необработанное отклонение промиса:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Необработанная ошибка:", err);
  process.exit(1);
});

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");
//const { createProxyMiddleware } = require('http-proxy-middleware');

// Импорты маршрутов
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const exclusiveRoutes = require("./routes/exclusiveRoutes");
const removeCoursesRoutes = require("./routes/removeCoursesRoutes");
const liqpayRoutes = require("./routes/liqpay");

// Импорт конфигурации и middleware
const {
  port,
  host,
  clientUrlsCors,
  dbUri,
  rateLimit: rateLimitConfig,
  logging,
  compression: compressionConfig,
} = require("./config");
const errorHandler = require("./middlewares/errorHandler");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const morgan = require("morgan");

// Создаем экземпляр Express приложения
const app = express();

// Проксирование запросов к Vite dev серверу
/*app.use('/', createProxyMiddleware({
  target: 'http://localhost:5173',
  changeOrigin: true,
  ws: true, // для поддержки WebSocket
}));*/

// Функция фильтрации для сжатия только определенных типов контента
function shouldCompress(req, res) {
  // Не сжимать, если клиент не поддерживает сжатие
  if (req.headers["x-no-compression"]) return false;

  // В первую очередь сжимать текстовый контент
  const contentType = res.getHeader("Content-Type") || "";

  // Список типов для сжатия
  const compressibleTypes = [
    "text/",
    "application/json",
    "application/javascript",
    "application/xml",
    "application/xhtml+xml",
    "font/",
  ];

  // Проверяем, подходит ли тип контента для сжатия
  if (compressibleTypes.some((type) => contentType.includes(type))) {
    return compression.filter(req, res);
  }

  // Не сжимать другие типы (например, изображения, которые уже сжаты)
  return false;
}

// Добавляем базовый логгер для всех запросов
app.use((req, res, next) => {
  console.log("===> Пришел запрос:", req.originalUrl);
  next();
});

app.use(
  compression({
    level: compressionConfig.level,
    threshold: compressionConfig.threshold,
    filter: shouldCompress,
  })
);

// Настройка Helmet с отключенными политиками, которые могут блокировать статические файлы
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Настройка логирования с Morgan
// Создадим директорию для логов, если она не существует
const logsDirectory = path.join(__dirname, logging.directory);
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory, { recursive: true });
}

// Создаем поток для записи логов в файл
const accessLogStream = fs.createWriteStream(
  path.join(logsDirectory, "access.log"),
  { flags: "a" }
);

// Настройка форматов логирования
if (process.env.NODE_ENV === "production") {
  // В продакшене логируем в файл
  app.use(morgan(logging.format, { stream: accessLogStream }));
} else {
  // В режиме разработки логируем в консоль
  app.use(morgan(logging.format));
}

// Стандартный middleware для парсинга JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1); // доверие первому прокси (ngrok, nginx и т.д.)

// Настройка rate-limiter
const limiter = rateLimit({
  windowMs: rateLimitConfig.windowMs,
  max: rateLimitConfig.max,
  standardHeaders: true,
  legacyHeaders: false,
  message:
    "Слишком много запросов с этого IP, пожалуйста, повторите попытку позже",
});

app.use(limiter);

console.log(clientUrlsCors);
// Настраиваем CORS
app.use(
  cors({
    origin: [clientUrlsCors],
    credentials: true,
  })
);

// Настройка обработки статических файлов для изображений и видео
app.use(
  "/images",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "images"))
);

app.use(
  "/video",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "video"))
);

// Регистрируем маршруты API
app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", exclusiveRoutes);
app.use("/api", removeCoursesRoutes);
app.use("/api/liqpay", liqpayRoutes);


// Обработчик 404 - должен быть размещен ПОСЛЕ всех маршрутов
app.use((req, res, next) => {
  res.status(404).send("Страница не найдена");
});

// Обработчик ошибок - должен быть последним middleware
app.use(errorHandler);

// Подключение к MongoDB с мониторингом соединения
mongoose
  .connect(dbUri)
  .then(() => console.log("Успешное подключение к MongoDB"))
  .catch((error) => console.error("Ошибка подключения к MongoDB:", error));

// Мониторинг состояния соединения с MongoDB
mongoose.connection.on("connected", () => {
  console.log("MongoDB подключена");
});

mongoose.connection.on("error", (err) => {
  console.error("Ошибка MongoDB:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB отключена");
});

// Запускаем сервер
app.listen(port, host, () => {
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log(`Server running on http://${host}:${port}`);
});