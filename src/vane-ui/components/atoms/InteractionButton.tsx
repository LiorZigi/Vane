import { GestureResponderEvent, Pressable, StyleSheet, View } from "react-native";
import VaneIcon from "../../../../assets/icons/VaneIcon";
import { useTheme } from "@react-navigation/native";
import { VnView, VnText } from "@vane-ui";

interface InteractionButtonProps {
  iconName: string;
  count?: number;
  onPress: (e: GestureResponderEvent) => void;
}

export default function InteractionButton({ iconName, count, onPress }: InteractionButtonProps) {
  const { colors } = useTheme() as any;
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <VaneIcon iconName={iconName} color={colors.text} size={25} />
      </Pressable>
      <VnText style={[styles.count, { color: colors.text }]}>
        {count}
      </VnText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  count: {
    alignSelf: 'center',
  },
});