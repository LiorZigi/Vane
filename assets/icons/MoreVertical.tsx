

import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { useTheme } from '@react-navigation/native';

const MoreVertical = ({
  size = 24,
  hasFill = false,
  fill,
  color
}: IconProps) => {
  const { colors } = useTheme() as any;
  return (
    <View>
      <Svg width={4} height={16} viewBox="0 0 4 16">
        <G
          fill={colors.text}
          stroke={color || colors.text}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.1"
        >
          <Circle cx="2" cy="2" r="2" transform="rotate(90 2 2)" />
          <Circle cx="2" cy="8" r="2" transform="rotate(90 2 8)" />
          <Circle cx="2" cy="14" r="2" transform="rotate(90 2 14)" />
        </G>
      </Svg>
    </View>
  );
};

export default MoreVertical;
