import { useSignIn } from '@clerk/clerk-expo';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import AuthHeader from '@/components/ui/AuthHeader';
import { styles } from '@/styles/ForgotPasswordScreen.styles';
import { ForgotPasswordFormData, schema } from '@/validations/ForgotPasswordScreen.validation';

const ForgotPassword = () => {
  const { isLoaded, signIn } = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
    },
    shouldFocusError: true,
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      if (!isLoaded) return;
      const { email } = data;
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      router.navigate('/(public)/resetPassword');
    } catch (error) {
      console.log('forgot password error', error);
      Alert.alert('Error', 'An error occurred while sending the reset password email.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <AuthHeader
        title="Reset Password"
        description="Enter your email address to reset your password"
      />
      <View style={styles.formContainer}>
        <Input
          label="Email"
          control={control}
          errors={errors.email}
          name={'email'}
          placeholder={'johndoe@gmail.com'}
        />
      </View>
      <View style={styles.height} />
      <Button
        onPress={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        isValid={isValid}
        label={'Reset Password'}
      />
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
