import { Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface TabLabelProps {
  label?: string;
}

export default function TabLabel({ label }: TabLabelProps) {
  const { colors } = useTheme() as any;
  return (
    <View
      style={{
        top: 20,
      }}
    >
      <Text style={{ color: colors.text, fontSize: 12 }}>
        {label}
      </Text>
    </View>
  );
}
