import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  gImage: {
    width: 40,
    height: 40,
  },
  gButton: {
    borderWidth: 1,
    backgroundColor: theme.Colors.gray[100],
    borderColor: theme.Colors.gray[200],
    borderRadius: 5,
    padding: 10,
  },
}));
