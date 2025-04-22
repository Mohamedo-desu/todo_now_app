import { useSignIn } from '@clerk/clerk-expo';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import AuthHeader from '@/components/ui/AuthHeader';
import GoogleButton from '@/components/ui/GoogleButton';
import { styles } from '@/styles/LoginScreen.styles';
import { schema } from '@/validations/LoginScreen.validation';

const LoginScreen = () => {
  const { isLoaded, signIn, setActive } = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    shouldFocusError: true,
  });

  const onSubmit = async (data: any) => {
    try {
      if (!isLoaded) return;
      const { email, password } = data;

      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      console.log('Login error', error);
      Alert.alert('Login failed', 'Please check your credentials and try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <AuthHeader title="Login to your account" />
        <View style={styles.formContainer}>
          <Input
            label="Email"
            control={control}
            errors={errors.email}
            name={'email'}
            placeholder={'johndoe@gmail.com'}
          />
          <Input
            label="Password"
            control={control}
            errors={errors.password}
            name={'password'}
            placeholder={'••••••••••••'}
          />
          <Link href={'/(public)/forgotPassword'} style={styles.forgotLabel}>
            forgot password?
          </Link>
        </View>
        <View style={styles.socialOptionsContainer}>
          <Button
            onPress={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
            isValid={isValid}
            label={'Login'}
          />
          <View style={styles.socialOptions}>
            <Text style={styles.orText}>OR LOGIN WITH</Text>
            <GoogleButton />
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don&apos;t have an account?</Text>

            <Text style={styles.footerText2} onPress={() => router.navigate('/(public)/signup')}>
              Sign up
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
