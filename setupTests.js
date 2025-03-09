jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
    get: jest.fn(() => ({ width: 400, height: 800 })),
  }));
  
  jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => ({
    create: (styles) => styles, // Pass through styles as-is
  }));
  
  jest.mock('@react-navigation/native', () => {
    return {
      useNavigation: () => ({
        navigate: jest.fn(),
      }),
    };
  });
  
  // Mock FlatList to avoid parsing issues with its internal implementation
  jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native'); // Use actual react-native implementation
    return {
      ...RN,
      FlatList: ({ data, renderItem }) => (
        <div>
          {data.map((item, index) => renderItem({ item, index }))}
        </div>
      ),
    };
  });