import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginInputProps {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
}
