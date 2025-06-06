import React from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

interface PlusButtonProps {
  onPress: () => void;
}

const PlusButton = ({ onPress }: PlusButtonProps) => {
  const { colors } = useTheme() as any;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.circle, { backgroundColor: colors.primary }]}>
        <Octicons
          name="plus"
          size={Platform.OS === 'ios' ? 15 : 20}
          color={colors.text}
          style={{ opacity: 1 }}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlusButton;
