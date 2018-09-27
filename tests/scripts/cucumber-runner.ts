#!/usr/bin/env ts-node

// tslint:disable
require('dotenv-safe').load({
  allowEmptyValues: true
});
// const Joi = require('joi');
const winston = require('winston');
const reporter = require('cucumber-html-reporter');
// tslint:enable

import * as childProcess from 'child_process';
import * as path from 'path';
import {assign, pick} from 'lodash';
import * as fs from 'fs-extra';
import {determineConfig} from '../conf/configResolver';
import {
  profileName,
  testTags,
  outputDir
} from '../support/env';
import * as yargs from 'yargs';
const argv = yargs.argv;

export const execute = async () => {
  const config = determineConfig();
  winston.info('Cucumber tags used are:', testTags);
  winston.info('configurations used are: ', config);
  winston.info('Profile Used', profileName);

  const runner = (async () => {
    winston.info('Deleting Test Results Output');
    await fs.emptyDir(outputDir);

    for (const i of Object.keys(config)) {
      const env = process.env;
      env.TASK_ID = i.toString();
      const options = assign(pick(env, ['TASK_ID']), {stdio: 'inherit'});

      let cukePath = path.normalize('./node_modules/.bin/cucumber-js');
      if (process.platform === 'win32') {
        cukePath = path.normalize('./node_modules/.bin/cucumber-js.cmd');
      }

      const testPath = path.normalize('./tests');
      const profileOption = '-p';
      const tagOption = '--tags';
      const commandLineArgs =
        [profileOption, profileName, testPath,
          `--profile=default`,
          `--config=${argv.config}`,
          `--targetUrl=${argv.targetUrl}`];

      if (argv.tags) {
        commandLineArgs.unshift(tagOption, testTags, `--tags=${argv.tags}`);
      }

      const cukeProcess = childProcess.spawn(
        cukePath, commandLineArgs, options);

      cukeProcess.on('exit', code => {
        if (code > 0) {
          winston.info(`CucumberJS process ${i} exited with an error`);
          process.exitCode = code;
        } else {
          winston.info(`CucumberJS process ${i} has exited successfully`);
        }
      });

      cukeProcess.on('error', err => {
        winston.info(`Could not launch ${cukePath} due to error: ${err}`);
      });
    }

    process.on('exit', () => {
      const options = {
        brandTitle: 'Test Report',
        theme: 'hierarchy',
        jsonDir: outputDir,
        output: `${outputDir}/${profileName}test-report.html`,
        reportSuiteAsScenarsios: true,
        launchReport: false
      };

      // This generates HTML report.
      reporter.generate(options);
    });
  });

  await runner();
};

// Run Cuke Process
execute().then(() => {
  winston.info('Cucumber Starting...');
}).catch(err => {
  winston.info('Cucumber exiting.. ', err);
});
