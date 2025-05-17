const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { jwtSecret } = require("../config");
const asyncHandler = require("../middlewares/asyncHandler");
const AppError = require('../utils/AppError');

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  // Ищем пользователя по email в MongoDB
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid credentials", 400);
  }

  // Сравниваем введённый пароль с хэшированным в базе
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // Если пароль неверный
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  // Генерация JWT
  const token = jwt.sign(
    { id: user._id, name: user.name, paidCourses: user.paidCourses },
    jwtSecret,
    { expiresIn: "3h" }
  );

  res.json({
    success: true,
    message: "Authorization successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      paidCourses: user.paidCourses,
    },
  });
});


exports.register = asyncHandler(async (req, res, next) => {
  const {
    name,
    surname,
    ageGroup,
    phone,
    country,
    city,
    experience,
    email,
    password,
    confirmPassword,
    termsAccepted,
  } = req.body;

  // Валидация данных
  if (
    !name ||
    !surname ||
    !ageGroup ||
    !phone ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    throw new AppError("All fields are required", 400);
  }

  if (password !== confirmPassword) {
    throw new AppError("Passwords do not match", 400);
  }

  // Проверка, что пользователь с таким email уже есть
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  // Хеширование пароля перед сохранением
  const hashedPassword = await bcrypt.hash(password, 12);

  // Создание нового пользователя
  const newUser = new User({
    name,
    surname,
    ageGroup,
    phone,
    country,
    city,
    experience,
    email,
    password: hashedPassword,
    termsAccepted,
    paidCourses: [],
  });

  // Сохраняем в базу
  await newUser.save();

  // Генерация JWT
  const token = jwt.sign(
    { id: newUser._id, name: newUser.name }, 
    jwtSecret, 
    { expiresIn: "3h",}
  );

  // Отправка токена клиенту
  res.status(201).json({
    success: true,
    message: "Вы успешно зарегистрировались!",
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
    },
  });
});
