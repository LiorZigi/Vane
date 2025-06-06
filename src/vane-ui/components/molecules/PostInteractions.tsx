import * as Haptics from "expo-haptics";
import { GestureResponderEvent, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { VnView } from "@vane-ui";
import { useToggleLike } from "@/hooks/useToggleLike";
import { useState } from "react";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";
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
  const [localCount, setLocalCount] = useState<number>(likesCount)
  const [localLiked, setLocalLiked] = useState<boolean>(isLiked)
  const { mutate, isPending } = useToggleLike();

  const handleLike = async (e: GestureResponderEvent) => {
    setLocalLiked(!localLiked)
    setLocalCount(localLiked ? localCount - 1 : localCount + 1)

    e?.stopPropagation();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    debounceLike(localLiked)
  }

  const debounceLike = useDebounceCallback((currentLiked: boolean) => {
    mutate({ postId, isLiked: currentLiked }, {
      onError: () => {
        setLocalLiked(!localLiked)
        setLocalCount(localLiked ? localCount - 1 : localCount + 1)
      }
    })
  }, 300)

  return (
    <View
      style={[styles.container, style]}
    >
      <InteractionButton iconName="comment" count={commentsCount} onPress={() => { }} />
      <InteractionButton iconName="repost" count={repostCount} onPress={() => { }} />
      <InteractionButton iconName="heart" count={localCount} onPress={handleLike} />
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
