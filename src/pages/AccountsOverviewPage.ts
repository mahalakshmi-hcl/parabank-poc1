import { Page, Locator, expect } from '@playwright/test';
 
export class AccountsOverviewPage {
  readonly page: Page;
 
  readonly accountsOverviewLink: Locator;
  readonly pageTitle: Locator;
  readonly accountsTable: Locator;
  readonly firstAccountBalance: Locator;
  readonly serverError: Locator;
 
  constructor(page: Page) {
    this.page = page;
 
    this.accountsOverviewLink = page.getByRole('link', {
      name: 'Accounts Overview'
    });
 
    this.pageTitle = page.getByRole('heading', {
      name: 'Accounts Overview'
    });
 
    this.accountsTable = page.locator('#accountTable');
 
    this.firstAccountBalance = page.locator(
  '#accountTable tbody tr').first().locator('td').nth(1);
 
    this.serverError = page.getByText(
      'An internal error has occurred and has been logged.',
      { exact: true }
    );
  }
 
  async open(): Promise<void> {
    for (let attempt = 1; attempt <= 3; attempt++) {
      if (attempt === 1) {
        await this.accountsOverviewLink.click();
      } else {
        await this.page.goto(new URL('overview.htm', this.page.url()).toString(), {
          waitUntil: 'domcontentloaded'
        });
      }
 
      if (!(await this.serverError.isVisible())) {
        await expect(this.pageTitle).toBeVisible();
        return;
      }
    }
 
  }
 
  async verifyPageLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
  }
 
  async verifyServerErrorDisplayed(): Promise<void> {
    await expect(this.serverError).toBeVisible();
  }
 
  async verifyAccountsTableDisplayed(): Promise<void> {
    await expect(this.accountsTable).toBeVisible();
  }
 
  async verifyDefaultAccountAndBalance(): Promise<void> {
  await expect(
    this.accountsTable.locator('tbody tr').first()
  ).toBeVisible();
 
  await expect(
    this.firstAccountBalance
  ).not.toHaveText('');
}
}
 