import { Page, Locator, expect} from '@playwright/test';
 
export class RegistrationPage {
  readonly page: Page;
 
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;
 
  constructor(page: Page) {
    this.page = page;
 
    this.firstNameInput = page.locator('#customer\\.firstName');
    this.lastNameInput = page.locator('#customer\\.lastName');
    this.addressInput = page.locator('#customer\\.address\\.street');
    this.cityInput = page.locator('#customer\\.address\\.city');
    this.stateInput = page.locator('#customer\\.address\\.state');
    this.zipCodeInput = page.locator('#customer\\.address\\.zipCode');
    this.phoneInput = page.locator('#customer\\.phoneNumber');
    this.ssnInput = page.locator('#customer\\.ssn');
    this.usernameInput = page.locator('#customer\\.username');
    this.passwordInput = page.locator('#customer\\.password');
    this.confirmPasswordInput = page.locator('#repeatedPassword');
 
    this.registerButton = page.locator('input[value="Register"]');
    this.successMessage = page.getByText(
  'Your account was created successfully.',
  { exact: false }
);
  }
 
  async open(): Promise<void> {
    await this.page.getByRole('link', { name: 'Register' }).click();
  }
 
async verifyRegistrationSuccessful(): Promise<void> {
  await expect(this.successMessage).toBeVisible();
}
async fillRegistrationForm(
  firstName: string,
  lastName: string,
  address: string,
  city: string,
  state: string,
  zipCode: string,
  phone: string,
  ssn: string,
  username: string,
  password: string,
  confirmPassword: string
): Promise<void> {
  await this.firstNameInput.fill(firstName);
  await this.lastNameInput.fill(lastName);
  await this.addressInput.fill(address);
  await this.cityInput.fill(city);
  await this.stateInput.fill(state);
  await this.zipCodeInput.fill(zipCode);
  await this.phoneInput.fill(phone);
  await this.ssnInput.fill(ssn);
  await this.usernameInput.fill(username);
  await this.passwordInput.fill(password);
  await this.confirmPasswordInput.fill(confirmPassword);
}
 
  async register(
  firstName: string,
  lastName: string,
  address: string,
  city: string,
  state: string,
  zipCode: string,
  phone: string,
  ssn: string,
  username: string,
  password: string,
  confirmPassword: string
): Promise<void> {
 
  await this.fillRegistrationForm(
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
    phone,
    ssn,
    username,
    password,
    confirmPassword
  );
 
  await this.submitRegistration();
}
  async clearFirstName(): Promise<void> {
  await this.firstNameInput.fill('');
}
 
async submitRegistration(): Promise<void> {
  await this.registerButton.click();
}
}
 