import * as seleniumWebdriver from 'selenium-webdriver';
import {
  outputDir
} from './env';
import {O_CREAT} from 'constants';
import * as makeDir from 'make-dir';
import * as fs from 'fs-extra';

export enum Frequency {
  Weekly = 'Weekly',
  Fortnightly = 'Fortnightly'
}

export const createSeleniumDriverSession = (caps: any) =>
  new seleniumWebdriver.Builder()
    .forBrowser(caps.browserName)
    .withCapabilities(caps)
    .build();

export const createSessionOnBrowserstack = (caps: any) =>
  new seleniumWebdriver.Builder()
    .usingServer(caps.server)
    .withCapabilities(caps)
    .build();

export const saveScreenshot = async (data: any, name: string) => {
  if (name === '' || name === null) {
    throw new Error('Unable to save the screenshot, the test name not defined');
  }
  const path = `${outputDir}/screenshots/`;
  await makeDir(path);

  fs.open(name, O_CREAT, async () => {
    const filename = `${path}${name}.png`;
    await fs.writeFile(filename, data, {encoding: 'base64', flag: 'wx'});
  });
};
