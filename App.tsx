import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { I18nManager, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ListdataScroll from './src/ListdataScroll';
import ProductDetails from './src/ProductDetails';
import ChangeThemeColor from './src/ChangeThemeColor';
import { RootStackParamList } from './src/typesNavigation';
import { ThemeProvider, useTheme } from './src/ThemeChangeModule/ThemeContext';
import CommonHeader from './src/Components/CommonHeader';

import { useTranslation } from 'react-i18next';
import i18n from './src/i18n';

/**
 * Stack navigator code
 **/
const Stack = createStackNavigator<RootStackParamList>();
const StackNav = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: () => <CommonHeader title={t(route.name)} />,
      })}
    >
      <Stack.Screen name="home" component={ListdataScroll} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerTitle: t('productDetails') }}
      />
    </Stack.Navigator>
  );
};

/**
 * Drawer Navigator code
 **/
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState<boolean>(I18nManager.isRTL);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const savedLang = await AsyncStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      const rtl = savedLang === 'ar';
      I18nManager.forceRTL(rtl);
      setIsRTL(rtl);
    }
  };

  useEffect(() => {
    // Update UI when language changes
    setIsRTL(I18nManager.isRTL);
  }, [i18n.language]);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerPosition: isRTL ? 'right' : 'left',
        }}
      >
        <Drawer.Screen name={t('home')} component={StackNav} />
        <Drawer.Screen name={t('changeTheme')} component={ChangeThemeColor} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

/**
 * Main App Component
 **/
const App = () => (
  <ThemeProvider>
    <AppNavigator />
  </ThemeProvider>
);

const AppStyles = StyleSheet.create({
  mainApp: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
});

export default App;
