import { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { HEADER_HEIGHT } from "../constants/constants";

export default function useAnimatedHeader() {
  const headerOffset = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const previousScrollY = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentY = event.contentOffset.y;
      scrollY.value = currentY;
      const diff = currentY - previousScrollY.value;
      // Update previous scroll position for next event
      previousScrollY.value = currentY;

      // Calculate new header offset and clamp it between -HEADER_HEIGHT and 0
      let newOffset = headerOffset.value - diff;
      if (newOffset < (-HEADER_HEIGHT + 10)) {
        newOffset = -HEADER_HEIGHT;
      } else if ((newOffset + 10) > 0) {
        newOffset = 0;
      }
      headerOffset.value = newOffset;
    },
  });
  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: headerOffset.value }],
    };
  });

  return {
    handleScroll,
    animatedHeaderStyle,
    scrollY,
  };
}
