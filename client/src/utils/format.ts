import { BirthDate } from '@components/Auth/SignUp/SignUpTypes';

export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, '$1-$2-$3')
    .replace(/(\-{1,2})$/, '');
};

export const formatVerificationCode = (verificationCode: string) => {
  return verificationCode.replace(/[^0-9]/g, '');
};

export const formatDate = (birthDate: BirthDate) => {
  const { year, month, date } = birthDate;
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDate = date.toString().padStart(2, '0');

  return `${year}${formattedMonth}${formattedDate}`;
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${formattedMinutes}:${formattedSeconds}`;
};
