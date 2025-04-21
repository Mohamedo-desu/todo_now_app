import { useAuth } from '@clerk/clerk-expo';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const Home = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Button title="Logout" onPress={() => signOut()} color="red" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
