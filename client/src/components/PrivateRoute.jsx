import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth';

const PrivateRoute = ({ children }) => {

  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!isAuthenticated) {
    // Перенаправляем на главную, но сохраняем информацию о запрошенном пути
    return <Navigate to="/home" state={{ requestedPath: location.pathname }} />
  }

  return children;

}

export default PrivateRoute;