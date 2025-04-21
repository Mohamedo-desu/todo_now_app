import * as yup from 'yup';

// Signup validation schema
export const schema = yup.object().shape({
  code: yup.number().typeError('code must be a number').required('code is required'),
});
