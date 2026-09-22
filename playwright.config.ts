import { defineConfig, devices } from '@playwright/test';
 
export default defineConfig({
  testDir: './tests',
 
  fullyParallel: false,
 
  forbidOnly: !!process.env.CI,
 
  retries: process.env.CI ? 2 : 0,
 
  workers: process.env.CI ? 1 : undefined,
 
  timeout: 30_000,
 
  expect: {
    timeout: 5_000
  },
 
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
 
  use: {
    baseURL: 'https://parabank.parasoft.com/parabank/',
 
    trace: 'retain-on-failure',
 
    screenshot: 'only-on-failure',
 
    video: 'retain-on-failure',
 
    actionTimeout: 10_000,
 
    navigationTimeout: 30_000
  },
 
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    },
 
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    }
  ]
});
 