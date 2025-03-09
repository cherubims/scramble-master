import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import data from "../assets/data.json";

// Define the CategoryScreen component
const CategoryScreen = ({ navigation }) => {
  // Extract all category names from the 'categories' object in data.json
  const categories = Object.keys(data.categories);

  // Define a function to render each category as a button in the list
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryButton} // Apply styling for the category button
      onPress={() => navigation.navigate("Game", { category: item })} // Navigate to GameScreen with the selected category as a parameter
      activeOpacity={0.8}
    >
      <Text style={styles.categoryText}>{item}</Text> {/* Display the category name */}
    </TouchableOpacity>
  );

  // Render the CategoryScreen UI
  return (
    <View style={styles.container}>
      {/* Title text prompting the user to select a category */}
      <Text style={styles.title}>Select a Category</Text>

      {/* FlatList to display all categories dynamically */}
      <FlatList
        data={categories} // Extracted category names as the data source
        keyExtractor={(item) => item} // Category name as the unique key for each item
        renderItem={renderCategoryItem} // Render each category using the renderCategoryItem function
        contentContainerStyle={styles.listContainer} // Apply styling to the list container
      />
    </View>
  );
};

// Define styles for the CategoryScreen using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f5f5f5", 
    justifyContent: "center", 
    alignItems: "center", 
  },
  title: {
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
  },
  categoryButton: {
    backgroundColor: "#007bff", 
    borderRadius: 5, 
    padding: 15, 
    width: "100%", 
    marginBottom: 10, 
  },
  categoryText: {
    color: "#fff", 
    textAlign: "center", 
    fontSize: 18, 
    fontWeight: "bold",
  },
  listContainer: {
    width: "100%", // Ensure the list takes up the full width of the screen
  },
});


export default CategoryScreen;


