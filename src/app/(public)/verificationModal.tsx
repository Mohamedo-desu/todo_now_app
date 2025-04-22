import { useSignUp } from '@clerk/clerk-expo';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import AuthHeader from '@/components/ui/AuthHeader';
import { styles } from '@/styles/VerificationModal.styles';
import { schema } from '@/validations/VerificationModal.validation';

const VerificationModal = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: { code: 0 },
    shouldFocusError: true,
  });

  const onSubmit = async (data: any) => {
    try {
      const { code } = data;
      if (!isLoaded) return;

      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error) {
      console.log('Verification error', error);
      Alert.alert('Verification failed', 'Please check your verification code and try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <AuthHeader />
      <View style={styles.formContainer}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Verify Your Email</Text>
          <Input
            label="Code"
            control={control}
            errors={errors.code}
            name={'code'}
            placeholder={'Enter your verification code'}
          />
          <Button
            onPress={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
            isValid={isValid}
            label={'Verify'}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerificationModal;
