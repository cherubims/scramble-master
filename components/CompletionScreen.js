import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const CompletionScreen = ({ route, navigation }) => {
  const { score } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Congratulations!</Text>
      <Text style={styles.summary}>You completed the game!</Text>
      <Text style={styles.score}>Your Score: {score}</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  summary: {
    fontSize: 18,
    marginBottom: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default CompletionScreen;
