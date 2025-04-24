// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Thư mục chứa các file test
  timeout: 30 * 1000, // Timeout cho mỗi test (30 giây)
  expect: {
    timeout: 5000 // Timeout cho các assertions (5 giây)
  },
  fullyParallel: true, // Chạy test song song
  retries: 1, // Số lần retry nếu test fail
  workers: process.env.CI ? 2 : undefined, // Số worker chạy song song
  reporter: [
    ['list'], // Hiển thị kết quả trên console
    ['html'] // Tạo report HTML
  ],
  use: {
    actionTimeout: 0, // Timeout cho actions (0 là vô hạn)
    trace: 'on-first-retry', // Ghi trace khi retry
    screenshot: 'only-on-failure', // Chụp màn hình khi fail
    video: 'retain-on-failure' // Quay video khi fail
  },

  // Cấu hình các trình duyệt
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    }
  ]
});