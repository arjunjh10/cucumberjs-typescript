import {Config} from './config';
import {configName} from '../support/env';
import {parallel, mobile} from './test.conf';
import {
  headless,
  single
} from './test.conf';

export const determineConfig = (): Array<Config> => {
  switch (configName.toLowerCase()) {
    case 'headless':
      return headless;

    case 'single':
      return single;

    case 'parallel':
      return parallel;

    case 'mobile':
      return mobile;

    default:
      throw new Error(`Failed to load config ${configName}`);
  }
};
