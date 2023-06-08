import redisStore from '@config/redisConfig';
import envConfig from '@config/envConfig';

const { secret, cookieProps: cookie } = envConfig.sessionProps;

export default {
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  secret,
  cookie,
} as const;
