import { StyleSheet, View } from 'react-native';
import { globalStyles } from '@/constants/constants';
import SearchBar from '../components/SearchBar';
import { useTheme } from '@react-navigation/native';
import VnView from '@/vane-ui/components/organisms/VnView';

export default function ChatScreen() {
  const { colors } = useTheme() as any;
  return (
    <VnView transparent scrollable contentContainerStyle={{ padding: 16 }}>
      <SearchBar></SearchBar>
    </VnView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: globalStyles.text,
});
