import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import useHeaderLayout from "@/hooks/useHeaderLayout";
import { AuthorAvatar, PostInteractions, VnText, VnView } from "@vane-ui";
import { useLocalSearchParams } from "expo-router";
import { usePost } from "@/hooks/usePost";
import HorizontalLine from "@/domains/profile/components/HorizontalLine";

export default function PostScreen() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const { data: post, isLoading, error } = usePost(postId);
  const { colors } = useTheme() as any;
  useHeaderLayout();

  return (
    <VnView gradient scrollable contentContainerStyle={{ gap: 16, flex: 1 }}>
      <VnView style={styles.authorContainer}>
        <AuthorAvatar authorAvatarUrl={post?.author_avatar_url} color={colors.text} />
        <VnView style={styles.authorNameContainer}>
          <VnText style={styles.authorName}>{post?.author_display_name}</VnText>
          <VnText style={styles.authorUsername}>@{post?.author_username}</VnText>
        </VnView>
      </VnView>
      <VnView style={styles.postContainer}>
        <VnText style={styles.postContent}>{post?.content}</VnText>
      </VnView>
      <VnView style={styles.postDateContainer}>
        <VnText style={[styles.postDate, { color: colors.textInfo }]}>{new Date(post?.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</VnText>
      </VnView>
      <PostInteractions
        style={styles.postInteractionsContainer}
        postId={postId}
        likesCount={post?.likes_count}
        commentsCount={post?.comments_count}
        repostCount={post?.repost_count}
        isLiked={post?.liked_by_me}
      />
      <HorizontalLine />
    </VnView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  authorContainer: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
  },
  authorNameContainer: {
    justifyContent: 'center',
  },
  authorUsername: {
    fontSize: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postInteractionsContainer: {
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  postContainer: {
    paddingBottom: 16,
  },
  postContent: {
    fontSize: 16,
    paddingHorizontal: 16,
  },
  postDateContainer: {
    paddingHorizontal: 16,
  },
  postDate: {
    fontSize: 12,
  },
});