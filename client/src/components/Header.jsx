import React, { useState } from "react";
import { AuthModals } from "./AuthModals/AuthModals";

import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import LoginModal from "./AuthModals/LoginModal";
import RegisterModal from "./AuthModals/RegisterModal";
import { useAuth } from "../context/useAuth";

import logo from "../assets/images/brand.jpg";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../context/useLanguage";
import { navMenuData } from "./data/navData";

const Header = () => {
  // Получаем текущий язык из контекста
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

  <AuthModals
    showLogin={showLogin}
    showRegister={showRegister}
    handleClose={handleCloseModals}
    switchToLogin={handleOpenLogin}
    switchToRegister={handleOpenRegister}
  />;

  const { isAuthenticated, user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  const location = useLocation();
  const currentPath = location.pathname;
  const isDropdownActive = ["/exclusive/brows", "/exclusive/lips"].includes(
    currentPath
  );

  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark" expand="xl">
        <Container>
          <Navbar.Brand as={Link} to="/" alt="Brand">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />{" "}
            Bar PMU
          </Navbar.Brand>
          {isAuthenticated ? (
            <>
              <span className="d-xl-none bg-light rounded px-2 py-1">
                <strong>
                  {hello}, {user?.name || "user"}
                </strong>
              </span>
              <Button
                variant="outline-danger"
                className="order-1 order-xl-last me-2 ms-auto text-nowrap"
                onClick={handleLogout}
              >
                {logOut}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline-primary"
                className="order-1 order-xl-last px-3 py-2 me-2 ms-auto text-nowrap"
                onClick={handleOpenLogin}
              >
                {authButton}
              </Button>
            </>
          )}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="order-2 order-xl-1"
          />
          <Navbar.Collapse id="basic-navbar-nav" className="order-3 w-100">
            <Nav variant="underline" className="px-4 me-auto">
              <Nav.Link as={NavLink} to="home">
                {home}
              </Nav.Link>
              <Nav.Link as={NavLink} to="gallery">
                {gallery}
              </Nav.Link>
              <Nav.Link as={NavLink} to="coursesGroup">
                {courses}
              </Nav.Link>
              {isAuthenticated && (
                <>
                  <Nav.Link as={NavLink} to="articles">
                    {article}
                  </Nav.Link>
                  <NavDropdown title={courses + ' ' + online} id="basic-nav-dropdown">
                    <NavDropdown.Item as={NavLink} className="sky-link" to="onlineBrowsVi">
                      {online} {brows}
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} className="sky-link" to="onlineLipsVi">
                      {online} {lips}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={NavLink} to="personal">
                      {personalCoaching}
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {user?.paidCourses?.length > 0 && (
                <NavDropdown
                  title={exclusive}
                  active={isDropdownActive}
                  id="basic-nav-dropdown"
                >
                  {user?.paidCourses?.includes("brows") && (
                    <NavDropdown.Item
                      active={currentPath === "/courses/brows"}
                      as={NavLink}
                      to="courses/brows"
                      className="gold-link"
                    >
                      {online} {brows}
                    </NavDropdown.Item>
                  )}
                  {user?.paidCourses?.includes("lips") && (
                    <NavDropdown.Item
                      active={currentPath === "/courses/lips"}
                      as={NavLink}
                      to="courses/lips"
                      className="gold-link"
                    >
                      {online} {lips}
                    </NavDropdown.Item>
                  )}
                </NavDropdown>
              )}
              <Nav.Link as={NavLink} to="faq">
                {faq}
              </Nav.Link>
              {isAuthenticated && (
                <>
                  <Nav.Link as={NavLink} to="profile" className="sky-link">
                    {profile}
                  </Nav.Link>
                </>
              )}
            </Nav>
            <LanguageSwitcher />
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
    </header>
  );
};

export default Header;
