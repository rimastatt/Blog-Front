import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import languageDetector from 'i18next-browser-languagedetector'

import lt from './translations/lt.json'
import en from './translations/en.json'

i18next
    .use(initReactI18next)
    .use(languageDetector)
    .init({
        resources: {
            lt,
            en
        },
        load: 'languageOnly',
        ns: ['common'],
        defaultNS: 'common',
        fallbackLng: 'en',
        whitelist: ['lt', 'en'],
        debug: true,
        interpolation: {
            escapeValue: false
        }
    })

export default i18next
