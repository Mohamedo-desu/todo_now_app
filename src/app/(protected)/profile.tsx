import { useAuth, useUser } from '@clerk/clerk-expo';

import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Fonts } from '@/constants/Fonts';

const ProfileScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleLogOut = async () => {
    try {
      Alert.alert('Log out', 'Are you sure you want to log out?', [
        {
          text: 'log out',
          style: 'cancel',
          onPress: async () => {
            try {
              await signOut();
            } catch (err) {
              console.error('error logging out', err);
              Alert.alert('Error', 'Could not log out');
            } finally {
            }
          },
        },
        {
          text: 'Cancel',
          style: 'destructive',
          isPreferred: true,
        },
      ]);
    } catch (error) {
      console.log('Logout error', error);
    }
  };

  const handleDeleteAccount = async () => {};

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image source={{ uri: user?.imageUrl }} resizeMode="cover" style={styles.image} />
        <Text style={styles.title}>{user?.firstName}</Text>
        <Text style={styles.email}>{user?.emailAddresses[0].emailAddress}</Text>
      </View>
      <View style={styles.height} />
      <View>
        <TouchableOpacity style={styles.btn(true)} activeOpacity={0.8} onPress={handleLogOut}>
          <Text style={styles.btnText(true)}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn(false)}
          activeOpacity={0.8}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.btnText(false)}>Delete account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.background,
    padding: 15,
    paddingTop: rt.insets.top + 10,
    paddingBottom: rt.insets.bottom + 10,
    paddingHorizontal: 15,
  },
  userContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.Bold,
    color: theme.Colors.typography,
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
  email: { fontSize: 14, fontFamily: Fonts.Regular, color: theme.Colors.gray[500] },
  height: {
    flex: 1,
    flexGrow: 1,
  },
  btn: isLogin => ({
    width: '100%',
    backgroundColor: isLogin ? theme.Colors.background : theme.Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  }),
  btnText: isLogin => ({
    color: isLogin ? theme.Colors.primary : theme.Colors.white,
    fontFamily: Fonts.Medium,
    fontSize: 14,
    textAlign: 'center',
  }),
}));
