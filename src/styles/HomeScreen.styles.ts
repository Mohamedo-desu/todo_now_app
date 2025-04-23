import { Fonts } from '@/constants/Fonts';
import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
    paddingTop: rt.insets.top + 10,
    paddingHorizontal: 15,
  },
  flatList: { flex: 1, marginTop: 10 },
  contentContainerStyle: {
    flexGrow: 1,
    gap: 15,
    paddingVertical: 20,
    paddingBottom: rt.insets.bottom + 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  icon: {
    color: theme.Colors.typography,
  },
  iconBtn: {},
  footerText: {
    color: theme.Colors.gray[500],
    fontSize: 12,
    fontFamily: Fonts.Medium,
    textAlign: 'center',
    alignSelf: 'center',
  },
}));
