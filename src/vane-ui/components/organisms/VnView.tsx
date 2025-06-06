import React from 'react';
import Animated from 'react-native-reanimated';
import VnHeader from '@/vane-ui/components/molecules/VnHeader';
import useAnimatedHeader from '@/hooks/useAnimatedHeader';
import { ViewStyle } from 'react-native';
import { StyleProp } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { HEADER_HEIGHT } from '@/constants/constants';
import { LinearGradient } from 'expo-linear-gradient';

type VnViewProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  header?: boolean;
  entering?: any;
  exiting?: any;
  blurEffect?: boolean;
  scrollable?: boolean;
  gradient?: boolean;
  transparent?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export default function VnView({
  children,
  style,
  header = false,
  scrollable = false,
  gradient = false,
  transparent = false,
  entering,
  exiting,
  contentContainerStyle,
}: VnViewProps) {
  const { colors } = useTheme() as any;
  const { animatedHeaderStyle, handleScroll, scrollY } = useAnimatedHeader();

  // decide between ScrollView or plain View
  const Container = scrollable ? Animated.ScrollView : Animated.View;

  // assemble all the props for it
  const containerProps = {
    style: [
      transparent && { backgroundColor: 'transparent' },
      style,
    ],
    ...(scrollable && {
      onScroll: handleScroll,
      scrollEventThrottle: 16,
      contentContainerStyle: [
        {
          flex: 1,
          paddingTop: header ? HEADER_HEIGHT : 0,
        },
        contentContainerStyle,
      ],
    }),
    entering,
    exiting,
  };

  return (
    <Container {...containerProps}>
      {header && (
        <VnHeader
          animatedStyle={animatedHeaderStyle}
          headerHeight={HEADER_HEIGHT}
          scrollY={scrollY}
          blurEffect={!transparent}
        />
      )}

      {gradient ? (
        <LinearGradient
          colors={[
            colors.topBackground,
            colors.topBackground,
            colors.topBackground,
            colors.topBackground,
            // '#30363e',
          ]}
          start={{ x: 0, y: 0.1 }}
          end={{ x: 0, y: 1.05 }}
          style={[{ flex: 1 }]}
        >
          {children}
        </LinearGradient>
      ) : (
        children
      )}
    </Container>
  );
}
