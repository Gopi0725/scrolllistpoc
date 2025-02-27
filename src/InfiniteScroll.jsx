import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";

const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Example API

const InfiniteScroll = () => {
  const [data, setData] = useState([]); // Stores fetched records
  const [page, setPage] = useState(1); // Tracks page number
  const [loading, setLoading] = useState(false); // Loading state
  const limit = 10; // Number of records per request

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    if (loading) return; // Prevent duplicate fetch calls
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?_page=${page}&_limit=${limit}`);
      const result = await response.json();
      setData((prev) => [...prev, ...result]); // Append new records
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // Memoize rendering each item to prevent unnecessary re-renders
  const renderItem = useCallback(({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{item.title}</Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Infinite Scroll List</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={() => setPage((prev) => prev + 1)} // Load more data
        onEndReachedThreshold={0.5} // Trigger when halfway to the bottom
        ListFooterComponent={() => loading && <ActivityIndicator size="large" color="#007bff" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  item: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f8f9fa",
    borderRadius: 5,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

export default InfiniteScroll;
