import React, { useEffect, useState } from "react";
import { View, Text, Image, Animated, StyleSheet, Dimensions } from "react-native";
import * as Font from "expo-font";

const { width, height } = Dimensions.get("window");

const SplashScreen = ({ onFinish }) => {
  const [fadeAnim] = useState(new Animated.Value(1)); // Fade for the splash screen
  const fullText = "Scramble Master"; // Splash screen text
  const typingSpeed = 200; // Typing speed per letter
  const letterAnimations = fullText.split("").map(() => ({
    fade: new Animated.Value(0), // Individual fade for each letter
    bounce: new Animated.Value(0), // Individual bounce for each letter
  }));
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Load custom fonts
    const loadFonts = async () => {
      await Font.loadAsync({
        "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    };
    loadFonts();

    // Start letter animations (fade-in + bounce)
    fullText.split("").forEach((_, index) => {
      setTimeout(() => {
        Animated.sequence([
          Animated.parallel([
            Animated.timing(letterAnimations[index].fade, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.spring(letterAnimations[index].bounce, {
              toValue: 2.0,
              friction: 7,
              tension: 90,
              useNativeDriver: true,
            }),
          ]),
          Animated.spring(letterAnimations[index].bounce, {
            toValue: 1,
            friction: 20,
            tension: 40,
            useNativeDriver: true,
          }),
        ]).start();
      }, typingSpeed * index);
    });

    // Fade out the splash screen after the animation
    const totalAnimationTime = typingSpeed * fullText.length + 1500;
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => onFinish()); // Navigate to HomeScreen
    }, totalAnimationTime);
  }, [fadeAnim, letterAnimations, onFinish]);

  if (!fontsLoaded) {
    return null; // Wait for fonts to load
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.textContainer}>
        {fullText.split("").map((char, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.typingText,
              {
                opacity: letterAnimations[index].fade,
                transform: [{ scale: letterAnimations[index].bounce }],
              },
            ]}
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
    flexDirection: "row",
    marginBottom: height * 0.05,
    justifyContent: "center",
  },
  typingText: {
    fontSize: 36,
    fontFamily: "Quicksand-SemiBold",
    color: "#3F51B5",
  },
  logo: {
    width: width,
    height: height * 0.4,
    resizeMode: "contain",
  },
});

export default SplashScreen;