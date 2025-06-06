import {
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#03A9F4',
    success: '#2ecc71',
    text: '#0a0a0a',
    textInfo: '#808080',
    buttonText: '#eff3f4',
    header: '#f5f6fa',
    modalHeader: '#f5f6fa',
    cardTop: '#ffffff',
    cardBottom: '#ffffff',
    topBackground: '#f5f6fa',
    bottomBackground: '#f5f6fa',
    bottomTabs: '#f5f6fa',
    border: '#343435',
    inputBackground: '#e0e9f8',
    inputBorder: '#343435',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#03A9F4',
    success: '#2ecc71',
    text: '#f5f6fc',
    buttonText: '#0f1419',
    textInfo: 'gray',
    header: '#0a0a0a',
    modalHeader: '#0a0a0a',
    cardTop: '#1A1B1F',
    cardBottom: '#1A1B1F',
    topBackground: '#0a0a0a',
    bottomBackground: '#0a0a0a',
    bottomTabs: '#0a0a0a',
    border: '#343435',
    inputBackground: '#2b2d31',
    inputBorder: '#343435',
  },
};
