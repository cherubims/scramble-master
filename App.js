import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { Animated, StyleSheet } from "react-native";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./components/HomeScreen";
import CategoryScreen from "./components/CategoryScreen";
import GameScreen from "./components/GameScreen";

const Stack = createStackNavigator();

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [homeFadeAnim] = useState(new Animated.Value(0)); // Animation for HomeScreen fade-in

  const handleSplashFinish = () => {
    setIsSplashVisible(false);

    // Start HomeScreen fade-in animation
    Animated.timing(homeFadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  return (
    <NavigationContainer>
      {isSplashVisible ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <Animated.View style={[styles.animatedContainer, { opacity: homeFadeAnim }]}>
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
              name="Category"
              component={CategoryScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Game"
              component={GameScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </Animated.View>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    backgroundColor: "#FFF", 
  },
});

export default App;
