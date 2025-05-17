import { createContext, useContext } from 'react';

// Создаем контекст
export const AuthContext = createContext();

// Хук для использования контекста
export const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;