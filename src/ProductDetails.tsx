import React from 'react';
import {View, Text, StyleSheet,I18nManager} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList, Product} from './typesNavigation';
import 'react-native-reanimated';

import {useTheme} from '../src/ThemeChangeModule/ThemeContext';
import {Colors} from './ColorsStorage';

import i18n from './i18n';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

interface Props {
  route: ProductDetailsRouteProp;
}

const ProductDetails: React.FC<Props> = ({route}) => {
  const { theme } = useTheme();
  const {item} = route.params;

  return (
    <View style={[styles.container,{ backgroundColor: Colors[theme].themeColor}]}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor:'lightgreen'
  },
  detailsContainer:{
    padding: 10,
    backgroundColor: '#fbeeff',
    margin: 5,
    borderRadius: 25,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    color:'block'
  },
  body: {
    fontSize: 12,
  },
});

export default ProductDetails;
