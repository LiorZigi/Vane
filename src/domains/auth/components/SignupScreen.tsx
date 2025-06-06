import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { globalStyles } from '@/constants/constants';
import PlxButton from '@/vane-ui/components/atoms/VnButton';
import Input from '@/vane-ui/components/atoms/VnInput';
import useHeaderLayout from '@/hooks/useHeaderLayout';
import isRTL from '@/logic/localization';
import { useTheme } from '@react-navigation/native';
import { useSignUp } from '@/hooks/useAuth';

const windowWidth = Dimensions.get('window').width;

const SignupScreen = () => {
  useHeaderLayout();
  const { mutate: signUp, isPending, isError, error } = useSignUp();
  const { colors } = useTheme() as any;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    signUp({ email, password });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.topBackgroundColor }]}>
      <KeyboardAvoidingView style={styles.headerContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <Image
          style={styles.image}
          source={require('../../../../assets/images/vane.png')}
        />
        <Text style={[styles.text, { color: colors.text }]}>
          {isRTL ? 'צרו משתמש על מנת להמשיך' : 'Create an account to continue'}
        </Text>
        <View style={styles.inputContainer}>
          <Input
            style={[styles.input, { color: colors.text, borderColor: colors.inputBorderColor, backgroundColor: colors.inputBackgroundColor }]}
            placeholder={isRTL ? 'דוא״ל' : 'Email'}
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            textAlign={isRTL ? 'right' : 'left'}
          />
          <Input
            style={styles.input}
            placeholder={isRTL ? 'סיסמה' : 'Password'}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            textAlign={isRTL ? 'right' : 'left'}
          />
          <Input
            style={styles.input}
            placeholder={isRTL ? 'אימות סיסמה' : 'Confirm Password'}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            textAlign={isRTL ? 'right' : 'left'}
          />
          <PlxButton title={isRTL ? 'הרשמה' : 'Sign up'} pill={true} onPress={handleSignUp} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'flex-start',
  },
  close: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 60,
    right: 40,
  },
  headerContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 100,
    marginVertical: 20,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputContainer: {
    alignSelf: 'stretch',
    padding: 10,
    gap: 5,
  },
  input: {
    height: 50,
    fontSize: 20,
    paddingHorizontal: 20,
  },
  signupLink: {
    fontSize: 16,
    marginTop: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
  },
});
