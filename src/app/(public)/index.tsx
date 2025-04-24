import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '@/styles/GetStartedScreen.styles';

const GetStartedScreen = () => {
  const router = useRouter();

  const handleNavigateToLogin = () => {
    router.navigate('/(public)/login');
  };
  const handleNavigateToSignup = () => {
    router.navigate('/(public)/signup');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Get started</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textInfo}>Create tasks</Text>
        <Text style={styles.textInfo}>•</Text>
        <Text style={styles.textInfo}>Set reminders</Text>
        <Text style={styles.textInfo}>•</Text>
        <Text style={styles.textInfo}>Track progress</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/au-bg.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.height} />
      <View>
        <TouchableOpacity
          style={styles.btn(true)}
          activeOpacity={0.8}
          onPress={handleNavigateToLogin}
        >
          <Text style={styles.btnText(true)}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn(false)}
          activeOpacity={0.8}
          onPress={handleNavigateToSignup}
        >
          <Text style={styles.btnText(false)}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStartedScreen;
