import React, { useEffect, useState } from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";

const SplashScreen = ({ onFinish }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // For splash screen fade-in and fade-out
  const fullText = "Scramble Master"; // The full text to spell out
  const typingSpeed = 200; // Typing speed in milliseconds per letter
  const letterFades = fullText.split("").map(() => new Animated.Value(0)); // Fade values for each letter

  useEffect(() => {
    // Fade in the splash screen
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Start the letter-by-letter fade-in animation
    fullText.split("").forEach((_, index) => {
      setTimeout(() => {
        Animated.timing(letterFades[index], {
          toValue: 1,
          duration: 500, // Visible fade-in duration for each letter
          useNativeDriver: true,
        }).start();
      }, typingSpeed * index);
    });

    // Fade out the splash screen after the text finishes animating
    const totalAnimationTime = typingSpeed * fullText.length + 1000; // Account for animation + 1-second pause
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => onFinish()); // Navigate to the next screen after fade-out
    }, totalAnimationTime);
  }, [fadeAnim, letterFades, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.textContainer}>
        {fullText.split("").map((char, index) => (
          <Animated.Text
            key={index}
            style={[styles.typingText, { opacity: letterFades[index] }]}
          >
            {char}
          </Animated.Text>
        ))}
      </View>
      <Image
        source={require("../assets/splash-screen.jpeg")}
        style={styles.logo}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDD5F3",
  },
  textContainer: {
    flexDirection: "row", // Ensures letters appear side by side
    marginBottom: 2, // Adds space between the text and the image
  },
  typingText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  logo: {
    width: "100%",
    height: "70%", // Adjust size as needed
    resizeMode: "contain",
  },
});

export default SplashScreen;
