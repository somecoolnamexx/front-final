const { test, expect } = require('@playwright/test');
const Utils = require('./utils');

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    await Utils.clearCart(page);
  });

  test('should add product to cart', async ({ page }) => {
    await page.goto('/products/');
    await page.click('.product-card >> nth=0');
    await page.click('[data-cy="add-to-cart"]');
    await expect(page.locator('[data-cy="cart-count"]')).toContainText('1');
  });

  test('should display cart items', async ({ page }) => {
    await Utils.addToCart(page, 1);
    await page.goto('/cart/');
    await expect(page.locator('[data-cy="cart-items"]')).toBeVisible();
    await expect(page.locator('.cart-item')).toHaveCount(1);
  });

  test('should update item quantity', async ({ page }) => {
    await Utils.addToCart(page, 1);
    await page.goto('/cart/');
    await page.fill('[data-cy="quantity-input"]', '2');
    await page.click('[data-cy="update-quantity"]');
    await expect(page.locator('[data-cy="item-total"]')).toBeVisible();
  });

  test('should remove item from cart', async ({ page }) => {
    await Utils.addToCart(page, 1);
    await page.goto('/cart/');
    await page.click('[data-cy="remove-item"]');
    await expect(page.locator('[data-cy="empty-cart"]')).toBeVisible();
  });

  test('should calculate total correctly', async ({ page }) => {
    await Utils.addToCart(page, 1);
    await page.goto('/cart/');
    await expect(page.locator('[data-cy="cart-total"]')).toBeVisible();
    await expect(page.locator('[data-cy="cart-total"]')).toContainText('$');
  });
});