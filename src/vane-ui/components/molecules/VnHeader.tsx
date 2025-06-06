import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Pressable,
  StatusBar,
  ScrollView,
} from 'react-native';
import MenuButton from '../atoms/MenuButton';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import VaneIcon from '../../../../assets/icons/VaneIcon';
import VnText from '../atoms/VnText';

interface VnHeaderProps {
  headerHeight: number;
  watchlist?: boolean;
  portfolio?: boolean;
  market?: boolean;
  execution?: boolean;
  scrollY?: any;
  navigation?: any;
  animatedStyle?: any;
  isInnerScreen?: boolean;
  options?: boolean;
  blurEffect?: boolean;
  params?: any;
}

const width = Dimensions.get('window').width;

export default function VnHeader({
  animatedStyle,
  headerHeight,
  scrollY,
  isInnerScreen = false,
  navigation,
  options = false,
  watchlist = false,
  blurEffect = false,
  params,
}: VnHeaderProps) {
  const { colors } = useTheme() as any;

  const animatedHeaderOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY?.value,
      [0, 100],
      [1, 0.9],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
          },
          animatedStyle,
          blurEffect && animatedHeaderOpacity,
          {
            backgroundColor: colors.topBackground,
          },
        ]}
      >
        <View
          style={{
            position: 'relative',
            alignItems: 'flex-start',
          }}
        >
          {!isInnerScreen ? (
            <MenuButton />
          ) : (
            <Pressable onPress={() => navigation.goBack()}>
              <VaneIcon iconName="chevronLeft" size={24} color={colors.text} />
            </Pressable>
          )}
        </View>
        {!isInnerScreen && (
          <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
            <Image
              source={require("../../../../assets/images/vane.png")}
              style={styles.headerImage}
            />
            {/* <VnText style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'flex-end', }}>ane</VnText> */}
          </View>
        )}
        {options && (
          <View style={{ flex: 1, alignItems: 'flex-end', padding: 10 }}>
            <VaneIcon iconName="moreVertical" size={15} color={colors.text} />
          </View>
        )}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 1,
    padding: 10,
  },
  headerImage: {
    width: 80,
    height: 40,
    resizeMode: 'contain',
  },
});
