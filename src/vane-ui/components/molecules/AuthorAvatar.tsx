import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

interface AuthorAvatarProps {
  color: string;
  authorAvatarUrl: string;
  userId: string;
}

export default function AuthorAvatar({ color, authorAvatarUrl, userId }: AuthorAvatarProps) {

  const navigateToProfile = () => {
    router.push({ pathname: '/[userId]', params: { userId: userId } });
  }

  return (
    <Pressable style={[styles.container, { backgroundColor: color }]} onPress={navigateToProfile}>
      <Image source={{ uri: authorAvatarUrl }} style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
