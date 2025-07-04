// Utility functions for Playwright tests
const { expect } = require('@playwright/test');

class Utils {
  static async clearCart(page) {
    await page.evaluate(() => {
      window.localStorage.removeItem('cart');
    });
  }

  static async addToCart(page, productId) {
    await page.goto(`/product/?id=${productId}`);
    await page.click('[data-cy="add-to-cart"]');
  }

  static async getCartCount(page) {
    return await page.textContent('[data-cy="cart-count"]');
  }
}

module.exports = Utils;