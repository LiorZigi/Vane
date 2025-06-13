import * as Haptics from 'expo-haptics';
import { ScrollView, View, StyleSheet, Text, Pressable } from 'react-native';
import { postCollection } from '@/mocks/post/postCollection';
import { Post } from '@/models/types';
import { useUserData } from '@/hooks/useUserData';
import { Image } from 'expo-image';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import PostCard from '../components/PostCard';
import VnView from '@/vane-ui/components/organisms/VnView';
import isRTL from '@/logic/localization';
import HorizontalLine from '@/domains/profile/components/HorizontalLine';
import VaneIcon from '../../../../assets/icons/VaneIcon';
import { usePosts } from '@/hooks/usePosts';

export default function FeedScreen() {
  const { colors } = useTheme() as any;
  const router = useRouter();
  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useUserData();
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = usePosts();

  const createPost = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    router.push({
      pathname: '/feed/new-post',
      params: { avatarUri: userData?.avatarUrl },
    });
  };

  return (
    <VnView scrollable header blurEffect style={[styles.container]}>
      {/* <View style={styles.header}> */}
      <View style={styles.userInfo}>
        <Image
          source={{ uri: userData?.avatarUrl }}
          contentFit="cover"
          cachePolicy="memory-disk"
          priority="high"
          transition={250}
          style={styles.avatar}
        />
        <View style={{ gap: 10 }}>
          <Text style={[styles.username, { color: colors.text }]}>
            {userData?.displayName}
          </Text>
          <Pressable onPress={createPost}>
            <Text
              style={[
                {
                  color: colors.textInfo,
                  fontSize: 14,
                  textAlign: isRTL ? 'left' : 'right',
                },
              ]}
            >
              {isRTL ? 'מה חדש?' : "What's new?"}
            </Text>
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: isRTL ? 'flex-start' : 'flex-end',
            }}
          >
            {/* <VaneIcon iconName="images" color={colors.text} size={24} /> */}
            <VaneIcon iconName="camera" color={colors.text} size={24} />
            <VaneIcon iconName="poll" color={colors.text} size={25} />
          </View>
        </View>
      </View>
      {/* </View> */}
      <HorizontalLine />
      <View style={styles.feedContainer}>
        {posts?.pages.map((page: Post[]) =>
          page.map((post: Post) => (
            <Pressable
              key={post.id}
              onPress={() =>
                router.push({
                  pathname: '/[postId]',
                  params: { postId: post.id },
                })
              }
            >
              <PostCard
                postId={post.id}
                isLiked={post.liked_by_me || false}
                content={post.content}
                author={post.author_display_name}
                authorId={post.author_id}
                authorAvatarUrl={post.author_avatar_url}
                color={colors.text}
                likesCount={post.likes_count || 0}
                commentsCount={post.comments_count || 0}
                repostCount={post.repost_count || 0}
                createdAt={post.created_at}
                mediaUrls={post.media_urls}
                onPress={() => { }}
              />
            </Pressable>
          ))
        )}
      </View>
    </VnView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // alignItems: 'center',
    // padding: 20,
  },
  feedContainer: {
    // margin: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    gap: 15,
    padding: 16,
  },
});
