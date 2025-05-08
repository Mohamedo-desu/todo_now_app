import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
    padding: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    backgroundColor: theme.Colors.gray[100],
    borderColor: theme.Colors.gray[200],
    borderRadius: 5,
    paddingHorizontal: 10,
    color: theme.Colors.typography,
    placeholderTextColor: theme.Colors.gray[400],
  },
  searchInput: {
    flex: 1,
    color: theme.Colors.typography,
    padding: 0,
  },
  icon: {
    color: theme.Colors.gray[400],
  },
  iconBtn: {},
  flatList: { flex: 1, marginTop: 10 },
  contentContainerStyle: {
    flexGrow: 1,
    gap: 15,
    paddingVertical: 20,
    paddingBottom: rt.insets.bottom + 60,
  },
}));
