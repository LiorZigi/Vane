import React from 'react';
import { View, StyleSheet } from 'react-native';
import PlusButton from '../atoms/PlusButton';
import MinusButton from '../atoms/MinusButton';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../atoms/VnInput';
import { useTheme } from '@react-navigation/native';
import { RootState } from '@/store/store';
import { decrement } from '@/store/slices/membersCounter';
import { increment } from '@/store/slices/membersCounter';
interface NumberPickerProps {
  value: number;
  onValueChange: (value: number) => void;
  style?: object;
}

const NumberPicker = ({ value, onValueChange, style }: NumberPickerProps) => {
  const dispatch = useDispatch();
  const number = useSelector((state: RootState) => state.membersCounter.value);
  const { colors } = useTheme() as any;
  const incrementNumber = () => {
    dispatch(increment());
  };

  const decrementNumber = () => {
    if (number === 1) return;
    dispatch(decrement());
  };

  return (
    <View style={[styles.container, style]}>
      <MinusButton onPress={decrementNumber} />
      <Input
        value={number}
        keyboardType="numeric"
        caretHidden={true}
        style={[styles.input, { color: colors.text }]}
        onChangeText={(text) => onValueChange(parseInt(text, 10))}
      ></Input>
      <PlusButton onPress={incrementNumber} />
    </View>
  );
};

export default NumberPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    textAlign: 'center',
    minWidth: 50,
    maxWidth: 50,
  },
});
