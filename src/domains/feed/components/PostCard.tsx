import {
  View,
  StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';
import AuthorDetails from '../../../vane-ui/components/molecules/AuthorDetails';
import PostContent from '@/vane-ui/components/molecules/PostContent';
import AuthorAvatar from '@/vane-ui/components/molecules/AuthorAvatar';
import PostInteractions from '@/vane-ui/components/molecules/PostInteractions';
import HorizontalLine from '@/domains/profile/components/HorizontalLine';

interface PostCardProps {
  postId: string;
  content: string;
  author: string;
  authorId: string;
  authorAvatarUrl: string;
  color: string;
  likesCount: number;
  commentsCount: number;
  repostCount: number;
  createdAt: string;
  isLiked: boolean;
  mediaUrls?: string[];
  onPress?: () => void;
}

export default function PostCard({
  postId,
  content,
  author,
  authorId,
  authorAvatarUrl,
  color,
  likesCount,
  commentsCount,
  repostCount,
  mediaUrls,
  createdAt,
  isLiked,
}: PostCardProps) {
  return (
    <Animated.View
      style={[styles.container]}
    >
      <View style={styles.authorContainer}>
        <AuthorAvatar color={color} authorAvatarUrl={authorAvatarUrl} userId={authorId} />
        <View style={{ alignItems: 'flex-start', gap: 10, flex: 1 }}>
          <AuthorDetails author={author} createdAt={createdAt} />
          <PostContent content={content} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <PostInteractions
          postId={postId}
          likesCount={likesCount}
          commentsCount={commentsCount}
          repostCount={repostCount}
          isLiked={isLiked}
        />
      </View>
      <HorizontalLine />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    borderRadius: 10,
    gap: 15,
    backgroundColor: 'transparent',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    gap: 10,
  },
});
