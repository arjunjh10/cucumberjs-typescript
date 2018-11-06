import {
  After,
  Before,
  BeforeAll,
  AfterAll,
  Status,
  HookScenarioResult,
  World
} from 'cucumber';
// tslint:disable
const winston = require('winston');
const browserstackLocal = require('browserstack-local');
// tslint:enable
import {
  saveScreenshot,
  createSeleniumDriverSession,
  createSessionOnBrowserstack
} from './testUtilities';
import {ScenarioResultOnError} from './customCucumberInterfaces';
import {Session, WebDriver} from 'selenium-webdriver';
import {determineConfig} from '../conf/configResolver';
import {Config} from '../conf/config';
import {taskId, isLocal, browserstackUserName, browserstackAccessKey} from './env';
import {info} from 'console';
import {promisify} from 'util';

const bsLocal = new browserstackLocal.Local();
let seleniumDriver: WebDriver;
let session: Session;
let sessionId: string;
const failedScenariosInfo: any = {};
export const config = determineConfig();
export const currentConfig: Config = config[taskId];
export const capabilities = currentConfig.capabilities;
export const browserName = capabilities.browser.toString().toUpperCase();

Before(async function(this: World, hookForResult: HookScenarioResult) {
  winston.info('The Capabilities passed are', capabilities);
  winston.info(`Running Scenario: ${hookForResult.pickle.name} on ${browserName}`);
  session = await seleniumDriver.getSession();
  sessionId = session.getId();
  winston.info('sessionId is ', sessionId);

  await seleniumDriver.executeScript(JSON.stringify(`Running Scenario: ${hookForResult.pickle.name}`));
  this.driver = seleniumDriver;
});


BeforeAll(async () => {
  if (capabilities['browserstack.local']) {
    capabilities['browserstack.localIdentifier'] = browserName;
    await promisify(bsLocal.start.bind(bsLocal))(
      {localIdentifier: capabilities['browserstack.localIdentifier'], key: browserstackAccessKey, verbose: 'true'});
    info('Local session started, launching driver now');
  } else {
    info('Normal Session Started');
  }

  // Create new driver session per feature
  if (isLocal()) {
    seleniumDriver = createSeleniumDriverSession(capabilities);
  } else {
    capabilities['browserstack.user'] = browserstackUserName;
    capabilities['browserstack.key'] = browserstackAccessKey;
    info('Launching session now');
    seleniumDriver = createSessionOnBrowserstack(capabilities);
  }
});

AfterAll(async () => {
  // Quit session once all the tests in a feature have run
  if (bsLocal) {
    await promisify(bsLocal.stop.bind(bsLocal))();
    info('BrowserStack local session stopped.');
  }

  await seleniumDriver.quit();
});

After(async function(this: World, hookForResult: HookScenarioResult) {
  const scenarioResult = hookForResult.result.status;
  const result = hookForResult.result;
  capabilities.name = `Run on ${browserName}: ${hookForResult.sourceLocation.uri}`;

  switch (scenarioResult) {
    case Status.PASSED:
      winston.info(`Scenario Passed: ${hookForResult.pickle.name}`);
      break;

    case Status.FAILED:
      const name = hookForResult.pickle.name;
      if (capabilities.server) {
        capabilities.failure_url = failedScenariosInfo[name];
      }
      winston.info(`Scenario Failed: ${name}
      with exception ${(result as ScenarioResultOnError).exception.message}`);

      // Storing the screenshot to the folder and the html report
      const screenshotBuffer = await seleniumDriver.takeScreenshot();
      this.attach(screenshotBuffer, 'image/png');
      await saveScreenshot(screenshotBuffer, name);
      break;
  }
});
