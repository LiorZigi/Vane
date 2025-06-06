import React from 'react';
import { Text, StyleSheet, Pressable, useColorScheme, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import VaneIcon from '../../../../assets/icons/VaneIcon';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface VnProps {
  title: string;
  color?: string;
  textColor?: string;
  pill?: boolean;
  icon?: string;
  iconColor?: string;
  avoidKeyboard?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

const VnButton = ({
  title,
  color,
  textColor,
  pill = true,
  icon,
  iconColor,
  avoidKeyboard = false,
  style,
  onPress,
}: VnProps) => {
  const scheme = useColorScheme();
  const { colors } = useTheme() as any;
  const insets = useSafeAreaInsets();
  const buttonColor = color || colors.primary;
  const buttonTextColor = textColor || colors.text;
  return (
    <Pressable
      onPress={onPress}
      style={[{
        borderRadius: 32, borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        ...avoidKeyboard && {
          position: 'absolute',
          alignSelf: 'flex-end',
          bottom: insets.bottom + 50,
          end: 16
        },
      }, style]}
    >
      <BlurView
        intensity={1}
        tint={scheme === 'dark' ? 'systemMaterialDark' : 'systemMaterialLight'}
        style={{
          ...styles.button,
          backgroundColor: 'rgba(255,255,255,0.15)',
          flexDirection: 'row',
          borderRadius: 32,
        }}
      >
        {icon && <VaneIcon iconName={icon} size={20} color={iconColor} />}
        <Text style={{ ...styles.buttonText, color: buttonTextColor || colors.buttonText }}>{title}</Text>
      </BlurView>

    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 80,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VnButton;
