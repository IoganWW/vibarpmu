import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../context/useLanguage';

const Layout = () => {
  const { lang } = useParams();
  const { changeLanguage } = useLanguage();

  useEffect(() => {
    if (lang) {
      changeLanguage(lang);
    }
  }, [lang, changeLanguage]);

  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  );
};

export default Layout;