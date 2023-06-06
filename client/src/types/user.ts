export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export interface UserInfo {
  email: string;
  name: string;
  phoneNumber: string;
  gender: Gender;
  birthDate: string;
}
