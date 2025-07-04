const { test, expect } = require('@playwright/test');

test.describe('Products Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products/');
  });

  test('should load products page', async ({ page }) => {
    await expect(page.locator('text=Products')).toBeVisible();
    await expect(page.locator('[data-cy="products-grid"]')).toBeVisible();
  });

  test('should display products', async ({ page }) => {
    await expect(page.locator('.product-card')).toHaveCount({ greaterThan: 0 });
    await expect(page.locator('.product-card').first()).toContainText('$');
  });

  test('should filter products by category', async ({ page }) => {
    await page.selectOption('[data-cy="category-filter"]', 'electronics');
    await expect(page).toHaveURL(/.*category=electronics/);
    await expect(page.locator('.product-card')).toHaveCount({ greaterThan: 0 });
  });

  test('should search products', async ({ page }) => {
    await page.fill('[data-cy="search-input"]', 'shirt');
    await page.click('[data-cy="search-button"]');
    await expect(page).toHaveURL(/.*search=shirt/);
  });

  test('should navigate to product detail', async ({ page }) => {
    await page.click('.product-card >> nth=0');
    await expect(page).toHaveURL(/.*\/product\//);
  });
});