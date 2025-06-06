import { I18nManager, Platform } from 'react-native';
import * as Localization from 'expo-localization';

// List of RTL languages codes (this list can be extended as needed)
const rtlLanguages = ['ar', 'he', 'fa', 'ur'];

// Extract language code from locale (e.g., "en" from "en-US")
const languageCode = Localization.getLocales()[0].languageTag.split('-')[0];

const isRTL = rtlLanguages.includes(languageCode);

// Force layout direction (note: changes may require a reload/restart of the app)
if (I18nManager.isRTL !== isRTL) {
  I18nManager.forceRTL(isRTL);
  // if (Platform.OS === 'android') {
  //   // On Android, you might want to trigger a reload for changes to take effect
  //   Expo.Updates.reloadFromCache();
  // }
}

export default isRTL;
