import { type Locator, type Page, BrowserContext } from '@playwright/test';
import { BasePage } from './base-page';
import { LoginPageWarnings } from '../enum/enum';
import { test } from '../fixtures/fixtures';

export class LoginPage extends BasePage {
  readonly loginForm: Locator;
  readonly passForm: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginButton = page.getByPlaceholder('Username');
    this.passForm = page.getByPlaceholder('Password');
    this.loginForm = page.getByRole('button', { name: 'Login' });
  }

  context(): BrowserContext {
    return this.page.context();
  }

  async authentication(login: string, pass: string): Promise<void> {
    await this.loginButton.fill(login);
    await this.passForm.fill(pass);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginForm.click();
  }

  async incorrectLoginPassNotify(): Promise<void> {
    await this.isVisible('error');
    await this.checkText('error', LoginPageWarnings.LoginError);
  }

  async performLogin(login: string, password: string): Promise<void> {
    await test.step('Ввести данные пользователя', async () => {
      await this.authentication(login, password);
    });

    await test.step('Кликнуть на кнопку авторизации', async () => {
      await this.clickLoginButton();
    });
  }

  async checkIncorrectLogin(): Promise<void> {
    await test.step('Появилась ошибка "Данные пользователя неверны"', async () => {
      await this.incorrectLoginPassNotify();
    });
  }
}
