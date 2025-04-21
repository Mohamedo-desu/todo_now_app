import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import AuthHeader from '@/components/ui/AuthHeader';
import { Fonts } from '@/constants/Fonts';
import { schema } from '@/validations/VerificationModal.validation';
import { useSignUp } from '@clerk/clerk-expo';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

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

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: rt.insets.top + 10,
    paddingHorizontal: 15,
  },
  modalContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: theme.Colors.background,
    borderRadius: 5,
    alignItems: 'center',
    gap: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Fonts.Bold,
    color: theme.Colors.primary,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    backgroundColor: theme.Colors.gray[100],
    borderColor: theme.Colors.gray[200],
    borderRadius: 5,
    paddingHorizontal: 10,
    color: theme.Colors.typography,
    placeholderTextColor: theme.Colors.gray[400],
  },
  btn: {
    width: '100%',
    backgroundColor: theme.Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: theme.Colors.white,
    fontFamily: Fonts.Medium,
    fontSize: 14,
    textAlign: 'center',
  },
  formContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
}));
