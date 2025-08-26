import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import de from './de.json';
import it from './it.json';
import nl from './nl.json';
import pt from './pt.json';

i18n
    .use(LanguageDetector) // detecta idioma del navegador
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            es: { translation: es },
            fr: { translation: fr },
            de: { translation: de },
            it: { translation: it },
            nl: { translation: nl },
            pt: { translation: pt },
        },
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['path', 'localStorage', 'navigator'],
            lookupFromPathIndex: 0,
            caches: ['localStorage'],
        },
    });

export default i18n;