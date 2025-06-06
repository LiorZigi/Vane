import React from 'react';
import { View } from 'react-native';
import Svg, { Ellipse, G, Path, Rect } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { useTheme } from '@react-navigation/native';

const Images = ({
  size = 24,
  hasFill = false,
  fill,
  color
}: IconProps) => {
  const { colors } = useTheme();

  return (
    <View>
      <Svg width={100} height={100} viewBox="0 0 1024 1024">
        <G
          fill={hasFill ? fill : 'none'}
          stroke={color || colors.text}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <Path fill={hasFill ? colors.primary : 'none'} d="M432 112V96a48.14 48.14 0 0 0-48-48H64a48.14 48.14 0 0 0-48 48v256a48.14 48.14 0 0 0 48 48h16" />
          <Rect width="400" height="336" x="96" y="128" fill="none" stroke={color || colors.text} stroke-linejoin="round" stroke-width="32" rx="45.99" ry="45.99" />
          <Ellipse fill={hasFill ? colors.primary : 'none'} cx="372.92" cy="219.64" rx="30.77" ry="30.55" />
          <Path fill={hasFill ? colors.primary : 'none'} d="M342.15 372.17L255 285.78a30.93 30.93 0 0 0-42.18-1.21L96 387.64M265.23 464l118.59-117.73a31 31 0 0 1 41.46-1.87L496 402.91" />
        </G>
      </Svg>
    </View>
  );
};

export default Images;
