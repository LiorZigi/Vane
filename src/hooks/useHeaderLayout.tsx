import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import isRTL from '../logic/localization';
import VaneIcon from '../../assets/icons/VaneIcon';
import { useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';

export default function useHeaderLayout() {
  const { colors } = useTheme() as any;
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    isRTL
      ? navigation.setOptions({
        headerRight: () => (
          <Pressable onPress={() => router.back()}>
            <VaneIcon iconName="rightArrow" />
          </Pressable>
        ),
        headerLeft: () => <></>
      })
      : navigation.setOptions({
        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <VaneIcon iconName="leftArrow" />
          </Pressable>
        ),
        headerRight: () => <></>
      });
    navigation.setOptions({
      headerTitle: isRTL ? 'פוסט' : 'Post',
      headerTitleStyle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: 'bold'
      },
      headerStyle: {
        backgroundColor: colors.topBackground
      },
      headerShadowVisible: false
    });
  }, []);
}
