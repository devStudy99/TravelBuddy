import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import envConfig from '@src/config/envConfig';
import logger from '@src/utils/loggerUtils';

const { redisProps } = envConfig;
const client = createClient(redisProps);

client.on('error', (error) => {
  logger.error(error);
});

client.on('connect', () => logger.info('Redis Connected'));

client.connect();

const redisStore = new RedisStore({ client });

export default redisStore;
