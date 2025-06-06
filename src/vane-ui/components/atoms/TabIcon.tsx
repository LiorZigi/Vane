import { Platform, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import VaneIcon from '../../../../assets/icons/VaneIcon';

interface TabIconProps {
  focused: boolean;
  icon: any;
}

export default function TabIcon({ focused, icon }: TabIconProps) {
  const { colors } = useTheme() as any;
  return (
    <View
      style={{
        position: 'absolute',
        top: Platform.OS === 'ios' ? 15 : 0,
      }}
    >
      <VaneIcon
        iconName={icon}
        size={32}
        color={
          focused
            ? colors.primary
            : colors.text
        }
        hasFill={focused}
      />
    </View>
  );
}
