import { client as redisCli } from '@config/redisConfig';

export const saveVerificationCode = async (phoneNumber: string, verificationCode: string) => {
  await redisCli.setEx(phoneNumber, 180, verificationCode);
};

export const getVerificationCode = async (phoneNumber: string) => {
  return await redisCli.get(phoneNumber);
};

export const deleteVerificationCode = async (phoneNumber: string) => {
  await redisCli.del(phoneNumber);
};

export const generateVerificationCode = () => {
  const length = 6;
  const characters = '0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
};
