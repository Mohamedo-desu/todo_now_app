import { Fonts } from '@/constants/Fonts';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
    paddingHorizontal: 15,
  },
  userContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.Bold,
    color: theme.Colors.typography,
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color: theme.Colors.gray[500],
    marginBottom: 15,
  },
  privacyPolicyText: {
    fontSize: 14,
    fontFamily: Fonts.Medium,
    color: theme.Colors.primary,
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  height: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
    width: '100%',
    gap: 10,
  },
  btn: isLogin => ({
    width: '100%',
    backgroundColor: isLogin ? theme.Colors.background : theme.Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    height: 44,
    marginBottom: 5,
    borderWidth: isLogin ? 1 : 0,
    borderColor: theme.Colors.primary,
  }),
  btnText: isLogin => ({
    color: isLogin ? theme.Colors.primary : theme.Colors.white,
    fontFamily: Fonts.Medium,
    fontSize: 14,
    textAlign: 'center',
  }),
}));
