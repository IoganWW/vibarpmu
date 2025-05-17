// AuthModals.jsx - компонент для управления модальными окнами авторизации и регистрации
import React from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const AuthModals = ({
  showLogin,
  showRegister,
  handleClose,
  switchToLogin,
  switchToRegister,
}) => {
  return (
    <>
      <LoginModal
        show={showLogin}
        handleClose={handleCloseModals}
        switchToRegister={handleOpenRegister}
      />
      <RegisterModal
        show={showRegister}
        handleClose={handleCloseModals}
        switchToLogin={handleOpenLogin}
      />
    </>
  );
};

export { AuthModals, LoginModal, RegisterModal };
