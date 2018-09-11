import {elementWaitTimeOutValue} from './timeouts';
import {
  WebDriver,
  until,
  WebElementPromise,
  Locator,
  WebElement,
  ActionSequence,
  Key
} from 'selenium-webdriver';

export class SeleniumWebdriverWrapper {
  constructor(private readonly driver: WebDriver) {
  }

  waitUntilElementLoadedAndDisplayed = async (locator: Locator): Promise<any> => {
    const locatorValue = JSON.stringify(locator);
    this.driver.wait(until.elementLocated(locator), elementWaitTimeOutValue, `Element not located: ${locatorValue}`);
    this.driver.wait(until.elementIsVisible(this.driver.findElement(locator)), elementWaitTimeOutValue,
      `Element not visible: ${locatorValue}`);

    return this.driver.findElement(locator);
  }

  waitForCondition = async (condition: any) =>
    this.driver.wait(condition)

  waitUntilPageElementsLoadedAndDisplayed = async (locators: Array<any>): Promise<WebElementPromise> => {
    let elements;
    elements = locators.map(async locator => await this.waitUntilElementLoadedAndDisplayed(locator));

    return (Promise as any).all(elements);
  }

  waitForElementInVisible = async (locator: Locator): Promise<any> =>
    await this.driver.wait(async () => (await this.driver.findElements(locator)).length === 0, elementWaitTimeOutValue,
      `Element not invisible: ${JSON.stringify(locator)}`);

  setScreenSize = async (width: number, height: number) => {
    await this.driver.manage().window().setSize(width, height);
  };

  maximizeWindow = async () => {
    await this.driver.manage().window().maximize();
  };

  findElement = async (locator: Locator): Promise<WebElementPromise> =>
    this.driver.findElement(locator)

  findElements = async (locator: Locator): Promise<any> =>
    await this.driver.findElements(locator);

  getUrl = async (url: string) =>
    await this.driver.get(url);

  click = async (locator: Locator) =>
    await this.driver.findElement(locator).click();

  submit = async (locator: Locator) =>
    await this.driver.findElement(locator).submit();

  getValue = async (locator: Locator) =>
    await this.driver.findElement(locator).getText();

  getClassAttribute = async (element: WebElement) =>
    await element.getAttribute('class');

  setValue = async (locator: Locator, value: string) =>
    await this.driver.findElement(locator).sendKeys(value);

  clearFormField = async (locator: Locator) => {
    const element = await this.findElement(locator);
    const text = await element.getAttribute('value');
    const textLength = text.length;

    for (let i = 0; i < textLength; i++) {
      await element.sendKeys(Key.BACK_SPACE);
    }
  };

  mouseOverClick = async (locator: Locator) => {
    const actions: ActionSequence = new ActionSequence(this.driver);

    await actions.mouseMove(await this.findElement(locator)).click().perform();
  };

  pageRefresh = async () => await this.driver.navigate().refresh();

  waitForElementEnabled = async (locator: Locator): Promise<any> =>
    this.driver.wait(until.elementIsEnabled(await this.findElement(locator)),
      elementWaitTimeOutValue,
      'Element should be enabled');

  executeJavascript = async (script: string, element: WebElement) =>
    await this.driver.executeScript(script, element);

  scrollElementToView = async (element: WebElement) =>
    await this.driver
      .executeScript('arguments[0].scrollIntoView(true); window.scrollBy(0, -window.innerHeight / 4);', element);
}
