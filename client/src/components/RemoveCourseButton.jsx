import React from 'react';
import { useAuth } from '../context/useAuth';

const RemoveCourseButton = ({ courseId }) => {
    const { authFetch, refreshUserData } = useAuth();
  
    const handleRemove = async () => {
      try {
        const res = await authFetch(`/api/profile/remove-course/${ courseId }`, {
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
      <button className="btn btn-outline-danger rounded mb-2 me-5 btn-sm" onClick={handleRemove}>
        X
      </button>
    );
};

export default RemoveCourseButton;