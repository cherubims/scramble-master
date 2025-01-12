import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";

const SplashScreen = ({ onFinish }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity: 0

  useEffect(() => {
    // Start the animation
    Animated.timing(fadeAnim, {
      toValue: 1, // End opacity: 1
      duration: 2000, // 2 seconds
      useNativeDriver: true,
    }).start(() => {
      // After animation ends, trigger onFinish
      setTimeout(onFinish, 1500); // Wait an additional 1.5 seconds before navigating
    });
  }, [fadeAnim, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/splash-screen.jpeg")}
        style={[styles.logo, { opacity: fadeAnim }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDD5F3",
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: "contain",
  },
});

export default SplashScreen;
