import React from 'react';
import { useAuth } from '../context/useAuth';
const API_BASE = import.meta.env.VITE_API_BASE;

const RemoveCourseButton = ({ courseId }) => {
    const { authFetch, refreshUserData } = useAuth();
  
    const handleRemove = async () => {
      try {
        const res = await authFetch(`${API_BASE}/api/users/profile/remove-course/${courseId}`, {
          method: 'POST',
        });
  
        if (res.success) {
          await refreshUserData();
        } else {
          console.error("Ошибка при удалении курса:", res.message);
        }
      } catch (error) {
        console.error("Ошибка при удалении курса:", error);
      }
    };
  
    return (
      <button className="btn btn-outline-danger rounded mb-3 me-3 btn-sm" onClick={handleRemove}>
        X
      </button>
    );
};

export default RemoveCourseButton;