import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PlxButton from '@/vane-ui/components/atoms/VnButton';
import Input from '@/vane-ui/components/atoms/VnInput';
import { useEffect, useState } from 'react';
import { globalStyles } from '@/constants/constants';
import isRTL from '@/logic/localization';
import { useTheme } from '@react-navigation/native';
import VaneIcon from '../../../../assets/icons/VaneIcon';
import { useRouter } from 'expo-router';
import { useSignIn } from '@/hooks/useAuth';
import VnView from '@/vane-ui/components/organisms/VnView';

const EmailModal = () => {
  const { colors } = useTheme() as any;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const signIn = useSignIn();
  const router = useRouter();

  useEffect(() => {
    if (signIn.isPending) {
      console.log('signIn.isPending');

    }
  }, [signIn.isPending]);

  const handleSignIn = async () => {
    signIn.mutate({ email, password }, {
      onSuccess: () => {
        router.back();
        router.replace('/feed');
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleSignUp = () => {
    router.back();
    router.push('/signup');
  };

  return (
    <VnView style={{ flex: 1 }} gradient>
      <View style={[styles.container, { backgroundColor: colors.topBackgroundColor }]}>
        <Pressable style={styles.close} onPress={() => router.back()}>
          <VaneIcon
            iconName="close"
            size={32}
            color={colors.primary}
          />
        </Pressable>
        <View style={styles.headerContainer}>
          <Image
            style={styles.image}
            source={require('../../../../assets/images/login.png')}
          />
          <Text style={[styles.text, { color: colors.text }]}>
            {isRTL ? 'התחברו בקלות עם דוא״ל וסיסמה' : 'Sign in easily with Email and Password'}
          </Text>
          <View style={styles.inputContainer}>
            <Input
              style={[styles.input, { color: colors.text, borderColor: colors.inputBorder, backgroundColor: colors.inputBackground }]}
              placeholder={isRTL ? 'דוא״ל' : 'Email'}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
              textAlign={isRTL ? 'right' : 'left'}
            />
            <Input
              style={[styles.input, { color: colors.text, borderColor: colors.inputBorder, backgroundColor: colors.inputBackground }]}
              placeholder={isRTL ? 'סיסמה' : 'Password'}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              textAlign={isRTL ? 'right' : 'left'}
            />
          </View>
          <Pressable onPress={handleSignUp}>
            <Text style={[styles.signupLink, { color: colors.primary }]}>
              {isRTL ? 'לא רשומים עדיין? הירשמו!' : 'Not registered yet? Sign up!'}
            </Text>
          </Pressable>
        </View>
        <View style={styles.button}>
          <PlxButton
            title={isRTL ? 'כניסה' : 'Sign in'}
            pill={true}
            textColor={colors.text}
            onPress={handleSignIn}
          />
          {signIn.isError && <Text style={{ color: 'red' }}>{signIn.error.message}</Text>}
        </View>
      </View>
    </VnView>
  );
};

export default EmailModal;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'flex-end',
    paddingVertical: 55,
  },
  close: {
    position: 'absolute',
    zIndex: 1,
    top: 80,
    right: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    ...globalStyles.text,
    fontSize: 30,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
  inputContainer: {
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 30,
    gap: 10,
  },
  input: {
    height: 50,
    fontSize: 20,
    paddingHorizontal: 20,
  },
  signupLink: {
    fontSize: 18,
  },
  button: {
    marginTop: 'auto',
  },
});
