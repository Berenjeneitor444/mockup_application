import { Environment } from '@services/conf/types';
import { baseEnvironment } from './environment.base';

/**
 * Test environment
 */
export const environment: Environment = {
  ...baseEnvironment,
  name: 'Test',
  debug: false,
  api: {
    ...baseEnvironment.api,
    url: 'https://api-odata.test.majesticresorts.com/api-gateway', // test
  },
  monitor: {
    providers: {
      sentry: {
        dsn: 'https://0de512d5ca4b72cae82ca5be73c1919f@o4508879590195200.ingest.de.sentry.io/4508919203823696', // production
      },
    },
  },
};
