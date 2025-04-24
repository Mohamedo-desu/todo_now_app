import { useAuth, useUser } from '@clerk/clerk-expo';

import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '@/styles/ProfileScreen.styles';

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
