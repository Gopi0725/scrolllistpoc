import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

const resources = {
  en: {
    translation: {
      "title": "Product List",
      "loading": "Loading...",
    }
  },
  ar: {
    translation: {
      "title": "قائمة المنتجات",
      "loading": "جار التحميل...",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: I18nManager.isRTL ? 'ar' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
