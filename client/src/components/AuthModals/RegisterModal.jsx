// RegisterModal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, ProgressBar, InputGroup } from "react-bootstrap";
import CombinedPolicyModal from "./CombinedPolicyModal";
import { useAuth } from "../../context/useAuth";
import { useLanguage } from "../../context/useLanguage";
import { authModalData } from "../../components/data/authModalData";

const RegisterModal = ({ show, handleClose, switchToLogin }) => {
  // Получаем текущий язык из контекста
  const { language } = useLanguage();

  // Получаем данные для выбранного языка, по умолчанию ua
  const { common, registerData } = authModalData[language] || authModalData.ua;

  // Состояние для хранения активного шага
  const [activeStep, setActiveStep] = useState(1);

  // Состояние для хранения данных пользователя
  const [userData, setUserData] = useState({
    // Шаг 1: Личные данные
    name: "",
    surname: "",
    ageGroup: "",
    phone: "",

    // Шаг 2: Адрес и местоположение
    country: "",
    city: "",
    experience: `${registerData.beginner}`,

    // Шаг 3: Учетные данные
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  // Функция для очистки формы
  const resetRegisterForm = () => {
    setUserData({
      name: "",
      surname: "",
      ageGroup: "",
      phone: "",

      country: "",
      city: "",
      experience: `${registerData.beginner}`,

      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    });
  };

  // Состояние для отображения загрузки при отправке формы
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // Состояние для отображения/скрытия пароля
  const [showPassword, setShowPassword] = useState(false);

  // Состояние для ошибок валидации
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();
  const { register } = useAuth();

  // Согласия с политиками
  const [showPolicy, setShowPolicy] = useState(false);

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    const fieldName = name || id;
    const fieldValue = type === "checkbox" ? checked : value;

    setUserData({
      ...userData,
      [fieldName]: fieldValue,
    });

    // Сброс ошибки валидации при изменении поля
    if (validationErrors[fieldName]) {
      setValidationErrors({
        ...validationErrors,
        [fieldName]: null,
      });
    }
  };

  // Валидация шага 1
  const validateStep1 = () => {
    const errors = {};

    if (!userData.name || userData.name.length < 2) {
      errors.name = `${registerData.fb.nameFb}`;
    }

    if (!userData.phone) {
      errors.phone = `${registerData.fb.phoneFb}`;
    }

    if (!userData.ageGroup) {
      errors.ageGroup = `${registerData.fb.ageGroupFb}`;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Валидация шага 2
  const validateStep2 = () => {
    const errors = {};

    if (!userData.country) {
      errors.country = `${registerData.fb.countryFb}`;
    }

    if (!userData.city) {
      errors.city = `${registerData.fb.cityFb}`;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Валидация шага 3
  const validateStep3 = () => {
    const errors = {};

    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = `${common.fb.emailInputFb}`;
    }

    if (!userData.password || userData.password.length < 6) {
      errors.password = `${common.fb.passwordInputFb}`;
    }

    if (userData.password !== userData.confirmPassword) {
      errors.confirmPassword = `${registerData.fb.confirmPasswordFb}`;
    }

    if (!userData.termsAccepted) {
      errors.termsAccepted = `${registerData.fb.termsAcceptedFb}`;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Переход к следующему шагу
  const nextStep = () => {
    if (activeStep === 1 && validateStep1()) {
      setActiveStep(2);
    } else if (activeStep === 2 && validateStep2()) {
      setActiveStep(3);
    }
  };

  // Переход к предыдущему шагу
  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep3()) {
      setLoading(true);
      setError("");

      try {
        await register(userData);
        handleClose();
        resetRegisterForm();
        navigate("/profile");
      } catch (error) {
        setError(error.message || `${registerData.submitErrFb}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // Получение значения прогресс-бара
  const getProgressValue = () => {
    return ((activeStep - 1) / 2) * 100;
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      className="z-40-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{registerData.modalHeader}</Modal.Title>
      </Modal.Header>
      {error && <div className="alert alert-danger">{error}</div>}
      <Modal.Body>
        <ProgressBar
          now={getProgressValue()}
          style={{ height: "5px" }}
          className="mb-4"
        />

        <Form onSubmit={handleSubmit} noValidate>
          {/* Шаг 1: Личные данные */}
          {activeStep === 1 && (
            <div className="registration-step">
              <h5 className="mb-3">{registerData.step1Header}</h5>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <Form.Group controlId="name">
                    <Form.Label>{registerData.nameInput}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={registerData.nameInputPlh}
                      value={userData.name}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.name}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6 mb-3">
                  <Form.Group controlId="surname">
                    <Form.Label>{registerData.surnameInput}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={registerData.surnameInputPlh}
                      value={userData.surname}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label className="d-block">{registerData.ageGroupInput}</Form.Label>
                <div>
                  {["18-25", "26-33", "33+"].map((age) => (
                    <Form.Check
                      key={age}
                      inline
                      type="radio"
                      id={`age-${age}`}
                      name="ageGroup"
                      value={age}
                      label={age}
                      checked={userData.ageGroup === age}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.ageGroup}
                    />
                  ))}
                  {validationErrors.ageGroup && (
                    <div className="text-danger mt-1 small">
                      {validationErrors.ageGroup}
                    </div>
                  )}
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>{registerData.phoneInput}</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text>
                    <i className="bi bi-phone"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="tel"
                    placeholder="+ (___) --"
                    value={userData.phone}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.phone}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.phone}
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Text className="text-muted">
                  {registerData.formatPhone}: +38 (095) 683-28-03, +359 88 613-80-04
                </Form.Text>
              </Form.Group>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="secondary" onClick={handleClose}>
                {common.closeBtn}
                </Button>
                <Button variant="primary" onClick={nextStep}>
                  {registerData.nextBtn}
                </Button>
              </div>
            </div>
          )}

          {/* Шаг 2: Адрес и местоположение */}
          {activeStep === 2 && (
            <div className="registration-step">
              <h5 className="mb-3">{registerData.step2Header}</h5>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <Form.Group controlId="country">
                    <Form.Label>{registerData.countryInput}</Form.Label>
                    <Form.Select
                      value={userData.country}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.country}
                      required
                    >
                      <option value="">{registerData.countrySelect}</option>
                      <option value="Україна">Україна</option>
                      <option value="Болгарія">Болгарія</option>
                      <option value="Німеччина">Німеччина</option>
                      <option value="Польща">Польща</option>
                      <option value="Іспанія">Іспанія</option>
                      <option value="Туреччина">Туреччина</option>
                      <option value="Велика Британія">Велика Британія</option>
                      <option value="Інша">Інша</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.country}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6 mb-3">
                  <Form.Group controlId="city">
                    <Form.Label>{registerData.cityInput}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={registerData.cityInputPlh}
                      value={userData.city}
                      onChange={handleChange}
                      isInvalid={!!validationErrors.city}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {validationErrors.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3" controlId="experience">
                <Form.Label>{registerData.permanentSkills}</Form.Label>
                <Form.Select
                  value={userData.experience}
                  onChange={handleChange}
                >
                  <option value="beginner">{registerData.beginner}</option>
                  <option value="intermediate">{registerData.intermediate}</option>
                  <option value="advanced">{registerData.advanced}</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="secondary" onClick={prevStep}>
                  {registerData.prevBtn}
                </Button>
                <Button variant="primary" onClick={nextStep}>
                  {registerData.nextBtn}
                </Button>
              </div>
            </div>
          )}

          {/* Шаг 3: Учетные данные */}
          {activeStep === 3 && (
            <div className="registration-step">
              <h5 className="mb-3">{registerData.step3Header}</h5>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>{common.emailInput}</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text>
                    <i className="bi bi-envelope"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder={common.emailInputPlh}
                    value={userData.email}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>{common.passwordInput}</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text>
                    <i className="bi bi-lock"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder={common.passwordInputPlh}
                    value={userData.password}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.password}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`bi bi-${showPassword ? "eye-slash" : "eye"}`}
                    ></i>
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>{registerData.passwordInputAc}</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text>
                    <i className="bi bi-lock-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder={registerData.passwordInputAcPlh}
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.confirmPassword}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.confirmPassword}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="termsAccepted">
                <CombinedPolicyModal
                  show={showPolicy}
                  onClose={() => setShowPolicy(false)}
                />
                <Form.Check
                  type="checkbox"
                  label={
                    <span className="text-sm text-gray-700">
                      {registerData.agreeText}{" "}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPolicy(true);
                        }}
                        className="text-blue-600 underline"
                      >
                        {registerData.agreeTerms}
                      </a>
                    </span>
                  }
                  checked={userData.termsAccepted}
                  onChange={handleChange}
                  isInvalid={!!validationErrors.termsAccepted}
                  feedback={validationErrors.termsAccepted}
                  feedbackType="invalid"
                />
              </Form.Group>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="secondary" onClick={prevStep}>
                  {registerData.prevBtn}
                </Button>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      {registerData.loadingSpinner}
                    </>
                  ) : (
                    `${common.registrationLink}`
                  )}
                </Button>
              </div>
            </div>
          )}
        </Form>

        {activeStep === 1 && (
          <div className="text-center mt-3">
            <p>
              {registerData.switchToLoginBtn}{" "}
              <Button variant="link" onClick={switchToLogin} className="p-0">
                {common.signInBtn}
              </Button>
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
