import { Stack } from "expo-router";
import { useTheme } from "@react-navigation/native";

export default function PublicLayout() {
  const { colors } = useTheme() as any;
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{
        headerTitle: '',
        headerStyle: {
          backgroundColor: colors.topBackground,
        },
        headerShadowVisible: false,
      }} />
      <Stack.Screen name="login" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  )
}