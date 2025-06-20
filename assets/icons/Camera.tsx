import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { useTheme } from '@react-navigation/native';

const Camera = ({
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
          strokeWidth="1"
        >
          <Path fill={hasFill ? colors.primary : 'none'} d="M12.857 3.189h-1.714c-.681 0-1.022 0-1.331.094c-.274.083-.529.22-.75.401c-.25.205-.438.489-.816 1.056L7.103 6.454c-1.524 0-2.286 0-2.868.296a2.72 2.72 0 0 0-1.188 1.19c-.297.581-.297 1.343-.297 2.867v5.651c0 1.524 0 2.286.297 2.868c.26.512.677.928 1.188 1.189c.582.296 1.344.296 2.868.296h9.794c1.524 0 2.286 0 2.868-.296a2.72 2.72 0 0 0 1.188-1.19c.297-.581.297-1.343.297-2.867v-5.651c0-1.524 0-2.286-.297-2.868a2.72 2.72 0 0 0-1.188-1.189c-.582-.296-1.344-.296-2.868-.296L15.754 4.74c-.378-.567-.567-.85-.816-1.056a2.2 2.2 0 0 0-.75-.401c-.309-.094-.65-.094-1.331-.094" />
          <Path fill={hasFill ? colors.primary : 'none'} d="M15.775 13.212a3.775 3.775 0 1 1-7.55 0a3.775 3.775 0 0 1 7.55 0" />
        </G>
      </Svg>
    </View>
  );
};

export default Camera;
