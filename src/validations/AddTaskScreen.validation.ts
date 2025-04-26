import { z } from 'zod';

// Define validation limits as constants
const TITLE_MIN_LENGTH = 3;
const TITLE_MAX_LENGTH = 40;
const DESCRIPTION_MIN_LENGTH = 10;
const DESCRIPTION_MAX_LENGTH = 100;

export const schema = z.object({
  taskTitle: z
    .string()
    .trim()
    .min(TITLE_MIN_LENGTH, { message: `Title must be at least ${TITLE_MIN_LENGTH} characters` })
    .max(TITLE_MAX_LENGTH, { message: `Title must be at most ${TITLE_MAX_LENGTH} characters` })
    .min(1, { message: 'Task title is required' }),

  taskDescription: z
    .string()
    .trim()
    .min(DESCRIPTION_MIN_LENGTH, {
      message: `Description must be at least ${DESCRIPTION_MIN_LENGTH} characters`,
    })
    .max(DESCRIPTION_MAX_LENGTH, {
      message: `Description must be at most ${DESCRIPTION_MAX_LENGTH} characters`,
    })
    .min(1, { message: 'Task description is required' }),

  taskDate: z
    .union([z.date(), z.string().transform(val => new Date(val))])
    .refine(val => !isNaN(val.getTime()), {
      message: 'Task date and time must be a valid date',
    }),
});

export type AddTaskFormData = {
  taskTitle: string;
  taskDescription: string;
  taskDate: Date;
};
