import { useAuth } from '@clerk/clerk-expo';
import * as Application from 'expo-application';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { styles } from '@/styles/layouts/InitialLayout.styles';

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inPublicLayout = segments[0] === '(public)';

    if (!isSignedIn && !inPublicLayout) {
      router.replace('/(public)');
    } else if (isSignedIn && inPublicLayout) {
      router.replace('/(protected)/(tabs)');
    }
  }, [isLoaded, isSignedIn, router, segments]);

  if (!isLoaded)
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>ToDo</Text>
          <Text style={styles.text2}>Now</Text>
        </View>

        <Text style={styles.versionCodeText}>{Application.nativeApplicationVersion}</Text>
      </View>
    );

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(public)"
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="(protected)"
        options={{
          animation: 'none',
        }}
      />
    </Stack>
  );
};

export default InitialLayout;
