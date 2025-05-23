import { test as setup } from '../fixtures/fixtures';
import * as path from 'path';
import { Selectors } from '../selectors/selectors';
import { qase } from 'playwright-qase-reporter';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('Аутентификация', async ({ loginPageFixture }) => {
  qase.ignore();

  await loginPageFixture.authentication(
    process.env.LOGIN as string,
    process.env.PASSWORD as string,
  );
  await loginPageFixture.clickLoginButton();

  await loginPageFixture.checkURL('/inventory.html');
  await loginPageFixture.isVisible(Selectors.Title);

  await loginPageFixture.context().storageState({ path: authFile });
});
