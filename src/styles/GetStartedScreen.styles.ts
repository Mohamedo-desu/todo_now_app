import { StyleSheet } from 'react-native-unistyles';
import { Fonts } from '@/constants/Fonts';

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
    paddingVertical: rt.insets.top + 10,
    paddingHorizontal: 15,
  },
  text: { fontFamily: Fonts.Bold, fontSize: 28, color: theme.Colors.typography },
  textInfo: {
    color: theme.Colors.gray[500],
    fontSize: 13,
    fontFamily: Fonts.Regular,
  },
  btn: isLogin => ({
    backgroundColor: isLogin ? theme.Colors.background : theme.Colors.primary,
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
  height: { flex: 1, flexGrow: 1 },
  imageContainer: { height: '50%', marginTop: 20 },
  image: { width: '100%', height: '100%' },
  infoContainer: { flexDirection: 'row', marginTop: 10, gap: 10 },
}));
