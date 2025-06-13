import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import CustomBottomTabButton from "../../vane-ui/components/atoms/CustomBottomTabsButton";
import { BlurView } from "expo-blur";

export const navigatorScreenOptions = (colors: any): BottomTabNavigationOptions => {
  return ({
    animation: 'shift',
    tabBarHideOnKeyboard: true,
    sceneStyle: {
      backgroundColor: 'transparent',
    },
    tabBarStyle: {
      display: 'flex',
      position: 'absolute',
      elevation: 5,
      borderTopColor: colors.border,
      paddingHorizontal: 15,
      // borderTopWidth: 0,
      // height: 80,
    },
    headerStyle: {
      backgroundColor: colors.header,
    },
    headerTitleStyle: {
      color: colors.text,
    },
    headerShown: false,
    headerShadowVisible: false,
    tabBarBackground: () => {
      return <BlurView intensity={1} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }} tint='systemThickMaterialDark'></BlurView>;
    }
  });
}

export const options = (iconName: string, route: string): BottomTabNavigationOptions => ({
  tabBarButton: ({ onPress, accessibilityState }) => {
    return <CustomBottomTabButton iconName={iconName} routeName={route} onPress={onPress} />
  },
})
