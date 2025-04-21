import * as yup from 'yup';

export const schema = yup.object().shape({
  taskTitle: yup
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters')
    .required('Task title is required'),

  taskDescription: yup
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be at most 500 characters')
    .required('Task description is required'),

  taskDate: yup
    .date()
    .typeError('Task date and time must be a valid date')
    .required('Task date and time is required'),
});
