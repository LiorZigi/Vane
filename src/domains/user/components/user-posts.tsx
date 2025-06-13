import { VnView } from '@vane-ui';
import { useUserPosts } from '@/hooks/useUserPosts';
import PostCard from '@/domains/feed/components/PostCard';
import { useTheme } from '@react-navigation/native';
import { Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export const UserPosts = ({ userId }: { userId: string }) => {
  const colors = useTheme() as any;
  const { data, isLoading, error } = useUserPosts(userId);

  const navigateToPost = (postId: string) => {
    router.push({ pathname: '/feed/[postId]', params: { postId: postId } });
  };

  return (
    <VnView style={styles.container}>
      {data?.pages.map((page) =>
        page.map((post) => (
          <Pressable key={post.id} onPress={() => navigateToPost(post.id)}>
            <PostCard
              key={post.id}
              postId={post.id}
              content={post.content}
              author={post.author_display_name}
              authorAvatarUrl={post.author_avatar_url}
              createdAt={post.created_at}
              likesCount={post.likes_count}
              commentsCount={post.comments_count}
              repostCount={post.repost_count}
              isLiked={post.liked_by_me}
              color={colors.primary}
              authorId={post.author_id}
            />
          </Pressable>
        ))
      )}
    </VnView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
