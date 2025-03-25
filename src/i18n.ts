import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const languageResources = {
  en: {
    translation: {
      home: "Home",
      ProductDetails: "Product Details",
      changeTheme: "Change Theme",
      productTitle: "Product Title",
      productDescription: "Description",
      thisIsDemo: "This is a demo of default dark/light theme with switch/buttons using async storage.",
      switchLanguage: "Switch Language",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      ListData:"Products"
    },
  },
  ar: {
    translation: {
      home: "الرئيسية",
      ProductDetails: "تفاصيل المنتج",
      changeTheme: "تغيير الثيم",
      productTitle: "عنوان المنتج",
      productDescription: "الوصف",
      thisIsDemo: "هذه تجربة للتبديل بين الوضع الداكن والفاتح باستخدام التخزين المؤقت.",
      lightMode: "الوضع الفاتح",
      darkMode: "الوضع المظلم",
      switchLanguage: "تغيير اللغة",
      ListData:"المنتجات"
    },
  },
};

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources:languageResources
});

export default i18n;
