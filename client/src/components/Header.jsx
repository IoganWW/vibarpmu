import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Button, Row, Col } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import LoginModal from "./AuthModals/LoginModal";
import RegisterModal from "./AuthModals/RegisterModal";
import { useAuth } from "../context/useAuth";
import logo from "../assets/images/brand.webp";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../context/useLanguage";
import { navMenuData } from "./data/navData";
import "../assets/styles/Header.css";

const Header = () => {
  const { language } = useLanguage();
  const {
    hello,
    authButton,
    logOut,
    home,
    gallery,
    faq,
    courses,
    personalCoaching,
    article,
    profile,
    exclusive,
    online,
    lips,
    brows,
  } = navMenuData[language] || navMenuData.ua;

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleOpenLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleOpenRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  const { isAuthenticated, user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  const location = useLocation();
  const currentPath = location.pathname;
  const isDropdownActive = [`/${language}/courses/brows`, `/${language}/courses/lips`].includes(currentPath);

  // 4 стандартные страницы (доступны всем)
  const publicPages = [
    { name: home, path: `/${language}/home` },
    { name: gallery, path: `/${language}/gallery` },
    { name: courses, path: `/${language}/coursesGroup` },
    { name: faq, path: `/${language}/faq` }
  ];

  // 2 защищённые страницы (только для авторизованных)
  const protectedPages = [
    { name: article, path: `/${language}/articles` },
    { name: profile, path: `/${language}/profile`, className: "sky-link" }
  ];

  // 2 страницы с проверкой доступа
  const restrictedDropdowns = [];
  
  // Онлайн курсы (для авторизованных)
  if (isAuthenticated) {
    restrictedDropdowns.push({
      name: online,
      items: [
        { name: `${online} ${brows}`, path: `/${language}/onlineBrowsVi`, className: "sky-link" },
        { name: `${online} ${lips}`, path: `/${language}/onlineLipsVi`, className: "sky-link" },
        { name: personalCoaching, path: `/${language}/personal` }
      ]
    });
  }

  // Эксклюзивные курсы (с проверкой доступа)
  if (user?.paidCourses?.length > 0) {
    restrictedDropdowns.push({
      name: exclusive,
      active: isDropdownActive,
      items: user.paidCourses.map(courseType => ({
        name: courseType === "brows" ? `${online} ${brows}` : `${online} ${lips}`,
        path: `/${language}/courses/${courseType}`,
        className: "gold-link",
        active: currentPath === `/${language}/courses/${courseType}`
      }))
    });
  }

  // Все страницы для отображения
  const allPages = [
    ...publicPages,
    ...(isAuthenticated ? protectedPages : [])
  ];

  return (
    <>
      <header>
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" expanded={expanded} onToggle={setExpanded}>
          <Container>
            <Navbar.Brand as={Link} to={`/${language}`} alt="Brand">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="logo"
              />
              {" "}Bar PMU
            </Navbar.Brand>

            {/* Переключатель языков для мобильных - прижат к правому краю */}
            <div className="d-lg-none d-flex align-items-center ms-auto me-2">
              <LanguageSwitcher />
            </div>

            {/* Кнопка мобильного меню */}
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
            />

            {/* Меню */}
            <Navbar.Collapse id="basic-navbar-nav" className="w-100">
              {/* Десктопное меню */}
              <Nav variant="underline" className="d-none d-lg-flex me-auto">
                {allPages.map((item, index) => (
                  <Nav.Link
                    key={index}
                    as={NavLink}
                    to={item.path}
                    className={`nav-link-custom ${item.className || ''}`}
                  >
                    {item.name}
                  </Nav.Link>
                ))}
                
                {/* Dropdown меню для десктопа */}
                {restrictedDropdowns.map((dropdown, index) => (
                  <NavDropdown
                    key={`dropdown-${index}`}
                    title={dropdown.name}
                    id={`nav-dropdown-${index}`}
                    active={dropdown.active}
                    className="nav-link-custom"
                  >
                    {dropdown.items.map((subItem, subIndex) => (
                      <NavDropdown.Item
                        key={subIndex}
                        as={NavLink}
                        to={subItem.path}
                        className={subItem.className}
                        active={subItem.active}
                      >
                        {subItem.name}
                      </NavDropdown.Item>
                    ))}
                    {dropdown.items.length > 2 && <NavDropdown.Divider />}
                  </NavDropdown>
                ))}
              </Nav>

              {/* Мобильное меню в 2 колонки */}
              <div className="d-lg-none w-100 mt-3">
                <Container fluid>
                  <Row className="g-2">
                    {allPages.map((item, index) => (
                      <Col xs={6} key={index}>
                        <Nav.Link
                          as={NavLink}
                          to={item.path}
                          className="mobile-nav-link text-center d-block p-3 rounded border"
                          style={{ 
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          }}
                          onClick={handleNavLinkClick}
                        >
                          <div className="fw-medium">{item.name}</div>
                        </Nav.Link>
                      </Col>
                    ))}

                    {/* Dropdown элементы в мобильном меню */}
                    {restrictedDropdowns.map((dropdown, dropIndex) => (
                      <Col xs={12} key={`mobile-dropdown-${dropIndex}`} className="mt-2">
                        <div className="bg-secondary rounded p-2">
                          <div className="text-white fw-bold mb-2 text-center">
                            {dropdown.name}
                          </div>
                          <Row className="g-1">
                            {dropdown.items.map((subItem, subIndex) => (
                              <Col xs={6} key={subIndex}>
                                <Nav.Link
                                  as={NavLink}
                                  to={subItem.path}
                                  className="mobile-nav-link text-center d-block p-2 rounded border"
                                  style={{ 
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    border: '1px solid rgba(255, 255, 255, 0.2)'
                                  }}
                                  onClick={handleNavLinkClick}
                                >
                                  {subItem.name}
                                </Nav.Link>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      </Col>
                    ))}
                  </Row>

                  {/* Кнопки авторизации в мобильном меню */}
                  <div className="mt-3 pt-3 border-top border-secondary">
                    {isAuthenticated ? (
                      <div className="text-center">
                        <div className="mb-2 text-success">
                          {hello}, <strong>{user?.name || "user"}</strong>
                        </div>
                        <Button
                          variant="outline-danger"
                          onClick={handleLogout}
                          className="w-100"
                        >
                          {logOut}
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline-light"
                        onClick={handleOpenLogin}
                        className="w-100"
                      >
                        {authButton}
                      </Button>
                    )}
                  </div>
                </Container>
              </div>

              {/* Десктопные кнопки авторизации */}
              <div className="d-none d-lg-flex align-items-center ms-auto">
                {isAuthenticated ? (
                  <>
                    <span className="d-lg-none d-xl-flex me-3 text-light">
                      {hello}, <strong>{user?.name || "user"}</strong>
                    </span>
                    <Button
                      variant="outline-danger"
                      onClick={handleLogout}
                      className="text-nowrap"
                    >
                      {logOut}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline-light"
                    onClick={handleOpenLogin}
                    className="text-nowrap"
                  >
                    {authButton}
                  </Button>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Вертикальный фиксированный переключатель языков только для десктопа */}
      <div 
        className="position-fixed bg-dark shadow rounded border d-none d-lg-block vertical-lang-switcher"
        style={{ 
          right: '15px', 
          top: '50%', 
          transform: 'translateY(-50%)',
          zIndex: 1040,
          padding: '8px'
        }}
      >
        <LanguageSwitcher />
      </div>

      {/* Модальные окна */}
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

export default Header;