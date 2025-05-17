// src/components/common/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center p-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
    </div>
  );
};

export default Loader;

