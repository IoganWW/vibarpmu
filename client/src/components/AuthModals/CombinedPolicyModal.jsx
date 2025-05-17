import React, { useState } from "react";
import { useLanguage } from "../../context/useLanguage";
import { policyData } from "../data/policyData";

const CombinedPolicyModal = ({ show, onClose }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("privacy"); // 'privacy' или 'terms'

  const content = policyData[language] || policyData.ua;
  const { title, paragraphs } = content[activeTab];

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-full p-6 relative">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>

        {/* Переключатели между условиями и политикой */}
        <div className="flex justify-center mb-4 space-x-4">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === "privacy"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {content.privacy.title}
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === "terms"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {content.terms.title}
          </button>
        </div>

        {/* Заголовок */}
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>

        {/* Контент */}
        <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2">
          {paragraphs.map((p, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-lg mb-1">{p.subtitle}</h3>
              {p.description.map((line, lineIdx) => (
                <p key={lineIdx} className="text-sm text-gray-700 mb-2">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CombinedPolicyModal;
