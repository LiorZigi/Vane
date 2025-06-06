import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';

const window = Dimensions.get('screen');

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 18,
  },
  button: {
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Kanit-Bold',
    fontSize: 18,
  },
});

const HEADER_HEIGHT = Platform.OS === 'ios' ? 115 : (70 + (StatusBar.currentHeight || 0));

export { globalStyles, window, HEADER_HEIGHT };
