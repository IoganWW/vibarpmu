// Schema.org JSON-LD для курсів PMU
(function() {
  // JSON-LD для освітньої організації
  const educationalOrgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "VI Bar PMU - permanent make up school",
    "url": "https://www.vi-bar-pmu.online",
    "logo": "https://www.vi-bar-pmu.online/logo.png",
    "description": "Професійні курси перманентного макіяжу та навчання PMU майстрів",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["Ukrainian", "Russian"]
    },
    "sameAs": [
      "https://www.instagram.com/vi_bar_pmu",
      "https://www.facebook.com/vibarpmu"
    ]
  };

  // JSON-LD для списку курсів
  const coursesListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Курси перманентного макіяжу VI Bar PMU make up school",
    "description": "Професійні курси навчання перманентному макіяжу",
    "url": "https://www.vi-bar-pmu.online/ua/coursesGroup",
    "numberOfItems": 3,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Course",
          "@id": "https://www.vi-bar-pmu.online/ua/coursesGroup#basic-course",
          "name": "Базовий курс перманентного макіяжу",
          "description": "Повний курс навчання перманентному макіяжу для початківців з нуля до професійного рівня",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "VI Bar PMU - permanent make up school",
            "url": "https://www.vi-bar-pmu.online"
          },
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "https://schema.org/MixedEventAttendanceMode",
            "courseSchedule": {
              "@type": "Schedule",
              "duration": "P5D"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "150",
            "bestRating": "5"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "UAH",
            "category": "EducationalCourse",
            "availability": "https://schema.org/InStock",
            "validFrom": "2025-01-01"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Course",
          "@id": "https://www.vi-bar-pmu.online/ua/coursesGroup#advanced-course",
          "name": "Просунутий курс PMU",
          "description": "Курс для досвідчених майстрів з вивчення складних технік та авторських методик",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "VI Bar PMU - permanent make up school",
            "url": "https://www.vi-bar-pmu.online"
          },
          "coursePrerequisites": "Професійний підхід до перманентного макіяжу",
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "https://schema.org/MixedEventAttendanceMode",
            "courseSchedule": {
              "@type": "Schedule",
              "duration": "P3D"
            }
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "UAH",
            "category": "EducationalCourse",
            "availability": "https://schema.org/InStock"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Course",
          "@id": "https://www.vi-bar-pmu.online/ua/coursesGroup#online-course",
          "name": "Онлайн курс: Перманентний макіяж брів та губ",
          "description": "Поглиблений курс з вивчення сучасних технік перманентного макіяжу",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "VI Bar PMU - permanent make up school",
            "url": "https://www.vi-bar-pmu.online"
          },
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "https://schema.org/MixedEventAttendanceMode",
            "courseSchedule": {
              "@type": "Schedule",
              "duration": "P2D"
            }
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "UAH",
            "category": "EducationalCourse",
            "availability": "https://schema.org/InStock"
          }
        }
      }
    ]
  };

  // Функція для додавання JSON-LD скрипту
  function addJsonLdScript(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  // Додаємо схеми після завантаження DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      addJsonLdScript(educationalOrgSchema);
      addJsonLdScript(coursesListSchema);
    });
  } else {
    addJsonLdScript(educationalOrgSchema);
    addJsonLdScript(coursesListSchema);
  }
})();