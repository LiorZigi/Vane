import { useColorScheme as useColorSchemeNative } from 'react-native';

export function useColorScheme() {
  return useColorSchemeNative();
}

export function useClientOnlyValue<T>(value: T, fallbackValue: T) {
  const isClient = typeof window !== 'undefined';
  return isClient ? value : fallbackValue;
}
