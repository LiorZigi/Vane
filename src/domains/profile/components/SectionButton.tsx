import React, { PropsWithChildren } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import VaneIcon from '../../../../assets/icons/VaneIcon';
import isRTL from "@/logic/localization";
import { VnText } from '@/vane-ui';

interface Props {
  label: string;
  iconLeft?: any;
  iconRight: any;
  color?: string;
  iconLeftSize?: number;
  iconRightSize?: number;
  onPress?: () => void;
}

const SectionButton = ({
  label,
  iconLeft,
  iconRight,
  color,
  iconLeftSize = 24,
  iconRightSize = 24,
  onPress,
}: PropsWithChildren<Props>) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={{ flexDirection: isRTL ? 'row' : 'row-reverse', gap: 10 }}>
        <VnText style={[styles.label, { color: color }]}>{label}</VnText>
        <VaneIcon iconName={iconLeft} size={iconLeftSize} />
      </View>
      <View style={styles.iconContainer}>
        <VaneIcon iconName={iconRight} size={iconRightSize} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginRight: 8,
  },
  label: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'normal',
    marginRight: 10,
  },
});

export default SectionButton;
