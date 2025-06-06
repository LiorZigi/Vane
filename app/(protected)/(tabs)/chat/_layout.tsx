import { Stack } from "expo-router";
import isRTL from "@/logic/localization";
import { useTheme } from "@react-navigation/native";

export default function ChatLayout() {
  const { colors } = useTheme() as any;
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}>
      <Stack.Screen name="index" options={{ title: isRTL ? 'צ׳אט' : 'Chats', headerStyle: { backgroundColor: colors.topBackground }, headerShadowVisible: false }} />
    </Stack>
  );
} 