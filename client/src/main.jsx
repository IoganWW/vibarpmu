import React from "react"; //React.StrictMode
import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; //ReactDOM.createRoot().render()
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageProvider";
import { AuthProvider } from "./context/AuthProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/styles/index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
