import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  flatList: { flex: 1, backgroundColor: theme.Colors.background },
  contentContainerStyle: {
    flexGrow: 1,
    gap: 15,
    padding: 15,
    paddingBottom: rt.insets.bottom + 60,
  },
}));
