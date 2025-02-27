import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';

const URL = 'https://jsonplaceholder.typicode.com/posts';

const ScrollListData = () => {
  const [getProducts, setProductsList] = useState([]); 
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (loading) return;
    try {
      const getProductsListResponse = await fetch(
        `${URL}?_page=${page}&_limit=${limit}`,
      );
      const result = await getProductsListResponse.json();
      if(result.length!== 0){
        setLoading(true);
        setProductsList(previousResponse => [...previousResponse, ...result]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const loadNextPageData = () => {
    setPage(previousResponse => previousResponse + 1);
    fetchData();
  };

  return (
    <View>
      <FlatList
        data={getProducts}
        renderItem={updateProductsList}
        keyExtractor={item => item.id - Math.random()}
        onEndReached={loadNextPageData}
        onEndReachedThreshold={0.4}
        ListFooterComponent={() =>
          loading && <ActivityIndicator size="large" color="#007bff" />
        }
      />
    </View>
  );
};

const updateProductsList = ({item}) => {
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
    color: 'Block',
  },
  subTextBold: {
    fontSize: 12,
    color: 'block',
  },
  image: {
    height: 200,
    resizeMode: 'center',
  },
});

export default ScrollListData;
