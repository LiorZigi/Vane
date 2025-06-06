import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  FadeIn,
  LinearTransition,
  SlideInLeft,
  SlideInRight,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { useUserData } from '@/hooks/useUserData';
import { useSession } from '@/hooks/useAuth';

const gap = 10;

interface HeadTextProps {
  text?: string;
  side?: 'left' | 'right';
  image?: ImageSourcePropType;
}

const HeadText = (props: HeadTextProps) => {
  const { colors } = useTheme() as any;
  const { text, side, image } = props;
  const [totalWidth, setTotalWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const width = totalWidth - textWidth - gap;

  const Transition = LinearTransition.delay(1650).springify().damping(18).stiffness(50);
  const LeftSlide = SlideInLeft.delay(1500).springify().damping(18).stiffness(50);
  const RightSlide = SlideInRight.delay(1500).springify().damping(18).stiffness(50);

  return (
    <Animated.View
      entering={FadeIn.delay(1000).springify().damping(18).stiffness(50)}
      layout={Transition}
      onLayout={(event) => {
        setTotalWidth(event.nativeEvent.layout.width);
      }}
      style={styles.headerContainer}>
      {Boolean(width > 0) && side === 'left' && (
        <Animated.View entering={LeftSlide} style={[styles.embedImage, { width }]}>
          <Image source={image} style={styles.image} />
        </Animated.View>
      )}
      {Boolean(text) && (
        <Animated.Text
          layout={Transition}
          onLayout={(event) => {
            setTextWidth(event.nativeEvent.layout.width);
          }}
          style={[styles.headText, { color: colors.text }]}>
          {text}
        </Animated.Text>
      )}
      {Boolean(width > 0) && side === 'right' && (
        <Animated.View entering={RightSlide} style={[styles.embedImage, { width }]}>
          <Image source={image} style={styles.image} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default function WelcomeScreen() {
  const session = useSession();
  // const { data: user, isLoading, isError } = useUserData();
  const { top, bottom } = useSafeAreaInsets();
  const { colors } = useTheme() as any;
  // console.log("user", user);
  // console.log("isLoading", isLoading);
  // console.log("isError", isError);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (session) {
        router.replace('/feed');
      } else {
        router.replace('/auth');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [session]);

  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom, backgroundColor: colors.topBackground }]}>
      <View style={{ gap }}>
        <HeadText text="Your" side="right" image={require('../../../../assets/images/one.jpg')} />
        <HeadText text="All-In-One" side="right" image={require('../../../../assets/images/two.jpg')} />
        <HeadText text="Creative" side="left" image={require('../../../../assets/images/three.jpg')} />
        <HeadText text="Powerhouse" />
        <HeadText side="right" image={require('../../../../assets/images/four.jpg')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'center',
    gap: gap,
    height: 80,
  },
  embedImage: {
    height: 80,
    borderRadius: 22,
    overflow: 'hidden',
  },
  headText: {
    fontSize: 70,
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
