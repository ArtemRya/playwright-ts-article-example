import { Page, Locator } from '@playwright/test';
import { PageBase } from '../base/page.base';
import { locators, onLoadLocators } from './login.locators';

export class LoginPage extends PageBase {
    readonly onLoadLocators: Record<string, Locator>;
    readonly locators: Record<string, Locator>;

    constructor(page: Page) {
        super(page);
        this.locators = locators(page);
        this.onLoadLocators = onLoadLocators(page);
    }

    async executeLogin(username: string, password: string) {
        await this.locators.usernameTextbox.fill(username);
        await this.locators.passwordTextbox.fill(password);
        await this.locators.loginButton.click();
    }

}
