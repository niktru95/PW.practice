import { test, expect } from '@playwright/test';
import { SauceDemoPage } from '../pages/login_page';
import * as allure from "allure-js-commons";


test.beforeEach('Переход на страницу проекта', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
})

test('После авторизации должен быть совершен переход на страницу товаров', async ({ page }) => {
  await allure.displayName('Ввод корректных данных для входа');

  const playwrightDev = new SauceDemoPage(page);

  await allure.displayName('Ввод корректных данных для входа');

  await allure.step('Ввести данные пользователя', async () => {
    await playwrightDev.auth('standard_user', 'secret_sauce');
  })

  await allure.step('Кликнуть на кнопку авторизации', async () => {
    await playwrightDev.click_login_button();
  })

  await allure.step('Убедиться, что открылась страница товаров с тайтлом Products', async () => {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();
  })
});


test('После ввода некорректного логина должна быть ошибка авторизации', async ({page}) => {
  await allure.displayName('Ввод некорректного логина для входа');

  const playwrightDev = new SauceDemoPage(page);

  await allure.step('Ввести некорректный логин пользователя', async () => {
    await playwrightDev.auth('incorrect_login', 'secret_sauce');
  })

  await allure.step('Кликнуть на кнопку авторизации', async () => {
    await playwrightDev.click_login_button();
  })

  await allure.step('Убедиться что, система выдает ошибку о неправильном логине/пароле', async () => {
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
  })
})

test('После ввода некорректного пароля должна быть ошибка авторизации', async ({page}) => {
  await allure.displayName('Ввод некорректного пароля для входа');

  const playwrightDev = new SauceDemoPage(page);

  await allure.step('Ввести некорректный пароль пользователя', async () => {
    await playwrightDev.auth('standard_user', 'incorrect_pass');
  })

  await allure.step('Кликнуть на кнопку авторизации', async () => {
    await playwrightDev.click_login_button();
  })

  await allure.step('Убедиться что, система выдает ошибку о неправильном логине/пароле', async () => {
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
  })
})

test('После ввода некорректного пароля и логина должна быть ошибка авторизации', async ({page}) => {
  await allure.displayName('Ввод некорректного логина и пароля для входа');

  const playwrightDev = new SauceDemoPage(page);

  await allure.step('Ввести некорректный логин и пароль пользователя', async () => {
    await playwrightDev.auth('incorrect_login', 'incorrect_pass');
  })

  await allure.step('Кликнуть на кнопку авторизации', async () => {
    await playwrightDev.click_login_button();
  })

  await allure.step('Убедиться что, система выдает ошибку о неправильном логине/пароле', async () => {
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
  })
})