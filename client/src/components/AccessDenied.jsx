import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <div className="container text-center p-3">
      <h2>Доступ запрещен</h2>
      <p>У вас нет доступа к этому курсу.</p>
      <p>Для получения доступа необходимо приобрести соответствующий курс.</p>
      <Link to="/courses" className="btn btn-primary mb-3">Просмотреть доступные курсы</Link>
    </div>
  );
};

export default AccessDenied;
