import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import 'react-native-reanimated';

import {useTheme} from '../src/ThemeChangeModule/ThemeContext';
import {Colors} from './ColorsStorage';

{/** Nanvigator imports */}
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Product } from './typesNavigation';


import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './i18n'; // Import i18n configuration
import RNRestart from "react-native-restart";
import { useTranslation } from 'react-i18next';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const URL: string = 'https://jsonplaceholder.typicode.com/posts';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

/*interface Product {
  id: number;
  title: string;
  body: string;
}*/

const ListdataScroll: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const [getProducts, setProductsList] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const limit: number = 15;

  const [language, setLanguage] = useState<string>(i18n.language);
  const [isRTL, setIsRTL] = useState<boolean>(I18nManager.isRTL);
  const [refresh, setRefresh] = useState<boolean>(false);//Force re-render on language change
  
  const {t} = useTranslation();

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    loadLanguage();
  }, []);
  const fetchData = async (): Promise<void> => {
    if (loading) return;
    try {
      const getProductsListResponse: Response = await fetch(
        `${URL}?_page=${page}&_limit=${limit}`,
      );
      const result: Product[] = await getProductsListResponse.json();
      const filteredData = result.filter(item => item.id % 2 !== 0);
      if (filteredData.length > 0) {
        setProductsList(prev => [...prev, ...filteredData]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const loadNextPageData = (): void => {
    setPage(prevPage => prevPage + 1); 
  };

  const loadLanguage = async () => {
    const savedLang = await AsyncStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setLanguage(savedLang);
      const rtl = savedLang === 'ar';
      I18nManager.forceRTL(rtl);
      setIsRTL(rtl); // Update RTL state
      setRefresh(prev => !prev);
    }
  };

  const toggleLanguage = async (lang: 'en' | 'ar') => {
    if (lang === language) return;
    await AsyncStorage.setItem('language', lang);
    await i18n.changeLanguage(lang);
    setLanguage(lang);
    const rtl = lang === 'ar';
    I18nManager.forceRTL(rtl);
    setIsRTL(rtl);
    RNRestart.Restart();
    setRefresh(prev => !prev);
  };

  const listDataClick = (item: Product): void => {
    navigation.navigate(('ProductDetails'), { item });
  };

  const updateProductsList = ({item,index}: {item: Product;index:number}): any => {
    
    const alternatingRowColors = ['#F9BDC0', '#15B5B0'];
    const bgColorCode = alternatingRowColors[index % 2];

    return (
      <TouchableOpacity onPress={() => listDataClick(item)}>
        <View style={[styles.productList,{backgroundColor:bgColorCode}]}>
          <Text
            style={[styles.headerText]}>
            {item.id}.{item.title}
          </Text>
          <Text
            style={[styles.subTextBold]}>
            {item.body}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.MainContainer, { backgroundColor: Colors[theme].themeColor }]}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.languageButton,
              language === 'en' && styles.selectedButton,
            ]}
            onPress={() => toggleLanguage('en')}>
            <Text style={styles.buttonText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.languageButton,
              language === 'ar' && styles.selectedButton,
            ]}
            onPress={() => toggleLanguage('ar')}>
            <Text style={styles.buttonText}>العربية</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.flatListContainer]}>
          <FlatList
            data={getProducts}
            renderItem={updateProductsList}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReached={loadNextPageData}
            onEndReachedThreshold={0.4}
            ListFooterComponent={() =>
              loading && <ActivityIndicator size="large" color="#007bff" />
            }
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: 5,
    backgroundColor:'lightgreen'
  },
  flatListContainer: {
    padding: 10,
    backgroundColor: '#fbeeff',
    margin: 5,
    borderRadius: 25,
    height: '90%',
  },

  productList: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 25,
    padding: 10,
    margin: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  subTextBold: {
    fontSize: 10,
    color: 'black',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
    padding: 5,
  },
  rtl: {
    alignItems: 'flex-end',
  },
  textIcon:{

  },
  buttonText: {
    color: 'red',
    fontSize: 16,
  },
  languageButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
});

export default ListdataScroll;
