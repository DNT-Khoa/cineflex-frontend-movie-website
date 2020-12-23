import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/', 20000);
  }

  getSpiderManTitle() {
    return element(by.id('mainMovieTitle')).getText();
  }
}
