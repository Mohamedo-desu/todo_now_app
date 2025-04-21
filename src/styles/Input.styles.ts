import { Fonts } from '@/constants/Fonts';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  input: {
    height: 50,
    borderWidth: 1,
    backgroundColor: theme.Colors.gray[100],
    borderColor: theme.Colors.gray[200],
    borderRadius: 5,
    paddingHorizontal: 10,
    color: theme.Colors.typography,
    placeholderTextColor: theme.Colors.gray[400],
  },
  inputLabel: {
    fontSize: 14,
    color: theme.Colors.typography,
    fontFamily: Fonts.Regular,
  },
  inputContainer: {
    gap: 5,
  },
  errorLabel: {
    fontSize: 12,
    color: theme.Colors.error,
    fontFamily: Fonts.Regular,
  },
}));
