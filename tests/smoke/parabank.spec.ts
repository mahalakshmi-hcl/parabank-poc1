 
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { RegistrationPage } from '../../src/pages/RegistrationPage';
import { AccountsOverviewPage } from '../../src/pages/AccountsOverviewPage';
import { createRegistrationData } from '../../src/data/registrationData';
 
test.describe('ParaBank Smoke Tests', () => {
 
  test('ParaBank home page loads', async ({ page }) => {
 
    await page.goto('index.htm');
 
    await expect(page).toHaveTitle(/ParaBank/);
  });
 
  test('Login page fields are displayed', async ({ page }) => {
 
    const loginPage = new LoginPage(page);
 
    await page.goto('index.htm');
 
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
 
  test('Valid registration should open Accounts Overview with default account and balance', async ({ page }) => {
 
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
  const accountsOverviewPage = new AccountsOverviewPage(page);
 
  const registrationData = createRegistrationData();
 
  // Step 1: Open ParaBank
  await page.goto('index.htm');
 
  // Step 2: Open Registration page
  await loginPage.openRegistration();
 
  // Step 3: Register a new user
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
 
  // Step 6: Verify Accounts Overview
  await accountsOverviewPage.verifyPageLoaded();
  await accountsOverviewPage.verifyAccountsTableDisplayed();
 
  // Step 7: Verify default account and balance
  await accountsOverviewPage.verifyDefaultAccountAndBalance();
});
 
test('Valid user should be able to login successfully', async ({ page }) => {
 
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const registrationData = createRegistrationData();
 
  // Step 1: Open ParaBank
  await page.goto('index.htm');
 
  // Step 2: Open Registration page
  await loginPage.openRegistration();
 
  // Step 3: Register a new user
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
 
  // Step 4: Verify registration succeeded
  await registrationPage.verifyRegistrationSuccessful();
 
  // Step 5: Logout
  await page.getByRole('link', { name: 'Log Out' }).click();
 
  // Step 6: Login with the registered credentials
  await loginPage.login(
    registrationData.username,
    registrationData.password
  );
 
  // Step 7: Verify login was successful
  await expect(
    page.getByRole('link', { name: 'Log Out' })
  ).toBeVisible();
});
 
test('Invalid username and password should not login', async ({ page }) => {
 
  const loginPage = new LoginPage(page);
 
  // Step 1: Open ParaBank
  await page.goto('index.htm');
 
  // Step 2: Enter invalid credentials
  await loginPage.login(
    'invalid_user_12345',
    'Invalid@12345'
  );
 
  // Step 3: Verify login failed
  await expect(
    page.getByText('The username and password could not be verified.')
  ).toBeVisible();
});
 
test('Blank username should not login', async ({ page }) => {
 
  const loginPage = new LoginPage(page);
 
  // Step 1: Open ParaBank
  await page.goto('index.htm');
 
  // Step 2: Leave username blank and enter password
  await loginPage.login(
    '',
    'Test@12345'
  );
 
  // Step 3: Verify login failed
  await expect(
    page.getByText('Please enter a username and password.')
  ).toBeVisible();
});
 
test('Blank password should not login', async ({ page }) => {
 
  const loginPage = new LoginPage(page);
 
  // Step 1: Open ParaBank
  await page.goto('index.htm');
 
  // Step 2: Enter username and leave password blank
  await loginPage.login(
    'invalid_user_12345',
    ''
  );
 
  // Step 3: Verify login failed
  await expect(
    page.getByText('Please enter a username and password.')
  ).toBeVisible();
});
 
test('Valid username with wrong password should not login', async ({ page }) => {
 
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
 
  const registrationData = createRegistrationData();
 
  // Step 1: Open ParaBank
  await page.goto('index.htm');
 
  // Step 2: Open Registration page
  await loginPage.openRegistration();
 
  // Step 3: Register a new user
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
 
  // Step 4: Verify registration succeeded
  await registrationPage.verifyRegistrationSuccessful();
 
  // Step 5: Logout
  await page.getByRole('link', { name: 'Log Out' }).click();
 
  // Step 6: Use correct username but wrong password
  await loginPage.login(
    registrationData.username,
    'WrongPassword@123'
  );
 
  // Step 7: Verify login failed
  await expect(
    page.getByText('The username and password could not be verified.')
  ).toBeVisible();
});
 
});