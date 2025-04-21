import { Fonts } from '@/constants/Fonts';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: rt.insets.top + 10,
    paddingHorizontal: 15,
  },
  formContainer: {
    marginVertical: 20,
    gap: 20,
  },
  forgotLabel: {
    fontSize: 14,
    color: theme.Colors.secondary,
    fontFamily: Fonts.Regular,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  socialOptionsContainer: {
    flex: 1,
  },
  socialOptions: {
    alignItems: 'center',
    gap: 10,
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
  },
  gImage: {
    width: 40,
    height: 40,
  },
  gButton: {
    borderWidth: 1,
    backgroundColor: theme.Colors.gray[100],
    borderColor: theme.Colors.gray[200],
    borderRadius: 5,
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    fontSize: 14,
    color: theme.Colors.gray[500],
    fontFamily: Fonts.Regular,
  },
  footerText2: {
    fontSize: 14,
    color: theme.Colors.secondary,
    fontFamily: Fonts.Medium,
  },
  orText: {
    fontSize: 14,
    color: theme.Colors.gray[500],
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },
}));
