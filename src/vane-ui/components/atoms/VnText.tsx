import { useTheme } from "@react-navigation/native";
import { TextStyle } from "react-native";
import Animated from "react-native-reanimated";

interface VnTextProps {
  children: React.ReactNode;
  weight?: "normal" | "regular" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
  style?: TextStyle | TextStyle[];
  entering?: any;
  exiting?: any;
}

export default function VnText({
  children,
  weight = "regular",
  style,
  entering,
  exiting,
}: VnTextProps) {
  const { colors } = useTheme() as any;
  return (
    <Animated.Text
      style={[
        // {
        //   fontFamily: "ValeraRound",
        //   fontWeight: weight,

        // },
        {
          color: colors.text,
          fontWeight: weight,
        },
        style,
      ]}
      entering={entering}
      exiting={exiting}
    >
      {children}
    </Animated.Text>
  );
}
