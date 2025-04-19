import { Fonts } from '@/constants/Fonts';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const Public = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Public</Text>
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
