const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage', async ({ page }) => {
    await expect(page.locator('text=Welcome to Our Store')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should display featured products', async ({ page }) => {
    await expect(page.locator('[data-cy="featured-products"]')).toBeVisible();
    await expect(page.locator('.product-card')).toHaveCount({ greaterThan: 0 });
  });

  test('should navigate to products page', async ({ page }) => {
    await page.click('[data-cy="shop-now"]');
    await expect(page).toHaveURL(/.*\/products/);
  });

  test('should have working navigation', async ({ page }) => {
    await page.click('nav a[href="/products/"]');
    await expect(page).toHaveURL(/.*\/products/);
    
    await page.click('nav a[href="/cart/"]');
    await expect(page).toHaveURL(/.*\/cart/);
    
    await page.click('nav a[href="/"]');
    await expect(page).toHaveURL(/.*\/$/);
  });
});