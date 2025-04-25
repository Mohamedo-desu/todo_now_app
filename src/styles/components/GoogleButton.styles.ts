import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
  gImage: {
    width: 20,
    height: 20,
  },
  gButton: {
    borderWidth: 1,
    backgroundColor: theme.Colors.google,
    borderColor: theme.Colors.gray[200],
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
}));
