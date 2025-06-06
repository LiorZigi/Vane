import isRTL from "@/logic/localization";
import { Stack } from "expo-router";
import { useTheme } from "@react-navigation/native";

export default function NotificationsLayout() {
  const { colors } = useTheme() as any;
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}>
      <Stack.Screen name="index" options={{ title: isRTL ? 'התראות' : 'Notifications', headerStyle: { backgroundColor: colors.topBackground }, headerShadowVisible: false }} />
    </Stack>
  );
} 