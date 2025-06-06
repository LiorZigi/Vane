import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { useTheme } from '@react-navigation/native';

const Comment = ({
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
          <Path d="M4.5 12.7241C4.5 17.1424 8.08172 20.7241 12.5 20.7241C13.7552 20.7241 14.9428 20.4351 16 19.9199L20 20.7241L19.5 16.6001C20.1372 15.4519 20.5 14.1304 20.5 12.7241C20.5 8.30584 16.9183 4.72412 12.5 4.72412C8.08172 4.72412 4.5 8.30584 4.5 12.7241Z" stroke={color || colors.text} strokeWidth="1.5" />
        </G>
      </Svg>
    </View>
  );
};

export default Comment;