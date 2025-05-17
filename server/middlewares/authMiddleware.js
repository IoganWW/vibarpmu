const jwt = require("jsonwebtoken");
const User = require('../models/User');
const { jwtSecret } = require('../config');


// Middleware для проверки токена
exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      
      // Находим пользователя по ID из токена
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "Пользователь не найден" });
      }
  
      req.user = user; // сохраняем найденного пользователя в req.user
      next();
    } catch (err) {
      console.error('Ошибка в authenticateToken:', err);
      return res.status(403).json({ success: false, message: 'Токен недействителен или истек' });
    } 
};

exports.checkCourseAccess = (courseId) => {
  return (req, res, next) => {
    const paidCourses = req.user.paidCourses;
    console.log('Оплаченные курсы:', paidCourses);

    if (!paidCourses || !paidCourses.includes(courseId)) {
      console.log(`Доступ запрещен - нет курса "${courseId}" в списке`);
      return res.status(402).json({ success: false, message: 'Access denied' });
    }

    console.log(`Доступ разрешен к курсу "${courseId}"`);
    next();
  }  
};