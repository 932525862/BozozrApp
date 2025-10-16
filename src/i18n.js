import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import languageDetector from "i18next-browser-languagedetector";

import uzTranslation from "./locales/uz.json";
import ruTranslation from "./locales/ru.json";
import enTranslation from "./locales/en.json";
import uzruTranslation from "./locales/krl.json";

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
        krl: {translation: uzruTranslation}
    }
    }
)

export default i18n