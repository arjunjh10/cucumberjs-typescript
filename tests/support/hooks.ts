import {
  After,
  Before,
  BeforeAll,
  AfterAll,
  Status,
  HookScenarioResult,
  World
} from 'cucumber';
// tslint:disable-next-line:no-var-requires
const winston = require('winston');
import {
  saveScreenshot,
  createSeleniumDriverSession
} from './testUtilities';
import {ScenarioResultOnError} from './customCucumberInterfaces';
import {Session, WebDriver} from 'selenium-webdriver';
import {determineConfig} from '../conf/configResolver';
import {Config} from '../conf/config';
import {taskId} from './env';

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
  seleniumDriver = createSeleniumDriverSession(capabilities);
});

AfterAll(async () => {
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
