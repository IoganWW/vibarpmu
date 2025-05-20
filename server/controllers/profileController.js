const asyncHandler = require("../middlewares/asyncHandler");

exports.getProfile = (req, res) => {
  res.json({
    success: true,
    message: "Welcome!",
    user: {
      id: req.user._id,
      name: req.user.name,
      surname: req.user.surname,
      email: req.user.email,
      phone: req.user.phone,
      city: req.user.city,
      country: req.user.country,
      createdAt: req.user.createdAt,
      paidCourses: req.user.paidCourses,
    },
  });
};


exports.updateProfile = asyncHandler(async (req, res, next) => {

  const updates = req.body; // телефон, город, страна
  const user = req.user; // уже найден в authenticateToken

  // Сохраняем снимок текущего состояния перед обновлением
  user.history = user.history || [];
  user.history.push({
    phone: user.phone || "",
    city: user.city || "",
    country: user.country || "",
    updatedAt: new Date().toISOString(),
  });

  // Обновляем данные
  user.phone = updates.phone || user.phone;
  user.city = updates.city || user.city;
  user.country = updates.country || user.country;

  // Сохраняем в базу
  await user.save();

  res.json({
    success: true,
    message: "Profile updated",
    user: {
      id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      city: user.city,
      country: user.country,
      createdAt: user.createdAt,
      paidCourses: user.paidCourses,
    },
  });
});
