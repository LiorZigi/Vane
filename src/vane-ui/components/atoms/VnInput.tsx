import React, { useState } from 'react';
import { TextInput, StyleSheet, Keyboard, useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

interface InputProps {
  value: string | number;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  caretHidden?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  textAlign?: 'left' | 'right' | 'center';
  style?: object;
}

const Input = ({
  value,
  onChangeText,
  autoFocus = false,
  placeholder,
  keyboardType = 'default',
  caretHidden = false,
  secureTextEntry = false,
  autoCapitalize = 'sentences',
  textAlign,
  style,
}: InputProps) => {
  const scheme = useColorScheme();
  const { colors } = useTheme() as any;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  return (
    <BlurView intensity={1} tint={scheme === 'dark' ? 'systemMaterialDark' : 'systemMaterialLight'} style={{
      backgroundColor: 'rgba(255,255,255,0.15)',
      borderRadius: 32,
      borderWidth: 1.5,
      borderColor: 'rgba(255,255,255,0.1)',
      overflow: 'hidden',
      paddingHorizontal: 16,
    }}>
      <TextInput
        placeholderTextColor={colors.textInfo}
        autoFocus={autoFocus}
        value={value.toString()}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        caretHidden={caretHidden}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        textAlign={textAlign}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[styles.input, { color: colors.text, backgroundColor: colors.inputBackground }, isFocused && styles.focused, style]}
      />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
  },
  focused: {
    // borderColor: 'blue',
  },
});

export default Input;
