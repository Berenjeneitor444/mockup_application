import { Environment } from '@services/conf/types';
import { baseEnvironment } from './environment.base';

/**
 * Local development environment
 */
export const environment: Environment = {
  ...baseEnvironment,
  name: 'Local development',
  debug: true,
  api: {
    ...baseEnvironment.api,
    url: 'https://localhost/api', // test
  },
  monitor: {
    providers: {
      sentry: {
        dsn: 'https://0de512d5ca4b72cae82ca5be73c1919f@o4508879590195200.ingest.de.sentry.io/4508919203823696', // production
      },
    },
  },
};
