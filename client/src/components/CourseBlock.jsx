// CourseBlock.jsx
import React from "react";
import { useLanguage } from "../context/useLanguage";

const CourseBlock = ({ course }) => {
  const { language } = useLanguage();
  const content = course[language] || course.ua;

  return (
    <div className="course-card mb-5">
      <div className="course-header d-flex align-items-center gap-4 bg-primary text-white p-4 rounded-top">
        {course.icon && (
          <div className="course-icon">
            <img src={course.icon} loading="lazy" alt={content.title} className="img-fluid" style={{ maxWidth: "80px" }} />
          </div>
        )}
        <h3 className="mb-0">{content.title}</h3>
      </div>
      <div className="course-content p-4 border border-top-0 rounded-bottom">
        {content.paragraphs.map((p, idx) => (
          <p key={idx} className="mb-3">{p}</p>
        ))}
      </div>
    </div>
  );
};

export default CourseBlock;
