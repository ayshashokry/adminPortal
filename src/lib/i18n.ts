"use client"; // Needed in App Router

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next) // Enables useTranslation()
    .use(LanguageDetector) // Detects user's language
    .use(HttpApi) // Loads translations from public/locales
    .init({
      fallbackLng: "en",
      supportedLngs: ["en", "ar"], // Ensure these match your languages
      debug: process.env.NODE_ENV === "development",
      ns: ["translation"],
      defaultNS: "translation",
      interpolation: {
        escapeValue: false, // React handles escaping
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json", // Adjust if using static translation files
      },
      detection: {
        order: ["cookie", "localStorage", "navigator"],
      },
    });
}

export default i18n;



