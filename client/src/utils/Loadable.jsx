// src/utils/Loadable.jsx
import React, { Suspense } from 'react';
import Loader from '../components/common/Loader';

// Обертка для ленивой загрузки
const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

  // Важно для отладки - даем компоненту отображаемое имя
  LoadableComponent.displayName = `Loadable(${Component.displayName || Component.name || 'Component'})`;
  
  return LoadableComponent;
}

export default Loadable;