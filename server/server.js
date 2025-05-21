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

// Импорты маршрутов
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const exclusiveRoutes = require("./routes/exclusiveRoutes");
const buyCoursesRoutes = require("./routes/buyCoursesRoutes");
const liqpayRoutes = require("./routes/liqpay");

// Импорт конфигурации и middleware
const {
  port,
  host,
  clientUrl,
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

const originalAppGet = app.get;
app.get = (...args) => {
  console.log("app.get вызван с аргументами:", args);
  return originalAppGet.apply(app, args);
};

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

console.log(clientUrl);
// Настраиваем CORS
app.use(
  cors({
    origin: [clientUrl],
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
app.use("/api", buyCoursesRoutes);
app.use("/api/liqpay", liqpayRoutes);


// Настройка для режима production - отдача статических файлов клиента
/*if (process.env.NODE_ENV === "production") {
  // Используем ТОЧНЫЙ путь к директории клиента, как показал диагностический скрипт
  const clientPath = path.resolve(__dirname, "../client/dist"); // Это точный путь
  
  console.log("====== НАСТРОЙКА СТАТИЧЕСКИХ ФАЙЛОВ ======");
  console.log(`Использую директорию клиента: ${clientPath}`);
  
  // Проверяем существование директории для уверенности
  if (fs.existsSync(clientPath)) {
    console.log("✅ Директория клиента НАЙДЕНА");
    
    // Проверяем наличие index.html
    const indexHtmlPath = path.join(clientPath, "index.html");
    if (fs.existsSync(indexHtmlPath)) {
      console.log("✅ index.html НАЙДЕН");
      
      // Настройка middleware для раздачи статических файлов
      // ВАЖНО: добавляем заголовки для доступа к статическим файлам через ngrok
      app.use(express.static(clientPath, {
        setHeaders: (res, filePath) => {
          // Разрешаем доступ к файлам из других источников
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
          
          // Кеширование для улучшения производительности
          if (filePath.endsWith('.html')) {
            // HTML не кешируем
            res.setHeader('Cache-Control', 'no-cache');
          } else if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
            // Статические ресурсы кешируем на 1 день
            res.setHeader('Cache-Control', 'public, max-age=86400');
          }
        }
      }));
      
      // Маршрут для обработки SPA роутинга
      app.get('*', (req, res, next) => {
        // Игнорируем API запросы
        if (req.originalUrl.startsWith("/api")) {
          return next();
        }
        
        // Игнорируем запросы к статическим файлам - они уже должны быть обработаны express.static
        if (req.originalUrl.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
          console.log("Запрос к статическому файлу, уже должен быть обработан:", req.originalUrl);
          return next();
        }
        
        console.log("Запрос к приложению, отдаю index.html:", req.originalUrl);
        
        // Устанавливаем необходимые заголовки
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        
        // Отправляем index.html с обработкой ошибок
        res.sendFile(indexHtmlPath, (err) => {
          if (err) {
            console.error("Ошибка при отправке index.html:", err);
            res.status(500).send("Внутренняя ошибка сервера при загрузке index.html");
          }
        });
      });
      
      console.log("✅ Настройка статических файлов ЗАВЕРШЕНА");
    } else {
      console.error("❌ index.html НЕ НАЙДЕН в директории клиента");
    }
  } else {
    console.error("❌ Директория клиента НЕ НАЙДЕНА по пути:", clientPath);
  }
}*/

// Заголовок для ngrok
app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "true");
  next();
});

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