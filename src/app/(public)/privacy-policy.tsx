import PrivacyPolicyContent from '@/components/ui/PrivacyPolicyContent';
import { Fonts } from '@/constants/Fonts';
import { Stack } from 'expo-router';
import React from 'react';

const PrivacyPolicyScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Privacy Policy',
          headerTitleStyle: { fontFamily: Fonts.Medium },
        }}
      />
      <PrivacyPolicyContent />
    </>
  );
};

export default PrivacyPolicyScreen;
