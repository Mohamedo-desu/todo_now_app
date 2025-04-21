import { styles } from '@/styles/GoogleButton';
import { useSSO } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const GoogleButton = () => {
  const { startSSOFlow } = useSSO();

  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const redirectUrl = Linking.createURL('/');

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl,
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace('/(protected)');
      }
    } catch (error) {
      console.log('OAuth error', error);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleGoogleSignIn} style={styles.gButton}>
      <Image
        source={require('@/assets/images/google.png')}
        resizeMode="contain"
        style={styles.gImage}
      />
    </TouchableOpacity>
  );
};

export default GoogleButton;
