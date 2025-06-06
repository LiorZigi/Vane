import { darkTheme, lightTheme } from '@/constants/colors';
import { store } from '@/store/store';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VnView from '@/vane-ui/components/organisms/VnView';
import isRTL from '@/logic/localization';
import { usePostSubscriptions } from '@/hooks/usePostsSubscriptions';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={colorScheme === 'dark' ? darkTheme : lightTheme}>
          <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' }, animation: isRTL ? 'slide_from_left' : 'slide_from_right' }}>
              <Stack.Screen name="(public)" />
              <Stack.Screen name="(protected)" />
            </Stack>
          </QueryClientProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
