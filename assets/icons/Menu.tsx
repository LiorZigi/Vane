import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { useTheme } from '@react-navigation/native';

const Menu = ({
  size = 24,
  hasFill = false,
  fill,
  color
}: IconProps) => {
  const { colors } = useTheme() as any;
  return (
    <View>
      <Svg width={24} height={16} viewBox="0 0 24 16">
        <G
          fill={color || colors.text}
          stroke={color || colors.text}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.5"
        >
          <Path d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1" fill={color || colors.text} />
        </G>
      </Svg>
    </View>
  );
};

export default Menu;
