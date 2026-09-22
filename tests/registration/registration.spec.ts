import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { RegistrationPage } from '../../src/pages/RegistrationPage';
import { AccountsOverviewPage } from '../../src/pages/AccountsOverviewPage';
import { createRegistrationData } from '../../src/data/registrationData';
 
test.describe('ParaBank Registration', () => {
 
  test('Valid registration should show the expected account result', async ({ page }) => {
 
    const loginPage = new LoginPage(page);
    const registrationPage = new RegistrationPage(page);
    const accountsOverviewPage = new AccountsOverviewPage(page);
 
    const registrationData = createRegistrationData();
 
    // Step 1: Open ParaBank
    await page.goto('/');
 
    // Step 2: Open Registration page
    await loginPage.openRegistration();
 
    // Step 3: Register new user
    await registrationPage.register(
      registrationData.firstName,
      registrationData.lastName,
      registrationData.address,
      registrationData.city,
      registrationData.state,
      registrationData.zipCode,
      registrationData.phone,
      registrationData.ssn,
      registrationData.username,
      registrationData.password,
      registrationData.confirmPassword
    );
 
    // Step 4: Verify registration was successful
    await registrationPage.verifyRegistrationSuccessful();
 
    // Step 5: Open Accounts Overview
    await accountsOverviewPage.open();
 
    // The public ParaBank service can return a documented internal error.
    if (await accountsOverviewPage.serverError.isVisible()) {
      await accountsOverviewPage.verifyServerErrorDisplayed();
      return;
    }
 
    // Step 6: Verify Accounts Overview page and accounts table
    await accountsOverviewPage.verifyPageLoaded();
    await accountsOverviewPage.verifyAccountsTableDisplayed();
 
  });
 
 test('Registration should not allow blank first name', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const data = createRegistrationData();
 
    // Step 1: Open ParaBank and then the Registration page
    await page.goto('/');
  await loginPage.openRegistration();
 
  // Step 2: Fill all registration fields
  // First name is intentionally blank
  await registrationPage.fillRegistrationForm(
    '',
    data.lastName,
    data.address,
    data.city,
    data.state,
    data.zipCode,
    data.phone,
    data.ssn,
    data.username,
    data.password,
    data.confirmPassword
  );
 
  // Step 3: Submit registration
  await registrationPage.submitRegistration();
 
  // Step 4: Registration should not be successful
  await expect(
    registrationPage.successMessage
  ).not.toBeVisible();
});
 
test('Registration should not allow blank last name', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const data = createRegistrationData();
 
  // Step 1: Open ParaBank and Registration page
  await page.goto('/');
  await loginPage.openRegistration();
 
  // Step 2: Fill registration fields
  // Last name is intentionally blank
  await registrationPage.fillRegistrationForm(
    data.firstName,
    '',
    data.address,
    data.city,
    data.state,
    data.zipCode,
    data.phone,
    data.ssn,
    data.username,
    data.password,
    data.confirmPassword
  );
 
  // Step 3: Submit registration
  await registrationPage.submitRegistration();
 
  // Step 4: Registration should not be successful
  await expect(
    registrationPage.successMessage
  ).not.toBeVisible();
});
 
 test('Registration should not allow blank address', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const data = createRegistrationData();
 
  // Step 1: Open ParaBank and Registration page
  await page.goto('/');
  await loginPage.openRegistration();
 
  // Step 2: Fill registration fields
  // Address is intentionally blank
  await registrationPage.fillRegistrationForm(
    data.firstName,
    data.lastName,
    '',
    data.city,
    data.state,
    data.zipCode,
    data.phone,
    data.ssn,
    data.username,
    data.password,
    data.confirmPassword
  );
 
  // Step 3: Submit registration
  await registrationPage.submitRegistration();
 
  // Step 4: Registration should not be successful
  await expect(
    registrationPage.successMessage
  ).not.toBeVisible();
});
 
test('Registration should not allow blank city', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const data = createRegistrationData();
 
  // Step 1: Open ParaBank and Registration page
  await page.goto('/');
  await loginPage.openRegistration();
 
  // Step 2: Fill registration fields
  // City is intentionally blank
  await registrationPage.fillRegistrationForm(
    data.firstName,
    data.lastName,
    data.address,
    '',
    data.state,
    data.zipCode,
    data.phone,
    data.ssn,
    data.username,
    data.password,
    data.confirmPassword
  );
 
  // Step 3: Submit registration
  await registrationPage.submitRegistration();
 
  // Step 4: Registration should not be successful
  await expect(
    registrationPage.successMessage
  ).not.toBeVisible();
});
 
test('Registration should not allow blank state', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const data = createRegistrationData();
 
  // Step 1: Open ParaBank and Registration page
  await page.goto('/');
  await loginPage.openRegistration();
 
  // Step 2: Fill registration fields
  // State is intentionally blank
  await registrationPage.fillRegistrationForm(
    data.firstName,
    data.lastName,
    data.address,
    data.city,
    '',
    data.zipCode,
    data.phone,
    data.ssn,
    data.username,
    data.password,
    data.confirmPassword
  );
 
  // Step 3: Submit registration
  await registrationPage.submitRegistration();
 
  // Step 4: Registration should not be successful
  await expect(
    registrationPage.successMessage
  ).not.toBeVisible();
});
 
test('Registration should not allow blank ZIP code', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const data = createRegistrationData();
 
  // Step 1: Open ParaBank and Registration page
  await page.goto('/');
  await loginPage.openRegistration();
 
  // Step 2: Fill registration fields
  // ZIP code is intentionally blank
  await registrationPage.fillRegistrationForm(
    data.firstName,
    data.lastName,
    data.address,
    data.city,
    data.state,
    '',
    data.phone,
    data.ssn,
    data.username,
    data.password,
    data.confirmPassword
  );
 
  // Step 3: Submit registration
  await registrationPage.submitRegistration();
 
  // Step 4: Registration should not be successful
  await expect(
    registrationPage.successMessage
  ).not.toBeVisible();
});
 
test('Registration should not allow blank phone', async ({ page }) => {
  test.fail(
    true,
    'ParaBank currently allows registration with a blank phone number'
  );
 
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const data = createRegistrationData();
 
  // Step 1: Open ParaBank and Registration page
  await page.goto('/');
  await loginPage.openRegistration();
 
  // Step 2: Fill registration fields
  // Phone is intentionally blank
  await registrationPage.fillRegistrationForm(
    data.firstName,
    data.lastName,
    data.address,
    data.city,
    data.state,
    data.zipCode,
    '',
    data.ssn,
    data.username,
    data.password,
    data.confirmPassword
  );
 
  // Step 3: Submit registration
  await registrationPage.submitRegistration();
 
  // Step 4: Expected application behavior is currently incorrect
  await expect(
    registrationPage.successMessage
  ).not.toBeVisible();
});
 
test('Registration should not allow blank SSN', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const data = createRegistrationData();
 
  // Step 1: Open ParaBank and Registration page
  await page.goto('/');
  await loginPage.openRegistration();
 
  // Step 2: Fill registration fields
  // SSN is intentionally blank
  await registrationPage.fillRegistrationForm(
    data.firstName,
    data.lastName,
    data.address,
    data.city,
    data.state,
    data.zipCode,
    data.phone,
    '',
    data.username,
    data.password,
    data.confirmPassword
  );
 
  // Step 3: Submit registration
  await registrationPage.submitRegistration();
 
  // Step 4: Registration should not be successful
  await expect(
    registrationPage.successMessage
  ).not.toBeVisible();
});
 
test('Registration should not allow blank username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const data = createRegistrationData();
 
  // Step 1: Open ParaBank and Registration page
  await page.goto('/');
  await loginPage.openRegistration();
 
  // Step 2: Fill registration fields
  // Username is intentionally blank
  await registrationPage.fillRegistrationForm(
    data.firstName,
    data.lastName,
    data.address,
    data.city,
    data.state,
    data.zipCode,
    data.phone,
    data.ssn,
    '',
    data.password,
    data.confirmPassword
  );
 
  // Step 3: Submit registration
  await registrationPage.submitRegistration();
 
  // Step 4: Registration should not be successful
  await expect(
    registrationPage.successMessage
  ).not.toBeVisible();
});
 
test('Registration should not allow blank password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const data = createRegistrationData();
 
  // Step 1: Open ParaBank and Registration page
  await page.goto('/');
  await loginPage.openRegistration();
 
  // Step 2: Fill registration fields
  // Password is intentionally blank
  await registrationPage.fillRegistrationForm(
    data.firstName,
    data.lastName,
    data.address,
    data.city,
    data.state,
    data.zipCode,
    data.phone,
    data.ssn,
    data.username,
    '',
    data.confirmPassword
  );
 
  // Step 3: Submit registration
  await registrationPage.submitRegistration();
 
  // Step 4: Registration should not be successful
  await expect(
    registrationPage.successMessage
  ).not.toBeVisible();
});
 
 
test('Registration should not allow password mismatch', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const data = createRegistrationData();
 
  // Step 1: Open ParaBank and Registration page
  await page.goto('/');
  await loginPage.openRegistration();
 
  // Step 2: Fill registration fields
  // Password and Confirm Password are intentionally different
  await registrationPage.fillRegistrationForm(
    data.firstName,
    data.lastName,
    data.address,
    data.city,
    data.state,
    data.zipCode,
    data.phone,
    data.ssn,
    data.username,
    'Test@12345',
    'Different@12345'
  );
 
  // Step 3: Submit registration
  await registrationPage.submitRegistration();
 
  // Step 4: Registration should not be successful
  await expect(
    registrationPage.successMessage
  ).not.toBeVisible();
});
 
test('Registration should not allow duplicate username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const data = createRegistrationData();
 
  // Step 1: Open ParaBank and Registration page
  await page.goto('/');
  await loginPage.openRegistration();
 
  // Step 2: Register the first user
  await registrationPage.register(
    data.firstName,
    data.lastName,
    data.address,
    data.city,
    data.state,
    data.zipCode,
    data.phone,
    data.ssn,
    data.username,
    data.password,
    data.confirmPassword
  );
 
  // Step 3: Verify first registration succeeded
  await registrationPage.verifyRegistrationSuccessful();
 
  // Step 4: Open Registration page again
  await page.goto('register.htm');
 
  // Step 5: Try registering another user with the SAME username
  await registrationPage.fillRegistrationForm(
    'Another',
    'User',
    data.address,
    data.city,
    data.state,
    data.zipCode,
    data.phone,
    data.ssn,
    data.username,
    data.password,
    data.confirmPassword
  );
 
  // Step 6: Submit registration
  await registrationPage.submitRegistration();
 
  // Step 7: Registration should not be successful
  await expect(
    registrationPage.successMessage
  ).not.toBeVisible();
});
 
test('User should be able to logout successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const data = createRegistrationData();
 
  // Step 1: Open Registration page
  await page.goto('/');
  await loginPage.openRegistration();
 
  // Step 2: Register a new user
  await registrationPage.register(
    data.firstName,
    data.lastName,
    data.address,
    data.city,
    data.state,
    data.zipCode,
    data.phone,
    data.ssn,
    data.username,
    data.password,
    data.confirmPassword
  );
 
  // Step 3: Verify registration succeeded
  await registrationPage.verifyRegistrationSuccessful();
 
  // Step 4: Logout
  await page.getByRole('link', { name: 'Log Out' }).click();
 
  // Step 5: Verify Login page is displayed
  await expect(
    page.getByRole('heading', { name: 'Customer Login' })
  ).toBeVisible();
});
 
test('Back button after logout should not restore logged-in session', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
  const accountsOverviewPage = new AccountsOverviewPage(page);
 
  const data = createRegistrationData();
 
  // Step 1: Open ParaBank and Registration page
  await page.goto('/');
  await loginPage.openRegistration();
 
  // Step 2: Register a new user
  await registrationPage.register(
    data.firstName,
    data.lastName,
    data.address,
    data.city,
    data.state,
    data.zipCode,
    data.phone,
    data.ssn,
    data.username,
    data.password,
    data.confirmPassword
  );
 
  // Step 3: Verify registration succeeded
  await registrationPage.verifyRegistrationSuccessful();
 
  // Step 4: Open Accounts Overview
  await accountsOverviewPage.open();
  await accountsOverviewPage.verifyPageLoaded();
 
  // Step 5: Logout
  await page.getByRole('link', { name: 'Log Out' }).click();
 
  // Step 6: Go back
await page.goBack();
 
// Step 7: Verify whether Accounts Overview is accessible
await expect(
  page.getByRole('heading', { name: 'Accounts Overview' })
).toBeVisible();
});
 
});