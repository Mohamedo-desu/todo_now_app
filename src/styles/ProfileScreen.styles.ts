import { StyleSheet } from 'react-native-unistyles';
import { Fonts } from '@/constants/Fonts';

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
    padding: 15,
    paddingTop: rt.insets.top + 10,
    paddingBottom: rt.insets.bottom + 10,
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
  email: { fontSize: 14, fontFamily: Fonts.Regular, color: theme.Colors.gray[500] },
  height: {
    flex: 1,
    flexGrow: 1,
  },
  btn: isLogin => ({
    width: '100%',
    backgroundColor: isLogin ? theme.Colors.background : theme.Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  }),
  btnText: isLogin => ({
    color: isLogin ? theme.Colors.primary : theme.Colors.white,
    fontFamily: Fonts.Medium,
    fontSize: 14,
    textAlign: 'center',
  }),
}));
