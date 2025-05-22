// PurchasedCourse.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, ProgressBar, Badge } from "react-bootstrap";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import { useAuth } from "../../context/useAuth";
import { purchasedCourseData } from "../../components/data/purchasedCourse";
import "./PurchasedCourse.css";

const API_BASE = import.meta.env.VITE_API_BASE;

const PurchasedCourse = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const { language } = useLanguage();
  const { authFetch } = useAuth();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const t = purchasedCourseData[language] || purchasedCourseData.ua;

  // Проверка успешной оплаты из URL 
  useEffect(() => { 
    const urlParams = new URLSearchParams(location.search); 
    const paymentStatus = urlParams.get('payment'); 
    
    if (paymentStatus === 'success') { 
      setPaymentSuccess(true);

      // Скрываем уведомление через 5 секунд 
      setTimeout(() => { 
        setPaymentSuccess(false); 
        // Убираем параметр из URL 
        const newUrl = window.location.pathname; 
        window.history.replaceState({}, document.title, newUrl);
      }, 5000);
     } 
    }, [location.search]);

  // Завантаження даних курсу з API
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        // Отримуємо дані курсу з API
        const data = await authFetch(`${API_BASE}/api/courses/${courseId}`);
        const course = data.course;
        setCourse(course);
        
        // Отримуємо прогрес користувача (завершені уроки)
        const dataProgress = await authFetch(`${API_BASE}/api/courses/${courseId}/progress`);
        const progressData = dataProgress.progress;
        if (progressData && progressData.completedLessons) {
          setCompletedLessons(progressData.completedLessons);
        }
      } catch (error) {
        console.error("Помилка завантаження курсу:", error);
        if (error.status === 403) {
          setRedirect(true);
        } else {
          setError(error.message || t.error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, authFetch, t.error]);

  // Функція для позначення уроку як завершеного/незавершеного
  const toggleLessonCompletion = async (lessonId) => {
    try {
      const isCompleted = completedLessons.includes(lessonId);
      
      // Оптимістичне оновлення UI
      if (isCompleted) {
        setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
        setCompletedLessons([...completedLessons, lessonId]);
      }
      
      // Відправка на сервер
      await authFetch(`${API_BASE}/api/courses/${courseId}/lessons/${lessonId}/progress`, {
        method: 'POST',
        body: JSON.stringify({ completed: !isCompleted }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error("Помилка оновлення прогресу:", error);
      // Повертаємо попередній стан у разі помилки
      if (completedLessons.includes(lessonId)) {
        setCompletedLessons([...completedLessons]);
      } else {
        setCompletedLessons(completedLessons.filter(id => id !== lessonId));
      }
    }
  };

  // Функція для переходу до наступного відео
  const goToNextVideo = () => {
    if (currentVideoIndex < course?.lessons.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  // Функція для переходу до попереднього відео
  const goToPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  if (redirect) return <Navigate to="/access-denied" replace />;

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t.loading}</span>
        </div>
        <p className="mt-3">{t.loading}</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger">{error}</div>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container className="py-5 text-center">
        <h2>{t.courseNotFound}</h2>
      </Container>
    );
  }

  // Розрахунок прогресу
  const progress = course.lessons ? Math.round((completedLessons.length / course.lessons.length) * 100) : 0;
  
  const currentLesson = course.lessons[currentVideoIndex];
  const content = course[language] || course.ua;
  const currentLessonContent = currentLesson[language] || currentLesson.ua;

  return (
    <div className="purchased-course-page py-5">
      <Container>
        {/* Уведомление об успешной оплате */}
        {paymentSuccess && ( 
          <Alert variant="success" className="mb-4" dismissible onClose={() => setPaymentSuccess(false)}>
            <Alert.Heading>🎉 {t.paymentSuccessTitle}</Alert.Heading> 
            <p className="mb-0"> 
              {t.paymentSuccessMessage} 
            </p> 
          </Alert> 
        )}
        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-center">
              {course.icon && (
                <img src={course.icon} alt={content.title} className="me-3" style={{ maxWidth: "60px" }} />
              )}
              <h1 className="mb-0">{content.title}</h1>
            </div>
            <p className="lead mt-2">{content.description}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Card className="progress-card">
              <Card.Body>
                <h5>{t.progress}</h5>
                <ProgressBar now={progress} label={`${progress}%`} variant="success" className="mb-2" />
                <small>{completedLessons.length} / {course.lessons.length} {t.completed.toLowerCase()}</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card className="video-player-card mb-4">
              <Card.Body>
                <h3 className="mb-3">
                  {t.lesson} {currentVideoIndex + 1}: {currentLessonContent.title}
                </h3>
                <div className="video-container mb-3" style={{ backgroundColor: "#000", aspectRatio: "4/3", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {/* В реальному додатку тут буде справжній відеоплеєр */}
                  {currentLesson.videoUrl ? (
                    <video 
                      controls 
                      height="100%" 
                      src={currentLesson.videoUrl} 
                      poster={currentLesson.posterImage || ""}
                      className="h-100"
                    >
                      Ваш браузер не підтримує HTML5 відео.
                    </video>
                  ) : (
                    <div className="text-white text-center p-5">
                      <i className="bi bi-play-circle" style={{ fontSize: "48px" }}></i>
                      <p className="mt-2">{currentLessonContent.title}</p>
                      <small>Відео недоступне</small>
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <button 
                    className="btn btn-outline-primary" 
                    onClick={goToPreviousVideo}
                    disabled={currentVideoIndex === 0}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    {t.lesson} {currentVideoIndex}
                  </button>
                  <button 
                    className="btn btn-outline-primary" 
                    onClick={goToNextVideo}
                    disabled={currentVideoIndex === course.lessons.length - 1}
                  >
                    {t.lesson} {currentVideoIndex + 2}
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
                <div className="lesson-actions">
                  <p className="mb-2">{currentLessonContent.description}</p>
                  <div className="d-flex justify-content-between mt-3">
                    {currentLesson.materials && (
                      <a href={currentLesson.materials} className="btn btn-outline-secondary" download>
                        <i className="bi bi-download me-2"></i>
                        {t.downloadMaterials}
                      </a>
                    )}
                    <button 
                      className={`btn ${completedLessons.includes(currentLesson.id) ? 'btn-success' : 'btn-outline-success'}`}
                      onClick={() => toggleLessonCompletion(currentLesson.id)}
                    >
                      <i className={`bi ${completedLessons.includes(currentLesson.id) ? 'bi-check-circle-fill' : 'bi-check-circle'} me-2`}></i>
                      {completedLessons.includes(currentLesson.id) ? t.markIncomplete : t.markComplete}
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="lessons-list-card">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">{t.lessonsList}</h5>
              </Card.Header>
              <ListGroup variant="flush">
                {course.lessons.map((lesson, index) => {
                  const lessonContent = lesson[language] || lesson.ua;
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isActive = index === currentVideoIndex;
                  
                  return (
                    <ListGroup.Item 
                      key={lesson.id} 
                      action 
                      active={isActive}
                      onClick={() => setCurrentVideoIndex(index)}
                      className={`d-flex justify-content-between align-items-center ${isCompleted ? 'bg-light' : ''}`}
                    >
                      <div>
                        <div className="d-flex align-items-center">
                          <span className="me-2">{index + 1}.</span>
                          <span className={isCompleted ? 'text-decoration-line-through' : ''}>
                            {lessonContent.title}
                          </span>
                        </div>
                        <small className="text-muted d-block">{lesson.duration}</small>
                      </div>
                      {isCompleted && (
                        <Badge bg="success" pill>
                          <i className="bi bi-check"></i>
                        </Badge>
                      )}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PurchasedCourse;