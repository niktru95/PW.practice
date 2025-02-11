import {Locator, type Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class LogoutPage extends BasePage{
    readonly burger: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.burger = page.getByRole('button', { name: 'Open Menu' });
        this.logoutButton = page.getByTestId('logout-sidebar-link');
    }

    async clickBurgerMenu () {
        await this.burger.click();
    }

    async clickLogoutButton () {
        await this.logoutButton.click();
    }
}