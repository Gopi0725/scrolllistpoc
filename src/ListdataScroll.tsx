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

import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './i18n'; // Import i18n configuration

const URL: string = 'https://jsonplaceholder.typicode.com/posts';

interface Product {
  id: number;
  title: string;
  body: string;
}

const ListdataScroll: React.FC = () => {
  const [getProducts, setProductsList] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const limit: number = 10;

  const [language, setLanguage] = useState<string>(i18n.language);

  const [isRTL, setIsRTL] = useState<boolean>(I18nManager.isRTL);

  useEffect(() => {
    fetchData();
  }, []);

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
      if (result.length !== 0) {
        setLoading(true);
        setProductsList(previousResponse => [...previousResponse, ...result]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const loadNextPageData = (): void => {
    setPage(previousResponse => previousResponse + 1);
    fetchData();
  };

  const loadLanguage = async () => {
    const savedLang = await AsyncStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setLanguage(savedLang);
      const rtl = savedLang === 'ar';
      I18nManager.forceRTL(rtl);
      setIsRTL(rtl); // Update RTL state
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
  };

  const updateProductsList = ({item}: {item: Product}): any => {
    return (
      <View style={[styles.productList, isRTL && styles.rtl]}>
        <Text
          style={[styles.headerText, {textAlign: isRTL ? 'right' : 'left'}]}>
          {item.id}. {item.title}
        </Text>
        <Text
          style={[styles.subTextBold, {textAlign: isRTL ? 'right' : 'left'}]}>
          {item.body}
        </Text>
      </View>
    );
  };

  return (
    <View>
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
      <View style={[styles.flatListContainer, isRTL && styles.rtl]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: 5,
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
