import isRTL from "@/logic/localization";
import { Stack } from "expo-router";
import { useTheme } from "@react-navigation/native";


export default function FeedLayout() {
  const { colors } = useTheme() as any;
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' }, animation: isRTL ? 'slide_from_left' : 'slide_from_right' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="new-post" options={{ headerShown: true, presentation: 'modal', headerTitle: isRTL ? 'פוסט חדש' : 'New Post', headerStyle: { backgroundColor: colors.header } }} />
      <Stack.Screen name="[postId]" />
    </Stack>
  );
}