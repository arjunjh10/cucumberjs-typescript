import {WebDriver, ByHash} from 'selenium-webdriver';
import {SeleniumWebdriverWrapper} from '../support/seleniumWebdriverWrapper';

// COmment
export class SearchPageObject extends SeleniumWebdriverWrapper {
  searchBox: ByHash = {css: '#lst-ib'};
  searchButton: ByHash = {name: 'btnK'};
  searchResults: ByHash = {id: 'search'};

  constructor(driver: WebDriver) {
    super(driver);
  }

  inputCriteriaAndSearch = async () => {
    await this.setValue(this.searchBox, 'google');
    await this.click(this.searchButton);
  }
}
