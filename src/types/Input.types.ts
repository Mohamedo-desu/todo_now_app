import { Control, FieldError } from 'react-hook-form';

export interface InputProps {
  control: Control<Record<string, unknown>>;
  errors: FieldError | undefined;
  label: string;
  name: string;
  placeholder?: string;
}
