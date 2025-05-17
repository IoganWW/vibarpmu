import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';

import ErrorBoundary from './ErrorBoundary';
import CourseCard from './CourseCard';
import { cards, courseName } from './data/cardsData';
import { useLanguage } from '../context/useLanguage';

// Мемоизированный компонент карточки для предотвращения лишних рендеров
const MemoizedCourseCard = memo(CourseCard);

// Определяем константы, чтобы избежать "магических строк" в коде
const COURSE_TYPES = {
  BASIC: 'basic',
  ADVANCED: 'advanced'
};

// Ключи для localStorage
const STORAGE_KEYS = {
  EXPANDED_CARD: 'offlineCourses.expandedCardId',
  VISIBLE_SECTION: 'offlineCourses.visibleSection',
  IS_OFFLINE_OPEN: 'offlineCourses.isOfflineOpen'
};

const OfflineCourses = () => {
  // Получаем текущий язык из контекста
  const { language } = useLanguage();
  // Получаем данные для выбранного языка, по умолчанию ua
  const {offline, basic, levelUp} = courseName[language] || courseName.ua;

  // Получаем сохраненные состояния из localStorage, если они есть
  const getInitialState = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      console.error(`Error restoring state from localStorage (${key}):`, error);
      return defaultValue;
    }
  };

  // Состояние для отображения нажатия кнопки 
  const [isOfflineOpen, setIsOfflineOpen] = useState(
    getInitialState(STORAGE_KEYS.IS_OFFLINE_OPEN, false));

  // Раскрытие блока курса
  const [visibleSection, setVisibleSection] = useState(
    getInitialState(STORAGE_KEYS.VISIBLE_SECTION, null));

  // Состояние для отображения текста/изображения в карточках
  const [expandedCardId, setExpandedCardId] = useState(
    getInitialState(STORAGE_KEYS.EXPANDED_CARD, null));

  // Состояние для хранения ширины экрана
  const [isMobile, setIsMobile] = useState(false);

  // Состояние для отслеживания анимаций
  const [animatingItems, setAnimatingItems] = useState({});
  
  // Ссылки на элементы для прокрутки и управления фокусом
  const coursesCardsRef = useRef(null);
  const offlineButtonRef = useRef(null);
  const basicButtonRef = useRef(null);
  const advancedButtonRef = useRef(null);

  // Предварительно фильтруем карточки по типам для улучшения производительности
  const filteredCards = useMemo(() => {
    return {
      [COURSE_TYPES.BASIC]: cards.filter(c => c.type === COURSE_TYPES.BASIC),
      [COURSE_TYPES.ADVANCED]: cards.filter(c => c.type === COURSE_TYPES.ADVANCED)
    };
  }, []);

  // Функция для сохранения состояния в localStorage
  const saveToLocalStorage = useCallback((key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving state to localStorage (${key}):`, error);
    }
  }, []);

  // Устанавливаем слушатель изменения размера окна
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 576);
    };
    
    // Проверяем размер при монтировании
    checkIsMobile();
    
    // Добавляем слушатель изменения размера окна с debounce для производительности
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkIsMobile, 150);
    };

    window.addEventListener('resize', handleResize);
    
    // Очищаем слушатель при размонтировании
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      clearTimeout(timeoutId);
      };
  }, []);

  // Сохраняем состояния в localStorage при их изменении
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.IS_OFFLINE_OPEN, isOfflineOpen);
  }, [isOfflineOpen, saveToLocalStorage]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.VISIBLE_SECTION, visibleSection);
  }, [visibleSection, saveToLocalStorage]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.EXPANDED_CARD, expandedCardId);
  }, [expandedCardId, saveToLocalStorage]);

  // Обработчик для клика по карточке
  const handleCardClick = useCallback((id) => {
    setExpandedCardId(prev => prev === id ? null : id); //1 card open!
  }, []);
    
  // Обработчик клика по курсу
  const toggleSection = useCallback((type) => {
    setVisibleSection(prev => {
      const newValue = prev === type ? null : type;

      // Запускаем анимацию для элементов секции
      if (newValue) {
        setAnimatingItems(prev => ({...prev, [type]: true}));
        setTimeout(() => {
          setAnimatingItems(prev => ({...prev, [type]: false}));
        }, 300); // Время анимации
      }
      
      return newValue;
    });
  },[]);

  // Обработчик для кнопок online/offline
  const scrollToCourses = useCallback(() => {
    coursesCardsRef.current?.scrollIntoView({ behavior: 'smooth' });
  },[]);

  // Обработчик клавиатурных событий для доступности
  const handleKeyDown = useCallback((event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }, []);

  // Обработчик для кнопки оффлайн
  const handleOfflineClick = useCallback(() => {
    setIsOfflineOpen(prev => {
      const newValue = !prev;
      if (newValue) {
        scrollToCourses();
      }
      return newValue;
    });
  }, [scrollToCourses]);

  // Получаем CSS-классы для контейнера карточек
  const getCardContainerClasses = useCallback((type) => {
    const baseClasses = 'row transition-all';
    
    if (isMobile && visibleSection !== type) {
      return `${baseClasses} d-none`;
    }
    
    const animationClass = animatingItems[type] ? 'animate-fade-in' : '';
    return `${baseClasses} d-flex ${animationClass}`;
  }, [isMobile, visibleSection, animatingItems]);

  // Lazy loading - отображаем только видимые карточки
  const isCardVisible = useCallback((type) => {
    return !isMobile || visibleSection === type;
  }, [isMobile, visibleSection]);

  return (
    <ErrorBoundary fallback={<div className="alert alert-danger">Произошла ошибка при загрузке курсов</div>}>
     <div className="container-fluid py-3" id="coursesCards">
      <h2 className="text-center text-uppercase text-white bg-dark p-2 d-none d-sm-block"
        id="offlineCourseTitli">{offline}</h2>

      <button className="btn btn-dark text-uppercase w-100 d-sm-none toggle-btn" 
        data-bs-toggle="collapse" 
        data-bs-target="#offline-training"
        aria-expanded={isOfflineOpen} 
        aria-controls="offline-training"
        id="offlineButton" 
        ref={offlineButtonRef} 
        onClick={handleOfflineClick}
        onKeyDown={(e) => handleKeyDown(e, handleOfflineClick)}>
        <span className="icon" aria-hidden="true">{isOfflineOpen ? '-' : '+'}</span>
        <span>{offline}</span>
      </button>
      
      <div id="offline-training" 
        className={`${isOfflineOpen ? 'show' : ''} collapse row d-sm-flex transition-height`}
        ref={coursesCardsRef}
        aria-labelledby="offlineButton">

        {/* Базовый курс кнопка */}
        <button 
          className="btn btn-secondary d-sm-none toggle-btn-sub my-2"
          data-type={COURSE_TYPES.BASIC}
          onClick={() => toggleSection(COURSE_TYPES.BASIC)}
          onKeyDown={(e) => handleKeyDown(e, () => toggleSection(COURSE_TYPES.BASIC))}
          aria-expanded={visibleSection === COURSE_TYPES.BASIC}
          aria-controls="basic-courses"
          ref={basicButtonRef}
        >
          <span className="icon" aria-hidden="true">
            {visibleSection === COURSE_TYPES.BASIC ? '-' : '+'}</span>
            <span>{basic}</span>
        </button>

        <div className="col-12 col-lg-6">
          <div id="basic-courses"
            className={getCardContainerClasses(COURSE_TYPES.BASIC)}
            aria-labelledby="basicButton">
            {isCardVisible(COURSE_TYPES.BASIC) && 
              filteredCards[COURSE_TYPES.BASIC].map(c => (
                <ErrorBoundary 
                  key={c.id} 
                  fallback={<div className="alert alert-warning">Не удалось загрузить карточку курса</div>}
                >
                  <MemoizedCourseCard
                    {...c}
                    isExpanded={expandedCardId === c.id}
                    onClick={() => handleCardClick(c.id)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleCardClick(c.id))}
                    aria-expanded={expandedCardId === c.id}
                    tabIndex="0"
                  />
                </ErrorBoundary>
              ))
            }
          </div>
        </div>

        {/* Повышение уровня кнопка */}
        <button 
          className="btn btn-danger d-sm-none toggle-btn-sub mt-2"
          data-type={COURSE_TYPES.ADVANCED}
          onClick={() => toggleSection(COURSE_TYPES.ADVANCED)}
          onKeyDown={(e) => handleKeyDown(e, () => toggleSection(COURSE_TYPES.ADVANCED))}
          aria-expanded={visibleSection === COURSE_TYPES.ADVANCED}
          aria-controls="advanced-courses"
          ref={advancedButtonRef}>
          <span className="icon">{visibleSection === COURSE_TYPES.ADVANCED ? '-' : '+'}</span>
          <span>{levelUp}</span>
        </button>

        <div className="col-12 col-lg-6">
          <div id="advanced-courses"
            className={getCardContainerClasses(COURSE_TYPES.ADVANCED)}
            aria-labelledby="advancedButton">
            {isCardVisible(COURSE_TYPES.ADVANCED) && 
              filteredCards[COURSE_TYPES.ADVANCED].map(c => (
                <ErrorBoundary 
                  key={c.id} 
                  fallback={<div className="alert alert-warning">Не удалось загрузить карточку курса</div>}
                >
                  <MemoizedCourseCard
                    {...c}
                    isExpanded={expandedCardId === c.id}
                    onClick={() => handleCardClick(c.id)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleCardClick(c.id))}
                    aria-expanded={expandedCardId === c.id}
                    tabIndex="0"
                  />
                </ErrorBoundary>
              ))
            }
          </div>
        </div>

      </div>
     </div>

    </ErrorBoundary>
  );
};

export default OfflineCourses;