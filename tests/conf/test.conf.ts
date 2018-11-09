import {Config} from './config';
import {merge} from 'lodash';
import {projectName, buildNumber} from '../support/env';

const commonConfigProps = {
  capabilities: {
    'server': 'http://hub-cloud.browserstack.com/wd/hub',
    'name': 'My test name',
    'resolution': '1280x1024',
    'project': `${projectName}`,
    'build': `${buildNumber}`,
    'browserstack.debug': true,
    'browserstack.networkLogs': true,
    'failure_url': undefined
  }
};

const sessionSpecific = {
  capabilities: {
    'browserstack.local': true
  }
};

// Only pass the property to browsers
const browserResolution = {
  capabilities: {
    resolution: '1280x1024'
  }
};

// Only pass the property to devices
const deviceProperty = {
  capabilities: {
    realMobile: 'true'
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
    browser: 'safari',
    browserName: 'safari',
    os: 'OS X',
    os_version: 'High Sierra'
  }
};

const Firefox: Config = {
  capabilities: {
    browser: 'firefox',
    browserName: 'firefox',
    os: 'OS X',
    os_version: 'High Sierra'
  }
};

const Edge: Config = {
  capabilities: {
    browser: 'edge',
    browserName: 'edge',
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
merge(Firefox, commonConfigProps, browserResolution, sessionSpecific);
merge(Edge, commonConfigProps, browserResolution, sessionSpecific);
merge(IPhone, commonConfigProps, deviceProperty);
merge(galaxyS8, commonConfigProps, deviceProperty);

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
export const parallel: Array<Config> = [
  Chrome,
  Firefox,
  Safari
];

export const mobile: Array<Config> = [
  IPhone,
  galaxyS8
];
