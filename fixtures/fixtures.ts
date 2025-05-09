import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cart_page';
import { SidebarPage } from '../pages/sidebar_page';
import { InventoryPage } from '../pages/inventory_page';
import { LoginPage } from '../pages/login_page';
import { HeaderPage } from '../pages/header_page';
import { FooterPage } from '../pages/footer_page';
import { LogoutPage } from '../pages/logout_page';
import { Selectors } from '../selectors/selectors';

type MyFixtures = {
  cartPageFixture: CartPage;
  sidebarPageFixture: SidebarPage;
  inventoryPageFixture: InventoryPage;
  loginPageFixture: LoginPage;
  headerPageFixture: HeaderPage;
  footerPageFixture: FooterPage;
  logoutPageFixture: LogoutPage;
};

export const test = base.extend<MyFixtures>({
  cartPageFixture: async ({ page }, use) => {
    const cartPageFixture = new CartPage(page);
    await cartPageFixture.goTo('/inventory.html');
    await cartPageFixture.clickElement(Selectors.AddToCartItem);
    await cartPageFixture.clickElement(Selectors.ShoppingCartLink);
    await cartPageFixture.checkText(Selectors.ItemQuantity, '1');
    await cartPageFixture.isVisible(Selectors.InventoryItemName);
    await cartPageFixture.isVisible(Selectors.InventoryItemDesc);
    await use(cartPageFixture);
  },

  sidebarPageFixture: async ({ page }, use) => {
    const sidebarPageFixture = new SidebarPage(page);
    await sidebarPageFixture.goTo('https://www.saucedemo.com/inventory-item.html?id=0');
    await sidebarPageFixture.clickBurgerMenu();
    await use(sidebarPageFixture);
  },

  inventoryPageFixture: async ({ page }, use) => {
    const inventoryPageFixture = new InventoryPage(page);
    await inventoryPageFixture.goTo('/inventory.html');
    await use(inventoryPageFixture);
  },

  loginPageFixture: async ({ page }, use) => {
    const loginPageFixture = new LoginPage(page);
    await loginPageFixture.goTo('/');
    await use(loginPageFixture);
  },

  headerPageFixture: async ({ page }, use) => {
    const headerPageFixture = new HeaderPage(page);
    await headerPageFixture.goTo('/inventory.html');
    await use(headerPageFixture);
  },

  footerPageFixture: async ({ page }, use) => {
    const footerPageFixture = new FooterPage(page);
    await footerPageFixture.goTo('/inventory.html');
    await use(footerPageFixture);
  },

  logoutPageFixture: async ({ page }, use) => {
    const logoutPageFixture = new LogoutPage(page);
    await logoutPageFixture.goTo('/inventory.html');
    await use(logoutPageFixture);
  },
});
