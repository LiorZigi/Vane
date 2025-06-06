import * as Haptics from 'expo-haptics';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import VaneIcon from "../../../../assets/icons/VaneIcon";

export default function MenuButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
    navigation.dispatch(DrawerActions.openDrawer());
  }

  return (
    <Pressable onPress={handlePress}>
      <VaneIcon iconName="menu" size={24} />
    </Pressable>
  )
}
