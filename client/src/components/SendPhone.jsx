import { useState } from "react";
import { useLanguage } from "../context/useLanguage";
import { phoneCourseData } from "./data/phoneCourseData";

export default function PhoneForm() {
  const { language } = useLanguage();
  const content = phoneCourseData[language] || phoneCourseData.ua;
  const { title, description, placeholder, buttonText } = content;

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const trimmedPhone = phone.trim();

    if (!/^\+?\d{10,15}$/.test(trimmedPhone)) {
      setError("Введите корректный номер телефона");
      return;
    }

    try {
      const url =
        "https://script.google.com/macros/s/AKfycbyr2gYSw20YRZwZPbdp_olbFddmgJaI2tKtyRfAGWLmEpmCoxIcIrFbwH0abNsuaucZ/exec";

      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: trimmedPhone }),
      });

      setSuccess(`Данные отправлены: ${trimmedPhone}`);
      setPhone("");
    } catch (err) {
      setError("Ошибка при отправке данных.", err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="header-container bg-light">
        <h2 className="header-title">{title}</h2>
        <p className="header-description p-1 mb-1">{description}</p>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={placeholder}
            className="border p-2 rounded w-full me-2"
          />
          <button type="submit" className="btn btn-primary px-3 py-2 rounded">
            {buttonText}
          </button>
          {error && <p className="alert alert-danger">{error}</p>}
          {success && <p className="alert alert-success">{success}</p>}
        </form>
      </div>
    </div>
  );
}
