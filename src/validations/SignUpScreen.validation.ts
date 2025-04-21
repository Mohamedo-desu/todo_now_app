import * as yup from 'yup';

export const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'New password must be at least 8 characters')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
      'Password must contain uppercase, lowercase, number, and special character'
    )
    .required('Password is required'),
});
