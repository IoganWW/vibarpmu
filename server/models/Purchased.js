const mongoose = require('mongoose');

// Схема для уроків
const LessonSchema = new mongoose.Schema({
  id: String,
  videoUrl: String,
  posterImage: String,
  duration: String,
  materials: String,
  ua: {
    title: String,
    description: String
  },
  en: {
    title: String,
    description: String
  },
  bg: {
    title: String,
    description: String
  },
  tr: {
    title: String,
    description: String
  }
});

// Схема для курсів
const CourseSchema = new mongoose.Schema({
  id: String,
  ua: {
    title: String,
    description: String
  },
  en: {
    title: String,
    description: String
  },
  bg: {
    title: String,
    description: String
  },
  tr: {
    title: String,
    description: String
  },
  icon: String,
  lessons: [LessonSchema]
});

// Схема для прогресу користувача
const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  completedLessons: [String]
});

// Створення індексів для швидкого пошуку
ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
CourseSchema.index({ id: 1 }, { unique: true });

const Course = mongoose.model('Course', CourseSchema);
const Progress = mongoose.model('Progress', ProgressSchema);

module.exports = { Course, Progress };
