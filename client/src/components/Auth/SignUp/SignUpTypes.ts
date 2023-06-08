import { Control, FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Gender } from '@src/types/user';

export interface BirthDate {
  year: number | '년';
  month: number | '월';
  date: number | '일';
}

export interface SignUpFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
  verificationCode: string;
  gender: Gender;
  birthDate: BirthDate;
}

export interface SignUpInputProps {
  register: UseFormRegister<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
}

export interface SignUpPhoneNumberProps extends SignUpInputProps {
  isAuthenticated: boolean;
}

export interface SignUpPasswordConfirmInputProps {
  register: UseFormRegister<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
}

export interface SignUpVerificationCodeProps extends SignUpInputProps {
  remainingTime: number;
  isAuthenticated: boolean;
}

export interface SignUpGenderProps {
  control: Control<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
}

export interface SignUpBirthDateProps {
  control: Control<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
}
