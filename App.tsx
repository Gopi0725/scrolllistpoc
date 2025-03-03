import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import {StyleSheet, View} from 'react-native';

import ListdataScroll from './src/ListdataScroll';
import ProductDetails from './src/ProductDetails';
import {RootStackParamList} from './src/typesNavigation';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ListdataScroll} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppStyles = StyleSheet.create({
  mainApp: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
});
export default App;
