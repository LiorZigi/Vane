import { useTheme } from "@react-navigation/native";
import VnText from "../atoms/VnText";
import { StyleSheet } from "react-native";

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  const { colors } = useTheme() as any;
  return (
    <VnText style={[styles.content, { color: colors.text }]}>{content}</VnText>
  )
}

const styles = StyleSheet.create({
  content: {
    fontSize: 16,
  },
});