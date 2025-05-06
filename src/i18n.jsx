import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./common/translater/english.json";
// import translationAr from "./component/translater/arabic.json";

const resources = {
  En: {
    translation: translationEN,
  },
  // Ar: {
  //   translation: translationAr,
  // },
  // Sp: {
  //   translation: translationSp,
  // },
  // Pr: {
  //   translation: translationPr,
  // },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "En",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
