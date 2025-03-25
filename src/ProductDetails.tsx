import React, { useEffect } from 'react';
import { View, Text, StyleSheet, I18nManager } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './typesNavigation';
import 'react-native-reanimated';

import { useTheme } from '../src/ThemeChangeModule/ThemeContext';
import { Colors } from './ColorsStorage';

import i18n from './i18n';
import { useTranslation } from 'react-i18next';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

interface Props {
  route: ProductDetailsRouteProp;
}

const ProductDetails: React.FC<Props> = ({ route }) => {
  const { theme } = useTheme();
  const { item } = route.params;
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    // Update the header title dynamically when the language changes
    navigation.setOptions({ title: t('productDetails') });
  }, [t]);

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].themeColor }]}>
      <View style={styles.detailsContainer}>
        <Text style={[styles.title, { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}>
          {item.title}
        </Text>
        <Text style={[styles.body, { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}>
          {item.body}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: '#fbeeff',
    margin: 5,
    borderRadius: 25,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    color: 'black',
  },
  body: {
    fontSize: 14,
  },
});

export default ProductDetails;
