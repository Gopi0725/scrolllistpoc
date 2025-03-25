import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../src/ThemeChangeModule/ThemeContext';
import { Colors } from './ColorsStorage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Product } from './typesNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './i18n'; 
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const URL: string = 'https://jsonplaceholder.typicode.com/posts';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const ListdataScroll: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const limit: number = 10;
  const [language, setLanguage] = useState<string>(i18n.language);
  const [isRTL, setIsRTL] = useState<boolean>(I18nManager.isRTL);
  const [refresh, setRefresh] = useState<boolean>(false); // 🔄 Force re-render on language change

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    loadLanguage();
  }, []);

  const fetchData = async (currentPage: number): Promise<void> => {
    if (loading) return;
    setLoading(true);
    try {
      const response: Response = await fetch(`${URL}?_page=${currentPage}&_limit=${limit}`);
      const result: Product[] = await response.json();
      if (result.length !== 0) {
        setProducts(prev => [...prev, ...result]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const loadNextPageData = (): void => {
    if (!loading) setPage(prev => prev + 1);
  };

  const loadLanguage = async () => {
    const savedLang = await AsyncStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setLanguage(savedLang);
      const rtl = savedLang === 'ar';
      I18nManager.forceRTL(rtl);
      setIsRTL(rtl);
      setRefresh(prev => !prev); // 🔄 Force re-render
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
    setRefresh(prev => !prev); // 🔄 Force re-render
  };
  const listDataClick = (item: Product): void => {
    navigation.navigate('ProductDetails', { item });
  };

  const renderProduct = ({ item, index }: { item: Product; index: number }) => {
    const alternatingRowColors = ['#F9BDC0', '#15B5B0'];
    const bgColorCode = alternatingRowColors[index % 2];

    return (
      <TouchableOpacity onPress={() => listDataClick(item)}>
        <View style={[styles.productList, isRTL && styles.rtl, { backgroundColor: bgColorCode }]}>
          <Text style={[styles.headerText, { textAlign: isRTL ? 'right' : 'left' }]}>
            {item.id}. {item.title}
          </Text>
          <Text style={[styles.subTextBold, { textAlign: isRTL ? 'right' : 'left' }]}>
            {item.body}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.MainContainer, { backgroundColor: Colors[theme].themeColor }]}>
        {/* Language Selection */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.languageButton, language === 'en' && styles.selectedButton]}
            onPress={() => toggleLanguage('en')}>
            <Text style={styles.buttonText}>{i18n.t('english')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.languageButton, language === 'ar' && styles.selectedButton]}
            onPress={() => toggleLanguage('ar')}>
            <Text style={styles.buttonText}>{i18n.t('arabic')}</Text>
          </TouchableOpacity>
        </View>

        {/* Product List */}
        <View style={[styles.flatListContainer, isRTL && styles.rtl]}>
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadNextPageData}
            onEndReachedThreshold={0.4}
            ListFooterComponent={() =>
              loading && <ActivityIndicator size="large" color="#007bff" />
            }
            extraData={refresh} // 🔄 Force re-render when language changes
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
    backgroundColor: 'lightgreen',
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
