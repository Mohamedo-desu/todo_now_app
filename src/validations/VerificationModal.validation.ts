import * as yup from 'yup';

export const schema = yup.object().shape({
  code: yup
    .number()
    .typeError('Code must be a number')
    .integer('Code must be an integer')
    .positive('Code must be a positive number')
    .required('Code is required'),
});
