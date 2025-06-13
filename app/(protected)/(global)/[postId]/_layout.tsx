import isRTL from "@/logic/localization";
import { Stack } from "expo-router";

export default function PostLayout() {
  return (
    <Stack screenOptions={{ animation: isRTL ? 'slide_from_left' : 'slide_from_right' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[userId]" />
      <Stack.Screen name="[commentId]" />
    </Stack>
  );
}