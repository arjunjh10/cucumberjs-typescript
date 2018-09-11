import {Config} from './config';
import {configName} from '../support/env';
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

    default:
      throw new Error(`Failed to load config ${configName}`);
  }
};
