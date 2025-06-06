import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { useTheme } from '@react-navigation/native';

const Heart = ({
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
          <Path d="M18.9999 5.69089C16.2806 3.51541 13.4999 5.69089 12.4999 6.69089C11.4999 5.69089 8.7193 3.51541 5.99996 5.69089C3.28062 7.86638 2.68961 12.3805 6.49996 16.1909C10.3103 20.0012 12.4999 20.6909 12.4999 20.6909C12.4999 20.6909 14.6896 20.0012 18.4999 16.1909C22.3103 12.3805 21.7193 7.86638 18.9999 5.69089Z" stroke={color || colors.text} strokeWidth="1.5" />
        </G>
      </Svg>
    </View>
  );
};

export default Heart;
