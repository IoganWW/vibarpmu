import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UniversalRedirect = () => {
  const { lang } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const map = {
      uk: "ua",
      ua: "ua",
      en: "en",
      bg: "bg",
      tr: "tr",
    };

    const browserLang = navigator.language.slice(0, 2);
    const resolvedLang = map[browserLang] || "ua";

    if (!lang) {
      navigate(`/${resolvedLang}/home`, { replace: true });
    } else {
      navigate(`/${lang}/home`, { replace: true });
    }
  }, [lang, navigate]);

  return null;
};

export default UniversalRedirect;