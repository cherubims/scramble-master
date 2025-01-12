import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import SplashScreen from "./components/SplashScreen"; // Ensure correct path
import HomeScreen from "./components/HomeScreen";
import GameScreen from "./components/GameScreen";

const Stack = createStackNavigator();

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  // Hide splash screen after it finishes
  const handleSplashFinish = () => {
    setIsSplashVisible(false);
  };

  return (
    <NavigationContainer>
      {isSplashVisible ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <Stack.Navigator
          screenOptions={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
