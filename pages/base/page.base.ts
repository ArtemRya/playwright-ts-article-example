import { Locator, Page } from '@playwright/test';
import { IComponentBase } from '../common/base/component.base';

/**
 * Interface defining the contract for page base operations.
 */
export interface IPageBase {
    readonly page: Page;
    readonly onLoadLocators: Record<string, Locator>;
    readonly locators: Record<string, Locator>;

    waitLoadingLocators(timeout?: number): Promise<void>;
}

/**
 * Base class for page objects in Playwright tests.
 * Provides common functionality for page navigation and element visibility checks.
 */
export abstract class PageBase implements IPageBase {
    readonly page: Page;
    abstract readonly onLoadLocators: Record<string, Locator>;
    abstract readonly locators: Record<string, Locator>;
    private dynamicPath: string = '';

    /**
     * Creates a new PageBase instance.
     * @param page - Playwright Page object
     */
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Override this method to provide the components that contain locators to be merged
     * @returns Array of components that implement IComponentBase
     */
    protected attachedComponents(): IComponentBase[] {
        return [];
    }

    /**
     * Merges locators from base locators and all components
     * @param baseLocators - The base locators to merge with component locators
     * @returns Merged locators object
     */
    protected mergeLocators(
        baseLocators: Record<string, Locator>,
    ): Record<string, Locator> {
        return this.attachedComponents().reduce(
            (acc, component) => ({ ...acc, ...component.locators }),
            baseLocators,
        );
    }

    /**
     * Merges onLoadLocators from base locators and all components
     * @param baseLocators - The base onLoadLocators to merge with component onLoadLocators
     * @returns Merged onLoadLocators object
     */
    protected mergeOnLoadLocators(
        baseLocators: Record<string, Locator>,
    ): Record<string, Locator> {
        return this.attachedComponents().reduce(
            (acc, component) => ({ ...acc, ...component.onLoadLocators }),
            baseLocators,
        );
    }

    /**
     * Verifies that all components defined with a underscore are visible.
     * @param timeout - Maximum time to wait for elements to be visible (defaults to 10000ms)
     */
    async waitLoadingLocators(timeout = 10000): Promise<void> {
        const promises = Object.keys(this.onLoadLocators).map((key) =>
            this.onLoadLocators[
                key as keyof typeof this.onLoadLocators
            ].waitFor({
                state: 'visible',
                timeout,
            }),
        );
        await Promise.all(promises);
    }
}
