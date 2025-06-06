import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { useTheme } from '@react-navigation/native';

const Poll = ({
  size = 24,
  hasFill = false,
  fill,
  color
}: IconProps) => {
  const { colors } = useTheme();

  return (
    <View>
      <Svg width={size} height={size} viewBox="0 0 24 20">
        <G
          fill={hasFill ? fill : 'none'}
          stroke={color || colors.text}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        >
          <Path fill={hasFill ? colors.primary : 'none'} d="M18 10a2 2 0 0 0-2-2H4a2 2 0 1 0 0 4h12a2 2 0 0 0 2-2m-8-6a2 2 0 0 0-2-2H4a2 2 0 1 0 0 4h4a2 2 0 0 0 2-2m4 12a2 2 0 0 0-2-2H4a2 2 0 1 0 0 4h8a2 2 0 0 0 2-2" />
        </G>
      </Svg>
    </View>
  );
};

export default Poll;
