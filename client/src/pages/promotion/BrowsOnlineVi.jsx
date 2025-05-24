import React, { useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { useLanguage } from "../../context/useLanguage";
import BuyCourseButton from "../../components/BuyCourseButton";
import slideBrows from "../../assets/images/slideBrows.jpg";
// Імпортуйте іконки, якщо вони вам доступні
import { FaCheck, FaClock, FaUserGraduate, FaStar, FaPlayCircle } from "react-icons/fa";
import { navMenuData } from "../../components/data/navData";

const BrowsOnlineVi = () => {
  const { language } = useLanguage();
  const { online, brows } = navMenuData[language] || navMenuData.ua;
  const [activeTab, setActiveTab] = useState("description");

  // Переваги курсу
  const benefits = [
    "Детальне вивчення технік перманентного макіяжу брів",
    "Індивідуальний підхід та зворотній зв'язок",
    "Професійний сертифікат після успішного завершення",
    "Постійна підтримка викладача на всіх етапах",
    "Необмежений доступ до матеріалів курсу"
  ];

  // Зміст курсу
  const modules = [
    {
      title: "Модуль 1: Основи перманентного макіяжу брів",
      content: "Типи шкіри, анатомія брів, протипоказання, матеріали та обладнання"
    },
    {
      title: "Модуль 2: Підбір форми та кольору",
      content: "Моделювання форми брів, колористика, робота з пігментами"
    },
    {
      title: "Модуль 3: Техніки виконання",
      content: "Пудрове напилення, волоскова техніка, комбінований метод"
    },
    {
      title: "Модуль 4: Просунуті методики та корекція",
      content: "Складні випадки, виправлення помилок, корекція невдалого татуажу"
    }
  ];

  // Відгуки
  const testimonials = [
    {
      name: "Олена М.",
      text: "Пройшла курс і дуже задоволена результатом! Вже працюю і маю постійних клієнтів.",
      rating: 5
    },
    {
      name: "Ірина К.",
      text: "Чудова подача матеріалу, все зрозуміло пояснюється. Рекомендую!",
      rating: 5
    },
    {
      name: "Анна В.",
      text: "Нарешті знайшла курс, де дають реальні знання, а не лише теорію.",
      rating: 4
    }
  ];

  // Відповіді на часті запитання
  const faqs = [
    {
      question: "Скільки триває курс?",
      answer: "Курс розрахований на 4 тижні інтенсивного навчання."
    },
    {
      question: "Чи потрібен досвід роботи?",
      answer: "Ні, курс підходить для початківців. Ми починаємо з основ."
    },
    {
      question: "Чи буде доступ до матеріалів після закінчення курсу?",
      answer: "Так, ви отримуєте довічний доступ до всіх матеріалів курсу."
    },
    {
      question: "Чи видається сертифікат?",
      answer: "Так, після закінчення навчання ви отримуєте іменний сертифікат."
    }
  ];

  // Функція для рендерингу зірок рейтингу
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i < rating ? "text-warning" : "text-muted"} 
          style={{ marginRight: "2px" }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="course-page">
      {/* Герой-секція */}
      <div 
        className="hero-section py-5" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${slideBrows})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white"
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={7} className="mb-4 mb-md-0">
              <Badge bg="warning" className="mb-2">Популярний курс</Badge>
              <h1 className="display-4 fw-bold mb-3">{online + " " + brows}</h1>
              <p className="lead mb-4">
                Станьте майстром перманентного макіяжу брів з нашим онлайн-курсом. 
                Опануйте сучасні техніки та розпочніть свій шлях до успішної кар'єри!
                </p>
              <div className="d-flex align-items-center mb-4">
                <div className="me-4">
                  <FaClock className="me-2" />
                  <span>3 дні</span>
                </div>
                <div className="me-4">
                  <FaUserGraduate className="me-2" />
                  <span>50+ випускників</span>
                </div>
                <div>
                  <FaPlayCircle className="me-2" />
                  <span>11+ відеоуроків</span>
                </div>
              </div>
              <div className="d-flex flex-wrap">
                <h3 className="text-warning me-3 mb-0">4000 грн</h3>
                <div className="d-flex">
                  <BuyCourseButton courseId="brows" className="btn btn-warning btn-lg px-4 me-2" />
                </div>
              </div>
            </Col>
            <Col md={5}>
              <Card className="shadow border-0">
                <Card.Body className="p-4">
                  <h4 className="text-center text-dark mb-4">Запишіться на курс зараз</h4>
                  <p className="text-center text-dark mb-4">
                    Зручне навчання онлайн! 
                  </p>
                  <div className="text-center">
                    <h5 className="text-dark mb-3">Ціна: <span className="text-success">4000 грн</span></h5>
                    <BuyCourseButton courseId="brows" className="btn btn-success btn-lg w-100" />
                  </div>
                  <div className="mt-3 text-center text-dark">
                    <small>* При оплаті сьогодні — бонусний модуль у подарунок</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Навігація */}
      <div className="bg-light py-3 sticky-top">
        <Container>
          <div className="nav nav-pills nav-fill">
            <button 
              className={`nav-link ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Опис
            </button>
            <button 
              className={`nav-link ${activeTab === "program" ? "active" : ""}`}
              onClick={() => setActiveTab("program")}
            >
              Програма
            </button>
            <button 
              className={`nav-link ${activeTab === "testimonials" ? "active" : ""}`}
              onClick={() => setActiveTab("testimonials")}
            >
              Відгуки
            </button>
            <button 
              className={`nav-link ${activeTab === "faq" ? "active" : ""}`}
              onClick={() => setActiveTab("faq")}
            >
              FAQ
            </button>
          </div>
        </Container>
      </div>

      <Container className="my-5">
        {/* Вміст вкладок */}
        {activeTab === "description" && (
          <>
            <Row className="mb-5">
              <Col lg={6} className="mb-4 mb-lg-0">
                <h2 className="mb-4">Про курс</h2>
                <p className="lead">
                  Наш онлайн-курс з перманентного макіяжу брів забезпечує повне занурення у професію.
                  Ви опануєте всі необхідні техніки, навчитеся працювати з різними типами зовнішності
                  та зможете надавати якісні послуги своїм клієнтам.
                </p>
                <p>
                  Завдяки індивідуальному підходу та зворотному зв'язку від досвідчених викладачів,
                  ви швидко засвоїте матеріал та зможете застосовувати отримані знання на практиці.
                </p>
                </Col>
              <Col lg={6}>
                <h2 className="mb-4">Для кого цей курс?</h2>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <div className="d-flex">
                      <div className="me-3">
                        <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: 30, height: 30 }}>
                          <FaCheck className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-1">Для початківців у б'юті-індустрії</h5>
                        <p className="text-muted">Бажаєте освоїти затребувану професію з нуля</p>
                      </div>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="d-flex">
                      <div className="me-3">
                        <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: 30, height: 30 }}>
                          <FaCheck className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-1">Для майстрів з досвідом</h5>
                        <p className="text-muted">Хочете вдосконалити свої навички та вивчити нові техніки</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex">
                      <div className="me-3">
                        <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: 30, height: 30 }}>
                          <FaCheck className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-1">Для власників салонів</h5>
                        <p className="text-muted">Бажаєте розширити спектр послуг вашого салону</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>

            <h2 className="text-center mb-4">Переваги нашого курсу</h2>
            <Row className="mb-5">
              {benefits.map((benefit, idx) => (
                <Col md={4} key={idx} className="mb-4">
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="d-flex align-items-center">
                      <div className="me-3">
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                          <FaCheck className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-0">{benefit}</h5>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row className="align-items-center bg-light p-4 rounded mb-5">
              <Col md={6} className="mb-4 mb-md-0">
                <h2>Що ви отримаєте після проходження курсу?</h2>
                <ul className="list-unstyled mt-4">
                  <li className="mb-3 d-flex">
                    <FaCheck className="text-success me-3 mt-1" />
                    <div>
                      <h5>Професійні навички</h5>
                      <p className="text-muted">Зможете якісно виконувати перманентний макіяж брів клієнтам</p>
                    </div>
                  </li>
                  <li className="mb-3 d-flex">
                  <FaCheck className="text-success me-3 mt-1" />
                    <div>
                      <h5>Сертифікат</h5>
                      <p className="text-muted">Офіційне підтвердження ваших навичок</p>
                    </div>
                  </li>
                  <li className="d-flex">
                    <FaCheck className="text-success me-3 mt-1" />
                    <div>
                      <h5>Підтримка</h5>
                      <p className="text-muted">Допомога у працевлаштуванні та консультації щодо запуску власної справи</p>
                    </div>
                  </li>
                </ul>
              </Col>
              <Col md={6}>
                <img 
                  src={slideBrows} 
                  alt="Результат курсу" 
                  className="img-fluid rounded shadow" 
                />
              </Col>
            </Row>
          </>
        )}

        {activeTab === "program" && (
          <>
            <h2 className="text-center mb-5">Програма курсу</h2>
            <div className="timeline">
              {modules.map((module, idx) => (
                <div key={idx} className="mb-4 pb-4 border-bottom">
                  <h4 className="mb-3">{module.title}</h4>
                  <p className="mb-3">{module.content}</p>
                  <Badge bg="primary" className="me-2">Відеоуроки</Badge>
                  <Badge bg="info" className="me-2">Практичні завдання</Badge>
                  <Badge bg="success">Зворотній зв'язок</Badge>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-5">
              <p className="lead mb-4">Готові почати навчання прямо зараз?</p>
              <BuyCourseButton courseId="brows" className="btn btn-success btn-lg px-5" />
            </div>
          </>
        )}

        {activeTab === "testimonials" && (
          <>
            <h2 className="text-center mb-5">Відгуки наших учнів</h2>
            <Row>
              {testimonials.map((testimonial, idx) => (
                <Col md={4} key={idx} className="mb-4">
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body>
                      <div className="mb-3">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="mb-4">"{testimonial.text}"</p>
                      <div className="d-flex align-items-center">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 40, height: 40 }}>
                          {testimonial.name.charAt(0)}
                        </div>
                        <h5 className="mb-0">{testimonial.name}</h5>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
              
            <div className="text-center bg-light p-5 mt-4 rounded">
              <h3 className="mb-4">Приєднуйтесь до сотень задоволених випускників!</h3>
              <p className="lead mb-4">Не відкладайте свою кар'єру на потім</p>
              <BuyCourseButton courseId="brows" className="btn btn-success btn-lg px-5" />
            </div>
          </>
        )}

        {activeTab === "faq" && (
          <>
            <h2 className="text-center mb-5">Часті запитання</h2>
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, idx) => (
                <div className="accordion-item border mb-3 shadow-sm" key={idx}>
                  <h2 className="accordion-header">
                    <button 
                      className="accordion-button collapsed" 
                      type="button"
                      data-bs-toggle="collapse" 
                      data-bs-target={`#collapse${idx}`}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div id={`collapse${idx}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
              
            <div className="text-center mt-5">
              <p className="mb-4">Залишились запитання? Зв'яжіться з нами!</p>
              <button className="btn btn-outline-primary me-2">Написати в підтримку</button>
            </div>
          </>
        )}
      </Container>

      {/* Заклик до дії */}
      <div className="bg-secondary text-white py-5">
        <Container className="text-center">
          <h2 className="mb-4">Готові стати професіоналом у перманентному макіяжі брів?</h2>
          <p className="lead mb-4">Запишіться на курс зараз та отримайте знижку 15%</p>
          <div>
            <h4 className="mb-3">4000 грн <small><s>4600 грн</s></small></h4>
            <BuyCourseButton courseId="brows" className="btn btn-light btn-lg px-5" />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default BrowsOnlineVi;