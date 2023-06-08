import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default {
  serverProps: {
    port: Number(process.env.SERVER_PORT) ?? 0,
  },
  redisProps: {
    socket: {
      host: process.env.REDIS_HOST ?? '',
      port: Number(process.env.REDIS_PORT) ?? 0,
      reconnectStrategy:
        process.env.REDIS_RECONNECT_STRATEGY === 'false'
          ? false
          : Math.min(Number(process.env.REDIS_RECONNECT_STRATEGY) * 50, 1000),
    },
  },
  mysqlProps: {
    host: process.env.MYSQL_HOST ?? '',
    port: Number(process.env.MYSQL_PORT) ?? 0,
    user: process.env.MYSQL_USER ?? '',
    password: process.env.MYSQL_PASSWORD ?? '',
    database: process.env.MYSQL_DATABASE ?? '',
  },
  sessionProps: {
    secret: process.env.COOKIE_SECRET ?? '',
    cookieProps: {
      httpOnly: process.env.COOKIE_HTTP_ONLY === 'true',
      path: process.env.COOKIE_PATH ?? '',
      maxAge: Number(process.env.COOKIE_EXP) ?? 0,
      domain: process.env.COOKIE_DOMAIN ?? '',
      secure: process.env.COOKIE_SECURE === 'true',
    },
  },
  naverSens: {
    accessKey: process.env.NAVER_SENS_ACCESS_KEY ?? '',
    secretKey: process.env.NAVER_SENS_SECRET_KEY ?? '',
    serviceId: process.env.NAVER_SENS_SERVICE_ID ?? '',
    fromPhoneNumber: process.env.NAVER_SENS_FROM_PHONE_NUMBER ?? '',
  },
} as const;
