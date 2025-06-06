import { View, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import Input from '@/vane-ui/components/atoms/VnInput';
import { useTheme } from '@react-navigation/native';
import isRTL from '@/logic/localization';

export default function SearchBar() {
  const { colors } = useTheme() as any;
  const [search, setSearch] = useState<string>('');

  return (
    <View style={{ backgroundColor: colors.topBackgroundColor }}>
      <Input
        value={search}
        style={[styles.input, { backgroundColor: colors.inputBackgroundColor, color: colors.text }]}
        placeholder={isRTL ? 'חיפוש' : 'Search'}
        onChangeText={setSearch}
        textAlign="center"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
  },
});
