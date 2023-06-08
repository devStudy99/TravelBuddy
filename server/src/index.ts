import server from '@src/server';
import logger from '@utils/loggerUtils';

server.listen(process.env.SERVER_PORT || 3001, () => {
  logger.info('Server is running on port 8080');
});
