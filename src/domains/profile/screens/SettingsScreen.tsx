import { StyleSheet, Text, View } from "react-native";
import VnView from "@/vane-ui/components/organisms/VnView";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import isRTL from "@/logic/localization";
import VaneIcon from "../../../../assets/icons/VaneIcon";
import useHeaderLayout from "@/hooks/useHeaderLayout";
import SectionButton from "../components/SectionButton";
import { globalStyles } from "@/constants/constants";
import { useSignOut } from "@/hooks/useAuth";
import { useTheme } from "@react-navigation/native";

export default function SettingsScreen() {
  const { mutate: logout, isPending } = useSignOut();
  const { colors } = useTheme() as any;
  const navigation = useNavigation<any>();
  useHeaderLayout();

  const handleLogout = () => {
    logout();
  };

  return (
    <VnView style={[styles.container, { backgroundColor: colors.topBackground }]}>
      <View style={{ padding: 16 }}>
        <SectionButton
          label={isRTL ? 'חשבון' : 'Account'}
          iconLeft="settings"
          iconRight="chevronLeft"
          color={colors.text}
          iconLeftSize={30}
          iconRightSize={30}
        />
        <SectionButton
          label={isRTL ? 'שיטת תשלום' : 'Payment Method'}
          iconLeft="creditCard"
          iconRight="chevronLeft"
          color={colors.text}
          iconLeftSize={30}
          iconRightSize={30}
        ></SectionButton>
        <SectionButton
          label={isRTL ? 'יציאה' : 'Logout'}
          iconLeft="logout"
          iconRight="chevronLeft"
          color={colors.text}
          iconLeftSize={30}
          iconRightSize={30}
          onPress={handleLogout}
        ></SectionButton>
      </View>
    </VnView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sections: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
});