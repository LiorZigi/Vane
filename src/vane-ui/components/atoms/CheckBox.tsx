import React, { useState } from 'react';
import { View, Animated, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@react-navigation/native';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  style?: object;
}

const Checkbox = ({ checked, onPress, style }: CheckboxProps) => {
  const { colors } = useTheme() as any;
  const [scale] = useState(new Animated.Value(checked ? 1 : 0));

  const handlePress = () => {
    Animated.timing(scale, {
      toValue: checked ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    onPress();
  };

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        handlePress();
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          ...style,
        }}
      >
        <Animated.View
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: colors.primary,
            transform: [{ scale }],
          }}
        />
      </View>
    </Pressable>
  );
};

export default Checkbox;
