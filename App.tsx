import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DarkTheme, DefaultTheme, DrawerActions } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import ListdataScroll from './src/ListdataScroll';
import ProductDetails from './src/ProductDetails';
import ChangeThemeColor from './src/ChangeThemeColor';
import { RootStackParamList } from './src/typesNavigation';
import { ThemeProvider, useTheme } from './src/ThemeChangeModule/ThemeContext';
import Entypo from 'react-native-vector-icons/Entypo';
import CommonHeader from './src/Components/CommonHeader';





const Stack = createStackNavigator<RootStackParamList>();

const StackNav = ({ navigation }: any) => (
  <Stack.Navigator
    screenOptions={({ route }) => ({
      header: () => <CommonHeader title={route.name} />,
    })}
  >
    <Stack.Screen name="Home" component={ListdataScroll} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
  </Stack.Navigator>
);

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  const { theme } = useTheme(); // ✅ Ensured useTheme() is within ThemeProvider

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Home" component={StackNav} />
        <Drawer.Screen name="ChangeThemeColor" component={ChangeThemeColor} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

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
