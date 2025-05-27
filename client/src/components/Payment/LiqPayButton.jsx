// components/LiqPayButton.jsx
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE;


const LiqPayButton = ({ amount, description, orderId, courseId, userId }) => {
  const [formHTML, setFormHTML] = useState("");
  const [loading, setLoading] = useState(false);
  const { lang } = useParams();

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/liqpay/create-payment`, {
        amount,
        description,
        orderId,
        courseId,
        userId,
        lang
      });
      setFormHTML(res.data.html);
      // Позже можно добавить трекинг результата оплаты через polling или WebSocket
    } catch (err) {
      console.error("Ошибка при создании платежа:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!formHTML && (
        <button className="btn btn-success rounded mb-2" 
          onClick={handlePay}
          disabled={loading}
        >
          {loading ? "Создание платежа..." : "Оплатить через LiqPay"}
        </button>
      )}
      <div dangerouslySetInnerHTML={{ __html: formHTML }} />
    </div>
  );
};

export default LiqPayButton;
