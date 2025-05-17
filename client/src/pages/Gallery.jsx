import { useState, useEffect } from 'react';
import '../assets/styles/Gallery.css';
import { useLanguage } from '../context/useLanguage';
import { galleryLangData } from '../components/data/galleryLangData';

// Динамический импорт изображений с использованием Vite
// Это создаст объект с путями к изображениям
const lipsImages = import.meta.glob('../assets/images/gallery/lips/*.jpg', { eager: true });
const browsImages = import.meta.glob('../assets/images/gallery/brows/*.jpg', { eager: true });

// Создаем массив данных для галереи
const galleryData = [
  // Обрабатываем изображения губ
  ...Object.entries(lipsImages).map(([path, module]) => ({
    src: module.default, // Vite экспортирует изображения как 'default'
    category: 'lips',
    path // Сохраняем оригинальный путь для отладки
  })),
  
  // Обрабатываем изображения бровей
  ...Object.entries(browsImages).map(([path, module]) => ({
    src: module.default,
    category: 'brows',
    path
  }))
];

const Gallery = () => {
  // Получаем текущий язык из контекста
  const { language } = useLanguage();
  const {allFilter, browsFilter, lipsFilter,
    prevBtn, nextBtn } = galleryLangData[language] || galleryLangData.ua;

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  
  const itemsPerPage = 8;

  useEffect(() => {
    // Применяем фильтр при первой загрузке
    applyFilter("all");
  }, []);

  // Фильтрация изображений
  const applyFilter = (category) => {
    setCurrentFilter(category);
    setCurrentPage(1);
    
    const filtered = category === "all" 
      ? galleryData 
      : galleryData.filter(img => img.category === category);
      
    setFilteredData(filtered);
  };

  // Отображение изображений
  const getVisibleImages = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  };

  // Обработка пагинации
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Открытие и закрытие модального окна
  const openModal = (src) => {
    setCurrentImage(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container-fluid">
      {/* Фильтр */}
      <nav>
        <ul className="pagination justify-content-center custom-pagination mt-3 mb-2">
          <li className={`page-item ${currentFilter === "all" ? "active" : ""}`}>
            <a className="page-link" href="#" onClick={(e) => {
              e.preventDefault();
              applyFilter("all");
            }}>{allFilter}</a>
          </li>
          <li className={`page-item ${currentFilter === "brows" ? "active" : ""}`}>
            <a className="page-link" href="#" onClick={(e) => {
              e.preventDefault();
              applyFilter("brows");
            }}>{browsFilter}</a>
          </li>
          <li className={`page-item ${currentFilter === "lips" ? "active" : ""}`}>
            <a className="page-link" href="#" onClick={(e) => {
              e.preventDefault();
              applyFilter("lips");
            }}>{lipsFilter}</a>
          </li>
        </ul>
      </nav>

      {/* Галерея */}
      <div id="gallery" className="row">
        {getVisibleImages().map((img, index) => (
          <div key={index} className="col-6 col-sm-6 col-md-4 col-lg-3">
            <img 
              src={img.src} 
              className="img-thumbnail gallery-img" 
              alt="Фото" 
              onClick={() => openModal(img.src)}
            />
          </div>
        ))}
      </div>

      {/* Пагинация */}
      <nav>
        <ul className="pagination justify-content-center custom-pagination mt-2 mb-3">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a className="page-link" href="#" onClick={(e) => {
              e.preventDefault();
              handlePrevPage();
            }}>{prevBtn}</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">{currentPage}</a>
          </li>
          <li className={`page-item ${currentPage >= Math.ceil(filteredData.length / itemsPerPage) ? "disabled" : ""}`}>
            <a className="page-link" href="#" onClick={(e) => {
              e.preventDefault();
              handleNextPage();
            }}>{nextBtn}</a>
          </li>
        </ul>
      </nav>

      {/* Модальное окно */}
      {modalOpen && (
        <div className="modalGal" style={{ display: 'flex' }} onClick={(e) => {
          if (e.target.className === 'modalGal') {
            closeModal();
          }
        }}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modalGal-content" src={currentImage} alt="Увеличенное фото" />
        </div>
      )}
    </div>
  );
};

export default Gallery;