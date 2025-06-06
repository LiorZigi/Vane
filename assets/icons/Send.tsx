import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { useTheme } from '@react-navigation/native';

const Send = ({
  size = 24,
  hasFill = false,
  fill,
  color,
}: IconProps) => {
  const { colors } = useTheme();
  return (
    <View>
      <Svg width={size} height={size} viewBox="0 0 25 25">
        <G
          fill={hasFill ? fill : 'none'}
          stroke={color || colors.text}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <Path d="M20 6.22412H5L10.5 11.7241M20 6.22412L12.5 19.2241L10.5 11.7241M20 6.22412L10.5 11.7241" stroke={color || colors.text} strokeWidth="1.5" strokeLinejoin="round" />
        </G>
      </Svg>
    </View>
  );
};

export default Send;