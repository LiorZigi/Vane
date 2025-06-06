import isRTL from "@/logic/localization";
import { Stack } from "expo-router";
import { useTheme } from "@react-navigation/native";


export default function ProfileLayout() {
  const { colors } = useTheme() as any;
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: colors.topBackground }, headerShadowVisible: false, animation: isRTL ? 'slide_from_left' : 'slide_from_right' }}>
      <Stack.Screen name="index" options={{ title: isRTL ? 'פרופיל' : 'Profile' }} />
      <Stack.Screen name="settings" options={{ title: isRTL ? 'הגדרות' : 'Settings' }} />
    </Stack>
  );
}