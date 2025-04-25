import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

const PublicLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href={'/(protected)/(tabs)'} />;

  if (!isLoaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="login" />
      <Stack.Screen
        name="privacy-policy"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="verificationModal"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
