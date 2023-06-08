export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export interface UserInfo {
  id?: number;
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
  gender: Gender;
  birthDate: string;
}
