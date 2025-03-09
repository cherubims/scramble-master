import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import data from "../assets/data.json";
import ScreenLayout from "./ScreenLayout";

const HomeScreen = ({ navigation }) => {
  const { categories } = data;
  const [streaks, setStreaks] = useState({});

  // Load streaks from AsyncStorage
  useEffect(() => {
    loadStreaks();
  }, []);

  const loadStreaks = async () => {
    try {
      const storedStreaks = await AsyncStorage.getItem("streaks");
      const parsedStreaks = storedStreaks ? JSON.parse(storedStreaks) : {};
      setStreaks(parsedStreaks);
    } catch (error) {
      console.error("Error loading streaks:", error);
    }
  };

  return (
    <ScreenLayout>
      <ScrollView contentContainerStyle={tw`flex-grow items-center bg-purple-50 p-5`}>
        {/* Avatar Section */}
        <View style={tw`items-center mt-12 mb-4`}>
          <View style={tw`w-24 h-24 bg-white rounded-full border-4 border-purple-400 mb-2`}>
            <Image
              source={require("../assets/avatar.jpeg")}
              style={tw`w-full h-full rounded-full`}
            />
          </View>
          <Text style={tw`font-semibold text-purple-800 mb-2`}>
            Hello, Scramble Master!
          </Text>
        </View>

        {/* Game Title */}
        <Text style={tw`text-2xl font-bold mb-4 text-purple-800`}>
          Word Scramble Game
        </Text>
        <Text style={tw`text-lg mb-4 text-purple-600`}>
          Select a Category:
        </Text>

        {/* Category Buttons with Streaks */}
        {Object.keys(categories).map((cat) => (
          <View key={cat} style={tw`flex-row items-center w-5/6 mb-4`}>
            <TouchableOpacity
              style={tw`bg-purple-500 py-4 px-4 flex-1 rounded-lg`}
              onPress={() => navigation.navigate("Game", { category: cat })} // Pass the category to GameScreen
              activeOpacity={0.8}
            >
              <Text style={tw`text-white font-bold text-xs text-center`}>{cat}</Text>
            </TouchableOpacity>
            <Text style={tw`ml-2 text-purple-800 text-xs`}>
              {streaks[cat] || 0} 🔥
            </Text>
          </View>
        ))}
      </ScrollView>
    </ScreenLayout>
  );
};

export default HomeScreen;

