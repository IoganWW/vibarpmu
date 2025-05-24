import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useAuth } from '../context/useAuth';

const PrivateRoute = ({ children }) => {

  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const { lang } = useParams();

  if (loading) return null;

  if (!isAuthenticated) {
    // Перенаправляем на главную, но сохраняем информацию о запрошенном пути
    return <Navigate to={`/${lang || 'ua'}/home`} state={{ requestedPath: location.pathname }} />
  }

  return children;

}

export default PrivateRoute;