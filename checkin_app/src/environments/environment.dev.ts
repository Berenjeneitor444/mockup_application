import { Environment } from '@services/conf/types';
import { baseEnvironment } from './environment.base';

/**
 * Local development environment
 */
export const environment: Environment = {
  ...baseEnvironment,
  name: 'Local development',
  debug: false,
  api: {
    ...baseEnvironment.api,
    url: 'https://localhost/api', // test
  },
};
