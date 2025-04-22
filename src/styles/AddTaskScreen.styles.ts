import { StyleSheet } from 'react-native-unistyles';
import { Fonts } from '@/constants/Fonts';

export const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  formContainer: {
    gap: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: theme.Colors.typography,
    fontFamily: Fonts.Regular,
  },
  datePickerContainer: {
    gap: 5,
    width: '100%',
  },
  datePicker: {
    height: 50,
    borderWidth: 1,
    backgroundColor: theme.Colors.gray[100],
    borderColor: theme.Colors.gray[200],
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  errorLabel: {
    fontSize: 12,
    color: theme.Colors.error,
    fontFamily: Fonts.Regular,
  },
  datePickerText: {
    fontSize: 14,
    color: theme.Colors.typography,
    fontFamily: Fonts.Regular,
  },
  height: {
    flex: 1,
    flexGrow: 1,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priorityLabel: {
    fontSize: 14,
    color: theme.Colors.typography,
    fontFamily: Fonts.Regular,
  },
  checkbox: {
    alignSelf: 'flex-end',
  },
  inputContainer: {
    gap: 5,
    width: '100%',
  },
  input: {
    height: 200,
    borderWidth: 1,
    backgroundColor: theme.Colors.gray[100],
    borderColor: theme.Colors.gray[200],
    borderRadius: 5,
    paddingHorizontal: 10,
    color: theme.Colors.typography,
    placeholderTextColor: theme.Colors.gray[400],
  },
}));
