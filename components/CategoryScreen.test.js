
import React from 'react';
import renderer from 'react-test-renderer'; // Use react-test-renderer for snapshots
import CategoryScreen from './CategoryScreen';

describe('CategoryScreen', () => {
  const mockNavigate = jest.fn();
  const mockNavigation = { navigate: mockNavigate };

  it('matches the snapshot', () => {
    // Render the CategoryScreen component with mock navigation
    const tree = renderer.create(<CategoryScreen navigation={mockNavigation} />).toJSON();

    // Expect the rendered output to match the snapshot
    expect(tree).toMatchSnapshot();
  });
});

