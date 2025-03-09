module.exports = {
  preset: 'react-native', // Use the react-native preset for Jest
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-vector-icons)/)', // Ignore all node_modules except react-native and related packages
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Include the setup file for additional mocks
};