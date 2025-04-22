import { StyleSheet } from 'react-native-unistyles';
import { Fonts } from '@/constants/Fonts';

export const styles = StyleSheet.create(theme => ({
  container: {
    borderWidth: 1,
    backgroundColor: theme.Colors.background,
    borderColor: theme.Colors.gray[200],
    borderRadius: 5,
    padding: 10,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.Bold,
    color: theme.Colors.typography,
  },
  date: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    color: theme.Colors.typography,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.Medium,
    color: theme.Colors.gray[500],
  },
  footer: {
    gap: 10,
  },
  taskStatusLabel: {
    fontSize: 12,
    color: theme.Colors.typography,
    fontFamily: Fonts.Regular,
  },
  icon: {
    color: theme.Colors.typography,
  },
  iconBtn: { alignSelf: 'flex-end' },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  actionBtn: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  editText: {
    fontSize: 14,
    color: theme.Colors.primary,
    fontFamily: Fonts.Bold,
    textDecorationLine: 'underline',
  },
  deleteText: {
    fontSize: 14,
    color: theme.Colors.error,
    fontFamily: Fonts.Bold,
    textDecorationLine: 'underline',
  },
}));
