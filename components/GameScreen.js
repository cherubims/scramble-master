import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import data from "../assets/data.json";
import ScreenLayout from "./ScreenLayout";
import ConfettiCannon from "react-native-confetti-cannon";

const GameScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const { categories, categoryThemes } = data;
  const theme = categoryThemes[category];
  const [words, setWords] = useState(categories[category]);
  const [originalWord, setOriginalWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0); // For this session
  const [globalStreak, setGlobalStreak] = useState(0); // Persistent streak
  const [message, setMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allWordsCompleted, setAllWordsCompleted] = useState(false); // New flag
  const confettiRef = useRef(null);

  const totalWords = words.length;

  useEffect(() => {
    loadGlobalStreak();
    handleNextWord(words);
  }, []);

  const loadGlobalStreak = async () => {
    try {
      const storedStreaks = await AsyncStorage.getItem("streaks");
      const parsedStreaks = storedStreaks ? JSON.parse(storedStreaks) : {};
      setGlobalStreak(parsedStreaks[category] || 0);
    } catch (error) {
      console.error("Error loading streaks:", error);
    }
  };

  const saveGlobalStreak = async (newStreak) => {
    try {
      const storedStreaks = await AsyncStorage.getItem("streaks");
      const parsedStreaks = storedStreaks ? JSON.parse(storedStreaks) : {};
      parsedStreaks[category] = newStreak;
      await AsyncStorage.setItem("streaks", JSON.stringify(parsedStreaks));
    } catch (error) {
      console.error("Error saving streaks:", error);
    }
  };

  const shuffleWord = (word) => {
    let shuffled = word;
    while (shuffled === word) {
      shuffled = word.split("").sort(() => Math.random() - 0.5).join("");
    }
    return shuffled;
  };

  const handleNextWord = (wordList) => {
    if (currentIndex >= wordList.length - 1) {
      setMessage("You've completed this category! 🎉");

      if (streak === totalWords) {
        setAllWordsCompleted(true); // Trigger confetti when all words are correct
      }
      return;
    }

    const nextWord = wordList[currentIndex + 1];
    setOriginalWord(nextWord);
    setScrambledWord(shuffleWord(nextWord));
    setGuess("");
    setMessage("");
  };

  const handleCheckAnswer = () => {
    if (guess.toLowerCase() === originalWord.toLowerCase()) {
      setScore((prevScore) => prevScore + 1);
      setStreak((prevStreak) => prevStreak + 1);
      setMessage("Correct! 🎉");

      if (streak === 0) {
        const newGlobalStreak = globalStreak + 1;
        setGlobalStreak(newGlobalStreak);
        saveGlobalStreak(newGlobalStreak);
      }
    } else {
      setMessage(`Incorrect! The word was "${originalWord}".`);
      setStreak(0); // Reset streak for this session
    }

    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      handleNextWord(words);
    }, 1500);
  };

  return (
    <ScreenLayout>
      <View style={tw`flex-1 justify-center items-center ${theme.background} p-6`}>
        <Text style={tw`text-2xl font-bold mb-4 ${theme.text}`}>
          Category: {category}
        </Text>
        <Text style={tw`text-sm ${theme.accent} mb-4`}>
          Progress: {currentIndex}/{totalWords}
        </Text>
        <Text style={tw`text-sm ${theme.text} mb-2`}>Score: {streak}</Text>
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
          style={tw`${theme.button} py-2 px-4 rounded-lg mt-6`}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={tw`text-white text-center`}>Change Category</Text>
        </TouchableOpacity>
        {allWordsCompleted && (
          <ConfettiCannon
            ref={confettiRef}
            count={150} // Adjust count for more confetti
            origin={{ x: 200, y: 0 }} // Adjust origin for better visual effect
            fadeOut={true}
            explosionSpeed={2000} // Initial burst speed
            fallSpeed={3500} // Fall speed for realism
          />
        )}
      </View>
    </ScreenLayout>
  );
};

export default GameScreen;