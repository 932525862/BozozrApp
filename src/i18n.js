import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import languageDetector from "i18next-browser-languagedetector";

import uzTranslation from "./locale/uz.json";
import ruTranslation from "./locale/ru.json";
import enTranslation from "./locale/en.json";
import uzruTranslation from "./locale/uz-ru.json";

const language = localStorage.getItem('marketAppLng') || 'uz'

i18n
.use(Backend)
.use(languageDetector)
.use(initReactI18next)
.init({
    fallbackLng : 'en',
    lng: language,
    debug: true,
    resources: {
        uz: {translation: uzTranslation},
        ru: {translation: ruTranslation},
        en: {translation: enTranslation},
        uzru: {translation: uzruTranslation}
    }
    }
)

export default i18n