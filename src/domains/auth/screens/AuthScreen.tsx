import { Image, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '@/constants/constants';
import VnView from '@/vane-ui/components/organisms/VnView';
import isRTL from '@/logic/localization';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import VnButton from '@/vane-ui/components/atoms/VnButton';

export default function AuthScreen() {
  const { colors } = useTheme() as any;
  const router = useRouter();

  return (
    <VnView style={{ flex: 1 }} gradient>
      <VnView style={styles.container}>
        <View style={styles.header}></View>
        <View style={{ gap: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              {isRTL ? 'הרשמה ל - Vane' : 'Welcome to Vane'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={[globalStyles.text, { color: colors.text }]}>
              {isRTL ? 'בחרו כיצד תרצו ליצור את המשתמש שלכם.' : 'Choose how you want to create your account.'}
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={require('../../../../assets/images/vane.png')}
            style={styles.headerLogo}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <VnButton
              title={isRTL ? 'כניסה עם חשבון Google' : 'Sign in with Google'}
              onPress={() => { }}
              color={colors.primary}
              textColor={colors.text}
            />
            <VnButton
              title={isRTL ? 'כניסה עם חשבון Apple' : 'Sign in with Apple'}
              onPress={() => { }}
              color={colors.primary}
              textColor={colors.text}
            />
            <VnButton
              title={isRTL ? 'כניסה עם דוא״ל' : 'Sign in with Email'}
              color={colors.primary}
              onPress={() => router.push('/(public)/login')}
              textColor={colors.text}
            />
          </View>
        </View>
      </VnView>
    </VnView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerLogo: {
    height: 200,
    width: 300,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 90,
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 8,
  },
});
