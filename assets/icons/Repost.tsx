import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { useTheme } from '@react-navigation/native';

const Repost = ({
  size = 24,
  hasFill = false,
  fill,
  color
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
          <Path d="M5.5 14.2241V9.72412C5.5 8.06727 6.84315 6.72412 8.5 6.72412H16M16 6.72412L13 3.72412M16 6.72412L13 9.72412M19.5 11.2241V15.7241C19.5 17.381 18.1569 18.7241 16.5 18.7241L9 18.7241M9 18.7241L12 21.7241M9 18.7241L12 15.7241" stroke={color || colors.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      </Svg>
    </View>
  );
};

export default Repost;