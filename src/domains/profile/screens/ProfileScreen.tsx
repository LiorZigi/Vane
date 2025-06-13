import React, { FC, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
  Dimensions,
  Pressable,
} from 'react-native';
import VaneIcon from '../../../../assets/icons/VaneIcon';
import isRTL from '@/logic/localization';
import { Image } from 'expo-image';
import VnView from '@/vane-ui/components/organisms/VnView';
import { useNavigation, useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { useUserData } from '@/hooks/useUserData';
import { VnButton, VnText } from '@vane-ui';
import HorizontalLine from '../components/HorizontalLine';
import { UserPosts } from '@/domains/user/components/user-posts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEADER_HEIGHT = 200;
const AVATAR_SIZE = 100;

export interface ProfileScreenProps {
  isFollowing?: boolean;
  isOwnProfile?: boolean;
  onFollow?: (event: GestureResponderEvent) => void;
  onMessage?: (event: GestureResponderEvent) => void;
}

const ProfileScreen: FC<ProfileScreenProps> = ({
  isFollowing = false,
  isOwnProfile = false,
  onFollow = () => { },
  onMessage = () => { },
}) => {
  const { colors } = useTheme() as any;
  const router = useRouter();
  const navigation = useNavigation();
  const { data: userData, isLoading: userDataLoading, error: userDataError } = useUserData();

  useEffect(() => {
    isRTL
      ? navigation.setOptions({
        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable onPress={() => router.push('/profile/settings')}>
            <VaneIcon iconName="settings" />
          </Pressable>
        )
      })
      : navigation.setOptions({
        headerShadowVisible: false,
        headerRight: () => (
          <Pressable onPress={() => router.push('/profile/settings')}>
            <VaneIcon iconName="settings" />
          </Pressable>
        )
      });
  }, []);

  return (
    <VnView style={[styles.container]} scrollable>
      {/* Top curved background */}
      <View
        style={[
          styles.topBackground,
          { backgroundColor: '#30363e99' },
        ]}
      >
      </View>

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: userData?.avatarUrl }} contentFit="cover" cachePolicy="memory-disk" style={styles.avatar} />
      </View>

      {/* Name and Bio */}
      <View style={[styles.infoContainer]}>
        <Text style={[styles.name, { color: colors.text }]}>{userData?.displayName}</Text>
        <Text style={[styles.bio, { color: colors.text }]} numberOfLines={2}>
          {userData?.bio}
        </Text>

        {/* Action Buttons */}
        {!isOwnProfile && (
          <View style={styles.actionsRow}>
            <VnButton
              title={isFollowing ? 'Following' : 'Follow'}
              onPress={onFollow}
              style={{ minWidth: 100 }}
            />

            <VnButton
              title="Message"
              onPress={onMessage}
              color={colors.primary}
              style={{ minWidth: 100 }}
            />
          </View>
        )}

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {userData?.posts_count ?? 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {userData?.followers}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {userData?.following}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>Following</Text>
          </View>
        </View>
      </View>
      <HorizontalLine />
      <UserPosts userId={userData?.id ?? ''} />
    </VnView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBackground: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: -SCREEN_WIDTH / 2,
    borderBottomRightRadius: -SCREEN_WIDTH / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  avatarWrapper: {
    position: 'absolute',
    top: 200 - AVATAR_SIZE / 2,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    left: '50%',
    transform: [{ translateX: -AVATAR_SIZE / 2 }],
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    marginTop: 100 / 2 + 10,
    alignItems: 'center',
    paddingBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  followButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default ProfileScreen;
