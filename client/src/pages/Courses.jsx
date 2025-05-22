// Courses.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CourseBlock from "../components/CourseBlock";
import { coursesData } from "../components/data/coursesData";
import { useLanguage } from "../context/useLanguage";

const Courses = () => {
  const { language } = useLanguage();

  const titles = {
    ua: "Наші курси",
    en: "Our Courses",
    bg: "Нашите курсове",
    tr: "Kurslarımız"
  };

  return (
    <div className="courses-page py-4">
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="text-center">
              <h1 className="display-4 fw-bold">{titles[language]}</h1>
              <div className="title-underline bg-primary mx-auto my-3" style={{ height: "4px", width: "80px" }}></div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {coursesData.map((course, index) => (
              <CourseBlock key={index} course={course} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Courses;
