// LoginModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { Eye, EyeSlash, Envelope, Lock } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useLanguage } from "../../context/useLanguage";
import { authModalData } from '../../components/data/authModalData';

const LoginModal = ({ show, handleClose, switchToRegister }) => {
  // Получаем текущий язык из контекста
  const { language } = useLanguage();

  // Получаем данные для выбранного языка, по умолчанию ua
  const { common, loginData } = authModalData[language] || authModalData.ua;

  // Состояния для формы
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Состояния для валидации
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetLoginForm = () => {
    setEmail("");
    setPassword("");
    setRememberMe(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Валидация формы
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true);
    setError("");

    try {
      await loginUser(email, password);
      resetLoginForm();
      handleClose();
      navigate("/profile");
    } catch (error) {
      setError(error.message || `${loginData.loginErr}`);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Здесь логика восстановления пароля
    console.log("Password recovery requested for:", email);
    // Можно добавить вызов отдельного модального окна или переход на страницу восстановления
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{loginData.modalHeader}</Modal.Title>
      </Modal.Header>
      {error && <div className="alert alert-danger">{error}</div>}
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>{common.emailInput}</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <Envelope />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder={common.emailInputPlh}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {common.emailInputFb}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>{common.passwordInput}</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <Lock />
              </InputGroup.Text>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder={common.passwordInputPlh}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <Button
                variant="outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {common.passwordInputFb}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRememberMe">
            <Form.Check
              type="checkbox"
              label={loginData.rememberMeCheck}
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </Form.Group>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Button
              variant="link"
              className="p-0 text-decoration-none"
              onClick={handleForgotPassword}
            >
              {loginData.forgotPass}
            </Button>
            <Button variant="link" className="p-0" onClick={switchToRegister}>
              {common.registrationLink}
            </Button>
          </div>

          <div className="d-flex justify-content-between mt-4">
            {/*d-grid gap-2*/}
            <Button variant="secondary" onClick={handleClose}>
              {common.closeBtn}
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  {loginData.logInSpinner}
                </>
              ) : (
                `${common.signInBtn}`
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
