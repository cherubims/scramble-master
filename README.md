# Word Scramble Game
Welcome to the **Word Scramble Game**! This is a fun and interactive game where players need to unscramble words from various categories to score points and maintain streaks. The game comes with a confetti effect when the user answers correctly, making the experience more enjoyable!


## Requirements
Before you start, make sure you have the following installed on your system:
- **Node.js**: [Download Node.js](https://nodejs.org/)

- **Expo CLI**: This is used to run React Native apps.

Install it globally by running:
```bash
npm install -g expo-cli
```
## Installation
Follow these steps to get the game running locally:
- **Clone the Repository**
```bash
git clone https://github.com/cherubims/scramble-master
cd word-scramble-game
```
- **Install dependencies**
```bash
npm install
```
- **Run the Game**
```bash
npx expo start
```
This will open a new page in your browser where you can scan the QR code using the Expo Go app (available on iOS and Android) to run the app on your phone. Alternatively, you can use an Android or iOS emulator.

## How to Play

- **Choose a Category:** Once the game starts, you’ll be prompted with a category of words. You can select the category that interests you the most.
- **Guess the Word:** The app will display a scrambled version of a word from the selected category. Your goal is to type in the correct word.
- **Answering:** After typing your guess, click the “Check Answer” button. If you're correct:

>> - Your score will increase.
>> - Your streak will increase for this session.
>> - Confetti will appear to celebrate your success.
>> - If your answer is incorrect:
>> - The correct word will be revealed.
>> - Your streak for the session will reset.

- **Progress**: The game keeps track of your progress and displays the number of words you've completed in the category. The game ends when you complete all words in the selected category.
- **Global Streak:** Your streak is saved across sessions. Your all-time streak is displayed, which increases as you continue to get answers correct across different sessions.
- **Confetti Celebration:** After a correct answer, confetti will burst on the screen for a festive touch!

## Game Features

 1. Category Selection: Multiple categories are available for playing.
Word Scrambling: Words are scrambled before being displayed to the user.
2. Streaks: You have a session-based streak and an all-time streak, which gets saved.
3. Confetti Celebration: When you get an answer correct, a confetti animation appears to celebrate your win.
4. Progress Tracking: Shows how far you are in the current game.

## Technologies Used
- React Native: Framework for building native mobile apps using JavaScript and React.
- Expo: Open-source platform for making universal React applications.
- React Navigation: Used for managing navigation between different screens.
- AsyncStorage: To persist the global streak data.
- Confetti Cannon: Library used to display confetti when answering correctly.
- Tailwind CSS (twrnc): Utility-first CSS framework for React Native styling.

## License
This project is licensed under the MIT License - see the LICENSE file for details.