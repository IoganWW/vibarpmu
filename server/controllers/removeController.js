const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const AppError = require('../utils/AppError');

exports.removeCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;

  if (!courseId) {
    throw new AppError("ID of course required", 400);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { paidCourses: courseId } }, // убирает из массива
    { new: true }
  );

  res.json({
    success: true,
    message: "Course deleted successfuly",
    user: updatedUser,
  });
});
