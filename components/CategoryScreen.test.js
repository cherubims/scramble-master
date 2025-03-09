import React from 'react';
import { render } from '@testing-library/react-native';
import CategoryScreen from './CategoryScreen';

describe('CategoryScreen', () => {
  it('renders the title correctly', () => {
    const mockNavigate = jest.fn();
    const mockNavigation = { navigate: mockNavigate };

    const { getByText } = render(<CategoryScreen navigation={mockNavigation} />);
    expect(getByText('Select a Category')).toBeTruthy(); // Verify the title is rendered
  });

  it('displays category names', () => {
    const mockNavigate = jest.fn();
    const mockNavigation = { navigate: mockNavigate };

    const { queryAllByText } = render(<CategoryScreen navigation={mockNavigation} />);
    const data = require('../assets/data.json');

    // Verify each category name is displayed
    Object.keys(data.categories).forEach((category) => {
      expect(queryAllByText(category).length).toBeGreaterThan(0);
    });
  });
});