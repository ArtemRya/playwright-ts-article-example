import { Page } from '@playwright/test';

export const onLoadLocators = (page: Page) => ({
    usernameTextbox: page.getByRole('textbox', { name: 'Username' }),
    passwordTextbox: page.locator('input[type="password"]'),
    loginButton: page.getByRole('button', { name: 'Enter' })
});

export const locators = (page: Page) => ({
    ...onLoadLocators(page),
});

export type OnLoadLocators = ReturnType<typeof onLoadLocators>;
