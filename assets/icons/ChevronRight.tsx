import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { useTheme } from '@react-navigation/native';

const ChevronRight = ({
  size = 24,
  hasFill = false,
  fill,
  color,
}: IconProps) => {
  const { colors } = useTheme();

  return (
    <View>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <G
          fill={hasFill ? fill : 'none'}
          stroke={color || colors.text}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <Path d="m10 8l4 4l-4 4" />
        </G>
      </Svg>
    </View>
  );
};

export default ChevronRight;
