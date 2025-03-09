import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import ConfettiCannon from "react-native-confetti-cannon";
import data from "../assets/data.json";

const GameScreen = ({ route, navigation }) => {
  const { category } = route.params || {}; // Get the selected category from params
  const { categories, categoryThemes } = data;

  // Provide a default theme if categoryThemes[category] is undefined
  const theme = categoryThemes[category] || {
    background: "bg-white", // Default background color
    text: "text-black",     // Default text color
    accent: "text-blue-500", // Default accent color
    button: "bg-gray-500",  // Default button style
  };

  const [words, setWords] = useState(categories[category] || []);
  const [originalWord, setOriginalWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [globalStreak, setGlobalStreak] = useState(0);
  const [message, setMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allWordsCompleted, setAllWordsCompleted] = useState(false);
  const confettiRef = useRef(null); // Initialize the ref

  const totalWords = words.length;

  // Shuffle word function
  const shuffleWord = (word) => {
    let shuffled = word;
    while (shuffled === word) {
      shuffled = word.split("").sort(() => Math.random() - 0.5).join("");
    }
    return shuffled;
  };

  // Initialize the game
  const initializeGame = () => {
    setCurrentIndex(0);
    setStreak(0);
    setScore(0);
    setMessage("");
    setAllWordsCompleted(false);
    const firstWord = words[0];
    if (firstWord) {
      setOriginalWord(firstWord);
      setScrambledWord(shuffleWord(firstWord));
      setGuess("");
    }
  };

  useEffect(() => {
    initializeGame(); // Initialize the game when the component mounts
  }, []);

  // Handle next word
  const handleNextWord = () => {
    if (currentIndex >= words.length - 1) {
      setMessage("You've completed this category! 🎉");
      setAllWordsCompleted(true);
      return;
    }
    const nextWord = words[currentIndex + 1];
    setOriginalWord(nextWord);
    setScrambledWord(shuffleWord(nextWord));
    setGuess("");
    setMessage("");
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Handle check answer
  const handleCheckAnswer = () => {
    if (allWordsCompleted) return; // Prevent further updates if completed

    if (guess.toLowerCase() === originalWord.toLowerCase()) {
      handleNextWord();
      setScore((prevScore) => prevScore + 1);
      setStreak((prevStreak) => prevStreak + 1);
      setMessage("Correct! 🎉");
    } else {
      setMessage(`Incorrect! The word was "${originalWord}".`);
      setStreak(0);
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    initializeGame();
  };

  // Handle going back to HomeScreen
  const handleGoBack = () => {
    navigation.navigate("Home"); // Navigate back to HomeScreen
  };

  return (
    <View style={tw`flex-1 justify-center items-center ${theme.background} p-6`}>
      <Text style={tw`text-2xl font-bold mb-4 ${theme.text}`}>
        Category: {category || "Unknown"}
      </Text>
      <Text style={tw`text-sm ${theme.accent} mb-4`}>
        Progress: {currentIndex + 1}/{totalWords}
      </Text>
      <Text style={tw`text-sm ${theme.text} mb-2`}>Score: {score}</Text>
      <Text style={tw`text-sm ${theme.text} mb-6`}>Streak (All-Time): {globalStreak}</Text>
      <Text style={tw`text-xl ${theme.accent} py-2 px-4 rounded-lg mb-6`}>
        {scrambledWord}
      </Text>
      <TextInput
        autoCapitalize="none"
        style={tw`border border-gray-300 w-full p-4 rounded-lg mb-4 bg-white`}
        placeholder="Enter your guess"
        value={guess}
        onChangeText={setGuess}
      />
      <TouchableOpacity
        style={tw`${theme.button} py-2 px-4 rounded-lg w-full mb-4`}
        onPress={handleCheckAnswer}
        activeOpacity={0.8}
      >
        <Text style={tw`text-white text-center py-3`}>Check Answer</Text>
      </TouchableOpacity>
      {message ? (
        <Text
          style={tw`text-lg text-center mb-4 ${
            message.startsWith("Correct") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </Text>
      ) : null}
      <TouchableOpacity
        style={tw`${theme.button} py-4 px-4 rounded-lg mt-2`}
        onPress={handleGoBack} // Navigate back to HomeScreen
        activeOpacity={0.8}
      >
        <Text style={tw`text-white text-center`}>Return to Categories</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRefresh} activeOpacity={0.8}>
        <LinearGradient
          colors={["#DC92EF", "#feb47b"]}
          start={[0, 0]}
          end={[1, 0]}
          style={tw`py-4 px-4 rounded-full mt-4 w-full`}
        >
          <Icon name="refresh" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Conditional rendering for ConfettiCannon */}
      {allWordsCompleted && (
        <ConfettiCannon
          ref={confettiRef} // Assign the ref
          count={50} // Ensure 'count' is defined
          origin={{ x: 200, y: 0 }}
          fadeOut={true}
          explosionSpeed={2000}
          fallSpeed={3500}
        />
      )}
    </View>
  );
};

export default GameScreen;
