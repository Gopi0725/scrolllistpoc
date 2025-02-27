import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

const URL = 'https://jsonplaceholder.typicode.com/posts';

const ServiceUtility = () => {
  const [getProducts, setProductsList] = useState(0);

  const fetchData = async () => {
    const getProductsListResponse = await fetch(URL);
    getProductsListResponse.json().then(list => {
      setProductsList(list);
    });
  };

  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={getProducts}
        renderItem={updateProductsList}
        keyExtractor={item => item.id}
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
  headerText:{
    fontWeight:'bold',
    fontSize:15,
    color:"Block"
  },
  subTextBold:{
    fontSize:13,
    color:"green"
  },
  image: {
    height: 200,
    resizeMode: 'center',
  },
});

export default ServiceUtility;
