const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  checkCourseAccess,
} = require("../middlewares/authMiddleware");
const { Course, Progress } = require("../models/Purchased");

router.get("/courses/:courseId",
  authenticateToken,
  (req, res, next) => {
    const courseId = req.params.courseId;
    checkCourseAccess(courseId)(req, res, next);
  },
  async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const course = await Course.findOne({ id: courseId }).lean();
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      course.icon = `${baseUrl}${course.icon}`;
      course.lessons = course.lessons.map((lesson) => {
        return {
          ...lesson,
          videoUrl: `${baseUrl}${lesson.videoUrl}`,
        };
      });

      res.json({
        success: true,
        message: "Access",
        course,
      });
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching course data",
      });
    }
  }
);

// Отримання прогресу користувача для курсу
router.get("/courses/:courseId/progress",
  authenticateToken,
  (req, res, next) => {
    const courseId = req.params.courseId;
    checkCourseAccess(courseId)(req, res, next);
  },
  async (req, res) => {
    try {
      const userId = req.user._id;
      const courseId = req.params.courseId;
      let progress = await Progress.findOne({
        userId,
        courseId,
      }).lean();

      if (!progress) {
        progress = { completedLessons: [] };
      }
      res.json({
        success: true,
        message: "Access",
        progress,
      });
    } catch (error) {
      console.error("Error fetching course progress:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch course progress",
      });
    }
  }
);

// Оновлення прогресу уроку
router.post("/courses/:courseId/lessons/:lessonId/progress",
  authenticateToken,
  (req, res, next) => {
    const courseId = req.params.courseId;
    checkCourseAccess(courseId)(req, res, next);
  },
  async (req, res) => {
    try {
      const userId = req.user._id;
      const courseId = req.params.courseId;
      const lessonId = req.params.lessonId;
      const { completed } = req.body;

      // Спочатку перевіряємо, чи існує урок у курсі
      const course = await Course.findOne({
        id: courseId,
        "lessons.id": lessonId,
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course or lesson not found",
        });
      }

      // Знаходимо або створюємо запис про прогрес
      let progress = await Progress.findOne({ userId, courseId });

      if (!progress) {
        progress = new Progress({
          userId,
          courseId,
          completedLessons: [],
        });
      }

      if (completed && !progress.completedLessons.includes(lessonId)) {
        // Додаємо урок як завершений
        progress.completedLessons.push(lessonId);
      } else if (!completed) {
        // Видаляємо урок зі списку завершених
        progress.completedLessons = progress.completedLessons.filter(
          (id) => id !== lessonId
        );
      }

      await progress.save();

      res.json({
        success: true,
        message: "Progress updated successfully",
        completedLessons: progress.completedLessons,
      });
    } catch (error) {
      console.error("Error updating lesson progress:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update lesson progress",
      });
    }
  }
);

module.exports = router;
