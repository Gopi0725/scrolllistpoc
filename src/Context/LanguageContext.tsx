import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';
import { I18nManager } from 'react-native';

interface LanguageContextType {
  language: string;
  isRTL: boolean;
  toggleLanguage: (lang: string) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');
  const [isRTL, setIsRTL] = useState<boolean>(I18nManager.isRTL);

  const toggleLanguage = async (lang: string) => {
    if (lang === language) return;
    await AsyncStorage.setItem('language', lang);
    await i18n.changeLanguage(lang);
    const rtl = lang === 'ar';
    I18nManager.forceRTL(rtl);
    setIsRTL(rtl);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, isRTL, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
