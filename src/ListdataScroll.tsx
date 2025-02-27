import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    if (loading) return;
    try {
      const getProductsListResponse: Response = await fetch(
        `${URL}?_page=${page}&_limit=${limit}`,
      );
      const result: Product[] = await getProductsListResponse.json();
      if(result.length !== 0){
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

  return (
    <View>
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
  );
};

const updateProductsList = ({ item }: { item: Product }): any => {
  return (
    <View style={styles.productList}>
      <Text style={styles.headerText}>
        {item.id}.{item.title}
      </Text>
      <Text style={styles.subTextBold}> {item.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  productList: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'gray',
    elevation: 10,
    padding: 15,
    margin: 2,
    top: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'block',
  },
  subTextBold: {
    fontSize: 10,
    color: 'block',
  },
});

export default ListdataScroll;