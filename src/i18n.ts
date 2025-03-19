import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";

const resources = {
  en: {
    translation: {
      home: "Home",
      productDetails: "Product Details",
      changeTheme: "Change Theme",
      productTitle: "Product Title",
      productDescription: "Description",
      switchLanguage: "Switch Language",
    },
  },
  ar: {
    translation: {
      home: "الرئيسية",
      productDetails: "تفاصيل المنتج",
      changeTheme: "تغيير الثيم",
      productTitle: "عنوان المنتج",
      productDescription: "الوصف",
      switchLanguage: "تغيير اللغة",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
