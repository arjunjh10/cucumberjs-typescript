import {When, Before, Then, World} from 'cucumber';
import {SeleniumWebdriverWrapper} from '../support/seleniumWebdriverWrapper';
import {stepTimeOut} from '../support/timeouts';
import {targetUrl} from '../support/env';
import {browserName} from '../support/hooks';
import {supportedBrowserNames} from '../support/supportedBrowserNames';
import {Constants} from '../support/constants';
import {SearchPageObject} from '../pageObjects/search';
import {assert} from 'chai';

let driver;
let driverWrapper: SeleniumWebdriverWrapper;
let searchPage: SearchPageObject;

Before({timeout: stepTimeOut}, async function(this: World) {
  driver = this.driver;
  driverWrapper = new SeleniumWebdriverWrapper(driver);
  searchPage = new SearchPageObject(driver);

  if (browserName !== supportedBrowserNames.safari) {
    await driverWrapper.setScreenSize(Constants.adjustScreenWidth, Constants.adjustScreenHeight);
  } else {
    await driverWrapper.maximizeWindow();
  }

  await driverWrapper.getUrl(targetUrl);
});

When(/^I enter my search criteria and search$/, async () => {
  await searchPage.inputCriteriaAndSearch();
});

Then(/^I should get the search results$/, async () => {
  const elem = await driverWrapper.findElement(searchPage.searchResults);
  assert.isTrue(await elem.isDisplayed());
});
