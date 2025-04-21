import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { useAuth } from '@clerk/clerk-expo';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

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
      router.replace('/(protected)');
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded)
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>ToDo</Text>
          <Text style={styles.text2}>Now</Text>
        </View>
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

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.Colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: { flexDirection: 'row', gap: 10 },
  text: {
    fontFamily: Fonts.Bold,
    fontSize: 28,
    letterSpacing: 1.5,
    color: Colors.primary,
  },
  text2: {
    fontFamily: Fonts.Bold,
    fontSize: 28,
    letterSpacing: 1.5,
    color: theme.Colors.typography,
  },
}));
