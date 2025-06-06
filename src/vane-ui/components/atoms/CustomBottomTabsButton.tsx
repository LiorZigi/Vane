import * as Haptics from 'expo-haptics';
import { GestureResponderEvent, Pressable } from "react-native";
import { useNavigationState, useTheme } from '@react-navigation/native';
import VaneIcon from '../../../../assets/icons/VaneIcon';

interface CustomBottomTabButtonProps {
  iconName: string;
  routeName?: string;
  onPress?: ((
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent
  ) => void) | undefined;
}

export default function CustomBottomTabButton({ iconName, routeName, onPress }: CustomBottomTabButtonProps) {
  const { colors } = useTheme() as any;

  const { routes, index } = useNavigationState((s) => ({
    routes: s.routes,
    index: s.index,
  }));

  // the active route’s name is routes[index].name
  const focused = routes[index].name === routeName;

  const handlePress = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    onPress && onPress(e);
  }
  return (
    <Pressable
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5 }}
      onPress={handlePress}
    >
      <VaneIcon
        iconName={iconName}
        size={35}
        color={focused ? colors.text : `${colors.text}90`}
        hasFill={focused}
        fill={focused ? colors.text : 'none'}
      />
    </Pressable>
  );

}
