import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { VnView } from '@vane-ui';

interface AuthorAvatarProps {
  color: string;
  authorAvatarUrl: string;
}

export default function AuthorAvatar({ color, authorAvatarUrl }: AuthorAvatarProps) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Image source={{ uri: authorAvatarUrl }} style={styles.image} />
    </View>
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
