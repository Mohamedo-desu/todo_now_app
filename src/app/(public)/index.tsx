import { Fonts } from '@/constants/Fonts';
import useSettingsStore from '@/store/settingsStore';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const Public = () => {
  const { theme, setTheme } = useSettingsStore();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Public</Text>
      <Button title="Change Theme" onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
    </View>
  );
};

export default Public;

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.Colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.Colors.typography,
    fontSize: 20,
    fontFamily: Fonts.Bold,
  },
}));
