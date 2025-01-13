import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import data from '../assets/data.json'

const CategoryScreen = ({ category }) => {
  const [words, setWords] = useState(getRandomWords(category));

  // Function to fetch random words
  const getRandomWords = (category) => {
    const allWords = data.categories[category];
    const shuffled = allWords.sort(() => Math.random() - 0.5); // Shuffle the words
    return shuffled.slice(0, 10); // Get the first 10 words
  };

  // Refresh the list of words
  const refreshWords = () => {
    setWords(getRandomWords(category));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.toUpperCase()}</Text>
      <FlatList
        data={words}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.word}>{item}</Text>}
      />
      <Button title="Refresh" onPress={refreshWords} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  word: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default CategoryScreen;