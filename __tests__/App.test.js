import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/ract-native';
import GameScreen from './components/GameScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('react-native-confetti-cannon', () => 'ConfettiCannon'); // Mock Confetti Cannon

describe('GameScreen', () => {
  const mockData = {
    categories: {
      "(CM-3060) NATURAL LANGUAGE PROCESSING": [
        "token", "lemma", "syntax", "semantics", "entity", "vector", "model", "text",
      ],
    },
    categoryThemes: {
      "(CM-3060) NATURAL LANGUAGE PROCESSING": {
        background: "bg-purple-100",
        button: "bg-purple-500",
        text: "text-purple-800",
        accent: "text-purple-600",
      },
    },
  };

  const mockRoute = { params: { category: "(CM-3060) NATURAL LANGUAGE PROCESSING" } };
  const mockNavigation = { goBack: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify({ "(CM-3060) NATURAL LANGUAGE PROCESSING": 2 }));
  });

  it('renders correctly and initializes the game with the selected category', async () => {
    const { getByText, getByPlaceholderText } = render(
      <GameScreen route={mockRoute} navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText('Category: (CM-3060) NATURAL LANGUAGE PROCESSING')).toBeTruthy();
      expect(getByText('Progress: 0/7')).toBeTruthy(); // 7 words in the category
      expect(getByPlaceholderText('Enter your guess')).toBeTruthy();
    });
  });

  it('updates score and streak on correct guess', async () => {
    const { getByText, getByPlaceholderText } = render(
      <GameScreen route={mockRoute} navigation={mockNavigation} />
    );

    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText('Enter your guess'), 'token'); // First word
      fireEvent.press(getByText('Check Answer'));
    });

    await waitFor(() => {
      expect(getByText('Correct! 🎉')).toBeTruthy();
      expect(getByText('Score: 1')).toBeTruthy();
      expect(getByText('Streak (All-Time): 3')).toBeTruthy(); // Assuming previous streak was 2
    });
  });

  it('handles incorrect guesses', async () => {
    const { getByText, getByPlaceholderText } = render(
      <GameScreen route={mockRoute} navigation={mockNavigation} />
    );

    await waitFor(() => {
      fireEvent.changeText(getByPlaceholderText('Enter your guess'), 'wronganswer');
      fireEvent.press(getByText('Check Answer'));
    });

    await waitFor(() => {
      expect(getByText('Incorrect!')).toBeTruthy();
      expect(getByText('Streak (All-Time): 2')).toBeTruthy(); // Streak resets
    });
  });

  it('applies the correct theme for the selected category', async () => {
    const { getByTestId } = render(
      <GameScreen route={mockRoute} navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByTestId('background').props.style).toContain('bg-purple-100');
      expect(getByTestId('check-answer-button').props.style).toContain('bg-purple-500');
    });
  });

  it('navigates back to category selection', async () => {
    const { getByText } = render(
      <GameScreen route={mockRoute} navigation={mockNavigation} />
    );

    fireEvent.press(getByText('Change Category'));
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
