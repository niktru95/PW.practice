import {test} from "../fixtures/fixtures";
import { LoginPageWarnings } from "../enum/enum";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Проверка авторизации', () => {

  test('После авторизации должен быть совершен переход на страницу товаров', async ({ loginPageFixture }) => {

    await loginPageFixture.auth(process.env.LOGIN, process.env.PASSWORD);
    await loginPageFixture.click_login_button();

    await loginPageFixture.checkURL('/inventory.html');
    await loginPageFixture.isVisible('title');
  });

  test('После ввода некорректного логина должна быть ошибка авторизации', async ({ loginPageFixture }) => {

    await loginPageFixture.auth('incorrect_login', process.env.PASSWORD);
    await loginPageFixture.click_login_button();

    await loginPageFixture.isVisible('error');
    await loginPageFixture.checkText('error', LoginPageWarnings.LoginError);
  });

  test('После ввода некорректного пароля должна быть ошибка авторизации', async ({ loginPageFixture }) => {

    await loginPageFixture.auth(process.env.LOGIN, 'incorrect_pass');
    await loginPageFixture.click_login_button();

    await loginPageFixture.isVisible('error');
    await loginPageFixture.checkText('error', LoginPageWarnings.LoginError);
  });

  test('После ввода некорректного пароля и логина должна быть ошибка авторизации', async ({ loginPageFixture }) => {

    await loginPageFixture.auth('incorrect_login', 'incorrect_pass');
    await loginPageFixture.click_login_button();

    await loginPageFixture.isVisible('error');
    await loginPageFixture.checkText('error', LoginPageWarnings.LoginError);
  });
});