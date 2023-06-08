import crypto from 'crypto';
import axios from 'axios';
import envConfig from '@config/envConfig';
import { generateVerificationCode, saveVerificationCode } from '@utils/verificationCode';
import logger from '@utils/loggerUtils';
import { HttpException } from '@src/middlewares/errorMiddleware';

export const sendSMS = async (toPhoneNumber: string) => {
  const verificationCode = generateVerificationCode();

  const requestData = {
    type: 'SMS',
    from: envConfig.naverSens.fromPhoneNumber,
    content: '트래블버디 회원가입 인증번호',
    messages: [
      {
        to: toPhoneNumber,
        subject: '트래블버디 회원가입 인증번호',
        content: `[트래블버디] 인증번호\n[${verificationCode}]를 입력해주세요.`,
      },
    ],
  };

  const serviceId = envConfig.naverSens.serviceId;
  const accessKey = envConfig.naverSens.accessKey;
  const secretKey = envConfig.naverSens.secretKey;
  const space = ' ';
  const newLine = '\n';
  const method = 'POST';
  const url = `/sms/v2/services/${serviceId}/messages`;
  const timestamp = new Date().getTime().toString();

  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);
  const signature = hmac.digest('base64');

  const apiUrl = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'x-ncp-apigw-timestamp': timestamp,
    'x-ncp-iam-access-key': accessKey,
    'x-ncp-apigw-signature-v2': signature,
  };

  try {
    const response = await axios.post(apiUrl, requestData, { headers });
    logger.info('SMS 전송 성공:', response.data);
    await saveVerificationCode(toPhoneNumber, verificationCode);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const { status, errorMessage, errors } = error.response?.data;
      logger.error(`errStatus: ${status}, errMessage: ${errorMessage}, errErrors: ${errors}`);
      throw new HttpException(status, 'SMS 에러');
    }
  }
};
