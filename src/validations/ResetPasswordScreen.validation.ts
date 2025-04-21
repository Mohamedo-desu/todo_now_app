import * as yup from 'yup';

export const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, 'New password must be at least 8 characters')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
      'New password must contain uppercase, lowercase, number, and special character'
    )
    .required('New password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),

  code: yup
    .number()
    .typeError('Code must be a number')
    .integer('Code must be an integer')
    .positive('Code must be a positive number')
    .required('Code is required'),
});
