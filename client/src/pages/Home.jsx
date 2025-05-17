// src/components/HomePage.js
import React from "react";

import ImageCarousel from "../components/ImageCarousel";
import AboutMe from "../components/AboutMe";
import OfflineCourses from "../components/OfflineCourseCards";
import OnlineCourses from "../components/OnlineCourseCards";
import TrainingInfo from "../components/TrainingInfo";
import videoCourse from "../assets/video/video_1.mp4";
import GuaranteeSection from "../components/GuaranteeSection";
import TestimonialsSection from "../components/TestimonialSection";
import PhoneForm from "../components/SendPhone";

const HomePage = () => {
  return (
    <div>
      <ImageCarousel />
      <AboutMe />
      <OfflineCourses />
      <OnlineCourses />
      <TrainingInfo />
      <div className="row bg-dark">
        <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
          <div className="ratio ratio-4x3">
            <video controls>
              <source src={videoCourse} type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
          </div>
        </div>
      </div>
      <GuaranteeSection />
      <TestimonialsSection />
      <PhoneForm />
    </div>
  );
};

export default HomePage;
