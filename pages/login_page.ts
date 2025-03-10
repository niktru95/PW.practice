import { type Locator, type Page, BrowserContext } from '@playwright/test';
import {BasePage} from "./base-page";

export class LoginPage extends BasePage{
  readonly loginForm: Locator;
  readonly passForm: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginButton = page.getByPlaceholder('Username');
    this.passForm = page.getByPlaceholder('Password');
    this.loginForm = page.getByRole('button', {name: "Login"});
  }

  context(): BrowserContext {
    return this.page.context();
  }

  async auth(login: string, pass: string) {
    await this.loginButton.fill(login);
    await this.passForm.fill(pass);
  }

  async click_login_button() {
    await this.loginForm.click();
  }
}