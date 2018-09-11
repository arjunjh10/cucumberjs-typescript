import {Config} from './config';
import {merge} from 'lodash';

const commonConfigProps = {
  capabilities: {
    name: 'My test name',
    resolution: '1280x1024',
    failure_url: undefined
  }
};

// Only pass the property to browsers
const browserResolution = {
  capabilities: {
    resolution: '1280x1024'
  }
};

const Chrome: Config = {
  capabilities: {
    browser: 'chrome',
    browserName: 'chrome',
    os: 'OS X',
    os_version: 'High Sierra'
  }
};

const Safari: Config = {
  capabilities: {
    browser: 'Safari',
    browserName: 'Safari',
    os: 'OS X',
    os_version: 'High Sierra'
  }
};

const Firefox: Config = {
  capabilities: {
    browser: 'Firefox',
    browserName: 'Firefox',
    os: 'OS X',
    os_version: 'High Sierra'
  }
};

const Edge: Config = {
  capabilities: {
    browser: 'Edge',
    browserName: 'Edge',
    os: 'Windows',
    os_version: '10'
  }
};

const IPhone: Config = {
  capabilities:
  {
    browser: 'ios',
    browserName: 'iPhone',
    device: 'iPhone 7',
    os_version: '10.0'
  }
};

const galaxyS8: Config = {
  capabilities: {
    browser: 'android',
    browserName: 'galaxy s8',
    device: 'Samsung Galaxy S8',
    os_version: '7.0'
  }
};

const headlessConfig: Config = {
  capabilities: {
    browser: 'chrome',
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless']
    }
  }
};

// Merging commonConfigProps capabilities to each browser/device config
merge(Chrome, commonConfigProps, browserResolution);
merge(Safari, commonConfigProps, browserResolution);
merge(Firefox, commonConfigProps, browserResolution);
merge(Edge, commonConfigProps, browserResolution);
merge(IPhone, commonConfigProps);
merge(galaxyS8, commonConfigProps);

export const headless: Array<Config> = [
  headlessConfig
];
export const single: Array<Config> = [
  Chrome,
  // Safari,
  // Edge,
  // Firefox,
  // IPhone,
  // galaxys8
];
