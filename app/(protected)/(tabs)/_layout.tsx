import { Tabs } from 'expo-router';
import { navigatorScreenOptions, options } from '@/layout/config/bottom-tabs.config';
import { useTheme } from '@react-navigation/native';
import { useSession } from '@/hooks/useAuth';
import VnView from '@/vane-ui/components/organisms/VnView';
import { usePostSubscriptions } from '@/hooks/usePostsSubscriptions';

export default function TabLayout() {
  const session = useSession();
  const { colors } = useTheme() as any;
  usePostSubscriptions();

  return (
    <VnView style={{ flex: 1, backgroundColor: colors.topBackground }} gradient>
      <Tabs screenOptions={navigatorScreenOptions(colors)}>
        <Tabs.Screen name="feed" options={({ route }) => options('home', route.name)} />
        <Tabs.Screen name="chat" options={({ route }) => options('chat', route.name)} />
        <Tabs.Screen name="notifications" options={({ route }) => options('notification', route.name)} />
        <Tabs.Screen name="profile" options={({ route }) => options('user', route.name)} />
      </Tabs>
    </VnView>
  );
}
