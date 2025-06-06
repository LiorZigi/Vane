import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '@/constants/constants';
import SearchBar from '@/domains/chat/components/SearchBar';
import { useTheme } from '@react-navigation/native';
import VnView from '@/vane-ui/components/organisms/VnView';
import isRTL from '@/logic/localization';

export default function NotificationsScreen() {
  const { colors } = useTheme() as any;
  return (
    <VnView transparent style={[{ flex: 1, backgroundColor: colors.topBackgroundColor }]} scrollable contentContainerStyle={{ padding: 16 }}>
      <SearchBar></SearchBar>
      <Text style={[styles.text, { color: colors.text }]}>
        {isRTL ? 'אין התראות חדשות' : 'No new notifications'}
      </Text>
    </VnView>
  );
}

const styles = StyleSheet.create({
  container: globalStyles.container,
  text: globalStyles.text,
});
