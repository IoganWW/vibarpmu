import { faqData } from '../components/data/faqData';
import { useLanguage } from '../context/useLanguage';

const Faq = () => {
  // Получаем текущий язык из контекста
  const { language } = useLanguage();

  const content = faqData[language] || faqData.ua;

  return (
    <div id="faqAccordion" className="accordion col-md-8 offset-md-2">
      <div className="faqHead alert-light p-3 mb-1 rounded-sm">
        <h3>{content.title}</h3>
        <small>
          {content.subtitle}
        </small>
      </div>

      {content.questions.map((item, index) => (
        <div className="accordion-item mb-2" key={index}>
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#faq${index}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`faq${index}`}
            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
            data-bs-parent="#faqAccordion"
          >
            <div
              className="accordion-body"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;