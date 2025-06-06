import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function HorizontalLine() {
  const { colors } = useTheme() as any;

  return (
    <View
      style={{
        marginVertical: 5,
        borderWidth: 0.4,
        borderBottomColor: `${colors.text}50`,
      }}
    />
  );
}
