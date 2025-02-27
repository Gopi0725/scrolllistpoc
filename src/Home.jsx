import { Text, View, Image, ActivityIndicator, TouchableOpacity, VirtualizedList, StyleSheet, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import data from "../util/https";

const Home = () => {
  const { productlist, hasMore, loading, fetchRecords } = data();

  const onPressItem = ({ item }) => {
    Alert.alert('Added to cart: ', `${item.title}`);
  }


  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.touch} onPress={() => onPressItem({item})}>
      <View style={styles.itemContainer}>
        <View
          style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Image
            style={styles.image}
            resizeMethod="resize"
            source={{ uri: item.thumbnail }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "lightyellow" }}>
        <VirtualizedList
          data={productlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          onEndReached={() => {
            if (hasMore && !loading) fetchRecords();
          }}
          contentContainerStyle={{ padding: 15 }}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#d5cf24" /> : null
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 15,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'space-between',
    borderColor: "grey",
    margin: 2,
    backgroundColor: "lightblue"
  },
  image: {
    width: 35,
    height: 45,
    marginRight: 5
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    width: "100%",
  },
  description: {
    fontSize: 14,
    marginTop: 10,
    width: "110%",
    textAlign: 'center'
  },
  touch: {
    backgroundColor: '#DDDDDD'
  }
});

export default Home;