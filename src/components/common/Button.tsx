import { styles } from '@/styles/Button.styles';
import { ButtonProps } from '@/types/Button.types';
import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button: FC<ButtonProps> = ({ isSubmitting, isValid, onPress, label }) => {
  return (
    <TouchableOpacity
      style={styles.btn(isValid && !isSubmitting)}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!isValid || isSubmitting}
    >
      <Text style={styles.btnText(isValid && !isSubmitting)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
