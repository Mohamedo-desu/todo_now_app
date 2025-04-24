import { Fonts } from '@/constants/Fonts';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.Colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: { flexDirection: 'row', gap: 10 },
  text: {
    fontFamily: Fonts.Bold,
    fontSize: 28,
    letterSpacing: 1.5,
    color: theme.Colors.primary,
  },
  text2: {
    fontFamily: Fonts.Bold,
    fontSize: 28,
    letterSpacing: 1.5,
    color: theme.Colors.typography,
  },
}));
