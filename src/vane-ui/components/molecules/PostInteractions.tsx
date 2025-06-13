import * as Haptics from "expo-haptics";
import { GestureResponderEvent, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { VnView } from "@vane-ui";
import { useToggleLike } from "@/hooks/useToggleLike";
import InteractionButton from "../atoms/InteractionButton";

interface PostInteractionsProps {
  postId: string;
  likesCount: number;
  commentsCount: number;
  repostCount: number;
  isLiked: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function PostInteractions({ postId, likesCount, commentsCount, repostCount, isLiked, style }: PostInteractionsProps) {
  const { mutate, isPending } = useToggleLike();

  const handleLike = async (e: GestureResponderEvent) => {
    e?.stopPropagation();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Use the props directly - no local state needed
    // useToggleLike will handle all optimistic updates
    mutate({ postId, isLiked: isLiked || false });
  }

  return (
    <View
      style={[styles.container, style]}
    >
      <InteractionButton iconName="comment" count={commentsCount || 0} onPress={() => { }} />
      <InteractionButton iconName="repost" count={repostCount || 0} onPress={() => { }} />
      <InteractionButton iconName="heart" count={likesCount || 0} onPress={handleLike} />
      <InteractionButton iconName="send" onPress={() => { }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 60,
    // flex: 1,
    // justifyContent: 'space-between',
  },
});
