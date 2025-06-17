import { Environment } from '@services/conf/types';
import { baseEnvironment } from './environment.base';

/**
 * Production environment
 */
export const environment: Environment = {
  ...baseEnvironment,
  name: 'Production',
  debug: false,
  api: {
    ...baseEnvironment.api,
    url: 'https://api/', // production
  },
};
