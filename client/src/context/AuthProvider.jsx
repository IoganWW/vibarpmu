import React, { useState, useEffect } from "react";
import { AuthContext } from "./useAuth";
const API_BASE = import.meta.env.VITE_API_BASE;

// Провайдер контекста
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Получение профиля с сервера
  const fetchUserProfile = async (authToken) => {
    try {
      const response = await fetch(`${API_BASE}/api/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      if (data.success && data.user) {
        setUser(data.user);
        return data.user;
      } else {
        console.error("Ошибка при получении профиля:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Ошибка при запросе профиля:", error);
      return null;
    }
  };

  // Проверка аутентификации при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      // Получаем JWT токен из localStorage
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        // Установить токен по умолчанию
        setToken(storedToken);
        setIsAuthenticated(true);

        try {
          const payload = JSON.parse(atob(storedToken.split(".")[1]));
          setUser({
            _id: payload.id,
            //email: payload.email,
            name: payload.name,
            paidCourses: payload.paidCourses || [],
          });
        } catch (err) {
          console.error("Ошибка декодирования токена:", err);
          setUser(null);
        }

        // Опционально — обновляем данные из API
        await fetchUserProfile(storedToken);

      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const refreshUserData = async () => {
    if (token) {
      await fetchUserProfile(token);
    }
  };

  // Функция для создания заголовков с токеном
  const getAuthHeaders = () => {
    return token ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      } : {
        "Content-Type": "application/json",
      };
  };

  // Функция входа
  const login = async (newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setIsAuthenticated(true);

    try {
      const payload = JSON.parse(atob(newToken.split(".")[1]));
      setUser({
        _id: payload.id,
        //email: payload.email,
        name: payload.name,
        paidCourses: payload.paidCourses || [],
      });
    } catch (err) {
      console.log(err);
      setUser({
        _id: userData._id,
        //email: userData.email,
        name: userData.name,
      });
    }

    await fetchUserProfile(newToken);
  };

  // Функция выхода
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Функция регистрации
  const register = async (userData) => {
    const response = await fetch(`${API_BASE}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (data.success) {
      await login(data.token, data.user);
    } else {
      throw new Error(data.message || "Ошибка при регистрации");
    }

    return data;
  };

  // Функция авторизации
  const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.success) {
      await login(data.token, data.user);
    } else {
      throw new Error(data.message || "Ошибка при входе");
    }

    return data;
  };

  // Функция для выполнения защищенных запросов
  const authFetch = async (url, options = {}) => {
    const headers = getAuthHeaders();

    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {}),
      },
    });

    const data = await response.json();
    // Если токен истек или недействителен
    if (response.status === 401 || response.status === 403) {
      logout(); // Выходим из системы
      throw new Error(data.message || "Ошибка авторизации");
    }

    if (!data.success) {
      throw new Error(data.message || "Ошибка запроса");
    }

    return data;
  };

  // Значения, которые будут доступны через контекст
  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    register,
    loginUser,
    authFetch,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
