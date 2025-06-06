// selectors/themeSelectors.js
import { createSelector } from 'reselect';
import { RootState } from '../store';
import { darkTheme } from '@/constants/colors';
import { lightTheme } from '@/constants/colors';

// Basic selector to get the theme mode
export const selectThemeMode = (state: RootState) => state.theme.mode;

// Selector to get the theme object based on the current mode
export const selectTheme = createSelector(
  [selectThemeMode],
  (mode) => (mode === 'dark' ? darkTheme : lightTheme)
);
