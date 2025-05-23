import { test } from '../fixtures/fixtures';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Проверка авторизации', () => {
  test('После авторизации должен быть совершен переход на страницу товаров', async ({
    loginPageFixture,
  }) => {
    await loginPageFixture.performLogin(
      process.env.LOGIN as string,
      process.env.PASSWORD as string,
    );
    await test.step('Произошел переход на главную страницу', async () => {
      await loginPageFixture.checkURL('/inventory.html');
    });
  });

  test('После ввода некорректного логина должна быть ошибка авторизации', async ({
    loginPageFixture,
  }) => {
    await loginPageFixture.performLogin('incorrect_login', process.env.PASSWORD as string);
    await loginPageFixture.checkIncorrectLogin();
  });

  test('После ввода некорректного пароля должна быть ошибка авторизации', async ({
    loginPageFixture,
  }) => {
    await loginPageFixture.performLogin(process.env.LOGIN as string, 'incorrect_pass');
    await loginPageFixture.checkIncorrectLogin();
  });

  test('После ввода некорректного пароля и логина должна быть ошибка авторизации', async ({
    loginPageFixture,
  }) => {
    await loginPageFixture.performLogin('incorrect_login', 'incorrect_pass');
    await loginPageFixture.checkIncorrectLogin();
  });
});
