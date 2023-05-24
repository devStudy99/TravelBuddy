import redisStore from '@src/config/redisConfig';
import envConfig from '@src/config/envConfig';

const { secret, cookieProps: cookie } = envConfig.sessionProps;

export default {
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  secret,
  cookie,
} as const;
