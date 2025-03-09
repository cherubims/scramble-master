const RN = jest.requireActual('react-native');

export default {
  ...RN,
  FlatList: ({ data, renderItem }) => (
    <div>
      {data.map((item, index) => renderItem({ item, index }))}
    </div>
  ),
  StyleSheet: {
    create: (styles) => styles, // Pass through styles as-is
  },
};