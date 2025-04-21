import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import AuthHeader from '@/components/ui/AuthHeader';
import { styles } from '@/styles/LoginScreen.styles';
import { schema } from '@/validations/SignUpScreen.validation';
import { useSignUp } from '@clerk/clerk-expo';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignUpScreen() {
  const { isLoaded, signUp } = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: { username: '', email: '', password: '' },
    shouldFocusError: true,
  });

  const onSubmit = async (data: any) => {
    try {
      if (!isLoaded) return;
      const { username, email, password } = data;

      await signUp.create({
        emailAddress: email,
        password,
        unsafeMetadata: {
          username,
        },
      });
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });
      router.push('/(public)/verificationModal');
    } catch (error) {
      console.log('signup error', error);
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
        <AuthHeader title="Create your new account" />

        <View style={styles.formContainer}>
          <Input
            label="Username"
            control={control}
            errors={errors.username}
            name={'username'}
            placeholder={'johndoe'}
          />
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
        </View>
        <Button
          onPress={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          isValid={isValid}
          label={'Signup'}
        />
        <View style={styles.socialOptions}>
          <Text style={styles.orText}>OR SIGN UP WITH</Text>
          <TouchableOpacity style={styles.gButton} activeOpacity={0.8} onPress={() => {}}>
            <Image
              source={require('@/assets/images/google.png')}
              resizeMode="contain"
              style={styles.gImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href={'/(public)/login'} style={styles.footerText2}>
            Login
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
