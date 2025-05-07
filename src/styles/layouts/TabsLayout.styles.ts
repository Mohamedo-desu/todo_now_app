import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    paddingTop: rt.insets.top,
    backgroundColor: theme.Colors.background,
  },
  tabBarStyle: {
    backgroundColor: theme.Colors.background,
  },
}));
